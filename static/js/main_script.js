import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

const demosSection = document.getElementById("demos");
const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
const placeholderBlock = document.getElementById("placeholder_block");
const loadingSpinner = document.getElementById("loading_spinner");
const cameraCaution = document.getElementById("camera_caution");

const gestureOutput = document.getElementById("gesture_output");
const cameraToggle = document.getElementById("camera-toggle");

let gestureRecognizer;
let runningMode = "IMAGE";
let webcamRunning = false;
let lastVideoTime = -1;
let results = undefined;

// Initialize gesture recognizer
const createGestureRecognizer = async () => {
    try {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "https://ezeventstorage.blob.core.windows.net/model-nsc/chord_taskv2.task",
                delegate: "GPU"
            },
            runningMode: runningMode
        });
        demosSection.classList.remove("invisible");
    } catch (error) {
        console.error("Failed to initialize gesture recognizer:", error);
    }
};

createGestureRecognizer();

// Resize the canvas to match the video aspect ratio
const resizeCanvas = () => {
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const containerWidth = video.parentElement.clientWidth;
    const containerHeight = video.parentElement.clientHeight;

    if (containerWidth / containerHeight < videoAspectRatio) {
        video.style.width = '100%';
        video.style.height = 'auto';
    } else {
        video.style.width = 'auto';
        video.style.height = '100%';
    }

    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;
};

window.addEventListener('resize', resizeCanvas);

// Check if the browser supports getUserMedia
const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

// Handle camera toggle
const handleCameraToggle = (event) => {
    cameraCaution.style.display = "none";
    loadingSpinner.style.display = "block";
    if (!gestureRecognizer) {
        cameraCaution.style.display = "block";
        loadingSpinner.style.display = "none";
        alert("Please wait for gesture recognizer to load");
        return;
    }

    if (event.target.checked) {
        startWebcam();
    } else {
        location.reload();
    }
};

// Start webcam
const startWebcam = () => {
    const constraints = {
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            video.srcObject = stream;
            webcamRunning = cameraToggle.checked;
            if (webcamRunning) {
                video.addEventListener("loadeddata", () => {
                    resizeCanvas();
                    placeholderBlock.style.display = "none";
                    predictWebcam();
                });
            }
        })
        .catch((error) => {
            console.error("Error accessing webcam:", error);
        });
};



// Predict gestures from webcam feed
const predictWebcam = async () => {

    if (runningMode === "IMAGE") {
        canvasElement.style.display = "block";
        video.style.display = "block";
        runningMode = "VIDEO";
        await gestureRecognizer.setOptions({ runningMode: "VIDEO" }).then(() => {
        });
    }

    let nowInMs = Date.now();
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    }

    // Draw results
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    const drawingUtils = new DrawingUtils(canvasCtx);

    if (results.landmarks) {
        for (const landmarks of results.landmarks) {
            drawingUtils.drawConnectors(
                landmarks,
                GestureRecognizer.HAND_CONNECTIONS,
                {
                    color: "#00FF00",
                    lineWidth: 1
                }
            );
            drawingUtils.drawLandmarks(landmarks, {
                color: "#ff0000",
                lineWidth: 1
            });
        }
    }
    canvasCtx.restore();

    // Display gesture results
    if (results.gestures.length > 0) {
        gestureOutput.style.display = "block";
        const categoryName = results.gestures[0][0].categoryName;
        const categoryScore = parseFloat(
            results.gestures[0][0].score * 100
        ).toFixed(2);

        gestureOutput.innerText = `Gesture Recognizer: ${categoryName}\nConfidence: ${categoryScore}%`;
    } else {
        if (gestureOutput.style.display === "block") {
            gestureOutput.style.display = "none";
        }
    }

    // Continue predicting if webcam is running
    if (webcamRunning) {
        window.requestAnimationFrame(predictWebcam);
    }
};

// Attach event listener for camera toggle
if (hasGetUserMedia()) {
    cameraToggle.addEventListener("change", handleCameraToggle);
} else {
    console.warn("getUserMedia() is not supported by your browser");
}

function onLoadPage() {
    console.log("Detect page is loading...");
    if (typeof onLoadComplete === 'function') {
        onLoadComplete();
        loadSound();

    }
}

function onLoadComplete() {
    console.log("Detect page has loaded.");
    createGestureRecognizer();
}

window.onload = onLoadPage;
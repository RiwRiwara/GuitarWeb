import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

const demosSection = document.getElementById("demos");
let gestureRecognizer;
let runningMode = "IMAGE";
let webcamRunning = false;
const videoHeight = "580px";
const videoWidth = "660px";

const createGestureRecognizer = async () => {
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
};
createGestureRecognizer();


const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
const gestureOutput = document.getElementById("gesture_output");

window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
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
}

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
    const cameraToggle = document.getElementById("camera-toggle");
    cameraToggle.addEventListener("change", handleCameraToggle);

} else {
    console.warn("getUserMedia() is not supported by your browser");
}

function handleCameraToggle(event) {
    if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
    }

    const toggleBackground = document.querySelector("#camera-toggle + .toggle-label .toggle-background");
    const toggleButton = document.querySelector(".toggle-button")

    if (event.target.checked) {
        startWebcam();
        toggleBackground.style.backgroundColor = "#4CAF50";
        toggleButton.classList.add("toggle-trans")

    } else {
        stopWebcam();
        webcamRunning = false;
        toggleBackground.style.backgroundColor = "rgb(209 213 219)";
        toggleButton.classList.remove("toggle-trans")
    }
}


function startWebcam() {
    const constraints = {
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        webcamRunning = document.getElementById("camera-toggle").checked;
        if (webcamRunning) {
            video.addEventListener("loadeddata", () => {
                resizeCanvas();
                predictWebcam();
            });
        }
    });
}

function stopWebcam() {
    const stream = video.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
        track.stop();
    });

    video.srcObject = null;
}


let lastVideoTime = -1;
let results = undefined;
async function predictWebcam() {
    const webcamElement = document.getElementById("webcam");
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }
    let nowInMs = Date.now();
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    }

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
    
    if (results.gestures.length > 0) {
        gestureOutput.style.display = "block";
        const categoryName = results.gestures[0][0].categoryName;
        const categoryScore = parseFloat(
            results.gestures[0][0].score * 100
        ).toFixed(2);

        gestureOutput.innerText = `Gesture Recognizer : ${categoryName}\n Confidence : ${categoryScore} %`;

    } else {
        gestureOutput.style.display = "none";
    }

    if (webcamRunning) {
        window.requestAnimationFrame(predictWebcam);
    }
}
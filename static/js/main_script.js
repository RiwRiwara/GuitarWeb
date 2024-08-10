import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
import { PitchDetector } from "https://esm.sh/pitchy@4";


const demosSection = document.getElementById("demos");
const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
const placeholderBlock = document.getElementById("placeholder_block");
const loadingSpinner = document.getElementById("loading_spinner");
const cameraCaution = document.getElementById("camera_caution");
const chord_image = document.getElementById("chord_image");

const chord_result = document.getElementById("chord_result");
const chord_result_con = document.getElementById("chord_result_con");
const overlay_guide = document.getElementById("overlay-guide");

const gestureOutput = document.getElementById("gesture_output");
const cameraToggle = document.getElementById("camera-toggle");
const captureButton = document.getElementById("capture-button");

let audioContext = new window.AudioContext();
let analyserNode = audioContext.createAnalyser();

const chords = {
    "A": [55, 110.00, 130.81, 146.83, 220.00, 293.66],
    "C": [32.72, 130.81, 164.81, 196.00, 261.63, 329.63],
    "E": [82.41, 110.00, 164.81, 220.00, 329.63],
    "D": [36.71, 73.42, 110.00, 146.83, 293.66, 440.00],
    "G": [98.00, 123.47, 146.83, 196.00, 246.94],
    "F": [87.31, 130.81, 174.61, 261.63, 349.23],
    "Am": [110.00, 130.81, 164.81, 220.00, 261.63, 329.63],
};

let chordLog = [];
let lastDetectedPitches = [];
let lastStrumTime = 0;
const strumThreshold = 200;
const bpm = 76;
const strumInterval = (60 / bpm) * 1000;

function recognizeChord(detectedPitches) {
    let recognizedChord = "-";
    let bestMatch = 0;

    Object.entries(chords).forEach(([chord, freqs]) => {
        const matchCount = freqs.filter(f => detectedPitches.some(p => Math.abs(p - f) < 2)).length;
        if (matchCount > bestMatch) {
            bestMatch = matchCount;
            recognizedChord = chord;
        }
    });

    return recognizedChord;
}

function detectStrum(detectedPitches) {
    const now = Date.now();
    if (detectedPitches.length > 0 && lastDetectedPitches.length > 0) {
        const pitchChange = detectedPitches.some(pitch => !lastDetectedPitches.includes(pitch));
        if (pitchChange && (now - lastStrumTime) > strumThreshold) {
            lastStrumTime = now;
            return true;
        }
    }
    return false;
}

function getDetectedPitches(analyserNode, detector, input, sampleRate) {
    analyserNode.getFloatTimeDomainData(input);
    const detectedPitches = [];

    for (let i = 0; i < input.length; i += detector.inputLength) {
        const subInput = input.subarray(i, i + detector.inputLength);
        const [pitch, clarity] = detector.findPitch(subInput, sampleRate);
        if (clarity > 0.8) {
            detectedPitches.push(pitch);
        }
//        console.log(pitch, clarity);
    }

    return detectedPitches;
}

function updatePitch(analyserNode, detector, input, sampleRate) {
    const detectedPitches = getDetectedPitches(analyserNode, detector, input, sampleRate);
    const chord = recognizeChord(detectedPitches);
    const isStrum = detectStrum(detectedPitches);

    if (chord !== "Unknown" && (chordLog.length === 0 || chordLog[chordLog.length - 1] !== chord)) {
        chordLog.push(chord);
        console.log("Chord detected:", chord, "Hz", detectedPitches);
        document.getElementById("userInput").value = chord;
        const event = new Event('input', { bubbles: true });
        document.getElementById("userInput").dispatchEvent(event);
    }

    document.getElementById("chord").textContent = chord;
    document.getElementById("pitch").textContent = detectedPitches.map(p => `${Math.round(p * 10) / 10} Hz`).join(", ");
    document.getElementById("clarity").textContent = detectedPitches.length > 0 ? "Detected" : "Not Detected";
    document.getElementById("strum").textContent = isStrum ? "Strum" : "-";

    lastDetectedPitches = detectedPitches;
    window.setTimeout(() => updatePitch(analyserNode, detector, input, sampleRate), strumInterval);
}


let gestureRecognizer;
let runningMode = "IMAGE";
let webcamRunning = false;
let lastVideoTime = -1;
let results = undefined;



const createGestureRecognizer = async () => {
    try {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "https://ezeventstorage.blob.core.windows.net/model-nsc/model6chord.task",
                delegate: "GPU"
            },
            runningMode: runningMode
        });
        demosSection.classList.remove("invisible");
    } catch (error) {
        console.error("Failed to initialize gesture recognizer:", error);
    }
};

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

const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
};

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


const startWebcam = () => {
    const constraints = {
        video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            video.srcObject = stream;
            webcamRunning = cameraToggle.checked;
            if (webcamRunning) {
                overlay_guide.style.display = "block";
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

    audioContext = new window.AudioContext();
    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;


    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        audioContext.createMediaStreamSource(stream).connect(analyserNode);
        const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
        const input = new Float32Array(analyserNode.fftSize);
        updatePitch(analyserNode, detector, input, audioContext.sampleRate);
    });
};




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
    let isHandDetected = false;
    if (results.landmarks) {
        for (const landmarks of results.landmarks) {
            drawingUtils.drawConnectors(
                landmarks,
                GestureRecognizer.HAND_CONNECTIONS,
                {
                    color: "#00ff00",
                    lineWidth: 1
                }
            );
            drawingUtils.drawLandmarks(landmarks, {
                color: "#ff0000",
                radius: 2,
            });

            if (isHandPositionedCorrectly(landmarks)) {
                isHandDetected = true;
            }
        }
    } else {
    }


    canvasCtx.restore();

    if (isHandDetected) {
        overlay_guide.style.display = "none";
    } else {
        overlay_guide.style.display = "block";
    }

    if (results.gestures.length > 0) {
        gestureOutput.style.display = "block";
        const categoryName = results.gestures[0][0].categoryName;
        const categoryScore = parseFloat(
            results.gestures[0][0].score * 100
        ).toFixed(2);

        var res_text = categoryName ? (mapCategoryToChord(categoryName) == 'none' ? '-' : mapCategoryToChord(categoryName)) : "-";
        /*
        if (res_text != "-") {
            document.getElementById("userInput").value = res_text;
            const event = new Event('input', { bubbles: true });
            document.getElementById("userInput").dispatchEvent(event);
        }
            */
        chord_result.innerText = res_text;
        chord_image.src = `static/images/chords/chord_${mapCategoryToChord(categoryName).toLowerCase()}.png`;
    } else {
        if (gestureOutput.style.display === "block") {
        }
    }

    if (webcamRunning) {
        window.requestAnimationFrame(predictWebcam);
    }
};



function mapCategoryToChord(category) {
    switch (category) {
        case "chord_a":
            return "A";
        case "chord_d":
            return "D";
        case "chord_e":
            return "E";
        case "chord_g":
            return "G";
        case "chord_c":
            return "C";
        case "chord_f":
            return "F";
        case "chord_am":
            return "Am";
        default:
            return "none";
    }
}

const captureImage = () => {
    canvasCtx.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    const imageUrl = canvasElement.toDataURL("image/jpg", 0.5);
    const blob = dataURLToBlob(imageUrl);
    const formData = new FormData();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    formData.append("file", blob, `captured_image_${timestamp}.jpg`);
    fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log("File saved successfully:", data);
        })
        .catch(error => {
            console.error("Error saving file:", error);
        });
};

const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bstr = atob(parts[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
    }

    return new Blob([u8arr], { type: mime });
};

if (hasGetUserMedia()) {
    cameraToggle.addEventListener("change", handleCameraToggle);
} else {
    console.warn("getUserMedia() is not supported by your browser");
}

const isHandPositionedCorrectly = (landmarks) => {
    const handWithinBounds = landmarks.every(landmark =>
        landmark.x > 0.6 && landmark.x < 1.0 &&
        landmark.y > 0.3 && landmark.y < 0.7
    );
    return handWithinBounds;
};




function onLoadPage() {

    if (typeof onLoadComplete === 'function') {
        onLoadComplete();
        loadSound();

    }
}

function onLoadComplete() {


    captureButton.addEventListener("click", captureImage);
    window.addEventListener('resize', resizeCanvas);
    createGestureRecognizer();


}

function audioResume() {
    audioContext.resume();
}


window.onload = onLoadPage;



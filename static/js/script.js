const soundIDs = ["chord_a", "chord_c", "chord_d", "chord_e", "chord_f", "chord_g"];
let loadedSounds = 0;

function loadSound() {
    soundIDs.forEach(soundID => {
        createjs.Sound.on("fileload", handleFileLoad, this);
        createjs.Sound.registerSound(`/static/sound/chords_sound/${soundID}.wav`, soundID);
    });
}

function handleFileLoad(event) {
    loadedSounds++;
    if (loadedSounds === soundIDs.length) {
        console.log("All sounds loaded.");
        if (typeof onLoadComplete === 'function') {
            onLoadComplete();
        }
    }
}

function playSound(soundID) {
    createjs.Sound.play(soundID);
}

// Default onLoad function
function onLoadPage() {
    console.log("Page is loading...");
    // Load sounds
    loadSound();
}

// Default onLoadComplete function
function onLoadComplete() {
    console.log("Page has loaded.");
    // Default behavior here
}

window.onload = onLoadPage;

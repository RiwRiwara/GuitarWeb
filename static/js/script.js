const soundIDs = ["chord_a", "chord_c", "chord_d", "chord_e", "chord_f", "chord_g"];

function loadSound () {
    soundIDs.forEach(soundID => {
        createjs.Sound.registerSound(`/static/sound/chords_sound/${soundID}.wav`, soundID);
    });
}

function playSound(soundID) {
    createjs.Sound.play(soundID);
}


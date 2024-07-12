soundID = "chord_c"

function loadSound () {
    createjs.Sound.registerSound("/static/sound/chords_sound/chord_c.wav", soundID);
  }

  function playSound (soundID) {
    createjs.Sound.play(soundID);
  }


  
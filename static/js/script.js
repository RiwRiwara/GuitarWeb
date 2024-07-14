const soundIDs = ["chord_a", "chord_c", "chord_d", "chord_e", "chord_f", "chord_g"];
let loadedSounds = 0;

songs_list = {
    "dontlookback": "https://ezeventstorage.blob.core.windows.net/model-nsc/song1.mp3",
}

function loadSound() {
    soundIDs.forEach(soundID => {
        createjs.Sound.on("fileload", handleFileLoad, this);
        createjs.Sound.registerSound(`/static/sound/chords_sound/${soundID}.wav`, soundID);
    });
    createjs.Sound.registerSound(songs_list['dontlookback'], "dontlookback");
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



function generateRandomString(length = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// document.addEventListener('DOMContentLoaded', function() {
//     const breadcrumbContainer = document.getElementById('breadcrumb');
//     const pathArray = window.location.pathname.split('/').filter(function(path) {
//         return path !== "";
//     });

//     if (pathArray.length === 0) {
//         breadcrumbContainer.innerHTML = '<a class="hover:text-gray-800 hover:font-semibold duration-300 ease-in" href="/">Home</a>';
//         return;
//     }

//     let breadcrumbHTML = '<a class="hover:text-gray-800 hover:font-semibold duration-300 ease-in" href="/">Home</a>';
//     let path = '';

//     pathArray.forEach(function(segment, index) {
//         path += `/${segment}`;
//         if (index === pathArray.length - 1) {
//             breadcrumbHTML += ` / <span>${segment}</span>`;
//         } else {
//             breadcrumbHTML += ` / <a href="${path}">${segment}</a>`;
//         }
//     });

//     breadcrumbContainer.innerHTML = breadcrumbHTML;
// });

function setCanvasHeight(mode) {
    var section_2 = document.getElementById("section_2");
    if (mode == "Scroll") {
        section_2.style.maxHeight = "600px";
    } else if (mode == "Full") {
        section_2.style.maxHeight = "100%";
    }

}
function setFontSize(mode) {
    var section_2 = document.getElementById("section_2");
    if (mode == "X") {
        section_2.style.fontSize = "1em";
    } else if (mode == "X2") {
        section_2.style.fontSize = "1.5em";
    } else if (mode == "X3") {
        section_2.style.fontSize = "2em";
    }

}


let scrollInterval = null;
const section = document.getElementById('section_2');

function scrollContent(speed) {
    clearInterval(scrollInterval);
    let scrollSpeed = 1; // Initial slower speed
    let intervalTime = 20; // Initial interval time

    switch (speed) {
        case 0:
            return;
        case 1:
            scrollSpeed = 1; // Slower speed
            intervalTime = 100; // Increase interval time for slower scroll
            break;
        case 2:
            scrollSpeed = 2; // Moderate speed
            intervalTime = 100;
            break;
        default:
            scrollSpeed = 1;
            intervalTime = 100;
            break;
    }

    scrollInterval = setInterval(() => {
        section.scrollTop += scrollSpeed;
        if (section.scrollTop >= (section.scrollHeight - section.clientHeight)) {
            section.scrollTop = 0;
        }
    }, intervalTime);
}

function resetScroll() {
    clearInterval(scrollInterval);
    section.scrollTop = 0;
}


function smoothScrollBy10px() {
    var bpm = document.getElementById("bpm");
    var bpm_value = bpm.value;
    if (bpm_value == "") {
        bpm_value = 60;
    }
    var bpm_value = bpm_value / 30;

    const targetPosition = section.scrollTop + bpm_value;
    const startPosition = section.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 500; // Duration of the scroll in milliseconds
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const increment = Math.min(progress / duration, 1); // Ensures the value stays within [0, 1]
        section.scrollTop = startPosition + (distance * increment);

        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            // Reset scroll position if reached the end
            if (section.scrollTop >= (section.scrollHeight - section.clientHeight)) {
                section.scrollTop = 0;
            }
        }
    }

    window.requestAnimationFrame(step);
}

const chordResult = document.getElementById('chord_result');
var step = 0;
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            if (chordResult.innerHTML !== '-') {
                if (step > 20) {
                    step = 0;
                    smoothScrollBy10px();

                }
                step++;
            }
        }
    });
});

observer.observe(chordResult, {
    childList: true,
    subtree: true,
    characterData: true
});
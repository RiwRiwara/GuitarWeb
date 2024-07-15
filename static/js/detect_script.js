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
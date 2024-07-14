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
    let scrollSpeed = 1;
    switch (speed) {
        case 0:
            return;
        case 1:
            scrollSpeed = 1;
            break;
        case 2:
            scrollSpeed = 2;
            break;
        default:
            scrollSpeed = 1;
            break;
    }

    scrollInterval = setInterval(() => {
        section.scrollTop += scrollSpeed;
        if (section.scrollTop >= (section.scrollHeight - section.clientHeight)) {
            section.scrollTop = 0;
        }
    }, 20);
}

function resetScroll() {
    clearInterval(scrollInterval);
    section.scrollTop = 0;
}
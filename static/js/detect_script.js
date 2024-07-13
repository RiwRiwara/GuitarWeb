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
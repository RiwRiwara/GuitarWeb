document.addEventListener("DOMContentLoaded", function () {
    const lines = document.querySelectorAll('.line');
    let currentIndex = 0;

    function highlightNextLine() {
        if (currentIndex > 0) {
            lines[currentIndex - 1].classList.remove('highlighted');
        }

        if (currentIndex < lines.length) {
            const currentLine = lines[currentIndex];
            currentLine.classList.add('highlighted');

            const nextDelay = parseInt(currentLine.dataset.next) || 1500;  

            currentIndex++;
            setTimeout(highlightNextLine, nextDelay);
        }
    }

    highlightNextLine();
});
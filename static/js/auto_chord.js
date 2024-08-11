var lines = document.querySelectorAll('.line');
let currentIndex = 0;
let timeoutId;
let isPaused = false;

// Function to handle autoplay
function playChordSlide() {
    if (isPaused) {
        return;
    }

    if (currentIndex > 0) {
        lines[currentIndex - 1].classList.remove('highlighted');
    }

    if (currentIndex < lines.length) {
        const currentLine = lines[currentIndex];
        currentLine.classList.add('highlighted');

        const nextDelay = parseInt(currentLine.dataset.next) || 1800;

        // Only set a timeout if the user has not already progressed
        if (!isPaused) {
            timeoutId = setTimeout(playChordSlide, nextDelay);
        }
    }
}


// Function to start autoplay
function startAutoplay() {
    currentIndex = 0;
    lines.forEach(line => line.classList.remove('highlighted'));

    clearTimeout(timeoutId);
    isPaused = false;
    playChordSlide();
}

// Function to pause autoplay
function pauseSlide() {
    isPaused = true;
    clearTimeout(timeoutId);
}

// Function to handle user input
function userInput() {
    const userChord = document.getElementById('userInput').value;
    const currentLine = lines[currentIndex];
    var chordElement = '';
    try {
        chordElement = currentLine.querySelector('.chord').innerHTML.trim();
    } catch (e) {
        chordElement = userChord;
    }

    console.log(userChord, chordElement);


    if (userChord === chordElement) {
        currentIndex++;
        if (currentIndex < lines.length) {
            lines[currentIndex - 1].classList.remove('highlighted');
            lines[currentIndex].classList.add('highlighted');
            document.getElementById('userInput').value = ''; // Clear input field
        }
        if (currentIndex < lines.length) {
            if (!isPaused) {
                playChordSlide();
            }
        } else {
            pauseSlide();
        }
    }
}

// Event listeners for buttons
document.getElementById('startButton').addEventListener('click', () => {
    startAutoplay();
});

document.getElementById('pauseButton').addEventListener('click', () => {
    pauseSlide();
});


// Optionally handle Enter key for user input
document.getElementById('userInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        userInput();
    }
});

document.getElementById('userInput').addEventListener('input', () => {
    userInput();
}
);

document.getElementById('skipButton').addEventListener('click', () => {
    skipChord();
});

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

// Function to skip to the next chord
function skipChord() {
    if (currentIndex < lines.length - 1) {
        lines[currentIndex].classList.remove('highlighted');
        currentIndex++;
        lines[currentIndex].classList.add('highlighted');

        // If autoplay is not paused, continue playing from the next chord
        if (!isPaused) {
            clearTimeout(timeoutId);
            playChordSlide();
        }
    } else {
        pauseSlide();
    }
}

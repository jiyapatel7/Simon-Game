
const colors = ["green", "red", "yellow", "blue"];

let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;
let acceptingInput = false;

const message = document.getElementById("message");
const levelDisplay = document.getElementById("level");
const startButton = document.getElementById("start-btn");

// Pause for a given time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Flash a color button
function flashButton(color) {
    const button = document.getElementById(color);

    button.classList.add("flash");

    setTimeout(() => {
        button.classList.remove("flash");
    }, 300);
}

// Display the computer's sequence
async function playSequence() {
    acceptingInput = false;
    startButton.disabled = true;

    await sleep(500);

    for (const color of gameSequence) {
        flashButton(color);
        await sleep(500);
    }

    acceptingInput = true;
    startButton.disabled = false;
    message.textContent = "Your Turn!";
}

// Move to the next level
function nextLevel() {
    level++;
    levelDisplay.textContent = level;
    userSequence = [];

    message.textContent = `Level ${level}`;

    const randomColor =
        colors[Math.floor(Math.random() * colors.length)];

    gameSequence.push(randomColor);

    playSequence();
}

// Start or restart the game
function startGame() {
    if (started) return;

    started = true;
    gameSequence = [];
    userSequence = [];
    level = 0;

    levelDisplay.textContent = level;
    message.textContent = "Get Ready!";
    startButton.textContent = "Playing...";

    nextLevel();
}

// Check the player's selected color
function checkAnswer(color) {
    if (!started || !acceptingInput) return;

    userSequence.push(color);
    flashButton(color);

    const currentIndex = userSequence.length - 1;

    if (userSequence[currentIndex] !==
        gameSequence[currentIndex]) {
        gameOver();
        return;
    }

    // Check whether the full sequence is correct
    if (userSequence.length === gameSequence.length) {
        acceptingInput = false;
        message.textContent = "Correct! Next level...";

        setTimeout(nextLevel, 800);
    }
}

// End the game
function gameOver() {
    started = false;
    acceptingInput = false;

    startButton.disabled = false;
    startButton.textContent = "Play Again";

    message.textContent = `Game Over! Final Level: ${level}`;

    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 500);

    gameSequence = [];
    userSequence = [];
}

// Add click events to the four buttons
colors.forEach(color => {
    document.getElementById(color).addEventListener(
        "click",
        () => checkAnswer(color)
    );
});

// Start button event
startButton.addEventListener("click", startGame);

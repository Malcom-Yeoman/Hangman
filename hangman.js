const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");
const wordToGuess = document.getElementById("wordToGuess");
const lettersEl = document.getElementById("letters");
const guessesLeftEl = document.getElementById("guessesLeft");
const gameMessage = document.getElementById("gameMessage");
const restartButton = document.getElementById("restartButton");
const words = ["javascript", "python", "pendu", "navigateur", "ordinateur", "internet", "programmation"];

let selectedWord, correctGuesses, wrongGuesses, maxGuesses;

function startGame() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    selectedWord = words[Math.floor(Math.random() * words.length)];
    correctGuesses = Array(selectedWord.length).fill("_");
    wrongGuesses = [];
    maxGuesses = 6;
    gameMessage.textContent = "";
    
    drawInitialHangman();
    updateWordDisplay();
    updateGuessesDisplay();
    initLetters();
    restartButton.style.display = "none";
}

function drawInitialHangman() {
    // Dessine la base
    ctx.moveTo(50, 240);
    ctx.lineTo(150, 240);
    
    // Dessine le poteau
    ctx.moveTo(100, 240);
    ctx.lineTo(100, 30);
    
    // Dessine la poutre supérieure
    ctx.moveTo(100, 30);
    ctx.lineTo(150, 30);
    
    // Dessine la corde
    ctx.moveTo(150, 30);
    ctx.lineTo(150, 50);
    
    ctx.stroke();
}

function updateWordDisplay() {
    wordToGuess.textContent = correctGuesses.join(" ");
}

function updateGuessesDisplay() {
    guessesLeftEl.textContent = "Essais restants: " + (maxGuesses - wrongGuesses.length);
}

function drawHangman() {
    switch(wrongGuesses.length) {
        case 1:
            ctx.beginPath();
            ctx.arc(150, 70, 20, 0, Math.PI * 2, true); // Tête
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(150, 90); // Corps
            ctx.lineTo(150, 150);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(150, 90); // Bras gauche
            ctx.lineTo(130, 120);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(150, 90); // Bras droit
            ctx.lineTo(170, 120);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(150, 150); // Jambe gauche
            ctx.lineTo(130, 190);
            ctx.stroke();
            break;
        case 6:
            ctx.beginPath();
            ctx.moveTo(150, 150); // Jambe droite
            ctx.lineTo(170, 190);
            ctx.stroke();
            break;
    }
}

function checkGameOver() {
    if (wrongGuesses.length >= maxGuesses) {
        gameMessage.textContent = "Vous avez perdu ! Le mot était " + selectedWord + ".";
        disableAllButtons();
        restartButton.style.display = "block";

        return true; 
    }

    if (!correctGuesses.includes("_")) {
        gameMessage.textContent = "Félicitations, vous avez gagné !";
        disableAllButtons();
        restartButton.style.display = "block";

        return true; 
    }
    
    return false;
}

function disableAllButtons() {
    const buttons = document.querySelectorAll("#letters button");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

function checkGuess(letter) {
    let button = Array.from(document.querySelectorAll("#letters button")).find(btn => btn.textContent === letter);
    button.disabled = true; 

    if (selectedWord.includes(letter)) {
        selectedWord.split("").forEach((l, index) => {
            if (l === letter) correctGuesses[index] = letter;
        });
    } else {
        wrongGuesses.push(letter);
        drawHangman();
    }

    updateWordDisplay();
    updateGuessesDisplay();
    checkGameOver();
}

function initLetters() {
    lettersEl.innerHTML = '';
    "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.className = 'btn btn-primary m-1';
        button.addEventListener("click", () => {
            checkGuess(letter);
        });
        lettersEl.appendChild(button);
    });
}

restartButton.addEventListener("click", startGame);
startGame();
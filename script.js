const inputs = document.querySelector(".inputs");
const hintTag = document.querySelector(".hint span");
const guessesLeft = document.querySelector(".guesses-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const resetButton = document.querySelector(".reset-button");
const takeInput = document.querySelector(".take-input");

let word;
let maxGuesses;
let incorrectLetters = [];
let correctLetters = [];

function randomWord() {
    const ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = [];
    incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessesLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}

randomWord();

function initGame(e) {
    const key = e.target.value.toLowerCase();
    if (
        key.match(/^[A-Za-z]+$/) &&
        !incorrectLetters.includes(` ${key}`) &&
        !correctLetters.includes(key)
    ) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessesLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    takeInput.value = "";
    setTimeout(() => {
        if (correctLetters.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();
        } else if (maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetButton.addEventListener("click", randomWord);
takeInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => takeInput.focus());
document.addEventListener("keydown", () => takeInput.focus());



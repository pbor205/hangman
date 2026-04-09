// readline is a built-in Node.js library for reading console input
// I learned how to use it with help from Claude AI

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define global variables
const letters = 'abcdefghijklmnopqrstuvwxyz';
let blanks = [];
let lettersGuessed = [];
let word;

// wordList is using a list of the ~10,000 most searched words on Google search
// I learned how to define a list to the file using Claude AI
const wordList = fs.readFileSync('wordlist-cleaned.txt', 'utf8').split('\n');

// Calls the function startGame() to begin
startGame();

/*
Function to ask the player for a letter.
Main game loop.
Uses parameter 'lives' to perform logic for losing the game.
Terminates once the player wins or loses.

Includes multiple checks:
- If it's an actual letter
- If it's only one letter long
- If it's already been guessed
*/
function askForLetter(lives) {
    rl.question("Player, enter a letter: ", (letter) => {

        let guess = letter.toLowerCase();

        if (letters.includes(guess) && guess.length === 1) {
            if (!lettersGuessed.includes(guess)) {

                lettersGuessed.push(guess);

                if (word.includes(guess)) {
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === guess) {
                            blanks[i] = guess;
                        }
                    }
                } else {
                    lives--;
                    console.log("Wrong! Try again");
                }

            } else {
                console.log("Letter already guessed, try again");
            }

        } else {
            console.log("Please enter a valid letter");
        }

        console.log(blanks.join(" "));

        if (!blanks.includes("_")) {
            console.log("You win!");
            console.log("Word was: " + word);
            playAgain();

        } else {

            if (lives > 0) {
                console.log("Letters guessed: " + lettersGuessed.join(" "));
                console.log("Lives left: " + lives);
                askForLetter(lives);

            } else {
                console.log("You lose!");
                console.log("Word was: " + word);
                playAgain();
            }
        }
    });
}

/*
Function to ask if the user wants to play again.
Called by askForLetter() once the player wins or loses.
If the user inputs anything besides "y" or "Y", the program terminates.
*/
function playAgain() {
    rl.question("Play again? (Y/N): ", (answer) => {
        if (answer.toLowerCase() === "y") {
            startGame();
        } else {
            console.log("Thanks for playing!");
            rl.close();
        }
    });
}

/*
Function to start the game.
Resets variables and selects a random word from wordList.
*/
function startGame() {
    blanks = [];
    lettersGuessed = [];

    rl.question("One player or two player? (1/2): ", (answer) => {

        if (answer === "1") {

            word = wordList[Math.floor(Math.random() * wordList.length)].trim();

            for (let i = 0; i < word.length; i++) {
                blanks.push("_");
            }

            console.log("A word has been chosen!");
            console.log(blanks.join(" "));

            const startingLives = Math.round(word.length * 0.75);
            askForLetter(startingLives);

        } else if (answer === "2") {

            rl.question("Host, enter a word: ", (answer) => {

                if (wordList.includes(answer.toLowerCase())) {

                    word = answer.toLowerCase();

                    for (let i = 0; i < word.length; i++) {
                        blanks.push("_");
                    }

                    console.clear();
                    console.log("A word has been chosen!");
                    console.log(blanks.join(" "));

                    const startingLives = Math.round(word.length * 0.75);
                    askForLetter(startingLives);

                } else {
                    console.log("Word not in dictionary, try again");
                    startGame();
                }
            });

        } else {
            console.log("Please enter 1 or 2");
            startGame();
        }
    });
}
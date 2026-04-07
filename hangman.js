//Define global variables
let word;
let letters = 'abcdefghijklmnopqrstuvwxyz'
let blanks = [];
let lettersGuessed = [];
//readline is a built-in Node.js library for reading console input
//I learned how to use it with help from Claude AI
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Calls the function startGame() to begin
startGame();

//Function to ask the player for a letter.
//Main game loop
//Uses parameter 'lives' to perform logic for losing the game
//Terminates once the player wins or loses
/*Includes multiple checks
-If it's an actual letter
-If it's only one letter long
-If it's already been guessed
 */
function askForLetter(lives){
    rl.question("Player, enter a letter: ", (letter) =>{
        if (letters.includes(letter.toLowerCase()) && letter.length === 1){
            if(!lettersGuessed.includes(letter.toLowerCase())){
                lettersGuessed.push(letter.toLowerCase());
                if (word.includes(letter.toLowerCase())) {
                    for (let i = 0; i < word.length; i++){
                        if (word[i].toLowerCase() === letter.toLowerCase()){
                            blanks[i] = letter.toLowerCase();
                        }
                    }
                } else {
                    lives--;
                    console.log("Wrong! Try again");
                }
            } else {
                console.log("Letter already guessed, try again");

            } } else{
            console.log("Please enter a valid letter")

        }

        console.log(blanks.join(" "));
        if (!blanks.includes("_")) {
            console.log("You win!");
            console.log("Word was: " + word);
            playAgain();
        } else {
            if (lives > 0){
                console.log( "Letters guessed: " + lettersGuessed.join(" "));
                console.log( "Lives left: " + lives);
                askForLetter(lives);
            }else{
                console.log("You lose!");
                console.log("Word was: " + word);
                playAgain();
            }

        }
    });
}
//Function to ask if the user wants to play again
//Called by askForLetter() once the player wins or loses.
//If the user inputs anything besides "y" or "Y", the program terminates
function playAgain(){
    rl.question("Play again? (Y/N): ", (answer) =>{
        if (answer.toLowerCase() === "y"){
            startGame();
        } else{
            console.log("Thanks for playing!")
            rl.close();
        }
    })
}
//Function to start the game
//resets variables, asks host for a word/phrase
//Called at the beginning of the program and by playAgain() if the player chooses to play again
/* Includes multiple checks
- word must only be letters and spaces
- word must be longer than 0 characters
 */
function startGame(){
    blanks = [];
    lettersGuessed = [];
    rl.question("Host, enter a word/phrase: ", (inputWord) => {
        if (inputWord.length > 0) {
            word = inputWord.toLowerCase().trim();
            for (let i = 0; i < word.length; i++) {
                if (word[i] === " "){
                    blanks.push("   ");
                } else{
                    if (letters.includes(word[i].toLowerCase())){
                        blanks.push("_");}
                    else{
                        console.log("Please input only letters and spaces");
                        startGame();
                        return;
                    }
                }
            }
            console.clear();
            console.log(blanks.join(" "));
            const startingLives = Math.round(word.replace(/ /g, '').length * 0.75);
            askForLetter(startingLives);
        } else {
            console.log("Word must be longer than 0 characters!");
            startGame();
        }
    });
}
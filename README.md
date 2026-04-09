# Hangman Word Game
A console-based Hangman game built with Node.js and JavaScript.
Demonstrates input validation, game state tracking, and file handling.

---

## Features
- One-player mode (random word from dictionary)  
- Two-player mode (host enters a word)  
- Tracks letters guessed and lives remaining  
- Win/loss detection with option to play again

---

## How to Run
1. Clone the repository:
```bash
   git clone https://github.com/pbor205/hangman.git
```
2. Navigate into the project folder:
```bash
   cd hangman
```
3. Run the game:
```bash
   node hangman.js
```

---

## Word List
The word list is derived from [google-10000-english](https://github.com/first20hours/google-10000-english), a ranked list of the 10,000 most common English words compiled from Google's Trillion Word Corpus, filtered to exclude profanity.

---

## Dev Folder
The `dev/` folder contains the original word list and the script used to process it. `wordClean.js` filtered out single-letter words and alphabetized the list, producing `wordlist-cleaned.txt` used by the game.

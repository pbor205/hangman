const fs = require('fs');

//Read the file, split into array by line
let wordList = fs.readFileSync('google-10000-english-usa-no-swears.txt', 'utf8').split('\n');

//Filter out one letter words and empty lines, then alphabetize
wordList = wordList
    .filter(word => word.trim().length > 1)
    .sort();

//Save the cleaned list to a new file
fs.writeFileSync('wordlist-cleaned.txt', wordList.join('\n'));

console.log("Done! " + wordList.length + " words saved.");

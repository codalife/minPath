/*
const fs = require('fs');
fs.readFile(
  './google-10000-english/google-10000-english-no-swears.txt',
  'utf8',
  (err, res) => {
    const arrfWords = res.split('\n').filter(word => word.length > 2);
    fs.writeFileSync('./setOfWords.json', JSON.stringify(arrfWords));
  },
);
*/

const words = require('./setOfWords.json');

const setOfWords = new Set(words);

// Object.keys(dictionary).reduce((dic, word) => {
//   if (word.length > 2) {
//     dic.add(word);
//   }
//   return dic;
// }, setOfWords);

[
  'heath',
  'heats',
  'hents',
  'hends',
  'hands',
  'team',
  'mate',
  'glasses',
  'OPHTHALMOLOGY',
].forEach(word => setOfWords.add(word));

class MinPathFinder {
  constructor(dictionary) {
    this.dictionary = dictionary;
  }

  calculateMinPath(costs, word1, word2) {
    let [addLetter, deleteLetter, changeLetter, takeAnagram] = costs;
    deleteLetter = Math.min(deleteLetter, addLetter);
    const seen = new Set();
    let result = Number.MAX_SAFE_INTEGER;

    const recursiveFind = (from, to, soFar) => {
      if (from === to) {
        result = Math.min(result, soFar);
        return;
      }
      if (soFar >= result || seen.has(from)) {
        return;
      }

      seen.add(from);

      if (from.length !== to.length) {
        if (from.length > to.length) {
          for (let i = 0; i < from.length; i += 1) {
            let candidate = from.substring(0, i) + from.substring(i + 1);
            if (this.dictionary.has(candidate)) {
              recursiveFind(candidate, to, soFar + deleteLetter);
            }
          }
        } else {
          for (let j = 0; j < to.length; j += 1) {
            let candidate = to.substring(0, j) + to.substring(j + 1);
            if (this.dictionary.has(candidate)) {
              recursiveFind(from, candidate, soFar + deleteLetter);
            }
          }
        }
      } else {
        if (this.areAnagrams(from, to)) {
          result = Math.min(result, soFar + takeAnagram);

          recursiveFind(from, to);
        }

        for (let j = 0; j < from.length; j += 1) {
          for (
            let charCode = 'a'.charCodeAt(0);
            charCode <= 'z'.charCodeAt(0);
            charCode += 1
          ) {
            let char = String.fromCharCode(charCode);
            let candidate = from.substring(0, j) + char + from.substring(j + 1);

            if (this.dictionary.has(candidate)) {
              recursiveFind(candidate, to, soFar + changeLetter);
            }
          }
        }
      }
      seen.delete(from);
    };

    recursiveFind(word1.toLowerCase(), word2.toLowerCase(), 0);

    return result === Number.MAX_SAFE_INTEGER ? -1 : result;
  }
  areAnagrams(word1, word2) {
    const candidate1 = word1
      .split('')
      .sort()
      .join('');
    const candidate2 = word2
      .split('')
      .sort()
      .join('');

    return candidate1 === candidate2;
  }
}

const testWord1 = 'ophtalmology';
const testWord2 = 'glasses';
const testCosts = [1, 3, 1, 5];

const solver = new MinPathFinder(setOfWords);

const result = solver.calculateMinPath(testCosts, testWord1, testWord2);

const result1 = solver.calculateMinPath([1, 3, 1, 5], 'health', 'hands');
const result2 = solver.calculateMinPath([1, 9, 1, 3], 'team', 'mate');
console.log(`result with team and mate is ${result2}`);
console.log(`result with health and hands is ${result1}`);

console.log(`result is ${result}`);

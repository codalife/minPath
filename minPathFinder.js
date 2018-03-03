const dictionary = require('./WebstersEnglishDictionary/dictionary.json');

const setOfWords = Object.keys(dictionary).reduce((dic, word) => {
  if (word.length > 2) {
    dic.add(word);
  }
  return dic;
}, new Set());

class MinPathFinder {
  constructor(dictionary) {
    this.dictionary = dictionary;
    // console.log(this.dictionary);
  }

  calculateMinPath(costs, word1, word2) {
    let [addLetter, deleteLetter, changeLetter, takeAnagram] = costs;
    deleteLetter = Math.min(deleteLetter, addLetter);
    const seen = new Set();
    let result = Number.MAX_SAFE_INTEGER;

    const recursiveFind = (from, to, soFar) => {
      //   console.log('*********************');
      console.log(`word1: ${from}, word2: ${to}`);
      //   console.log(seen);
      if (from === to) {
        console.log(`found similar words`);
        result = Math.min(result, soFar);
        return;
      }
      if (soFar >= result || seen.has(from)) {
        // console.log(`hit destination because ${this.dictionary.has(from)}`);
        return;
      }

      seen.add(from);

      if (from.length !== to.length) {
        // console.log(`see that lengths are not equal`);
        if (from.length > to.length) {
          for (let i = 0; i < from.length; i += 1) {
            let candidate = from.substring(0, i) + from.substring(i + 1);
            console.log(candidate);
            if (this.dictionary.has(candidate)) {
              recursiveFind(candidate, to, soFar + deleteLetter);
            }
          }
        } else {
          for (let j = 0; j < to.length; j += 1) {
            let candidate = to.substring(0, j) + to.substring(j + 1);
            console.log(candidate);
            if (this.dictionary.has(candidate)) {
              recursiveFind(from, candidate, soFar + deleteLetter);
            }
          }
        } // recursiveFind(from.slice(-1), to, soFar + deleteLetter);

        for (let i = 0; i < from.length; i += 1) {
          let candidate = from.substring(0, i) + from.substring(i + 1);
          console.log(candidate);
          if (this.dictionary.has(candidate)) {
            recursiveFind(candidate, to, soFar + deleteLetter);
          }
        }
      } else {
        // console.log(`Equal lengths words`);
        if (this.areAnagrams(from, to)) {
          result = Max.min(result, soFar + takeAnagram);

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
    };

    recursiveFind(word1, word2, 0);

    return result;
  }
  areAnagrams(word1, word2) {
    return (
      word1
        .split()
        .sort()
        .join() ===
      word2
        .split()
        .sort()
        .join()
    );
  }
}

const testWord1 = 'suit';
const testWord2 = 'suite';
const testCosts = [1, 3, 1, 5];

const solver = new MinPathFinder(setOfWords);

const result = solver.calculateMinPath(testCosts, testWord1, testWord2);
// let result = 'hello';
console.log(`result is ${result}`);

(() => {
  const firstRow = document.querySelector(".guessLetterFirstRow");
  const secondRow = document.querySelector(".guessLetterSecondRow");
  const thirdRow = document.querySelector(".guessLetterThirdRow");

  let firstRowButtons = [],
    secondRowButtons = [],
    thirdRowButtons = [];
  let lettersForFirstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  let letterForSecondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  let letterForThirdRow = ["z", "x", "c", "v", "b", "n", "m"];

  generateLetters(firstRowButtons, lettersForFirstRow, firstRow);
  generateLetters(secondRowButtons, letterForSecondRow, secondRow);
  generateLetters(thirdRowButtons, letterForThirdRow, thirdRow);

  function generateLetters(row, letters, HtmlElement) {
    for (let i = 0; i < letters.length; i++) {
      row[i] = document.createElement("BUTTON");
      row[i].innerHTML = letters[i];

      HtmlElement.appendChild(row[i]);
    }
  }
})();

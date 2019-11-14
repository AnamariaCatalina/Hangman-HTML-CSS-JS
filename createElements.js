(() => {
  const firstRow = document.querySelector(".guessLetterFirstRow");
  const secondRow = document.querySelector(".guessLetterSecondRow");
  const thirdRow = document.querySelector(".guessLetterThirdRow");
  const start = document.querySelector(".start");
  const word = document.querySelector(".word");
  const button = document.querySelector(".buttons");
  const wrongChoisesText = document.querySelector(".wrongChoisesText");
  const wrongChoisesRow = document.querySelector(".wrongChoisesRow");
  const img = document.querySelector(".underHangmanImage");

  let firstRowButtons = [],
    secondRowButtons = [],
    thirdRowButtons = [];

  let lettersForFirstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  let letterForSecondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  let letterForThirdRow = ["z", "x", "c", "v", "b", "n", "m"];

  generateLetters(firstRowButtons, lettersForFirstRow, firstRow);
  generateLetters(secondRowButtons, letterForSecondRow, secondRow);
  generateLetters(thirdRowButtons, letterForThirdRow, thirdRow);

  createChildParagraph(word, "Let's start!");

  createButton("Start", "start", start);
  createButton("Reset", "reset", button);
  createButton("Hint", "hint", button);

  addAfterBeginElement("P", wrongChoisesText, "Wrong choises:");
  addAfterBeginElement("P", wrongChoisesRow, "");

  createImage(img, "./images/0.png", "hangman-image");

  function generateLetters(row, letters, HtmlElement) {
    for (let i = 0; i < letters.length; i++) {
      row[i] = document.createElement("BUTTON");
      row[i].innerHTML = letters[i];

      HtmlElement.appendChild(row[i]);
    }
  }

  function createChildParagraph(HtmlElement, text) {
    let paragraph = document.createElement("P");
    HtmlElement.appendChild(paragraph);

    renameParagraph(paragraph, text);
  }

  function renameParagraph(paragraph, text) {
    paragraph.innerHTML = text;
  }

  function createButton(buttonName, className, HtmlElement) {
    let button = document.createElement("BUTTON");
    HtmlElement.appendChild(button);

    renameButton(button, buttonName);
    addElementClass(button, className);
  }

  function renameButton(button, text) {
    button.innerHTML = text;
  }

  function addElementClass(element, className) {
    element.className += className;
  }

  function addAfterBeginElement(elementType, HtmlElement, text) {
    let paragraph = document.createElement(elementType);

    HtmlElement.insertAdjacentElement("afterbegin", paragraph);

    renameParagraph(paragraph, text);
  }

  function createImage(HtmlElement, src, alt) {
    let img = document.createElement("IMG");

    img.src = src;
    img.alt = alt;

    HtmlElement.appendChild(img);
  }
})();

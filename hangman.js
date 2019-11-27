(() => {
  const start = document.querySelector(".start button"); // variables asociated to visible elements fron the screen
  const reset = document.querySelector(".reset");
  const hint = document.querySelector(".hint");
  const word = document.querySelector(".word p");
  const guessLetter = document.querySelectorAll(".letters button");
  const image = document.querySelector(".underHangmanImage img");
  const wrongChoises = document.querySelector(".wrongChoisesRow p");
  const score = document.querySelector(".score ");
  const time = document.querySelector(".timer");

  const words = [
    // array with random words
    "house",
    "pool",
    "chicken",
    "bathroom",
    "orange",
    "juice",
    "mobile",
    "laptop",
    "white",
    "horse",
    "lime"
  ];

  let randomWord = ""; // contains a random word from the vector words

  let numberOfWrongLetters = 0; //count how many wrong buttons were pressed in one round
  let correctWordWithLines = "";
  let nrOfPressHintButton = 0; //how many times the hint button has been pressed
  let scoreValue = 0;
  let interval;

  disableLetterButtons();
  updateTimerContent();
  hint.disabled = true;

  start.addEventListener("click", () => {
    transformWordIntoLines(); //when the start button is pressed, the generated word is transformed into lines and printed on the screen
    console.log(`The word is: ${randomWord}`);

    enableButton(guessLetter);
    hint.disabled = false;
    start.disabled = true;

    updateImage("./images/0.png");
    wrongChoises.textContent = "";

    nrOfPressHintButton = 0;

    startTimer(120);
  });

  guessLetter.forEach(button => {
    button.addEventListener("click", () => {
      let actualWord = randomWord.split("");
      correctWordWithLines = word.textContent.split("");

      let correctChoise = false; //initial we consider that the pressed button is wrong

      for (let i = 0; i < actualWord.length; i++) {
        if (actualWord[i] === button.textContent) {
          correctWordWithLines[i] = actualWord[i];
          word.textContent = correctWordWithLines.join("");

          correctChoise = true;
        }
      }

      button.disabled = true;
      button.style.backgroundImage = "url('./images/empty.png')";

      console.log(`correctChoise :${correctChoise}`);

      if (correctChoise === false) {
        wrongChoises.textContent += " " + button.textContent;
        numberOfWrongLetters++;
      }

      updateImage(`./images/${numberOfWrongLetters}.png`);
      checkNumberOfWrongLetters();
      checkWord();
    });
  });

  // reset the game when the reset button is pressed
  reset.addEventListener("click", () => {
    restartGame();
    disableLetterButtons();

    start.disabled = false;
    hint.disabled = true;

    updateImage("./images/0.png");

    wrongChoises.textContent = "";
    nrOfPressHintButton = 0;
  });

  hint.addEventListener("click", e => {
    let positionOfLinesIntoTheWord = []; //all the positions of the undiscovered letters (still with line)
    let j = 0; // index for positionOfLinesIntoTheWord
    let randomLetterFromWord; // random letter which were not discovered
    correctWordWithLines = word.textContent.split("");

    checkHintPresses(nrOfPressHintButton);

    if (scoreValue < 2) {
      e.preventDefault;
      alert("You need at least 2 points to press HINT!");
    } else {
      for (let i = 0; i < correctWordWithLines.length; i++) {
        if (word.textContent[i] === "-") {
          positionOfLinesIntoTheWord[j] = i; //we memorize the positions of the lines into the current word displayed with lines
          j++;
        }
      }

      randomLetterFromWord = //we generate a random letter that should be in the place of the lines
        randomWord[
          positionOfLinesIntoTheWord[
            Math.floor(Math.random() * positionOfLinesIntoTheWord.length)
          ]
        ];

      for (let i = 0; i < randomWord.length; i++) {
        //we are looking where the random letter should be into the word and modify the word with lines displayed
        if (randomWord[i] === randomLetterFromWord) {
          // with the new letter
          correctWordWithLines[i] = randomLetterFromWord;
          word.textContent = correctWordWithLines.join("");
        }
      }

      guessLetter.forEach(button => {
        if (button.textContent === randomLetterFromWord) {
          button.disabled = true;
          button.style.backgroundImage = "url('./images/empty.png')";
        }
      });

      nrOfPressHintButton++;

      scoreValue = scoreValue - 2;

      updateScoreContent("Score: " + scoreValue + "  ");
      checkWord();
    }
  });

  function transformWordIntoLines() {
    let letters;
    let wordWithlines = "";

    generateRandomWord();

    letters = randomWord.split("");
    letters.forEach(() => {
      wordWithlines = wordWithlines + "-";
    });

    word.textContent = wordWithlines;

    numberOfWrongLetters = 0;
  }

  function startTimer(duration) {
    var timer = duration,
      minutes,
      seconds;
    interval = setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      time.textContent = "Timer:" + minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
      }
      if (timer === 0) {
        alert(`End of the game! Your score is: ${scoreValue}`);
        restartGame();
      }
    }, 1000);
  }

  function generateRandomWord() {
    randomWord = words[Math.floor(Math.random() * words.length)];
    word.textContent = randomWord;
  }

  function enableButton(buttons) {
    buttons.forEach(button => {
      button.disabled = false;
      button.style.backgroundImage = "";
    });
  }

  function disableLetterButtons() {
    guessLetter.forEach(button => {
      button.disabled = true;
    });
  }

  // checking if the guessed word is correct
  function checkWord() {
    if (word.textContent === randomWord) {
      transformWordIntoLines();
      console.log(`randomword este: ${randomWord}`);

      guessLetter.forEach(button => {
        button.disabled = false;
        button.style.backgroundImage = "";
      });

      correctChoise = "";

      wrongChoises.textContent = "";

      updateImage("./images/0.png");

      scoreValue = scoreValue + 3;
      updateScoreContent(`Score:` + `${scoreValue}`);
    }
  }

  // checking how many times the hint button has been pressed
  function checkHintPresses(nrOfPressHintButton) {
    if (nrOfPressHintButton === 6) {
      setTimeout(() => {
        alert("You pressed the maximum number of hints!");
      }, 500);

      hint.disabled = true;
      nrOfPressHintButton = 0;
    }
  }

  function checkNumberOfWrongLetters() {
    if (numberOfWrongLetters === 6) {
      setTimeout(() => {
        alert("End of Game");
      }, 500);

      restartGame();
    }
  }

  function restartGame() {
    start.style.display = "";
    word.textContent = "Let's Play!";

    hint.disabled = false;

    randomWord = "";

    correctChoise = "";
    numberOfWrongLetters = 0;

    scoreValue = 0;
    updateScoreContent("Score: " + `${scoreValue}`);

    clearInterval(interval);
    updateTimerContent();
  }

  function updateTimerContent() {
    time.textContent = `Timer: 00:00`;
  }

  function updateImage(src) {
    image.src = src;
  }

  function updateScoreContent(scoreContent) {
    score.textContent = scoreContent;
  }
})();

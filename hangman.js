(() => {
  const start = document.querySelector(".start button"); // variables asociated to visible elements fron the screen
  const reset = document.querySelector(".reset");
  const hint = document.querySelector(".hint");
  const word = document.querySelector(".word");
  const guessLetter = document.querySelectorAll(".guessLetter button");
  const image = document.querySelector(".underHangmanImage img");
  const wrongChoises = document.querySelector(".wrongChoisesRow p");
  const score = document.querySelector(".score ");
  const time = document.querySelector(".timer");

  const words = [
    // vector with random words
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

  let oldWordWithLines = []; // memorize the sequence of buttons which were pressed in order to count the mistakes
  let newWordWithLines = [];
  let numberOfWrongLetters = 0; //count how many wrong buttons were pressed in one round
  let correctWordWithLines = "";
  let nrOfPressHintButton = 0; //how many times the hint button has been pressed
  let scoreValue = 0;

  time.textContent = `Timer: 00:00`;
  duration = 120;
  let interval;

  disableLetterButtons();

  start.addEventListener("click", () => {
    transformWordIntoLines(); //when the start button is pressed, the generated word is transformed into lines and printed on the screen
    console.log(`The word is: ${randomWord}`);

    enableLetterButtons();
    hint.disabled = false;
    start.disabled = true;

    image.src = "./images/0.png";
    wrongChoises.textContent = "";

    nrOfPressHintButton = 0;

    startTimer(duration);
  });

  guessLetter.forEach(buton => {
    buton.addEventListener("click", () => {
      let actualWord = randomWord.split("");
      correctWordWithLines = word.textContent.split("");

      let correctChoise = false; //initial we consider that the pressed button is wrong

      for (let i = 0; i < actualWord.length; i++) {
        if (actualWord[i] === buton.textContent) {
          correctWordWithLines[i] = actualWord[i];
          word.textContent = correctWordWithLines.join("");

          correctChoise = true;
        }
      }

      buton.disabled = true;
      buton.style.backgroundImage = "url('./images/empty.png')";

      if (correctChoise === true) {
        newWordWithLines = newWordWithLines + buton.textContent;
        oldWordWithLines = oldWordWithLines + buton.textContent;
      } else {
        newWordWithLines = newWordWithLines + buton.textContent;
      }

      if (newWordWithLines !== oldWordWithLines) {
        numberOfWrongLetters++;
        wrongChoises.textContent =
          wrongChoises.textContent + " " + buton.textContent;
      }

      oldWordWithLines = newWordWithLines;

      image.src = `./images/${numberOfWrongLetters}.png`;

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

    image.src = "./images/0.png";
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

      guessLetter.forEach(buton => {
        if (buton.textContent === randomLetterFromWord) {
          buton.disabled = true;
          buton.style.backgroundImage = "url('./images/empty.png')";
        }
      });

      nrOfPressHintButton++;

      // checkWord();

      scoreValue = scoreValue - 2;
      score.textContent = "Score: " + scoreValue + "  ";
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

  function enableLetterButtons() {
    guessLetter.forEach(buton => {
      buton.disabled = false;
      buton.style.backgroundImage = "";
    });
  }

  function disableLetterButtons() {
    guessLetter.forEach(buton => {
      buton.disabled = true;
    });
  }

  // checking if the guessed word is correct
  function checkWord() {
    if (word.textContent === randomWord) {
      transformWordIntoLines();
      console.log(`randomword este: ${randomWord}`);

      guessLetter.forEach(buton => {
        buton.disabled = false;
        buton.style.backgroundImage = "";
      });

      newWordWithLines = [];
      oldWordWithLines = [];
      correctChoise = "";

      wrongChoises.textContent = "";
      image.src = "./images/0.png";

      scoreValue = scoreValue + 3;
      score.textContent = `Score:` + `${scoreValue}`;
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

  //restart game
  function restartGame() {
    start.style.display = "";
    word.textContent = "Let's Play!";

    hint.disabled = false;

    enableLetterButtons();

    randomWord = "";

    newWordWithLines = [];
    oldWordWithLines = [];
    correctChoise = "";
    numberOfWrongLetters = 0;

    scoreValue = 0;
    score.textContent = "Score: " + `${scoreValue}`;

    clearInterval(interval);
    time.textContent = `Timer: 00:00`;
  }
})();

const homepage = document.querySelector(".homepage");
const start = document.querySelector(".start");
const secondPage = document.querySelector(".second-page");
const box = document.querySelector(".box");
const endQuiz = document.querySelector(".end-quiz");
const restartBtn = document.querySelector(".restart");
const questionNoElem = document.querySelector(".question-no span"); // Reference to the question number element
const resultSpan = document.querySelector(".result span"); // Reference to the question number element

const quiz = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "In which year did World War II end?",
    options: ["1942", "1945", "1950", "1939"],
    answer: "1945",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
    answer: "Harper Lee",
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
    answer: "Vatican City",
  },
  {
    question: "Which planet has the most moons?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    answer: "Blue Whale",
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1900", "1912", "1920", "1898"],
    answer: "1912",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Claude Monet",
    ],
    answer: "Leonardo da Vinci",
  },
];

function startGame() {
  start.addEventListener("click", () => {
    homepage.style.display = "none";
    secondPage.style.display = "block";
    // Initially, show the first question
    showData(index);
  });
}
startGame();

let index = 0; // Keeps track of the current question index
let questionNo = 1; // Starts with the first question
let totalCorrect = 0;

let timer = 30; // Initial timer value
let timerInterval; // Variable to hold the interval ID

function timerclock(index) {
  // Clear any existing interval before starting a new one
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const timerEl = document.querySelector(".clock span");
    if (timer > 0) {
      timer--;

      //Add leading zero if the timer value is less than 10
      timerEl.innerText = timer < 10 ? `0${timer}` : timer;

      //Change color based on the timer
      if (timer <= 15 && timer > 5) {
        secondPage.style.backgroundColor = "#C5B100";
      } else if (timer <= 5) {
        secondPage.style.backgroundColor = "#C50C00";
      }
    } else {
      clearInterval(timerInterval); // Stop the timer once it hits 0
      // Handle what happens when the timer reaches 0, if needed
      // Always save unanswered state, even if already exists
      const quizState = JSON.parse(localStorage.getItem("quiz-state")) || {};
      quizState[index] = {
        selectedOption: null,
        quizTime: 0,
      };
      localStorage.setItem("quiz-state", JSON.stringify(quizState));
      console.log("Saved unanswered state for question", index);
      // Disable all options when timer reaches 0
      const allOptions = document.querySelectorAll(".options .option");
      allOptions.forEach((opt) => opt.classList.add("disabled"));
    }
  }, 500);
}

// Function to render the current question and options
function showData(index) {
  const quizState = JSON.parse(localStorage.getItem("quiz-state")) || {};

  // Retrieve the saved timer value for the current question
  const savedTime = quizState[index] ? quizState[index].quizTime : 30;
  timer = savedTime;
  const timerEl = document.querySelector(".clock span");
  // Update the UI with the saved timer value
  if (savedTime !== undefined) {
    timerEl.innerText = savedTime < 10 ? `0${savedTime}` : savedTime;
  } else {
    timerEl.innerText = "30"; // If no saved time, set default to 30
  }
  
  //Below line code controls when to start the timer for a quiz question.
  //Condition explained:
  //(1) savedTime === 30
  // This checks if the timer for the current question is at its initial value (30 seconds).
  // In other words, the timer hasn't started counting down yet for this question.
  //(2) (!quizState[index] || quizState[index].selectedOption === null)
  // !quizState[index]: There is no saved state for this question (the user hasn't interacted with it yet).
  // quizState[index].selectedOption === null: The question exists in the state, but the user hasn't selected an answer yet.
  // The whole expression is true if the question is new or still unanswered.
  // Combined with && (AND):
  // Both conditions must be true:
  // The timer is at its starting value AND
  // The question is either being seen for the first time or hasn't been answered yet.
//   What happens if true?
// The function timerclock(index); is called, which starts the countdown timer for this question.
// Why is this important?
// Prevents the timer from starting again if the user already answered the question or is revisiting it.
// Ensures the timer only starts for questions that are new or unanswered and only once, at the initial state.
  if (
    savedTime === 30 &&
    (!quizState[index] || quizState[index].selectedOption === null)
  ) {
    timerclock(index);
  }

  // Render the question and options with updated question number
  questionNoElem.innerHTML = questionNo; // Update the question number
  secondPage.style.backgroundColor = "#CCE2C2"; //Change Background Color to default for every question
  box.innerHTML = `
  <img src="./assets/quiz.webp" alt="quiz-logo">
  <div class="question-no"><span>${questionNo}</span>/10</div>
  <div class="question">${quiz[index].question}</div>
  <div class="clock">00:<span>${timer < 10 ? `0${timer}` : timer}</span></div>
  <div class="options">
  <div class="option">${
    quiz[index].options[0]
  }<img class='tick' src="./assets/tick.webp" alt="tick"></img> <img class="wrong" src="./assets/wrong.webp" alt="wrong"></div>
  <div class="option">${
    quiz[index].options[1]
  }<img class='tick' src="./assets/tick.webp" alt="tick"></img> <img class="wrong" src="./assets/wrong.webp" alt="wrong"></div>
  <div class="option">${
    quiz[index].options[2]
  }<img class='tick' src="./assets/tick.webp" alt="tick"></img> <img class="wrong" src="./assets/wrong.webp" alt="wrong"></div>
  <div class="option">${
    quiz[index].options[3]
  }<img class='tick' src="./assets/tick.webp" alt="tick"></img> <img class="wrong" src="./assets/wrong.webp" alt="wrong"></div>
  </div>
  <div class="btn-container">
  <button class="previous">Previous </button>
  <button class="next">Next ></button>
  </div>`;

  const allOptions = document.querySelectorAll(".options .option");
  // Check if there is a saved state for the current question
  const savedAnswer = quizState[index] ? quizState[index].selectedOption : null;
  // const savedtime = quizState[index] ? quizState[index].quizTime : null;
  const correctAnswer = quiz[index].answer; // Correct answer for the current question
  // If this question was timed out or answered, show disabled state
  if (savedTime === 0) {
    secondPage.style.backgroundColor = "#C50C00";
    allOptions.forEach((option) => option.classList.add("disabled"));
  }

  allOptions.forEach((option) => {
    // If there's a saved answer, we need to show the tick or cross
    if (savedAnswer) {
      const optionText = option.innerText.trim();

      // Show tick for the correct option
      if (optionText === correctAnswer) {
        option.querySelector(".tick").style.display = "block"; // Show tick if answer is correct
      }

      // Show wrong for the incorrect option
      if (optionText === savedAnswer && savedAnswer !== correctAnswer) {
        option.querySelector(".wrong").style.display = "block"; // Show wrong if the answer is incorrect
      }

      // Disable options if they were already selected
      option.classList.add("disabled");
    }

    option.addEventListener("click", (e) => {
      const clickedOption = e.target; // The option that was clicked

      // Show the correct tick for the correct answer
      const correctOption = Array.from(allOptions).find(
        (opt) => opt.innerText.trim() === correctAnswer
      );
      if (clickedOption) {
        clearInterval(timerInterval); // Stop the timer when an option is clicked
        timer = 0; // Set timer to 0
      }
      if (clickedOption === correctOption) totalCorrect++;
      resultSpan.innerText = totalCorrect;
      if (correctOption) {
        const correctTickImage = correctOption.querySelector(".tick");
        correctTickImage.style.display = "block"; // Show correct tick image for correct option
      }

      // Show the wrong tick for the clicked option if it's wrong
      if (clickedOption.innerText !== correctAnswer) {
        const wrongTickImage = clickedOption.querySelector(".wrong");
        wrongTickImage.style.display = "block"; // Show wrong tick image for clicked option
      }
      const timerEl = document.querySelector(".clock span");
      // localStorage
      quizState[index] = {
        selectedOption: clickedOption.innerText.trim(),
        quizTime: Number(timerEl.innerText.trim()), // Save the current timer value
      };
      localStorage.setItem("quiz-state", JSON.stringify(quizState));

      // Disable all options after selecting one
      allOptions.forEach((opt) => opt.classList.add("disabled"));

      // // If there's a saved answer for this option, check if it's correct or incorrect
      // if (savedAnswer) {
      //   if (option.innerText.trim() === savedAnswer) {
      //     if (savedAnswer === correctAnswer) {
      //       option.querySelector(".tick").style.display = "block"; // Show tick if answer is correct
      //     } else {
      //       option.querySelector(".wrong").style.display = "block"; // Show wrong if the answer is wrong
      //     }
      //   }
      // }
    });
  });

  // Reattach the event listener for the "Previous" button
  const prevButton = document.querySelector(".previous");
  // Initially disable the button if at the first question
  if (index === 0) prevButton.classList.add("disabled");

  prevButton.addEventListener("click", () => {
    if (index > 0) {
      // Ensure we're not going below the first question
      prevButton.classList.remove("disabled");
      clearInterval(timerInterval);
      index--; // Move to the previous question
      questionNo--; // Decrement the question number
      showData(index); // Update the display with the previous question
    }
  });

  // Reattach the event listener for the "Next" button
  const nextButton = document.querySelector(".next");
  nextButton.addEventListener("click", () => {
    if (index < quiz.length - 1) {
      index++; // Move to the next question
      questionNo++;
      showData(index); // Increment the question number
    } else {
      index = 0;
      questionNo = 1;
      EndQuiz();
    }
  });
}

function EndQuiz() {
  secondPage.style.display = "none";
  endQuiz.style.display = "flex";
}

function restartGame() {
  restartBtn.addEventListener("click", () => {
    localStorage.removeItem("quiz-state");
    endQuiz.style.display = "none";
    homepage.style.display = "flex";
    totalCorrect = 0;
    resultSpan.innerText = totalCorrect; //Reset Score
  });
}
restartGame();  

"use strict";

const mainQuiz = document.querySelector(".main-quiz");

let quizList = [];
let score = 0;
let currentQuizNumber = 0;

let startBtn;
let totalQuestion;
let difficultyCategory;
let quizCategory;
let playerName;

const init = () => {
  const htmlInit = `
  <p class="quiz-title">Enter your name and type of quiz</p>
  <div class="starter">
    <div class="player-name-div">
    <label for="player-name" class="dropdown-title"
            >Who is this?</label
          >
          <select name="player-name" id="player-name" class="select-dropdown">
            <option value="" disabled selected>???</option>
            <option value=" Jeremia">Jeremia</option>
            <option value=" Joshua">Joshua</option>
            </select>
    </div>
    <div class="total-question-div">
          <label for="total-question" class="dropdown-title"
            >Total Question:</label
          >
          <select name="total-question" id="total-question" class="select-dropdown">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
    </div>
    <div class="category-div">
          <label for="quiz-category" class="dropdown-title"
            >Category:</label
          >
          <select name="quiz-category" id="quiz-category" class="select-dropdown">
          <option value="science">Science</option>
          <option value="general_knowledge">General Knowledge</option>
            <option value="geography">Geography</option>
            <option value="history">History</option>
          </select>
    </div>
    <div class="difficulty-div">
          <label for="difficulty-category" class="dropdown-title"
            >Difficulty:</label
          >
          <select name="difficulty-category" id="difficulty-category" class="select-dropdown">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
    </div>
          <button class="start-btn">Start</button>
        </div>`;
  mainQuiz.innerHTML = htmlInit;
  document.querySelector(".start-btn").addEventListener("click", startQuiz);
};

const startQuiz = () => {
  startBtn = document.querySelector("#start-btn");
  totalQuestion = document.querySelector("#total-question");
  difficultyCategory = document.querySelector("#difficulty-category");
  quizCategory = document.querySelector("#quiz-category");
  playerName = document.querySelector("#player-name").value;

  const total = totalQuestion.value || "5";
  const category = quizCategory.value || "general_knowledge";
  const difficulty = difficultyCategory.value || "easy";

  quizList = [];
  score = 0;
  currentQuizNumber = 0;
  getQuizzes(total, category, difficulty);
};

const getQuizzes = async (
  total = "10",
  category = "17",
  difficulty = "easy",
) => {
  try {
    // const quizUrl = await fetch(
    //   `https://opentdb.com/api.php?amount=${total}&category=${category}&difficulty=${difficulty}&type=multiple`,
    // );

    const quizUrl = await fetch(
      `https://the-trivia-api.com/v2/questions?limit=${total}&categories=${category}&difficulties=${difficulty}&types=text_choice`,
    );
    const quizData = await quizUrl.json();
    quizList = quizData;
    renderQuiz();
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
};

const renderQuiz = async () => {
  const questionQuiz = quizList[currentQuizNumber].question.text;
  const correctAnswer = quizList[currentQuizNumber].correctAnswer;
  const questionOptions = [
    ...quizList[currentQuizNumber].incorrectAnswers,
    correctAnswer,
  ];
  const randomizedOptions = randomizeOptions(questionOptions);

  const quizMainHtml = `
  <p class="quiz-title">Answer the quiz and see how good your knowledge</p>
    <div class="quiz-content quiz-div">
    <div class="question-div">
      <div class="question-number-score">
        <p class="question-number">Question ${currentQuizNumber + 1} of ${quizList.length}</p>
        <p class="score">Correct answer: ${score}</p>
      </div>
        <p class="quiz-question">${questionQuiz}</p>
        </div>
        <div class="quiz-options">
        <p>Pick Your Answer:</p>
            <button data-answer="${randomizedOptions[0]}" class="options-button options1">${randomizedOptions[0]}</button>
            <button data-answer="${randomizedOptions[1]}" class="options-button options2">${randomizedOptions[1]}</button>
            <button data-answer="${randomizedOptions[2]}" class="options-button options3">${randomizedOptions[2]}</button>
            <button data-answer="${randomizedOptions[3]}" class="options-button options4">${randomizedOptions[3]}</button>
        </div>
    </div>
    `;

  mainQuiz.innerHTML = quizMainHtml;
  document.querySelector(".quiz-options").addEventListener("click", (e) => {
    if (e.target.classList.contains("options-button")) {
      e.target.style.removeProperty("background");
      document.querySelectorAll(".options-button").forEach((button) => {
        if (button.dataset.answer === correctAnswer) {
          button.classList.add("correct-answer");
        }
        e.target.classList.add("answer-choosen");
        button.classList.add("clicked-option");
      });
    }
    handleAnswer(e.target.dataset.answer, correctAnswer);
  });
};

const randomizeOptions = (optionsList) => {
  const randomized = [...optionsList];
  for (let i = randomized.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
  }
  return randomized;
};

const handleAnswer = async (answer, correctAnswer) => {
  console.log(answer, correctAnswer);
  if (answer === correctAnswer) {
    score++;
  }
  currentQuizNumber++;
  if (currentQuizNumber < quizList.length) {
    await sleep(2000);
    renderQuiz();
  } else {
    await sleep(2000);
    renderFinalResut();
  }
};

const renderFinalResut = () => {
  const resultHtml = `
  <p class="quiz-title">Quiz Complete</p>
    <div class="quiz-result quiz-div">
    <p class="final-result">Congratz${playerName}! You scored ${score} out of ${quizList.length}</p>
    <button class="restart-btn">Restart Quiz</button>
    </div>`;
  mainQuiz.innerHTML = resultHtml;
  document.querySelector(".restart-btn").addEventListener("click", init);
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

init();

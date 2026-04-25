"use strict";

const mainQuiz = document.querySelector(".main-quiz");

let quizList = [];
let score = 0;
let currentQuizNumber = 0;

const init = () => {
  const htmlInit = `
  <p class="quiz-title">What kind of quiz do you want?</p>
  <div class="starter">
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
            <option value="17">Science & Nature</option>
            <option value="22">Geography</option>
            <option value="28">Vehicle</option>
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
  const startBtn = document.querySelector("#start-btn");
  const totalQuestion = document.querySelector("#total-question");
  const difficultyCategory = document.querySelector("#difficulty-category");
  const quizCategory = document.querySelector("#quiz-category");

  const total = totalQuestion.value || "10";
  const category = quizCategory.value || "17";
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
    const quizUrl = await fetch(
      `https://opentdb.com/api.php?amount=${total}&category=${category}&difficulty=${difficulty}&type=multiple`,
    );
    const quizData = await quizUrl.json();
    quizList = quizData.results;
    console.log(quizList);
    renderQuiz();
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
};

const renderQuiz = async () => {
  console.log(quizList);
  const questionQuiz = quizList[currentQuizNumber].question;
  const correctAnswer = quizList[currentQuizNumber].correct_answer;
  const questionOptions = [
    ...quizList[currentQuizNumber].incorrect_answers,
    correctAnswer,
  ];
  const randomizedOptions = randomizeOptions(questionOptions);

  const quizMainHtml = `
  <p class="quiz-title">Answer the quiz and see how good your knowledge</p>
    <div class="quiz-content quiz-div">
    <div class="question-div">
        <p class="question-number">Question ${currentQuizNumber + 1} of ${quizList.length}</p>
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
    if (e.target.classList.contains("options-button"))
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

const handleAnswer = (answer, correctAnswer) => {
  console.log(answer, correctAnswer);
  if (answer === correctAnswer) {
    score++;
  }
  currentQuizNumber++;
  if (currentQuizNumber < quizList.length) {
    renderQuiz();
  } else {
    renderFinalResut();
  }
};

const renderFinalResut = () => {
  const resultHtml = `
  <p class="quiz-title">Quiz Complete</p>
    <div class="quiz-result quiz-div">
    <p class="final-result">You scored ${score} out of ${quizList.length}</p>
    <button class="restart-btn">Restart Quiz</button>
    </div>`;
  mainQuiz.innerHTML = resultHtml;
  document.querySelector(".restart-btn").addEventListener("click", init);
};

init();

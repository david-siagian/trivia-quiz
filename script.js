"use strict";

const mainQuiz = document.querySelector(".main-quiz");
const startBtn = document.querySelector("#start-btn");

const totalQuestion = document.querySelector("#total-question");
const difficultyCategory = document.querySelector("#difficulty-category");
const quizCategory = document.querySelector("#quiz-category");

let quizList = [];
let score = 0;
let currentQuizNumber = 0;

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
    renderResut();
  }
};

const renderResut = () => {
  const resultHtml = `
  <p class="quiz-title">Quiz Complete</p>
    <div class="quiz-result quiz-div">
    <p class="final-result">You scored ${score} out of ${quizList.length}</p>
    </div>`;

  mainQuiz.innerHTML = resultHtml;
};

const startQuiz = () => {
  quizList = [];
  score = 0;
  currentQuizNumber = 0;
  mainQuiz.innerHTML = "";

  const total = totalQuestion.value || "10";
  const category = quizCategory.value || "17";
  const difficulty = difficultyCategory.value || "easy";
  getQuizzes(total, category, difficulty);
};

document.querySelector("#start-btn").addEventListener("click", startQuiz);

("use strict");
import { htmlInit, quizMainHtml, htmlResult } from "./html-render.js";

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

  mainQuiz.innerHTML = quizMainHtml(
    currentQuizNumber,
    quizList,
    score,
    questionQuiz,
    randomizedOptions,
  );

  document.querySelector(".quiz-options").addEventListener("click", (e) => {
    if (!e.target.classList.contains("options-button")) return;
    document.querySelectorAll(".options-button").forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === correctAnswer) {
        button.classList.add("correct-answer");
      }
      e.target.classList.add("answer-choosen");
      button.classList.add("clicked-option");
    });
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
  mainQuiz.innerHTML = htmlResult(playerName, score, quizList.length);
  document.querySelector(".restart-btn").addEventListener("click", init);
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

init();

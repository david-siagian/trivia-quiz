export const htmlInit = `
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

export const quizMainHtml = (
  currentQuizNumber,
  quizList,
  score,
  questionQuiz,
  randomizedOptions,
) => {
  return `
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
        ${randomizedOptions.map((option) => `<button data-answer="${option}" class="options-button">${option}</button>`).join("")}
        </div>
    </div>
    `;
};

export const htmlResult = (playerName, score, totalQuestions) => {
  return `
    <p class="quiz-title">Quiz Complete</p>
      <div class="quiz-result quiz-div">
      <p class="final-result">Congratz ${playerName}! You scored ${score} out of ${totalQuestions}</p>
      <button class="restart-btn">Restart Quiz</button>
      </div>`;
};

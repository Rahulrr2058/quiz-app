const API_URL = "https://opentdb.com/api.php";
let questions = [];
let score = 0;
let questionIndex = 0;
let selectedOption = null;

async function fetchQuestion(difficulty) {
  try {
    const res = await fetch(
      `${API_URL}?amount=10&difficulty=${difficulty}&type=multiple`
    );
    const data = await res.json();
    questions = data.results;
    showQuestion();
  } catch (error) {
    console.log("questions not found", error);
  }
}

async function start(difficulty) {
  await fetchQuestion(difficulty);
  questionIndex = 0;
  score = 0;
  document.getElementById("difficulty").style.display = "none";
  document.getElementById("quiz").style.display = "block";
}
function showQuestion() {
  const givenQuestion = questions[questionIndex];
  const showedquestion = givenQuestion.question;
  document.getElementById("question").innerText = showedquestion;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  const options = [
    ...givenQuestion.incorrect_answers,
    givenQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => selectOption(option);
    optionsDiv.appendChild(button);
  });
}

function selectOption(option) {
  selectedOption = option;
}

function submitAnswer() {
  if (selectedOption === null) {
    alert("select an option ");
    return;
  }
  const givenQuestion = questions[questionIndex];
  if (selectedOption === givenQuestion.correct_answer) {
    score++;
  }
  selectedOption = null;
  questionIndex++;
  if (questionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("score").innerHTML = score;
}

function playAgain() {
  document.getElementById("result").style.display = "none";
  document.getElementById("difficulty").style.display = "block";
}

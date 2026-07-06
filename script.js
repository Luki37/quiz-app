let questionList = [];

const inputQuest = document.getElementById("inputQuest");
const inputTrueAnswer = document.getElementById("inputTrueAnswer");
const inputFalseAnswer1 = document.getElementById("inputFalseAnswer1");
const inputFalseAnswer2 = document.getElementById("inputFalseAnswer2");
const inputFalseAnswer3 = document.getElementById("inputFalseAnswer3");

let trueAnswer = null;

function saveArrayToLocalstorage() {
  localStorage.setItem("questionList", JSON.stringify(questionList));
}

function next() {
  questionList = JSON.parse(localStorage.getItem("questionList"));

  let wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";

  const result = document.getElementById("result");
  result.disabled = true;

  const randomQuestion =
    questionList[Math.floor(Math.random() * questionList.length)];

  const mixedAnswers = [
    randomQuestion.answerTrue,
    ...randomQuestion.answerFalse,
  ];

  for (let i = mixedAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedAnswers[i], mixedAnswers[j]] = [mixedAnswers[j], mixedAnswers[i]];
  }

  const question = document.createElement("div");
  question.classList.add("question");
  question.id = randomQuestion.questId;
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerText = "X";
  const questionTitle = document.createElement("div");
  questionTitle.classList.add("question-title");
  questionTitle.innerText = randomQuestion.question;
  const btns = document.createElement("div");
  btns.classList.add("btns");
  const answer1 = document.createElement("button");
  answer1.classList.add("button");
  answer1.innerText = mixedAnswers[0];
  const answer2 = document.createElement("button");
  answer2.classList.add("button");
  answer2.innerText = mixedAnswers[1];
  const answer3 = document.createElement("button");
  answer3.classList.add("button");
  answer3.innerText = mixedAnswers[2];
  const answer4 = document.createElement("button");
  answer4.classList.add("button");
  answer4.innerText = mixedAnswers[3];

  btns.appendChild(answer1);
  btns.appendChild(answer2);
  btns.appendChild(answer3);
  btns.appendChild(answer4);

  question.appendChild(questionTitle);
  question.appendChild(btns);
  question.appendChild(deleteBtn);

  deleteBtn.setAttribute("onclick", `deleteQuest(${question.id})`);

  const allButtons = [answer1, answer2, answer3, answer4];

  allButtons.forEach((button) => {
    button.addEventListener("click", function checkAnswer(event) {
      const clickedButton = event.target;
      trueAnswer = allButtons.find(
        (button) => button.innerText === randomQuestion.answerTrue,
      );

      if (clickedButton.innerText === randomQuestion.answerTrue) {
        clickedButton.style.backgroundColor = "rgb(74, 194,74";
        allButtons.forEach((btn) => (btn.disabled = true));
      } else {
        clickedButton.style.backgroundColor = "rgb(219, 47, 16";
        allButtons.forEach((btn) => (btn.disabled = true));
        result.disabled = false;
      }
    });
  });

  document.getElementById("wrapper").appendChild(question);
}

function showResult() {
  trueAnswer.style.backgroundColor = "rgb(74, 194,74)";
}

/*löscht eine Frage aus dem localstorage*/
function deleteQuest(questId) {
  const securityRequest = confirm("Möchtest du die Frage dauerhaft löschen?");
  if (!securityRequest) {
    return;
  }
  document.addEventListener("DOMContentLoaded", deleteQuest);
  document.getElementById(questId).remove();
  questionList = questionList.filter((question) => {
    return question.questId !== questId;
  });
  saveArrayToLocalstorage();
}

/*speichert eine Frage und alle Antworten im localstorage*/
/*alle Felder müssen ausgefüllt sein*/
function saveQuest() {
  const newQuest = inputQuest.value;
  const newTrueAnswer = inputTrueAnswer.value;
  const newFalseAnswer1 = inputFalseAnswer1.value;
  const newFalseAnswer2 = inputFalseAnswer2.value;
  const newFalseAnswer3 = inputFalseAnswer3.value;

  if (
    newQuest === "" ||
    newTrueAnswer === "" ||
    newFalseAnswer1 === "" ||
    newFalseAnswer2 === "" ||
    newFalseAnswer3 === ""
  ) {
    alert("Bitte alle Felder ausfüllen!");
  } else {
    const questId = Date.now();

    const questElement = {
      question: newQuest,
      answerTrue: newTrueAnswer,
      answerFalse: [newFalseAnswer1, newFalseAnswer2, newFalseAnswer3],
      questId: questId,
    };

    questionList.push(questElement);
    saveArrayToLocalstorage();

    console.log(questElement);
    console.log(questionList);

    reset();
    inputQuest.focus();
  }
}

/*leert das Formular*/
function reset() {
  inputQuest.value = "";
  inputTrueAnswer.value = "";
  inputFalseAnswer1.value = "";
  inputFalseAnswer2.value = "";
  inputFalseAnswer3.value = "";
  inputQuest.focus();
}

/*export button für Exportieren in downloads der JSON datei mit den fragen*/

/*importbutton um fragen aus er Jsondatei zu laden*/

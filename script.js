let questionList = [
  {
    question:
      "Welches ungewöhnliche Detail ziert das offizielle Siegel der Stadt Los Angeles (USA)?",
    answerTrue: "Eine kleine Abbildung einer Avocado",
    answerFalse: [
      "Ein mikroskopisch kleines Bild von Mickey Mouse",
      "Die Unterschrift des allerersten Bürgermeisters, die sich als Rechtschreibfehler entpuppte",
      "Die genauen Koordinaten des ersten McDonald's-Restaurants",
    ],
    questId: 1,
  },
  {
    question:
      "Was passierte im Jahr 2008 mit dem offiziellen Staatsnamen von Kiribati im offiziellen Telefonbuch der Hauptstadt?",
    answerTrue: 'Er fehlte komplett, weil der Buchstabe "K" ausging.',
    answerFalse: [
      "Er wurde komplett rückwärts abgedruckt.",
      "Er wurde versehentlich durch das Rezept für Bananenbrot ersetzt.",
      "Er wurde in Comic Sans gedruckt.",
    ],
    questId: 2,
  },
  {
    question:
      "Welches bizarre Verbot gilt laut einem alten, aber immer noch gültigen Gesetz in der Stadt Gainesville im US-Bundesstaat Georgia?",
    answerTrue: "Man darf Brathähnchen nicht mit einer Gabel essen.",
    answerFalse: [
      "Man darf sonntags keinem Esel ein Korsett anlegen.",
      "Enten müssen lange Hosen tragen.",
      "Man darf eine Schildkröte nicht als Hut tragen.",
    ],
    questId: 3,
  },
];

let wrapper = document.getElementById("wrapper");

const introDiv = document.createElement("div");
introDiv.classList.add("intro");
introDiv.innerText = 'Klicke auf "Weiter" um zu starten!';

const footer = document.createElement("div");
footer.classList.add("footer");

const resultBtn = document.createElement("button");
resultBtn.id = "result";
resultBtn.classList.add("button");
resultBtn.innerText = "Lösung";
resultBtn.onclick = showResult;
footer.appendChild(resultBtn);

const nextBtn = document.createElement("button");
nextBtn.classList.add("button");
nextBtn.innerText = "Weiter";
nextBtn.onclick = next;
footer.appendChild(nextBtn);

const mainPage = document.createElement("div");
mainPage.classList.add("mainPage");
mainPage.appendChild(introDiv);
mainPage.appendChild(footer);

wrapper.appendChild(mainPage);

const inputQuest = document.getElementById("inputQuest");
const inputTrueAnswer = document.getElementById("inputTrueAnswer");
const inputFalseAnswer1 = document.getElementById("inputFalseAnswer1");
const inputFalseAnswer2 = document.getElementById("inputFalseAnswer2");
const inputFalseAnswer3 = document.getElementById("inputFalseAnswer3");

let trueAnswer = null;

function saveArrayToLocalstorage() {
  localStorage.setItem("questionList", JSON.stringify(questionList));
}

/*prüft ob starage keine liste hat (null) oder leet ist (0)
JSON.parse wandelt in ein Array um*/
if (
  localStorage.getItem("questionList") === null ||
  JSON.parse(localStorage.getItem("questionList")).length === 0
) {
  saveArrayToLocalstorage();
}

function next() {
  /*holt liste aus storrage und macht array draus*/
  questionList = JSON.parse(localStorage.getItem("questionList"));

  const result = document.getElementById("result");
  result.disabled = true;

  const randomQuestion =
    questionList[Math.floor(Math.random() * questionList.length)];

  /* die drei punkte entpacken das array der falschen Antworten*/
  const mixedAnswers = [
    randomQuestion.answerTrue,
    ...randomQuestion.answerFalse,
  ];

  /* let i = mixedAnswers.length - 1: Startpunkt ist der allerletzte Index des Arrays.
  i > 0: Die Schleife läuft rückwärts, bis sie beim zweitsten Element (Index 1) ankommt. 
  Beim allerersten Element (Index 0) stoppt sie, da dieses nicht mehr mit sich selbst 
  getauscht werden muss.
  i--: Nach jedem Durchgang springt die Schleife ein Element weiter nach vorne. */
  for (let i = mixedAnswers.length - 1; i > 0; i--) {
    /* *(i + 1): Skaliert diese Zahl, sodass sie im Bereich von 0 bis maximal i liegt. */
    const j = Math.floor(Math.random() * (i + 1));
    /*tauscht die plätze der elemente i und j */
    [mixedAnswers[i], mixedAnswers[j]] = [mixedAnswers[j], mixedAnswers[i]];
  } /*Die Logik im Schnelldurchlauf (Bildliche Vorstellung):Stellen Sie sich vor, Sie
  haben einen Stapel Karten.Sie greifen sich die letzte Karte des Stapels (i).Sie wählen
  per Zufall eine Karte aus dem gesamten Stapel davor aus (j).Sie tauschen die Plätze 
  dieser beiden Karten.Die getauschte Karte ganz hinten rühren Sie nicht mehr an. Sie
  gehen einen Schritt nach vorne (i--) und wiederholen das Spiel mit der jetzt letzten
  Karte des restlichen Stapels. */

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
    /*reagiert, sobald einer der buttons geklickt wird*/
    button.addEventListener("click", function checkAnswer(event) {
      const clickedButton = event.target;
      /*prüft, ob die geklickte antwort wie richtige antwort ist*/
      trueAnswer = allButtons.find(
        (button) => button.innerText === randomQuestion.answerTrue,
      );
      /*färbt das feld grün wenn die gewählte antwort richtig ist*/
      if (clickedButton.innerText === randomQuestion.answerTrue) {
        clickedButton.style.backgroundColor = "rgb(74, 194,74";
        /*und deaktiviert die anderen buttons*/
        allButtons.forEach((btn) => (btn.disabled = true));
      } else {
        /*wenn das geklickte feld falsch war -> rote färbunb*/
        clickedButton.style.backgroundColor = "rgb(219, 47, 16";
        /*und deaktiviert die anderen buttons ausser dem button um die lösung anzuzeigen*/
        allButtons.forEach((btn) => (btn.disabled = true));
        result.disabled = false;
      }
    });
  });

  let wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";

  wrapper.appendChild(question);
  wrapper.appendChild(footer);
}

function showResult() {
  trueAnswer.style.backgroundColor = "rgb(74, 194,74)";
}

/*löscht eine Frage aus dem localstorage*/
function deleteQuest(questId) 
/*macht einen "alert" den man bestätigen muss*/
  const securityRequest = confirm("Möchtest du die Frage dauerhaft löschen?");
  /*wenn "abbrechen" return*/
  if (!securityRequest) {
    return;
  }
  /*läscht quest anhand der ID*/
  document.addEventListener("DOMContentLoaded", deleteQuest);
  document.getElementById(questId).remove();
  questionList = questionList.filter((question) => {
    return question.questId !== questId;
  });
  saveArrayToLocalstorage();
  next();
}

/*speichert eine Frage und alle Antworten im localstorage*/
/*alle Felder müssen ausgefüllt sein*/
function saveQuest() {
  const newQuest = inputQuest.value;
  const newTrueAnswer = inputTrueAnswer.value;
  const newFalseAnswer1 = inputFalseAnswer1.value;
  const newFalseAnswer2 = inputFalseAnswer2.value;
  const newFalseAnswer3 = inputFalseAnswer3.value;

  /*wenn eines der felder leer ist (|| = oder) macht es einen alert*/
  if (
    newQuest === "" ||
    newTrueAnswer === "" ||
    newFalseAnswer1 === "" ||
    newFalseAnswer2 === "" ||
    newFalseAnswer3 === ""
  ) {
    alert("Bitte alle Felder ausfüllen!");
  } 
  /*andernfalls erstellt es einen neue quest im speicher*/
  else {
    /*definiert die id anhand eindeutigen Zeitstempels: Date.now() 
    zählt die Millisekunden, die seit dem 1. Januar 1970 und liefert 
    so immer eine einzigartige zahl da in der gleichen millisekunge 
    keine zwei fragen erfasst werden.*/
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
function exportLocalStorage() {
  /*holt liste aus storage*/
  const exportList = localStorage.getItem("questionList");
  /*formatiert liste als Blob (Binary Large Object) */
  const newBlob = new Blob([exportList], { type: "application.json" });
  /*erstellt einen virtuellen link, nicht sichtbar im html*/
  const link = document.createElement("a");
  /*gibt dem link einen URL zum blop*/
  link.href = URL.createObjectURL(newBlob);
  /*definiert dateiname für download*/
  link.download = "Fragenkatalog_QuizApp.json";
  /*löst das ganze aus*/
  link.click();
}

/*importbutton um fragen aus er Json datei zu laden*/
function importLocalStorage() {
  /*erstellt virtuelles inputfeld*/
  const importBtn = document.createElement("input");
  /* definiert typ als datei upload*/
  importBtn.type = "file";
  /*sagt dass nur .json dateien passen*/
  importBtn.accept = ".json";
  /*es reagiert, wenn der user eine datei ausgewählt hat*/
  importBtn.onchange = function (event) {
    /*nimmt die erste ausgewählte datei*/
    const datei = event.target.files[0];
    /*erstellt werkzeug zum einlesen der datei*/
    const reader = new FileReader();
    /*HANDLUNG WENN DIE DATEI EINGELESEN IST*/
    reader.onload = function (e) {
      const importText = e.target.result;
      /*schreibt es als questionList in den localStorage*/
      localStorage.setItem("questionList", importText);
      alert("Daten erfolgreich importiert");
    };
    /*löst das onload aus*/
    reader.readAsText(datei);
  };
  /*virtueller click*/
  importBtn.click();
}

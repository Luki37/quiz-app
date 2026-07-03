let questionList = [
  {
    question: "Wie heisst die Hauptstadt von Deutschland?",
    answerTrue: "Berlin",
    answerFalse: ["Köln", "Hannover", "München"],
  },
  {
    question: "Wie heisst die Haupstadt von Frankreich?",
    answerTrue: "Paris",
    answerFalse: ["Bordeaux", "Lyon", "Marseille"],
  },
];

function next() {
  const randomQuestion =
    questionList[Math.floor(Math.random() * questionList.length)];
}

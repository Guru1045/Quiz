const quizData = [
  {
    question: "Which language in a web browser? ",
    a: "C",
    b: "Java",
    c: "Python",
    d: "Javascript",
    correct: "d",
  },
  {
    question: "What does CSS stands for? ",
    a: "Centre Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Style Sheets",
    d: "Comemnting Style Sheets ",
    correct: "b",
  },

  {
    question: "What does HTML stands for? ",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Markup Language",
    d: "Hyperloop Markdown Language",
    correct: "a",
  },

  {
    question: "What year was JavaScript? ",
    a: "1998",
    b: "1995",
    c: "1977",
    d: "1986",
    correct: "b",
  },
];

const timeleft = document.getElementById("timer");
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submition = document.getElementById("submit");
const qno = document.getElementById("qno");

let currentQuiz = 0;
let score = 0;
let time;

loadQuiz();

function loadQuiz() {
  try{
    document.getElementById("lastTimeMain").setAttribute("id", "timeMain");
  }catch(e){}
    timeleft.innerHTML = 30;
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];
  qno.innerText = currentQuiz + 1 + ".";

  questionEl.innerText = currentQuizData.question;
  a_text.innerHTML = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  time = setInterval(timer, 1000);
}

function timer() {
  if (Number(timeleft.innerHTML) == 0) {
    clearInterval(time);
    skip();
    return;
  }
  if (Number(timeleft.innerHTML) == 10) {
    document.getElementById("timeMain").setAttribute("id", "lastTimeMain");
  }
  timeleft.innerHTML = Number(timeleft.innerHTML) - 1;
}

function skip() {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    quiz.innerHTML =
      "<h2>You answered " +
      score +
      "/" +
      quizData.length +
      " questions correctly</h2>\
        <button onclick='location.reload()'>Reload</button>";
  }
}

function deselectAnswers() {
  answerEls.forEach((answerEls) => (answerEls.checked = false));
}

function getselected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) answer = answerEl.id;
  });
  // for(i of answerEls){
  //   if(i.checked)
  //     answer = i.id;
  // }
  return answer;
}

submition.addEventListener("click", () => {
  clearInterval(time);
  const answer = getselected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      // quiz.innerHTML = (
      //   <>
      //     <h2>
      //       You answered ${score}/${quizData.length} questions correctly
      //     </h2>
      //     <button onclicks="locaton.reload()">Reloads</button>
      //   </>
      // );
      quiz.innerHTML =
        "<h2>You answered " +
        score +
        "/" +
        quizData.length +
        " questions correctly</h2>\
        <button onclick='location.reload()'>Reload</button>";
    }
  }
});

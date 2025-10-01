//DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");



const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },

        ],

    },
    {
        question: "Which of the following is the smallest unit of data in a computer?",
        answers: [
            { text: "Byte", correct: false },
            { text: "Bit", correct: true },
            { text: "Nibble", correct: false },
            { text: "Word", correct: false },
        ],

    },
    {
        question: "Which layer of the OSI model is responsible for end-to-end communication and error recovery?",
        answers: [
            { text: "Network Layer", correct: false },
            { text: "Transport Layer", correct: true },
            { text: "Session Layer", correct: false },
            { text: "Data Link Layer", correct: false },
        ],
    },
    {
        question: "The capital of Japan is?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Bangkok", correct: false },
        ],
    },
    {
        question: "In Java, which keyword is used to create a subclass?",
        answers: [
            { text: "implement", correct: false },
            { text: "inherit", correct: false },
            { text: "extends", correct: true },
            { text: "super", correct: false },
        ],
    },
]


// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;


totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;
console.log("it");

// event listner 


startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    console.log("quiz stared")
    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    // reset size 
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"



    questionText.textContent = currentQuestion.question
    console.log(progressPercent);


    // todo: explain this in a second 
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")
        // what is dataset ? it is a property of hte button element that allows you to store custom data
        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    })


}
function selectAnswer(event) {
    // optimization check
    if (answerDisabled) return
    answerDisabled = true;


    const selectButton = event.target;
    const isCorrect = selectButton.dataset.correct === 'true'
    // todo: explain this in a sec 

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add("correct")
        } else if (button === selectButton) {
            button.classList.add("incorrect")
        }

    });
    if (isCorrect) {
        score++;
        finalScoreSpan.textContent = score;
    }
    setTimeout(() => {
        currentQuestionIndex++;
        // check if there are more questions or if the quiz is over 
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResults()
        }

    }, 1000)

}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Great effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!"
    }

}
function restartQuiz() {
    resultScreen.classList.remove("active");


    startQuiz();
}
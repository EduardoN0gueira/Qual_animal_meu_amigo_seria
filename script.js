const questions = [
    {
        question: "Qual animal Gabriel Gmin seria?",
        answers: [
            {text: "Tubarão", correct: false},
            {text: "Bagre", correct: false},
            {text: "Abelhu", correct: true},
            {text: "Crocodilo", correct: false},
        ]
    },
    {
        question: "Qual animal Luíz seria?",
        answers: [
            {text: "Jegue", correct: false},
            {text: "Alce", correct: false},
            {text: "Sereia", correct: false},
            {text: "Escorpião", correct: true},
        ]
    },
    {
        question: "Qual animal Eduardo seria?",
        answers: [
            {text: "Jacaré em inglês", correct: true},
            {text: "Baleia", correct: false},
            {text: "Dromedário", correct: false},
            {text: "Elefante", correct: false},
        ]
    },
    {
        question: "Qual animal Gabriel Lucas seria?",
        answers: [
            {text: "Lagarta", correct: false},
            {text: "Ali(Gay)tor", correct: false},
            {text: "Chupeco", correct: true},
            {text: "Caracol", correct: false},
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de
     ${questions.length} perguntas!`;
     nextButton.innerHTML = "Tentar de novo :(";
     nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
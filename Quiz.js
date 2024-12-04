

const startButton=document.getElementById("start-btn")
const nextButton= document.getElementById("next-btn")
const submitButton = document.getElementById("submit-btn");

const questionContainerElement=document.getElementById("Question-container")
const questionElement = document.getElementById("question")
const answerButtonElement = document.getElementById("Answer-buttons")
const scoreElement=document.getElementById("right-answers")

let shuffledQuestions,correctQuestionIndex;
let quizScore=0;



startButton.addEventListener("click",startGame);

nextButton.addEventListener("click",()=>{
    correctQuestionIndex++
    setnextQuestion()
});


submitButton.addEventListener("click",() => {
    showFinalScore();
});


function startGame(){
    startButton.classList.add("hide");
    shuffledQuestions=questions.sort(()=>Math.random() -0.5);
    correctQuestionIndex=0;
    quizScore=0;
    scoreElement.innerText= `score: ${quizScore}`;
    questionContainerElement.classList.remove("hide")
    setnextQuestion()
   
}

function setnextQuestion(){
    resetState();
    if(correctQuestionIndex < shuffledQuestions.length){
    showQuestion(shuffledQuestions[correctQuestionIndex])
    }else {
        questionContainerElement.classList.add("hide");
        nextButton.classList.add("hide");
        submitButton.classList.remove("hide");
    }

}

// if(!questions || questions.length===0){
//     alert("No Questions Available....!");
//     return;
// }

function showQuestion(question)
{
    questionElement.innerText= `${correctQuestionIndex+1}. ${question.question}`;
    question.answers.forEach((answer) => {
        const button=document.createElement("button")
        button.innerText =answer.text;
        button.classList.add("btn")
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
        answerButtonElement.appendChild(button)
    });
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton=e.target;
    const correct=selectedButton.dataset.correct === "true";

    setStatusClass(document.body,correct)
    Array.from(answerButtonElement.children).forEach((button)=>{
        setStatusClass(button,button.dataset.correct === "true")
    });

    if(shuffledQuestions.length < correctQuestionIndex - 1){
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText="Restart"
        startButton.classList.remove("hide")
    }
    if(correct){
        quizScore++
    }
    scoreElement.innerText=`score: ${quizScore}`;
    nextButton.classList.remove("hide");
    document.getElementById("right-answers").innerText=quizScore
}

function setStatusClass(element,correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct")
    }else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function showFinalScore(){
    alert(`Quiz completed! your final score is${quizScore}/${shuffledQuestions.length}`);
    startButton.innerText="Restart";
    startButton.classList.remove("hide");
    submitButton.classList.add("hide");
    scoreElement.innerText="";
}
 
const questions =[
    {
        question:"Which one of these os a javascript FrameWork",

        answers:[
            {text:"python", correct:false},
            {text:"Django", correct:false},
            {text:"React", correct:true},
            {text:"Eclipse", correct:false},   
       ],
    },

    {
        question: "Why is the --hue variable commonly used in CSS?",
        answers: [
            { text: "To define a dynamic base for HSL colors", correct: true },
            { text: "To set the font size globally", correct: false },
            { text: "To create gradients only", correct: false },
            { text: "To animate margins", correct: false },
        ],
    },

    {
        question: "What does the `--hue` variable represent in CSS?",
        answers: [
            { text: "The base hue for HSL colors", correct: true },
            { text: "The font weight property", correct: false },
            { text: "A built-in CSS function", correct: false },
            { text: "A gradient direction", correct: false },
        ],
    },

    {
        question: "Which CSS function is most commonly used with `--hue`?",
        answers: [
            { text: "rgb()", correct: false },
            { text: "hsl()", correct: true },
            { text: "linear-gradient()", correct: false },
            { text: "opacity()", correct: false },
        ],
    },

    {
        question: "How is `--hue` typically updated dynamically?",
        answers: [
            { text: "By using JavaScript to modify the CSS variable", correct: true },
            { text: "By directly editing the browser's DOM", correct: false },
            { text: "By applying an inline style", correct: false },
            { text: "By using a CSS preprocessor like SASS", correct: false },
        ],
    },

    {
        question: "Where is `--hue` usually defined in a CSS file?",
        answers: [
            { text: "Inside the `body` selector", correct: false },
            { text: "In the `:root` selector for global scope", correct: true },
            { text: "Inside each individual HTML element", correct: false },
            { text: "Within an external JavaScript file", correct: false },
        ],
    },
    

    {
        question: "What happens when you change the value of `--hue`?",
        answers: [
            { text: "All elements using it update automatically", correct: true },
            { text: "Only the background color changes", correct: false },
            { text: "It affects only the current HTML page", correct: false },
            { text: "It resets all CSS styles", correct: false },
        ],
    },

    {
        question: "Which of these is NOT a valid reason to use `--hue`?",
        answers: [
            { text: "Creating dynamic themes", correct: false },
            { text: "Updating colors consistently", correct: false },
            { text: "Setting fixed widths for elements", correct: true },
            { text: "Reducing repetitive code", correct: false },
        ],
    },

    {
        question: "Which of these is used to retrieve data from a database in SQL?",
        answers: [
            { text: "SELECT", correct: true },
            { text: "INSERT", correct: false },
            { text: "DELETE", correct: false },
            { text: "UPDATE", correct: false },
        ],
    },

    {
        question: "What does SQL stand for?",
        answers: [
            { text: "Structured Query Language", correct: true },
            { text: "Simple Query Language", correct: false },
            { text: "Secure Query Language", correct: false },
            { text: "System Query Language", correct: false },
        ],
    },

    {
        question: "Which of these is NOT an SQL command?",
        answers: [
            { text: "DROP", correct: false },
            { text: "JOIN", correct: false },
            { text: "CREATE", correct: false },
            { text: "LOOP", correct: true },
        ],
    },
    
    {
        question: "What is the purpose of the PRIMARY KEY in a table?",
        answers: [
            { text: "To uniquely identify each record in the table", correct: true },
            { text: "To sort records by default", correct: false },
            { text: "To define relationships between tables", correct: false },
            { text: "To allow duplicate entries", correct: false },
        ],
    },

    {
        question: "What is the size of an int in Java?",
        answers: [
            { text: "4 bytes", correct: true },
            { text: "2 bytes", correct: false },
            { text: "8 bytes", correct: false },
            { text: "1 byte", correct: false },
        ],
    },
    
    {
        question: "Which of these is a valid access modifier in Java?",
        answers: [
            { text: "public", correct: true },
            { text: "extern", correct: false },
            { text: "volatile", correct: false },
            { text: "native", correct: false },
        ],
    },
    
    {
        question: "Which data structure is part of the Java Collection Framework?",
        answers: [
            { text: "ArrayList", correct: true },
            { text: "Hashtable", correct: false },
            { text: "Dictionary", correct: false },
            { text: "Pointer", correct: false },
        ],
    },

    {
        question: "What does JVM stand for in Java?",
        answers: [
            { text: "Java Virtual Machine", correct: true },
            { text: "Java Variable Manager", correct: false },
            { text: "Java Version Manager", correct: false },
            { text: "Java Viewer Module", correct: false },
        ],
    },
     
]
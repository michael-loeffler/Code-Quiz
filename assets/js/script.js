var secondsDisplayed = document.querySelector("#timer");
var startButton = document.querySelector("#startButton");
var question = document.querySelector("h1");
var paragraph = document.querySelector("p");
var list = document.querySelector("ul");
var answers = [];
var correctAnswer = "";

startButton.addEventListener("click", startGame);

function startGame() {
    countdown();
    renderQuestion1();
}

function countdown() {
    var secondsLeft = 60;
    var timer = setInterval(function () {
        secondsLeft--;
        secondsDisplayed.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function renderQuestion1() {
    question.textContent = "Commonly used data types DO NOT include:"
    paragraph.setAttribute("style", "display: none;");
    startButton.setAttribute("style", "display: none;");
    answers = ["strings", "numbers", "variables", "booleans"];
    correctAnswer = answers[2];
    for (i = 0; i < 4; i++) {
        var answerOption = document.createElement("li");
        answerOption.textContent = answers[i];
        list.appendChild(answerOption);
    }

    list.addEventListener("click", getAnswer);

    
}

function getAnswer (event) {
    var element = event.target;
    if (element.matches("li")){
    var selectedAnswer = element.textContent;

    if (selectedAnswer === correctAnswer) {
        console.log("Correct!");
    }
    }


}
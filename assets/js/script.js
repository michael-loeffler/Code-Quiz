var secondsLeft = 60;
var secondsDisplayed = document.querySelector("#timer");
var startButton = document.querySelector("#startButton");
var questionHeader = document.querySelector("h1");
var paragraph = document.querySelector("p");
var list = document.querySelector("ul");
var main = document.querySelector("main")
var answerList = [];
var thisCorrectAnswer = "";


var questions = ["Commonly used data types DO NOT include:", "The condition in an if / else statement is enclosed within _____.", "Arrays in JavaScript can be used to store _____.", "'DOM' stands for _____"]
var answers1 = ["strings", "numbers", "variables", "booleans"];
var answers2 = ["parentheses", "quotes", "curly brackets", "square brackets"];
var answers3 = ["numbers and strings", "booleans", "other arrays", "all of the above"];
var answers4 = ["Discrete Object Method", "Document Object Model", "Distributed Order Management", "Describe Our Materials"]
var allAnswers = [answers1, answers2, answers3, answers4];
var correctAnswers = ["variables", "parentheses", "all of the above", "Document Object Model"];
var index = 0;
var userInitials = "";


startButton.addEventListener("click", startGame);

function startGame(event) {
    countdown();
    paragraph.setAttribute("style", "display: none;");
    startButton.setAttribute("style", "display: none;");
    advance(event);
}

function countdown() {
    var timer = setInterval(function () {
        secondsLeft--;
        secondsDisplayed.textContent = secondsLeft;

        if ((secondsLeft <= 0) || (index === questions.length + 1)) {
            clearInterval(timer);
            secondsDisplayed.textContent = 0;
        }
    }, 1000);
}

function renderQuestion() {
    questionHeader.textContent = questions[index];
    answerList = allAnswers[index];
    thisCorrectAnswer = correctAnswers[index];

    if (index === 0) {
        for (i = 0; i < 4; i++) {
            var answerOption = document.createElement("li");
            answerOption.textContent = answerList[i];
            answerOption.setAttribute("style", "cursor: pointer;");
            list.appendChild(answerOption);
        }
    } else if (index < questions.length) {
        for (i = 0; i < 4; i++) {
            list.children[i].textContent = answerList[i];
            list.children[i].setAttribute("style", "cursor: pointer;");
        }
    }

    index++;
    console.log(index);
    if ((index === questions.length) && (secondsLeft != 0)) {
        list.addEventListener("click", getInitials);
    } else {
        list.addEventListener("click", advance);
    }
}

function advance(event) {
    getAnswer(event);
    renderQuestion();
}

function getAnswer(event) {
    var element = event.target;
    if (element.matches("li")) {
        var selectedAnswer = element.textContent;
        var result = document.createElement("li");
        result.setAttribute("style", "list-style-type: none; font-style: italic;");

        if (selectedAnswer === thisCorrectAnswer) {
            result.textContent = "Correct!"
            result.style.color = "green";
        } else {
            result.textContent = "Wrong!"
            result.style.color = "red";
            if (secondsLeft >= 15) {
                secondsLeft = secondsLeft - 15;
            } else {
                secondsLeft = 0;
            }
            secondsDisplayed.textContent = secondsLeft;
        }

        list.appendChild(result);

    }

}

var input;

function getInitials() {
    list.setAttribute("style", "display: none;");
    questionHeader.textContent = "Please enter your initials:";
    questionHeader.setAttribute("style", "display: visible;");
    input = document.createElement("input");
    input.setAttribute("type", "text");
    main.appendChild(input);

   
    input.addEventListener("change", displayScore);
    
}

function displayScore() {
    userInitials = input.value;
    if (userInitials === "") {
        alert("Please enter your initials to continue.");
        getInitials();
    } else {
        input.setAttribute("style", "display: none;")
        questionHeader.textContent = "Highscores:";
        var highscores = document.createElement("ul");
        main.appendChild(highscores);
        var newScore = document.createElement("li");
        newScore.textContent = userInitials + ": " + secondsLeft + " seconds left."
        highscores.appendChild(newScore);
    }
}
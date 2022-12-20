//-- DOM DECLARATIONS --//
var secondsDisplayed = document.querySelector("#timer");
var startButton = document.querySelector("#startButton");
var questionHeader = document.querySelector("h1");
var paragraph = document.querySelector("p");
var list = document.querySelector("ul");
var main = document.querySelector("main")
var highscorePage = document.querySelector("#highscores");

//-- VARIABLE INITIALIZATIONS --//
var secondsLeft = 60;
var answerList = [];
var thisCorrectAnswer = "";
var index = 0;
var userInitials = "";
var input;

//-- QUESTION AND ANSWER LIBRARY --//
var questions = ["Commonly used data types DO NOT include:", "The condition in an if / else statement is enclosed within _____.", "Arrays in JavaScript can be used to store _____.", "'DOM' stands for _____"]
var answers1 = ["strings", "numbers", "variables", "booleans"];
var answers2 = ["parentheses", "quotes", "curly brackets", "square brackets"];
var answers3 = ["numbers and strings", "booleans", "other arrays", "all of the above"];
var answers4 = ["Discrete Object Method", "Document Object Model", "Distributed Order Management", "Describe Our Materials"]
var allAnswers = [answers1, answers2, answers3, answers4];
var correctAnswers = ["variables", "parentheses", "all of the above", "Document Object Model"];


startButton.addEventListener("click", startGame); // Starts the game when the Start button is clicked //
highscorePage.setAttribute("style", "cursor: pointer;");
highscorePage.addEventListener("click", displayScore); // Displays the previous highscore when "View Previous Highscore" is clicked //


//-- START GAME FUNCTION --// 
// The starTgame function takes in the click event as a parameter, calls the countdown function to begin the timer, hides the paragraph and start button elements, and calls the advance function //
function startGame(event) {
    countdown();
    paragraph.setAttribute("style", "display: none;");
    startButton.setAttribute("style", "display: none;");
    advance(event);
}

//-- COUNTDOWN FUNCTION --//
// the countdown function initializes a setInterval function, decrements the secondsLeft variable, and displays the secondsLeft in real time. Additionally, it looks out for if the timer runs out, or if the game ends (the end of the questions array is reached), and when either of those are true, it will clearInterval to end the function. //
function countdown() {
    var timer = setInterval(function () {
        secondsLeft--;
        secondsDisplayed.textContent = secondsLeft;

        if ((secondsLeft === 0) || (index === questions.length)) {
            clearInterval(timer);
            if (secondsLeft > 0) {
                secondsDisplayed.textContent = secondsLeft;
            } else {
                secondsDisplayed.textContent = 0;
            }
        }
    }, 1000);
}

//-- RENDER QUESTION FUNCTION --//
// The renderQuestion function's main purpose is to reset the page's content with a new question. The function operates differently for the first question (when the index = 0), in that it has to create the list elements for the answer options. For the second through fourth questions, the function simply overwrites the answer options. After each question it increments the index by 1. Finally, it creates an event listener for clicks on any of the answer options. If there are questions left, a click will trigger the advance function. If there are no questions left, a click will trigger the getInitials function.//
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
    if ((index === questions.length) && (secondsLeft != 0)) {
        list.addEventListener("click", getInitials);
    } else {
        list.addEventListener("click", advance);
    }
}

//-- ADVANCE FUNCTION --//
// The advance function will run the getAnswer function, and then render a new question. The getAnswer function will be skipped over the first time the advance function is called, because the event.target on the first call is the startButton, not a list item (answer option). The if statement in the second line of the getAnswer function execute this skip. //
function advance(event) {
    getAnswer(event);
    renderQuestion();
}

//-- GET ANSWER FUNCTION --//
// The getAnswer function will take in a click event as a parameter, and immediately check if the user clicked on a list item (aka one of the answer options). If not, the rest of the function will not execute. If the user did in fact click on one of the answers, it will assign the value of the answer they clicked to the selectedAnswer variable, and then create a new list item to let the user know if their answer was correct. If the selectedAnswer equals the correct answer for that question, the new list item will say "Correct!" in green text. If the answer is incorrect, the new list item will say "Wrong!" in red text. Additionally, if the answer is wrong, this function will subtract 15 seconds from the timer. //
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

//-- GET INITIALS FUNCTION --//
// The getInitials function will hide the list from view, overwrite the h1 to say "Please enter your initials:", and create a text input box for the user to input initials into (up to three characters). The addScore function will run when a change is made to the text input (when the enter key is pressed). //
function getInitials() {
    list.setAttribute("style", "display: none;");
    questionHeader.textContent = "Please enter your initials:";
    questionHeader.setAttribute("style", "display: visible;");
    input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "3");
    main.appendChild(input);

    input.addEventListener("change", addScore);

}

//-- ADD SCORE FUNCTION --//
// The addScore function assigns the user's input into the text field to the variable "userInitials". It performs a brief data validation procedure to make sure text was entered at all. Then it will display the user's initials and their score in seconds left by overwriting the h1, creating a new list and list item, concatenating a string with the associated information, and adding the score to the list
function addScore() {
    userInitials = input.value;
    if (userInitials === "") {
        alert("Please enter your initials to continue.");
        getInitials();
    } else {
        input.setAttribute("style", "display: none;")
        questionHeader.textContent = "Highscores:";
        
        var highscores = document.createElement("ul");
        highscores.setAttribute("id", "highscoreList");
        main.appendChild(highscores);
        var newScore = document.createElement("li");
        newScore.textContent = userInitials + ": " + secondsLeft + " seconds left."
        highscores.appendChild(newScore);
        localStorage.setItem("initials", userInitials);
        localStorage.setItem("score", secondsLeft);
    }
}

//-- DISPLAY SCORE FUNCTION --//
// The displayScore function clears out most of the DOM elements and displays the highscore of the last person to complete the quiz.//
function displayScore() {
    list.setAttribute("style", "display: none;");
    paragraph.setAttribute("style", "display: none;");
    startButton.setAttribute("style", "display: none;");
    highscorePage.textContent = "";
    questionHeader.textContent = "Previous Highscore:";

    var initials = localStorage.getItem("initials");
    var score = localStorage.getItem("score");

    if (!initials || !score) {
        return;
    }

    var highscores = document.createElement("ul");
    highscores.setAttribute("id", "highscoreList");
    main.appendChild(highscores);
    var displayedScore = document.createElement("li");
    displayedScore.textContent = initials + ": " + score + " seconds left."
    highscores.appendChild(displayedScore);
}

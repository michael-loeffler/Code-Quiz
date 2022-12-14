var secondsDisplayed = document.querySelector("#timer");
var startButton = document.querySelector("#startButton");

function startGame() {
    countdown();
}

function countdown() {
    var secondsLeft = 60;
    var timer = setInterval(function (){
        secondsLeft--;
        secondsDisplayed.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timer);
        }
    }, 1000);
}

startButton.addEventListener("click", startGame);
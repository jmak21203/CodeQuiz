// when I click, timer starts, show questions
//when question is answered, show next question
//when user answers question incorrect, subtract time from timer
//when no questions left or timer is 0, game over
//user can save initials and score(time)

var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector("#currentTime");
var quizElement = document.querySelector("#quiz");
var questionList = document.getElementById("questionlist");
var quizHeader = document.getElementById("quizHeader");
var quizInfo = document.getElementById("quizInfo");
var choiceEl = document.getElementById("choices");
var infoEl = document.querySelector(".questionInfo");

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

var score = 0;
var timer;
var questionIndex = 0;
var timerCount = 75;
var questionList = document.createElement("ul");


//function to start the game on button click
function startGame() {
    // isWin = false;

    // startTimer()
    console.log("Start the game");
    quizHeader.style.display = "none";
    quizInfo.style.display = "none";
    startButton.style.display = "none";

    showQuestions();
}

//timer function starts the timer

function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                winGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}



//function to show cycle questions
function showQuestions() {

    if (questionIndex < questions.length) {

        var questionObject = questions[questionIndex];
        var userQuestion = questionObject.title;
        infoEl.innerText = userQuestion;

        var userChoices = questionObject.choices;
        choiceEl.innerHTML = "";

        for (var i = 0; i < userChoices.length; i++) {
            var choiceText = userChoices[i];
            var choiceButton = document.createElement("button");
            choiceButton.innerText = choiceText;
            choiceButton.classList.add("btn", "btn-info");
            choiceEl.appendChild(choiceButton);
        }
        questionIndex++
    } else {
        gameOver()

    }

}



function compareChoice(userChoice) {
    //make some logic if correct

    //else make some logic if incorrect

    //display next question

    showQuestions()
}

startButton.addEventListener("click", startGame);

// when I click, timer starts, show questions
//when question is answered, show next question
//when user answers question incorrect, subtract time from timer
//when no questions left or timer is 0, game over
//user can save initials and score(time)
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector("#currentTime");
var quizElement = document.querySelector("#quiz");
var quizHeader = document.getElementById("quizHeader");
var quizInfo = document.getElementById("quizInfo");
var choiceEl = document.getElementById("choices");
var infoEl = document.querySelector(".questionInfo");
var answerEl = document.getElementById("answer");
var gameOver2 = document.querySelector("#gameover");
var highScores = document.querySelector("#highscores");
var clearScores = document.querySelector(".clear-scores");
var highScoreButton = document.querySelector(".highscore-button");
var playAgain = document.querySelector(".play-again");
var submitScoreEl = document.querySelector(".score-button");
var highScoresEl = document.querySelector(".highscores-list");
var userName = document.querySelector("#username");
var submitBtn = document.querySelector(".score-button");
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
var time = questions.length * 15;

function init() {
    highScores.style.display = "none";
    quizHeader.style.display = "show";
    quizInfo.style.display = "show";
    startButton.style.display = "show";
    startButton.addEventListener("click", startGame);

}
//function to start the game on button click
function startGame() {
    score = 0;
    startTimer()
    console.log("Start the game");
    quizHeader.style.display = "none";
    quizInfo.style.display = "none";
    startButton.style.display = "none";
    // highScores.style.display = "none";
    // gameOver2.style.display = "none";
    document.querySelector("#highscores").classList.add("hidden");
    document.querySelector("#quiz").classList.remove("hidden");
    showQuestions();
}
//timer function starts the timer
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        if (timerCount <= 0) {
            gameOver()
        }
        // Tests if time has run out
        else {
            timerElement.textContent = "Timer: " + timerCount + " seconds";
        }
    }, 1000);
}
//function to show cycle questions
function showQuestions() {
    console.log("this function has been called");
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
function checkAnswer(buttonEl) {
    var userAnswer = buttonEl.innerText;
    var questionObject = questions[questionIndex - 1];
    var correctAnswer = questionObject.answer;
    if (userAnswer === correctAnswer) {
        score += 5;
        answerEl.innerText = "Correct";
    } else {
        timerCount -= 5;
        answerEl.innerText = "Wrong";
    }
    //make some logic if correct
    //else make some logic if incorrect
    //display next question
    showQuestions();
}
function gameOver() {
    //ends game
    // // stop timer
    clearInterval(timer);
    // show end screen
    var highscoreSectionEl = document.querySelector("#gameover");
    highscoreSectionEl.setAttribute("class", "show");
    document.querySelector(".final-score").innerText = "Thanks for Playing! Final Score " + score + " points!";
    // hide questions section
    quizElement.style.display = "none";
    choiceEl.style.display = "none";
    // document.querySelector(".highScores").classList.remove("hide");
}
function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveHighscore();
    }
}
function Highscores() {
    timerElement.hidden = true;
    highScoreButton.disabled = true;
    document.querySelector("#highscores").classList.remove("hidden");
    var highscores = JSON.parse(localStorage.getItem("highScores"));
    highScoresEl.innerHTML = "";
    for (var i = 0; i < highscores.length; i++) {
        var highscoreObject = highscores[i];
        //create element to render on highscores page
        var listItem = document.createElement("li");
        listItem.innerText = highscoreObject.name + " - " + highscoreObject.highscore;
        highScoresEl.appendChild(listItem);
    }
}
function clearHighscores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
}
clearScores.addEventListener("click", clearHighscores);
playAgain.addEventListener("click", function () {
    window.location = "google.com";
});
// user clicks button to submit initials
startButton.addEventListener("click", startGame);
choiceEl.addEventListener("click", function (event) {
    // ignore if target isn't a button
    if (event.target.nodeName === "BUTTON") {
        checkAnswer(event.target);
    }
});
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let highscores = JSON.parse(localStorage.getItem("highScores"));
    if (highscores == null) {
        highscores = [];
    }
    highscores.push(
        {
            name: document.querySelector("#username").value,
            highscore: score,
        }
    );
    localStorage.setItem("highScores", JSON.stringify(highscores));
    // clear the name input field after
    document.querySelector("#username").textContent = "";
    Highscores();
});

highScoreButton.addEventListener("click", Highscores);

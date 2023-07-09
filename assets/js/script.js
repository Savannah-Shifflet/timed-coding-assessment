// Identifies the timer element in the HTML 
var timeEl = document.querySelector("#timer");
var startPrompt = document.querySelector("#start")
var startButton = document.querySelector("#start-button");
var questionContainer = document.querySelector("#questionContainer");
var questionPrompt = document.querySelector("#questionPrompt");
var choice1 = document.querySelector("#choice1");
var choice2 = document.querySelector("#choice2");
var choice3 = document.querySelector("#choice3");
var choice4 = document.querySelector("#choice4");
var answerCheck = document.querySelector("#answerCheck");
var enterScore = document.querySelector("#enterScore");
var highScoreBoard = document.querySelector("#highScoreBoard");
var resetHighScoresButton = document.querySelector("#resetHighScores");
var score = 0;
var highScores = [];
var stopTime = 0;
var storedHighScores = [];

var questions = [
    {
        question: "What is the correct HTML element to put JavaScript?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<script>", correct: true },
            { text: "<scripting>", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "what is my name?",
        answers: [
            { text: "savannah", correct: true },
            { text: "tristan", correct: false },
            { text: "andi", correct: false },
            { text: "butters", correct: false }
        ]
    }
]

var currentQuestion = 0;

function setQuestions() {
    questionPrompt.textContent = questions[currentQuestion].question;
    choice1.textContent = questions[currentQuestion].answers[0].text;
    choice2.textContent = questions[currentQuestion].answers[1].text;
    choice3.textContent = questions[currentQuestion].answers[2].text;
    choice4.textContent = questions[currentQuestion].answers[3].text;

    choice1.dataset.answer = questions[currentQuestion].answers[0].correct;
    choice2.dataset.answer = questions[currentQuestion].answers[1].correct;
    choice3.dataset.answer = questions[currentQuestion].answers[2].correct;
    choice4.dataset.answer = questions[currentQuestion].answers[3].correct;
}

function checkAnswer(event) {
    if (event.target.dataset.answer === "true") {
        answerCheck.textContent = "Correct!";
        score += 5;
    } else {
        answerCheck.textContent = "Wrong :(";
        secondsLeft -= 5;
    }
    runQuiz();
}

function runQuiz() {
    if (currentQuestion < questions.length) {
        setQuestions();

        setTimeout(() => {
            answerCheck.textContent = "";
        }, 2000);

        choice1.addEventListener("click", checkAnswer);
        choice2.addEventListener("click", checkAnswer);
        choice3.addEventListener("click", checkAnswer);
        choice4.addEventListener("click", checkAnswer);
    } else {
        endQuiz();
    }
    currentQuestion++;
}


// Set timer to 50 seconds for the user (extra second to accommodate loading)
var secondsLeft = 50;
// timeEl.textContent = "Time: " + secondsLeft;

// Create timer function for when the start button is pressed
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

        if (stopTime === 1) {
            clearInterval(timerInterval);
        } else if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // end quiz when time is up or questions run out 
            endQuiz();
        } else {
        }

    }, 1000);
}

function storeHighScore() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function endQuiz() {
    stopTime = 1;
    questionContainer.setAttribute("style", "display:none");
    // add child element in enterscore section of header: "Quiz Finished!"
    var finished = document.createElement("h3");
    finished.textContent = "Quiz Finished!"
    enterScore.appendChild(finished);

    // add child element in enterscore section of div: "Your final score is "
    var finalScore = document.createElement("div");
    finalScore.textContent = "Your final score is " + score;
    enterScore.appendChild(finalScore);

    // add input element for them to enter their initials with a submit button
    var inputInitials = document.createElement("input");
    inputInitials.setAttribute("type", "text");
    inputInitials.setAttribute("name", "initials");
    inputInitials.setAttribute("placeholder", "Type your initials to save your score");
    inputInitials.setAttribute('style', "width: 275px");
    enterScore.appendChild(inputInitials);

    // submit button for initials input
    var submitLink = document.createElement("a");
    // submitLink.setAttribute("href", "./highscores.html");
    var scoreSubmitButton = document.createElement("button");
    scoreSubmitButton.textContent = "Submit";
    enterScore.appendChild(submitLink);
    submitLink.appendChild(scoreSubmitButton);

    // add event listener for submit button to store score and initials in local storage
    scoreSubmitButton.addEventListener("click", function () {
        var initialText = inputInitials.value.trim();
        if (initialText === "") {
            window.alert("Please add your initials to save your score");
            return;
        }

        submitLink.setAttribute("href", "./highscores.html");

        var scoreText = initialText + " - " + score;
        highScores.push(scoreText);

        storeHighScore();

        inputInitials.value = "";
        score = 0;
        // stopTime = 0;
    })
}

function init() {
    // Get stored high scores from localStorage
    if (localStorage.getItem("highScores") !== "") {
        storedHighScores = JSON.parse(localStorage.getItem("highScores"));
    }

    // If high scores were retrieved from localStorage, update the high scores array to it
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }

    if (window.location.href.includes("highscores.html")) {
        renderHighScores();
        resetHighScoresButton.addEventListener("click", function () {
            highScoreBoard.textContent = "";
            highScores = [];
            localStorage.setItem("highScores", highScores);
        });
    } else if (window.location.pathname.includes("index")) {
        startButton.addEventListener("click", startQuiz);
    }
}

// add highscore page functions for reset scores and go back
function renderHighScores() {
    if (highScores !== undefined) {
        for (i = 0; i < highScores.length; i++) {
            var highScoreLI = highScores[i];

            var li = document.createElement("li");
            li.textContent = highScoreLI;

            highScoreBoard.appendChild(li);
        }
    }
}

function startQuiz() {
    startPrompt.setAttribute("style", "display: none");
    questionContainer.setAttribute("style", "display: flex; flex-direction: column; flex-wrap: wrap; justify-content: space-evenly; align-content: center");
    stopTime = 0;
    setTime();
    runQuiz();
}

init();
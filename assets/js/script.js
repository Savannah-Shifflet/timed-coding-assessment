var startPrompt = document.querySelector("#start")
var questionContainer = document.querySelector("#questionContainer");


var questions = [
    {
        question: "What is the correct HTML element to put JavaScript?",
        answers: [
            {text: "<js>", correct: false},
            {text: "<javascript>", correct: false},
            {text: "<script>", correct: true},
            {text: "<scripting>", correct: false}
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {text: "Cascading Style Sheets", correct: true},
            {text: "Computer Style Sheets", correct: false},
            {text: "Creative Style Sheets", correct: false},
            {text: "Colorful Style Sheets", correct: false}
        ]
    }
]


function runQuiz() {
        
        

}
        // four answer choices as buttons appear
        // when the button is clicked, it confirms if correct or incorrect (set data attribute to "correct" or "incorrect" for each answer?)    
    //if an answer is answered incorrectly, subtract time from clock 

// Identifies the timer element in the HTML 
var timeEl = document.querySelector("#timer");
    
// Set timer to 50 seconds for the user (extra second to accommodate loading)
var secondsLeft = 51; 
    
    // Create timer function for when the start button is pressed
    function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
    
        if(secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // end quiz when time is up or questions run out 
            // TODO: end quiz and call highscore entry function
        }

    }, 1000);
    }

// store scores in local storage 
    // key: 1,2,3, etc. 
    // data: SS - score

function startQuiz() {
    startPrompt.setAttribute("style", "display: none"); 
    questionContainer.setAttribute("style", "display: block");
    setTime(); 
    runQuiz();
}

var startButton = document.querySelector("#start-button");
startButton.addEventListener("click", startQuiz);

// start game function: start page with start button
    // when button is selected, the start button/info hides
    // timer function is called 
    // score storage function is called 
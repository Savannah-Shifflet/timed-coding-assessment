var startPrompt = document.querySelector("#start")
var questionContainer = document.querySelector("#questionContainer");
// quiz function
    function runQuiz() {
        
        

    }
        // question appears 
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
//QUERY SELECTORS
var beginBtn = document.querySelector("#begin-button");
var closeScoreboardBtn = document.querySelector("#close-scoreboard-button");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#game-question");
var choiceBtnArray = document.querySelectorAll(".choice-button")
var choiceOneBtnEl = document.querySelector("#choice-one");
var choiceTwoBtnEl = document.querySelector("#choice-two");
var choiceThreeBtnEl = document.querySelector("#choice-three");
var choiceFourBtnEl = document.querySelector("#choice-four");
var feedbackEl = document.querySelector("#feedback");
var scoreEl = document.querySelector("#score");
var submitForm = document.querySelector("#score-submission")
var finalScore = document.querySelector("#score-auto-fill")
var submitBtn = document.querySelector("#submit-button")
var userInitials = document.querySelector("#user-initials")
var recentScore = document.querySelector("#recent-score")
var scoreboardRow = document.querySelector("#scoreboardRow")
var scoreboardInitials = document.querySelector("#scoreboardInitials")
var scoreboardScore = document.querySelector("#scoreboardScore")
var viewRecentScoreBtn = document.querySelector("#view-recent-score-button")
var usedIndex = []

//VARIABLES THAT WILL BE AFFECTED BY GAMEPLAY
var scoreCounter = 0;
var secondsLeft = 60;

var userScoreSubmission = {
  initials: userInitials.value,
  score: scoreCounter,
};

//QUESTION OBJECTS
var question1 = {
  question: "Which coding language is primarily responsible for styling a webpage?",
  correct: "CSS",
  incorrectOne: "HTML",
  incorrectTwo: "JavaScript",
  incorrectThree: "Python",
} 

var question2 = {
  question: "What punctuation mark must follow an object key's value before moving on to the next key?",
  correct: "Comma",
  incorrectOne: "Period",
  incorrectTwo: "Curly Bracket",
  incorrectThree: "Colon",
}

var question3 = {
  question: "What would you use to perform the same process or function repeatedly?",
  correct: "A for loop",
  incorrectOne: "A variable",
  incorrectTwo: "A method",
  incorrectThree: "An object",
}

var question4 = {
  question: "What is the name of the relationship between an html element and the elements nested within it?",
  correct: "Parent/Children",
  incorrectOne: "Mommy/Baby",
  incorrectTwo: "Daddy/Baby",
  incorrectThree: "Duck/Duckling",
}

var question5 = {
  question: "What does DOM stand for in JavaScript?",
  correct: "Document Object Model",
  incorrectOne: "Direct Observation Method",
  incorrectTwo: "Double Obligation Mode",
  incorrectThree: "Don't Object to Marinara",
}

var question6 = {
  question: "What is the name for a method that will trigger according to a user's action?",
  correct: "Event Listener",
  incorrectOne: "Action Mode",
  incorrectTwo: "Trigger",
  incorrectThree: "Action Observer",
}

var question7 = {
  question: "What method is used to link a JavaScript variable to an HTML element?",
  correct: "document.querySelector()",
  incorrectOne: "setInterval()",
  incorrectTwo: "clearInterval()",
  incorrectThree: "push()",
}

var question8 = {
  question: "What method adds an item to the end of an array",
  correct: "push()",
  incorrectOne: "setInterval()",
  incorrectTwo: "clearInterval()",
  incorrectThree: "document.querySelector()",
}

var question9 = {
  question: "What method must be used in addition to setInterval() to end a timer?",
  correct: "clearInterval()",
  incorrectOne: "push()",
  incorrectTwo: "log()",
  incorrectThree: "document.querySelector()",
}

var question9 = {
  question: "What method must be used in addition to setInterval() to end a timer?",
  correct: "clearInterval()",
  incorrectOne: "push()",
  incorrectTwo: "log()",
  incorrectThree: "document.querySelector()",
}

var question10 = {
  question: "How do you save information from user input to local storage?",
  correct: "localStorage.setItem()",
  incorrectOne: "localStorage.getItem()",
  incorrectTwo: "localStorage.save()",
  incorrectThree: "localStorage.store()",
}

//ARRAY OF QUESTION OBJECTS
var questionArray = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10]

var indexPrime = 0

//STARTS THE TIMER AND GENERATES THE FIRST QUESTION
function playGame(){
  
  setTime();
  generateQuestion()

}

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      if (secondsLeft !== 1) {timerEl.textContent = secondsLeft + " seconds left"
    } else {timerEl.textContent = secondsLeft + " second left"} 
  
      if(secondsLeft <= 0) {
        clearInterval(timerInterval); 
        submitForm.style.display = "flex";
        questionEl.style.display = "none";
        choiceOneBtnEl.style.display = "none";
        choiceTwoBtnEl.style.display = "none";
        choiceThreeBtnEl.style.display = "none";
        choiceFourBtnEl.style.display = "none";
        feedbackEl.style.display = "none";
        finalScore.textContent = scoreCounter;
      }
    }, 1000);
  }

  //THIS RANDOMLY CHOOSES A QUESTION FROM THE QUESTIONS ARRAY
  function generateQuestion(){
    //tutor help
    var loop = true
    while (loop) {
      indexPrime = Math.floor(Math.random() * questionArray.length)
      if (!usedIndex.includes(indexPrime)) {
        usedIndex.push(indexPrime)
        console.log(usedIndex)
        loop = false;
      } else if(usedIndex.length >= questionArray.length) {
        loop = false;
        questionEl.style.display = "none";
        choiceOneBtnEl.style.display = "none";
        choiceTwoBtnEl.style.display = "none";
        choiceThreeBtnEl.style.display = "none";
        choiceFourBtnEl.style.display = "none";
        secondsLeft = 0;
      } 
      }

    //THIS WILL BE REMOVED ONCE RANDOM OPTION GENERATOR WORKS
    questionEl.textContent = questionArray[indexPrime].question;
    choiceOneBtnEl.textContent = questionArray[indexPrime].correct;
    choiceOneBtnEl.style.display = "block";
    choiceTwoBtnEl.textContent = questionArray[indexPrime].incorrectOne;
    choiceTwoBtnEl.style.display = "block";
    choiceThreeBtnEl.textContent = questionArray[indexPrime].incorrectTwo;
    choiceThreeBtnEl.style.display = "block";
    choiceFourBtnEl.textContent = questionArray[indexPrime].incorrectThree;
    choiceFourBtnEl.style.display = "block";
    } 
    
//THIS IS THE USER CLICKING ON WHICH ANSWER THEY CHOOSE AND WHAT THAT CHOICE WILL CAUSE TO HAPPEN NEXT
  function answerSelection(event){
    var userAnswer = event.target;
      if (userAnswer === choiceOneBtnEl) {
        scoreCounter++;
        scoreEl.textContent = scoreCounter;
        feedbackEl.textContent = "Correct!"
        generateQuestion();
    } else { 
    feedbackEl.textContent = "Incorrect! -10 Seconds. Guess Again.";
    secondsLeft.textContent = secondsLeft - 10;
    secondsLeft = secondsLeft - 10;
    }
  }
//THIS APPLIES THE EVENT LISTENER TO ALL OF THE CHOICE BUTTONS
  for (let i = 0; i < choiceBtnArray.length; i++) {
      choiceBtnArray[i].addEventListener("click",answerSelection)
    }

//THIS STARTS THE GAME
beginBtn.addEventListener("click", playGame)
viewRecentScoreBtn.addEventListener("click", function(){
  recentScore.style.display = "flex"
})

//THIS SUBMITS THE USER'S INITIALS AND SCORE TO LOCAL STORAGE
submitBtn.addEventListener("click", function(event){
  event.preventDefault();
  userScoreSubmission = {
    initials: userInitials.value,
    score: scoreCounter,
  };
  
  localStorage.setItem("userScoreSubmission", JSON.stringify(userScoreSubmission))
  submitForm.style.display = "none";
  recentScore.style.display = "flex";
  renderScoreboard()
})

//THIS PULLS INITIALS AND SCORE FROM LOCAL STORAGE
function renderScoreboard(){
  //tutor help: gave new value to userScoreSubmission Var  
  userScoreSubmission = JSON.parse(localStorage.getItem("userScoreSubmission"))
    document.getElementById("scoreboardInitials").innerHTML = userScoreSubmission.initials;
    document.getElementById("scoreboardScore").innerHTML = userScoreSubmission.score;
}
//THIS CLOSES THE SCOREBOARD TO REINITIALIZE THE PAGE TO PLAY AGAIN
closeScoreboardBtn.addEventListener("click", function(){
  recentScore.style.display = "none";
  location.reload();
});

//PULLS UP MOST RECENT SCORE. 
//NOT WORKING
viewRecentScoreBtn.addEventListener("click", function(){
  recentScore.style.display = "flex";
  renderScoreboard();
});


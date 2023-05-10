//QUERY SELECTORS
var beginBtn = document.querySelector("#begin-button");
var viewHighScoresBtn = document.querySelector("#view-high-scores-button")
var closeScoreboardBtn = document.querySelector("#close-scoreboard-button")
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
var highScores = document.querySelector("#high-scores")
var scoreboardRow = document.querySelector("#scoreboardRow")
var scoreboardInitials = document.querySelector("#scoreboardInitials")
var scoreboardScore = document.querySelector("#scoreboardScore")

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

//ARRAY OF QUESTION OBJECTS
var questionArray = [question1, question2, question3, question4]

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
        finalScore.textContent = scoreCounter;
      }
    }, 1000);
  }

  //THIS RANDOMLY CHOOSES A QUESTION FROM THE QUESTIONS ARRAY
  //MUST MAKE IT SO ONCE QUESTION IS USED, IT WON'T COME UP AGAIN
  function generateQuestion(){
    for (let i = 0; i < questionArray.length; i++) {
    var indexPrime = Math.floor(Math.random() * questionArray.length)
    //console.log (questionArray[indexPrime].question)


    //RANDOM OPTION GENERATOR
    var questionAnswers = Object.keys(indexPrime);
    console.log(questionAnswers)
    for (let j = 1; j < 4; j++){
      var index = Math.floor(Math.random() * questionAnswers.length)
      if(index != 0) console.log(index)
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
    }
//THIS IS THE USER CLICKING ON WHICH ANSWER THEY CHOOSE AND WHAT THAT CHOICE WILL CAUSE TO HAPPEN NEXT
  function answerSelection(event){
    var userAnswer = event.target;
      if (userAnswer === choiceOneBtnEl) {
        scoreCounter++;
        scoreEl.textContent = scoreCounter;
        console.log(scoreCounter)
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
viewHighScoresBtn.addEventListener("click", function(){
  highScores.style.display = "flex"
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
  highScores.style.display = "flex";
  renderScoreboard()
})

//THIS PULLS INITIALS AND SCORE FROM LOCAL STORAGE
function renderScoreboard(){
    JSON.parse(localStorage.getItem("userScoreSubmission"))
    document.getElementById("scoreboardInitials").innerHTML = userScoreSubmission.initials;
    document.getElementById("scoreboardScore").innerHTML = userScoreSubmission.score;
}
//THIS CLOSES THE SCOREBOARD TO REINITIALIZE THE PAGE TO PLAY AGAIN
closeScoreboardBtn.addEventListener("click", function(){
  highScores.style.display = "none";
  location.reload();
});

function init(){
  renderScoreboard();
}
init()
var beginBtn = document.querySelector("#begin-button");
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
var scoreboardInitials = document.querySelector("#scoreboardInitials")
var scoreboardScore = document.querySelector("#scoreboardScore")

var scoreCounter = 0;
var secondsLeft = 60;

var question1 = {
  question: "Which coding language is primarily responsible for styling a webpage?",
  correct: "CSS",
  incorrectOne: "HTML",
  incorrectTwo: "JavaScript",
  incorrectThree: "Python",
} 

//var questionArray = [question1, question2]

function playGame(){
  
  setTime();
  generateQuestion()

}

//The Object that users will submit including their initials and their score.
var userScoreSubmission = {
  initials: userInitials.value,
  score: finalScore.value,
  };

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

  function generateQuestion(){
    questionEl.textContent = question1.question;  
    choiceOneBtnEl.textContent = question1.correct;
    choiceOneBtnEl.style.display = "block";
    choiceTwoBtnEl.textContent = question1.incorrectOne;
    choiceTwoBtnEl.style.display = "block";
    choiceThreeBtnEl.textContent = question1.incorrectTwo;
    choiceThreeBtnEl.style.display = "block";
    choiceFourBtnEl.textContent = question1.incorrectThree;
    choiceFourBtnEl.style.display = "block";
    /*for (let i = 1; i < choiceBtnEl.length; i++) {
        var index = Math.floor(Math.random * choiceBtnEl.length)
        choiceBtnEl.textContent = question1[index]
      }*/
      
    }

  //must fix penalty
  function answerSelection(event){
    var userAnswer = event.target;
      if (userAnswer === choiceOneBtnEl) {
        scoreCounter++;
        scoreEl.textContent = scoreCounter;
        console.log(scoreCounter)
        feedbackEl.textContent = "Correct!"
    } else { 
    feedbackEl.textContent = "Incorrect! -10 Seconds";
    secondsLeft.textContent = secondsLeft - 10;
    secondsLeft = secondsLeft - 10;
    }
  }

  for (let i = 0; i < choiceBtnArray.length; i++) {
      choiceBtnArray[i].addEventListener("click",answerSelection)
    }
  beginBtn.addEventListener("click", playGame)
  
  closeScoreboardBtn.addEventListener("click", function(){
    highScores.style.display = "none";
    location.reload();
  });



submitBtn.addEventListener("click", function(event){
  event.preventDefault();
  var userScoreSubmission = {
    initials: userInitials.value,
    score: scoreCounter,
  };
  
  localStorage.setItem("userScoreSubmission", JSON.stringify(userScoreSubmission))
  submitForm.style.display = "none";
  highScores.style.display = "flex";
})

function renderScoreboard(){
  var scoreboardRow = JSON.parse(localStorage.getItem("userScoreSubmission"))
  if (scoreboardRow !== null){
    scoreboardInitials.textContent = userScoreSubmission.initials;
    scoreboardScore.textContent = userScoreSubmission.score;
  }
  

}
  
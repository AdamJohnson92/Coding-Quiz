var beginBtn = document.querySelector("#begin-button");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#game-question");
var choiceBtnArray = document.querySelectorAll(".choice-button")
var choiceOneBtnEl = document.querySelector("#choice-one");
var choiceTwoBtnEl = document.querySelector("#choice-two");
var choiceThreeBtnEl = document.querySelector("#choice-three");
var choiceFourBtnEl = document.querySelector("#choice-four");
var feedbackEl = document.querySelector("#feedback")
var scoreEl = document.querySelector("#score")
var scoreCounter = 0;
var secondsLeft = 60;

var questionOne = {
  question: "Which coding language is primarily responsible for styling a webpage?",
  correct: "CSS",
  incorrectOne: "HTML",
  incorrectTwo: "JavaScript",
  incorrectThree: "Python",
} 

function playGame(){
  setTime();
  generateQuestion()
  
}

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      if (secondsLeft !== 1) {timerEl.textContent = secondsLeft + " seconds left"
    } else {timerEl.textContent = secondsLeft + " second left"} 
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        questionEl.textContent = "Game Over"; 
        questionEl.style.fontSize = "100px"; 
        choiceOneBtnEl.style.display = "none";
        choiceTwoBtnEl.style.display = "none";
        choiceThreeBtnEl.style.display = "none";
        choiceFourBtnEl.style.display = "none";
        feedbackEl.style.display = "none";
      }
    }, 1000);
  }

  function generateQuestion(){
    questionEl.textContent = questionOne.question;  
    choiceOneBtnEl.textContent = questionOne.correct;
    choiceOneBtnEl.style.display = "block";
    choiceTwoBtnEl.textContent = questionOne.incorrectOne;
    choiceTwoBtnEl.style.display = "block";
    choiceThreeBtnEl.textContent = questionOne.incorrectTwo;
    choiceThreeBtnEl.style.display = "block";
    choiceFourBtnEl.textContent = questionOne.incorrectThree;
    choiceFourBtnEl.style.display = "block";
    /*for (let i = 1; i < choiceBtnEl.length; i++) {
        var index = Math.floor(Math.random * choiceBtnEl.length)
        choiceBtnEl.textContent = questionOne[index]
      }*/
      
    }

  
  function answerSelection(event){
    var userAnswer = event.target;
      if (userAnswer === choiceOneBtnEl) {
        scoreCounter++;
        scoreEl.textContent = scoreCounter;
        console.log(scoreCounter)
        feedbackEl.textContent = "Correct!"
    } else { 
    feedbackEl.textContent = "Incorrect! -10 Seconds"
    secondsLeft -10000;
    }
  }

  for (let i = 0; i < choiceBtnArray.length; i++) {
      choiceBtnArray[i].addEventListener("click",answerSelection)
    }
  beginBtn.addEventListener("click", playGame);
  
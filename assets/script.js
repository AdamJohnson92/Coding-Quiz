var beginBtn = document.querySelector("#begin-button");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#game-question");
var choiceBtnArray = document.querySelectorAll(".choice-button")
var choiceOneBtnEl = document.querySelector("#choice-one");
var choiceTwoBtnEl = document.querySelector("#choice-two");
var choiceThreeBtnEl = document.querySelector("#choice-three");
var choiceFourBtnEl = document.querySelector("#choice-four");
var feedbackEl = document.querySelector("#feedback");
var scoreEl = document.querySelector("#score");
var scoreCounter = 0;
var secondsLeft = 60;
var submitBtn = document.querySelector("#submit=button")

//var questionArray = [question1, question2]

var question1 = {
  question: "Which coding language is primarily responsible for styling a webpage?",
  correct: "CSS",
  incorrectOne: "HTML",
  incorrectTwo: "JavaScript",
  incorrectThree: "Python",
} 



function playGame(){
  setTime();
  generateQuestion()
  return scoreCounter;
}


function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      if (secondsLeft !== 1) {timerEl.textContent = secondsLeft + " seconds left"
    } else {timerEl.textContent = secondsLeft + " second left"} 
  
      if(secondsLeft <= 0) {
        clearInterval(timerInterval); 
        choiceOneBtnEl.style.display = "none";
        choiceTwoBtnEl.style.display = "none";
        choiceThreeBtnEl.style.display = "none";
        choiceFourBtnEl.style.display = "none";
        feedbackEl.style.display = "none";
        return scoreCounter;
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
  beginBtn.addEventListener("click", playGame);
  
var beginBtn = document.querySelector("#begin-button");
var timerEl = document.querySelector("#timer")
var secondsLeft = 60;



function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = secondsLeft + " seconds left";
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  beginBtn.addEventListener("click", setTime);
  
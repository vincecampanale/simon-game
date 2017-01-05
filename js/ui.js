var switchToggle = document.getElementsByClassName("switch")[0];
var switchBlock = document.getElementsByClassName("switch-block")[0];
var countDisplay = document.getElementsByClassName("count-display")[0];
var strictToggle = document.getElementsByClassName("strict-btn")[0];

function powerSwitch() {
  switchToggle.addEventListener("click", function() {
    if(switchBlock.className === "switch-block toggled"){
      switchBlock.className = switchBlock.className.substring(0, 12);
      showCount();
    } else {
      switchBlock.className = "switch-block toggled";
      showCount();
      toggleStrictMode(); //only allow strict mode to be toggled if game is turned on
    }
  });
}

function showCount() {
  if(switchBlock.className === "switch-block") {
    countDisplay.innerHTML = "  ";
  } else {
    countDisplay.innerHTML = "--";
    //change "--" to be equal to count.value
  }
}

function toggleStrictMode() {
    strictToggle.addEventListener("click", function() {
      var strictLed = document.getElementsByClassName("led")[0];
      if(switchBlock.className === "switch-block toggled"){
        if(strictLed.className === "led led-on"){
          strictLed.className = strictLed.className.substring(0, 3);
        } else {
          strictLed.className = "led led-on";
        }
      }
    });
}

powerSwitch();
showCount();



// Approach:
//   - Game object
//     - strict mode: on or off
//     - current series of sounds
//     -

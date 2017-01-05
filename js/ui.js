const switchToggle = document.querySelector(".switch");
const switchBlock = document.querySelector(".switch-block");
const countDisplay = document.querySelector(".count-display");
const strictButton = document.querySelector(".strict-btn");
const strictLed = document.querySelector(".led");

function powerSwitch() {
  switchToggle.addEventListener("click", function() {
    if(switchBlock.className === "switch-block toggled"){
      switchBlock.className = switchBlock.className.substring(0, 12);
      activateStrictButton();
      showCount();
    } else {
      switchBlock.className = "switch-block toggled";
      activateStrictButton();
      showCount();
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

function activateStrictButton() {
  strictButton.addEventListener("click", function() {
    toggleStrictMode();
  });
}
function toggleStrictMode() {
  if(switchBlock.className === "switch-block toggled"){
    if(strictLed.className === "led led-on"){
      strictLed.className = strictLed.className.substring(0, 3);
    } else {
      strictLed.className = "led led-on";
    }
  }
}

powerSwitch();



// Approach:
//   - Game object
//     - strict mode: on or off
//     - current series of sounds
//     -

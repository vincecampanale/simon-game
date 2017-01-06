const UI = {
  switchToggle: document.querySelector(".switch"),
  switchBlock: document.querySelector(".switch-block"),
  countDisplay: document.querySelector(".count-display"),
  strictButton: document.querySelector(".strict-btn"),
  strictLED: document.querySelector(".led"),
  //toggle the power switch to on or off on click
  powerSwitch: function powerSwitch() {
    UI.switchToggle.addEventListener("click", function() {
      if(UI.switchBlock.className === "switch-block toggled"){
        UI.switchBlock.className = UI.switchBlock.className.substring(0, 12);
        UI.activateStrictButton();
        UI.loadCountDisplay();
      } else {
        UI.switchBlock.className = "switch-block toggled";
        UI.activateStrictButton();
        UI.loadCountDisplay();
      }
    });
  },
  //load the initial count-display
  loadCountDisplay: function loadCountDisplay() {
    if(UI.switchBlock.className === "switch-block") {
      UI.countDisplay.innerHTML = "  ";
    } else {
      UI.countDisplay.innerHTML = "--";
      //change "--" to be equal to count.value
    }
  },
  //allow the strict button to be clicked
  activateStrictButton: function activateStrictButton() {
    UI.strictButton.addEventListener("click", function() {
      UI.toggleStrictLED();
    });
  },
  //turn on/off the LED above strict button
  toggleStrictLED: function toggleStrictLED() {
    if(UI.switchBlock.className === "switch-block toggled"){
      if(UI.strictLED.className === "led led-on"){
        UI.strictLED.className = UI.strictLED.className.substring(0, 3);
      } else {
        UI.strictLED.className = "led led-on";
      }
    }
  }
}

// Approach:
//   - Game object
//     - strict mode: on or off
//     - current series of sounds
//     -

const UI = {
  switchToggle: document.querySelector(".switch"),
  switchBlock: document.querySelector(".switch-block"),
  countDisplay: document.querySelector(".count-display"),
  startButton: document.querySelector(".start-btn"),
  strictButton: document.querySelector(".strict-btn"),
  strictLED: document.querySelector(".led"),
  //toggle the power switch to on or off on click
  powerSwitch: function powerSwitch() {
    UI.switchToggle.addEventListener("click", function() {
      if(UI.switchBlock.className === "switch-block"){
        UI.switchBlock.className = "switch-block toggled";
        Game.status = "on";
        UI.activateStrictButton();
        UI.activateStartButton();
        UI.loadCountDisplay();
      } else { //turn the game off and reset everything
        UI.switchBlock.className = "switch-block";
        UI.deactivateStrictButton();
        UI.deactivateStartButton();
        UI.loadCountDisplay();
        Game.status = "off";
        UI.strictLED.className = "led";
      }
    });
  },
  //load default count display values
  loadCountDisplay: function loadCountDisplay() {
    if(UI.switchBlock.className === "switch-block") {
      UI.countDisplay.innerHTML = "  ";
    } else {
      UI.countDisplay.innerHTML = "--";
    }
  },
  //update the count display to equal the value of count
  updateCountDisplay: function updateCountDisplay() {
    if(Game.count < 10){
      UI.countDisplay.innerHTML = "0" + Game.count;
    } else {
      UI.countDisplay.innerHTML = Game.count.toString();
    }
  },
  //make the start button clickable
  activateStartButton: function activateStartButton() {
    UI.startButton.addEventListener("click", Game.start);
  },
  //do not allow the start button to be clicked
  deactivateStartButton: function deactivateStartButton() {
    UI.startButton.removeEventListener("click", Game.start);
  },
  //allow the strict button to be clicked
  activateStrictButton: function activateStrictButton() {
    UI.strictButton.addEventListener("click", UI.toggleStrictLED);
  },
  //deactivate the strict button
  deactivateStrictButton: function deactivateStrictButton() {
    UI.strictButton.removeEventListener("click", UI.toggleStrictLED);
  },
  //turn on/off the LED above strict button
  toggleStrictLED: function toggleStrictLED() {
    if(UI.strictLED.className === "led"){
      UI.strictLED.className = "led led-on";
    } else {
      UI.strictLED.className = "led";
    }
  }
}

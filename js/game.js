//TODO: Toggle clickability

const Game = {
  //Properties
  status: "off", //game starts out as off
  strictMode: false,
  count: 0, //initialize at 0
  gamePattern: [], //initialize to empty array
  playerPattern: [], //initialize to empty array
  currentIndex: -1, //the index to compare the player's click to (initialize at -1 bc first click will update to index 0)
  start: function start() {
    UI.deactivateStartButton();
    Game.incrementCount(); //increment the count to 1
    Game.gamePattern.push(Game.generateRandomNumber()); //generate a random number and load that number into the pattern
    Game.playPattern(Game.gamePattern);
    Game.playerTurn(); //TODO: Set timeout so this doesn't run until playPattern function is completed
  },
  incrementCount: function incrementCount() {
    Game.count++;
    UI.updateCountDisplay();
  },
  //allows user to click pads and compare their clicks to the game pattern
  playerTurn: function playerTurn() {
    //add click event listeners to all the pads
    const pads = document.querySelectorAll('.pad');
    pads.forEach(pad => pad.addEventListener('click', handleClick));

    //private function for Game.playerTurn() which handles clicks
    function handleClick() {
      const pad = this; //set context to variable "pad" - makes it easier to reference
      const padNumber = parseInt(pad.getAttribute("data-pad")); //get the pad number from "data-pad" attribute
      Game.playerPattern.push(padNumber); //push the pad number to the player pattern

      //check if click is correct
      Game.currentIndex++; //increment index
      if (Game.playerPattern[Game.currentIndex] == Game.gamePattern[Game.currentIndex]) { //if playerPattern matches gamePattern at current index
        Pad.play(padNumber); //play the pad
        if (Game.playerPattern.length === Game.gamePattern.length) { //if the player has completed the game pattern
          setTimeout(() => Game.incrementCount(), 500); //pause for a moment before incrementing the count
          Game.gamePattern.push(Game.generateRandomNumber()); //add new pad to game pattern
          Game.playerPattern = []; //reset player pattern
          Game.currentIndex = -1;
          setTimeout(() => Game.playPattern(Game.gamePattern), 1250); //wait 1250ms, then play the new game pattern
          // TODO: (unless gamePattern.length > 20 ==> in that case, reset the game and create "Congratulations! You win!" window)
        }
      } else {
        if(!Game.strictMode){
          Pad.wrongPad(padNumber); // if incorrect pad, play the error sound, display "!!" in countDisplay
          Game.restartPlayerTurn(); // if not strict mode, just restart the current turn (don't reset count)
        } else {
          Pad.wrongPad(padNumber);
          setTimeout(() => Game.restartGame(), 1200); //if strict mode, reset count to 01, restart game
        }
      }
    }
  },
  endPlayerTurn: function endPlayerTurn() {
    // remove event listeners from pads (??)
  },
  //takes in an array which is the pattern to play, plays corresponding pads/sounds,
  playPattern: function playPattern(padNumbers) {
    const interval = Game.setInterval(padNumbers.length);
    padNumbers.forEach(function(padNumber, index) {
      setTimeout(Pad.play.bind(null, padNumber), index * interval);
    });
    //after the pattern plays, listen for the player's input
  },
  //set interval in between each sound/light based on the length of the pattern array
  setInterval: function setInterval(patternLength) {
    const intervalLengths = [1000, 750, 500, 250];
    if(patternLength > 12) {
      return intervalLengths[3];
    } else if (patternLength > 8) {
      return intervalLengths[2];
    } else if (patternLength > 4) {
      return intervalLengths[1];
    } else {
      return intervalLengths[0];
    }
  },
  //return a random integer between 1 and 4
  generateRandomNumber: function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 4) + 1; //pick integer between 1 and 4
    return randomNumber;
  },
  restartPlayerTurn: function restartPlayerTurn() {
    Game.playerPattern = [];
    Game.currentIndex= -1;
    console.log("Wrong pad! Start from beginning of current sequence.");
  },
  restartGame: function restartGame() {
    Game.count = 0;
    Game.playerPattern = [];
    Game.gamePattern = [];
    Game.currentIndex = -1;
    console.log("Wrong pad! Starting over...");
    Game.incrementCount(); //increment the count to 1
    Game.gamePattern.push(Game.generateRandomNumber()); //generate a random number and load that number into the pattern
    Game.playPattern(Game.gamePattern);
  },
  //reset the game entirely (only fires when off button is clicked)
  off: function off() {
    UI.strictLED.className = "led"; //turn off strictLED light
    Game.count = 0; //set count back to 0
    Game.playerPattern = []; //clear player pattern
    Game.gamePattern = []; //clear game pattern
    Game.currentIndex = -1;
  }
}

const Pad = {
  //play the pad (light it up and make the accompanying sound)
  play: function play(padNumber) {
    const sound = document.querySelector(`audio[data-sound="${padNumber}"]`);
    const pad = document.querySelector(`div[data-pad="${padNumber}"]`);

    if (!sound || !pad) return; //if number is invalid, stop the function from running altogether

    pad.classList.add('playing'); //make the pad a little bigger and light up

    sound.currentTime = 0; //rewind sound to the start to be safe
    sound.play(); //play the sound

    Pad.revertToNormal(); //after the pad does it's thing, revert it back to normal
  },
  wrongPad: function wrongPad(padNumber) {
    const sound = document.querySelector(`audio[data-sound="err"]`); //get error sound from html
    const pad = document.querySelector(`div[data-pad="${padNumber}"]`); //get pad

    pad.classList.add('playing'); //light the pad up
    sound.play(); //play error sound

    UI.errorDisplay(); //display "!!" in count
    setTimeout(() => UI.updateCountDisplay(), 1000);
  },
  //revert the pad back to its normal size and color (remove the "playing" class)
  revertToNormal: function revertToNormal() {
    const pads = document.querySelectorAll('.pad');
    pads.forEach(pad => pad.addEventListener('transitionend', Pad.removeTransition));
  },
  //helper function to remove the transition from the pad. Used in 'revertToNormal' function
  removeTransition: function removeTransition(e) {
    if(e.propertyName !== 'transform') return; //only pay attention to the end of an event with propertyName "transform"
    this.classList.remove('playing');
  }
}

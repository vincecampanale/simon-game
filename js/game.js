//TODO: Toggle clickability
//TODO: Remove event listener from start button when the game is playing.

const Game = {
  //Properties
  status: "off", //game starts out as off
  strictMode: false,
  count: 0, //initialize at 0
  gamePattern: [], //initialize to empty array
  playerPattern: [], //initialize to empty array
  currentIndex: -1, //the index to compare the player's click to (initialize at -1 bc first click will update to index 0)
  timeouts: [], //dummy array to hold timeouts
  start() {
    UI.deactivateStartButton();
    Game.incrementCount(); //increment the count to 1
    Game.gamePattern.push(Game.generateRandomNumber()); //generate a random number and load that number into the pattern
    Game.playPattern(Game.gamePattern);
    Game.playerTurn(); //TODO: Set timeout so this doesn't run until playPattern function is completed
  },
  incrementCount() {
    Game.count++;
    UI.updateCountDisplay();
  },
  isOver() {
    return Game.gamePattern.length > 20 ? true : false;
  },
  //allows user to click pads and compare their clicks to the game pattern
  playerTurn() {
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
        if (Game.playerPattern.length === Game.gamePattern.length && !Game.isOver()) { //if the player has completed the game pattern
          setTimeout(() => Game.incrementCount(), 500); //pause for a moment before incrementing the count
          Game.gamePattern.push(Game.generateRandomNumber()); //add new pad to game pattern
          Game.playerPattern = []; //reset player pattern
          Game.currentIndex = -1; //reset current index
          setTimeout(() => Game.playPattern(Game.gamePattern), 1250); //wait 1250ms, then play the new game pattern
        } else if (Game.isOver()) { //if the game is over
          console.log("Congratulations! You win!"); //log "You win to the console"
          setTimeout(() => Game.restartGame(), 500); //start the game over
          setTimeout(() => Game.playPattern(Game.gamePattern), 1000); //play a new pattern
        }
      } else {
        if(!Game.strictMode){
          Pad.wrongPad(padNumber); // if incorrect pad, play the error sound, display "!!" in countDisplay
          Game.restartPlayerTurn(); // if not strict mode, just restart the current turn (don't reset count)
        } else {
          Pad.wrongPad(padNumber);
          setTimeout(() => Game.restartGame(), 500); //if strict mode, reset count to 01, reset patterns0
          setTimeout(() => Game.playPattern(Game.gamePattern), 1000); //play the game pattern after a small delay
        }
      }
    }
  },
  endPlayerTurn() {
    const pads = document.querySelectorAll('.pad');
    pads.forEach(pad => { //TODO: Comment this code.
      let clone = pad.cloneNode();
      while (pad.firstChild) {
        clone.appendChild(pad.lastChild);
      }
      pad.parentNode.replaceChild(clone, pad);
    });
  },
  //takes in an array which is the pattern to play, plays corresponding pads/sounds,
  playPattern(padNumbers) {
    const interval = Game.setInterval(padNumbers.length);
    padNumbers.forEach(function(padNumber, index) {
      let curTimeout = setTimeout(Pad.play.bind(null, padNumber), index * interval)
      Game.timeouts.push(curTimeout);
    });
  },
  stopPlayingPattern() {
    const timeouts = Game.timeouts;
    timeouts.forEach(timeout => clearTimeout(timeout));
  },
  //set interval in between each sound/light based on the length of the pattern array
  setInterval(patternLength) {
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
  generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 4) + 1; //pick integer between 1 and 4
    return randomNumber;
  },
  restartPlayerTurn() {
    Game.playerPattern = [];
    Game.currentIndex = -1;
    console.log("Wrong pad! Start from beginning of current sequence.");
    console.log(Game.gamePattern);
    setTimeout(() => Game.playPattern(Game.gamePattern), 1000);
  },
  restartGame() {
    Game.count = 0;
    Game.playerPattern = [];
    Game.gamePattern = [];
    Game.currentIndex = -1;
    console.log("Wrong pad! Starting over...");
    Game.incrementCount(); //increment the count to 1
    Game.gamePattern.push(Game.generateRandomNumber()); //generate a random number and load that number into the pattern
  },
  //reset the game entirely (only fires when off button is clicked)
  off() {
    Game.stopPlayingPattern(); //clear all the timeouts so pattern stops playing
    Game.endPlayerTurn(); //end the player's turn

    UI.strictLED.className = "led"; //turn off strictLED light
    Game.count = 0; //set count back to 0
    Game.playerPattern = []; //clear player pattern
    Game.gamePattern = []; //clear game pattern
    Game.currentIndex = -1; //reset index
  }
}

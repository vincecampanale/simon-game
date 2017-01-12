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
    Game.gamePattern.push(Game.generateRandomNumber());//generate a random number and load that number into the pattern
    console.log(Game.gamePattern);
    //play the pattern
  },
  incrementCount: function incrementCount() {
    Game.count++;
    UI.updateCountDisplay();
  },
  //allows user to click pads
  handlePlayerClick: function handlePlayerClick() {
    //add click event listeners to all the pads
    //record the number of the clicked pad (push it to playPattern)
    //if click is correct (if playerPattern[index] = currentPattern[index]),
      //play the sound
      //if playerPattern.length === currentPattern.length
        //incrementCount
        //add to pattern
        //play new Pattern
        // (unless new Pattern.length > 20 ==> in that case, reset the game and create "Congratulations! You win!"  window)
      //else wait for next click (handlePlayerClick again)
    //if click is incorrect,
      //play error sound
      //display "!!" in count
      //if strict mode, reset count to 01, reset game
      //else only reset user pattern
  },
  //takes in an array which is the pattern to play, plays corresponding pads/sounds,
  playPattern: function playPattern(arr) {
    //for each number in array
      //play the sound with the associated number
      //light up the pad with the associated number
      //(on an interval )
  },
  setInterval: function setInterval(patternLength) {
    //set interval in between each sound/light based on the length of the pattern array
  },
  //return a random integer between 1 and 4
  generateRandomNumber: function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 4) + 1; //pick integer between 1 and 4
    return randomNumber;
  },
  reset: function reset() {
    UI.strictLED.className = "led"; //turn off strictLED light

    Game.count = 0; //set count back to 0
    Game.playerPattern = []; //clear player pattern
    Game.gamePattern = []; //clear game pattern
    Game.currentIndex = -1;
  }
}

const Pad = {
  //play the pad sound
  playSound: function playSound(num) {
    const sound = document.querySelector(`audio[data-sound="${num}"]`);
    sound.play();
  },
  //light up the pad
  lightUp: function lightUp(num) {
    
  }
}


function removeTransition(e) {
  if(e.propertyName !== 'transform') return; //only pay attention to the end of an event with propertyName "transform"
  this.classList.remove('playing');
}


// Game Object:
//   Properties:
//     - power (values: on / off)
//     - count (starts at 01 - increment by 1 every time the user successfully inputs the pattern)
//     - current pattern (a random pattern of pad sounds - add a new sound on every time the user successfull inputs the pattern)
//   Methods:
//     - allow user to click
//     - record user pattern
//     - play current pattern
//     - check user pattern vs. current pattern
//     - start over (if user pattern does not match up with current pattern)
//     - add sound to pattern
//     - play error sound
//     - go to next turn (increment count, change count display, add sound to pattern, begin playing new pattern)

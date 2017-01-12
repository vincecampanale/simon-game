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
    Game.playPattern(Game.gamePattern);
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
  playPattern: function playPattern(padNumbers) {
    padNumbers.forEach(padNumber => Pad.play(padNumber));
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
  //play the pad (light it up and make the accompanying sound)
  play: function play(num) {
    const sound = document.querySelector(`audio[data-sound="${num}"]`);
    const pad = document.querySelector(`div[data-pad="${num}"]`);

    if (!sound || !pad) return; //if number is invalid, stop the function from running altogether

    pad.classList.add('playing'); //make the pad a little bigger and light up

    sound.currentTime = 0; //rewind sound to the start to be safe
    sound.play(); //play the sound

    Pad.revertToNormal(); //after the pad does it's thing, revert it back to normal
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

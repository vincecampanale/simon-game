const Game = {
  //Properties
  status: "off", //game starts out as off
  strictMode: false,
  count: 0, //initialize at 0
  currentPattern: [], //initialize to empty array
  playerPattern: [], //initialize to empty array
  start: function start() {
    //increment the count by 1
    //pick a random number between 1 and 4 for the first number
    //play the pattern
  },
  incrementCount: function incrementCount() {
    Game.count++;
    //display the count to the count display

  },
  //allows user to click pads
  handlePlayerClick: function handlePlayerClick() {
    //add click event listeners to all the pads
    //record the number of the clicked pad
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

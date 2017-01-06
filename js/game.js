const Game = {
  //Properties
  status: "off", //game starts out as off
  //allows user to click pads
  allowUserInput: function allowUserInput() {
    //add click event listeners to all the pads
    //record the number of the clicked pad
    //if click is correct, play the sound and wait for next click
    //if click is incorrect,
      //play error sound
      //if strict mode, reset count to 01, reset game
      //else reset user pattern
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

clickToPlaySound(1);
clickToPlaySound(2);
clickToPlaySound(3);
clickToPlaySound(4);


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

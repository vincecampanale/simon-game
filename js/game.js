const Game = {
  
}





function clickToPlaySound(num) {
  const pad = document.querySelector(`div[data-pad="${num}"]`);
  const sound = document.querySelector(`audio[data-sound="${num}"]`);
  pad.addEventListener("click", function() {
    sound.play();
  });
}

function playSoundAndLightPad(num) {
  const pad = document.querySelector(`div[data-pad="${num}"]`);
  const sound = document.querySelector(`audio[data-sound="${num}"]`);

  sound.play();
}

function removeTransition(e) {
  if(e.propertyName !== 'transform') return; //only pay attention to the end of an event with propertyName "transform"
  this.classList.remove('playing');
}

//playSoundAndLightPad(1);

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

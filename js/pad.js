const Pad = {
  //play the pad (light it up and make the accompanying sound)
  play(padNumber) {
    const sound = document.querySelector(`audio[data-sound="${padNumber}"]`);
    const pad = document.querySelector(`div[data-pad="${padNumber}"]`);

    if (!sound || !pad) return; //if number is invalid, stop the function from running altogether

    pad.classList.add('playing'); //make the pad a little bigger and light up

    sound.currentTime = 0; //rewind sound to the start to be safe
    sound.play(); //play the sound

    Pad.revertToNormal(); //after the pad does it's thing, revert it back to normal
  },
  wrongPad(padNumber) {
    const sound = document.querySelector(`audio[data-sound="err"]`); //get error sound from html
    const pad = document.querySelector(`div[data-pad="${padNumber}"]`); //get pad

    pad.classList.add('playing'); //light the pad up
    sound.play(); //play error sound

    UI.errorDisplay(); //display "!!" in count
    setTimeout(() => UI.updateCountDisplay(), 1000);
  },
  //revert the pad back to its normal size and color (remove the "playing" class)
  revertToNormal() {
    const pads = document.querySelectorAll('.pad');
    pads.forEach(pad => pad.addEventListener('transitionend', Pad.removeTransition));
  },
  //helper function to remove the transition from the pad. Used in 'revertToNormal' function
  removeTransition(e) {
    if(e.propertyName !== 'transform') return; //only pay attention to the end of an event with propertyName "transform"
    this.classList.remove('playing');
  }
}

function clickToPlaySound(padNumber, soundNumber) {
  const pad = document.querySelector(`div[data-pad="${padNumber}"]`);
  const sound = document.querySelector(`audio[data-sound="${soundNumber}"]`);
  pad.addEventListener("click", function() {
    sound.play();
  });
}

clickToPlaySound(1,1);
clickToPlaySound(2,2);
clickToPlaySound(3,3);
clickToPlaySound(4,4);

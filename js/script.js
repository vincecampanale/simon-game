var switchToggle = document.getElementsByClassName("switch");
switchToggle[0].addEventListener("click", function() {
  var switchBlock = document.getElementsByClassName("switch-block");
  var theSwitch = switchBlock[0];
  if(theSwitch.className === "switch-block toggled"){
    theSwitch.className = theSwitch.className.substring(0, 12);
  } else {
    theSwitch.className = "switch-block toggled";
  }
});

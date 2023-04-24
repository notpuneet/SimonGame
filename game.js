let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  console.log(randomNumber);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  //playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 500);
}
$(document).keypress(function () {
  if (started == false) {
    level = 0;
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("sucess");
    if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    var newAudio = new Audio("sounds/wrong.mp3");
    newAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 400);
    $("h1").text("Game over, Press any key to continue");
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

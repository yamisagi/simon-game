let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;


function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    $("." + chosenColor).fadeOut(100).fadeIn(100);
    level++;
    $("#level-title").text("Level " + level);
    return randomNumber;
}



const playSound = (name) => {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
$(document).keypress(function () {
    if (level === 0) {
        nextSequence();
    }

});

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    setTimeout(function () {
        nextSequence();
    }, 1000);
}
);


const animatePress = (currentColor) => {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {


}
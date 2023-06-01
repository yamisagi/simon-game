let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

$(document).keypress(function () {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

// Fix for mobile devices
// JQuery mobil cihazlarda çalışmıyor. Bu yüzden native JS ile çözüyoruz.
let body = document.querySelector("body");
body.addEventListener("touchstart", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
}
);


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }
            , 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();


    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


function nextSequence() {
    // Tekrar bu fonksiyonu çağırdığımızda, kullanıcının baştan başlaması için sıfırlıyoruz.
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random() * 4);
    let chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);

    $("." + chosenColor).fadeOut(100).fadeIn(100);
    level++;
    $("#level-title").text("Level " + level);
}


const animatePress = (currentColor) => {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}


const playSound = (name) => {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

console.log(gamePattern);
console.log(userClickedPattern);
// Description: This file contains the game logic of Simon Game.

/// gamePattern: Bu array, oyunun kendi oluşturduğu patterni tutar ve [randomNumber] içerisinde rastgele bir item seçilir.
let gamePattern = [];

// userClickedPattern: This array contains the pattern that the user generates by clicking the buttons.
let userClickedPattern = [];

// buttonColors: Bu array, butonların renklerini tutar. Bu renkler, HTML'de bulunan class isimleri ile aynıdır.
const buttonColors = ["red", "blue", "green", "yellow"];

// level: Bu değişken, oyunun kaçıncı levelde olduğunu tutar.
let level = 0;

// started: Bu değişken, oyunun başlayıp başlamadığını tutar.
let started = false;

// JQuery ile keypress event'i yakalıyoruz. Yani kullanıcı herhangi bir tuşa bastığında oyun başlayacak. 
$(document).keypress(function () {
    // Eğer oyun başlamadıysa, oyunu başlatıyoruz.
    if (!started) {
        // JQuery ile HTML'de bulunan level-title'ın textini değiştiriyoruz. Ve oyunu başlatıyoruz.
        $("#level-title").text("Level " + level);

        // nextSequence fonksiyonunu çağırıyoruz.
        nextSequence();

        // Oyunun başladığını belirtiyoruz. Bu sayede kullanıcı herhangi bir tuşa bastığında oyun tekrar başlamayacak.
        started = true;

        // Oyunun nasıl oynanacağını gösteren yazıyı gizliyoruz.
        $(".instructions").css("display", "none");
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
        $(".instructions").css("display", "none");
    }
});

// JQuery ile butonlara click event'i ekliyoruz. Butonlara tıklandığında, kullanıcının seçtiği rengi userClickedPattern array'ine ekliyoruz.
$(".btn").click(function () {
    // Kullanıcının seçtiği rengi alıyoruz.
    let userChosenColor = $(this).attr("id");

    // Kullanıcının seçtiği rengi playSound fonksiyonuna gönderiyoruz.
    playSound(userChosenColor);

    // Kullanıcının seçtiği rengi userClickedPattern array'ine ekliyoruz ki daha sonra bu array'i kontrol edebilelim.
    userClickedPattern.push(userChosenColor);

    // Kullanıcının seçtiği rengi animatePress fonksiyonuna gönderiyoruz.
    animatePress(userChosenColor);

    // Kullanıcının seçtiği rengi checkAnswer fonksiyonuna gönderiyoruz.
    // -1 dememizin sebebi, array'in indexlerinin 0'dan başlaması. Bu yüzden son indexi almak için -1 diyoruz.
    checkAnswer(userClickedPattern.length - 1);
}
);

// Kullanıcının seçtiği rengi kontrol ediyoruz. İçeriye gelen parametre, kullanıcının seçtiği rengin indexi.
function checkAnswer(currentLevel) {

    // Eğer kullanıcının seçtiği renk, oyunun oluşturduğu renk ile aynıysa, success yazdırıyoruz.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success"); // Debug için yazdırıyoruz.

        // Oyunun oluşturduğu renklerin sayısına eşitse, nextSequence fonksiyonunu çağırıyoruz.
        if (userClickedPattern.length === gamePattern.length) {
            // 1 saniye sonra nextSequence fonksiyonunu çağırıyoruz. Bu sayede kullanıcı, oyunun oluşturduğu patterni görebiliyor.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // Eğer kullanıcının seçtiği renk, oyunun oluşturduğu renk ile aynı değilse, wrong yazdırıyoruz. 
        // Debug için yazdırıyoruz.
        console.log("wrong");
       
        // Oyunun bittiğini gösterebilmemiz için CSS içinde game-over class'ı oluşturduk. Bu class'ı ekliyoruz.
        $("body").addClass("game-over");
        
        // Kısa bir süre sonra game-over class'ını kaldırıyoruz.  
        setTimeout(function () {
            $("body").removeClass("game-over");
        }
            , 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        // Oyunu baştan başlatıyoruz.
        startOver();


    }

}

// Oyunu baştan başlatıyoruz. Ve tüm değişkenleri sıfırlıyoruz.
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Oyunun oluşturduğu patterni tutan array'e, rastgele bir renk ekleyecek bir fonksiyon yazıyoruz.
function nextSequence() {
    // Tekrar bu fonksiyonu çağırdığımızda, kullanıcının izlediği patternin baştan başlaması için sıfırlıyoruz.
    userClickedPattern = [];

    // 0 ile 3 arasında bir sayı üretiyoruz. Bu sayı, buttonColors array'inin indexi olacak.
    let randomNumber = Math.floor(Math.random() * 4);

    // randomNumber değişkenini kullanarak, buttonColors array'inden rastgele bir renk seçiyoruz.
    let chosenColor = buttonColors[randomNumber];

    // chosenColor değişkenini gamePattern array'ine ekliyoruz. Ki takip edebilelim.
    gamePattern.push(chosenColor);

    // Kullanıcının seçilen buttonu daha iyi görebilmesi için o butona yanıp sönme efekti ekliyoruz.
    $("." + chosenColor).fadeOut(100).fadeIn(100);

    // Her seferinde level'i 1 arttırıyoruz.
    level++;

    // HTML'de bulunan level-title'ın textini değiştiriyoruz.
    $("#level-title").text("Level " + level);
}


// Kullanıcının yukarıda bastığı butonun yanıp sönmesi için bir fonksiyon yazıyoruz.
const animatePress = (currentColor) => {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

// Kullanıcının seçtiği rengi çalacak bir fonksiyon yazıyoruz.
const playSound = (name) => {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Debug için yazdırıyoruz.
console.log(gamePattern);
console.log(userClickedPattern);
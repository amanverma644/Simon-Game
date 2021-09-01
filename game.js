
var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});


//User Chosen Colour Pattern Funnction
$(".btn").click(function(e){
    // console.log(e.target.id);
    var userChosenColour=e.target.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    //for checking answer
    checkAnswer(userClickedPattern.length-1);

    playSound(userChosenColour);
    animatePress(userChosenColour);
});

//CheckAnswer Function
function checkAnswer(currentLevel){
    // console.log(currentLevel);
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        var sound="wrong";
        playSound(sound);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any Key to Restart");
        startOver();
    }

}


//GameOver function
function startOver(){
    gamePattern=[];
    level=0;
    started=false;
}

function nextSequence(){
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);   

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(randomChosenColour);

    // console.log($("#"+ randomChosenColour));
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

//Sound Fn
function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");   
    audio.play();
}

//Animate Button Fn
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}






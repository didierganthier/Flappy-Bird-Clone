//Based on Alex Tusinean Flappy Bird Clone

var $ = (id) => document.getElementById(id);

var gravity;
var advance;

var game_score = 0;

var gravityPoint = 0;

var alive = true;

const flySpeed = 9;

function fly(){
    if(alive == true){
        $('player').style.transition = "all 0.5s";
        $("player").style.top = $("player").offsetTop - window.innerHeight/10 - 2 + 'px';
        clearInterval(gravity);
        gravity = false;

        $("player").style.transform = "rotate(-20deg)";
        gravityPoint = 0;
        setTimeout(function(){
            if(gravity === false){
                gravity = setInterval(fall, 15);
                $("game").addEventListener("click", fly, {once : true});
                $("player").style.transition = "";
            }
        }, 500)
    }
}

function createPlayer_and_score(){
    //Player
    let player = document.createElement('div');
    player.id = 'player';
    $('game').appendChild(player);

    //Score
    let score = document.createElement('div');
    score.id = 'score';
    $('game').appendChild(score);
    $('score').innerText = `Score ${game_score}`

    //Tap to play
    let play = document.createElement('div');
    play.id = 'playText';
    $('game').appendChild(play);
    $('playText').innerText = 'Tap to Play';
}

function write_score(){
    $('score').innerText = `Score: ${++ game_score}`;
}

window.onload = function(){
    createPlayer_and_score();
}

function fall(){
    $('player').style.top = $('player').offsetTop + 1 + gravityPoint/9.81 + 'px';
    $('player').style.transform = 'rotate(15deg)';
    gravityPoint++;
    checkBorders_replay();
}

function checkBorders_replay(){
    if($('player').offsetTop < 0){
        $('game').removeEventListener('click', fly);
    }
    if($('player').offsetTop + $('player').offsetHeight > window.innerHeight){
        clearInterval(gravity);
        clearInterval(advance);
        $('game').removeEventListener('click', fly);
        replay_button();
    }
}

function replay_button(){
    $("playText").innerText = "Tap to Replay";
    $("playText").style.display = 'block';
    $('game').addEventListener('click', beginGame, {once : true})
}
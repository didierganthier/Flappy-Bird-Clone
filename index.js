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
    createClouds();
    createClouds('calc(180% + 12.5vmin');
    $('game').addEventListener('click', beginGame, {once : true});
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

function createClouds(x = '120%'){
    let topCloud = document.createElement('div');
    let bottomCloud = document.createElement('div');
    $('game').appendChild(topCloud);
    $('game').appendChild(bottomCloud);
    topCloud.classList = "topCloud";
    bottomCloud.classList = 'bottomCloud';
    topCloud.style.left = x;
    bottomCloud.style.left = x;
    let randTop = Math.floor(Math.random() * 70);
    topCloud.style.height = randTop + 'vh';
    bottomCloud.style.height = 100 - 30 - randTop + 'vh';
}

function goForward(){
    for(let i = 0; i < document.getElementsByClassName('topCloud').length; i++){
        document.getElementsByClassName('topCloud')[i].style.left = (document.getElementsByClassName('topCloud')[i].offsetLeft - 1) + 'px';
        document.getElementsByClassName('bottomCloud')[i].style.left = (document.getElementsByClassName('bottomCloud')[i].offsetLeft - 1) + 'px';
    }

    if(document.getElementsByClassName("topCloud")[0].offsetLeft < -document.getElementsByClassName('topCloud')[0].offsetWidth){
        document.getElementsByClassName("topCloud")[0].remove();
        document.getElementsByClassName("bottomCloud")[0].remove();
        createClouds();
        write_score();
    }
    checkForCollision();
}

function checkForCollision(){
    if($('player').offsetLeft + $('player').offsetWidth > document.getElementsByClassName('topCloud')[0].offsetLeft || $('player').offsetLeft > document.getElementsByClassName('topCloud')[0].offsetLeft){
        if(($('player').offsetTop < document.getElementsByClassName('topCloud')[0].offsetTop + document.getElementsByClassName('topCloud').offsetHeight) || ($('player').offsetTop + $('player').offsetHeight > document.getElementsByClassName("bottomCloud")[0].offsetTop)){
            $('game').removeEventListener('click', fly);
            clearInterval(advance);
            gravityPoint = 3;
            alive = false;
        }
    }
}

function beginGame(){
    alive = true;
    $('player').style.transform = "rotate(0deg)";
    $('player').style.top = 'calc(50% - 5vvmin)';

    document.getElementsByClassName('topCloud')[0].style.left = '120%';
    document.getElementsByClassName('topCloud')[1].style.left = 'clac(180% - 12.5vmin)';
    document.getElementsByClassName('bottomCloud')[0].style.left = '120%';
    document.getElementsByClassName('bottomCloud')[1].style.left = 'clac(180% - 12.5vmin)';
    game_score = 0;
    gravityPoint = 0;
    $('score').innerText = "Score: 0";
    setTimeout(function(){
        gravity = setInterval(fall, 15);
        advance = setInterval(goForward, flySpeed);
        $('game').addEventListener('click', fly, {once : true})
    }, 500)
}
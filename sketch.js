var bola;
var bancoDeDados, position;

function setup(){
    bancoDeDados = firebase.database();

    createCanvas(500,500);

    bola = createSprite(250,250,10,10);
    bola.shapeColor = "red";
    var positionBall = bancoDeDados.ref("ball/position");
    positionBall.on("value", readPosition, showError);
}

function draw(){
    background("white");

    if(keyDown(LEFT_ARROW)){
        alteraPosicao(-1,0);
    } else if(keyDown(RIGHT_ARROW)){
        alteraPosicao(1,0);
    } else if(keyDown(UP_ARROW)){
        alteraPosicao(0,-1);
    } else if(keyDown(DOWN_ARROW)){
        alteraPosicao(0,+1);
    }

    drawSprites();
}

function alteraPosicao(x,y){
    var positionBall = bancoDeDados.ref("ball/position");
    positionBall.set({
        "x": position.x + x,
        "y": position.y + y,
    });
}

function readPosition(info){
    position = info.val();
    bola.x = position.x;
    bola.y = position.y;
}

function showError(){
    console.log("Erro!!!-Aguarde um momento");
}

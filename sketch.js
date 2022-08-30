
var jogador,jogadorImg,pulo2;
var fundo,fundoImg;
var blue,blueImg;
var musica;
var chao;
var roxoImg,orangeImg;
var buracoImg;
var score;
var SEVER=0;
var PLAY=1;
var END =2;
var gameState = SEVER; //O GAMESTATE DEVE INICIAR COM UM DOS ESTADOS
var Morte1,Morte2,Morte3;
var Morte1Img,Morte2Img,Morte3Img;
var fimImg;
var fim1;
var morre;

function preload(){

fundoImg = loadImage("fundo5.png");
musica = loadSound("som.mp3");
blueImg = loadAnimation("blue1.png","blue2.png","blue3.png","blue4.png");
jogadorImg = loadAnimation("run1.png","run2.png","run3.png","run2.png");
pulo2 = loadAnimation("pulo.png");
roxoImg = loadImage("roxo.png");
orangeImg = loadAnimation("orange1.png","orange2.png","orange3.png","orange.png");
buracoImg = loadImage("buraco.png");
Morte1Img = loadImage("BlueMorte.png");
Morte2Img = loadImage("OrangeMorte.png");
Morte3Img = loadImage("PurpleMorte.png");
fimImg = loadImage("fim9.png");
morre = loadSound("morreu (2).mp3");
}

function setup() {
 createCanvas(700,300);

 fundo = createSprite(350,150,30,30);
 fundo.addImage("Img",fundoImg);
 fundo.scale = 1;
 fundo.velocityX = -10

 blue = createSprite(100,200);
 blue.addAnimation("blueImg",blueImg);
 blue.scale=0.25;
 blue.setCollider("circle",-80,100,240);
 blue.debug = false;

 jogador = createSprite(300,200);
 jogador.addAnimation("jogadorImg",jogadorImg);
 jogador.scale = 0.25
 jogador.debug = false;
 jogador.setCollider("circle",0,100,200);
 jogador.velocityY = 0.8;
 
 chao = createSprite(300,280,600,20);
 chao.visible = false;

 parede = createSprite(0,150,10,400);
 parede.visible = false;

 Morte1 = createSprite(350,150);
 Morte1.addImage("Morte1Img",Morte1Img);
 Morte1.visible = false;

 Morte2 = createSprite(350,150);
 Morte2.addImage("Morte2Img",Morte2Img);
 Morte2.visible = false;

 Morte3 = createSprite(350,150);
 Morte3.addImage("Morte3Img",Morte3Img);
 Morte3.visible = false;


 buracoGroup = createGroup();
 roxoGroup = createGroup();
 orangeGroup = createGroup();
 
 fim1 = createSprite(500,150);
 fim1.addImage("fimImg",fimImg);
 fim1.scale = 0.05;
 fim1.visible = false;
 score = 0;
 
}

function draw() {
 background("blue");
 
  //O CÓDIGO DEVER SER ORGANIZADO DE ACORDO COM OS ESTADOS
  if(gameState === SEVER)
  {
    text("Aperte a tecle D para começar.",350,150);
    if(keyDown("d")){
      gameState = PLAY;      
      musica.play();
      musica.setVolume(0.25);
    }
  }


  if(gameState === PLAY)
  {

    score = score + Math.round(getFrameRate()/60);

    jogador.velocityY = jogador.velocityY +0.8;
    blue.velocityX = blue.velocityX -0.8;

    
    if(keyDown("up") && jogador.y >= 160|| keyDown("space")&& jogador.y >= 190)
    {
      jogador.velocityY = -13;  
    }
    if(keyDown("down") || keyDown("s"))
    {
      jogador.velocityY = +20;  
    }

    if(blue.isTouching(jogador))
    {
      Morte1.visible = true;
      gameState = END;
      morre.play();
    }

    if(orangeGroup.isTouching(jogador))
    {

      Morte2.visible = true;
      gameState = END;
      morre.play();
    }
    if(buracoGroup.isTouching(jogador))
    {
    blue.velocityX = 9;
    parede.x +=4;
    }


    if(roxoGroup.isTouching(jogador))
    {
      Morte3.visible = true;
      gameState = END;
      morre.play();
    }

    roxo();
    buraco();
    laranja();

    //COLOQUEI PRA DESENHAS OS SPRITES SOMENTE DENTRO O END E PLAY
    drawSprites();
  }

  if(gameState === END)
  {
    orangeGroup.destroyEach();
    buracoGroup.destroyEach();
    roxoGroup.destroyEach();
    blue.visible = false
    jogador.visible = false;
    score = 0;
    fim1.visible = true;
    musica.stop();
    parede.x = 0;
    jogador.velocityY = 0;
    blue.velocityX = 0;
    blue.x = 100;

    //COLOQUEI PRA DESENHAS OS SPRITES SOMENTE DENTRO O END E PLAY
    drawSprites();
  }
       
  //ISSO ACONTECE NO JOGO TODO POR ISSO FORA DOS ESTADOS
  jogador.collide(chao);
  blue.collide(chao);
  blue.collide(parede);

  if(fundo.x <60)
  {
    fundo.x = 500;
  }
  text("Pontuação: "+ score, 500,50); 
       
  if(mousePressedOver(fim1) && gameState === END){
    musica.play();
    musica.setVolume(0.25);
    reset();
  }
}

function reset(){
  gameState = PLAY;
  Morte1.visible = false;
  Morte2.visible = false;
  Morte3.visible = false;
  fim1.visible = false;
  blue.visible = true;
  jogador.visible = true;
}

function roxo(){
 if(frameCount % 190 === 0){
  var  roxo = createSprite(800,230);
  roxo.addImage("roxoImg",roxoImg);
  roxo.velocityX = -10;
  roxo.scale = 0.25;

  var rand = Math.round(random(190,600));
  roxo.lifetime = 600;
  roxo.depth = jogador.depth;
  jogador.depth = jogador.depth +1

  roxo.depth = blue.depth;
  blue.depth = blue.depth +1

  roxoGroup.add(roxo);
 }
}
 
 function laranja(){
 if(frameCount % 400 === 0){
  var orange = createSprite(1000,230);
  orange.addAnimation("orangeImg",orangeImg);
  orange.setCollider("circle",0,80,200);
  orange.debug = false;
  orange.velocityX = -15
  orange.scale = 0.25;
  var ran = Math.round(random(400,600));
  orange.lifetime = 800; 
  orangeGroup.add(orange);

 }
 }

 function buraco(){
    if(frameCount % 100 === 0){
     var buraco = createSprite(1000,270);
     buraco.addAnimation("buracoImg",buracoImg);
     buraco.setCollider("circle",0,80,200);
     buraco.debug = false;
     buraco.velocityX = -10;
     buraco.scale = 0.08;
     var ra = Math.round(random(100,600));
     buraco.lifetime = 800; 
   
     buraco.depth = jogador.depth;
     jogador.depth = jogador.depth +1
   
     buraco.depth = blue.depth;
     blue.depth = blue.depth +1

     buracoGroup.add(buraco);

    }
    }

//Resolution du jeu
var resX = 320;
var resY = 240;

//Initialisation position
var posX = 0;

var posXexp_ = 205;
var posXnivobj = 210;

//Resolution de la HitBox
var orcX = 170;
var orcY = 185;

//Initialisation variables
var click = 0; //compteur de clic
var exp_ = 0; //expérience du joueur
var niveau = 1; //niveau du joueur
var nivobj = 10; //exp requis niveau supérieur
var organes = 0; //monnaie
var modarme = 0; //modificateur puissance de l'arme

//Initialisation de l'exponentiel de 10
var exponent = 0;

//Initialisation des var armes vides
var wos;
var wfourchette;
var wscie;
var whache;
var wtronco;
var wflingue;

//Initialisation des images du jeu
var prairieImage = new Image();
prairieImage.src = 'img/prairie.png';
var guiImage = new Image();
guiImage.src = 'img/gui.png';
var orcSprite1 = new Image();
orcSprite1.src = 'img/Orc1.png';
var orcSprite2 = new Image();
orcSprite2.src = 'img/Orc2.png';
var vietSprite = new Image();
vietSprite.src = 'img/viet_idle.png';
var osSprite = new Image();
osSprite.src = 'img/os.png';
var fourchetteSprite = new Image();
fourchetteSprite.src = 'img/fourchette.png';
var scieSprite = new Image();
scieSprite.src = 'img/scie.png';
var hacheSprite = new Image();
hacheSprite.src = 'img/hache.png';
var troncoSprite = new Image();
troncoSprite.src = 'img/tronco.gif';
var flingueSprite = new Image();
flingueSprite.src = 'img/flingue.png';

//Initialisation des sons en jeu
var sproutch = new Audio('sound/sproutch.wav');
var buy = new Audio('sound/buy.wav');

var requestAnimId;

//Valeurs Animation de l'Orc
var array = [orcSprite1, orcSprite2]; //tableau comportant les deux frames de l'anim
var currentimage = 0; //frame en cours d'affichage
var tick = 0; //compteur de durée pour une frame
var tickperimage = 10; //durée maximale du compteur


// Armes
var arme = function (wprix, wsprite, wpuissance){
  this.present = function() {
    if (organes >= wprix) {
    };
  };
  this.acheter = function() {
    if (organes >= wprix) {
      organes -= wprix;
      wpuissance == modarme;
      play(buy);
    };
  };
};



//Mode achat
function changeImage(imagesrc, imageout) {
    if (imagesrc.match(imageout)) {
        imagesrc = "imagesrc";
    } else {
        image.src = "imageout";
    }
}


//Clic Orc
function play(sound){
    sound.play();
    sound.currentTime = 0;
};


//Fonction des HitBox + incrément des organes
function OrcClick(e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;
         //Zone achat os
    if (mouseX > 908 && mouseX < 908 + 38 && mouseY > 172 && mouseY < 172 + 95){
      console.log('lapin');
      wos.acheter();
    };
        //Zone achat fourchette
    if (mouseX > 1025 && mouseX < 1025 + 110 && mouseY > 165 && mouseY < 165 + 100){
      wfourchette.acheter();
    };
        //Zone achat scie
    if (mouseX > 1200 && mouseX < 1200 + 100 && mouseY > 168 && mouseY < 168 + 116){
      wscie.acheter();
    };
        //Zone achat hache
    if (mouseX > 865 && mouseX < 865 + 105 && mouseY > 326 && mouseY < 326 + 100){
      whache.acheter();
    };
        //Zone achat tronco
    if (mouseX > 1050 && mouseX < 1050 + 100 && mouseY > 319 && mouseY < 319 + 105){
      wtronco.acheter();
    };
        //Zone achat flingue
    if (mouseX > 1200 && mouseX < 1200 + 100 && mouseY > 320 && mouseY < 320 + 100){
      wflingue.acheter();
    };
    //HibBox grâce à la position de la souris.
    if (mouseX > 450 && mouseX < 450 + 200 && mouseY > 270 && mouseY < 270 + 210){
    click ++; // ajoute +1 à chaque clic sur l'orc
    organes += (niveau + modarme); // augmente la monnaie du joueur

    
    if (click % 2 == 0){
      // ajoute +1 à exp_ tous les 2 clics
      exp_ ++;
    };
    
    play(sproutch); // joue le son sproutch

    if (exp_ == nivobj) { 
    // quand le joueur à l'expérience requise pour passer au niveau suivant:
      niveau ++; // ajoute +1 au niveau
      nivobj *= 2; // double l'expérience requise pour passer le prochain niveau
    };
  };
};



//////////////////CANVAS//////////////////

var effacer_canvas = function () {
  "use strict";
  prairieCanvasContext.clearRect( 0, 0 , resX, resY);
  guiCanvasContext.clearRect( 0, 0 , resX, resY);
  orcCanvasContext.clearRect( 0, 0 , resX, resY);
  textCanvasContext.clearRect( 0, 0 , resX, resY);
  vietCanvasContext.clearRect( 0, 0 , resX, resY);
  //lapinCanvasContext.clearRect( 0, 0, orcX, orcY);
};

var creerCanvasContext = function (name, width, height, zindex, color) {
  "use strict";
  var canvas = window.document.createElement("canvas");
  canvas.id = name;
  canvas.style.position = "absolute";
  canvas.style.left = "18%";
          if ( color !== undefined ){
                canvas.style.background = color;
        }
  canvas.style.zIndex = zindex;
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas.getContext('2d');
};

var init = function () {
  prairieCanvasContext = creerCanvasContext("prairie", resX, resY, 1);
  guiCanvasContext = creerCanvasContext("gui", resX, resY, 2);
  orcCanvasContext = creerCanvasContext("orcanim", resX, resY, 3);

  vietCanvasContext = creerCanvasContext("viet", resX, resY, 2);
  osCanvasContext = creerCanvasContext("os", resX, resY, 2);
  fourchetteCanvasContext = creerCanvasContext("fourchette", resX, resY, 2);
  scieCanvasContext = creerCanvasContext("scie", resX, resY, 2);
  hacheCanvasContext = creerCanvasContext("hache", resX, resY, 2);
  troncoCanvasContext = creerCanvasContext("tronco", resX, resY, 2);
  flingueCanvasContext = creerCanvasContext("flingue", resX, resY, 2);
  //Affiche le texte
  textCanvasContext = creerCanvasContext("text", resX, resY, 2);

  wos = arme(20, osSprite, 2);
  wfourchette = arme(75, fourchetteSprite, 4);
  wscie = arme(200, scieSprite, 10);
  whache = arme(500, hacheSprite, 30);
  wtronco = arme(1000, troncoSprite, 75);
  wflingue = arme(10000, flingueSprite, 200);

  requestAnimId = window.requestAnimationFrame(main);
};
var main = function() {
  effacer_canvas();
  //Configure le texte
  textCanvasContext.font = "15px Ubuntu";
  textCanvasContext.fillStyle = "#9bbc0f";

  //Première ligne
  var textX = 5;
  var textY = 190;
  textCanvasContext.fillText("Organes : " + organes + "",textX, textY);
  textX += 50;

  //Deuxième Ligne
  textY += 20;
  textX = 5;
  textCanvasContext.fillText("Niveau : " + niveau + "",textX, textY);

  //Troisième ligne
  textY += 20;
  textX = 5;
  textCanvasContext.fillText("Exp : " + exp_ + "/" + nivobj + "", textX, textY);

  guiCanvasContext.drawImage(guiImage, 0, 0);
  prairieCanvasContext.drawImage(prairieImage, posX, 0);
  orcCanvasContext.drawImage(array[currentimage], 50, 80, 64, 64);
  vietCanvasContext.drawImage(vietSprite, 227, 8);
  osCanvasContext.drawImage(osSprite, 180, 50);
  fourchetteCanvasContext.drawImage(fourchetteSprite, 225, 50);
  scieCanvasContext.drawImage(scieSprite, 275, 50);
  hacheCanvasContext.drawImage(hacheSprite, 175, 95);
  troncoCanvasContext.drawImage(troncoSprite, 230, 95);
  flingueCanvasContext.drawImage(flingueSprite, 275, 95);

  var ork = document.getElementById("orcanim");
  ork.addEventListener('click', OrcClick, false);


  posX -=0.666;
  if (posX <= -312) {
    posX = 0;
  };  

  posX -=1;
  if (posX == -312) {
    posX = 0;
  };
  prairieCanvasContext.clearRect( 0, 0 , resX, resY);
  prairieCanvasContext.drawImage(prairieImage, posX, 0);

  requestAnimId = window.requestAnimationFrame(orcanim);
  requestAnimId = window.requestAnimationFrame(main);

};

var orcanim = function () {
  tick += 1;

  if (tick >= tickperimage) {
    tick = 0;
    if (currentimage == 1) {
      currentimage = 0;
    } else {
      currentimage = 1;
    }
  };
  orcCanvasContext.clearRect( 0, 0 , resX, resY);
  orcCanvasContext.drawImage(array[currentimage], 50, 80);

};

window.onload = init;
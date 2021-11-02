const downloadbtn = document.querySelector("#download");
const clearbtn = document.querySelector("#clear");
const colorpicker = document.querySelector("#colpick");

let r,g,b;

function hideButtons() {
  downloadbtn.style.opacity = "0";
  clearbtn.style.opacity = "0";
}

function showButtons() {
  downloadbtn.style.opacity = "1";
  clearbtn.style.opacity = "1";
}

function setup() {
  let c = createCanvas(window.innerWidth, window.innerHeight-80);
  c.style('margin','0 auto');
  background(0);
  noStroke();
  //Initializng color
  r = 102;
  g = 78;
  b = 174;
  translate(width/2,height/2);
  displayInstructions();
}

function displayInstructions() {
  fill(random(0,255),random(0,255),random(0,255));
  textStyle(BOLD);
  textSize(60);
  let chars = ['रं', 'गो', 'ली'];
  let x = -100;
  text(chars[0], x, -220, 200, 100);
  fill(random(0,255),random(0,255),random(0,255));
  text(chars[1], x+50, -220, 200, 100);
  fill(random(0,255),random(0,255),random(0,255));
  text(chars[2], x+120, -220, 200, 100);
  textStyle(NORMAL);
  fill(255);
  textSize(32);
  text("CLICK ME to design your Rangoli", -200, -90, 510, 100);
  textSize(16);
  text("You can pick colors from top right icon, and can get random colors from the icon next to it. ", -200, 0 , 510, 100);
  text("And, can simply drag your mouse or swipe your finger - to make your custom rangoli design !!", -200, 60 , 510, 100);
  textSize(16);
}

let diameter = 5;
let untouched = true;

function isMouseInCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function draw() {
  translate(width/2,height/2);
  fill(r,g,b);
  if(mouseIsPressed && isMouseInCanvas()) {
    if(untouched) {
      background(0);
      showButtons();
    }
    untouched = false;
    let x = map(mouseX, 0, width, -width/2, width/2);
    let y = map(mouseY, 0, height, -height/2, height/2);
    ellipse(x,y, diameter,diameter);
    ellipse(-x,y, diameter,diameter);
    ellipse(x,-y, diameter,diameter);
    ellipse(-x,-y, diameter,diameter);
    ellipse(y,x, diameter,diameter);
    ellipse(-y,x, diameter,diameter);
    ellipse(y,-x, diameter,diameter);
    ellipse(-y,-x, diameter,diameter);
  }
}

let getRandomColors = false;

function mouseReleased() {
  if(getRandomColors && isMouseInCanvas()) {
    randomizeColor();
  }
}

function randomizeColor() {
  r = parseInt(random(50, 255));
  g = parseInt(random(50, 255));
  b = parseInt(random(50, 255));
  colorpicker.value = rgbToHex(r,g,b);
}

function clearCanvas() {
  window.navigator.vibrate(200);
  background(0);
  untouched = true;
}

function changeColor(picker) {
  getRandomColors = false;
  function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
  function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
  function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
  function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
  const hexColor = picker.value;
  r = hexToR(hexColor);
  g = hexToG(hexColor);
  b = hexToB(hexColor);
}

function doRandomColors() {
  window.navigator.vibrate(100);
  getRandomColors = true;
  randomizeColor();
}

function rgbToHex(r,g,b) {
  var toHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };

  var red = toHex(r);
  var green = toHex(g);
  var blue = toHex(b);
  return '#'+red+green+blue;
}


hideButtons(); 
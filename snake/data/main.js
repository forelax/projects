var image=document.createElement("img");
image.src="data/bcg.jpg";
var c = document.getElementById("canvas"),
ctx=c.getContext("2d");
var scene="welcomeScreen";
var interval;
var fps=10;
var mouseX;
var mouseY;
var buttons=[];
var bacgroundColor="#252621";
var snake1;
var snake2;
var scale=20;
var fieldWidth;
var fieldHeight;
var fruits=[];
var debuging=false;
function startGame(){
	setup();
}
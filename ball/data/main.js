var c,ctx,fps=30,score,lives,rpbx=360,rpby=270,rpbw=150,rpbh=40,mx=-Infinity,my=Infinity,mp,b=[],eb=[],mp0,mp1,pl=[],plw=4,plh=50,plc=3,bsc=5,bsp=10,floatingText=[],bbpl=[];

function setup(){
	b=[];eb=[];pl=[];bbpl=[];
	floatingText=[];
	score=0;lives=5;
	levelx();
}
function startGame(){
	c=document.getElementById("gameCanvas");
	ctx=c.getContext("2d");
	c.style.cursor="none";
	setup();
	var interval=setInterval(play,1000/fps);
}
function play(){
	background();
	drawCursorButton(c.width/3-32,0,1.5);
	drawMouse();
	drawPlatforms();
	bbplU();
	drawBalls();
	displayFloatingTexts();
	hearts();
	pauseF();
	scoreF();
}

var c,ctx,interval,
db1=83,ub1=87,lb1=65,rb1=68,
db2=40,ub2=38,lb2=37,rb2=39,bk=32,
pColor="black",inputHandler=-1,framerate=1000/40,
buttons,mouseX,mouseY,mouseDown=false,main_map,brush,
unitSize,xoff,yoff,mapW,mapH,brushSize=0,qB=81,eB=69;
var main_background=new Image();
main_background.src="thee.jpg";
var map,scale,colors=["blue","saddlebrown","grey","forestgreen","red","cyan","sandybrown"];

function start(){
	c=document.getElementById("canvas");
	ctx=c.getContext("2d");
	/*ctx.translate(+50,+50);
	ctx.scale(1/1.3,1/1.3);*/
	action_Main();
}
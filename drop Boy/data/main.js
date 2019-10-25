var c,ctx,interval,p,triangles=[],scene=1,buttons=[],mouseX,mouseY;
/*scene 0:welcomeScreen 1:playingALevel*/
function setup(){
	c=document.getElementById("c");
	ctx=c.getContext("2d");
	c.style="border:2px solid black;";
	c.width=720;
	c.height=480;
	p=new Player();
	level1();
	interval=setInterval(play,35);
}
function play(){
	ctx.clearRect(0,0,c.width,c.height)
	p.update();
	p.display();
	if(scene==0){
		ctx.fill
	}else if(scene==1){
		for(var i = 0 ; i < triangles.length ; i ++){
			if(isCircleIntersectingTriangle(new Circle(p.x,p.y,p.scale),triangles[i]))
				console.log("LOOOOOOOOST");
		}
		for(var i = 0 ; i < triangles.length ; i ++){
			triangles[i].update();
			triangles[i].display();
		}
	}
}
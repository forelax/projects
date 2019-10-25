var c = document.getElementById("canvas"),
	ctx=c.getContext("2d");
var tank1,tank2,bullets,playFieldSize=5*c.width/12,interval,
buttons=[],mouseX,mouseY,numToSpawn=5,hasHealth=true;
function setupGameMode(mode){
	if(mode=="normal"){
		tank1=new tank(c.width/6,c.height/2,0,"red",0,playFieldSize,1);
		tank2=new tank(5*c.width/6,c.height/2,Math.PI,"green",c.width-playFieldSize,c.width,2);
		bullets=[];
		buttons=[];
		counter=200;
		spawn(numToSpawn);
		if(!hasHealth){
			tank1.health=1;
			tank2.health=1;
		}
		interval=setInterval(play,100/6);
	}else if(mode=="wait"){
		colorField();
		tank1=new tank(c.width/6,c.height/2,0,"red",0,playFieldSize,1);
		tank2=new tank(5*c.width/6,c.height/2,Math.PI,"green",c.width-playFieldSize,c.width,2);
		tank1.display();
		tank2.display();
		buttons.push(new button(1,c.width/2,140,200,50,"normal","Play"));
		buttons.push(new button(1,c.width/2,200,200,50,"toggleB","bullets ON"));
		buttons.push(new button(1,c.width/2,260,200,50,"toggleH","health ON"));
		for (var i = buttons.length - 1; i >= 0; i--) {
			buttons[i].mouseOver();
		}
	}
}
function play(){
	ctx.clearRect(0,0,c.width,c.height);
	colorField();
	bulletsTick();
	if(hasHealth)
		tanksHealthDisplay();
	if(tank1.health>0){
		tank1.display();
		tank1.update();
	}
	if(tank2.health>0){
		tank2.display();
		tank2.update();
	}
	endGame();
}
function endGame(){
	if(tank1.health==0||tank2.health==0)
		counter--;
	ctx.font="72px Arial";
	ctx.fillStyle="black";
	if(counter==0){
		if(tank1.health==0&&tank2.health==0){
			ctx.fillText("draw",c.width/2,c.height/2);
		}else if(tank1.health==0){
			ctx.fillText("tank2 wins",c.width/2,c.height/2);
		}else if(tank2.health==0){
			ctx.fillText("tank1 wins",c.width/2,c.height/2);
		}
		clearInterval(interval);
		buttons.push(new button(1,c.width/2,40,200,50,"normal","Replay"));
		buttons.push(new button(1,c.width/2,100,200,50,"toggleB","bullets ON"));
		buttons.push(new button(1,c.width/2,160,200,50,"toggleH","health ON"));
		for (var i = buttons.length - 1; i >= 0; i--) {
			buttons[i].mouseOver();
		}
	}
}
function tanksHealthDisplay(){
	ctx.fillStyle="green";
	ctx.fillRect(5,5,150*tank1.health/100,15);
	ctx.fillStyle="red";
	ctx.fillRect(c.width-155,5,150*tank2.health/100,15);
	ctx.lineWidth=2;
	ctx.beginPath();
	ctx.rect(5,5,150,15);
	ctx.rect(c.width-155,5,150,15);
	ctx.stroke();
	ctx.lineWidth=1;
}
function bulletsTick(){
	for (var i = bullets.length - 1; i >= 0; i--) {
		bullets[i].update();
		if(bullets[i].lifeSpan<=0){
			if(bullets[i].owner==1){
				tank1.shots++;
			}else if(bullets[i].owner==2){
				tank2.shots++;
			}
			bullets.splice(i,1);
		}else
			bullets[i].display();
	}
}
function inBounds(num,minv,maxv){
	return num>=minv&&num<maxv;
}
function colorField(){
	ctx.globalAlpha=0.7;
	ctx.fillStyle="red";
	ctx.fillRect(0,0,playFieldSize,c.height);
	ctx.fillStyle="green";
	ctx.fillRect(c.width,0,-playFieldSize,c.height);
	ctx.globalAlpha=1;
}
document.addEventListener('keydown',function(event){
	var v=event.keyCode;
	if(v==87){
		tank1.upKey=true;
	}else if(v==38){
		tank2.upKey=true;
	}else if(v==65){
		tank1.leftKey=true;
	}else if(v==37){
		tank2.leftKey=true;
	}else if(v==83){
		tank1.downKey=true;
	}else if(v==40){
		tank2.downKey=true;
	}else if(v==68){
		tank1.rightKey=true;
	}else if(v==39){
		tank2.rightKey=true;
	}else if(v==71){
		tank1.shootKey=true;
	}else if(v==13){
		tank2.shootKey=true;
	}
},true);
document.addEventListener('keyup',function(event){
	var v=event.keyCode;
	if(v==87){
		tank1.upKey=false;
	}else if(v==38){
		tank2.upKey=false;
	}else if(v==65){
		tank1.leftKey=false;
	}else if(v==37){
		tank2.leftKey=false;
	}else if(v==83){
		tank1.downKey=false;
	}else if(v==40){
		tank2.downKey=false;
	}else if(v==68){
		tank1.rightKey=false;
	}else if(v==39){
		tank2.rightKey=false;
	}
},true);
document.addEventListener('mousemove',function(event){
	mouseX=event.pageX-$("canvas").offset().left;
	mouseY=event.pageY-$("canvas").offset().top;
	for (var i = buttons.length - 1; i >= 0; i--) {
		buttons[i].mouseOver(mouseX,mouseY,false);
		if(buttons.length==0)
			break;
	}
},true);
document.addEventListener('mousedown',function(event){
	mouseX=event.pageX-$("canvas").offset().left;
	mouseY=event.pageY-$("canvas").offset().top;
	for (var i = buttons.length - 1; i >= 0; i--) {
		buttons[i].mouseOver(mouseX,mouseY,true);
		if(buttons.length==0)
			break;
	}
},true);
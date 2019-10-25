var rx,ry;
var prT=0;
var gameOver=false;
var canvas = document.createElement("canvas");
var context;
var canChange=true;
var psize;

var tailPeacex=[],tailPeacey=[];

var snake = {
	x:0,
	y:0,
	tailLen:0,
	scale:20,
	dir:"null",
	canChange:true
};
var fruit = {
	x:null,
	y:null
};

function setup(){
	snake.x=(Math.floor((canvas.width/snake.scale)/2)*snake.scale);
	snake.y=(Math.floor((canvas.height/snake.scale)/2)*snake.scale);
	snake.tailLen=0;
	fruit.x=Math.floor(Math.random()*(canvas.width/snake.scale))*snake.scale;
	fruit.y=Math.floor(Math.random()*(canvas.height/snake.scale))*snake.scale;
	psize=Math.round(snake.scale/10);
	fsize=Math.round(snake.scale/5);
	tailPeacex=[];
	tailPeacey=[];
}


function startGame(){
	canvas.width = (Math.floor(680/snake.scale))*snake.scale;
	canvas.height = (Math.floor(560/snake.scale))*snake.scale;
	context=canvas.getContext("2d");
	document.body.insertBefore (canvas ,document.body.childNodes[0]);
	setup();
	var interval = setInterval(play,100);
}

function update(){

	if(!gameOver){
		tailPeacex.splice(0,0,tailPeacex.splice(snake.tailLen-1,1));
		tailPeacey.splice(0,0,tailPeacey.splice(snake.tailLen-1,1));
		tailPeacex[0]=snake.x;
		tailPeacey[0]=snake.y;
		
		if(snake.dir=="right"){
			if(snake.x<canvas.width-snake.scale)
				snake.x+=snake.scale;
			else
				snake.x=0;
		}else if(snake.dir=="left"){
			if(snake.x>0)
				snake.x-=snake.scale;
			else
				snake.x=canvas.width-snake.scale;
		}else if(snake.dir=="up"){
			if(snake.y>0)
				snake.y-=snake.scale;
			else
				snake.y=canvas.height-snake.scale;
		}else if(snake.dir=="down"){
			if(snake.y<canvas.height-snake.scale)
				snake.y+=snake.scale;
			else
				snake.y=0;
		}
		snake.canChange=true;
		for(var i = 0 ; i < snake.tailLen ; i ++){
			if(tailPeacex[i]==snake.x&&tailPeacey[i]==snake.y){
				context.lineWidth= 3;
				context.strokeStyle="red";
				context.beginPath();
				context.moveTo(snake.x,snake.y);
				context.lineTo(snake.x+snake.scale,snake.y+snake.scale);
				context.moveTo(snake.x,snake.y+snake.scale);
				context.lineTo(snake.x+snake.scale,snake.y);
				context.stroke();
				setup();
				gameOver=true;
				break;
			}
		}
		
		
		if(snake.x==fruit.x&&snake.y==fruit.y){
			snake.tailLen++;
			tailPeacex.push(tailPeacex[snake.tailLen-1]+(tailPeacex[snake.tailLen-1]-tailPeacex[snake.tailLen-2]));
			tailPeacey.push(tailPeacey[snake.tailLen-1]+(tailPeacey[snake.tailLen-1]-tailPeacey[snake.tailLen-2]));
			fruit.x=Math.floor(Math.random()*(canvas.width/snake.scale))*snake.scale;
			fruit.y=Math.floor(Math.random()*(canvas.height/snake.scale))*snake.scale;
			for(var i = 0 ; i < snake.tailLen ; i ++){
				if(tailPeacex[i]==fruit.x&&tailPeacey[i]==fruit.y){
					fruit.x=Math.floor(Math.random()*(canvas.width/snake.scale))*snake.scale;
					fruit.y=Math.floor(Math.random()*(canvas.height/snake.scale))*snake.scale;
					i=0;
				}
			}
		}
		
	}
}

function draw(){
	if(!gameOver){
		context.clearRect(0,0,canvas.width,canvas.height);
		context.fillStyle = "black";
		context.fillRect(snake.x,snake.y,snake.scale,snake.scale);
		
		for(var i = 0 ; i < snake.tailLen ; i ++){
			context.fillRect(tailPeacex[i]+psize,tailPeacey[i]+psize,snake.scale-2*psize,snake.scale-2*psize);
			if(i!=0){
				if(tailPeacex[i]>tailPeacex[i-1]){
					if(Math.abs(tailPeacex[i]-tailPeacex[i-1])==snake.scale)
						context.fillRect(tailPeacex[i]-psize,tailPeacey[i]+psize,2*psize,snake.scale-2*psize);
					else{
						context.fillRect(tailPeacex[i]+snake.scale-psize,tailPeacey[i]+psize,2*psize,snake.scale-2*psize);
						context.fillRect(tailPeacex[i-1]-psize,tailPeacey[i-1]+psize,2*psize,snake.scale-2*psize);
					}
				}else if(tailPeacex[i]<tailPeacex[i-1]){
					if(Math.abs(tailPeacex[i]-tailPeacex[i-1])==snake.scale)
						context.fillRect(tailPeacex[i]+snake.scale-psize,tailPeacey[i]+psize,2*psize,snake.scale-2*psize);
					else{
						context.fillRect(tailPeacex[i]-psize,tailPeacey[i]+psize,2*psize,snake.scale-2*psize);
						context.fillRect(tailPeacex[i-1]+snake.scale-psize,tailPeacey[i-1]+psize,2*psize,snake.scale-2*psize);
					}
				}else if(tailPeacey[i]>tailPeacey[i-1]){
					if(Math.abs(tailPeacey[i]-tailPeacey[i-1])==snake.scale)
						context.fillRect(tailPeacex[i]+psize,tailPeacey[i]-psize,snake.scale-2*psize,2*psize);
					else{
						context.fillRect(tailPeacex[i]+psize,tailPeacey[i]+snake.scale-psize,snake.scale-2*psize,2*psize);
						context.fillRect(tailPeacex[i-1]+psize,tailPeacey[i-1]-psize,snake.scale-2*psize,2*psize);
					}
				}else if(tailPeacey[i]<tailPeacey[i-1]){
					if(Math.abs(tailPeacey[i]-tailPeacey[i-1])==snake.scale)
						context.fillRect(tailPeacex[i]+psize,tailPeacey[i]+snake.scale-psize,snake.scale-2*psize,2*psize);
					else{
						context.fillRect(tailPeacex[i]+psize,tailPeacey[i]-psize,snake.scale-2*psize,2*psize);
						context.fillRect(tailPeacex[i-1]+psize,tailPeacey[i-1]+snake.scale-psize,snake.scale-2*psize,2*psize);
					}
				}
			}
		}
		
		context.fillStyle = "red";
		context.fillRect(fruit.x+fsize,fruit.y+fsize,snake.scale-2*fsize,snake.scale-2*fsize);
		
		context.font = "32px Ariel";
		context.fillText ("Score: "+snake.tailLen,0 , canvas.height -1)
	}
	else{
		context.fillStyle= "#A52D13";
		context.font="32px Ariel";
		if(prT==0)
			context.fillText ("Press any button 3 times to replay",canvas.width/4-23,canvas.height/2+40);
		else if (prT==1)
			context.fillText ("2",canvas.width/4+190,canvas.height/2+64);
		else
			context.fillText ("1",canvas.width/4+190,canvas.height/2+88);
		context.fillStyle= "red";
		context.font="64px Ariel";
		context.fillText ("GAME OVER",canvas.width/4,canvas.height/2);
	}
}

function play(){
	update();
	draw();
}

document.addEventListener('keydown', function(event) {
	if(snake.canChange){
		if ((event.keyCode == 38||event.keyCode==87)&&snake.dir!="down") {
			snake.dir="up";
		}else if ((event.keyCode == 39||event.keyCode==68)&&snake.dir!="left") {
			snake.dir="right";
		}else if((event.keyCode==37||event.keyCode==65)&&snake.dir!="right"){
			snake.dir="left";
		}else if((event.keyCode==40||event.keyCode==83)&&snake.dir!="up"){
			snake.dir="down";
		}
		snake.canChange=false;
	}
	if(gameOver){
		prT++;
		if(prT==3){
			gameOver=false;
			prT=0;
		}
	}
}, true);

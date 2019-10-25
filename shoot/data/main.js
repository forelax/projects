var c = document.createElement("canvas");
var ctx;
var x,y;
var p;
var num;
var highScore=0;

var interval;

var bullets =new Array();
var enemies =new Array();
var bonuses =new Array();
var boosts  =new Array();

function setup(){
	p = new player();
	bullets =new Array();
	enemies =new Array();
	bonuses =new Array();
	boosts  =new Array();
}

function startGame(){
	c.width = 720;
	c.height = 480;
	ctx=c.getContext("2d");
	document.body.insertBefore (c,document.body.childNodes[0]);
	setup();
	interval = setInterval(play,60);
}


function update(){
	p.update();
	num=Math.random()*100;
	if(num>97&&p.health>0){
		enemies.push(new enemy(Math.floor(Math.random()*10)+1,  Math.floor(Math.random()*4)+3,  (Math.floor(Math.random()*3)+2)*5) );
		p.score++;
		if(p.score>highScore)
			highScore=p.score;
	}
	if(num>98.5&&p.health>0){
		bonuses.push(new bonus(Math.floor(Math.random()*5)+5, (Math.floor(Math.random()*6)+4)*5) );
	}
	for(var i = bullets.length-1 ; i >= 0 ; i --){
		if(p.bDP>0){
			for(var j = enemies.length-1 ; j >=0 ; j --){
				if(bullets[i].hitsl>0){
					if(checkFor(  	bullets[i].x,  						bullets[i].y,  
									bullets[i].x+bullets[i].xvel,	    bullets[i].y+bullets[i].yvel,
								    enemies[j].x,					    enemies[j].y-enemies[j].scale,
								    enemies[j].x+enemies[j].scale, 	  	enemies[j].y+enemies[j].scale) 	)
					{
						enemies[j].health-=bullets[i].damage;
						if(enemies[j].health<=0){
							enemies.splice(j,1);
							p.score++;
							if(p.score>highScore)
								highScore=p.score;
						}
						bullets[i].hitsl--;
					}
				}
			}
		}
		for(var j = bonuses.length-1 ; j >= 0 ; j --){
			if(bullets[i].hitsl>0){
				if(checkFor(   	bullets[i].x,                    	bullets[i].y,
								bullets[i].x+bullets[i].xvel,	    bullets[i].y+bullets[i].yvel,
								bonuses[j].x,						bonuses[j].y,
								bonuses[j].x+bonuses[j].scale,		bonuses[j].y+15)
				)
				{
					bonuses[j].health-=bullets[i].damage+5;
					if(bonuses[j].health<=0){
						boosts.push(new boost(bonuses[j].x+bonuses[j].scale/2,bonuses[j].y,bonuses[j].maxHealth));
						bonuses.splice(j,1);
					}
					bullets[i].hitsl--;
				}
			}
		}
		if(bullets[i].hitsl<=0||bullets[i].x<0||bullets[i].x>c.width||bullets[i].y<0||bullets[i].y>c.height)
			bullets.splice(i,1);
		else
			bullets[i].update();
	}
	if(p.health>0){
		for(var i = enemies.length-1 ; i >=0 ; i --){
			enemies[i].update();
		}
		for(var i = bonuses.length-1 ; i >=0 ; i --){
			bonuses[i].update();
		}
	}
	for(var i = boosts.length-1 ; i >=0 ; i --){
		boosts[i].update();
		if(boosts[i].checkIntersection()){
			boosts[i].applyEffect();
			boosts.splice(i,1);
		};
	}
}

function draw(){
	ctx.clearRect(0,0,c.width,c.height);
	displayButtons();
	p.ef1w=-1;
	p.ef2w=-1;
	p.ef3w=-1;
	for(var i = p.effects.length-1 ; i >= 0; i --){
		p.effects[i].draw();
	}
	p.drawStats();
	p.draw();
	for(var i = 0 ; i < boosts.length ; i ++){
		boosts[i].draw();
	}
	for(var i = 0 ; i < bullets.length ; i ++){
		bullets[i].draw();
	}
	for(var i = 0 ; i < bonuses.length ; i ++){
		bonuses[i].draw();
		if(bonuses[i].health<bonuses[i].maxHealth)
			bonuses[i].drawStats();
	}
	for(var i = 0 ; i < enemies.length ; i ++){
		enemies[i].draw();
		if(enemies[i].health<enemies[i].maxHealth)
			enemies[i].drawStats();
	}
	if(p.health<=0){
		ctx.fillStyle="#AAAAAA";
		ctx.fillRect(5,100,100,35);
		ctx.fillStyle="black";
		ctx.font="25px Ariel";
		ctx.fillText("Replay",5+15,100+25);
	}
}

function play(){
	update();
	draw();
}





c.addEventListener("mousemove", function(event){
	x=event.pageX-$("canvas").offset().left;
	y=event.pageY-$("canvas").offset().top;
	event.preventDefault();
}, true);

c.addEventListener('mousedown', function(event){
	x=event.pageX-$("canvas").offset().left;
	y=event.pageY-$("canvas").offset().top;
	if(p.health<=0&&p.mp==false&&x>=5&&x<=105&&y>=100&&y<=135){
		if(p.score>highScore)
			highScore=p.score;
		setup();
	}
	p.mp=true;
	event.preventDefault();
}, true);

c.addEventListener('mouseup', function(event){
	p.mp=false;
	event.preventDefault();
}, true);

document.addEventListener('keydown', function(event){
	if(event.keyCode==38||event.keyCode==87){ //up
		p.uk=true;
	}
	else if(event.keyCode==40||event.keyCode==83){  //down
		p.dk=true;
	}
	else if(event.keyCode==37||event.keyCode==65){ //left
		p.lk=true;
	}
	else if(event.keyCode==39||event.keyCode==68){ //right
		p.rk=true;
	}else if(p.health>0&&event.keyCode==80){
		if(!p.pk){
			if(interval){
				clearInterval(interval);
				ctx.font="80px Ariel";
				ctx.fillText("PAUSED",200,250);
				interval=0;
			}else{
				interval = setInterval(play,60);
			}
		}
		p.pk=true;
	}
}, true);

document.addEventListener('keyup', function(event)
{
	if(event.keyCode==38||event.keyCode==87){      //up
		p.uk=false;
	}
	else if(event.keyCode==40||event.keyCode==83){ //down
		p.dk=false;
	}
	else if(event.keyCode==37||event.keyCode==65){ //left
		p.lk=false;
	}
	else if(event.keyCode==39||event.keyCode==68){  //right
		p.rk=false;
	}else if(p.health>0&&event.keyCode==80){
		if(p.pk)
			p.pk=false;
	}
}, true);
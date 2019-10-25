var c,ctx,p,interval,ps=[],time;
function start(){
	c=document.getElementById("canvas");
	ctx=c.getContext("2d");
	time=0;
	p=new Player(c.width/2,c.height/2,false,"red",50,10);
	var p1=new Player(Math.floor(Math.random()*c.width),Math.floor(Math.random()*c.height),true,"blue",15,13);
	var p2=new Player(Math.floor(Math.random()*c.width),Math.floor(Math.random()*c.height),true,"yellow",30,5);
	var p3=new Player(Math.floor(Math.random()*c.width),Math.floor(Math.random()*c.height),true,"pink",20,10);
	var p4=new Player(Math.floor(Math.random()*c.width),Math.floor(Math.random()*c.height),true,"cyan",10,15);
	var p5=new Player(Math.floor(Math.random()*c.width),Math.floor(Math.random()*c.height),true,"white",15,18);
	ps.push(p1);ps.push(p2);ps.push(p3);ps.push(p4);ps.push(p5);
	for(var i = 0 ; i < ps.length ; i++){
		if(Math.random()>0.5){
			ps[i].leftKey=true;
		}else{
			ps[i].rightKey=true;
		}
		if(Math.random()>0.5){
			ps[i].downKey=true;
		}else{
			ps[i].upKey=true;
		}
	}
	addEventListeners();
	interval=setInterval(play,1000/30);
}
function play(){
	if(p.health>0){
		time++;
		ctx.fillStyle="#272727";
		ctx.globalAlpha=0.7;
		ctx.fillRect(0,0,c.width,c.height);
		ctx.globalAlpha=1;
		p.update();
		p.display();
		for(var i = 0 ; i < ps.length ; i ++){
			ps[i].update();
			ps[i].display();
		}
		ctx.fillStyle="green";
		ctx.fillRect(0,0,200*(p.health/p.maxHealth),15);
		ctx.font="20px Ariel";
		ctx.textAlign="left";
		ctx.textBaseline="middle";
		ctx.fillText("SCORE: "+time,0,50);
	}else{
		ctx.font="40px Ariel";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.fillText("SCORE: "+time,c.width/2,c.height/2);
	}
}


function Player(x,y,isbot,color,scale,vel){
	this.x=x;
	this.y=y;
	this.bot=isbot;
	this.leftKey=false;
	this.rightKey=false;
	this.downKey=false;
	this.upKey=false;
	this.color=color;
	this.scale=scale;
	this.vel=vel;
	this.maxHealth=this.health=this.scale*this.scale;
	this.update=function(){
		if(this.leftKey){
			this.x-=this.vel;
			if(this.x<0){
				if(this.bot){
					this.x*=-1;
					this.leftKey=false;
					this.rightKey=true;
				}else{
					this.x=0;
				}
			}
		}
		if(this.rightKey){
			this.x+=this.vel;
			if(this.x+this.scale>c.width){
				if(this.bot){
					this.x=2*(c.width-this.scale-1)-this.x;
					this.leftKey=true;
					this.rightKey=false;
				}else{
					this.x=c.width-this.scale-1;
				}
			}
		}
		if(this.downKey){
			this.y+=this.vel;
			if(this.y+this.scale>c.height){
				if(this.bot){
					this.y=2*(c.height-this.scale-1)-this.y;
					this.upKey=true;
					this.downKey=false;
				}else{
					this.y=c.height-this.scale-1;
				}
			}
		}
		if(this.upKey){
			this.y-=this.vel;
			if(this.y<0){
				if(this.bot){
					this.y*=-1;
					this.upKey=false;
					this.downKey=true;
				}else{
					this.y=0;
				}
			}
		}
		if(!this.bot){
			for(var i = 0 ; i < ps.length ; i ++){
				var area=intersection(ps[i].x,ps[i].scale,this.x,this.scale)*intersection(ps[i].y,ps[i].scale,this.y,this.scale);
				this.health-=area;
			}
		}
	}
	this.display=function(){
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x,this.y,this.scale,this.scale);
	}
}
function intersection(a,b,c,d){
	if(c<a){
		var tmp=a;
		a=c;
		c=tmp;
		tmp=b;
		b=d;
		d=tmp;
	}
	if(a+b>c){
		if(c+d<=a+b){
			return d;
		}else {
			return a+b-c;
		}
	}else{
		return 0;
	}
}
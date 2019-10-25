function effect(t,time){
	this.t=t;
	this.y=7*(t-1)+5;
	this.duration=time;
	this.update=function(){
		this.duration--;
	}
	this.draw=function(){
		if(this.t==1){
			p.ef1w+=2;
			p.efw=p.ef1w;
			ctx.strokeStyle="orange";
		}else if(this.t==2){
			p.ef2w+=2;
			p.efw=p.ef2w;
			ctx.strokeStyle="red";
		}else if(this.t==3){
			p.ef3w+=2;
			p.efw=p.ef3w;
			ctx.strokeStyle="blue";
		}
		ctx.beginPath();
		ctx.lineWidth=p.efw;
		ctx.moveTo(500,this.y)
		ctx.lineTo(500+this.duration,this.y);
		ctx.stroke();
		ctx.strokeStyle="black";
	}
}

function player(){
	this.maxHealth=20;
	this.ef1w=-1;
	this.ef2w=-1;
	this.ef3w=-1;
	this.efw=0;
	this.health=this.maxHealth;
	this.scale=15;
	this.score=0;
	this.x=c.width/2;
	this.y=c.height-this.scale;
	this.uk=false;
	this.dk=false;
	this.lk=false;
	this.rk=false;
	this.pk=false;
	this.mp=false;
	this.xspeed=0;
	this.yspeed=0;
	this.maxJumps=2;
	this.jumps=this.maxJumps;
	this.gravity=5;
	this.bDP=0;
	this.rt=5;
	this.r=0;
	this.attacking=false;
	this.effects =new Array();
	this.draw=function(){
		ctx.fillStyle="#FF0000";
		ctx.fillRect(this.x,this.y,this.scale,this.scale);
		
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.arc(this.x+this.scale/2,this.y-this.scale/2,this.scale/2,0,2*Math.PI);
		ctx.fillStyle="black";
		ctx.fill();
		ctx.stroke();
	};
	this.move=function(){
		if(this.y==c.height-this.scale){
			this.jumps=this.maxJumps;
		}
		if(this.uk){
			if(this.yspeed>=0&&this.jumps>0){
				this.yspeed=-2*p.scale;
				this.jumps--;
			}
		}
		if(this.dk){
			this.yspeed=3*p.scale;
		}
		if(this.lk){
			this.xspeed=-p.scale;
		}
		if(this.rk){
			this.xspeed=p.scale;
		}
		if(this.xspeed>0){
			if(this.x+this.xspeed<c.width-this.scale){
				this.x+=this.xspeed;
			}else{
				this.x=c.width-this.scale;
				this.xspeed=0;
			}
		}
		if(this.xspeed<0){
			if(this.x+this.xspeed>0){
				this.x+=this.xspeed;
			}else{
				this.x=0;
				this.xspeed=0;
			}
		}
		if(this.yspeed>0){
			if(this.y+this.yspeed<c.height-this.scale){
				this.y+=this.yspeed;
			}else{
				this.y=c.height-this.scale;
				this.yspeed=0;
			}
		}
		if(this.yspeed<0){
			if(this.y+this.yspeed>2*this.scale){
				this.y+=this.yspeed;
			}else{
				this.y=this.scale;
				this.yspeed=0;
			}
		}
		if(!this.lk&&!this.rk){
			if(this.xspeed<0){
				if(this.xspeed+5<0)
					this.xspeed+=5;
				else
					this.xspeed=0;
			}else if(this.xspeed>0){
				if(this.xspeed-5>0)
					this.xspeed-=5;
				else
					this.xspeed=0;
			}
		}
	};
	
	this.applyGravity=function(){
		if(this.y<c.height-this.scale){
			if(this.yspeed<2*p.scale){
				this.yspeed+=this.gravity;
			}/*else{
				this.yspeed=2*p.scale;
			}*/
		}
		if(p.yspeed!=0){
			p.yspeed+=-p.yspeed/Math.abs(p.yspeed);
		}
		if(p.xspeed!=0){
			p.xspeed+=-p.xspeed/Math.abs(p.xspeed);
		}
	};
	
	this.spawnBullet=function(){
		if(this.mp){
			if(this.r<=0){
				bullets.push(new bullet(p.x+p.scale/2,p.y,x,y,1,p.bDP));
				if(this.rt<=0)
					bullets.push(new bullet(p.x+p.scale/2-bullets[bullets.length-1].xvel/2,p.y-bullets[bullets.length-1].yvel/2,x,y,1,p.bDP));
				this.r+=max(this.rt,-this.r);
			}
		}
		if(this.r>0)
			this.r-=1;
	}
	
	this.drawStats=function(){			
		ctx.fillStyle="black";
		ctx.font="20px Ariel";
		ctx.fillText("Reload",200,15);
		ctx.fillText("Health",1,15);
		if(p.health>0)
			ctx.fillText("Score: "+this.score,400,15);
		else{
			ctx.font="80px Ariel";
                        ctx.fillStyle="#6a6a6a"; 
			ctx.fillText("Score: "+this.score,150,230);
		}
		if(p.health>0)
			ctx.fillText("HighScore: "+highScore,400,45);
		else{
			ctx.font="80px Ariel";
                        ctx.fillStyle="#6a6a6a";
			ctx.fillText("High Score: "+highScore,150,310);
		}
		
		ctx.fillStyle="#FF0000";
		ctx.fillRect(275,5,100-100*(this.r/max(this.rt,0)),10);
		
		ctx.fillStyle="#00FF00";
		ctx.fillRect(75,5,100/(this.maxHealth/this.health),10);
		
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.rect(73,3,104,14);
		ctx.stroke();
		
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.rect(273,3,104,14);
		ctx.stroke();
	}
	
	this.update=function(){
		this.spawnBullet();
		this.move();
		this.applyGravity();
		for(var i = this.effects.length-1 ; i >= 0 ; i -- ){
			this.effects[i].update();
			if(this.effects[i].duration<=0){
				if(this.effects[i].t==1){
					p.maxJumps--;
				}else if(this.effects[i].t==2){
					p.bDP-=5;
				}else if(this.effects[i].t==3){
					p.rt+=2;
				}
				this.effects.splice(i,1);
			}
		}
	};
}
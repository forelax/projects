function boost(x,y,bj){
	this.x=x;
	this.t=Math.random();
	if(this.t<0.4)
		this.t=0;
	else if(this.t<0.6)
		this.t=4;
	else if(this.t<0.73)
		this.t=1;
	else if(this.t<0.86)
		this.t=2;
	else
		this.t=3;
	this.y=y;
	this.tch;
	if(this.t==0)
		this.tch="P";
	else if(this.t==1)
		this.tch="J";
	else if(this.t==2)
		this.tch="D";
	else if(this.t==3)
		this.tch="R";
	else if(this.t==4)
		this.tch="H";
	this.move=function(){
		this.y+=((c.height-200)-this.y)/10;
	}

	this.checkIntersection=function(){
		if(p.x+p.scale>=this.x&&p.x<=this.x+15&&p.y+p.scale>=this.y&&p.y-p.scale<=this.y+15){
			return true;
		}else{
			return false;
		}
	}

	this.applyEffect=function(){
		if(this.t==0){
			p.score+=5;
			if(p.score>highScore)
				highScore=p.score;
		}else if(this.t==4){
			p.health+=5;
			if(p.health>p.maxHealth)
				p.health=p.maxHealth;
		}else if(this.t==1){
			p.maxJumps++;
			p.jumps++;
			p.effects.push(new effect(this.t,200));
		}else if(this.t==2){
			p.bDP+=5;
			p.effects.push(new effect(this.t,200));
		}else if(this.t==3){
			p.rt-=2;
			p.effects.push(new effect(this.t,200));
		}
	}

	this.draw=function(){
		if(this.t==0)
			ctx.fillStyle="black";
		else if(this.t==1)
			ctx.fillStyle="orange";
		else if(this.t==2)
			ctx.fillStyle="red";
		else if(this.t==3)
			ctx.fillStyle="blue";
		else if(this.t==4)
			ctx.fillStyle="green";
		ctx.beginPath();
		ctx.fillRect(this.x,this.y,15,15);
		ctx.stroke();
			ctx.fillStyle="white";

		ctx.font="15px Ariel";
		ctx.fillText(this.tch,this.x+3,this.y+13);
	}
	this.update=function(){
		this.move();
	}
}
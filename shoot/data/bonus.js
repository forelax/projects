function bonus(s,h){
	this.scale=100;
	this.x=(Math.floor(Math.random()*2))*(c.width+this.scale)-this.scale;
	this.y=50+Math.floor(Math.random()*30);
	this.dir=1;
	this.speed=s;
	this.maxHealth=h;
	this.health=h;
	this.move=function(){
		this.x+=this.speed*this.dir;
		if(this.x+this.scale>c.width&&this.dir==1){
			this.dir*=-1;
		}else if(this.x<0&&this.dir==-1){
			this.dir*=-1;
		}
	}


	this.drawStats=function(){
		if(p.health>0)
			ctx.fillStyle="#00FF00";
		else
			ctx.fillStyle="#AAAAAA";	
		ctx.fillRect(this.x,this.y-7,(this.scale)/(this.maxHealth/this.health),3);

		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.rect(this.x-1,this.y-9,(this.scale)+1,5);
		ctx.stroke();
	}


	this.draw=function(){
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.rect(this.x,this.y,this.scale,15);
		if(p.health>0)
			ctx.fillStyle="#777777";
		else
			ctx.fillStyle="#DDDDDD";	
		ctx.fill();
		ctx.stroke();
	}
	this.update=function(){
		this.move();
	}
}
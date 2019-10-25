function enemy(s,d,h){
	this.scale=p.scale;
	this.x=(Math.floor(Math.random()*2))*(c.width+this.scale)-this.scale;
	this.y=c.height-this.scale;
	this.speed=s;
	this.damage=d;
	this.maxHealth=h;
	this.health=h;
	this.aS=10;				//attackSpeed
	this.aC=this.aS;		//attackCooldoln
	this.move=function(){
		if(this.x>p.x){
			if(this.x-this.speed>p.x)
				this.x-=this.speed;
			else 
				this.x=p.x;
		}
		else if(this.x<p.x){
			if(this.x+this.speed<p.x)
				this.x+=this.speed;
			else
				this.x=p.x;
		}
	}
	this.attack=function(){
		if(p.health>0&&this.aC<=0){
			if(this.x>p.x-p.scale&&this.x<p.x+p.scale&&this.y>p.y-p.scale*2&&this.y<p.y+p.scale){
				p.health-=this.damage;
				if(p.health<0)
					p.health=0;
				this.aC+=this.aS;
			}
		}
		if(this.aC>0)
			this.aC--;
	}


	this.drawStats=function(){
		if(p.health>0)
			ctx.fillStyle="#00FF00";
		else
			ctx.fillStyle="#AAAAAA";	
		ctx.fillRect(this.x-this.scale/3,this.y-this.scale-7,(this.scale+2*this.scale/3)/(this.maxHealth/this.health),3);

		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.rect(this.x-this.scale/3-1,this.y-this.scale-8,(this.scale+2*this.scale/3+2),5);
		ctx.stroke();
	}

	this.draw=function(){
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.rect(this.x,this.y,this.scale,this.scale);
		if(p.health>0)
			ctx.fillStyle="#00FF00";
		else
			ctx.fillStyle="#AAAAAA";	
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth=2;
		ctx.arc(this.x+this.scale/2,this.y-this.scale/2,this.scale/2,0,2*Math.PI);
		ctx.stroke();
	}
	this.update=function(){
		this.move();
		this.attack();
	}
}
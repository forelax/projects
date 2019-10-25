function bullet(x1,y1,x2,y2,or,dam){
	this.x=x1;
	this.y=y1;
	this.c=Math.sqrt( (x-this.x)*(x-this.x)+(y-this.y)*(y-this.y) );
	this.speed=50;
	this.xvel=(x-this.x)*(this.speed/this.c);
	this.yvel=(y-this.y)*(this.speed/this.c);
	this.damage=dam;
	this.origin=or;
	this.hitsl=1;
	this.update=function(){
		this.x+=this.xvel;
		this.y+=this.yvel;
	};
	this.draw=function(){
		if(this.origin==1)
			ctx.fillStyle="red";
		else
			ctx.fillStyle="green";
		ctx.beginPath();
		ctx.lineWidth=3;
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x+this.xvel/6,this.y+this.yvel/6);
		ctx.stroke();
	};
}
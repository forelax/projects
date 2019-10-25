function Player(xval,yval){
	this.x=xval;
	this.y=yval;
	this.r=10;
	this.xAcc=0;
	this.yAcc=0;
	this.xVel=0;
	this.yVel=0;
	this.speed=0.05;
	this.uk=false;
	this.dk=false;
	this.lk=false;
	this.rk=false;
	this.bk=false;
	this.inventory=[];
	this.viewRangeVertical=10;
	this.viewRangeHorizontal=15;
	this.viewInventory=false;
	this.handleInput=function(){
		this.yAcc=0;this.xAcc=0;
		if(this.uk)
			this.yAcc=-this.speed;
		if(this.dk)
			this.yAcc= this.speed;
		if(this.lk)
			this.xAcc=-this.speed;
		if(this.rk)
			this.xAcc= this.speed;
		if(Math.abs(this.xAcc)&&Math.abs(this.yAcc)){
			this.xAcc/=Math.sqrt(2);
			this.yAcc/=Math.sqrt(2);
		}
		if(this.bk){
			this.xVel/=3;
			this.yVel/=3;
		}
	}
	this.update=function(){
		this.handleInput();
		this.yVel+=(-this.yVel+this.yAcc)/10;
		this.xVel+=(-this.xVel+this.xAcc)/10;
		this.x+=this.xVel;
		this.y+=this.yVel;
		if(this.x-this.r/scale<0)this.x=this.r/scale;
		if(this.y-this.r/scale<0)this.y=this.r/scale;
		if(this.x+this.r/scale>mapW)this.x=mapW-this.r/scale;
		if(this.y+this.r/scale>mapH)this.y=mapH-this.r/scale;
	}
	this.display=function(){
		ctx.beginPath()
//		console.log(Math.max(0,this.y+this.viewRangeVertical/2-mapH)*scale,Math.max(0,this.viewRangeVertical/2-this.y)*scale);
		ctx.arc(c.width/2+Math.max(0,this.x+this.viewRangeHorizontal/2-mapW)*scale-Math.max(0,this.viewRangeHorizontal/2-this.x)*scale,c.height/2+Math.max(0,this.y+this.viewRangeVertical/2-mapH)*scale-Math.max(0,this.viewRangeVertical/2-this.y)*scale,this.r,0,2*Math.PI);
		ctx.fillStyle=pColor;
		ctx.stroke();
		ctx.fill();
	}
}
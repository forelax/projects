function Triangle(x1,y1,x2,y2,x3,y3){
	this.point1=new Point(x1,y1);
	this.point2=new Point(x2,y2);
	this.point3=new Point(x3,y3);
	this.speed=2;
	this.update=function(){
		this.point1.y+=this.speed;
		this.point2.y+=this.speed;
		this.point3.y+=this.speed;
	}
	this.display=function(){
		ctx.beginPath();
		ctx.moveTo(this.point1.x,this.point1.y);
		ctx.lineTo(this.point2.x,this.point2.y);
		ctx.lineTo(this.point3.x,this.point3.y);
		ctx.lineTo(this.point1.x,this.point1.y);
		ctx.stroke();
		ctx.fill();
	}
}
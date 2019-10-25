function Button(x,y,text,wPar,hPar,color,textColor,overColor,overTextColor,onclick){
	this.x=x;
	this.y=y;
	this.text=text;
	this.width=wPar;
	this.height=hPar;
	this.color=color;
	this.textColor=textColor;
	this.overColor=overColor;
	this.overTextColor=overTextColor;
	this.onclick=onclick;
	this.over=false;
	this.display=function(){
		ctx.beginPath();
		if(this.over)
			ctx.fillStyle=this.overColor;
		else
			ctx.fillStyle=this.color;
		ctx.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
		ctx.font = (this.height/1.2)+'px serif';
		ctx.textAlign="center"; 
		ctx.textBaseline="middle"; 
		if(this.over)
			ctx.fillStyle=this.overTextColor;
		else
			ctx.fillStyle=this.textColor;
		ctx.fillText(this.text, this.x, this.y, this.width);
	}
	this.contaiment=function(pointX,pointY){
		if(pointX>=this.x-this.width/2&&pointX<this.x+this.width/2){
			if(pointY>=this.y-this.height/2&&pointY<this.y+this.height/2){
				return true;
			}
		}
		return false;
	}
}
function button(centered,x,y,bwidth,bheight,func,txt){
	this.x=x-centered*(bwidth/2);
	this.y=y-centered*(bheight/2);
	this.width=bwidth;
	this.height=bheight;
	this.exec=func;
	this.txt=txt;
	this.mouseOver=function(mxp,myp,clicking){
		if(inBounds(mxp,this.x,this.x+this.width)&&
		   inBounds(myp,this.y,this.y+this.height)){
			if(clicking){
				if(func=="toggleB"){
					if(!numToSpawn){
						numToSpawn=5;
						this.txt="bullets ON";
					}else{
						numToSpawn=0;
						this.txt="bullets OFF";
					}
				}else if(func=="toggleH"){
					if(!hasHealth){
						hasHealth=true;
						this.txt="health ON";
					}else{
						hasHealth=false;
						this.txt="health OFF";
					}
				}else{
					setupGameMode(func);
				}
			}
			ctx.fillStyle="grey";
			this.display();
		}else{
			ctx.fillStyle="white";
			this.display();
		}
	}
	this.display=function(){
		ctx.beginPath();
		ctx.rect(this.x,this.y,this.width,this.height);
		ctx.fill();
		ctx.stroke();
		ctx.textBaseline="middle"; 
		ctx.font="30px Calibri";
		ctx.textAlign="center";
		ctx.fillStyle="black";
		ctx.fillText(this.txt,this.x+centered*(bwidth/2),this.y+centered*(bheight/2));
	}
}
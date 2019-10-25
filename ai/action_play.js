function action_Play(){
	inputHandler=-1;
	f=mapData;
	mapH=f.length;
	mapW=f[0].length;
	p=new Player(27,87);
	scale=c.width/p.viewRangeHorizontal;
	p.r=scale*(Math.sqrt(2)-1)*0.95/2;
	/*this.displayType1=function(i,j,xpos,ypos){
		ctx.beginPath();
		ctx.fillStyle=colors[f[i][j]];
		ctx.fillRect(xpos-0.5,ypos-0.5,scale+1,scale+1);
	}*/
	this.rect=function(color,xpos,ypos,sideW,sideH){
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.fillRect(xpos,ypos,sideW,sideH);
	}
	this.invCircle=function(color,xpos,ypos,invRadius){
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.arc(xpos-invRadius,ypos-invRadius,invRadius,0,(1/2)*Math.PI);
		ctx.arc(xpos-invRadius,ypos+invRadius,invRadius,(3/2)*Math.PI,0);
		ctx.arc(xpos+invRadius,ypos+invRadius,invRadius,(2/2)*Math.PI,(3/2)*Math.PI);
		ctx.arc(xpos+invRadius,ypos-invRadius,invRadius,(1/2)*Math.PI,(2/2)*Math.PI);
		ctx.fill();
	}
	this.displayType2=function(i,j,xpos,ypos){
		if(i==0){
			if(j==0){
				this.rect(colors[f[i][j]],xpos-0.5,ypos-0.5,scale/2+1,scale/2+1);
			}else{
				this.rect(colors[f[i][j-1]],xpos-0.5-scale/2,ypos-0.5,scale/2+1,scale/2+1);
				this.rect(colors[f[i][j]],xpos-0.5,ypos-0.5,scale/2+1,scale/2+1);
				if(j==mapW-1){
					this.rect(colors[f[i][j]],xpos-0.5+scale/2,ypos-0.5,scale/2+1,scale/2+1);
				}
			}
		}else{
			if(j==0){
				this.rect(colors[f[i-1][j]],xpos-0.5,ypos-0.5-scale/2,scale/2+1,scale/2+1);
				this.rect(colors[f[i][j]],xpos-0.5,ypos-0.5,scale/2+1,scale/2+1);
				if(i==mapH-1){
					this.rect(colors[f[i][j]],xpos-0.5,ypos-0.5+scale/2,scale/2+1,scale/2+1);
				}
			}else{
				this.rect(colors[f[i][j]],xpos-0.5,ypos-0.5,scale/2+1,scale/2+1);
				this.rect(colors[f[i][j-1]],xpos-0.5-scale/2,ypos-0.5,scale/2+1,scale/2+1);
				this.rect(colors[f[i-1][j]],xpos-0.5,ypos-0.5-scale/2,scale/2+1,scale/2+1);
				this.rect(colors[f[i-1][j-1]],xpos-0.5-scale/2,ypos-0.5-scale/2,scale/2+1,scale/2+1);
				if(f[i-1][j-1]==f[i][j]){
					if(f[i-1][j]==f[i][j-1]){
						if((i+j)%2){
							this.invCircle(colors[f[i][j]],xpos,ypos,scale/2);
						}else{
							this.invCircle(colors[f[i-1][j]],xpos,ypos,scale/2);
						}
					}else{
						this.invCircle(colors[f[i][j]],xpos,ypos,scale/2);
					}
				}else{
					if(f[i-1][j]==f[i][j-1]){
						this.invCircle(colors[f[i-1][j]],xpos,ypos,scale/2);
					}
				}
				if(j==mapW-1){
					this.rect(colors[f[i-1][j]],xpos-0.5+scale/2,ypos-0.5-scale/2,scale/2+1,scale/2+1);
					this.rect(colors[f[i][j]],xpos-0.5+scale/2,ypos-0.5,scale/2+1,scale/2+1);
				}
				if(i==mapH-1){
					this.rect(colors[f[i][j-1]],xpos-0.5-scale/2,ypos-0.5+scale/2,scale/2+1,scale/2+1);
					this.rect(colors[f[i][j]],xpos-0.5,ypos-0.5+scale/2,scale/2+1,scale/2+1);
				}
				if(i==mapH-1&&j==mapW-1){
					this.rect(colors[f[i][j]],xpos-0.5+scale/2,ypos-0.5+scale/2,scale/2+1,scale/2+1);
				}
			}
		}
		/*ctx.beginPath();
		ctx.rect(xpos,ypos,scale,scale);
		ctx.stroke();*/
	}
	this.intervalFunction=function(){
		ctx.clearRect(0,0,c.width,c.height);
		p.update();
		var uy=Math.min(mapH-1-p.viewRangeVertical,Math.max(0,Math.floor(p.y-p.viewRangeVertical/2)));
		var puy=Math.min(mapH-1-p.viewRangeVertical,Math.max(0,p.y-p.viewRangeVertical/2));
		var lx=Math.min(mapW-1-p.viewRangeHorizontal,Math.max(0,Math.floor(p.x-p.viewRangeHorizontal/2)));
		var plx=Math.min(mapW-1-p.viewRangeHorizontal,Math.max(0,p.x-p.viewRangeHorizontal/2));
		console.log(uy,lx,(uy-puy)*scale,(lx-plx)*scale,);
		for(var i = uy ; i <= uy+p.viewRangeVertical+1 && i<mapH ; i ++){
			for(var j = lx ; j <= lx+p.viewRangeHorizontal+1 && j<mapW ; j ++){
				var xpos=(j-plx)*scale;
				var ypos=(i-puy)*scale;
				/*displayType1(i,j,xpos,ypos);*/
				displayType2(i,j,xpos,ypos);
			}
		}
		for(var i = uy ; i <= uy+p.viewRangeVertical+1 && i<mapH ; i ++){
			for(var j = lx ; j <= lx+p.viewRangeHorizontal+1 && j<mapW ; j ++){
				var xpos=(j-plx)*scale;
				var ypos=(i-puy)*scale;
				ctx.beginPath();
				ctx.rect(xpos,ypos,scale,scale);
				ctx.stroke();
			}
		}
		p.display();
		/*console.log(p.x,p.y);*/
		/*ctx.beginPath();
		ctx.rect(0,0,c.width,c.height);
		ctx.stroke();*/
	}
	/*this.inF2=function(){
		ctx.fillStyle="red";
		var size=30,xp=c.width/2,yp=c.width/2;
		ctx.beginPath();
		ctx.moveTo(xp+size,yp);
		ctx.lineTo(xp+size,yp-size);
		ctx.lineTo(xp,yp-size);
		ctx.lineTo(xp,yp-size);
		ctx.arc(xp-size,yp-size,size,0,1/2*Math.PI);
		ctx.lineTo(xp-size,yp+size);
		ctx.lineTo(xp,yp+size);
		ctx.arc(xp+size,yp+size,size,Math.PI,3/2*Math.PI);
		ctx.fill();
	}*/
	inputHandler=2;
	interval=setInterval(this.intervalFunction,framerate);
}
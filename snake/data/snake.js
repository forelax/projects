function tailPeace(x,y){
	this.x=x;
	this.y=y;
};
function Snake(x,y){
	this.x=x;
	this.y=y;
	this.leftIndex=0;
	this.rightIndex=0;
	this.score=0;
	this.direction=0;/*{0=+x,1=+y,2=-x,3=-y}*/
	this.tailPeaces=[];
	for(var i = 0 ; i <= fieldWidth*fieldHeight ; i ++){
		this.tailPeaces.push(new tailPeace());
	}
	this.canChange=true;
	this.update=function(){
		this.tailPeaces[this.rightIndex].x=this.x;
		this.tailPeaces[this.rightIndex].y=this.y;
		this.rightIndex++;
		this.rightIndex%=this.tailPeaces.length;
		if(this.direction==0){
			this.x++;
			this.x+=fieldWidth;
			this.x%=fieldWidth;
		}else if(this.direction==1){
			this.y++;
			this.y+=fieldHeight;
			this.y%=fieldHeight;
		}else if(this.direction==2){
			this.x--;
			this.x+=fieldWidth;
			this.x%=fieldWidth;
		}else if(this.direction==3){
			this.y--;
			this.y+=fieldHeight;
			this.y%=fieldHeight;
		}
		this.canChange=true;
		for (var i = fruits.length-1; i >= 0 ; i--) {
			if(this.x==fruits[i].x&&this.y==fruits[i].y){
				if(scene=="singlePlayer"){
					fruits.splice(i,1);
					this.score++;
					addFruit(fruits);
				}
				this.leftIndex--;
				this.leftIndex+=this.tailPeaces.length;
				this.leftIndex%=this.tailPeaces.length;
			}
		}
		this.leftIndex++;
		this.leftIndex%=this.tailPeaces.length;
		for (var i = this.leftIndex; i != this.rightIndex ; i++,i%=this.tailPeaces.length) {
			if(this.tailPeaces[i].x==this.x&&this.tailPeaces[i].y==this.y){
				clearInterval(interval);
				buttons=[];
				if(scene=="singlePlayer"){
					buttons.push(new button(1,c.width/2,200,250,50,"clearInterval(interval);scene='singlePlayer';setup();","Replay"));
				}else if(scene=="normal2P"){
					buttons.push(new button(1,c.width/2,200,250,50,"clearInterval(interval);scene='normal2P';setup();","Replay"));
				}else if(scene=="bonus2P"){
					buttons.push(new button(1,c.width/2,200,250,50,"clearInterval(interval);scene='bonus2P';setup();","Replay"));
				}
				buttons.push(new button(1,c.width/2,270,250,50,"clearInterval(interval);scene='welcomeScreen';setup();","Main Menu"));
				
				scene="replay";
				interval=setInterval(play,1000/fps);
				break;
			}
		}
	}
	this.display=function(){
		ctx.fillStyle="white";
		ctx.fillRect(this.x*scale,this.y*scale,scale,scale);
		for (var i = this.leftIndex; i != this.rightIndex; i++,i%=this.tailPeaces.length) {
			for(var j = -1 ; j <= 1 ; j ++){
				if((
					this.rightIndex>this.leftIndex
					&&
					(
						moded(i+j,this.tailPeaces.length)>=moded(this.leftIndex,this.tailPeaces.length)
						&&
						moded(i+j,this.tailPeaces.length)<moded(this.rightIndex,this.tailPeaces.length)
					)
				   )
					||
				   (
				   	this.rightIndex<this.leftIndex
				   	&&
				   	!(
						moded(i+j,this.tailPeaces.length)<moded(this.leftIndex,this.tailPeaces.length)
						&&
						moded(i+j,this.tailPeaces.length)>=moded(this.rightIndex,this.tailPeaces.length))
				    )
				   ){
					this.tailPeace1X=this.tailPeaces[(i+j+this.tailPeaces.length)%this.tailPeaces.length].x;
					this.tailPeace2X=this.tailPeaces[i].x;
					this.tailPeace1Y=this.tailPeaces[(i+j+this.tailPeaces.length)%this.tailPeaces.length].y;
					this.tailPeace2Y=this.tailPeaces[i].y;
					if(Math.abs(this.tailPeace1X-this.tailPeace2X)>1){
						if(this.tailPeace1X<this.tailPeace2X){
							this.tailPeace1X+=fieldWidth;
						}else{
							this.tailPeace1X-=fieldWidth;
						}
					}
					if(Math.abs(this.tailPeace1Y-this.tailPeace2Y)>1){
						if(this.tailPeace1Y<this.tailPeace2Y){
							this.tailPeace1Y+=fieldHeight;
						}else{
							this.tailPeace1Y-=fieldHeight;
						}
					}
					this.toDrawX=Math.min(this.tailPeace1X,this.tailPeace2X)*scale+scale/5;
					this.toDrawY=Math.min(this.tailPeace1Y,this.tailPeace2Y)*scale+scale/5;
					this.toDrawWidth=3*scale/5+((this.tailPeace1X-this.tailPeace2X)!=0)*scale;
					this.toDrawHeight=3*scale/5+((this.tailPeace1Y-this.tailPeace2Y)!=0)*scale;
					ctx.fillRect(this.toDrawX,this.toDrawY,this.toDrawWidth,this.toDrawHeight);
				}
			}
		}
	}
}
function moded(s,m){
	return ((s%m)+m)%m;
}
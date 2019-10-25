var c,ctx,maximumWidth,canFitAtMax,canFitAtMin,canFit,totalLevelIconWidth,permission=false,levelBorder,mx=0,my=0,yPos=0,clickPositionX,clickPositionY,mouseDown,fitV,drag=false,menu=true;
var field,size,levels,state,sOffset,yOffset,boxSize,levelData;
function setup(){
	c=document.getElementById("canvas");
	ctx=c.getContext("2d");
	levels=[];
	levelData=[];
	levelData.push(new level(10,
	  [ [5, , , , , , ,6,5, ],
	    [ , , , , ,2, , , , ],
	    [ , ,3, , , , , , , ],
	    [ , ,2, , , , , , , ],
	    [ , , , , ,2, , , ,4],
	    [5, , , ,8, , , , , ],
	    [ , , , , , , ,3, , ],
	    [ , , , , , , ,4, , ],
	    [ , , , ,3, , , , , ],
	    [ ,3,4, , , , , , ,3]  ]
		) );
	levelData.push(new level(10,
	  [ [ , , ,5,7, , , ,5, ],
	    [ , ,8, , ,5,7,7, , ],
	    [ ,5, , , , , , , , ],
	    [ ,6, , , , , , , , ],
	    [7, , , ,5,6, , , , ],
	    [ , , , ,7,8, , , ,8],
	    [ , , , , , , , ,6, ],
	    [ , , , , , , , ,7, ],
	    [ , ,8,8,6, , ,8, , ],
	    [ ,6, , , ,6,5, , , ]  ]
		) );
	levelData.push(new level(10,
	  [ [ , ,8, , , , , , ,18],
	    [ ,9, , , , , , ,12, ],
	    [6, , , , , , , , , ],
	    [ , , ,12, , ,9, , , ],
	    [ , , , ,6,9, , , , ],
	    [ , , , ,8,12, , , , ],
	    [ , , ,8, , ,6, , , ],
	    [ , , , , , , , , ,9],
	    [ ,8, , , , , , ,4, ],
	    [9, , , , , , ,9, , ]  ]
		) );
	for(var i = 0 ; i < 15 ; i ++){
		levels.push(0);
	}
	permission=true;
	resizeWindow();
}
function display() {
	ctx.clearRect(0,0,c.width,c.height);
	if(menu){
		for(var i = 0 ; i < levels.length ; i ++){
			var y=floor(i/canFit)*totalLevelIconWidth+levelBorder+yPos,
			    x=floor(i%canFit)*totalLevelIconWidth+levelBorder,
			    iw=totalLevelIconWidth-2*levelBorder;
			ctx.beginPath();
	    	ctx.fillStyle="black";
			ctx.fillRect(x,y,iw,iw);
			ctx.textAlign="center";
			ctx.textBaseline="middle";
	    	ctx.fillStyle="white";
	    	ctx.font="40px Ariel"
			ctx.fillText(i,x+iw/2,y+iw/2);
		}
	}else{
		for(var i = 0 ; i < size ; i ++){
			for(var j = 0 ; j < size ; j ++){
				var x=xOffset+j*boxSize;
				var y=yOffset+i*boxSize;
				ctx.beginPath();
				if(state[i][j]==0)
					ctx.fillStyle="white";
				else
					ctx.globalAlpha=0.5;
				if(state[i][j]==2)
					ctx.fillStyle="red";
				if(state[i][j]==1)
					ctx.fillStyle="green";
				ctx.fillRect(x,y,boxSize,boxSize);
				ctx.globalAlpha=1;
				if(field[i][j]){
					ctx.textAlign="center";
					ctx.textBaseline="middle";
			    	ctx.fillStyle="black";
/*comeBACKlater*/	ctx.font=15+"px Ariel"
					ctx.fillText(field[i][j],x+boxSize/2,y+boxSize/2);
				}
			}
		}
		ctx.setLineDash([1,1]);
		ctx.lineWidth=2;
		for(var i = 0 ; i <= size ; i ++){
			line(xOffset+i*boxSize,yOffset,xOffset+i*boxSize,yOffset+size*boxSize);
			line(xOffset,yOffset+i*boxSize,xOffset+size*boxSize,yOffset+i*boxSize);
		}
		ctx.lineWidth=1;
		ctx.setLineDash([]);
	}
}
function level(size,fielddd){
	this.size=size;
	this.field=fielddd;
}
function startLevel(index){
	menu=false;
	size=levelData[index].size;
	field=[];
	state=[];
	for(var i = 0 ; i < size ; i ++){
		field.push([]);
		for(var j = 0 ; j < size ; j ++){
			field[i].push(levelData[index].field[i][j]);
		}
	}
	for(var i = 0 ; i < size ; i ++){
		state.push([]);
		for(var j = 0 ; j < size ; j ++){
			state[i].push(0);
		}
	}
	resizeWindow();
}

function resizeWindow(){
	if(permission){
		c.width=window.innerWidth;
		c.height=window.innerHeight;
		minimumWidth=min(c.width,150);
		maximumWidth=min(c.width,300);
		canFitAtMax=floor(c.width/maximumWidth);
		canFitAtMin=floor(c.width/minimumWidth);
		if(canFitAtMin>canFitAtMax)
			canFit=canFitAtMax+1;
		else
			canFit=canFitAtMax;
		fitV=ceil(levels.length/canFit);
		totalLevelIconWidth=floor(c.width/canFit);
		levelBorder=min(max(0,totalLevelIconWidth-minimumWidth),20);
		
		if(menu){
			if(fitV*totalLevelIconWidth>c.height){
				yPos=min(0,yPos);
				yPos=max(-fitV*totalLevelIconWidth+c.height,yPos);
			}else{
				yPos=0;
			}
		}
		if(c.width<c.height){
			yOffset=floor((c.height-c.width)/2);
			xOffset=0;
		}else if(c.width>c.height){
			xOffset=floor((c.width-c.height)/2);
			yOffset=0;
		}else{
			xOffset=0;
			yOffset=0;
		}
		boxSize=floor(min(c.width,c.height)/size);

		display();
	}
}

function checkClick(){
	if(menu){
		for(var i = 0 ; i < levels.length ; i ++){
			var y=floor(i/canFit)*totalLevelIconWidth+levelBorder+yPos,
			    x=floor(i%canFit)*totalLevelIconWidth+levelBorder,
			    iw=totalLevelIconWidth-2*levelBorder;
			if(mx>=x&&mx<x+iw&&my>=y&&my<y+iw){
				startLevel(i);
				break;
			}
		}
	}else{
		for(var i = 0 ; i < size ; i ++){
			for(var j = 0 ; j < size ; j ++){
				var x=xOffset+j*boxSize;
				var y=yOffset+i*boxSize;
				if(mx>=x&&my>=y&&mx<x+boxSize&&my<y+boxSize){
					state[i][j]++;
					state[i][j]%=3;
					if(checkState()){
						ctx.fillText("congratulations",c.width/2,c.height/2);
						menu=true;
					}
					display();
					break;
				}
			}
		}
	}
}
function checkState(){
	var vis=[];
	for(var i = 0 ; i < size ; i ++){
		vis.push([]);
		for(var j = 0 ; j < size ; j ++){
			vis[i].push(false);
		}
	}
	for(var i = 0 ; i < size ; i ++){
		for(var j = 0 ; j < size ; j ++){
			if(!vis[i][j]){
				vis[i][j]=true;
				if(state[i][j]==1){
					var q=[];
					var bi=0;
					q.push({iv:i,jv:j});
					while(bi<q.length){
						var ti=q[bi].iv;
						var tj=q[bi].jv;
						bi++;
						for(var it=-1 ; it < 2 ; it++){
							for(var jt = -1 ; jt < 2 ; jt++){
								if(abs(it)+abs(jt)==1){
									var pi=ti+it;
									var pj=tj+jt;
									if(pi>=0&&pi<size&&pj>=0&&pj<size){
										if(!vis[pi][pj]&&state[pi][pj]==1){
											vis[pi][pj]=true;
											q.push({iv:i,jv:j});
										}
									}
								}
							}
						}
					}
				}
				for(var k = 0 ; k < size ; k ++){
					for(var l = 0 ; l < size ; l ++){
						if(vis[k][l]==false&&state[k][l]==1){
							return false;
						}
					}
				}
			}

		}
	}
	for(var i = 1 ; i < size ; i ++){
		for(var j = 1 ; j < size ; j ++){
			if(state[i][j]==0)return false;
			if(state[i][j]==state[i-1][j-1]&&state[i-1][j]==state[i][j-1]&&state[i][j]!=state[i-1][j])
				return false;
		}
	}
	for(var i = 0 ; i < size ; i ++){
		for(var j = 0 ; j < size ; j ++){
			if(field[i][j]){
				var s=-3;
				for(var k = i ; k >= 0 ; k-- ){
					if(state[k][j]==1)
						s++;
					else
						break;
				}
				for(var k = i ; k < size ; k++ ){
					if(state[k][j]==1)
						s++;
					else
						break;
				}
				for(var l = j ; l >= 0 ; l-- ){
					if(state[i][l]==1)
						s++;
					else
						break;
				}
				for(var l = i ; l < size ; l++ ){
					if(state[i][l]==1)
						s++;
					else
						break;
				}
				if(s!=field[i][j])return false;
			}
		}
	}
	return true;
}





















window.addEventListener("resize", function(){
	resizeWindow();
} );
document.addEventListener("mousedown",function(event){
	mx=event.x-canvas.offsetLeft;
	my=event.y-canvas.offsetTop;
	mouseDown=true;
	clickPositionX=mx;
	clickPositionY=my;
});
document.addEventListener("mouseup",function(event){
	mx=event.x-canvas.offsetLeft;
	my=event.y-canvas.offsetTop;
	if(!drag||!menu){
		checkClick();
	}
	drag=false;
	mouseDown=false;
});
document.addEventListener("mousemove",function(event){
	mx=event.x-canvas.offsetLeft;
	my=event.y-canvas.offsetTop;
	if(mouseDown){
		drag=true;
		if(menu){
			if(fitV*totalLevelIconWidth>c.height){
				yPos-=clickPositionY-my;
				clickPositionY=my;
				clickPositionX=mx;
				yPos=min(0,yPos);
				yPos=max(-fitV*totalLevelIconWidth+c.height,yPos);
				display();
			}
		}
	}
});
document.addEventListener("wheel",function(event){
	if(menu){
		if(fitV*totalLevelIconWidth>c.height){
			yPos-=event.deltaY/100*50;
			yPos=min(0,yPos);
			yPos=max(-fitV*totalLevelIconWidth+c.height,yPos);
			display();
		}
	}
});















function line(a,b,c,d){
	ctx.beginPath();
	ctx.moveTo(a,b);
	ctx.lineTo(c,d);
	ctx.stroke();
}
function abs(a){
	return Math.abs(a);
}
function min(a,b){
	return Math.min(a,b);
}
function max(a,b){
	return Math.max(a,b);
}
function floor(a){
	return Math.floor(a); 
}
function ceil(a){
	return Math.ceil(a); 
}
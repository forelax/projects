function action_mapEdit(){
	inputHandler=-1;
	brush=0;
	mapH=mapData.length;
	mapW=mapData[0].length;
	map=[];
	for(var i = 0 ; i < mapData.length ; i ++){
		map.push([]);
		for(var j = 0 ; j < mapData[i].length ; j ++){
			map[i].push(mapData[i][j]);
		}
	}
	xoff=0;yoff=0;
	if(c.height/mapH<c.width/mapW){
		unitSize=c.height/mapH;
		xoff=c.width-unitSize*mapW;
		xoff/=2;
	}else{
		usingSize=c.width/mapW;
		yoff=c.height-unitSize*mapH;
		yoff/=2;
	}
	this.intervalFunction=function(){
		ctx.clearRect(0,0,c.width,c.height);
		for (var i = 0; i < mapH ; i++) {
			for(var j = 0 ; j < mapW ; j ++){
				var xd=xoff+j*unitSize;
				var yd=yoff+i*unitSize;
				if(map[i][j]==0){
					ctx.fillStyle="blue";
				}else if(map[i][j]==1){
					ctx.fillStyle="saddlebrown";
				}else if(map[i][j]==2){
					ctx.fillStyle="grey";
				}else if(map[i][j]==3){
					ctx.fillStyle="forestgreen";
				}else if(map[i][j]==4){
					ctx.fillStyle="red";
				}else if(map[i][j]==5){
					ctx.fillStyle="cyan";
				}else if(map[i][j]==6){
					ctx.fillStyle="sandybrown";
				}
				ctx.beginPath();
				ctx.rect(xd,yd,unitSize,unitSize);
				ctx.fill();
				ctx.stroke();
			}
		}
	}
	inputHandler=3;
	interval=setInterval(intervalFunction,50);
}
var c,
	ctx,
	bck,
	interval,
	fps=60,
	p,
	pl = [],
	counter = 0,
	wx=0,
	wy=0,
	ww,
	wh;
function max(n1,n2){if(n1>n2)return n1; else return n2;}
function min(n1,n2){if(n1<n2)return n1; else return n2;}
function setup(){
	p=new player('red');
	p2=new player('#00CCCC');
	p2.x=ww-20-p2.scale;
}
function startGame(){
	c=document.getElementById("canvas");
	c.width=720;
	c.height=480;
	ww=c.width/**2*/;
	wh=c.height/**2*/;
	ctx=c.getContext("2d");
	bck=document.getElementById("bck");
	setup();
	interval=setInterval( play , /*1000/fps*/60 );
}

function spawnPlatform(){
	var rnum=Math.random();
	if(rnum<0.5)
		pl.push(new platform(-200,Math.floor(Math.random()*(wh-15-5*p.scale)+2*p.scale), 1,0,10));
	else
		pl.push(new platform(ww  ,Math.floor(Math.random()*(wh-15-5*p.scale)+2*p.scale),-1,0,10));
}


function play(){
	//ctx.clearRect(0,0,ww,wh);
	ctx.drawImage(bck,0,0,ww,wh);
	p.update();
	p.display();
	p2.update();
	p2.display();
	//helpDebug();
	if(pl.length<10){
		if(counter>=10){
			spawnPlatform();
			counter=0;
		}else
			counter++;
	}
	for(var i = pl.length-1 ; i >= 0 ; i-- ){
		pl[i].update();
		pl[i].display();
		if(pl[i].x>ww||pl[i].x<-200||pl[i].y>wh||pl[i].y<-15){
			pl.splice(i,1);
			spawnPlatform();
		}
	}
	ctx.font = "30px Arial";
	ctx.fillStyle = p.color;
	ctx.fillText('P1 score '+p.rez,10,c.height);
	ctx.fillStyle = p2.color;
	ctx.fillText('P2 score '+p2.rez,c.width-200,c.height);
}

document.addEventListener('keydown',function(event){
	var v=event.keyCode;
	if(v==87){
		p.uk=true;
	}else if(v==38){
		p2.uk=true;
	}else if(v==65){
		p.lk=true;
	}else if(v==37){
		p2.lk=true;
	}else if(v==83){
		p.dk=true;
	}else if(v==40){
		p2.dk=true;
	}else if(v==68){
		p.rk=true;
	}else if(v==39){
		p2.rk=true;
	}
},true);
document.addEventListener('keyup',function(event){
	var v=event.keyCode;
	if(v==87){
		p.uk=false;
	}else if(v==38){
		p2.uk=false;
	}else if(v==65){
		p.lk=false;
	}else if(v==37){
		p2.lk=false;
	}else if(v==83){
		p.dk=false;
	}else if(v==40){
		p2.dk=false;
	}else if(v==68){
		p.rk=false;
	}else if(v==39){
		p2.rk=false;
	}
},true);


function helpDebug(){
	ctx.beginPath();
	ctx.lineWidth=2;
	ctx.moveTo(0,0);
	ctx.lineTo(0,wh);
	ctx.moveTo(c.width,0);
	ctx.lineTo(c.width,wh);
	ctx.stroke();
	var text="The quick brown fox jumps over the lazy dog. ";
	ctx.fillStyle="black";
	ctx.font="25px Ariel";
	ctx.fillText(text+text+text+text,5,wh);
	ctx.fillText(text+text+text+text,5,c.height);
	displayButtons(0,0);
	displayButtons(c.width,0);
}
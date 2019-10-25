var c,ctx,fps=30;
function startGame(){
	c=document.getElementById("gameCanvas");
	ctx=c.getContext("2d");
	setup();
	var interval=setInterval(play,1000/fps);
}
var rows,cols,field=[],scale=40,p;
function loadPhotos(){
}
function setup(){
	loadPhotos();
	p=new player();
	rows=c.height/scale;cols=c.width/scale-1;
	for (var i = 0; i < rows ; i++){
		var helpArray=[];
		for(var j = 0 ; j < cols ; j++){
			helpArray.push(new Field(j*scale,i*scale));
		}
		field.push(helpArray);
	}
}
function play(){
	ctx.fillStyle="#F4A460";
	ctx.fillRect(0,0,c.width,c.height);
	for(var i = 0 ; i < rows ; i ++){
		for (var j = 0; j < cols ; j++) {
			field[i][j].update();
			field[i][j].display();
		}
	}
	p.update();
	p.display(p.x*scale,p.y*scale);
}

function Field(x,y){
	this.x=x;
	this.y=y;
	this.t=0;
	this.update = function(){
		if(this.t==0){
			return;
		}
	}
	this.display = function(){
		if(this.t==0){
			ctx.fillStyle="#4b9a49";
			ctx.fillRect(this.x+scale/40,this.y+scale/40,38*scale/40,38*scale/40);
		}

	}
}
function player(){
	this.x=0;
	this.y=0;
	this.speed=0.25;
	this.dk=false;
	this.uk=false;
	this.lk=false;
	this.rk=false;
	this.dm=false;
	this.um=false;
	this.lm=false;
	this.rm=false;
	this.state=0;
	this.update=function(){
		if(this.dk&&(!this.um&&!this.rm&&!this.lm))
			this.dm=true;
		if(this.uk&&(!this.dm&&!this.rm&&!this.lm))
			this.um=true;
		if(this.rk&&(!this.um&&!this.dm&&!this.lm))
			this.rm=true;
		if(this.lk&&(!this.um&&!this.rm&&!this.dm))
			this.lm=true;

		if(this.dm){
			this.y+=this.speed;
			this.y=setPr(this.y);
			if(this.y==Math.round(this.y)||constrain(this.y,0,rows-1)!=this.y)
				this.dm=false;
		}
		if(this.um){
			this.y-=this.speed;
			this.y=setPr(this.y);
			if(this.y==Math.round(this.y)||constrain(this.y,0,rows-1)!=this.y)
				this.um=false;
		}
		if(this.rm){
			this.x+=this.speed;
			this.x=setPr(this.x);
			if(this.x==Math.round(this.x)||constrain(this.x,0,cols-1)!=this.x)
				this.rm=false;
		}
		if(this.lm){
			this.x-=this.speed;
			this.x=setPr(this.x);
			if(this.x==Math.round(this.x)||constrain(this.x,0,cols-1)!=this.x)
				this.lm=false;
		}
		this.x=constrain(this.x,0,cols-1);
		this.y=constrain(this.y,0,rows-1);
	}
	this.display=function(xpos,ypos){
		ctx.fillStyle="black";
		ctx.fillRect(xpos+scale/10,ypos+scale/10,4*scale/5,4*scale/5);

		var grd = ctx.createRadialGradient(xpos+scale/2,ypos+scale/2,scale/10,xpos+scale/2,ypos+scale/2,3*scale/10);
		grd.addColorStop(0,"red");
		grd.addColorStop(0.5,"orange");
		grd.addColorStop(1,"black");

		ctx.fillStyle = grd;
		ctx.beginPath();
		ctx.arc(xpos+scale/2,ypos+scale/2,3*scale/10,0,2*Math.PI);
		ctx.fill();
	}
}
function setPr(num){
	return Math.round(num*10)/10;
}
function constrain(num,l,h){
		 if(num<l)	return l;
	else if(num>h)	return h;
	else 			return num;
}
document.addEventListener('keydown',function(event){
	var kv=event.key;
	if(kv=="s"||kv=="ArrowDown"){
		p.dk=true;
	}else if(kv=="w"||kv=="ArrowUp"){
		p.uk=true;
	}else if(kv=="a"||kv=="ArrowLeft"){
		p.lk=true;
	}else if(kv=="d"||kv=="ArrowRight"){
		p.rk=true;
	}
});
document.addEventListener('keyup',function(event){
	var kv=event.key;
	if(kv=="s"||kv=="ArrowDown"){
		p.dk=false;
	}else if(kv=="w"||kv=="ArrowUp"){
		p.uk=false;
	}else if(kv=="a"||kv=="ArrowLeft"){
		p.lk=false;
	}else if(kv=="d"||kv=="ArrowRight"){
		p.rk=false;
	}
});

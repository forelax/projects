var canvas,items,camera;
function setup() {
	canvas=createCanvas(window.innerWidth, window.innerHeight);
	items=[];
	for(var i = 0 ; i < 15 ; i ++){
		items.push(new Item(createVector(
				int(random(0,width )),
				int(random(0,height))
			),  int(random(20,100  )),
				int(random(1, 2   )),
				p5.Vector.random2D()
		));
	}
	camera=new Stuff(createVector(width/2,height/2),0);
}
function draw() {
	background("black");
	for(var i = 0 ; i < items.length ; i ++){
		items[i].update();
		items[i].show();
	}
	camera.update();
	mray=new Stuff(camera.pos.copy(),camera.angle);
	while(true){
		var d=DE(mray.pos);
		if(d>=0.001||d<0){
			fill('rgba(0,255,0, 0.15)');
			ellipse(mray.pos.x,mray.pos.y,d*2,d*2);
		}
		if(d<0.001){
			fill('rgba(0,  0,255, 1)');
			ellipse(mray.pos.x,mray.pos.y,15,15);
		}
		var mv=createVector(d*cos(mray.angle),d*sin(mray.angle));
		var ppos=mray.pos.copy();
		mray.pos.add(mv);
		if(d>=0){
			line(ppos.x,ppos.y,mray.pos.x,mray.pos.y);
		}else{
			mv.mult(-1);
			mray.pos.add(mv);
			mray.pos.add(mv);
			line(ppos.x,ppos.y,mray.pos.x,mray.pos.y);
			mv.mult(-1);
			mray.pos.add(mv);
			mray.pos.add(mv);
		}
		if(d<0.001)break;
		if(outOfBounds(mray.pos))break;
	}

	camera.angle+=0.005;
}
function outOfBounds(a){
	return a.x<0||a.x>=width||a.y<0||a.y>=height;
}
function DE(pos){
	var dist=pos.dist(items[0].pos)-items[0].r;
	for(var i = 1 ; i < items.length ; i++){
		var ndist=pos.dist(items[i].pos)-items[i].r;
		if(ndist<dist)dist=ndist;
	}
	return dist;
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  resizeCanvas(w,h);
  width = w;
  height = h;
};

function Item(_pos,_r,_speed,_dir){
	this.pos=_pos;
	this.r=_r;
	this.speed=_speed;
	this.dir=_dir.setMag(this.speed);
	this.show=function(){
		noFill();
		stroke(255);
		ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
	}
	this.update=function(){
		this.pos.add(this.dir);
		if(this.pos.x<this.r)this.dir.x*=this.dir.x<0?-1:1;
		if(this.pos.x>=width-this.r)this.dir.x*=this.dir.x>0?-1:1;
		if(this.pos.y<this.r)this.dir.y*=this.dir.y<0?-1:1;
		if(this.pos.y>=height-this.r)this.dir.y*=this.dir.y>0?-1:1;
	}
}

function Stuff(_pos,angle){
	this.pos=_pos;
	this.angle=angle;
	this.update=function(){
		this.pos.lerp(width/2,height/2,0,0.1);
	}
}
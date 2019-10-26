var canvas,objects,camera,pmx=0,pmy=0,dragging=false;
function setup() {
	canvas=createCanvas(window.innerWidth, window.innerHeight);
	objects=[];
	for(var i = 0 ; i < 10 ; i ++){
		objects.push(
			new Element(
				createVector(
					int(random(0,width/2)),
					int(random(0,height))
				),
				createVector(
					int(random(0,width/2)),
					int(random(0,height))
				),
				color(random(255),random(255),random(255))
			)
		);
		if(objects[i].pa.dist(objects[i].pb)==0){
			objects.pop();
			i--;
		}
	}
	objects.push(new Element(createVector( 0       , 0      ),createVector( width/2 , 0      ),color(127)));
	objects.push(new Element(createVector( 0       , 0      ),createVector( 0       , height ),color(127)));
	objects.push(new Element(createVector( width/2 , height ),createVector( width/2 , 0      ),color(127)));
	objects.push(new Element(createVector( width/2 , height ),createVector( 0       , height ),color(127)));
	camera=new Ray(
		createVector(
			int(width/4),
			int(height/2)
		),
		0
	);
}
function draw() {
//	camera.pos.set(mouseX,mouseY);
	if(keyIsDown(LEFT_ARROW)||keyIsDown(65)){
		camera.angle-=0.05;
	}
	if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)){
		camera.angle+=0.05;
	}
	if(keyIsDown(UP_ARROW)||keyIsDown(87)){
		camera.pos.add(createVector(cos(camera.angle),sin(camera.angle)).setMag(1));
	}
	if(keyIsDown(DOWN_ARROW)||keyIsDown(83)){
		camera.pos.add(createVector(cos(camera.angle),sin(camera.angle)).setMag(-1));
	}

	var data=[];
	background("black");
	for(var i = 0 ; i < objects.length ; i ++){
		objects[i].col.setAlpha(255);
		objects[i].show();
	}
	var step=0.0125;
	for(var i = -Math.PI/6 ; i <= Math.PI/6 ; i += step){
		var emit=new Ray(camera.pos.copy(),camera.angle+i);
		var t=march(emit);
		data.push({dst:t.ds,col:t.col});
		data[data.length-1].dst*=pow2(Math.cos(i));
	}
	fill(0);
	noStroke();
	rect(width/2,0,width/2,height);
	for(var i = 0 ; i < data.length ; i ++){
		var l=width/2+i*width/2/data.length;
		var wd=width/2/data.length;
		var b=map(data[i].dst,0,pow2(width/2),255,0);
		var h=map(sqrt(data[i].dst),0,width/2,height,0);

		var col=new color(data[i].col);
		col.setAlpha(b);
		fill(col);
 
		noStroke();
		rect(l-0.5,height/2-h/2,wd+1,h);
	}
	fill(255,0,0);
	ellipse(camera.pos.x,camera.pos.y,10,10 );
	displayButtons(0,0);
}
function march(e){
	var d=Infinity;
	var rez;
	var resM=100;
	var rc="black";
	var fs=new Segment(e.pos.copy(),e.pos.copy().add(createVector(cos(e.angle),sin(e.angle)).setMag(resM)));
	resM=distSq(fs.pa,fs.pb);
	for(var i = 0 ; i < objects.length ; i ++){
		var p = intersection(fs,objects[i].segment);
		var cd=Infinity;
		var crez;
		if(p.s==0)continue;
		if(p.s==1){
			var d1=distSq(fs.pa,objects[i].segment.pa);
			var d2=distSq(fs.pa,objects[i].segment.pb);
			var d3=distSq(fs.pb,objects[i].segment.pa);
			var d4=distSq(fs.pb,objects[i].segment.pb);
			if((d3<=resM||d3<d1)&&(d4<=resM||d4<d2)){
				if(d1<d2){
					cd=d1;
					crez=p.objects[i].segment.pa;
				}else{
					cd=d2;
					crez=p.objects[i].segment.pb;
				}
			}else if((d3>resM&&d3>=d1)&&(d4>resM||d4>=d2)){
				cd=Infinity;
				continue;
			}else{
				cd=0;
				crez=e.pos;
			}
		}
		if(p.s==2){
			var d1=distSq(fs.pa,p.pt);
			var d2=distSq(fs.pb,p.pt);
			if(d2<=resM||d1>d2){
				cd=d1;
				crez=p.pt;
			}else{
				cd=Infinity;
				continue;
			}
		}
		if(cd<d){
			var d1=distSq(crez,objects[i].pa);
			var d2=distSq(crez,objects[i].pb);
			var d3=distSq(objects[i].pa,objects[i].pb);
			if(d1+d2>d3)continue;
			rc=objects[i].col;
			d=cd;
			rez=crez;
		}
	}
	if(d<Infinity){
		var fs=new Segment(e.pos.copy(),rez);
		fs.show();
		fill(rc);
		noStroke();
		ellipse(rez.x,rez.y,10,10);
	}else{
		var fs=new Segment(e.pos.copy(),e.pos.copy().add(createVector(cos(e.angle),sin(e.angle)).setMag(1000000)));
		fs.show();
	}
	return {
		ds:d,
		pt:rez,
		col:rc
	};
}
function Segment(_pos1,_pos2){
	this.pa=_pos1;
	this.pb=_pos2;
	this.a=this.pb.y-this.pa.y;
	this.b=this.pa.x-this.pb.x;
	this.c=-(this.a*this.pa.x+this.b*this.pa.y);
	this.show=function(){
		stroke("white");
		strokeWeight(0.5);
		line(this.pa.x,this.pa.y,this.pb.x,this.pb.y);
	}
}
function Element(posa,posb,colr){
	this.pa=posa.copy();
	this.pb=posb.copy();
	this.segment=new Segment(this.pa,this.pb);
	this.col=colr;
	this.show=function(){
		strokeWeight(3);
		stroke(this.col);
		line(this.pa.x,this.pa.y,this.pb.x,this.pb.y);
	}
}
function Ray(_pos,_angle){
	this.pos=_pos.copy();
	this.angle=_angle;
}

function intersection(a,b){
	if(a.a==0){
		var fy=-a.c/a.b
		if(b.a==0){
			var sy=-b.a/b.c;
			if(fy!=sy){
				return {
					s:0
				};
			}else{
				return{
					s:1
				};		
			}
		}else if(b.b==0){
			var sx=-b.c/b.a;
			return{
				s:2,
				pt:createVector(sx,fy)
			};
		}else{
			var sx=(-b.c-b.b*fy)/b.a;
			return{
				s:2,
				pt:createVector(sx,fy)
			};
		}
	}else if(a.b==0){
		var fx=-a.c/a.a;
		if(b.a==0){
			var sy=-b.c/b.b;
			return {
				s:2,
				pt:createVector(fx,sy)
			};
		}else if(b.b==0){
			var sx=-b.c/b.a;
			if(fx!=sx){
				return {
					s:0
				};
			}else{
				return{
					s:1
				};		
			}
		}else{
			var sy=(-b.c-b.a*fx)/b.b;
			return {
				s:2,
				pt:createVector(fx,sy)
			};
		}
	}else{
		if(b.a==0){
			var sy=-b.c/b.b;
			var fx=(-a.c-a.b*sy)/a.a;
			return {
				s:2,
				pt:createVector(fx,sy)
			};
		}else if(b.b==0){
			var sx=-b.c/b.a;
			var fy=(-a.c-a.a*sx)/a.b;
			return {
				s:2,
				pt:createVector(sx,fy)
			};
		}else{
			var top=b.a*a.c-a.a*b.c;
			var bottom=a.a*b.b-b.a*a.b;
			if(bottom==0){
				return {
					s:0
				};
			}else{
				var y=top/bottom;
				var x=(-a.c-a.b*y)/a.a;
				return {
					s:2,
					pt:createVector(x,y)
				};
			}
		}
	}
}
window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  resizeCanvas(w,h);
  width = w;
  height = h;
};
/*function mouseDragged(event) {
	if(dragging)
		camera.angle+=map(mouseX-pmx,-width/2,width/2,-Math.PI,Math.PI);
	pmx=mouseX;
	pmy=mouseY;
	dragging=true;
}
function mouseReleased(){
	dragging=false;
}*/
function mouseDragged(event) {
	camera.pos.set(mouseX,mouseY);
}
function mouseWheel(event) {
  if(event.delta>0){
  	camera.angle+=0.1;
  }else{
  	camera.angle-=0.1;
  }
}
function distSq(p1,p2){
	return pow2(p1.x-p2.x)+pow2(p1.y-p2.y);
}
function pow2(a){
	return a*a;
}
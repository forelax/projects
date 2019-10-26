var canvas,pos,dir1,dir2,circle,cr=5,light;

function setup() {
	canvas=createCanvas(window.innerWidth, window.innerHeight);
	pos=createVector(7.5,7.5,0);
	dir1=createVector(0,0,100);
	dir2=createVector(0,10,0);
	circle=createVector(100,100,100);
	light=createVector(100,100,0);
	noLoop();
}
function de(x){
	return (circle.dist(x)-cr)%4000;
}
function draw() {
	background("lightblue");
	scale(0.9);
	translate(width/20,height/20);
	var norm=dir2.cross(dir1);
	for(var i = 0 ; i < height ; i +=1){
		var pt1=dir2.copy();
		pt1.setMag(height/2-i);
		for(var j = 0 ; j < width ; j +=1){
			var pt2=norm.copy();
			pt2.setMag(j-width/2);
			var ray=pos.copy();
			ray.add(pt1);
			ray.add(pt2);
			var pt3=pos.copy();
			var x=pos.copy();
			var val=de(x);
	//		console.log(x,pos);
	//		console.log(x.dist(pos));
			while(val>cr+0.001&&x.dist(pos)<100000){
	//			console.log('c',i,j);
				var mv=dir1.copy();
				mv.setMag(val);
				x.add(mv);
				val=de(x);
			}
	//		console.log(x.dist(pos));
			if(x.dist(pos)>=100000)
				fill(0);
			else
				fill(255);
			noStroke();
			rect(j,i,1,1);

		}
	}
	dir2.setMag(10);
	console.log("yay");
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  resizeCanvas(w,h);
  width = w;
  height = h;
};
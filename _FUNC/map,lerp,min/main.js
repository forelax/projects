window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	function norm(value, min, max) {
		return (value - min) / (max - min);
	}

	function lerp(norm, min, max) {
		return (max - min) * norm + min;
	}

	function map(value, sourceMin, sourceMax, destMin, destMax) {
		return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
	}
	var rad=50;
	var yoff=height/2-rad,
		xoff= width/2-rad;
	var xpl=width/2;
	var ypl =height/2;
	var mouseX=width/2,mouseY=height/2;
	function draw (){
		xpl= map (mouseX,0,width, width/2 -xoff, width/2 +xoff);
		ypl = map(mouseY,0,height,height/2-yoff, height/2+yoff);
		yoff=height/2-rad;
		xoff= width/2-rad;
		
		context.clearRect(0, 0, width, height);
		context.beginPath();
		context.arc(xpl, ypl, rad, 0, Math.PI * 2, false);
		context.fill();
	}
	document.body.addEventListener("mousemove", function(event) {
		mouseX=event.clientX;
		mouseY=event.clientY;
		
		draw();
	});
	document.addEventListener("keydown", function(event){
		if(rad<height/2&&rad<width/2&&event.keyCode==38)
			rad++;
		else if(event.keyCode==40&&rad>2)
			rad--;
		draw();
	});

};
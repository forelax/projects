

function segmentIntersect(p0, p1, p2, p3) {
	var A1 = p1.y - p0.y,
		B1 = p0.x - p1.x,
		C1 = A1 * p0.x + B1 * p0.y,
		A2 = p3.y - p2.y,
		B2 = p2.x - p3.x,
		C2 = A2 * p2.x + B2 * p2.y,
		denominator = A1 * B2 - A2 * B1;

	if(denominator == 0) {
		return null;
	}

	var intersectX = (B2 * C1 - B1 * C2) / denominator,
		intersectY = (A1 * C2 - A2 * C1) / denominator,
		rx0 = (intersectX - p0.x) / (p1.x - p0.x),
		ry0 = (intersectY - p0.y) / (p1.y - p0.y),
		rx1 = (intersectX - p2.x) / (p3.x - p2.x),
		ry1 = (intersectY - p2.y) / (p3.y - p2.y);

	if(((rx0 >= 0 && rx0 <= 1) || (ry0 >= 0 && ry0 <= 1)) && 
	   ((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1))) {
		return {
			x: intersectX,
			y: intersectY
		};
	}
	else {
		return null;
	}
}

function drawHeart(x,y,sc){
	ctx.globalAlpha=1;
	ctx.fillStyle="red";
	ctx.strokeStyle="black";
	ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x      , y-3   *sc, x-5 *sc, y-15  *sc, x-25*sc, y-15  *sc );
    ctx.bezierCurveTo(x-55*sc, y-15  *sc, x-55*sc, y+22.5*sc, x-55*sc, y+22.5*sc );
    ctx.bezierCurveTo(x-55*sc, y+40  *sc, x-35*sc, y+62  *sc, x      , y+80  *sc );
    ctx.bezierCurveTo(x+35*sc, y+62  *sc, x+55*sc, y+40  *sc, x+55*sc, y+22.5*sc );
    ctx.bezierCurveTo(x+55*sc, y+22.5*sc, x+55*sc, y-15  *sc, x+25*sc, y-15  *sc );
    ctx.bezierCurveTo(x+10*sc, y-15  *sc, x      , y-3   *sc, x      , y         );
    ctx.fill();
	ctx.stroke();
}

function drawHalfHeart(x,y,sc){
	ctx.globalAlpha=1;
	ctx.fillStyle="red";
	ctx.strokeStyle="black";
	ctx.lineWidth=2;
	ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y+80*sc);
    ctx.bezierCurveTo(x+35*sc, y+62  *sc, x+55*sc, y+40  *sc, x+55*sc, y+22.5*sc );
    ctx.bezierCurveTo(x+55*sc, y+22.5*sc, x+55*sc, y-15  *sc, x+25*sc, y-15  *sc );
    ctx.bezierCurveTo(x+10*sc, y-15  *sc, x      , y-3   *sc, x      , y         );
    ctx.fill();
	ctx.stroke();
}


function drawMouse(){
	if(lives>0&&mx<c.width/3){
		ctx.fillStyle="red";
		ctx.globalAlpha=0.3;
		ctx.fillRect(mx-plw,my-plh,plw*2,plh*2);
		ctx.globalAlpha=0.5;
	}else{
		ctx.beginPath();
		ctx.globalAlpha=1;
		ctx.fillStyle="red";
		ctx.arc(mx,my,4,0,2*Math.PI);
		ctx.fill();
	}
}

function displayFloatingTexts(){
	for (var i = floatingText.length - 1; i >= 0; i--) {
		floatingText[i].display();
		if(floatingText[i].t<=0){
			floatingText.splice(i,1);
		}
	}
}

function background(){
	ctx.globalAlpha=0.5;
	ctx.fillStyle="#F4B460";
	ctx.fillRect(0,0,c.width/3,c.height);
	ctx.fillStyle="#F4A460";
	ctx.fillRect(c.width/3,0,2*c.width/3,c.height);
	ctx.fillStyle="black";
	ctx.beginPath();
	ctx.lineWidth=2;
	ctx.moveTo(c.width/3,0);
	ctx.lineTo(c.width/3,c.height);
	ctx.stroke();
}

function replay(){
	ctx.fillStyle="lightGray";
	ctx.fillRect(rpbx,rpby,rpbw,rpbh);
	ctx.fillStyle="black";
	ctx.font="30px Ariel";
	ctx.fillText("Replay",395,300);
}

function bbplU(){
	for (var i = bbpl.length - 1; i >= 0; i--) {
		bbpl[i].display();
		if(bbpl[i].t<=0){
			bbpl.splice(i,1);
		}
	}
}

function drawPlatforms(){
	if(lives>0){
		gad();
		for(var i = 0 ; i < pl.length ; i ++){
			var fSCol=(Math.round(190-140*i/pl.length)).toString(16);
			ctx.fillStyle="#"+fSCol+fSCol+fSCol;
			ctx.fillRect(pl[i].x-plw,pl[i].y-plh,plw*2,plh*2);
			ctx.rect(pl[i].x-plw,pl[i].y-plh,plw*2,plh*2);
			ctx.strokeStyle='black';
			ctx.lineWidth='1px';
			ctx.stroke();
		}
	}
}

function hearts(){
	for(var i = 0 ; i < Math.floor(lives) ; i ++){
		drawHeart(700-i*30,10,0.25);
	}
	if(lives>0&&Math.floor(lives)!=lives){
		drawHalfHeart(700-(Math.floor(lives))*30,10,0.25);
	}
}

function pauseF(){
	if(lives>0&&mx>=c.width/3){
		ctx.globalAlpha=1;
		ctx.font="40px Georgia";
		ctx.fillStyle="black";
		ctx.fillText("PAUSED",c.width/3,30);
	}
}

function scoreF(){
	if(lives>0){
		ctx.globalAlpha=1;
		ctx.font="30px Georgia";
		ctx.fillStyle="black";
		ctx.fillText("score "+score,600,60);
	}else{
		ctx.globalAlpha=1;
		ctx.font="50px Georgia";
		ctx.fillStyle="black";
		ctx.fillText("score "+score,c.width/2,c.height/2+20);
		replay();
	}
}

function drawBalls(){
	ctx.fillStyle="black";
	gad();
	if(lives>0){
		for (var i = 0; i < b.length; i++) {
			if(mx<c.width/3){
				b[i].update();
			}
			b[i].display();
		}
	}else if(b.length>0){
		for (var i = b.length - 1; i >= 0; i--) {
			for(var j = 0 ; j < 8 ; j ++){
				eb.push(new efectBall(b[i].x,b[i].y));
			}
			b.splice(i,1);
		}
	}else{
		for (var i = eb.length - 1; i >= 0; i--) {
			eb[i].update();
			if(eb[i].t>0){
				eb[i].display();
			}else{
				eb.splice(i,1);
			}
		}
	}
}


function drawCursorButton(xb,yb,sc){
	gad();
	if(!mp)
		ctx.fillStyle="#D9D9D9";
	else
		ctx.fillStyle="#747474";

	ctx.fillRect(xb,yb,20*sc,20*sc);

	ctx.lineWidth=2*sc;

	ctx.beginPath();
	ctx.moveTo(xb+5  *sc  ,yb+(20-4) *sc  );
	ctx.lineTo(xb+5  *sc  ,yb+4      *sc  );
	ctx.lineTo(xb+15 *sc  ,yb+(4+9 ) *sc  );
	ctx.lineTo(xb+5  *sc  ,yb+(20-4) *sc  );
	ctx.moveTo(xb+10 *sc  ,yb+15     *sc  );
	ctx.lineTo(xb+13 *sc  ,yb+18     *sc  );
	ctx.stroke();

}

function constrain(num,l,h){
	if(num<l)	return l;
	else if(num>h)	return h;
	else 			return num;
}

function min(num1,num2){
	if(num1<=num2)		return num1;
	else				return num2;
}

function max(num1,num2){
	if(num1>=num2)		return num1;
	else				return num2;
}

function mirror(num, m){
	return m-(num-m);
}

function rpn(){
	return (1-2*(Math.random()<0.5));
}

function inBounds(num,l,h){
	return num>=l&&num<=h;
}

function gad(){
	if(lives>0&&mx<c.width/3)
		ctx.globalAlpha=0.5;
	else
		ctx.globalAlpha=1;
}
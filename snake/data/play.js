function play(){
	if(scene=="welcomeScreen"){
		ctx.drawImage(image,0,0,c.width,c.height);
		for (var i = buttons.length - 1; i >= 0; i--) {
			buttons[i].mouseOver(mouseX,mouseY,0);
		} 
	}else if(scene=="replay"){
		for (var i = buttons.length - 1; i >= 0; i--) {
			buttons[i].mouseOver(mouseX,mouseY,0);
		}
	}else if(scene=="singlePlayer"){
		ctx.fillStyle=bacgroundColor;
		ctx.fillRect(0,0,c.width,c.height);
		snake1.update();
		snake1.display();
		ctx.fillStyle="white";
		for (var i = 0; i < fruits.length; i++) {
			ctx.fillRect(fruits[i].x*scale+scale/4,fruits[i].y*scale+scale/4,scale/2,scale/2);
		}
		ctx.textBaseline="top";
		ctx.textAlign="left"; 
		ctx.fillText("Score: "+snake1.score,0,0);
	}
}
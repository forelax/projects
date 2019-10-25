document.addEventListener("mousemove",function(event){
	mouseX=event.pageX-$("canvas").offset().left;
	mouseY=event.pageY-$("canvas").offset().top;
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].mouseOver(mouseX,mouseY,0);
	}
});
document.addEventListener("mousedown",function(event){
	mouseX=event.pageX-$("canvas").offset().left;
	mouseY=event.pageY-$("canvas").offset().top;
	for (var i = 0; i < buttons.length; i++) {
		if(buttons[i].mouseOver(mouseX,mouseY,1)){
			break;
		}
	}
});
document.addEventListener('keydown', function(event) {
	if(scene=="singlePlayer"){
		if(snake1.canChange){
			if ((event.keyCode == 38||event.keyCode==87)&&snake1.direction!=1) {
				snake1.direction=3;
				snake1.canChange=false;
			}else if ((event.keyCode == 39||event.keyCode==68)&&snake1.direction!=2) {
				snake1.direction=0;
				snake1.canChange=false;
			}else if((event.keyCode==37||event.keyCode==65)&&snake1.direction!=0){
				snake1.direction=2;
				snake1.canChange=false;
			}else if((event.keyCode==40||event.keyCode==83)&&snake1.direction!=3){
				snake1.direction=1;
				snake1.canChange=false;
			}
		}
	}
	if(debuging)
		play();
}, true);

document.addEventListener("mousedown",function(event){
	mouseX=event.pageX-$("canvas").offset().left;
	mouseY=event.pageY-$("canvas").offset().top;
	mouseDown=true;
	if(inputHandler==1){
		for(var i = 0 ; i < buttons.length ; i ++){
			if(buttons[i].contaiment(mouseX,mouseY)){
				buttons[i].onclick();
				break;
			}
		}
	}if(inputHandler==3){
		if(mouseDown){
			var ybpos=Math.floor((mouseY-yoff)/unitSize);
			var xbpos=Math.floor((mouseX-xoff)/unitSize);
			for(var i = -brushSize ; i <= brushSize ; i ++){
				for(var j = -brushSize ; j <= brushSize ; j ++){
					if(Math.abs(i)+Math.abs(j)>brushSize)continue;
					var ypos=ybpos+i;
					var xpos=xbpos+j;
					if(ypos>=0&&ypos<mapH&&xpos>=0&&xpos<mapW){
						map[ypos][xpos]=brush;
					}
				}
			}
		}
	}
	event.preventDefault();
});
document.addEventListener("mouseup",function(event){
	mouseX=event.pageX-$("canvas").offset().left;
	mouseY=event.pageY-$("canvas").offset().top;
	mouseDown=false;
	if(inputHandler==1){
		for(var i = 0 ; i < buttons.length ; i ++){
			if(buttons[i].contaiment(mouseX,mouseY)){
				buttons[i].onclick();
				break;
			}
		}
	}
	event.preventDefault();
});
document.addEventListener("mousemove",function(event){
	mouseX=event.pageX-$("canvas").offset().left;
	mouseY=event.pageY-$("canvas").offset().top;
	if(inputHandler==1){
		for(var i = 0 ; i < buttons.length ; i ++){
			if(buttons[i].contaiment(mouseX,mouseY)){
				buttons[i].over=true;
			}else{
				buttons[i].over=false;
			}
		}
	}else if(inputHandler==3){
		if(mouseDown){
			var ybpos=Math.floor((mouseY-yoff)/unitSize);
			var xbpos=Math.floor((mouseX-xoff)/unitSize);
			for(var i = -brushSize ; i <= brushSize ; i ++){
				for(var j = -brushSize ; j <= brushSize ; j ++){
					if(Math.abs(i)+Math.abs(j)>brushSize)continue;
					var ypos=ybpos+i;
					var xpos=xbpos+j;
					if(ypos>=0&&ypos<mapH&&xpos>=0&&xpos<mapW){
						map[ypos][xpos]=brush;
					}
				}
			}
		}
	}
});
document.addEventListener("keydown",function(event){
	var k = event.keyCode;
	if(inputHandler==2){
		if(k==ub1||k==ub2)
			p.uk=true;
		if(k==db1||k==db2)
			p.dk=true;
		if(k==lb1||k==lb2)
			p.lk=true;
		if(k==rb1||k==rb2)
			p.rk=true;
		if(k==bk)
			p.bk=true;
	}else if(inputHandler==3){
		if(k>=48&&k<48+7)brush=k-48;
		else if(k==qB&&brushSize>0)brushSize--;
		else if(k==eB)brushSize++;
	}
//	event.preventDefault();
});
document.addEventListener("keyup",function(event){
	var k = event.keyCode;
	if(inputHandler==2){
		if(k==ub1||k==ub2)
			p.uk=false;
		if(k==db1||k==db2)
			p.dk=false;
		if(k==lb1||k==lb2)
			p.lk=false;
		if(k==rb1||k==rb2)
			p.rk=false;
		if(k==bk)
			p.bk=false;
	}
//	event.preventDefault();
});
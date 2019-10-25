document.addEventListener("keydown",function(event){
	var v=event.key;
	if(p){
		if(v=="ArrowUp"||v=='w'){
			p.uk=true;
		}else if(v=="ArrowDown"||v=='s'){
			p.dk=true;
		}else if(v=="ArrowLeft"||v=='a'){
			p.lk=true;
		}else if(v=="ArrowRight"||v=='d'){
			p.rk=true;
		}
	}
});
document.addEventListener("keyup",function(event){
	var v=event.key;
	if(p){
		if(v=="ArrowUp"||v=='w'){
			p.uk=false;
		}else if(v=="ArrowDown"||v=='s'){
			p.dk=false;
		}else if(v=="ArrowLeft"||v=='a'){
			p.lk=false;
		}else if(v=="ArrowRight"||v=='d'){
			p.rk=false;
		}
	}
});
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
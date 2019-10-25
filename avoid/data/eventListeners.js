function addEventListeners(){
	document.addEventListener("keydown",function(event){
		var v=event.key;
		if(v=="w"||v=="W"||v=="ArrowUp"){
			p.upKey=true;
		}
		if(v=="s"||v=="S"||v=="ArrowDown"){
			p.downKey=true;
		}
		if(v=="a"||v=="A"||v=="ArrowLeft"){
			p.leftKey=true;
		}
		if(v=="d"||v=="D"||v=="ArrowRight"){
			p.rightKey=true;
		}
	});
	document.addEventListener("keyup",function(event){
		var v=event.key;
		if(v=="w"||v=="W"||v=="ArrowUp"){
			p.upKey=false;
		}
		if(v=="s"||v=="S"||v=="ArrowDown"){
			p.downKey=false;
		}
		if(v=="a"||v=="A"||v=="ArrowLeft"){
			p.leftKey=false;
		}
		if(v=="d"||v=="D"||v=="ArrowRight"){
			p.rightKey=false;
		}
	});
}
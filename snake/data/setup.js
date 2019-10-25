function setup(){
	if(scene=="welcomeScreen"){
		buttons=[];
		buttons.push(new button(1,c.width/2,140,250,50,"clearInterval(interval);scene='singlePlayer';setup();","Play"));
		buttons.push(new button(1,c.width/2,200,250,50,"clearInterval(interval);scene='normal2P';setup();","Two Players Normal"));
		buttons.push(new button(1,c.width/2,260,250,50,"clearInterval(interval);scene='bonus2P';setup();","Two Players Bonus"));
		for (var i = buttons.length - 1; i >= 0; i--) {
			buttons[i].mouseOver();
		}
		interval=setInterval(play,1000/fps);
	}else if(scene=="singlePlayer"){
		buttons=[];
		fieldWidth=c.width/scale;
		fieldHeight=c.height/scale;
		snake1=new Snake(Math.floor(fieldWidth/2),Math.floor(fieldHeight/2));
		snake2=false;
		fruits=[];
		addFruit(fruits);
		if(!debuging)		
			interval=setInterval(play,1000/fps);
	}else if(scene=="normal2P"){

	}else if(scene=="bonus2P"){

	}
}
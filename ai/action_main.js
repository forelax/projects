function action_Main(){
	inputHandler=-1;
	buttons=[];
	buttons.push(new Button(c.width/2,c.height/2,"play",c.width/2,c.height/6,"grey","white","darkgrey","white",function(){
		clearInterval(interval);
		buttons=[];
		action_Play();
	}));
	buttons.push(new Button(c.width/2,3*c.height/4,"settings",c.width/2,c.height/6,"grey","white","darkgrey","white",function(){
		console.log("SORRY NOT IMPLEMENTED YET");
	}));
	this.intervalFunction=function(){
		ctx.drawImage(main_background,0,0,c.width,c.height);
			ctx.font = ((c.height/3)/1.2)+'px Comic Sans MS';
			ctx.textAlign="center"; 
			ctx.textBaseline="middle"; 
			ctx.fillStyle="black";
			ctx.fillText("Slingshot", c.width/2, c.height/6, 3*c.width/4);
		for(var i = 0 ; i < buttons.length ; i++){
			buttons[i].display();
		}
	}
	inputHandler=1;
	interval=setInterval(this.intervalFunction,framerate);
}

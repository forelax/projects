function Ball(x,y,xdir,ydir){
	this.speed=bsp;					this.scale=bsc;
	this.pposx=[];					this.pposy=[];
	this.x=x;						this.xdir=xdir*(Math.pow(2,0.5)/2);
	this.y=y;						this.ydir=ydir*(Math.pow(2,0.5)/2);
	this.update=function(){
		this.pposx.push(this.x);
		if(this.pposx.length>3)		this.pposx.splice(0,1);
		this.pposy.push(this.y);
		if(this.pposy.length>3)		this.pposy.splice(0,1);

		this.p0={x:this.x,y:this.y};
		this.x+=this.speed*this.xdir;
		this.y+=this.speed*this.ydir;
		this.p1={x:this.x,y:this.y};

		this.test();
		this.test2();

		/*<<<WALL INTERACTION*/
		if(this.x<this.scale){
			this.xdir*=-1;
			this.x=mirror(this.x,this.scale);
			lives--;
			ctx.beginPath();
			ctx.lineWidth=2;
			ctx.moveTo(this.x,this.y);
			ctx.lineTo(700-lives*30,15);
			ctx.stroke();
		}else if(this.x>c.width-this.scale){
			this.xdir*=-1;
			this.x=mirror(this.x,c.width-this.scale);
		}
		if(this.y<this.scale){
			this.ydir*=-1;
			this.y=mirror(this.y,this.scale);
		}else if(this.y>c.height-this.scale){
			this.ydir*=-1;
			this.y=mirror(this.y,c.height-this.scale);
		}
		/*WALL INTERACTION>>>*/


		this.p1={x:this.x,y:this.y};
		this.p0={x:this.x-this.xdir*this.speed,y:this.y-this.ydir*this.speed};
		this.test();
		this.test2();
	}
	this.display=function(){
		if(mx>=c.width/3)
			ctx.globalAlpha=0.5;
		ctx.beginPath();
		ctx.fillStyle="black";
		ctx.arc(this.x,this.y,this.scale,0,2*Math.PI);
		ctx.fill();
		if(mx>=c.width/3){
			for(var i = 0 ; i < this.pposx.length ; i++){
				ctx.beginPath();
				ctx.globalAlpha=0.2-(this.pposx.length-i)/20;
				ctx.arc(this.pposx[i],this.pposy[i],this.scale,0,2*Math.PI);
				ctx.fill();
			}
		}
	}

	this.test=function(){
		for(var i = pl.length-1 ; i >= 0 ; i--){
			this.ok=true;
			if(this.ydir<0){
				mp0={x:pl[i].x-plw,y:pl[i].y+plh};
				mp1={x:pl[i].x+plw,y:pl[i].y+plh};
			}else{
				mp0={x:pl[i].x-plw,y:pl[i].y-plh};
				mp1={x:pl[i].x+plw,y:pl[i].y-plh};
			}
			if(segmentIntersect(this.p0,this.p1,mp0,mp1)){
				this.ydir*=-1;
				this.y=mirror(this.y,mp0.y);
				score+=2;
				lives+=0.5;
				ctx.beginPath();
				ctx.moveTo(this.x,this.y);
				ctx.lineTo(700-(lives-1)*30,15);
				ctx.strokeStyle="red";
				ctx.lineWidth=8;
				ctx.stroke();
				floatingText.push(new FloatingText(this.x,this.y,"SuperShot"));
			}
			if(this.xdir<0){
				mp0={x:pl[i].x+plw,y:pl[i].y-plh};
				mp1={x:pl[i].x+plw,y:pl[i].y+plh};
			}else
				continue;
			
			if(segmentIntersect(this.p0,this.p1,mp0,mp1)){
				this.xdir*=-1;
				this.x=mirror(this.x,mp0.x);
				this.ok=false;
				score++;
			}
			if(!this.ok){
				pl.splice(i,1);
			}
		}
	}
	this.test2=function(){
		for(var i = bbpl.length-1 ; i >= 0 ; i--){
			if(this.ydir<0){
				mp0={x:bbpl[i].x-plw*bbpl[i].t/50,y:bbpl[i].y+plh*bbpl[i].t/50};
				mp1={x:bbpl[i].x+plw*bbpl[i].t/50,y:bbpl[i].y+plh*bbpl[i].t/50};
			}else{
				mp0={x:bbpl[i].x-plw*bbpl[i].t/50,y:bbpl[i].y-plh*bbpl[i].t/50};
				mp1={x:bbpl[i].x+plw*bbpl[i].t/50,y:bbpl[i].y-plh*bbpl[i].t/50};
			}
			if(segmentIntersect(this.p0,this.p1,mp0,mp1)){
				this.ydir*=-1;
				this.y=mirror(this.y,mp0.y);
				score+=2;
				lives+=0.5;
				ctx.beginPath();
				ctx.moveTo(this.x,this.y);
				ctx.lineTo(700-(lives-1)*30,15);
				ctx.strokeStyle="red";
				ctx.lineWidth=8;
				ctx.stroke();
				floatingText.push(new FloatingText(this.x,this.y,"SuperShot"));
			}
			if(this.xdir<0){
				mp0={x:bbpl[i].x+plw*bbpl[i].t/50,y:bbpl[i].y-plh*bbpl[i].t/50};
				mp1={x:bbpl[i].x+plw*bbpl[i].t/50,y:bbpl[i].y+plh*bbpl[i].t/50};
			}else
				continue;
			
			if(segmentIntersect(this.p0,this.p1,mp0,mp1)){
				this.xdir*=-1;
				this.x=mirror(this.x,mp0.x);
				this.ok=false;
				bbpl[i].tap++;
				score++;
			}
		}
	}
}

function efectBall(x,y){
	this.x=x;				this.y=y;
	this.speed=bsp/2;		this.scale=bsc/2;
	this.t=50;
	this.xdir=rpn()*Math.random();
	this.ydir=rpn()*((1-Math.pow(Math.pow(this.xdir,2)),0.5));
	this.update=function(){
		this.x+=this.xdir*this.speed;
		this.y+=this.ydir*this.speed;
		this.speed=0.97*this.speed;
		this.t--;
	}
	this.display=function(){
		ctx.beginPath();
		ctx.fillStyle="black";
		ctx.globalAlpha=this.t*2/100;
		ctx.arc(this.x,this.y,this.scale,0,2*Math.PI);
		ctx.fill();
	}
}

function FloatingText(x,y,text){
	this.x=x;
	this.y=y;
	this.text=text;
	this.t=50;
	this.display=function(){
		if(mx<c.width/3)
			this.t--;
		ctx.font="20px Ariel";
		ctx.fillText(this.text,this.x,this.y-50+this.t);
	}
}

function bbpls(x,y,tap){
	this.x=x;
	this.y=y;
	this.t=50;
	this.tap=tap;
	this.display=function(){
		ctx.fillStyle="white";
		ctx.fillRect(this.x-plw*(this.t/50),this.y-plh*(this.t/50),plw*(this.t/50)*2,plh*(this.t/50)*2);
		
		/*ctx.rect(this.x-plw-(1-this.t/50)*plw,this.y-plh-(1-this.t/50)*plh,plw*2+(1-this.t/50)*plw*2,plh*2+(1-this.t/50)*plh*2);
		ctx.strokeStyle='white';
		ctx.lineWidth=this.t/50;
		ctx.stroke();
		ctx.strokeStyle='black';*/

		if(mx<c.width/3||lives<=0)
			this.t--;
	}
}
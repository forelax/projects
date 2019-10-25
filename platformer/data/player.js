function player(col){
	this.x=20;
	this.color=col;
	this.y=c.height-15;
	this.wrx=20;
	this.wry=0;
	this.yvel=0;
	this.xvel=0;
	this.scale=15;
	this.lk=false;
	this.rk=false;
	this.uk=false;
	this.dk=false;
	this.canJump;
	this.jumps=2;
	this.rez=0;
	this.maxJumps=2;
	this.gravity=5;
	this.diving=false;
	this.xSlowRate=10;
	this.xviewRange=20;
	this.yviewRange=15;

	
	this.display=function(){
		ctx.fillStyle=this.color;
		ctx.fillRect(this.x,this.y,this.scale,this.scale);
		ctx.fillStyle="black";
		ctx.beginPath();
		ctx.arc(this.x+this.scale/2,this.y-this.scale/2,this.scale/2,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();
	}
	this.update=function(){
		/*THIS PART MANUPILATES THE WORLD*/
				this.wrx=this.x-wx;
				this.d=this.wrx-c.width+(1+this.xviewRange)*this.scale;
				if(this.d>0){
					if(-wx+ww-c.width<this.d)
						this.d=-wx+ww-c.width;
					ctx.translate(-this.d,0);
					wx+=this.d;
				}
				this.d2=this.xviewRange*this.scale-this.wrx;
				if(this.d2>0){
					if(wx<this.d2)
						this.d2=wx;
					ctx.translate(this.d2,0);
					wx-=this.d2;
				}
				this.wry=this.y-wy;
				this.d=this.wry-c.height+(1+this.yviewRange)*this.scale;
				if(this.d>0){
					if(-wy+wh-c.height<this.d)
						this.d=-wy+wh-c.height;
					ctx.translate(0,-this.d);
					wy+=this.d;
				}
				this.d2=this.yviewRange*this.scale-this.wry;
				if(this.d2>0){
					if(wy<this.d2)
						this.d2=wy;
					ctx.translate(0,this.d2);
					wy-=this.d2;
				}
		/*END OF WORLD MESSING*/


		/*HERE STARTS INPUT READING*/
				if(this.uk){
					if(this.yvel>=0&&this.jumps>0){
						this.yvel=-2*p.scale;
						this.jumps--;
					}
				}
				if(this.dk){
					this.yvel=4*p.scale;
				//	this.xvel=0;
				//	this.diving=true;
					if(this.y<wh-this.scale){
						this.y++;
						this.dk=false;
					}
				}
				if(this.lk){
					this.xvel=-1.5*p.scale;
				}
				if(this.rk){
					this.xvel=1.5*p.scale;
				}
		/*HERE ENDS INPUT READING*/

		/*HERE STARTS X-VELOCITY MANIPULATION*/
				/*HERE I MANIPULATE THE X-POS ACORDING TO THE X-VEL*/
				if(this.xvel>0){
					if(this.x+this.xvel<ww-this.scale){
						this.x+=this.xvel;
					}else{
						this.x=ww-this.scale;
						this.xvel=0;
					}
				}
				if(this.xvel<0){
					if(this.x+this.xvel>0){
						this.x+=this.xvel;
					}else{
						this.x=0;
						this.xvel=0;
					}
				}
				/*HERE I END THE MANIPULATION*/

				/*I USE THIS PART TO SLOW DOWN THE PLAYER ONCE L/R KEYS ARE RELEASED*/
				if(!this.lk&&!this.rk){
					if(this.xvel<0){
						if(this.xvel+this.xSlowRate<0)
							this.xvel+=this.xSlowRate;
						else
							this.xvel=0;
					}else if(this.xvel>0){
						if(this.xvel-this.xSlowRate>0)
							this.xvel-=this.xSlowRate;
						else
							this.xvel=0;
					}
				}
				/*HERE ENDS THE SLOWING DOWN PART*/
		/*HERE ENDS X-VELOCITY MANIPULATION*/


		/*HERE STARTS Y-VELOCITY MANIPULATION*/
				/*HERE STARTS THE Y-POS MANIPILATION*/
				this.pby=wh;
				this.index=-1;
				for(var i = 0 ; i < pl.length ; i ++){
					if(this.x<pl[i].x+200&&this.x+this.scale>pl[i].x){
						if(pl[i].y>=this.y+this.scale){
							if(this.pby>pl[i].y){
								this.pby=pl[i].y;
								this.index=i;
							}
						}
					}
				}
				if(this.yvel>=0){
					if(this.y+this.yvel<this.pby-this.scale){
						this.y+=this.yvel;
					}else{
						this.y=this.pby-this.scale;
						this.jumps=this.maxJumps;
						this.yvel=0;
						if(this.index!=-1){
							if(!pl[this.index].vis){
								this.rez++;
								pl[this.index].color=this.color;
							}
							pl[this.index].vis=true;
							this.y+=pl[this.index].ydir*pl[this.index].speed;
							this.x+=pl[this.index].xdir*pl[this.index].speed;
							this.x=max(this.x,0);
							this.x=min(this.x,ww-this.scale);
						}
					}
				}
				if(this.yvel<0){
					if(this.y+this.yvel>2*this.scale){
						this.y+=this.yvel;
					}else{
						this.y=this.scale;
						this.yvel=0;
					}
				}
				/*HERE ENDS THE Y-CHANGING PART*/

				/*THIS PART STOPS THE PLAYER FROM FLYING OFF INTO SPACE*/
				if(this.y<this.pby-this.scale){
					if(this.yvel<2*p.scale){
						this.yvel+=this.gravity;
					}/*else{
						this.yspeed=2*p.scale;
					}*/
				}
				/*HERE ENDS THE GRAVITY PART*/
		/*HERE ENDS Y-VELOCITY MANIPULATION*/


		/*HERE IS THE MANUPILATION OF VELOCITIES*/
		if(this.yvel!=0){
			this.yvel+=-this.yvel/Math.abs(this.yvel);
		}
		if(this.xvel!=0){
			this.xvel+=-this.xvel/Math.abs(this.xvel);
		}
		/*WITH THIS PART I TRY TO MAKE THE VELOCITIES TO GRAVITATE TOWARD ZERO*/
	};
}
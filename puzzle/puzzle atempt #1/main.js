var c,ctx,mx,my,ba,na,ba1,ba2,mp=false,index=-1,ld,la;
var cr=[];
function pl(x,y,a){
	this.x=x;
	this.y=y;
	this.a=a;
	this.da=a;
	this.r=115;
	this.display=function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x+this.r*Math.cos(this.da),this.y+this.r*Math.sin(this.da));
		ctx.stroke();
	}
}
function start(){
	c=document.createElement("canvas");
	c.style="border:1px solid #000000;"
	c.width=720;
	c.height=480;
	document.body.insertBefore (c,document.body.childNodes[0]);
	ctx=c.getContext("2d");
	cr.push(new pl(115+5,115+5,Math.floor(Math.random()*4)/2*Math.PI));
	cr.push(new pl(115*3+10,115+5,Math.floor(Math.random()*4)/2*Math.PI));
	cr.push(new pl(115*5-10,115*2+5+2,Math.floor(Math.random()*4)/2*Math.PI));
	cr.push(new pl(115*3+10,115*3+10,Math.floor(Math.random()*4)/2*Math.PI));
	cr.push(new pl(115+5,115*3+10,Math.floor(Math.random()*4)/2*Math.PI));
	var interval=setInterval(play,50);
}

function play(){
	ctx.clearRect(0,0,c.width,c.height);
	ctx.fillStyle="red";
	ctx.strokeStyle="yellow";
	ctx.lineWidth=2;
	for (var j = 0; j < cr.length; j++) 
		cr[j].display();
	if(mp){
		ctx.beginPath();
	ctx.fillStyle="yellow";
		ctx.arc(cr[index].x+ld*Math.cos(la),cr[index].y+ld*Math.sin(la),4,0,2*Math.PI);
		ctx.fill();
	}
}

document.addEventListener("mousedown",function(event){
	mx=event.pageX-$("canvas").offset().left;
	my=event.pageY-$("canvas").offset().top;
	for(var i = 0 ; i < cr.length ; i ++){
		var d=((cr[i].x-mx)**2+(cr[i].y-my)**2)**(1/2);
		if(d<=cr[i].r){
			ld=d;
			index=i;
			na=angle(cr[index].x,cr[index].y,mx,my);
			la=na;
			mp=true;
/*
			ctx.beginPath();
			ctx.moveTo(cr[i].x,cr[i].y);
			ctx.lineTo(cr[i].x+cr[i].r,cr[i].y);
			ctx.arc(cr[i].x,cr[i].y,cr[i].r,0,ba);
			ctx.lineTo(cr[i].x,cr[i].y);
			ctx.fillStyle="yellow";
			ctx.fill();

			ctx.globalAlpha=0.5;

			ctx.beginPath();
			ctx.moveTo(cr[i].x,cr[i].y);
			ctx.lineTo(cr[i].x+cr[i].r,cr[i].y);
			ctx.arc(cr[i].x,cr[i].y,cr[i].r,0,ba1);
			ctx.lineTo(cr[i].x,cr[i].y);
			ctx.fillStyle="yellow";
			ctx.fill();


			ctx.beginPath();
			ctx.moveTo(cr[i].x,cr[i].y);
			ctx.lineTo(cr[i].x+cr[i].r,cr[i].y);
			ctx.arc(cr[i].x,cr[i].y,cr[i].r,0,ba2);
			ctx.lineTo(cr[i].x,cr[i].y);
			ctx.fillStyle="blue";
			ctx.fill();


			ctx.globalAlpha=1;

			ctx.fillStyle="red";
			ctx.beginPath();
			ctx.arc(mx,my,5,0,2*Math.PI);
			ctx.fill();
			break;
*/
		}
	}
});

document.addEventListener("mouseup",function(event){
	mp=false;
	for (var i = 0; i < cr.length; i++) {
		cr[i].a=cr[i].da;
	}
	index=-1;
});

document.addEventListener("mousemove",function(event){
	mx=event.pageX-$("canvas").offset().left;
	my=event.pageY-$("canvas").offset().top;
	if(mp){
		ba=na;
		na=angle(cr[index].x,cr[index].y,mx,my);
		cr[index].a+=na-ba;
		if(cr[index].a-cr[index].da>Math.PI/4){
			cr[index].da+=Math.PI/2;
			la+=Math.PI/2;
		}
		if(cr[index].a-cr[index].da<-Math.PI/4){
			cr[index].da-=Math.PI/2;
			la-=Math.PI/2;
		}
		var index1=index-1;if(index1<0)index1+=cr.length;
		var index2=index+1;if(index2>cr.length-1)index2-=cr.length;
		cr[index1].a+=na-ba;
		if(cr[index1].a-cr[index1].da>Math.PI/4){
			cr[index1].da+=Math.PI/2;
		}
		if(cr[index1].a-cr[index1].da<-Math.PI/4){
			cr[index1].da-=Math.PI/2;
		}
		cr[index2].a+=na-ba;
		if(cr[index2].a-cr[index2].da>Math.PI/4){
			cr[index2].da+=Math.PI/2;
		}
		if(cr[index2].a-cr[index2].da<-Math.PI/4){
			cr[index2].da-=Math.PI/2;
		}

	}
});

function angle(fx,fy,sx,sy){
	var arsn=0.00000000001;
	var ba,
		d=((fx-sx)**2+(fy-sy)**2)**(1/2),
		a = sx-fx,
		b = sy-fy,
		ba1=Math.asin(b/d),
		ba2=Math.acos(a/d);
	if(Math.abs(ba1-ba2)<arsn)
		ba=ba1;
	else if(Math.abs(ba1+ba2-Math.PI)<arsn){
		ba=ba2;
	}else if(Math.abs(ba1+ba2)<arsn){
		ba=2*Math.PI-ba2;
	}else if(Math.abs(-ba1+ba2-Math.PI)<arsn){
		ba=Math.PI-ba1;
	}
	return ba;
}
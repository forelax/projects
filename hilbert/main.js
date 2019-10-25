var c,ctx,hilb,dir;
function getBX(x,y,a,o){
	return x+a/8+(o==1||o==2)*3*(1/4)*a;
}
function getEX(x,y,a,o){
	return x+a/8+(o==3||o==2)*3*(1/4)*a;
}
function getBY(x,y,a,o){
	return y+a/8+(o==3||o==2)*3*(1/4)*a;
}
function getEY(x,y,a,o){
	return y+a/8+(o==3||o==0)*3*(1/4)*a;
}
function getP(cp,o,a) {
	var np={x:cp.x+a*((o==0)-(o==2)),
			y:cp.y+a*((o==1)-(o==3))};
	return np;
}
function line(a,b){
	ctx.beginPath();
	ctx.moveTo(a.x,a.y);
	ctx.lineTo(b.x,b.y);
	ctx.stroke();
}
function func(x,y,a,o,b,e){
	this.x=x;
	this.y=y;
	this.a=a;
	this.o=o;
	this.b=b;
	this.e=e;
	this.draw=function(){
		var bx=getBX(this.x,this.y,this.a,this.o);
		var ex=getEX(this.x,this.y,this.a,this.o);
		var by=getBY(this.x,this.y,this.a,this.o);
		var ey=getEY(this.x,this.y,this.a,this.o);
		var cp={x:bx,y:by};
		var np={};var no=this.o;
		for(var i = 0 ; i < dir.length ; i ++){
			no+=dir[i];no=(no+4)%4;
			np=getP(cp,no,this.a/4);
			line(np,cp);
			cp=np;
		}
		var bep=getP({x:bx,y:by},b,a/4);
		var ebp=getP({x:ex,y:ey},e,a/4);
		line({x:bx,y:by},bep);
		line({x:ex,y:ey},ebp);
	}
}
function start(){
	c=document.getElementById("canvas");
	ctx=c.getContext("2d");
	hilb=[];
	dir=[1,-1,-1,1,0,1,1,-1,-1,1,1,0,1,-1,-1];
	hilb.push(new func(0,0,c.height,3,-1,-1));
	document.addEventListener('keypress',function(event){crab();});
}
function crab(){
	ctx.clearRect(0,0,c.width,c.height);
	for(var i = hilb.length-1 ; i >= 0 ; i --){
		hilb[i].draw();
		hilb.push(new func(hilb[i].x+(hilb[i].o==1||hilb[i].o==2)*hilb[i].a/2                ,hilb[i].y-(hilb[i].o==1||hilb[i].o==0)*hilb[i].a/2   +hilb[i].a/2  ,hilb[i].a/2  ,(hilb[i].o+1)%4  ,hilb[i].o        ,hilb[i].b        ));
		hilb.push(new func(hilb[i].x-(hilb[i].o==1||hilb[i].o==2)*hilb[i].a/2+  hilb[i].a/2  ,hilb[i].y+(hilb[i].o==1||hilb[i].o==0)*hilb[i].a/2                 ,hilb[i].a/2  ,hilb[i].o        ,(hilb[i].o+3)%4  ,(hilb[i].o+2)%4  ));
		hilb.push(new func(hilb[i].x-(hilb[i].o==1||hilb[i].o==0)*hilb[i].a/2+  hilb[i].a/2  ,hilb[i].y-(hilb[i].o==1||hilb[i].o==2)*hilb[i].a/2   +hilb[i].a/2  ,hilb[i].a/2  ,(hilb[i].o+3)%4  ,hilb[i].e        ,hilb[i].o        ));
		hilb[i] = new func(hilb[i].x+(hilb[i].o==1||hilb[i].o==0)*hilb[i].a/2                ,hilb[i].y+(hilb[i].o==1||hilb[i].o==2)*hilb[i].a/2                 ,hilb[i].a/2  ,hilb[i].o        ,(hilb[i].o+2)%4  ,(hilb[i].o+1)%4  ) ;
	}
}
var f;
var w,h,l,chance,il,jl,n,d;
var canvas,ctx,width,height;
var interval;
var fil,fjl,fn,fd;
var cool=true,checked;
var counter=0;

function draw(bcg){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.strokeStyle="#FFFFFF";


	if(bcg){
		ctx.lineWidth=0.25;

		for(var i = 0 ; i < h ; i ++){
			for(var j = 0 ; j < l ; j ++){
				ctx.beginPath();
					ctx.arc(j*w,i*w,w,0,(1/2)*Math.PI);
					ctx.arc(j*w,i*w,w,(1/2)*Math.PI,Math.PI);
					ctx.arc(j*w,i*w,w,Math.PI,(3/2)*Math.PI);
					ctx.arc(j*w,i*w,w,(3/2)*Math.PI,2*Math.PI);
				ctx.stroke();
			}
		}
	}
	ctx.lineWidth=2;


	for(var i = 0 ; i < h ; i ++){
		for(var j = 0 ; j < l ; j ++){
			ctx.beginPath();
			if(f[i][j][0])
				ctx.arc(j*w,i*w,w,0,(1/2)*Math.PI);
			ctx.stroke();
			ctx.beginPath();
			if(f[i][j][1])
				ctx.arc(j*w,i*w,w,(1/2)*Math.PI,Math.PI);
			ctx.stroke();
			ctx.beginPath();
			if(f[i][j][2])
				ctx.arc(j*w,i*w,w,Math.PI,(3/2)*Math.PI);
			ctx.stroke();
			ctx.beginPath();
			if(f[i][j][3])
				ctx.arc(j*w,i*w,w,(3/2)*Math.PI,2*Math.PI);
			ctx.stroke();
		}
	}
}

var goodPoint = function(ilc,jlc){
	if(ilc>=0&&ilc<h&&jlc>=0&&jlc<l)
		return true;
	else 
		return false;
}

var valid2 = function( iloc,jloc,nn ){
	var i0,i1,i2,i3;
	var j0,j1,j2,j3;
	if(nn==1)
		jloc--;
	else if(nn==2){
		iloc--;
		jloc--;
	}else if(nn==3)
		iloc--;
	i0=iloc;		j0=jloc;
	i1=iloc;		j1=jloc+1;
	i2=iloc+1;		j2=jloc+1;
	i3=iloc+1;		j3=jloc;

/*
	if(pr){
			ctx.lineWidth=3;
			ctx.strokeStyle="red";
			ctx.beginPath();
				ctx.arc(j0*w,i0*w,w,0,(1/2)*Math.PI);
			ctx.stroke();
			ctx.beginPath();
				ctx.arc(j1*w,i1*w,w,(1/2)*Math.PI,Math.PI);
			ctx.stroke();
			ctx.beginPath();
				ctx.arc(j2*w,i2*w,w,Math.PI,(3/2)*Math.PI);
			ctx.stroke();
			ctx.beginPath();
				ctx.arc(j3*w,i3*w,w,(3/2)*Math.PI,2*Math.PI);
			ctx.stroke();
			ctx.strokeStyle="black";
	}
*/
	if(goodPoint(i0,j0)&&f[i0][j0][0])
		return false;
	if(goodPoint(i1,j1)&&f[i1][j1][1])
		return false;
	if(goodPoint(i2,j2)&&f[i2][j2][2])
		return false;
	if(goodPoint(i3,j3)&&f[i3][j3][3])
		return false;
	return true;
}


var valid = function (iloc,jloc,nch,dir){
	if(goodPoint(iloc,jloc)){
		var n4=nch+(d==0)*(1-4*(nch>2))+(d==1)*(3-4*(nch>0)),
			n5=n+(d==0)*(1-4*(n>2))+(d==1)*(3-4*(n>0));
		var i1=iloc+(nch==1)-(nch==3),
			j1=jloc+(nch==0)-(nch==2),
			n1=nch+1-(nch>2);
		var i2=iloc+(nch==0||nch==1)-(nch==2||nch==3),
			j2=jloc+(nch==0||nch==3)-(nch==1||nch==2),
			n2=nch+2-(nch>1);
		var i3=iloc+(nch==0)-(nch==2),
			j3=jloc+(nch==3)-(nch==1),
			n3=nch+3-(nch>0);
//		var i6=il+((d==0&&(nch==0||nch==3))||(d==1&(nch==2||nch==1)))-((d==0&&(nch==1||nch==2))||(d==1&&(nch==0||nch==3))),
//			j6=lj+((d==0&&(nch==2||nch==3))||(d==1&(nch==0||nch==1)))-((d==0&&(nch==1||nch==0))||(d==1&&(nch==2||nch==3))),
//			n6_1=n+(d==0)*(3-4*(n>0))+(d==1)*(1-4*(n>2)),
//			n6_2=n;
		var one=false,
			two=false,
			three=false,
			four=false,
			five=false,
			six=false;
		if(goodPoint(i1,j1)&&f[i1][j1][n1])
			one=true;
		if(goodPoint(i2,j2)&&f[i2][j2][n2])
			two=true;
		if(goodPoint(i3,j3)&&f[i3][j3][n3])
			three=true;
		four=f[iloc][jloc][nch];
		if(f[iloc][jloc][n4]&&f[il][jl][n5])
			five=true;
		if(!valid2(iloc,jloc,nch))
			six=true;
		if(one||two||three||four||five||six)
			return false;
		else
			return true;
	}
	else{
		return false;
	}
}


var nextInt =function(){
	il=fil;
	jl=fjl;
	d=fd;
	n=fn;

	interval = setInterval(ddo,50);
}

function nextt(){
	f[il][jl][n]=true;
	var i1=il,
		j1=jl,
		d1=d,
		n1=n+(d==0)*(1-4*(n>2))+(d==1)*(3-4*(n>0));

	var i2=il+2*(d==n)-2*(d==(n-2)),
		j2=jl+2*((d==0&&n==3)||(d==1&&n==0))-2*(d==n-1),
		d2=(d+1)%2;
		n2=n+2-4*(n>1);
	var	one=valid(i1,j1,n1,d1),
		two=valid(i2,j2,n2,d2);
	if((one&&two&&Math.random()<(1/2))||((!two)&&one)){
		il=i1;
		jl=j1;
		d=d1;
		n=n1;
	}else if(two){
		il=i2;
		jl=j2;
		d=d2;
		n=n2;			
	}else{
		clearInterval(interval);
		if(cool){
			fd=(fd+1)%2;
			nextInt();
			cool=false;
		}else{
			ctx.strokeStyle-=30;
			cool = true;
			checked=false;
			while(true){
				fil=Math.floor(Math.random()*h);
				fjl=Math.floor(Math.random()*l);
				fn=Math.floor(Math.random()*3);
				fd=Math.floor(Math.random()*2);
				if(valid2(fil,fjl,fn)){
					break;
				}
			}
			counter++;
			if(counter<15)
				nextInt();
		}
	}
}

function ddo(){
	draw(true);
	nextt();
}

start = function() {
	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	width = canvas.width  , //window.innerWidth,
	height = canvas.height  ; //window.innerHeight;
	document.body.insertBefore (canvas,document.body.childNodes[0]);



	w=40;
	h=Math.ceil(canvas.height/w)+1;
	l=Math.ceil(canvas.width/w)+1;
	chance=0.8;
	fil=Math.floor(Math.random()*h);
	fjl=Math.floor(Math.random()*l);
	fn=Math.floor(Math.random()*3);
	fd=Math.floor(Math.random()*2);

	f = new Array(h);
	for(var i = 0 ; i < h ; i ++)
		f[i] = new Array(l);

	for(var i = 0 ; i < h ; i ++){
		for(var j = 0 ; j < l ; j ++){
			f[i][j]=[false,false,false,false];
			/*
			if(i%2==0){
				if(i%4==0){
					if(j%4==0){
						f[i][j].br=1;
						f[i][j].bl=1;
					}else if(j%4==2){
						f[i][j].ur=1;
						f[i][j].ul=1;
					}
				}else{
					if(j%4==2){
						f[i][j].br=1;
						f[i][j].bl=1;
					}else if(j%4==0){
						f[i][j].ur=1;
						f[i][j].ul=1;
					}
				}
			}
			if(i%2==1){
				if(i%4==1){
					if(j%4==2){
						f[i][j].ul=1;
						f[i][j].ur=1;
						f[i][j].bl=1;
						f[i][j].br=1;
					}
				}else{
					if(j%4==0){
						f[i][j].ul=1;
						f[i][j].ur=1;
						f[i][j].bl=1;
						f[i][j].br=1;	
					}
				}
			}
			*/
		}
	}

	nextInt();

}
/*
	var valid = function(iloc,jloc,n){
//		console.log(iloc,jloc,n);
		if(iloc>0&&iloc<h&&jloc>0&&jloc<l){
//			console.log("sofar");
			if(n==0){
//				console.log("here 0 ");
				if(!f[iloc][jloc].br)
				if(iloc<h-1&&jloc<l-1){
//					console.log("further");
					if(!f[iloc+1][jloc].ur&&!f[iloc][jloc+1].bl){
						return true;
					}
				}
			}else if(n==1){
//				console.log("here 1 ");
				if(!f[iloc][jloc].bl)
				if(iloc<h-1&&jloc>0){
//					console.log("further");
					if(!f[iloc+1][jloc].ul&&!f[iloc][jloc-1].br){
						return true;
					}
				}
			}else if(n==2){
//				console.log("here 2 ");
				if(!f[iloc][jloc].ul)
				if(iloc>0&&jloc>0){
//					console.log("further");
					if(!f[iloc-1][jloc].bl&&!f[iloc][jloc-1].ur){
						return true;
					}
				}
			}else if(n==3){
//				console.log("here 3 ");
				if(!f[iloc][jloc].ur)
				if(iloc>0&&jloc<l-1){
//					console.log("further");
					if(!f[iloc-1][jloc].br&&!f[iloc][jloc+1].ul){
						return true;
					}
				}
			}
		}
//		console.log("not true");
		return false;
	}


*/

/*
	while(true){
		if(n==0)
			f[iloc][jloc].br=true;
		else if(n==1)
			f[iloc][jloc].bl=true;
		else if(n==2)
			f[iloc][jloc].ul=true;
		else if(n==3)
			f[iloc][jloc].ur=true;

		if(d==0){
			n1=n-1;		if(n1<0)n1+=4;
			n2=n-2;		if(n2<0)n2+=4;
			ji=(n==1)*2+(n==3)*(-2);
			ii=(n==2)*2+(n==0)*(-2);
		}else if(d==1){
			n1=n+1;		if(n1>3)n1-=4;
			n2=n+2;		if(n2>3)n2-=4;
			ii=(n==1)*2+(n==3)*(-2);
			ji=(n==0)*2+(n==2)*(-2);
		}

		one=valid( iloc,jloc,n1 );
		two=valid(iloc+ii,jloc+ji,n2);
//		console.log(one,two);
		if(one&&two){
			if(Math.random()<0.5){
				one = false;
			}else{
				two = false;
			}
		}

		if(one){
			n=n1;
		}else if(two){
			n=n2;
			d+=1;
			d%=2;
			iloc+=ii;
			jloc+=ji;
		}else{
			break;
		}

		if(n==0){
			f[iloc][jloc].dr=1;
		}else if(n==1){
			f[iloc][jloc].dl=1;
		}else if(n==2){
			f[iloc][jloc].ul=1;
		}else if(n==3){
			f[iloc][jloc].ur=1;
		}
		console.log("next");
		draw();
	};
//		clearInterval(myVar);


*/




/*	document.body.addEventListener("mousemove", function(event) {
		mouseX=event.clientX;
		mouseY=event.clientY;
		
		draw();
	});
	document.addEventListener("keydown", function(event){
		
	});*/

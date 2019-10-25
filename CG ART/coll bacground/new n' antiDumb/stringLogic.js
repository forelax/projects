var f,st;
var w,h,l;
var canvas,ctx,width,height;
var interval;
var counter=15;
var si,sj,sn,sd;
var ni,nj,nn,nd,how=false;

function start() {
	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	width = canvas.width  = window.innerWidth,
	height = canvas.height = window.innerHeight;

	w=40;
	h=Math.ceil(canvas.height/w)+1;
	l=Math.ceil(canvas.width/w)+1;

	st= new Array( );
	f = new Array(h);
	for(var i = 0 ; i < h ; i ++)
		f[i] = new Array(l);

	for(var i = 0 ; i < h ; i ++){
		for(var j = 0 ; j < l ; j ++){
			f[i][j]=[false,false,false,false,false];
		}
	}
	doStuff();
}

function drawEl(i,j,n){
	ctx.beginPath();
	if(n==0){
		ctx.arc(i*w-w/2,j*w-w/2,w,0,1/2*Math.PI);
	}else if(n==1){
		ctx.arc(i*w+w/2,j*w-w/2,w,1/2*Math.PI,Math.PI);
	}else if(n==2){
		ctx.arc(i*w+w/2,j*w+w/2,w,Math.PI,3/2*Math.PI);
	}else if(n==3){
		ctx.arc(i*w-w/2,j*w+w/2,w,3/2*Math.PI,2*Math.PI);
	}
	ctx.stroke();
}
function draw(bcg){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.strokeStyle="#FFFFFF";

	if(/*bcg*/true){
		for(var i = 0 ; i < h ; i ++){
			for(var j = 0 ; j < l ; j ++){
				for(var k = 0 ; k < 4 ; k ++){
					if(!f[i][j][k])
						ctx.lineWidth=0.25;
					else
						ctx.lineWidth=2;
					drawEl(j,i,k);
				}
			}
		}
	}
}
function inBounds(num,lb,hb){
	return (num>=lb)&&(num<hb);
}
function iFunc(n,d,b){
	if(!d){
		if(!b){
			switch(n){
				case 0:return 0;
				case 1:return -1;
				case 2:return 0;
				case 3:return 1;
			}
		}else{
			switch(n){
				case 0:return 1;
				case 1:return -1;
				case 2:return -1;
				case 3:return 1;
			}
		}
	}else{
		if(!b){
			switch(n){
				case 0:return -1;
				case 1:return 0;
				case 2:return 1;
				case 3:return 0;
			}
		}else{
			switch(n){
				case 0:return -1;
				case 1:return 1;
				case 2:return 1;
				case 3:return -1;
			}
		}
	}
}
function jFunc(n,d,b){
	if(!d){
		if(!b){
			switch(n){
				case 0:return -1;
				case 1:return 0;
				case 2:return 1;
				case 3:return 0;
			}
		}else{
			switch(n){
				case 0:return -1;
				case 1:return -1;
				case 2:return 1;
				case 3:return 1;
			}
		}
	}else{
		if(!b){
			switch(n){
				case 0:return 0;
				case 1:return 1;
				case 2:return 0;
				case 3:return -1;
			}
		}else{
			switch(n){
				case 0:return 1;
				case 1:return 1;
				case 2:return -1;
				case 3:return -1;
			}
		}
	}
}
function nFunc(n,d,b){
	if(!d){
		if(!b){
			switch(n){
				case 0:return 1;
				case 1:return 2;
				case 2:return 3;
				case 3:return 0;
			}
		}else{
			switch(n){
				case 0:return 2;
				case 1:return 3;
				case 2:return 0;
				case 3:return 1;
			}
		}
	}else{
		if(!b){
			switch(n){
				case 0:return 3;
				case 1:return 0;
				case 2:return 1;
				case 3:return 2;
			}
		}else{
			switch(n){
				case 0:return 2;
				case 1:return 3;
				case 2:return 0;
				case 3:return 1;
			}
		}
	}
}
function dFunc(n,d,b){
	return !b;
}
function step(i,j,n,d){
	ni0=i+iFunc(n,d,0);
	ni1=i+iFunc(n,d,1);
	nj0=j+jFunc(n,d,0);
	nj1=j+jFunc(n,d,1);
	nn0=nFunc(n,d,0);
	nn1=nFunc(n,d,1);
	nd0=dFunc(n,d,0);
	nd1=dFunc(n,d,1);
	var order=-1;
	if( (inBounds(ni0,0,h)&&inBounds(nj0,0,w)&&!f[ni0][nj0][4])&&
	    (inBounds(ni1,0,h)&&inBounds(nj1,0,w)&&!f[ni1][nj0][4]) ){
		if(Math.random()<0.5){
			order=1;
		}else{
			order=0;
		}
	}else if( (!(inBounds(ni0,0,h)&&inBounds(nj0,0,w))|| f[ni0][nj0][4])&&
	          (inBounds(ni1,0,h)&&inBounds(nj1,0,w)&&!f[ni1][nj0][4]) ){
		order=1;
	}else if( (inBounds(ni0,0,h)&&inBounds(nj0,0,w)&&!f[ni0][nj0][4])&&
	          (!(inBounds(ni1,0,h)&&inBounds(nj1,0,w))||f[ni1][nj0][4]) ){
		order=0;
	}else{
		how=false;
		return;
	}
	if(order==1){
		f[ni0][nj0][nn0]=true;
		f[ni0][nj0][4]=true;
		ni=ni0;
		nj=nj0;
		nn=nn0;
		nd=nd0;
		how=true;
	}else if(order==0){
		f[ni1][nj1][nn1]=true;
		f[ni1][nj1][4]=true;
		ni=ni1;
		nj=nj1;
		nn=nn1;
		nd=nd1;
		how=true;
	}
}
function doStuff(){
	if(counter>0){
		si=Math.floor(Math.random()*h);
		sj=Math.floor(Math.random()*l);
		sn=Math.floor(Math.random()*4);
		if(!f[si][sj][4]){
			f[si][sj][sn]=true;
			step(si,sj,sn,1);
			while(how){
				step(ni,nj,nn,nd);
			}
			step(si,sj,sn,0);
			while(how){
				step(ni,nj,nn,nd);
			}
			counter--;
		}
		doStuff();
	}else{
		interval = setInterval(add,1000/30);
	}
}
function add(){
	if(counter<st.length){
		f[st[counter].i][st[counter].j][st[counter].n]=true;
		counter++;
		draw();
	}
}
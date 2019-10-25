var c = document.getElementById("canvas"),
	ctx=c.getContext("2d");
var f,helpArray,scale=20,height,width,interval;
function setup(){
	height=c.height/scale;
	width=c.width/scale;
	f=new Array(height);
	for(var i = 0 ; i < height ; i ++){
		f[i]=new Array(width);
		for (var j = 0; j < width; j++) {
			f[i][j]=0;
		}
	}
	helpArray=new Array(height);
	for(var i = 0 ; i < height ; i ++){
		helpArray[i]=new Array(width);
		for(var j = 0 ; j < width ; j ++){
			helpArray[i][j]=0;
		}
	}
	display();
}
function updateHelpArray(){
	for(var i = 0 ; i < height ; i ++){
		for(var j = 0 ; j < width ; j ++){
			helpArray[i][j]=f[i][j];
		}
	}
	for(var i = 0 ; i < height ; i ++){
		for (var j = 0; j < width; j++) {
			var num1=0,num2=0;
			for(var ii=-1 ; ii<2 ; ii++){
				for (var ji=-1 ; ji<2 ; ji++) {
					if(ii==0&&ji==0)continue;
					if(i+ii>=0&&j+ji>=0&&i+ii<height&&j+ji<width){
						if(f[i+ii][j+ji]==1){
							num1++;
						}else if(f[i+ii][j+ji]==2){
							num2++;
						}
					}
				}
			}
			if(f[i][j]==0){
				if(num1+num2==3){
					if(num1>num2)
						helpArray[i][j]=1;
					else
						helpArray[i][j]=2;
				}
			}else{
				if((num1+num2<2)||(num1+num2>3)){
					helpArray[i][j]=0;
				}
			}
		}
	}
}
function update(){
	for(var i = 0 ; i < height ; i ++){
		for(var j = 0 ; j < width ; j ++){
			helpArray[i][j]=f[i][j];
		}
	}
	for(var i = 0 ; i < height ; i ++){
		for (var j = 0; j < width; j++) {
			var num1=0,num2=0;
			for(var ii=-1 ; ii<2 ; ii++){
				for (var ji=-1 ; ji<2 ; ji++) {
					if(ii==0&&ji==0)continue;
					if(i+ii>=0&&j+ji>=0&&i+ii<height&&j+ji<width){
						if(helpArray[i+ii][j+ji]==1){
							num1++;
						}else if(helpArray[i+ii][j+ji]==2){
							num2++;
						}
					}
				}
			}
			if(helpArray[i][j]==0){
				if(num1+num2==3){
					if(num1>num2)
						f[i][j]=1;
					else
						f[i][j]=2;
				}
			}else{
				if(num1+num2<2||num1+num2>3){
					f[i][j]=0;
				}
			}
		}
	}
}
function display(){
	for(var i = 0 ; i < height ; i ++){
		for (var j = 0; j < width; j++) {
			if(f[i][j]==0){
				ctx.fillStyle="rgb(27,27,27)";
			}else if(f[i][j]==1){
				ctx.fillStyle="blue";
			}else if(f[i][j]==2){
				ctx.fillStyle="red";
			}
			ctx.fillRect(j*scale,i*scale,scale,scale);
		}
	}
	for(var i = 0 ; i < height ; i ++){
		for (var j = 0; j < width; j++) {
			if(helpArray[i][j]==0){
				ctx.fillStyle="rgb(27,27,27)";
			}else if(helpArray[i][j]==1){
				ctx.fillStyle="blue";
			}else if(helpArray[i][j]==2){
				ctx.fillStyle="red";
			}
			ctx.fillRect(j*scale+scale/2-scale/10,i*scale+scale/2-scale/10,scale/5,scale/5);
		}
	}
	ctx.strokeStyle="black";
	ctx.lineWidth=scale/10;
	for(var i = 0 ; i <= height ; i ++){
		ctx.beginPath();
		ctx.moveTo(0,i*scale);
		ctx.lineTo(c.width,i*scale);
		ctx.stroke();
	}
	for (var i = 0; i <= width; i++) {
		ctx.beginPath();
		ctx.moveTo(i*scale,0);
		ctx.lineTo(i*scale,c.height);
		ctx.stroke();
	}
	ctx.globalAlpha=0.05;
	ctx.strokeStyle="white";
	ctx.beginPath();
	ctx.moveTo(c.width/2,0);
	ctx.lineTo(c.width/2,c.height);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0,c.height/2);
	ctx.lineTo(c.width,c.height/2);
	ctx.stroke();
	ctx.globalAlpha=1;
}
c.addEventListener("mousedown",function(event){
	mx=event.pageX-$("canvas").offset().left;
	my=event.pageY-$("canvas").offset().top;
	var x=Math.floor(mx/scale),
		y=Math.floor(my/scale);
	if(f[y][x]>0)
		f[y][x]=0;
	else if(f[y][x]==0)
		f[y][x]=event.button+1;
	updateHelpArray();
	display();
});
document.addEventListener("keypress",function(event){
	if(event.key==' '){
		update();
		updateHelpArray();
		display();
	}
	console.log("you touched my keys");
});
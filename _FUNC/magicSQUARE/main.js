var c,ctx,comb;
function start(){
	c=document.getElementById('canvas');c.width=720;c.height=480;
	ctx=c.getContext('2d');
	comb=[];
	check();
	var scale=40;
	for(var i = 0 ; i < comb.length ; i ++){
		draw(comb[i],(i%Math.floor(c.width/(4*scale)))*4*scale,Math.floor(i/Math.floor(c.width/(4*scale)))*4*scale,scale);
		
	}
}
function draw(a,x,y,sc){
	for(var i = 0 ; i < 4 ; i ++){
		for (var j = 0; j < 4 ; j++) {
			ctx.beginPath();
			ctx.moveTo(x+i*sc,y);
			ctx.lineTo(x+i*sc,y+3*sc);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(x,y+j*sc);
			ctx.lineTo(x+3*sc,y+j*sc);
			ctx.stroke();
		}
	}
	var f=[false,false,false,
		   false,false,false,
		   false,false,false];
	f[a.i]=true;
	f[a.j]=true;
	f[a.k]=true;
	for(var i = 0 ; i < 3 ; i ++){
		for (var j = 0; j < 3 ; j++) {
			if(f[i*3+j]){
				ctx.beginPath();
				ctx.arc(x+i*sc+sc/2,y+j*sc+sc/2,sc/8,0,2*Math.PI);
				ctx.fill();
			}
		}
	}
}

function similar(a,b){
	var ac=[],bc=[];
	ac.push(a.i,a.j,a.k);
	bc.push(b.i,b.j,b.k);
	for(var k = 0 ; k < 2 ; k ++){
		for(var i = 0 ; i < 4 ; i ++){
			bc.sort();
			if(ac[0]==bc[0]&&ac[1]==bc[1]&&ac[2]==bc[2]){
				return true;
			}
			for(var j = 0 ; j < 3 ; j ++){
				bc[j]=transform(bc[j]);
			}
		}
		for(var j = 0 ; j < 3 ; j ++){
			bc[j]=transform2(bc[j]);
		}
	}
	return false;
}

function check(){
	for(var i = 0 ; i < 9 ; i ++){
		for(var j = i+1 ; j < 9 ; j ++){
			for(var k = j+1 ; k < 9 ; k++){
				var ccomb=[];
				for(var l = 0 ; l < 9 ; l ++){
					ccomb.push(false);
				}
				ccomb[i]=true;
				ccomb[j]=true;
				ccomb[k]=true;
				var change=true;
				while(change){
					change=false;
					for(var o = 0 ; o < 3 ; o ++){
						var counter=0;
						for(var p = 0 ; p < 3 ; p ++){
							if(ccomb[o*3+p])
								counter++;
						}
						if(counter==2){
							for(var p = 0 ; p < 3 ; p ++){
								ccomb[o*3+p]=true;
							}
							change=true;
						}
					}
					for(var o = 0 ; o < 3 ; o ++){
						var counter=0;
						for(var p = 0 ; p < 3 ; p ++){
							if(ccomb[o+p*3])
								counter++;
						}
						if(counter==2){
							for(var p = 0 ; p < 3 ; p ++){
								ccomb[o+p*3]=true;
							}
							change=true;
						}
					}
					var counter=0;
					for(var o = 0 ; o < 3 ; o ++){
						if(ccomb[o+o*3])
							counter++;
					}
					if(counter==2){
						for(var o = 0 ; o < 3 ; o ++){
							ccomb[o*3+o]=true;
						}
						change=true;
					}
					counter=0;
					for(var o = 0 ; o < 3 ; o ++){
						if(ccomb[2-o+o*3])
							counter++;
					}
					if(counter==2){
						for(var o = 0 ; o < 3 ; o ++){
							ccomb[o*3+2-o]=true;
						}
						change=true;
					}
				}
				var counter=0;
				for(var o = 0 ; o < 9 ; o ++){
					if(ccomb[o])counter++;
				}
				if(counter==9){
					comb.push({i,j,k});
				}
			}
		}
	}
	for (var i = comb.length - 1; i >= 0; i--) {
		for (var j = i - 1; j >= 0; j--) {
			if(similar(comb[i],comb[j])){
				comb.splice(i,1);
				break;
			}
		}
	}
}

function transform2(x){
	switch(x){
		case 0:return 2;
		case 1:return 1;
		case 2:return 0;
		case 3:return 5;
		case 4:return 4;
		case 5:return 3;
		case 6:return 8;
		case 7:return 7;
		case 8:return 6;
	}
}
function transform(x){
	switch(x){
		case 0:return 2;
		case 1:return 5;
		case 2:return 8;
		case 3:return 1;
		case 4:return 4;
		case 5:return 7;
		case 6:return 0;
		case 7:return 3;
		case 8:return 6;
	}
}
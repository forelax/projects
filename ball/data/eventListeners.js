document.addEventListener("mousemove",function(event){
	mx=event.pageX-$("canvas").offset().left;
	my=event.pageY-$("canvas").offset().top;
	event.preventDefault();
});
document.addEventListener("mousedown",function(event){
	mx=event.pageX-$("canvas").offset().left;
	my=event.pageY-$("canvas").offset().top;
	mp=true;
	event.preventDefault();
});
document.addEventListener("mouseup",function(event){
	mx=event.pageX-$("canvas").offset().left;
	my=event.pageY-$("canvas").offset().top;
	if(mp){
		if(lives>0&&mx<c.width/3){
			pl.push({x:mx,y:my});
			if(pl.length>plc){
				bbpl.push(new bbpls(pl[0].x,pl[0].y,0));
				pl.splice(0,1);
			}
		}else if(lives<=0){
			if(inBounds(mx,rpbx,rpbx+rpbw)&&inBounds(my,rpby,rpby+rpbh))
				setup();
		}
	}
	mp=false;
	event.preventDefault();
});
document.addEventListener('keyup',function(event){
	if(event.key==' '){
		if(lives>0&&mx<c.width/3){
			pl.push({x:mx,y:my});
			if(pl.length>plc){
				bbpl.push(new bbpls(pl[0].x,pl[0].y,0));
				pl.splice(0,1);
			}
		}
	}
});
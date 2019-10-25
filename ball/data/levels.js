function level1(){
	background();
	bsc=10;
	bsp=5;
	plw=4;
	plh=80;
	plc=3;
	for(var i = 0 ; i < 3 ; i++)
		b.push(new Ball(Math.random()*(2*c.width/3-2*bsc)+c.width/3+bsc,
						Math.random()*(c.height-2*bsc)+bsc,
						rpn(),
						rpn() ));
}

function levelx(){
	background();
	bsc=5;
	bsp=10;
	plw=4;
	plh=50;
	plc=3;
	for(var i = 0 ; i < 8 ; i++)
		b.push(new Ball(Math.random()*(2*c.width/3-2*bsc)+c.width/3+bsc,
						Math.random()*(c.height-2*bsc)+bsc,
						rpn(),
						rpn() ));
}
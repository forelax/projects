function displayButtons(xb,yb){
		yb+=29;
		if(!p.lk)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(xb,yb,20,20);

		if(!p.dk)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(xb+22,yb,20,20);

		if(!p.rk)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(xb+44,yb,20,20);

		if(!p.uk)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(xb+22,yb-22,20,20);

		if(!p.mp)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(xb+51,yb-29,20,20);

		ctx.lineWidth=2;

		ctx.beginPath();
		ctx.moveTo(xb+22+4    ,yb-22+20-6);
		ctx.lineTo(xb+22+10   ,yb-22+6   );
		ctx.lineTo(xb+22+20-4 ,yb-22+20-6);
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(xb+20-6 ,yb+4   );
		ctx.lineTo(xb+6    ,yb+10  );
		ctx.lineTo(xb+20-6 ,yb+20-4);
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(xb+22+4    ,yb+6   );
		ctx.lineTo(xb+22+10   ,yb+20-6);
		ctx.lineTo(xb+22+20-4 ,yb+6   );
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(xb+44+6    ,yb+4   );
		ctx.lineTo(xb+44+20-6 ,yb+10  );
		ctx.lineTo(xb+44+6    ,yb+20-4);
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(xb+51+5    ,yb-29+20-4   );
		ctx.lineTo(xb+51+5    ,yb-29+4      );
		ctx.lineTo(xb+51+15   ,yb-29+4+9    );
		ctx.lineTo(xb+51+5    ,yb-29+20-4   );
		ctx.moveTo(xb+51+10   ,yb-29+15     );
		ctx.lineTo(xb+51+13   ,yb-29+18     );
		ctx.stroke();

}
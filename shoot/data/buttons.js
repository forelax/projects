function displayButtons(){

		if(!p.lk)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(11,172,20,20);

		if(!p.dk)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(33,172,20,20);

		if(!p.rk)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(55,172,20,20);

		if(!p.uk)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(33,150,20,20);

		if(!p.mp)
			ctx.fillStyle="#D9D9D9";
		else
			ctx.fillStyle="#747474";
		ctx.fillRect(62,143,20,20);

		ctx.lineWidth=2;

		ctx.beginPath();
		ctx.moveTo(33+4    ,150+20-6);
		ctx.lineTo(33+10   ,150+6   );
		ctx.lineTo(33+20-4 ,150+20-6);
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(11+20-6 ,172+4   );
		ctx.lineTo(11+6    ,172+10  );
		ctx.lineTo(11+20-6 ,172+20-4);
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(33+4    ,172+6   );
		ctx.lineTo(33+10   ,172+20-6);
		ctx.lineTo(33+20-4 ,172+6   );
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(55+6    ,172+4   );
		ctx.lineTo(55+20-6 ,172+10  );
		ctx.lineTo(55+6    ,172+20-4);
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(62+5    ,143+20-4   );
		ctx.lineTo(62+5    ,143+4      );
		ctx.lineTo(62+15   ,143+4+9    );
		ctx.lineTo(62+5    ,143+20-4   );
		ctx.moveTo(62+10    ,143+15     );
		ctx.lineTo(62+13   ,143+18     );
		ctx.stroke();

}
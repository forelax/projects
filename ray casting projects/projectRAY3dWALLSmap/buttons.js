function displayButtons(xb,yb){
		yb+=29;
		noStroke();

		if(keyIsDown(LEFT_ARROW)||keyIsDown(65))
			fill("#747474");
		else
			fill("#D9D9D9");
		rect(xb,yb,20,20);

		if(keyIsDown(DOWN_ARROW)||keyIsDown(83))
			fill("#747474");
		else
			fill("#D9D9D9");
		rect(xb+22,yb,20,20);

		if(keyIsDown(RIGHT_ARROW)||keyIsDown(68))
			fill("#747474");
		else
			fill("#D9D9D9");
		rect(xb+44,yb,20,20);

		if(keyIsDown(UP_ARROW)||keyIsDown(87))
			fill("#747474");
		else
			fill("#D9D9D9");
		rect(xb+22,yb-22,20,20);

		if(mouseIsPressed)
			fill("#747474");
		else
			fill("#D9D9D9");
		rect(xb+51,yb-29,20,20);



		strokeWeight(2);
		stroke("black");

		line(xb+22+4    ,yb-22+20-6,xb+22+10   ,yb-22+6   );
		line(xb+22+10   ,yb-22+6   ,xb+22+20-4 ,yb-22+20-6);


		line(xb+20-6 ,yb+4   ,xb+6    ,yb+10  );
		line(xb+6    ,yb+10  ,xb+20-6 ,yb+20-4);
		

		line(xb+22+4    ,yb+6   ,xb+22+10   ,yb+20-6);
		line(xb+22+10   ,yb+20-6,xb+22+20-4 ,yb+6   );


		line(xb+44+6    ,yb+4   ,xb+44+20-6 ,yb+10  );
		line(xb+44+20-6 ,yb+10  ,xb+44+6    ,yb+20-4);


		line(xb+51+5    ,yb-29+20-4   ,xb+51+5    ,yb-29+4      );
		line(xb+51+5    ,yb-29+4      ,xb+51+15   ,yb-29+4+9    );
		line(xb+51+15   ,yb-29+4+9    ,xb+51+5    ,yb-29+20-4   );
		line(xb+51+5    ,yb-29+20-4   ,xb+51+10   ,yb-29+15     );
		line(xb+51+10   ,yb-29+15     ,xb+51+13   ,yb-29+18     );

}
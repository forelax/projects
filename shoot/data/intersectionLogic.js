	
var min = function (n1,n2){
	if(n1<n2)
		return n1;
	else
		return n2;
}
var max = function (n1,n2){
	if(n1>n2)
		return n1;
	else
		return n2;
}

var line = function(p1x1,p1x2,p1y1,p1y2,p2x1,p2x2,p2y1,p2y2){
	if(p2x1==p2x2){
		if(p1x1!=p1x2){
			this.k=(p1y1-p1y2)/(p1x1-p1x2);
			this.inp= this.k*(p1x1-p2x1)+p1y1;
			if(this.inp>=min(p2y1,p2y2)&&this.inp<=max(p2y1,p2y2)&&max(p1x1,p1x2)>=p2x1&&min(p1x1,p1x2)<=p2x1)
				return true;
			else return false;
		}else{
			if(p1x1==p2x1&&min(p1y1,p1y2)<=max(p2y1,p2y2)&&max(p1y1,p1y2)>=min(p2y1,p2y2))
				return true;
			else return false;
		}
	}else if(p2y1==p2y2){
		if(p1y1!=p1y2){
			this.k=(p1x1-p1x2)/(p1y1-p1y2);
			this.inp= this.k*(p1y1-p2y1)+p1x1;
			if(this.inp>=min(p2x1,p2x2)&&this.inp<=max(p2x1,p2x2)&&max(p1y1,p1y2)>=p2y1&&min(p1y1,p1y2)<=p2y1)
				return true;
			else return false;
		}else{
			if(p1y1==p2y1&&min(p1x1,p1x2)<=max(p2x1,p2x2)&&max(p1x1,p1x2)>=min(p2x1,p2x2))
				return true;
			else return false;
		}
	}else
		return false;
}


function checkFor(bx1,by1,bx2,by2,ex1,ey1,ex2,ey2){
	
	this.inter;
	this.w1c=false;
	this.w2c=false;
	this.w3c=false;
	this.w4c=false;

	this.p1c=((bx1>=ex1)&&(bx1<=ex2)&&(by1>=ey1)&&(by1<=ey2));
	this.p2c=((bx2>=ex1)&&(bx2<=ex2)&&(by2>=ey1)&&(by2<=ey2));
	if(!this.p1c&&!this.p2c){
		this.w1c=line( bx1,bx2,by1,by2, ex1,ex1,ey1,ey2 );
		this.w2c=line( bx1,bx2,by1,by2, ex2,ex2,ey1,ey2 );
		this.w3c=line( bx1,bx2,by1,by2, ex1,ex2,ey1,ey1 );
		this.w4c=line( bx1,bx2,by1,by2, ex1,ex2,ey2,ey2 );
	}
	this.inter=(this.p1c||this.p2c||this.w1c||this.w2c||this.w3c||this.w4c);
	return this.inter;
}
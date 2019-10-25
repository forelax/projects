function Point(ix,iy){
	this.x=ix;
	this.y=iy;
};
function Line(point1,point2){
	this.a=point1.y-point2.y;
	this.b=point2.x-point1.x;
	this.c=point1.x*point2.y-point2.x*point1.y;
	this.equation=function(point){
		return this.a*point.x+this.b*point.y+this.c;
	}
}
function LineSegment(point1,point2){
	this.point1=point1;
	this.point2=point2;
}
function Circle(x,y,radius){
	this.x=x;
	this.y=y;
	this.radius=radius;
}
/*function isPointInCircle(point,circle){
	if(Math.pow(circle.radius,2)>=dist2(point,circle))
		return true;
	return false;
}*/
function dist2(point1, point2){
	return Math.pow(point1.x-point2.x ,2)+Math.pow(point1.y-point2.y ,2);
}
function distToSegmentSquared(point,linePoint1,linePoint2) {
	var lengthSqr=dist2(linePoint1,linePoint2);
	if (lengthSqr==0)
		return dist2(point,linePoint1);
	var t=((point.x-linePoint1.x)*(linePoint2.x-linePoint1.x)+(point.y-linePoint1.y)*(linePoint2.y-linePoint1.y))/lengthSqr;
	t = Math.max(0, Math.min(1, t));
	return dist2(point,{x: linePoint1.x+t*(linePoint2.x-linePoint1.x),
						y: linePoint1.y+t*(linePoint2.y-linePoint1.y)});
}
function isLineSegmentIntersectingCircle(lineSegment,circle){
	var dist=distToSegmentSquared(circle,lineSegment.point1,lineSegment.point2);
	if(dist<=Math.pow(circle.radius, 2))
		return true;
	return false;
}
function isSignEqual(a,b){
	return (a>=0&&b>=0)||(a<=0&&b<=0);
}

function isCircleIntersectingTriangle(circle,triangle){
	/*var PiC=isPointInCircle(triangle.point1,circle);
	if(PiC)return true; 
	PiC=isPointInCircle(triangle.point2,circle);
	if(PiC)return true; 
	PiC=isPointInCircle(triangle.point3,circle);
	if(PiC)return true;*/

	/*var lineSegment=new LineSegment(triangle.point1,triangle.point2);
	var LSiC=isLineSegmentIntersectingCircle(lineSegment,circle);
	if(LSiC)return true;

	lineSegment=new LineSegment(triangle.point2,triangle.point3);
	LSiC=isLineSegmentIntersectingCircle(lineSegment,circle);
	if(LSiC)return true;

	lineSegment=new LineSegment(triangle.point3,triangle.point1);
	LSiC=isLineSegmentIntersectingCircle(lineSegment,circle);
	if(LSiC)return true;*/

	if(isLineSegmentIntersectingCircle(new LineSegment(triangle.point1,triangle.point2),circle)||
	   isLineSegmentIntersectingCircle(new LineSegment(triangle.point2,triangle.point3),circle)||
	   isLineSegmentIntersectingCircle(new LineSegment(triangle.point3,triangle.point1),circle) )
		return true;

	var line1=new Line(triangle.point1,triangle.point2),
	    line2=new Line(triangle.point2,triangle.point3),
	    line3=new Line(triangle.point3,triangle.point1);

	if(isSignEqual(line1.equation(triangle.point3), line1.equation(circle))&&
	   isSignEqual(line2.equation(triangle.point1), line2.equation(circle))&&
	   isSignEqual(line3.equation(triangle.point2), line3.equation(circle)))
	    return true;
	return false; 
}
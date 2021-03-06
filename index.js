var points = [];
$(document).ready(function (){
	var canvas = $("#picCanvas")[0];
	var cxt = canvas.getContext('2d');
	
	cxt.strokeStyle = "#f00";
	cxt.lineWidth = 3;
	drawLines();
	
	
});

function drawLines(){
	var canvas = $("#picCanvas")[0];
	var cxt = canvas.getContext("2d");
	var color = "#f00";
	
	var moveX,
    moveY,
    toX,
    toY,
	endX,
	endY;
	function getCanvasPosX(canvas,x){	
		var rect = canvas.getBoundingClientRect(); 
		return x - rect.left * (canvas.width / rect.width);

	}
	function getCanvasPosY(canvas,y){
		var rect = canvas.getBoundingClientRect(); 
		return  y - rect.top * (canvas.height / rect.height);
	}
	canvas.addEventListener("touchstart", function (e){
		e.preventDefault();
		
		var touches = e.changedTouches;
		moveX = getCanvasPosX(canvas,touches[0].pageX);
		moveY = getCanvasPosY(canvas,touches[0].pageY);
		
		points.push({
			x:moveX,
			y:moveY
		});
		
		cxt.beginPath();
		cxt.arc(moveX, moveY, 4, 0, 2 * Math.PI, false);  // a circle at the start
		cxt.fillStyle = color;
		cxt.fill();
	
		canvas.addEventListener("touchmove",drawLine);
	});
	
	canvas.addEventListener("touchend", function (e){
		e.preventDefault();
		
		var touches = e.changedTouches;
		endX = getCanvasPosX(canvas,touches[0].pageX);
		endY = getCanvasPosY(canvas,touches[0].pageY);
		
	  
      cxt.fillStyle = color;
      cxt.beginPath();
      
      cxt.fillRect(endX - 4, endY - 4, 8, 8);
	  
		points.push({
			x:endX,
			y:endY
		});
		canvas.removeEventListener('mousemove', drawLine);
		
		
		
	});
	
	function drawLine(e){
		e.preventDefault();
		
		var touches = e.changedTouches;
		toX = getCanvasPosX(canvas,touches[0].pageX);
		toY = getCanvasPosY(canvas,touches[0].pageY);
		
		cxt.clearRect(0, 0, 600, 600);
		cxt.beginPath();
		cxt.moveTo(moveX, moveY);
		cxt.lineTo(toX, toY);
		console.log(toX,toY);
		
		for(var i=1;i<points.length;i+=2){
	 cxt.moveTo(points[i-1].x,points[i-1].y);
	 cxt.lineTo(points[i].x,points[i].y);
	
	}	
		cxt.closePath();
		cxt.stroke();	
	}
	
}

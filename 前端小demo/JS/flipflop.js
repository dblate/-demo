var SPEED = 1;
var LENGTH = 3;
var dx = [],dy = [];
var vx = vy = 1;
var POS = [];
var BUTTON = document.getElementById("button-layer").children;
var BUTTON_POS = [];

/*
//--------------------------------------------
function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != "function")
		window.onload = func;
	else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

addLoadEvent(SET_BUTTON_POS);
alert(BUTTON_POS[0].y);
//---------------------------------------------------------
*/
//获取3个BUTTON的X和Y坐标
function SET_BUTTON_POS(){
	for(var i=0;i<LENGTH;i++){
		BUTTON_POS[i] = GET_POS(BUTTON[i]);
	}
}
function GET_POS(element){
	var pos = {};
	pos.x = getX(element);
	pos.y = getY(element);
	return pos;
}
//var button = document.getElementById("button-layer").children;//button是个对象数组

function SET_SPEED(speed) {
	dx[0] = speed * 1; dy[0] = speed * 1;
	dx[1] = speed * (-1); dy[1] = speed * 1;
	dx[2] = speed * 1; dy[2] = speed * (-1);

	/*
		for(var i=0;i<LENGTH;i++){
			dx[i] = speed * Math.pow(-1,i);
			dy[i] = speed * Math.pow(-1,i);
		}
	*/
	}

//获取元素X和Y坐标的函数
function getX(element){
	var x = 0;
	while(element){
		x += element.offsetLeft;
		element = element.offsetParent;
	}
	return x;
}
function getY(element){
	var y = 0;
	while(element){
		y += element.offsetTop;
		element = element.offsetParent;
	}
	return y;
}

//移动元素的函数
function START1(){
	var n = 0;
	var google = document.getElementById("google");
	var left = parseInt(google.style.left);
	var timer = setInterval(function(){MOVE_AROUND(google,n);},10);
}
function START2(){
	var n = 1;
	var twitter = document.getElementById("twitter");
	var left = parseInt(twitter.style.left);
	var timer = setInterval(function(){MOVE_AROUND(twitter,n);},10);
}
function START3(){
	var n = 2;
	var facebook = document.getElementById("facebook");
	var left = parseInt(facebook.style.left);
	var timer = setInterval(function(){MOVE_AROUND(facebook,n);},10);
}

function MOVE_AROUND(element,n){
	var left = parseInt(element.style.left);
	var top = parseInt(element.style.top);
	left -= dx[n];  /*此处还需要一个确定序号的函数*/
	top -= dy[n];
	element.style.left = left + "px";
	element.style.top = top + "px";
	edgeCollision(n);
	buttonCollision();
//	console.log("top is "+top);
//	collisionDetection();
}

/*---------------------------------------------------
 *		边界碰撞检测
 *---------------------------------------------------*/
function edgeCollision(n){
	var _left = parseInt(BUTTON[n].style.left);
	var _top = parseInt(BUTTON[n].style.top);
	var _width = parseInt(BUTTON[n].style.width);
	var _height = parseInt(BUTTON[n].style.height);
	console.log(_left);
	if(
			(_left < -BUTTON_POS[n].x)||
			((_left+_width+BUTTON_POS[n].x+10+12) > document.body.clientWidth)
	  ){
		dx[n] = -dx[n];
	  }
	if(
			(_top < -(BUTTON_POS[n].y - 70))||
			((_top + _height +BUTTON_POS[n].y -45) > window.innerHeight)
		){
		dy[n] = -dy[n];		
		}
		
}

/*---------------------------------------------------
 *   元素碰撞检测
 *   ------------------------------------------------*/
//判断X和Y坐标是否满足相撞
function JUDGE_ANOTHER(y,y1,height){
	if(y<y1)
		return ((y + height) > y1);
	else
		return ((y1 + height) > y);
}

function buttonCollision(){ //现在还剩第二个和第3个相撞有问题:问题已解决！
//	以前是_left[i] = left[i] + i*128;这样当I为1时候便相当于加了两次128(I为0时加了一次！)
	var _left = [],
		_top = [];
	for(var i=0;i<LENGTH;i++){
		 _left[i] = parseInt(BUTTON[i].style.left);
		 _top[i] = parseInt(BUTTON[i].style.top);
	}
		var _width = parseInt(BUTTON[0].style.width) + 20;
		var _height = parseInt(BUTTON[0].style.height) + 20;

	for(var i=0;i<LENGTH;i++){	
		for(var j=i+1;j<LENGTH;j++){
			_left[i] = parseInt(BUTTON[i].style.left) + i*128; //经测试为128，虽然从盒模型上看应该为124
			if(_left[j]){
				_left[j] = parseInt(BUTTON[j].style.left) + j*128;
			}
			if(JUDGE_ANOTHER(_left[i],_left[j],_width)&&JUDGE_ANOTHER(_top[i],_top[j],_height)){
				dx[i] = -dx[i];
				dy[i] = -dy[i];
				dx[j] = -dx[j];
				dy[j] = -dy[j];	
			}
		}
	}
}

/*
/*--------------------------------------------------
 *        碰撞检测函数
 *--------------------------------------------------
function collisionDetection(){
	for(var i=0;i<LENGTH;i++){
			var _left = parseInt(BUTTON[i].style.left);
			var _top = parseInt(BUTTON[i].style.top);
			var _width = parseInt(BUTTON[i].style.width);
			var _height = parseInt(BUTTON[i].style.height);
			console.log(BUTTON_POS[i].y)
			switch(true){
				case ((_left < -BUTTON_POS[i].x)||
					 ((_left+_width+BUTTON_POS[i].x + 10+12) > document.body.clientWidth)):
						{vx = -vx;      //10是padding宽度,12是margin宽度
						 break;}
				case ((_top < -(BUTTON_POS[i].y - 70))||
					 ((_top+BUTTON_POS[i].y+_height - 45) > window.innerHeight)):
						{vy = -vy;
						 break;}
		}
	}
}
---------------------------------------------------------*/

window.onload = function(){
	SET_BUTTON_POS();
	SET_SPEED(SPEED);
	console.log(BUTTON_POS[0].x);
	console.log(BUTTON_POS[1].x);
}

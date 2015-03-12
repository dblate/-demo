var gClock = {};
var color = ['orange','blue','green'];

//定义hide函数
function hide(obj){
	obj.style.display = "none";
}
//定义show函数
function show(obj){
	obj.style.display = "block";
}
//将document.getElementById 定义为getId
function getId(id){
	return document.getElementById(id);
}

//用函数初始化CLOCK的HTML
function initClockHtml(){
	var temp;
	var clock = getId("clock");

	for(var i=0;i<3;i++){
		temp = document.createElement("div");
		temp.setAttribute("class",color[i]);
//		getId("clock").appendChild(temp);
		temp.innerHTML = '<div class = "display" ></div>'
			+'<div class = "front left"></div>'
			+'<div class = "rotate left">'
			+'<div class="bgFromLeftToRight"></div>'
			+'</div>'
			+'<div class="rotate right">'
			+'<div class="bgFromRightToLeft"></div>'
			+'</div>';
		clock.appendChild(temp);

		//find函数还未实现
		temp.rotateLeft  = temp.childNodes[2]; 
		temp.rotateRight = temp.childNodes[3];
		temp.display     = temp.childNodes[0];

		gClock[color[i]] = temp;
	}
}


function animation(whichClock,currentTime,total){
	var angle = (360/total)*currentTime;
	var element;
	console.log(angle);
	
/*
	if(currentTime == 0){
		hide(clock.rotateRight);
		rotateElement(clock.rotateLeft,0);
	}
*/
	if(angle <= 180){
		hide(whichClock.rotateRight);
		element = whichClock.rotateLeft;
		rotateElement(element,angle);
	}
	else{
		show(whichClock.rotateRight);
		show(whichClock.rotateLeft);

		element = whichClock.rotateRight;
		//如果初始化时秒数大于30s（h和m 也一样），则将左边的bgFormLeftToRight先旋转180度到右边
		rotateElement(whichClock.rotateLeft,180);
		rotateElement(element,angle-180);
	}

	//初始化display里面的俄html(显示为对应的时间)
	whichClock.display.innerHTML = currentTime<10?'0'+currentTime:currentTime;
}

//时钟的旋转动画
function rotateElement(element,angle){
	//设置旋转角度
	var rotate = "rotate("+angle+"deg)";

	element.style.transform = rotate;
	if(!element.style.MozTranform)
		element.style.MozTranform = rotate;
	if(!element.style.WebkitTransform)
		element.style.WebkitTransform = rotate;
}

window.onload = function(){
	initClockHtml();
//设置时间间隔
var repeat = setInterval(function(){
	var currentTime = new Date();
	var hour   = currentTime.getHours();
	var minute = currentTime.getMinutes();
	var second = currentTime.getSeconds();
	console.log(hour);

	animation(gClock.orange,hour,24);
	animation(gClock.blue,minute,60);
	animation(gClock.green,second,60);

},1000);
}

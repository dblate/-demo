$(document).ready(function(){
	/*------------------------------------------------------------------
	 *现在还剩一个瑕疵：在图片移动时点击另一张图片的id会出现暂时的紊乱 *
	 *暂时不想弄了，等到想弄的时候再说吧......相信没人会那么无聊，在移 *
	 *动的时候去点图片 = =...                                          *
	 * ----------------------------------------------------------------*/
/*--------------设置各个参数-------------*/
	var speed = 400;      //设置图片移动速度
	var pauseTime = 2000;//设置每张图片的停顿时间
	var distence = 400; //dingyi tu pian yidong de ju li(yi ban gen tu pain kuandu xiangtong)
	var moveToLeft = {"left":"+="+distence};//定义动画效果（左移400）
	var moveToRight = {"left": "-="+distence};
	var first = $("#gallery li:first-child");
	var last = $("#gallery li:last-child");
	var altContent = $("#altContent");//用于描述图片的文本p的id
	var stop = false;
	var wait = false; //用于清除在图片移动时点击产生的函重复调用
	$("#next_btn").hide();
	$("#pre_btn").hide();


/*-----------下面的序号的CSS效果函数-----------------------*/
	function serialNumberCSS(object){
		var serialNumber = parseInt(object.attr("id"));
		$("#count li").removeClass("yellow");
		$("#count li").eq(serialNumber).addClass("yellow");
		
	}
/*-----------mouseover的悬停效果---------*/
	function mouse(){
		$("#gallery li").each(function(){
		$(this).mouseover(function(){
			timeDelay = setTimeout(function(){
				stop = true;
			},500);//延时生效，鼠标要放在图片上满一秒才有效(因为在鼠标离开时会清除timeDelay)
					//相当于用JS写的一个taphold功能
		});
		$(this).mouseout(function(){
			var that = $(this);
			clearTimeout(timeDelay);
			if(stop==true){   //如果mouseover已经生效再调用函数，避免每次鼠标离开就调用函数（函数重复多次调用会出问题）
				stop = false;
				var timeOut = setTimeout(function(){slidePic(that,moveToLeft,speed);},400);//设置当鼠标离开时再次启动slidePic函数的延时
			}
			
		});

			
		});
	}
/*-----------------hover 时的next_btn和pre_btn----------*/
		$("#next_btn").parent().css({
			"position": "absolute",
			"zIndex": 12,
			"width": "100px",
			"height": "100px"
		});
		$("#pre_btn").parent().css({
			"position": "absolute",
			"zIndex": 12,
			"width": "100px",
			"height": "100px"
		})
	$("#gallery").mouseover(function(){
		$("#next_btn").show();
		$("#pre_btn").show();
	}).mouseout(function(){
		var hideBtn = setTimeout(function(){
			$("#next_btn").hide();
			$("#pre_btn").hide();
		
		},1000);
	});
	
/*-----------------click---------------------------*/
	function serialNumberClick(){
		$("#count li a").each(function(){
		$(this).click(function(evt){
			evt.preventDefault();
			clearTimeout(wait);         //qingchu zhiqian de suoyou dianji xiaoguo ,fangzhi slidePic hanshu chongfu diaoyong
		var galleryLiId = parseInt($(this).html());   //dianji de tupian hao
			console.log("galleryLiId is"+galleryLiId);
		var clickedPic = $("#gallery li").eq(galleryLiId-1);
		var currentImg = $("#count").children(".yellow");
			console.log("currentImg is "+currentImg.html());
		var currentImgNumber = parseInt(currentImg.find("a").html()); //dangqian tupian hao
			console.log("the current num is"+currentImgNumber);
		var currentPic = $("#gallery li").eq(currentImgNumber - 1);
			console.log("currentPic is "+currentPic.html());
			$("#count li").removeClass("yellow");
			$(this).parent().addClass("yellow");
			console.log($(this).parent().html());

			altContent.empty(); //被点击时显示被点击的图片的描述(默认显示当前图片的描述，即是点击前的图片)
			altContent.html(clickedPic.find("img").attr("alt"));
			if($(this).attr("id")=="next_btn"){
				currentPic.animate(moveToLeft,speed);
				if(currentPic==last){
					var next = first;
				}else{
					var next = currentPic.next();
				}
				next.animate(moveToLeft,speed,function(){
					wait = setTimeout(function(){slidePic(next,moveToLeft,speed);},pauseTime);	
				});
			}else if($(this).attr("id")=="pre_btn"){
				currentPic.animate(moveToRight,speed);
				if(currentPic==first){
					var prev = last;
				}else{
					var prev = currentPic.prev();
				}
				prev.animate(moveToRight,speed,function(){
					wait = setTimeout(function(){slidePic(prev,moveToLeft,speed)},pauseTime);
				});
			}
			switch(true){
				case galleryLiId>currentImgNumber: 
						var thisObject = $("#gallery li").eq(galleryLiId-1);
						currentPic.animate(moveToLeft,speed);
						thisObject.animate(moveToLeft,speed,function(){
							wait = setTimeout(function(){
								slidePic(thisObject,moveToLeft,speed);}
								,pauseTime);
						});

						break;
				case galleryLiId<currentImgNumber: 
						var thatObject = $("#gallery li").eq(galleryLiId-1);//dangqiantupian he dianjid de xuehao duiying de tupian yiqi yidong
						currentPic.animate(moveToRight,speed);
						/*------------------------------------------------------------------------------
						 * 若是当播放到第一张图片时点击第四张图片，这时第四张会移动过去，但第二三张还在原地
						 * 这时再点击第二或第三张图片(左移)，第二或第三张图片便会从-400移动到-800（正确的应该是从
						 * 400移动到0），此处的 if 判断修复这个bug
						 * --------------------------------------------------------------------------*/
						if(parseInt(thatObject.css("left"))<=-distence) thatObject.css("left",""+distence+"px"); 
						thatObject.animate(moveToRight,speed,function(){
							 for(var i=galleryLiId+1;i<currentImgNumber;i++){     //ba currentImgNumber he galleryLiId zhi jian de tupian quan bu fangdao zuobianqu(cishi tamen zaiyoubian),yibian jixu xunhuan
									$("#gallery li").eq(i-1).css("left","-400px");
								}
							 wait = setTimeout(function(){slidePic(thatObject,moveToLeft,speed)},pauseTime);
						});
						break;
				default :
						var thatObject = $("#gallery li").eq(galleryLiId-1);//dangqiantupian he dianjid de xuehao duiying de tupian yiqi yidong
							wait = setTimeout(function(){slidePic(thatObject,moveToLeft,speed)},pauseTime);

			}
		});
		});
	}
	function galleryCss(){
		var i = 1;
		$("#gallery li").each(function(){
			$(this).attr("id",""+i);//初始化li的id
			i++;
			$(this).css({
				"position": "absolute",
				"left": -distence,
				"zIndex": 6
		});
	});
//	console.log("show1 is seted!");
	}

/*-------------图片循环轮播函数------------------------------------------------*/

	function slidePic(object,animation,t,n,original){
		if(wait){
			clearTimeout(wait); //图片在移动时被点击会出现函数的重读调用，此处清除之（虽然还是有瑕疵）
		}
		if(stop==true){
			console.log("I'm stopped(img"+object.attr("id")+")...Move your mouse out of me...");
			return false;            //shezhi stop shi weile dang mouseover shi tingzhi donghua
		}
		serialNumberCSS(object);
		if(!original){
			var original = first;
		}
		object.animate(animation,t||"normal",function(){
			if(object.next().length){
				 wait = setTimeout(function(){slidePic(object.next(),animation,t,n,original);},pauseTime);//设置延时
				 console.log("THE length is --------------"+object.next().length);
			}else{
				if(n===0){
					return false;
				}
				if(typeof n!="number"){
					n = "cycle";
				}else{
					n--;
				}
				if(n||n=="cycle"){
					last.css("left",-distence); //移动完最后一张图片后会到此处,而每次执行cssInit()的时候,
												//最后一张图片都在移动中（未被初始化）,所以此处单独将其初始化 
//					console.log("init is beginning!!!!!!!!");
				 wait = setTimeout(function(){slidePic(original,animation,t,n,original);},pauseTime);//设置延时
				}
			}
		});
		if(object.next().length){
			var next = object.next();
		}else{
			galleryCss() ;          //当object的next元素不存在时，初始化li,
									//并且使object(最后一张图片)的next为first（li的第一张）
			var next = first;
	/*-------------------------------------------------------------------------
	 * 整个记数函数有点别扭，id是从1开始的，而正好object是移走了那张(迎面而来的是next)，
	 * 所以正好合适。但是此处用到的id是1(需要的是0)，所以要单独减1.
	 *------------------------------------------------------------------------*/
			var serialNumber = parseInt(next.attr("id"));
			$("#count li").removeClass("yellow");
			$("#count li").eq(serialNumber-1).addClass("yellow");
		}
		next.animate(animation,t||"normal");//object的下一张图片和object一起移动
		altContent.html(next.find("img").attr("alt"));//图片描述
	
	}
/*----------------------执行函数---------------------------*/
		galleryCss();
		mouse();
		serialNumberClick();
		first.css("left","0");//让第一张图片首先出现在框框里
		slidePic(first,moveToLeft,speed);
	
});

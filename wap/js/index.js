window.onload = function(){
	search();
	countDown();
	//轮播图
	getBanner();
}

//搜索框颜色变换
var search = function(){
	//获取搜索框
	var getSearch = document.getElementsByClassName("jd-header-content")[0];
	
	//获取banner高度
	var getBannerHeight = document.getElementById("jd-banner").offsetHeight;
	
	window.onscroll = function(){
		//获取滚动高度
		var getScrollHeight = document.body.scrollTop;
		//定义变化值
		var changeVaule = getScrollHeight / getBannerHeight; 
		//console.log(changeVaule);
		if(getScrollHeight > getBannerHeight){
			getSearch.style.backgroundColor = "rgba(188, 22, 35,"+changeVaule+")";
		} else {
			getSearch.style.backgroundColor = "rgba(188, 22, 35,0)";
		}
	};
};

//倒计时
var countDown = function(){
	//定义倒计总时间
	var times = 10;
	
	//获取span元素
	var spans = document.getElementsByClassName("time");
	
	//开启定时器
	var timer = setInterval(function(){
		times--;
		var h = Math.floor(times/(60*60));
		var m = Math.floor(times/60%60);
		var s = times%60;
		
		//追加到每个span中
		spans[0].innerHTML = h > 10 ? Math.floor(h/10) : 0;
		spans[1].innerHTML = h % 10;
		spans[2].innerHTML = m > 10 ? Math.floor(m/10) : 0;
		spans[3].innerHTML = m % 10;
		spans[4].innerHTML = s > 10 ? Math.floor(s/10) :0;
		spans[5].innerHTML = s % 10;
		if(times <= 0){
			//停止定时器
			//clearInterval(timer);
			
			times = 10;
		}
	},1000);
};


//轮播图
var getBanner = function(){
	//获取元素
	var moveUl = document.getElementsByClassName("jd-banner-img")[0];//获取大UL
	var listLi = document.getElementById("jd-banner").children[1].children;//获取下面圆圈
	
	//获取一张图片的宽度
	var imgWidth = document.getElementById("jd-banner").offsetWidth;
	
	//定义index记录当前索引
	var index = 1;//因为默认 我们的ul 已经 往左边 移动了 10%的宽度
	
	//开启定时器
	var timer = setInterval(function(){
		index++;
		//为大UL添加滚动效果
		moveUl.style.transition = "all .3s";
		moveUl.style.transform = "translateX("+imgWidth*index*-1+"px)";
	},3000);
	
	//添加过渡完成后
	moveUl.addEventListener("webkitTransitionEnd",function(){
		if(index > 8){
			index=1;
			//停止过渡
			moveUl.style.transition = "";
			moveUl.style.transform = "translateX("+imgWidth*index*-1+"px)";
		} else if(index < 1){
			index = 8;
			//停止过渡
			moveUl.style.transition = "";
			moveUl.style.transform = "translateX("+imgWidth*index*-1+"px)";
		}
		
		//为圆圈添加类名
		for(var i = 0; i<listLi.length; i++){
			listLi[i].className = "";
		}
		listLi[index-1].className = "current";
	});
	
	//定义开始触摸X开始位置   X移动的位置   X结束的位置
	var startX = 0, moveX = 0, endX = 0;
	//手指触摸开始
	document.getElementById("jd-banner").addEventListener("touchstart",function(e){
		//关闭定时器
		clearInterval(timer);
		//关闭过渡效果
		moveUl.style.transition = "";
		
		startX = e.touches[0].clientX;
		
	});
	
	//手指触摸移动
	document.getElementById("jd-banner").addEventListener("touchmove",function(e){
		moveX = e.touches[0].clientX - startX;
		moveUl.style.transform = "translateX("+(moveX+index*imgWidth*-1)+"px)"
	});
	
	//手指触摸离开
	document.getElementById("jd-banner").addEventListener("touchend",function(e){
		//判断移动的距离是否大于图片宽度的三分之一
		var maxDistance = imgWidth / 3;
		if(Math.abs(moveX) > maxDistance){
			//再判断向左还是向右
			if(moveX > 0){
				//向右
				index--;
			} else {
				//向左
				index++
			}
			// 为了好看 将 过渡效果开启
			moveUl.style.transition = 'all .3s';

			// 吸附 一整页
			moveUl.style.transform = 'translateX('+(index*-1*imgWidth)+'px)';
		} else {
			//吸附回去
			// 为了好看 将 过渡效果开启
			moveUl.style.transition = 'all .3s';

			// 吸附 一整页
			moveUl.style.transform = 'translateX('+(index*-1*imgWidth)+'px)';
		}
		
		//开启定时器
		timer = setInterval(function(){
			index++;
			//为大UL添加滚动效果
			moveUl.style.transition = "all .3s";
			moveUl.style.transform = "translateX("+imgWidth*index*-1+"px)";
		},3000);
	});
};

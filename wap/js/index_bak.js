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
	//获取相关元素
	var bannerBox = document.getElementById("jd-banner");
	var ulOne = bannerBox.getElementsByTagName("ul")[0];//轮播图片
	var ulTwo = bannerBox.getElementsByTagName("ul")[1];//滚动的小圆点
	
	//获取一张图片的宽度
	var imgWidth = bannerBox.offsetWidth;
	//定义index
	var index = 1;
	//加过渡
	var addTransition = function(){
		ulOne.style.transition = "all .3s ease 0s";
		//兼容旧浏览器
		ulOne.style.webkitTransition = "all .3s ease 0s";
	};
	
	//减过渡
	var removeTrasition = function(){
		ulOne.style.transition = "none";
		//兼容旧浏览器
		ulOne.style.webkitTransition = "none";
	};
	
	//改变位置
	var setTranform = function(t){
		ulOne.style.transform = "translateX("+t+"px)";
		//兼容
		ulOne.style.webkitTransform = "translateX("+t+"px)";
	};
	//开启定时器
	var timer = setInterval(function(){
		index++;
		addTransition();
		setTranform(-index*imgWidth);
	},3000);
	
	ulOne.addEventListener("transitionend",function(){
		if(index >= 9){
			index = 1;
		} else if(index <= 1){
			index = 8;
		}
		removeTrasition();
		setTranform(-index*imgWidth);
	},false);
	
	ulOne.addEventListener("webkitTransitionEnd",function(){
		if(index >= 9){
			index = 1;
		} else if(index <= 1){
			index = 8;
		}
		removeTrasition();
		setTranform(-index*imgWidth);
	},false)
};

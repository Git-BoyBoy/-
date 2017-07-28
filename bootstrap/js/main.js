$(function() {
	//定义一个获取屏幕尺寸函数
	function getResize() {
		//获取屏幕宽度
		var getWidth = $(window).width();
		//判断屏幕宽度小于768像素
		var isSmallScreen = getWidth < 768;
		$("#main-carousel > .carousel-inner > .item").each(function(i, item) {
			//将DOM对象转换成jquery对象
			$item = $(item);
			//判断是否小于768像素
			isSmallScreen ? $item.css('backgroundImage', 'url(' + $item.data("img-xs") + ')') : $item.css('backgroundImage', 'url(' + $item.data("img-md") + ')');
			if(isSmallScreen) {
				$item.html("<img src='" + $item.data("img-xs") + "' />");
			} else {
				$item.html("");
			}
		});
	}
	$(window).on("resize", getResize).trigger("resize");

	//调用提示框
	$(function() {
		$('[data-toggle="tooltip"]').tooltip()
	})
	
	//产品tab选项兼容宽度
	var navWidth = 30;//定义一个变量来接收ul下面li宽度之和，初始为30，是因为.nav-tabs本身有个内边距
	$(".nav-tabs").children().each(function(i,item){
		navWidth +=$(item).width();
	});
	if(navWidth > $(window).width()){
		$(".nav-tabs").css("width",navWidth).parent().css("overflow-x","scroll");
	}
	
	//新闻列表点击切换标题
	//注册点击事件
	$(".nav-news li a").on("click",function(){
		//获取data-title数据
		var data_title = $(this).data("title");
		//切换数据
		$(".news-title").text(data_title);
	});
	
	
	/*切换到移动端时，滑动轮播图需要切换图片*/
	//第一步要知道滑动方向
	var xStart,xEnd;
	var setoff = 50;//设置初始值
	//注册手指触碰开始的X坐标
	$(".carousel").on("touchstart",function(e){
		xStart = e.originalEvent.targetTouches[0].screenX;
	});
	
	//注册手指移动最后停留X坐标
	$(".carousel").on("touchmove",function(e){
		xEnd = e.originalEvent.targetTouches[0].screenX;
		//console.log(xEnd)
	});
	//注册手指离开一瞬间的X坐标
	$(".carousel").on("touchend",function(e){
		//判断xstart跟xend相减后的绝对值是否大于初始值
		if(Math.abs(xStart-xEnd) > setoff){
			$(this).carousel(xEnd > xStart ? "prev" : "next");  
		}
	});
	
	
	//当获取到滑动方向信息后执行向左或向右滑动
})
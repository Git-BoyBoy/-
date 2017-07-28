$(document).ready(function() {
	var uls = $(".rdzt-imgs").children();

	var srcollWidth = uls.eq(0).width();

	$.each(uls, function(i) {
		if(i > 0) {
			uls.eq(i).css("left", srcollWidth);
		}
	});
	var iNow = 0;
	var timer = null;
	timer = setInterval(autopaly, 3000);
	//自动滑动
	function autopaly() {
		$(uls).eq(iNow).animate({
			left: -srcollWidth
		});
		++iNow > $(uls).length - 1 ? iNow = 0 : iNow;
		$(uls).eq(iNow).css("left", srcollWidth);
		$(uls).eq(iNow).animate({
			left: 0
		});
	}

	$(".sy-rdzt").bind("mouseenter", function() {
		$(".rdzt-spans").css("display", "block");
		clearInterval(timer);
		//按钮点击
		var rdzt_spans = $(".rdzt-spans").children();
		
		$(rdzt_spans).eq(0).bind("click", function() {
			autopaly();
		});

		$(rdzt_spans).eq(1).bind("click", function() {
			$(uls).eq(iNow).stop(true,false).animate({
				left: srcollWidth
			});
			console.log(iNow);
			--iNow < 0 ? iNow = $(uls).length - 1 : iNow;
			console.log(iNow);
			$(uls).eq(iNow).css("left", -srcollWidth);
			$(uls).eq(iNow).animate({
				left: 0
			});
		});

	});
	$(".sy-rdzt").bind("mouseleave", function() {
		$(".rdzt-spans").css("display", "none");
		timer = setInterval(autopaly, 3000);
	});

})
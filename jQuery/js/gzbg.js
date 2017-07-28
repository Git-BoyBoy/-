$(document).ready(function() {
	var lis = $("#banner-fade").children().children("li");
	var spans = $("#spans").children();

	//先隐藏所有图片，再将对象移到第一张图片，使之淡入
	$(lis).fadeOut().eq(0).fadeIn();

	var iNow = 0;

	$(spans).click(function() {
		$(this).each(function() {
			if($(this).prop("className") == "prev") {
				$(lis).eq(iNow).fadeOut();
				--iNow < 0 ? iNow = lis.length - 1 : iNow;
				$(lis).eq(iNow).fadeIn();

			} else if($(this).prop("className") == "next") {
				$(lis).eq(iNow).fadeOut();
				++iNow > lis.length - 1 ? iNow = 0 : iNow;
				$(lis).eq(iNow).fadeIn();

			} else if($(this).prop("className") == "s-index") {
				$(lis).fadeOut().eq(0).fadeIn();
				iNow = 0;
			} else {
				window.location.href = "http://xxgk.thnet.gov.cn/xxgkk/05/201702/41f9b872bb5441cfbf9cf0768578cb84.shtml"
			}
		});
	});

	//固定滚动
	$(window).scroll(function() {
		var top = $(window).scrollTop() + 200;
		$("#spans").css({
			top: (top - 200) + "px"
		});
	});
})
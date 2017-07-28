document.write("<script src='js/animate.js' type='text/javascript'></script>");
//封装轮播图函数
function getSlide(obj, span) {
	//声明变量
	var b_box = $(obj);
	var i_box = b_box.children[0];
	var imgs = i_box.children;
	var n_box = b_box.children[1];

	//遍历生成span
	for(var i = 0; i < imgs.length; i++) {
		var lis = document.createElement(span);
		lis.innerHTML = imgs.length - i; //从6 - 1
		
		if(!n_box.children) {
			n_box.insertBefore(lis, n_box.children[1]);
		} else {
			n_box.insertBefore(lis, n_box.children[0]);
		}
	}
	//获取所以得span元素
	var spans = n_box.children;
	console.log(spans[1])
	if(spans[0].className != "prev") {
		spans[0].className = "current";
	} else {
		spans[1].className = "current";
	}

	//获取divs中的一个盒子的宽度
	var scrollWidth = imgs[0].clientWidth;
	//按正常效果显示，第一张在显示出来  其他距离scrollWidth的位置上
		for(var i = 1; i < imgs.length; i++) {
			imgs[i].style.left = scrollWidth + "px";
		}


	//遍历span然后实现点击
	var iNow = 0; //定义一个变量来控制播放张数
	for(var k in spans) {
		spans[k].onclick = function() {
			if(this.className == "prev") {
				//左边按钮
				animate(imgs[iNow], {
					left: scrollWidth
				});
				--iNow < 0 ? iNow = imgs.length - 1 : iNow;
				imgs[iNow].style.left = -scrollWidth + "px";
				animate(imgs[iNow], {
					left: 0
				});
				setSquare()
			} else if(this.className == "next") {
				//右边
				autopaly();
			} else {
				//小span

					var that = this.innerHTML - 1;
				
				if(that < iNow) {
					//等同于左边
					animate(imgs[iNow], {
						left: scrollWidth
					});
					imgs[that].style.left = -scrollWidth + "px";
				} else if(that > iNow) {
					animate(imgs[iNow], {
						left: -scrollWidth
					});
					imgs[that].style.left = scrollWidth + "px";
				}
				iNow = that;
				animate(imgs[iNow], {
					left: 0
				});
				setSquare()
			}
		};
	}

	//span小图标随着走
	function setSquare() {
		//清除所有的className
		if(spans[0].className != "prev") {
			for(var i = 0; i < spans.length; i++) {
				spans[i].className = "";
			}
			spans[iNow].className = "current";
		} else {
			for(var i = 1; i < spans.length - 1; i++) {
				spans[i].className = "";
			}
			spans[iNow + 1].className = "current";
		}
	}

	//自动播放
	var timer = null;
	timer = setInterval(autopaly, 2000);

	function autopaly() {
		animate(imgs[iNow], {
			left: -scrollWidth
		});
		++iNow > imgs.length - 1 ? iNow = 0 : iNow;
		imgs[iNow].style.left = scrollWidth + "px";
		animate(imgs[iNow], {
			left: 0
		});
		setSquare();
	}

	//鼠标移入移出
	b_box.onmouseover = function() {
		clearInterval(timer);
	};

	b_box.onmouseout = function() {
		clearInterval(timer);
		timer = setInterval(autopaly, 2000);
	}

}
window.onload = function() {
	//封装获取ID函数
	function getId(id) {
		return document.getElementById(id);
	}

	//封装获取元素属性函数
	function getStyle(obj, attr) {
		if(obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return window.getComputedStyle(obj, null)[attr];
		}
	}

	//封装运动函数
	function rdztAnimate(obj, json, fn) {
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			var flag = true;
			//遍历json
			for(var attr in json) {
				var current = 0;
				//判断json里面的属性是否有opacity这个属性
				if(attr == "opacity") {
					current = Math.round(parseInt(getStyle(obj, attr) * 100)) || 0;
				} else {
					current = parseInt(getStyle(obj, attr));
				}
				//console.log(current);
				//获取步长
				var step = (json[attr] - current) / 10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);

				//判断是否输入了opacity
				if(attr == "opacity") {
					//判断浏览器是否支持opacity
					if("opacity" in obj.style) {
						obj.style.opacity = (current + step) / 100;
					} else {
						//ie不支持opacity
						obj.style.filter = "alpha(opacity=" + (current + step) * 10 + ")";
					}
				} else if(attr == "zIndex") {
					obj.style.zindex = current + step;
				} else {
					obj.style[attr] = current + step + "px";
				}

				if(current != json[attr]) {
					flag = false;
				}
			}
			if(flag) {
				clearInterval(obj.timer);
				if(fn) {
					fn();
				}
			}
		}, 10);
	}

	function getRdzt(obj) {
		//获取元素
		var b_box = getId(obj);
		var imgs = b_box.children[0].children;
		var n_box = b_box.children[1];

		//获取一个imgs的宽度
		var scrollWidth = imgs[0].clientWidth;
		//把除了第一张显示在当前  其余都位于scrollWidth上
		for(var i = 1; i < imgs.length; i++) {
			imgs[i].style.left = scrollWidth + "px";
		}

		//增加定时器
		var iNow = 0;
		var timer = null;
		if(imgs[1].children.length > 0) {
			timer = setInterval(autopaly, 5000);
		}
		//自动滑动
		function autopaly() {
			rdztAnimate(imgs[iNow], {
				left: -scrollWidth
			});
			++iNow > imgs.length - 1 ? iNow = 0 : iNow;
			imgs[iNow].style.left = scrollWidth + "px";
			rdztAnimate(imgs[iNow], {
				left: 0
			});
		}

		//显示按钮
		b_box.onmouseover = function() {
			if(imgs[1].children.length > 0) {
				n_box.style.display = "block";
				clearInterval(timer);
				//判断点击的是右按钮还是左按钮
				var spans = n_box.children;
				for(var k in spans) {
					spans[k].onclick = function() {
						if(this.className == "rdzt-prev") {
							rdztAnimate(imgs[iNow], {
								left: scrollWidth
							});
							--iNow < 0 ? iNow = imgs.length - 1 : iNow;
							imgs[iNow].style.left = -scrollWidth + "px";
							rdztAnimate(imgs[iNow], {
								left: 0
							});
						} else {
							autopaly();
						}
					};
				}
			}
		};

		//隐藏按钮
		b_box.onmouseout = function() {
			if(imgs[1].children.length > 0) {
				n_box.style.display = "none";
				timer = setInterval(autopaly, 5000)
			}

		};
	}
	getRdzt("rdzt-imgs");
}
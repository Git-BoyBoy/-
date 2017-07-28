//封装获取ID函数
function $(id) {
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
function animate(obj, json, fn) {
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
	}, 30);
}
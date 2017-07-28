window.onload = function() {
	getChecked();
	getPopup();
}

//复选框
var getChecked = function() {
	//获取所有check
	var checks = document.getElementsByClassName("checked");

	//遍历所有的check
	for(var i = 0; i < checks.length; i++) {
		checks[i].onclick = function() {
			//判断是否存在checked属性
			var hasChecked = this.getAttribute("checked");
			if(hasChecked !== null) {
				this.removeAttribute("checked");
			} else {
				this.setAttribute("checked", "");
			}
		};
	}
};

//删除弹出窗
var getPopup = function() {
	//获取所以的删除按钮
	var deleteBtn = document.getElementsByClassName("c-o-delete");
	//获取删除框
	var popup = document.getElementsByClassName("jd-popup")[0];
	var popupBox = popup.getElementsByClassName("jd-popup-box")[0];
	var delUp

	for(var i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].onclick = function() {
			popup.style.display = "block";
			popupBox.className = "jd-popup-box popup";
			delUp = this.getElementsByTagName("span")[0];
			delUp.style.transition = "all 1s ease 0s";
			delUp.style.webkitTransition = "all 1s ease 0s";
				
			delUp.style.transform = "translateY(-3px) translateX(-4px) rotate(-45deg)";
			delUp.style.webkitTransform = "translateY(-3px) translateX(-4px) rotate(-45deg)";				
		};
	}
	
	var qx = popupBox.getElementsByTagName("span")[0];
	qx.onclick = function(){
		popup.style.display = "none";
		popupBox.className = "jd-popup-box";
		
		delUp.style.transform = "translateY(0px) translateX(0px) rotate(0deg)";
		delUp.style.webkitTransform = "translateY(0px) translateX(0px) rotate(0deg)";
	};

};
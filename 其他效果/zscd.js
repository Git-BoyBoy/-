$(function() {
	$.ajax({
		type: "get",
		async: false,
		url: "http://app.gd.gov.cn/xxts/pushinfo_json.php",
		dataType: "jsonp",
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
		jsonpCallback: "pushInfoJsonpCallBack", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
		success: function(json) {
			var v_str = "";
			$.each(json, function(index) {
				if(index == 8) {
					return false;
				}
				var title = json[index].title;
				if(title.length > 25) {
					title = title.substring(0, 25) + "...";
				}
				//v_str += '<li><a h'+'r'+'ef="'+json[index].link+'" target="_parent">  '+title+' </a><span class="time">'+json[index].pubDate+'</span></li>';
				v_str += '<li><span>' + json[index].pubDate + '</span>	<a h' + 'r' + 'ef="' + json[index].link + '" target="_parent" title="' + title + '"> ' + title + ' </a></li>';

			});
			$('#zscd').html(v_str);

		},
		error: function() {
			alert('fail');
		}
	});

});
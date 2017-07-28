'use strict';

//创建一个HTTP服务器
var http = require('http');

//创建一个服务
var server = http.createServer(function(request,response){
	//处理请求和响应
	var httpUrl = request.url;
	switch(httpUrl){
		case '/signin':
		//请求页面
		signin(request,response);
		break;
		
		case '/post':
		//提交表单
		post(request,response);
		break;
		
		default:
		response.write(404,{});
		response.end();
		break;
	}
});

//启动服务
server.listen(8080,function(error){
	console.log('监听成功！');
});

function signin(request,response){
	response.writeHead(200,{
		'Content-Type' : "text/html"
	})
	response.write('<!DOCTYPE html><html><head><meta charset="utf-8" /><title>登录页面</title></head><body><form method="post" action="/post">用户名：<input type="text" name="username" /><br />密  码：<input type="password" name="password" /><br /><input type="submit" value="登录" /></form></body></html>');
	console.log('加载成功');
	response.end();
}

var querystring = require('querystring');
function post(request,response){
	//定义一个变量接受响应回来的字符串
	var postData = '';
	request.on('data',function(part){
		postData += part;
	});
	request.on('end',function(){
		var obj = querystring.parse(postData);
		console.log(obj);
	});
	response.end();
}



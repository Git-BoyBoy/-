'use strict';

//创建一个hTTP服务器
var http = require('http');

//创建一个服务
var server = http.createServer(function(request,response){
	//处理请求和响应
	response.writeHead(200,{
		'Content-Type' : 'text/html',//告诉客户端这是html文件
		'key1' : 'value1'
	});
	//往响应体中放数据（只能是字符串）
	response.write('<h1>HAHAHA</h1>');
	response.end();
});

//启动服务
server.listen(8080,function(error){
	console.log('监听成功！');
});


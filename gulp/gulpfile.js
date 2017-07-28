'use strict';

//引进gulp以及其他插件
var gulp = require('gulp'),
	less = require('gulp-less'),//less编译
	concat = require('gulp-concat'),//文件合并
	uglify = require('gulp-uglify'),//js压缩
	rename = require('gulp-rename'),//重命名
	minifyCss = require('gulp-minify-css'),//css压缩
	minifyHtml = require('gulp-minify-html'),//html压缩
	imagemin = require('gulp-imagemin'),//图片最小化
	assetRev = require('gulp-asset-rev'),//添加hash编码
	runSequence = require('run-sequence'),//
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	obfuscate = require('gulp-obfuscate');

//less编译、压缩、重命名
gulp.task('onCss',function(){
	gulp.src(['src/less/*.less','!src/less/_*.less'])
		.pipe(less())//less编译
		.pipe(minifyCss())//css压缩
		.pipe(assetRev())//为css中引入的图片/字体等添加hash编码
		.pipe(rename({
			dirname: "css",//文件夾名稱
		    basename: "default",//文件名
		    prefix: "",//前綴
		    suffix: ".min",//后綴
		    extname: ".css"//扩展名
		}))//重命名
		.pipe(gulp.dest('dest/'));
});

//css生成文件hash编码并生成rev-manifile.json文件名对照映射
gulp.task('hsCss',function(){
	gulp.src('src/css/*.css')
		.pipe(rev())//
		.pipe(rev.manifest())
		.pipe(gulp.dest('dest/rev'));
});

//Js合并、压缩、重命名、混淆
gulp.task('onJs',function(){
	gulp.src('src/js/*.js')
		.pipe(concat('default.js'))//合并文件
		.pipe(uglify())//压缩
		.pipe(rename({
			dirname: 'js',
			basename: 'default',
			prefix: '',
			suffix: '.min',
			extname: '.js'
		}))
		.pipe(obfuscate())
		.pipe(gulp.dest('dest/'));
});

//Html压缩
gulp.task('onHtml',function(){
	gulp.src('src/*.html')
		.pipe(minifyHtml({
			collapseWhitespace:true,  //从字面意思应该可以看出来，清除空格，压缩html，这一条比较重要，作用比较大，引起的改变压缩量也特别大。
		    collapseBooleanAttributes:true,  //省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>。
		    removeComments:true,  //清除html中注释的部分，我们应该减少html页面中的注释。
		    removeEmptyAttributes:true,  //清除所有的空属性。
		    removeScriptTypeAttributes:true,  //清除所有script标签中的type="text/javascript"属性。
		    removeStyleLinkTypeAttributes:true,  //清除所有Link标签上的type属性。
		    minifyJS:true,  //压缩html中的javascript代码。
		    minifyCSS:true  //压缩html中的css代码。
		}))
		.pipe(gulp.dest('dest/'));
});

//压缩images
gulp.task('onImage',function(){
	gulp.src('src/images/*.{png,jpg,gif,ico}')
		.pipe(imagemin())
		.pipe(gulp.dest('dest/images/'));
});

///Html替换css文件版本
gulp.task('revHtml',function(){
	gulp.src(['dest/rev/*.json','dest/*.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('dest/'));
});
	

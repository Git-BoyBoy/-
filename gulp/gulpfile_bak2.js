'use strict';

//加载gulp以及其他插件
var gulp = require('gulp'),
	assetRev = require('gulp-asset-rev'),
	runSequence = require('run-sequence'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector');

//为css中引入的图片/字体等添加hash编码
gulp.task('assetRev', function(){
  return gulp.src('src/css/*.css')  //该任务针对的文件
   .pipe(assetRev()) //该任务调用的模块
   .pipe(gulp.dest('dest/css')); //编译后的路径
});
//css生成文件hash编码并生成rev-manifile.json文件名对照映射
gulp.task('revCss',function(){
	gulp.src('src/css/*.css')
		.pipe(rev())
		.pipe(rev.manifest())
		.pipe(gulp.dest('dest/rev'));
});

//Html替换css文件版本
gulp.task('revHtml',function(){
	gulp.src(['dest/rev/*.json','dest/*.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('dest/'));
});

'use strict';

var gulp = require('gulp');
var assetRev = require('gulp-asset-rev');
var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');

//定义css、js源文件路径
var cssSrc = 'src/css/*.css',
  cssMinSrc = 'dist/css/*.css',
  jsSrc = 'js/*.js',
  jsMinSrc = 'dist/js/*.js',
  lessSrc = 'src/less/*.less',
  imgMinSrc = 'dist/images/*.{png,jpg,gif,ico}',
  htmlSrc = '*.html';
 
//编译less 定义一个less任务（自定义任务名称）
gulp.task('less', function(){
  return gulp.src(lessSrc)  //该任务针对的文件
   .pipe(less()) //该任务调用的模块
   .pipe(gulp.dest('css'));//编译后的路径
});
 
//为css中引入的图片/字体等添加hash编码
gulp.task('assetRev', function(){
  return gulp.src(cssSrc)  //源文件'src/css/*.css'
   .pipe(assetRev()) //该任务调用的模块
   .pipe(gulp.dest('src')); //编译后的路径
});

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
  return gulp.src(cssMinSrc)
    .pipe(rev()) //文件名加MD5后缀
    .pipe(rev.manifest())  //必须有这个方法 生成一个rev-manifest.json
    .pipe(gulp.dest('dist/css'));  //将rev-manifest.json 保存到 dist/css 目录内
});
 
//压缩css
gulp.task('cssMin', function() {
  return gulp.src(cssSrc)   //压缩的文件
    .pipe(rename({suffix: '.min'}))  
    .pipe(minifyCss()) //执行压缩
    .pipe(gulp.dest('dist/css'));  //输出文件夹
});
 

 
//压缩js
gulp.task('uglify',function(){
  return gulp.src(jsSrc)
   .pipe(rename({suffix: '.min'}))
   .pipe(uglify())
   .pipe(gulp.dest('dist/js'));
});
 
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
  return gulp.src(jsMinSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/js'));
});
 
//压缩html
gulp.task('htmlMin',function(){
  var options = {
    collapseWhitespace:true,  //从字面意思应该可以看出来，清除空格，压缩html，这一条比较重要，作用比较大，引起的改变压缩量也特别大。
    collapseBooleanAttributes:true,  //省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>。
    removeComments:true,  //清除html中注释的部分，我们应该减少html页面中的注释。
    removeEmptyAttributes:true,  //清除所有的空属性。
    removeScriptTypeAttributes:true,  //清除所有script标签中的type="text/javascript"属性。
    removeStyleLinkTypeAttributes:true,  //清楚所有Link标签上的type属性。
    minifyJS:true,  //压缩html中的javascript代码。
    minifyCSS:true  //压缩html中的css代码。
  };
  return gulp.src(htmlSrc)
   .pipe(htmlmin(options))
   .pipe(gulp.dest('dist/html'));
});
 
//Html替换css、js文件版本
gulp.task('revHtml', function () {
  return gulp.src(['dist/**/*.json', 'dist/html/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('dist/html'));
});
 
//压缩image
gulp.task('imageMin', function () {
  gulp.src('images/*.{png,jpg,gif,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});
 
gulp.task('revImage', function(){
  return gulp.src(imgMinSrc)
    .pipe(rev())
    .pipe(rev.manifest())  //必须有这个方法
    .pipe(gulp.dest('dist/images'));
});
 
gulp.task('default', function (done) {
  //condition = false;
  runSequence(  //此处不能用gulp.run这个最大限度并行(异步)执行的方法，要用到runSequence这个串行方法(顺序执行)才可以在运行gulp后顺序执行这些任务并在html中加入版本号
    'less',
    'assetRev',
    'cssMin',
    'revCss',
    'uglify',
    'revJs',
    'imageMin',
    'revImage',
    'htmlMin', 
    'revHtml',    
    done);
});


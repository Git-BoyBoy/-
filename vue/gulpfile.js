var gulp = require('gulp');
var postCss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');

gulp.task('remCss',function(){
	var processors = [px2rem({remUnit : 75})];
	
	return gulp.src('./css/*.css')
			   .pipe(postCss(processors))
			   .pipe(gulp.dest('./dest'));
});

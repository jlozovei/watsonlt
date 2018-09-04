var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('js:watch', function(){
	gulp.watch('./public/dev/js/client.js', gulp.series('js'));
});

gulp.task('js', function(){
	return gulp.src(['./node_modules/jquery/dist/jquery.js',
				'./node_modules/jquery-dateformat/dist/jquery-dateFormat.min.js',
				'./node_modules/toastr/build/toastr.min.js',
				'./public/dev/js/client.js'])
		.pipe(concat('client.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/dist/js'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./public/dev/sass/**/*.scss', gulp.series('sass'));
});

gulp.task('sass', function () {
    return gulp.src('./public/dev/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('default', gulp.series('sass:watch', 'sass', 'js:watch', 'js'));
gulp.task('scripts', gulp.series('js:watch', 'js'));
gulp.task('styles', gulp.series('sass:watch', 'sass'));

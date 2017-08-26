var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('js:watch', function(){
	gulp.watch('./assets/dev/js/*.js', ['js']);
});

gulp.task('js', function(){
	return gulp.src(['./node_modules/jquery/dist/jquery.js',
				'./assets/dev/js/*.js'])
		.pipe(concat('client.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/dist/js'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./assets/dev/sass/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
    return gulp.src('./assets/dev/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./assets/dist/css'));
});

gulp.task('default', ['sass:watch', 'sass', 'js:watch', 'js']);
gulp.task('scripts', ['js:watch', 'js']);
gulp.task('styles', ['sass:watch', 'sass']);

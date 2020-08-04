const gulp  = require('gulp');
const BS    = require('browser-sync').create();
const sass  = require('gulp-sass');
const babel = require('gulp-babel'); 

function style () {

	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./dist/css'))
		.pipe(BS.stream());

}

function script () {

	return gulp.src('./src/es/*.js')
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(gulp.dest('./tmp/js'));

}

gulp.task('serve', function (){

	BS.init({

		server: {
			baseDir: './dist/',
			index: 'index.html'
		}
	
	});

	gulp.watch('./src/scss/*.scss', style);
	gulp.watch('./src/es/*.js', script);
	gulp.watch('./dist/js/*.js').on('change', BS.reload);
	gulp.watch('./dist/index.html').on('change', BS.reload);

});

gulp.task(style);
gulp.task(script);
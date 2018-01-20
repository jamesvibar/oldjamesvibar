var gulp          = require('gulp');//
var jade          = require('gulp-jade');//
var sass          = require('gulp-sass');//
var browserSync   = require('browser-sync');//
var prefix        = require('gulp-autoprefixer');//
var uglify        = require('gulp-uglify');
var imagemin      = require('gulp-imagemin');
var watch         = require('gulp-watch');

var env = process.env.NODE_ENV || 'development';

///////////////////////
// Image Compressor
///////////////////////

gulp.task('imagemin', function() {
  watch({glob: 'src/img/**/*'}, function (files) {
    files.pipe(imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('src/img'))
  });
});

///////////////////////
// Jade Compiler
///////////////////////

gulp.task('jade', function() {
  return gulp.src('src/templates/**/*.jade')
    .pipe(jade())
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('build/'));
});

///////////////////////
// Uglify
///////////////////////

gulp.task('uglify', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js'));
});

///////////////////////
// SASS Compiler
///////////////////////

gulp.task('sass', function() {

  var config = {};

  if (env === 'development') {
    config.sourceComments = 'map';
  }

  if (env === 'production') {
    config.outputStyle = 'compressed';
  }

  return gulp.src('src/css/main.scss')
    .pipe(sass(config))
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('build/assets/css'));
});

///////////////////////
// browserSync startup
///////////////////////

gulp.task('browser-sync', ['sass'], function() {
  browserSync({
    server: {
      baseDir: 'build/' //Start server on root folder
    },
  });
});


//////////////////////////
// Watch for file changes
//////////////////////////

gulp.task('watch', function(){
  gulp.watch('src/css/**', ['sass']);
  gulp.watch('src/templates/*.jade', ['jade']);
  gulp.watch('src/js/*.js', ['uglify']);
});

gulp.task('default', ['browser-sync', 'watch'], function() {
  if (env === 'production') {
    console.log('You are in production mode. CSS will be compressed.');
  }
  if (env === 'development') {
    console.log('You are in developer mode. CSS will not be compressed.')
  }
});

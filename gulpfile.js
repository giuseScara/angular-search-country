var gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  changed = require('gulp-changed'),
  rev = require('gulp-rev'),
  browserSync = require('browser-sync'),
  del = require('del'),
  ngannotate = require('gulp-ng-annotate'),
  bower = require("gulp-bower"),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin');


//download libs
gulp.task('bower', function () {
  return bower();
});

gulp.task('jshint', function () {
  return gulp.src(['app/scripts/**/*.js', 'app/view/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function () {
  return del(['dist', 'json-server/public']);
});

// Default task
gulp.task('default', ['clean', 'bower'], function () {
  gulp.start('usemin', 'imagemin', 'copyfonts', 'copyview');
});

gulp.task('copyDist', function () {
  gulp.src('dist/**/*.*').pipe(gulp.dest('json-server/public/'));
});

gulp.task('cleanDB', function () {
  gulp.src('json-server/originalDB/db.json').pipe(gulp.dest('json-server/'));
});

gulp.task('usemin', ['jshint'], function () {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [sourcemaps.init({
        loadMaps: true
      }), minifycss(), rev(), sourcemaps.write()],
      js: [sourcemaps.init({
        loadMaps: true
      }), ngannotate(), uglify(), rev(), sourcemaps.write()]
    }))
    .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function () {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({
      message: 'Images task complete'
    })), gulp.src('app/images/favicon.ico').pipe(gulp.dest('dist/images'));
});

gulp.task('copyview', function () {
  gulp.src('app/view/**/*.html')
    .pipe(gulp.dest('./dist/view'));

  gulp.src('app/components/**/*.html')
    .pipe(gulp.dest('./dist/components'));
});

gulp.task('copyfonts', ['clean'], function () {
  gulp.src('bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function () {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);

  gulp.watch(['app/view/**/*.*.js', 'app/components/**/*.*.js'], ['usemin']);

  // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

  gulp.watch(['app/view/**/*.html','app/components/**/*.html'], ['copyview']);

});

gulp.task('browser-sync', ['default'], function () {
  var files = [
    'app/**/*.html',
    'app/styles/**/*.css',
    'app/images/**/*.png',
    'app/scripts/**/*.js',
    'app/view/**/*.js',
    'app/view/**/*.html',
    'app/components/**/*.js',
    'app/components/**/*.html',
    'dist/**/*.*',
    'dist/**/*.html',
    'dist/*.html'
  ];

  setTimeout(function () {
    browserSync.init(files, {
      server: {
        baseDir: "dist/",
        index: "index.html"
      }
    });
  }, 3600);

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);

});
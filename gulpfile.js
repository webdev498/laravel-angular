var gulp            = require('gulp'),
    inject          = require('gulp-inject'),
    series          = require('stream-series'),
    mainBowerFiles  = require('main-bower-files'),
    angularFilesort = require('gulp-angular-filesort'),
    ngConstant      = require('gulp-ng-constant'),
    argv            = require('yargs').argv,
    concat          = require('gulp-concat'),
    livereload      = require('gulp-livereload');

var gulpBuildPath = './gulp/build/';
var htmlTarget = gulp.src('./public/index.html');
var paths = {
    'resources': {
        'fonts': './public/fonts/',
    },
    'assets': {
        'bower': './public/lib/',
    }
};

/**
 * automatically add path to new bower/npm js files
 * @return config
 */
 gulp.task('libDepend',  function () {

     //include bower files
     var bowerFiles = gulp.src(mainBowerFiles({
               overrides: {
                   bootstrap: {
                       main: [
                           './dist/js/bootstrap.min.*',
                           './dist/css/bootstrap.min.*',
                           './dist/css/superhero.min.*',
                           './dist/fonts/*.*',
                       ]
                   },
                   'html5-boilerplate': {
                       main: [
                           './dist/js/vendor/modernizr*.js',
                           './dist/css/*.css',
                       ]
                   },
                    'font-awesome': {
                        main: [
                            './css/*.min.css',
                            './font/*.*',
                        ]
                    }
               }
           }), { base: './public/tests/lib', read: false });

     return htmlTarget
       .pipe(inject(bowerFiles, {name: 'bower', relative: true}))
       .pipe(gulp.dest(gulpBuildPath))
       .pipe(gulp.dest('./public/'))
       .pipe(livereload());
});

/**
 * automatically add path to new app js files
 * @return config
 */
gulp.task('appDepend', ['config'], function () {

  //css files
  var cssFiles = gulp.src('./public/css/app.css');

  //include header files
  // var importantFiles = gulp.src('',{read: false});

  //exclude modernizr and readshouldn't be false because of angularFilesort
  var angularFiles = gulp.src([
    './public/js/**/*.js',
    '!./public/js/app*.js',
    '!./public/js/*Module.js',
    '!./public/js/tests/**/*.js',
  ]).pipe(angularFilesort());

  var angularAppFiles = gulp.src([
    './public/js/app*.js',
  ]).pipe(angularFilesort());

  var angularModuleFiles = gulp.src([
    './public/js/*Module.js',
  ]).pipe(angularFilesort());

  return htmlTarget
    .pipe(inject(series(cssFiles, angularAppFiles,
        angularModuleFiles, angularFiles),  {relative: true}))
    .pipe(gulp.dest(gulpBuildPath))
    .pipe(gulp.dest('./public/'))
    .pipe(livereload());
});

/**
 * set environment variables
 * @return config
 */
gulp.task('config', function () {
  var enviroment = argv.env || 'development';
  var config = gulp.src('./public/config/' + enviroment + '.json');

  return config
  .pipe(ngConstant({
      name: 'mainApp',
      deps: false,
    }))
    .pipe(concat("app.env.js"))
    // Writes config.js to dist/ folder
    .pipe(gulp.dest(gulpBuildPath))
    .pipe(gulp.dest('./public/js/'))
    .pipe(livereload());
});

/**
 * task to reload html
 * @return html
 */
gulp.task('html', function() {
    return gulp.src([
        './public/views/**/*.html'
    ])
    .pipe(livereload());
});

gulp.task('icons', function() {
  return gulp.src([
       paths.assets.bower+'font-awesome/fonts/**/*.*',
     ])
     .pipe(gulp.dest(paths.resources.fonts));
});

gulp.task('watch', function() {
   livereload.listen();
   // watch config changes
   gulp.watch([
     './public/config/**/*.json'
   ], ['config']);

   gulp.watch([
     './public/lib/**/*.json',
     './public/lib/**/*.css'
   ], ['libDepend']);


  gulp.watch([
    './public/js/**/*.js',
  ], ['appDepend']);

  gulp.watch([
    './public/views/**/*.html',
  ], ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['icons','libDepend', 'appDepend', 'watch']);

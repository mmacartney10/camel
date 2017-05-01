const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

module.exports = function(gulp, config) {
  gulp.task('scripts', function() {
    return gulp.src(config.src + config.scripts + '*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.dest))
  });
};

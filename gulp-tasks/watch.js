const notify = require('gulp-notify');

module.exports = function(gulp, config) {

  gulp.task('notify', function() {
    return gulp.src('./')
      .pipe(notify('Solution rebuilt'));
  });

  gulp.task('watch', function() {
    return gulp.watch(config.watch, { awaitWriteFinish: true }).on('change', gulp.series('build', 'notify'));
  });
};

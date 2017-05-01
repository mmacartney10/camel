const gulp = require('gulp');
const path = require('path');
const glob = require('glob');
const config = require('./_config/project-config.js');

glob.sync('./gulp-tasks/*.js').forEach(function(file) {
  require(path.resolve(file))(gulp, config);
});

gulp.task('build', gulp.series('styles', 'scripts'));
gulp.task('watch', gulp.series('watch'));
gulp.task('default', gulp.series('build', 'watch'));

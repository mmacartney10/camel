var gulp = require('gulp');
var runSequence = require('run-sequence');

const paths = {
  tasks: './gulp-tasks',
  src: './_source',
  dest: './_client',
  images: '/images',
  scripts: '/scripts',
  styles: '/styles'
}

require(paths.tasks + '/styles.js')(gulp, paths);
require(paths.tasks + '/scripts.js')(gulp, paths);

gulp.task('watch', function() {
  gulp.watch(paths.src + '/**/*.scss', ['styles']);
  gulp.watch(paths.src + '/**/*.js', ['scripts']);
})

gulp.task('default', function() {
  runSequence(['styles', 'scripts'], ['watch'])
});

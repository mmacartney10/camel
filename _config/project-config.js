module.exports = {
  tasks: './gulp-tasks/',
  src: './_source/',
  dest: './_client/',
  images: 'images/',
  scripts: 'scripts/',
  styles: 'styles/',
  views: 'views/',
  itcss: [
    '_source/styles/_settings/*.scss',
    '_source/styles/_tools/**/*.scss',
    '_source/styles/_generic/*.scss',
    '_source/styles/_elements/*.scss',
    '_source/styles/_objects/*.scss',
    '_source/styles/_components/*.scss',
    'views/_partials/**/*.scss',
    '_source/styles/_trumps/*.scss'
  ],
  watch: [
    '_source/styles/_settings/*.scss',
    '_source/styles/_tools/**/*.scss',
    '_source/styles/_generic/*.scss',
    '_source/styles/_elements/*.scss',
    '_source/styles/_objects/*.scss',
    '_source/styles/_components/*.scss',
    'views/_partials/**/*.scss',
    '_source/styles/_trumps/*.scss',
    '_source/scripts/**/*.js'
  ]
}

const gulp = require('gulp')
const fonter = require('gulp-fonter')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')

module.exports = function fonts() {
  gulp.src('#src/assets/fonts/*.otf')
    .pipe(fonter({ formats: ['ttf'] }))
    .pipe(gulp.dest('#src/assets/fonts/'))
  gulp.src('#src/assets/fonts/*.{woff2,woff}').pipe(gulp.dest(require('path').basename(__dirname) + '../assets/fonts/'))
  return gulp.src('#src/assets/fonts/').pipe(ttf2woff()).pipe(gulp.dest(require('path').basename(__dirname) + '../assets/fonts/'))
}
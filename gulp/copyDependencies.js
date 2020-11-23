const gulp = require('gulp')

const concat = require('gulp-concat')
const terser = require('gulp-terser')

module.exports = function copyDependencies() {
  return gulp.src([
      'node_modules/svg4everybody/dist/svg4everybody.legacy.min.js',
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('./dist/scripts/'))
}

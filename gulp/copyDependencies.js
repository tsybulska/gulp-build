const gulp = require('gulp')

const concat = require('gulp-concat')
const terser = require('gulp-terser')

module.exports = function copyDependencies() {
    return gulp.src([
            '',
        ])
        .pipe(concat('libs.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('./dist/scripts/'))
}

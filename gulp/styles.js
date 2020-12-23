const gulp = require('gulp')

const plumber = require('gulp-plumber')
const stylelint = require('gulp-stylelint')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const rename = require("gulp-rename")

module.exports = function styles() {
    return gulp.src('./#src/scss/styles.scss')
        .pipe(plumber())
        .pipe(stylelint({
            failAfterError: false,
            reporters: [{
            formatter: 'string',
            console: true
            }]
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(csso({
            restructure: false,
            debug: true
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/styles/'))
}

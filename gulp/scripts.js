const gulp = require('gulp')

const plumber = require('gulp-plumber')
const eslint = require('gulp-eslint')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const terser = require('gulp-terser')

module.exports = function scripts() {
  return gulp.src('./#src/scripts/scripts.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/scripts/'))
}

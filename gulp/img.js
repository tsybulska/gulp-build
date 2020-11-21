const gulp = require('gulp')
const imagemin = require('gulp-imagemin')

module.exports = function img() {
  return gulp.src('#src/assets/img/*.{jpg,png,svg,gif,ico,webp}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest(require("path").basename(__dirname) + '../assets/img/'))
}

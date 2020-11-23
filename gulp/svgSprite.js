const gulp = require('gulp')

const gulpSvgSprite = require('gulp-svg-sprite')

module.exports = function svgSprite() {
  return gulp.src('./#src/assets/icons/**/*.svg')
    .pipe(
      gulpSvgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(gulp.dest('./dist/assets/icons/'))
}

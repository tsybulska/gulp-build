const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const gulpSvgSprite = require('gulp-svg-sprite')

module.exports = function svgSprite() {
  return gulp.src('#src/assets/icons/*.{svg}')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { removeUnusedNS: false },
          { removeUselessStrokeAndFill: false },
          { cleanupIDs: false },
          { removeComments: true },
          { removeEmptyAttrs: true },
          { removeEmptyText: true },
          { collapseGroups: true }
        ]
      })
    ]))
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
    .pipe(gulp.dest(require("path").basename(__dirname) + '../assets/icons/'))
}

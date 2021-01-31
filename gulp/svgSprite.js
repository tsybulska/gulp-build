const gulp = require('gulp')

const gulpSvgSprite = require('gulp-svg-sprite')
const imagemin = require('gulp-imagemin')

module.exports = function svgSprite() {
    return gulp.src('./#src/assets/icons/**/*.svg')
        .pipe(gulpSvgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg",
                    example: true,
                },
            },
        }))
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
        .pipe(gulp.dest('./dist/assets/icons/'))
}

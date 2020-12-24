const gulp = require('gulp')

const imagemin = require('gulp-imagemin')

module.exports = function img() {
    gulp.src('./#src/assets/favicon/*.ico')
        .pipe(gulp.dest('./dist/assets/favicon/'))
    return gulp.src('./#src/assets/img/*.{jpg,png,svg,gif,ico,webp}')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
            imagemin.optipng({ optimizationLevel: 5 }),
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
        .pipe(gulp.dest('./dist/assets/img/'))
}

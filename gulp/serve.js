const gulp = require('gulp')

const pug2html = require('./pug2html')
const styles = require('./styles')
const scripts = require('./scripts')
const favicon = require('./favicon')
const img = require('./img')
const svgSprite = require('./svgSprite')

const server = require('browser-sync').create()

function readyReload(cb) {
    server.reload()
    cb()
}

module.exports = function serve(cb) {
    server.init({
        server: 'dist',
        notify: false,
        open: true,
        cors: true
    })

    gulp.watch('./#src/assets/favicon/*.{jpg,png,svg,gif,ico,webp}', gulp.series(favicon, readyReload))
    gulp.watch('./#src/assets/img/*.{jpg,png,svg,gif,ico,webp}', gulp.series(img, readyReload))
    gulp.watch('./#src/assets/icons/**/*.svg', gulp.series(svgSprite, readyReload))
    gulp.watch('./#src/scss/**/*.scss', gulp.series(styles, cb => gulp.src('dist/styles').pipe(server.stream()).on('end', cb)))
    gulp.watch('./#src/scripts/**/*.js', gulp.series(scripts, readyReload))
    gulp.watch('./#src/pug/**/*.pug', gulp.series(pug2html, readyReload))

    return cb()
}

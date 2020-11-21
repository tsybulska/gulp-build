const gulp = require('gulp')

const clean = require('./gulp/clean')
const watch = require('./gulp/watch')
const pug2html = require('./gulp/pug2html')
const styles = require('./gulp/styles')
const scripts = require('./gulp/scripts')
const fonts = require('./gulp/fonts')
const fontsStyle = require('./gulp/fontsStyle')
const img = require('./gulp/img')
const svgSprite = require('./gulp/svgSprite')

const dev = gulp.parallel(pug2html, styles, scripts, fonts, fontsStyle, img, svgSprite)

const build = gulp.series(clean, dev)

module.exports.default = gulp.series(build, watch)

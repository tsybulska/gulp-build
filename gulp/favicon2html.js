const gulp = require('gulp')

const realFavicon = require ('gulp-real-favicon')
const fs = require('fs')

let FAVICON_DATA_FILE = 'faviconData.json'

module.exports =  function() {
	return gulp.src([ './dist/*.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('./dist/'))
}

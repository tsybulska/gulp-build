const fs = require('fs')

module.exports = function fontsStyle(cb) {
  if (fs.readFileSync('./#src/scss/_fonts.scss') == '') {
    fs.writeFile('./#src/scss/_fonts.scss', '', cb)
    return fs.readdir('./dist/assets/fonts/', function (err, items) {
      if (items) {
        let c_fontname
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.')
          fontname = fontname[0]
          if (c_fontname != fontname) {
            fs.appendFile('./#src/scss/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb)
          }
          c_fontname = fontname
          
        }
      }
    })
  }
  cb()
}

const del = require('del')

module.exports = function clean(cb) {
  return del('./' + require('path').basename(__dirname) + '/').then(() => {
    cb()
  })
}

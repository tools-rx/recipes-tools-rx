
var path = require('path')

require('babel-register')
console.log('Babel require hook registered.')

var loadFile = process.argv[2]
if (loadFile) {
  console.log('Running ' + loadFile)
  require(path.join(process.cwd(), loadFile))
}

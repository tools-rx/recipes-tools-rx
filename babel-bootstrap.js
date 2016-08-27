
var path = require('path')

require(path.join(__dirname, 'node_modules/babel-cli/node_modules/babel-register'))
console.log('Babel require hook registered.')

var loadFile = process.argv[2]
if (loadFile) {
  console.log('Running ' + loadFile)
  require(path.join(process.cwd(), loadFile))
}

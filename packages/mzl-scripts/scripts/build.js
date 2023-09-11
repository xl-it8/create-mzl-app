process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')
const webpack = require('webpack')
const fs = require('fs-extra')

//清空build
fs.emptyDirSync(paths.appBuild)
//拷贝public目录下处理index.html（webpack需要打包）的其他文件
fs.copySync(paths.appPublic, paths.appBuild, {
  filter: (path) => path !== paths.appHtml,
}) //过滤的要是绝对路径
build()
function build() {
  // Generate configuration
  const config = configFactory('production')
  const complier = webpack(config)
  complier.run()
}

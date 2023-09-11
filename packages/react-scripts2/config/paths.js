const path = require('path')
const resolveApp = (reaciivePath) => path.resolve(process.cwd(), reaciivePath)

module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'), 
  appIndexJs: resolveModule(resolveApp, 'src/index'), //入口文件
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src')
}

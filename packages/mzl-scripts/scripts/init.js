const fs = require('fs-extra')
const path = require('path')
const spawn = require('cross-spawn')
module.exports = function (
  appPath,
  appName,
  verbose,
  originalDirectory,
  templateName
) {
  const appPackage = require(path.join(appPath, 'package.json'))
  const templatePath = path.dirname(
    require.resolve(`${templateName}/package.json`, { paths: [appPath] })
  ) //根据你给出的调用示例 require.resolve('${templateName}/package.json', { paths: [appPath] })，这表示你希望解析 ${templateName}/package.json 模块，并且搜索路径限定在 appPath 所指定的路径下。
  //console.log(appPath) //D:\projectAll\cli\create-react-app2\my-react-app2
  //console.log(templateName) //cra-template2
  //console.log(templatePath) //D:\projectAll\cli\create-react-app2\packages\cra-template2

  appPackage.dependencies = appPackage.dependencies || {}

  appPackage.scripts = Object.assign(
    {
      start: 'react-scripts start',
      build: 'react-scripts build',
    },
    {}
  )

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2)
  ) //写到目标的package.json文件中 有就合并没有就创建
  const templateDir = path.join(templatePath, 'template')
  // console.log(fs.existsSync(templateDir))
  if (fs.existsSync(templateDir)) {
    //拷贝模板文件
    fs.copySync(templateDir,appPath)
  }

  // 卸载模板模块
  let command = 'yarnpkg',
    remove = 'remove',
    args = [
      'install',
      '--no-audit', // https://github.com/facebook/create-react-app/issues/11174
      '--save',
      verbose && '--verbose',
    ].filter((e) => e)

  const prov = spawn(command, [remove, templateName], { stdio: 'inherit' })
  if (prov.status !== 0) {
    console.error(`\`${command} ${args.join(' ')}\` failed`)
    return
  }
}

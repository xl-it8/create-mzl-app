yarn workspaces info 查看所有子工程
yarn install 可以把子包创建软链
yarn add chalk cross-spawn ds-extra --ignore-workspace-root-check 安装包到根目录
 "scripts": {
    "create-react-app": "node ./packages/create-react-app/index.js"
  } npm run create-react-app 或者yarn create-react-app 命令行运行脚本命令
yarn workspace 子项目名称 add 依赖 只给对应的子项目名称添加依赖

bin 字段用于指定可执行文件的入口点。当你希望将你的模块作为命令行工具使用时，可以使用 bin 字段来定义可执行文件的路径或命令。
需要注意的是，如果你的模块是作为本地项目的一部分而不是全局安装的，那么 bin 字段只在本地项目范围内有效。也就是说，只有在项目根目录下使用 npm run <command> 或 yarn <command> 才能执行对应的命令需要配置scripts字段。全局-g安装就可以使用<command>

exports = module.exports exports引用的是module.exports={}对象


path.resolve() 方法在处理路径时会考虑当前工作目录(会一直到最顶层的绝对路径)，而 path.join() 方法只是简单地连接路径片段。
path.basename() 是 Node.js 中的一个方法，用于获取给定路径的基本文件名部分。
   //console.log(path.basename('/home/user/file.txt')); // 输出：file.txt
   //console.log(path.basename('/home/user/')); // 输出：user
path.dirname('D:\\projectAll\\cli\\create-react-app2\\my-create-app')) //始终获取最后一个目录或文件的上一级 

process.exit(1); 程序退出执行

fs.mkdirSync 创建目录文件夹的
fs.writeFileSync可以创建文件
fs.existsSync判断路径(包括文件名)是否存在

require.resolve是node.js提供的为模块或文件获取绝对路径的

  const templatePath = require.resolve(`${templateName}/package.json`, { paths: [appPath]})//根据你给出的调用示例 require.resolve('${templateName}/package.json', { paths: [appPath] })，这表示你希望解析 ${templateName}/package.json 模块，并且搜索路径限定在 appPath 所指定的路径下。

## 使用库
   commander 命令行参数处理
   chalk 给命令行指定颜色文字
   cross-spawn 是一个用于跨平台执行命令的第三方库。它可以在 Node.js 程序中以子进程的形式执行命令，并提供了一些额外的功能和便利性
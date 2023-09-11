const Command = require('commander') //解析命令行参数
const chalk = require('chalk') //彩笔
const packageJson = require('./package.json')
const path = require('path')
const fs = require('fs')
const spawn = require('cross-spawn'); //跨平台的子进程
// const fs = require('fs-extra');
async function init() {
  let projectName
  const program = new Command.Command(packageJson.name)
    .version(packageJson.version) //设置版本
    .arguments('<project-directory>') //命令行传递的参数变量 
    .usage(`${chalk.green('<project-directory>')} [option]`) //使用说明 --help获取 <>代表必须传递参数 []代表可传可不传
    .option('--verbose', 'print additional logs') //--help
    .action((name) => {
      projectName = name
      //   console.log(name)
    })
    .parse(process.argv) //process.argv [node的执行路径, 文件路径, 命令行参数]
  await createApp(projectName)
}

async function createApp(name) {
  const root = path.resolve(name) //D:\projectAll\cli\create-react-app2\my-create-app
  const appName = path.basename(root) //my-create-app
  //   fs.ensureDirSync(appName);
  mkNotExistDir(root) //同步创建文件夹
  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  }
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  ) //写入数据

  const originalDirectory = process.cwd()
  process.chdir(root) //改变进程执行的目录位置
  //console.log(process.cwd()) //D:\projectAll\cli\create-react-app2\my-create-app

 //开始运行 安装包
 await run(root, appName,originalDirectory) 

}


async function run(root, appName,originalDirectory){
  let scriptName ='mzl-scripts'
  let templateName = 'mzl-cra-template'

  const allDependencies = ['react', 'react-dom',scriptName, templateName];

  console.log('Installing packages. This might take a couple of minutes.');
  console.log(
    `Installing ${chalk.cyan('react')}, ${chalk.cyan(
      'react-dom'
    )}, and ${chalk.cyan(scriptName)}${
     ` with ${chalk.cyan(templateName)}`
    }...`
  );

  await install(root,allDependencies) //安装依赖
  let packageName = 'mzl-scripts'
  await exacuteNodeScript({
    cwd: process.cwd()//告知主进程要在哪个最新的目录开始执行命令
  },
  //根路径  app名字 是否详细信息 原始目录位置   模板名称
  [root, appName, verbose = 'undefinded', originalDirectory, templateName],
  `const init = require('${packageName}/scripts/init.js')
   init.apply(null, JSON.parse(process.argv[1]))
  `  //node -e 脚本命令 -- xx xx xx 传递node执行脚本并传递参数
  ) //运行处理对应的脚本

}

async function install(root,allDependencies){
  return new Promise((resolve, reject)=>{
      let command;
      let args;
      command = 'yarnpkg';
      args = ['add', '--exact',...allDependencies,'--cwd', root]; //--cwd安装到root目录中去(改变工作目录)  --exact 参数告诉包管理器只安装指定的版本，如果没有指定该参数，它可能会安装比指定版本更新的版本。

     const child =  spawn(command, args, { stdio: 'inherit' });  //cross-spawn 是一个用于跨平台执行命令的第三方库。它可以在 Node.js 程序中以子进程的形式执行命令，并提供了一些额外的功能和便利性
     child.on('close',(code)=>{ //监听子进程是否成功
        if(code !==0){
         reject({
            command: `${command} ${args.join(' ')}`
         })
        }
        return resolve()
     })
  })
}

async function exacuteNodeScript({cwd, args= []}, data, source){
  // console.log(process.execPath) C:\Program Files\nodejs\node.exe 获取node的安装的运行路径
  return new Promise((resolve, reject)=>{
    //spawn 第一个参数执行路径
      const child = spawn(
        process.execPath,
        [...args, '-e', source, '--', JSON.stringify(data)],
        {stdio: 'inherit', cwd}
      )

      child.on('close', code => {
        if (code !== 0) {
          reject({
            command: `node ${args.join(' ')}`,
          });
          return;
        }
        console.log(data)
        resolve();
      });
  })

}
function mkNotExistDir(target) {
  try {
    fs.mkdirSync(target, { recursive: true })
  } catch (e) {
    mkDir(target)
    function mkDir(target) {
       if(fs.existsSync(target)){
          return true //递归终止条件
       }
       const parentDir = path.dirname(target)
       mkDir(parentDir)
       fs.mkdirSync(parentDir)
    }
  }
}

module.exports = {
  init,
}

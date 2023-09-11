const path = require('path')
const fs = require('fs')
//console.log(path.dirname('D:\\projectAll\\cli\\create-react-app2\\my-create-app\\add.js')) //D:\projectAll\cli\create-react-app2\my-create-app
//fs.mkdirSync(path.dirname('D:\\projectAll\\cli\\create-react-app2\\my-create-app\\add.js'))
// fs.writeFileSync('D:\\projectAll\\cli\\create-react-app2\\my-create-app\\app.js','22')

// console.log(fn().then((res)=>console.log(res)))

// async function fn(){
//     return 2
// }

// console.log(__dirname)
// console.log(process.argv)

// const json = {
//   version: '33',
// }

// fs.writeFileSync(
//   'D:\\projectAll\\cli\\create-react-app2\\examples\\package.json',
//   JSON.stringify(json, null, 2)
// )

const json = {
    ss: '33',
    aa: '33',
  }
  
  fs.writeFileSync(
    'D:\\projectAll\\cli\\create-react-app2\\examples\\package.json',
    JSON.stringify(json, null, 2)
  )
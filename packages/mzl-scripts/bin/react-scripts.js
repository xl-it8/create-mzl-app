var spawn = require('cross-spawn');


const script = process.argv.slice(2)[0]


const res = spawn.sync(
    process.execPath,
    [require(`../scripts/${script}.js`)],
    {stdio: 'inherit'}
)

process.exit(res.status); //结束进程



var Client = require('svn-spawn');
const program = require('commander');
const path = require('path');
const chalk = require('chalk');

async function create(dirname,options) {
    try {
        // 通过 npm run dev 的方法执行的时候，参数更换获取方式
        argv = JSON.parse(process.env.npm_config_argv).original;
        // console.log('：：：：：：',argv);
    } catch (e) {
        argv = process.argv;
    }

    // program
    //     .version('0.1.0')
    //     .option('-d, --dirname <dirname>', '编译目录')
    //     .option('-p, --port <port>', '端口')
    //     .parse(argv);

    // 
    const commit_dir = path.resolve(__dirname,'../h5project',dirname);
    console.log(chalk.blue('commit目录：' + commit_dir));
    var client = new Client({
        cwd: commit_dir,
        username: options.username, // optional if authentication not required or is already saved
        password: options.password, // optional if authentication not required or is already saved
        noAuthCache: true, // optional, if true, username does not become the logged in user on the machine
    });

    client.addLocal(function (err, data) {
        if (err) {
            console.log(chalk.red('addFail:' + err));
            return;
        }
        client.commit('mycommit', function (err, data) {
            if (err) {
                console.log(chalk.red(err));
                return;
            }
            console.log(chalk.green('commit成功'));
        });
    });
}

module.exports=(...args) => {
    // create();
    return create(...args).catch(err => {
      // stopSpinner(false)
      // error(err)
    })
  }

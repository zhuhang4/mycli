const fs = require('fs-extra')
const inquirer = require('inquirer')
const ora = require('ora');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const templatesMap = {
    "common": {
        "url": "",
        "downloadurl": "https://github.com:zhuhang4/common#master",
        "describe": 'A模板'
    }
}
module.exports = async function (preset, targetDir, clone) {
    const spinner = ora(`正在下载${preset}模板...`).start();
    await new Promise((resolve, reject) => {
        // 这里可以根据具体的模板地址设置下载的url，注意，如果是git，url后面的branch不能忽略
        download(templatesMap[preset].downloadurl, targetDir, { clone:true}, (err) => {
            if (err) {
                spinner.fail();
                console.log(err);
                return reject(err)
            }
            spinner.succeed();
            inquirer.prompt([{
                type: 'input',
                name: 'name',
                message: "请输入项目名字"
            }, {
                type: 'input',
                name: 'description',
                message: "请输入项目简介"
            }, {
                type: 'input',
                name: 'author',
                message: "请输入作者名字"
            }]).then((answers) => {
                console.log(answers);
                const packagePath = `${targetDir}/package.json`;
                const packageContent = fs.readFileSync(packagePath, 'utf8');
                const pageageResult = handlebars.compile(packageContent)(answers);
                fs.writeFileSync(packagePath, pageageResult);
                console.log(logSymbols.success, chalk.yellow('初始化模板成功!'));
            })
            // resolve();
        })
    })

    return {
        targetDir,
        tmpdir
    }
}
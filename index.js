#!/usr/bin/env node

//argv数组的第三个选项，就是传入的第一个参数
const program = require('commander');
const minimist = require('minimist');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');

const templates = {
  "common": {
    "url": "",
    "downloadurl": "https://github.com:zhuhang4/common#master",
    "describe": 'A模板'
  },
  "template-b": {
    "url": "",
    "describe": 'B模板'
  },
  "template-c": {
    "url": "",
    "describe": 'C模板'
  },
}

program
  .version(require('./package').version)
  .usage('<command> [options]')


program
  .command('create <folderName>')
  .description('create a new project')
  //选择哪一个模板预设(最后个参数common为默认值)
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset','common')
  .option('-d, --default', 'Skip prompts and use default preset')
  .action((folderName, cmd) => {
    const options = cleanArgs(cmd);
    // console.log(projectName, templates[projectName]);
    // const { downloadurl } = templates[projectName];
    console.log('options:', options);
    // console.log('传入参数:' + minimist(process.argv.slice(3))._);
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(chalk.yellow('\n ⚠️  检测到您输入了多个名称，将以第一个参数为项目名，舍弃后续参数哦'))
    }
    require('./lib/create')(folderName, options);
    return;
  });

// 创建页面命令
program
  .command('pages')
  .option('-p, --savepath <pathName>', 'savepath name','./')
  .description('create pages from resource.json')
  .action((cmd) => {
    const options = cleanArgs(cmd);
    require('./lib/page')(options);
  })

//上传svn
program
  .command('svn <dirname>')
  .option('-u, --username <username>', 'svn username','./')
  .option('-p, --password <password>', 'svn password','./')
  .description('commit svn')
  .action((dirname,cmd) => {
    const options = cleanArgs(cmd);
    require('./lib/svn')(dirname,options);
  })


program
  .command('list')
  .action(() => {
    for (let i in templates) {
      console.log(templates[i].describe + ":" + templates[i].url)
    }
  });
program.parse(process.argv);

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}
function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // 如果没有传递option或者有与之相同的命令，则不被拷贝
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}


const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const loadRemote=require('./loadremote');

/**
 * 创建项目
 * @param {*} projectName 
 * @param {*} options 
 */
async function create(projectName, options) {
  const cwd = process.cwd()
  const targetDir = path.resolve(cwd, projectName || '.')
  
  const inCurrent = projectName === '.'
  if (fs.existsSync(targetDir)) {
    // await clearConsole()
    if (inCurrent) {
      const { ok } = await inquirer.prompt([
        {
          name: 'ok',
          type: 'confirm',
          message: `Generate project in current directory?`
        }
      ])
      if (!ok) {
        return
      }
    }
    else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `目标文件夹 ${chalk.cyan(targetDir)} 已经存在，请选择：`,
          choices: [
            { name: '覆盖', value: 'overwrite' },
            { name: '取消', value: false }
          ]
        }
      ])
      if (!action) {
        return
      } else if (action === 'overwrite') {
        console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
        await fs.remove(targetDir)
      }
    }
  }
  
  loadRemote(options.preset,projectName);
  // await clearConsole()
  // 前面完成准备工作，正式开始创建项目
  //   const creator = new Creator(name, targetDir)
  //   await creator.create(options)
}

module.exports = (...args) => {
  // create();
  return create(...args).catch(err => {
    // stopSpinner(false)
    // error(err)
  })
}
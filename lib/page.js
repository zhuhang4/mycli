const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const nunjucks=require('nunjucks');
const ora = require('ora');
const res=require("../resource.json");

/**
 * 创建项目
 * @param {*} pageName 
 * @param {*} options 
 */
async function create (options) {
  const {savepath}=options;
  console.log(options);
  const cwd = options.cwd || process.cwd()
  // const pagePath = path.resolve(cwd, './src/pages', (pageName.charAt(0).toUpperCase() + pageName.slice(1).toLowerCase()))
  const pkgJsonFile = path.resolve(cwd, 'package.json')
  
  // 如果不存在package.json，说明不再根目录，不能创建
  if (!fs.existsSync(pkgJsonFile)) {
    console.error(chalk.red(
      '\n'+
      '⚠️  请确认您是否在项目根目录下运行此命令\n'
    ))
    return
  }

  for(let name in res)
  {
    // 如果page已经存在，询问覆盖还是取消
    let pagePath = path.resolve(savepath, `${name}.js`)
    if (fs.existsSync(pagePath)) {
      if (options.force) {
        await fs.remove(pagePath)
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: chalk.red(`已存在 ${pagePath} 页面，请选择：`),
            choices: [
              {name: '覆盖', value: true},
              {name: '取消', value: false},
            ]
          }
        ])
        if (!action) {
          // return
        } else {
          console.log(`\nRemoving ${chalk.cyan(pagePath)}...`)
          await fs.remove(pagePath)
          await generatePage(name,savepath);
        }
      }
    }
  }
}

async function generatePage(pageName,savepath) {
  const writePath=path.resolve(savepath, `./${pageName}.js`);
  console.log(`生成 ${chalk.yellow(`${writePath}`)}`)
  const ioTemp = await fs.readFile(path.resolve(path.resolve(__dirname, '../template'), 'PageTemplate.js'))
  const ioContent = nunjucks.renderString(ioTemp.toString(), { 'PageName':pageName })
  await fs.writeFile(writePath, ioContent)
}


module.exports = (...args) => {
  return create(...args).catch(err => {
    // stopSpinner(false)
    // error(err)
  })
}
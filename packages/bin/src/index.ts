import { program } from 'commander'
import { getEntryFileContent, generate } from './utils'
import consola from 'consola'
import { join } from 'path'

program
// 源代码
.option('-n,--name <char>', '脚本名')
.option('-su,--sourceCodeUrl <char>', '脚本作用于网页地址', ".*")
.option('-cu,--controlUrl <char>', '控制地址', "")
.option('-si,--startInject', '是否网页打开时注入脚本', false)
.option('-s,--source <char>', 'webrobot入口文件', 'index.js')
.option('-g,--generate', '是否生产json事务配置', false)


// 解析参数
program.parse()

interface Options {
  name: string
  generate: boolean,
  source: string,
  startInject: boolean,
  sourceCodeUrl: string
  controlUrl: string
}

const options:Options = program.opts();
consola.success("解析参数")
console.log(JSON.stringify(options, null, 2))

const { dir, content } = getEntryFileContent(options.source)!

consola.success("获取脚本")

if (!options.name) {
  consola.error(new Error("-n | --name <char> :脚本名未填写"))
  process.exit(-1)
}

const config = {
  case_name: options.name,
  case_type: 'sourcecode',
  case_sourcecode: content,
  case_process: [],
  control_url: options.controlUrl,
  sourcecode_url: options.sourceCodeUrl,
  start_inject: options.startInject
} as any


consola.success("脚本事务配置")
console.log(JSON.stringify(config, null, 2))

// 是否生成 webrobot.json
if (options.generate) {
  generate(config, dir)
  consola.success(`生成 webrobot.json`)
  console.log(`${join(dir, 'webrobot.json')}`)
}

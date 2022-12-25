import { writeFileSync } from 'fs'
import { join } from 'path'

export interface WebrobotSourceOptions {
  /**
   * 事务名
   */
  case_name: string
  /**
   * 事务类型
   */
  case_type: 'sourcecode'
  /**
   * 控制url：*
   */
  control_url: string
  /**
   * 脚本源码
   */
  case_sourcecode: string
  /**
   * 脚本执行的地址：.*
   */
  sourcecode_url: string
  /**
   * 是否开始注入：true
   */
  start_inject: boolean
}

/**
 * 生产事务配置文件
 */
export function generate(options: WebrobotSourceOptions, dirname: string ,filename: string = 'webrobot.json') {
  writeFileSync(join(dirname, filename), JSON.stringify(options || {}, null, 2), {  encoding: 'utf-8' })
}

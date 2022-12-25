import consola, { LogLevel } from 'consola';
import chalk from 'chalk'
consola.info("消息");
consola.debug("DEBUG")
consola.success("DEBUG")
consola.warn("DEBUG")
consola.error(new Error(`错误消息：${111}`))

console.log(chalk.red("eeee") + chalk.bgCyan.red("XXX"))

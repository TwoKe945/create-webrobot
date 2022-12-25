import { join, dirname } from 'path'
import { existsSync, readFileSync } from 'fs'
import consola from 'consola'
const EntryFileName:string = "index.js"

const cwd = process.cwd()


export function getEntryFileContent(filename: string = EntryFileName) {
  let entryPath = join(cwd, filename)
  if (!existsSync(entryPath)) {
    let entryPath = join(cwd, 'src', filename)
    if (!existsSync(entryPath)) {
      entryPath = null as any;
      consola.error(new Error(`not found file: ${entryPath}`))
      process.exit(-1);
    }
  }
  if (entryPath) {
    const content = readFileSync(entryPath, { encoding: 'utf8' })
    return {
      dir: dirname(entryPath),
      entryPath,
      content
    }
  }
}

import fs from 'fs'
import path from 'path'

const root = process.cwd()
const cachesFileName = 'imagemin.map.json'

export default class Cache {
  /**
   * 缓存文件输出的路径
   */
  outputPath: String

  constructor({ outputPath }) {
    this.outputPath = outputPath ? path.join(root, outputPath, cachesFileName) : path.join(root, cachesFileName)
  }

  async readCachesFile() {
    if (fs.existsSync(this.outputPath)) {
      const caches = fs.readFileSync(this.outputPath)
      console.log(caches)
      return caches
    } else {
      return {}
    }
  }

  async writeCachesFile() {
    const caches = this.readCachesFile()
    
  }
}
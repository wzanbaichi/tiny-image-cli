import fs from 'fs'
import path from 'path'

import { cachesFileName } from './constant'

// interface
import { FileReadAndWritePath } from './types/index'

const root = process.cwd()

export default class Cache {
  /**
   * 缓存文件输出的路径
   */
  public cacheFilePath: string
  /**
   *
   * 缓存数据
   */
  public caches: object

  constructor({ cacheFilePath = '' }) {
    this.cacheFilePath = cacheFilePath
      ? path.join(root, cacheFilePath, cachesFileName)
      : path.join(root, cachesFileName)
    this.caches = this.readCaches()
  }

  private readCaches() {
    try {
      const cachesString: string = fs.readFileSync(this.cacheFilePath, 'utf-8')
      const caches = JSON.parse(cachesString)
      return caches
    } catch {
      return {}
    }
  }

  async writeCache(pathData: FileReadAndWritePath): Promise<void> {
    const sourceFileStat = fs.statSync(pathData.toPath)
    const compressionFileStat = fs.statSync(pathData.toPath)
    this.caches[pathData.fromPath] = {
      from: {
        lastModifyTimeStamp: sourceFileStat.ctimeMs
      },
      to: {
        path: pathData.toPath,
        lastModifyTimeStamp: compressionFileStat.ctimeMs
      }
    }
    fs.writeFileSync(this.cacheFilePath, JSON.stringify(this.caches))
  }

  /**
   *
   * @param imagePath
   * @returns
   */
  compareCache(pathData: FileReadAndWritePath): boolean {
    try {
      const sourceFileStat = fs.statSync(pathData.fromPath)
      // const compressionFileStat = fs.statSync(pathData.toPath)
      const cacheStat = this.caches[pathData.fromPath].from
      return (
        sourceFileStat.ctimeMs === cacheStat.lastModifyTimeStamp && fs.existsSync(pathData.toPath)
      )
      // const cacheTimeStamp = this.caches[imagePath].lastModifyTimeStamp
      // const toPath = this.caches[imagePath].to
      // const toFileStat = fs.statSync(toPath)
      // console.log(toFileStat.ctimeMs, cacheTimeStamp)
      // return cacheTimeStamp === toFileStat.ctimeMs
    } catch {
      return false
    }
  }
}

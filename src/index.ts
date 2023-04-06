#!/usr/bin/env node
import path from 'path'
import { Command } from 'commander'
import inquirer from 'inquirer'

import { VERSION } from './constant'
import Cache from './cache'
import sharpCompress from './sharp'
import { getOptions } from './options'
import Count from './count'
import { startLog, compressDoneLog, noImagesLog } from './log'

// utils
import { filterFiles, fileReadAndWritePath, asyncForEach, filterImagesPath } from './utils'

// interface
import { CompressTypeOptions, FileReadAndWritePath } from './types/index'

const root = process.cwd()
const program = new Command()

// 设置程序的基础信息
program.name('tiny-image-cli').description('A CLI tool for compress images').version(VERSION)

// 接受需要解压的图片path参数
program.argument('[string]', 'The path of the image that needs to be compressed.')

// options

// 是否将本次压缩的图片添加至缓存文件里
program
  .option('-p, --path <path>', 'set images path')
  .option('-r, --recursive', 'compress all images recursively')
  .option(
    '--cache [cacheFilePath]',
    'generate cache files and avoid compressing images saved in them during the next compression'
  )
  // 设置缓存文件的路径
  // .option('--caches-path <path>', 'Set caches file path')
  // 压缩后时候直接覆盖源文件
  .option('--cover', 'overwrite the source file')
// 递归压缩所有图片文件

program.parse(process.argv)
const options = program.opts()
const { recursive } = options
const imageFileDir: string = path.join(root, typeof options.path === 'string' ? options.path : '')
const fromPath = options.path || '.'
const succeededCount = new Count()
const cachedCount = new Count()
const filesPath: string[] = filterFiles(imageFileDir, recursive)
const imagesPath: string[] = await filterImagesPath(filesPath)
const sharpOptions: CompressTypeOptions = getOptions()
let isCover: boolean
let cache: Cache
if (options.cover) {
  const { cover } = await inquirer.prompt({
    type: 'confirm',
    name: 'cover',
    message: 'This operation will directly overwrite the original file. Do you want to continue?'
  })
  isCover = cover
}

if (options.cache) {
  const cachesFilePath = typeof options.cache === 'string' ? options.cache : ''
  cache = new Cache({ cacheFilePath: cachesFilePath })
}

/**
 * start compress
 */
imagesPath.length && startLog(imagesPath.length, imageFileDir)
await asyncForEach(imagesPath, async (imagePath: string) => {
  const imageReadAndWriteOptions = {
    filePath: imagePath,
    fromPath: fromPath
  }
  const pathData: FileReadAndWritePath = fileReadAndWritePath(imageReadAndWriteOptions)
  if (cache) {
    const compareCacheResult: boolean = await cache.compareCache(pathData)
    if (!compareCacheResult) {
      const result: boolean = await sharpCompress(pathData, sharpOptions, isCover)
      result && cache.writeCache(pathData)
      succeededCount.addOne()
    } else {
      cachedCount.addOne()
    }
  } else {
    await sharpCompress(pathData, sharpOptions, isCover)
    succeededCount.addOne()
  }
})

imagesPath.length && compressDoneLog(succeededCount.count, cachedCount.count)
!imagesPath.length && noImagesLog()

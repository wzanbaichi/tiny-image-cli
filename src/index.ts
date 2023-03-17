#!/usr/bin/env node
import path from 'path'
import { Command } from 'commander'
import inquirer from 'inquirer'

import { VERSION } from './constant'
import Cache from './cache'
import sharpCompress from './sharp'
import { getOptions } from './options'
// utils
import { filterFiles, fileReadAndWritePath, asyncForEach } from './utils'

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
  .option(
    '--cache [cacheFilePath]',
    'Generate cache files and avoid compressing images saved in them during the next compression'
  )
  // 设置缓存文件的路径
  // .option('--caches-path <path>', 'Set caches file path')
  .option('-p --path <path>', 'Set images path')
  // 压缩后时候直接覆盖源文件
  .option('--cover', 'Overwrite the source file')
  // 递归压缩所有图片文件
  .option('-r --recursive', 'Compress all images recursively')

program.parse(process.argv)
const options = program.opts()
console.log(options)
let isCover: boolean

if (options.cover) {
  const { cover } = await inquirer.prompt({
    type: 'confirm',
    name: 'cover',
    message: 'This operation will directly overwrite the original file. Do you want to continue?'
  })
  isCover = cover
}

const { recursive } = options
const imageFileDir: string = path.join(root, typeof options.path === 'string' ? options.path : '')
const fromPath = options.path || '.'
let cache: Cache

if (options.cache) {
  const cachesFilePath = typeof options.cache === 'string' ? options.cache : ''
  cache = new Cache({ cacheFilePath: cachesFilePath })
}

const imagesPath: string[] = filterFiles(imageFileDir, recursive)
const sharpOptions: CompressTypeOptions = getOptions()
asyncForEach(imagesPath, async (imagePath: string) => {
  const imageReadAndWriteOptions = {
    filePath: imagePath,
    fromPath: fromPath
  }
  const pathData: FileReadAndWritePath = fileReadAndWritePath(imageReadAndWriteOptions)
  if (cache) {
    const compareCacheResult: boolean = cache.compareCache(pathData)
    if (!compareCacheResult) {
      const result: boolean = await sharpCompress(pathData, sharpOptions, isCover)
      result && cache.writeCache(pathData)
    }
  } else {
    sharpCompress(pathData, sharpOptions, isCover)
  }
})

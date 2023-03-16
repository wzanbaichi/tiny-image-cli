#!/usr/bin/env node
import path from 'path'
import { Command } from 'commander'

import { VERSION } from './constant'
import Cache from './cache'
import sharpCompress from './sharp'
import { getOptions } from './options'
// utils
import { filterFiles, fileReadAndWritePath } from './utils'

// interface
import { CompressTypeOptions } from './types/index'

const root = process.cwd()
const program = new Command()

// 设置程序的基础信息
program.name('tiny-image-cli').description('A CLI tool for compress images').version(VERSION)

// 接受需要解压的图片path参数
program.argument('[string]', 'The path of the image that needs to be compressed.')

// options

// 是否将本次压缩的图片添加至缓存文件里
program
  .option('--no-caches', 'Do not generate caches file')
  // 设置缓存文件的路径
  .option('--caches-path <path>', 'Set caches file path')
  .option('-p --path <path>', 'Set images path')
  // 压缩后时候直接覆盖源文件
  .option('-cover', 'Overwrite the source file')
  // 递归压缩所有图片文件
  .option('-r --recursive', 'Compress all images recursively')

program.parse(process.argv)

const options = program.opts()
console.log(options)
const { recursive } = options

if (options.caches) {
  const { cachesPath = '/' } = options
  const cachesFilePath: string = path.join(root, cachesPath)
  const cache: Cache = new Cache({ outputPath: cachesFilePath })
  cache.readCachesFile()
}

if (options.path) {
  const dirPath: string = path.join(root, options.path)
  const imagesPath: string[] = filterFiles(dirPath, recursive)
  const sharpOptions: CompressTypeOptions = getOptions()
  imagesPath.forEach((imagePath: string) => {
    const imageReadAndWriteOptions = {
      filePath: imagePath,
      fromPath: options.path
    }
    const pathData = fileReadAndWritePath(imageReadAndWriteOptions)
    sharpCompress(pathData, sharpOptions)
  })
}

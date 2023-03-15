#!/usr/bin/env node

import { Command } from 'commander'

import { VERSION } from './constant'

const program = new Command()

// 设置程序的基础信息
program
  .name('tiny-image-cli')
  .description('A CLI tool for compress images')
  .version(VERSION)

// 接受需要解压的图片path参数
program.argument(
  '[string]',
  'The path of the image that needs to be compressed.'
)

// options
// 是否将本次压缩的图片添加至缓存文件里
program.option(
  '-caches',
  'Whether to add the compressed images from this compression to the cache file'
)
program.option('-cover', 'Whether to overwrite the source file')
program.option('-r --recursion', 'Compress all images recursively')

program.parse(process.argv)

// const options = program.opts()

// if (options.list) {
//   console.log('list')
// }

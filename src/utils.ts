import * as fs from 'fs'
import path from 'path'

import { outputDir } from './constant'

// interface
import { FileReadAndWritePathOptions, FileReadAndWritePath } from './types/index'

const root = process.cwd()

/**
 * @param { string } dirPath 文件夹路径
 * @param { boolean } recursion 文件夹路径
 * @description 获取文件夹下文件路径集合
 */
export const filterFiles = (
  dirPath: string,
  recursive: boolean,
  fileList: string[] = []
): string[] => {
  const files = fs.readdirSync(dirPath)

  files.forEach((file: string) => {
    const filePath: string = path.join(dirPath, file)
    const isDirectory: boolean = fs.statSync(filePath).isDirectory()
    if (isDirectory && recursive) {
      filterFiles(filePath, recursive, fileList)
    } else {
      fileList.push(filePath)
    }
  })
  return fileList
}

/**
 *
 * @param bytes
 * @returns
 * @description 字节单位转换
 */
export const bytesTransform = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB'
  else return (bytes / 1073741824).toFixed(2) + ' GB'
}

/**
 *
 * @param { FileReadAndWritePathOptions }
 * @returns
 * @description 获取图片的写入和写出路径
 */
export const fileReadAndWritePath = ({
  filePath,
  fromPath,
  to = 'origin'
}: FileReadAndWritePathOptions): FileReadAndWritePath => {
  fromPath = path.join(root, fromPath)
  const fileName:string = path.basename(filePath)
  const outputPath:string = path.join(root,outputDir)

  const toPath =
    to === 'current' ? path.join(root, outputDir, fileName) : filePath.replace(fromPath, outputPath)
  return {
    fromPath: filePath,
    toPath: path.normalize(toPath)
  }
}

export const asyncForEach = async (array: any[], callback: Function) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

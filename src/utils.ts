import * as fs from 'fs'
import path from 'path'
import sharp from 'sharp'

import { outputDir } from './constant'

// interface
import type { FileReadAndWritePathOptions, FileReadAndWritePath } from './types/index'

// map
import { imageTypeMap } from './maps'

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

export const asyncForEach = async (array: any[], callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const filterAsync = async (array, filterFunc) => {
  const result = await Promise.all(
    array.map(async (item) => {
      return (await filterFunc(item)) ? item : undefined
    })
  )
  return result.filter((item) => item !== undefined)
}

/**
 *
 * @param filesPath
 * @returns
 * @description 在文件列表中筛选出支持压缩的图片列表
 */
export const filterImagesPath = (filesPath: string[]) =>
  filterAsync(filesPath, async (p) => {
    try {
      const image = sharp(p)
      const metadata = await image.metadata()
      const { format } = metadata
      return imageTypeMap.has(format)
    } catch (error) {
      return false
    }
  })
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
  const fileName: string = path.basename(filePath)
  const outputPath: string = path.join(root, outputDir)

  const toPath =
    to === 'current' ? path.join(root, outputDir, fileName) : filePath.replace(fromPath, outputPath)
  return {
    fromPath: filePath,
    toPath: path.normalize(toPath)
  }
}

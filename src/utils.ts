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
  const fileName = path.basename(filePath)

  const toPath =
    to === 'current' ? path.join(root, outputDir, fileName) : filePath.replace(fromPath, outputDir)
  return {
    fromPath: filePath,
    toPath
  }
}

export const generateDir = () => {
  const getDirectories = (path) => {
    return fs
      .readdirSync(path)
      .filter((file) => {
        return fs.statSync(path + '/' + file).isDirectory()
      })
      .map((directory) => {
        return path + '/' + directory
      })
      .map((directory) => {
        return {
          path: directory,
          children: getDirectories(directory)
        }
      })
  }

  const createDirectories = (directories, basePath = '') => {
    directories.forEach((directory) => {
      const directoryPath = basePath + '/' + path.basename(directory.path)
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath)
      }
      createDirectories(directory.children, directoryPath)
    })
  }

  const directories = getDirectories('/path/to/folder')
  createDirectories(directories, '/path/to/new/folder')
}

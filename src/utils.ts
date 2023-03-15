import * as fs from 'fs'
import path from 'path'

/**
 * @param { string } dirPath 文件夹路径
 * @param { boolean } recursion 文件夹路径
 * @description 获取文件夹下文件路径集合
 */
export const filterFiles = (dirPath, recursive) => {
  const files = fs.readdirSync(dirPath)
  const fileList = []

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    const isDirectory = fs.statSync(filePath).isDirectory()
    if (isDirectory && recursive) {
      filterFiles(filePath, recursive)
    } else {
      fileList.push(filePath)
    }
  })
  return fileList
}

export const bytesTransform = (bytes) => {
  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB'
  else return (bytes / 1073741824).toFixed(2) + ' GB'
}

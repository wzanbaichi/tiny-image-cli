import sharp from 'sharp'
import * as fs from 'fs'
import path from 'path'

import { compressSuccessLog, errorLog } from './log'

// maps
import { imageTypeMap } from './maps'

// interface
import { CompressTypeOptions } from './types/index'
import { FileReadAndWritePath } from './types/index'

export default async (
  pathData: FileReadAndWritePath,
  options: CompressTypeOptions,
  isCover: boolean
): Promise<boolean> => {
  const outputPath: string = path.dirname(pathData.toPath)
  const image = sharp(pathData.fromPath)
  const oldSize: number = fs.statSync(pathData.fromPath).size
  try {
    const metadata = await image.metadata()
    const { format } = metadata
    const compressType: string = imageTypeMap.get(format) || ''
    if (compressType) {
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true })
      }
      await new Promise<boolean>((resolve, reject) => {
        image[compressType](options[compressType])
          .withMetadata()
          .toFile(pathData.toPath, (err, info) => {
            if (err) {
              errorLog(err)
              reject(err)
            } else {
              if (isCover) {
                fs.renameSync(pathData.toPath, pathData.fromPath)
                fs.rmdirSync(outputPath)
              }
              compressSuccessLog(pathData, oldSize, info.size)
              resolve(true)
            }
          })
      })
      return true
    }
    return false
  } catch {
    return false
  }
}

// fs.renameSync('path/to/compressed-image.jpg', 'path/to/image.jpg')

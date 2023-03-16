import sharp from 'sharp'
import * as fs from 'fs'
import path from 'path'

// utils
import { bytesTransform } from './utils'

// maps
import { imageTypeMap } from './maps'

// interface
import { CompressTypeOptions } from './types/index'
import { FileReadAndWritePath } from './types/index'

// const root: string = process.cwd()

export default async (
  pathData: FileReadAndWritePath,
  options: CompressTypeOptions
): Promise<void> => {
  // const imageDirPath = path.dirname(imagePath)
  // console.log(imageDirPath)
  // console.log(path.relative(root, imageDirPath))
  // const imageFileName: string = path.basename(imagePath)
  const outputPath: string = path.dirname(pathData.toPath)
  const image = sharp(pathData.fromPath)
  const oldSize: number = fs.statSync(pathData.fromPath).size

  try {
    const metadata = await image.metadata()
    const { format } = metadata
    const compressType: string = imageTypeMap.get(format) || ''
    if (compressType) {
      console.log(outputPath)
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true })
      }
      image[compressType](options[compressType]).toFile(pathData.toPath, (err, info) => {
        if (err) {
          console.log(err)
        } else {
          console.log(
            `${pathData.fromPath}:oldSize:${bytesTransform(oldSize)} ==>> newSize:${bytesTransform(
              info.size
            )}`
          )
        }
      })
    }
  } catch {}
  // fs.renameSync('path/to/compressed-image.jpg', 'path/to/image.jpg')
}

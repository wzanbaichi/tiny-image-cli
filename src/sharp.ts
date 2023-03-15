import sharp from 'sharp'
import * as fs from 'fs'
import path from 'path'

// utils
import { bytesTransform } from './utils'

// maps
import { imageTypeMap } from './maps'

import { sharpOptions } from './compressOptions'

const root = process.cwd()

export default async (imagePath: string) => {
  const imageFileName = path.basename(imagePath)
  const outputPath = path.join(root, 'images', imageFileName)
  const image = sharp(imagePath)
  const oldSize = fs.statSync(imagePath).size

  try {
    const metadata = await image.metadata()
    const { format } = metadata
    const compressType = imageTypeMap.get(format)
    if (compressType) {
      image[compressType](sharpOptions[compressType]).toFile(
        outputPath,
        (err, info) => {
          if (err) {
            console.log(err)
          } else {
            console.log(
              `${imagePath}:oldSize:${bytesTransform(oldSize)} ==>> newSize:${bytesTransform(
                info.size
              )}`
            )
          }
        }
      )
    }
  } catch {}

  // fs.renameSync('path/to/compressed-image.jpg', 'path/to/image.jpg')
}

import sharp from 'sharp'
import * as fs from 'fs'
import path from 'path'

// utils
import { bytesTransform } from './utils'
import { imageTypeMap } from './maps'

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
      image[compressType]({ quality: 75 }).toFile(outputPath, (err, info) => {
        if (err) {
          console.log(err)
        } else {
          console.log(
            `oldSize:${bytesTransform(oldSize)} ==>> newSize:${bytesTransform(
              info.size
            )}`
          )
        }
      })
    }
  } catch {}

  // sharp(imagePath)
  //   .jpeg({ quality: 75 })
  //   .toFile(outputPath, (err, info) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(info)
  //     }
  //   })
  // fs.renameSync('path/to/compressed-image.jpg', 'path/to/image.jpg')
}

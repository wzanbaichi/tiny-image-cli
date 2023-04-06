import chalk from 'chalk'

// utils
import { bytesTransform } from './utils'

const logTitle = chalk.cyanBright('[tiny-image-cli]')

export const compressSuccessLog = (pathData, oldSize, newSize) => {
  const oldSizeString = bytesTransform(oldSize)
  const newSizeString = bytesTransform(newSize)
  console.log(
    `${chalk.cyanBright(pathData.fromPath)} ${chalk.yellowBright(
      oldSizeString
    )} ➡️  ${chalk.greenBright(newSizeString)}`
  )
}

export const startLog = (fileTotal: number, path: string) => {
  console.log(
    `${chalk.greenBright(
      `${logTitle} ${chalk.blackBright('Compression Ability Comes From Sharp')}`
    )}\n`
  )
  console.log(
    `${chalk.greenBright('The root path for the images:')} ${chalk.bgWhiteBright.black(path)}`
  )
  fileTotal &&
    console.log(
      `${chalk.greenBright(
        `Found ${chalk.greenBright(fileTotal || 0)} images that can be compressed`
      )}\n`
    )
}

export const compressDoneLog = (succeededCount, cachedCount) => {
  const cachedLog = cachedCount
    ? `\n${logTitle} ${chalk.greenBright(
        `There are ${chalk.cyanBright(cachedCount)} files cached in the cache file.`
      )}`
    : ''
  console.log(`\n${chalk.greenBright(`${logTitle} Successfully 🌝`)}`)
  console.log(
    `${logTitle} ${chalk.greenBright(
      `Compression Completed. A total of ${chalk.cyanBright(
        succeededCount
      )} images have been compressed`
    )} ${cachedLog}`
  )
}

export const errorLog = (err) => {
  console.log(`${logTitle} ${chalk.red(err)}`)
}

export const noImagesLog = () => {
  console.log(
    `${chalk.magentaBright(
      `${logTitle} No image file was found. Please check if your path is correct.`
    )}`
  )
}

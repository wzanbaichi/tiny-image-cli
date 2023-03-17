import chalk from 'chalk'

// utils
import { bytesTransform } from './utils'

const logTitle = chalk.cyanBright('[tiny-image-cli]')

export const compressSuccessLog = (pathData, oldSize, newSize) => {
  oldSize = bytesTransform(oldSize)
  newSize = bytesTransform(newSize)
  console.log(
    `${chalk.cyanBright(pathData.fromPath)} ${chalk.yellowBright(oldSize)} ➡️  ${chalk.greenBright(
      newSize
    )}`
  )
}

export const startLog = (fileTotal: number, path: string) => {
  console.log(`${chalk.greenBright(`${logTitle} ${chalk.blackBright('Ability Comes From Sharp')}`)}\n`)
  console.log(
    `${chalk.greenBright('The root path for the images:')} ${chalk.bgWhiteBright.black(path)}`
  )
  console.log(
    `${chalk.greenBright(
      `Found ${chalk.greenBright(fileTotal || 0)} images that can be compressed`
    )}\n`
  )
}

export const compressDoneLog = (count) => {
  console.log(`\n${chalk.greenBright(`${logTitle} Successfully 🌝`)}`)
  console.log(
    `${logTitle} ${chalk.greenBright(
      `Compression Completed. A total of ${chalk.cyanBright(count)} images have been compressed`
    )}`
  )
}

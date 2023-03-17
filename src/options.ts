import fs from 'fs'
import path from 'path'
import { configFileName } from './constant'
import { sharpOptions } from './compressOptions'

// interface
import type { CompressTypeOptions } from './types/index'

export const getOptions = (): CompressTypeOptions => {
  const root: string = process.cwd()
  const optionsFilePath: string = path.join(root, configFileName)
  if (fs.existsSync(optionsFilePath)) {
    const optionsFile: string = fs.readFileSync(optionsFilePath, 'utf-8') || '{}'
    const customOptions = JSON.parse(optionsFile)
    Object.keys(sharpOptions).forEach((key: string) => {
      sharpOptions[key] = {
        ...sharpOptions[key],
        ...customOptions[key]
      }
    })
    return customOptions
  }
  return sharpOptions
}

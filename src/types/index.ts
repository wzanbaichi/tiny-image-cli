export interface CompressTypeOptions {
  jpeg: any
  avif: any
  png: any
  webp: any
  tiff: any
  gif: any
}

export interface FileReadAndWritePathOptions {
  /**
   * 文件路径
   */
  filePath: string
  /**
   * 文件来源相对于root的根目录 来源于CLI -path参数
   */
  fromPath: string
  /**
   * 文件写入路径
   * current: 文件写入的路径为平铺在outputDir下
   * origin: 文件写入的路径在outputDir下的层级和原文件一致
   */
  to?: 'current' | 'origin'
}

export interface FileReadAndWritePath {
  fromPath: string
  toPath: string
}

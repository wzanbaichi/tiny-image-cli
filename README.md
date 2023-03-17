<h1 align="center">Welcome to tiny-image-cli 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/tiny-image-cli" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/tiny-image-cli.svg">
  </a>
  <a href="https://github.com/AI-Finance-FE/tiny-image#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
</p>

## 📖Description
>
> A CLI tool for compress image files
> Compression Ability Comes From [Sharp](https://sharp.pixelplumbing.com)

## 🚀Usage

To use tiny-image-cli, enter the following command in your terminal:

```
npx tiny-image-cli
```

## Installation

To install tiny-image-cli, use the following command:

```
npm install -g tiny-image-cli
```

or

```
npm install tiny-image-cli --save -dev
```

Add script to your ```package.json```

```
{
  "script": {
    "tiny-image": "tiny-image-cli"
  }
}
```

## Options

- `V, --version`: Output the version number
- `p, --path <path>`: Set images path
- `r, --recursive`: Compress all images recursively
- `-cache [cacheFilePath]`: Generate cache files and avoid compressing images saved in them during the next compression
- `-cover`: Overwrite the source file
- `h, --help`: Display help for command.

## Examples

Compress a single image:

```
tiny-image-cli /path/to/image.jpg

```

Compress all images in a directory:

```
tiny-image-cli -p /path/to/images/folder -r

```

Compress all images in a directory and generate cache files:

```--cache``` options will generate a caches file ```imagemin.map.json```

```
tiny-image-cli -p /path/to/images/folder -r --cache

```

Compress all images in a directory and overwrite the source file:

```
tiny-image-cli -p /path/to/images/folder -r --cover

```

## ⚙️ Configuration

You can configure the image compression parameters in tiny-image.config.json file. Here's an example of the configuration options:

From [sharp](https://sharp.pixelplumbing.com/api-output)

Jsut Modify the fields you want to change

```
{
  "avif": {
    "quality": 50,
    "lossless": false,
    "effort": 4,
    "chromaSubsampling": "4:4:4"
    // options.quality number  quality, integer 1-100 (optional, default 50)
    // options.lossless boolean  use lossless compression (optional, default false)
    // options.effort number  CPU effort, between 0 (fastest) and 9 (slowest) (optional, default 4)
    // options.chromaSubsampling string  set to '4:2:0' to use chroma subsampling (optional, default '4:4:4')
  },
  "jpeg": {
    "quality": 75,
    "progressive": false,
    "chromaSubsampling": "4:4:4",
    "trellisQuantisation": false,
    "overshootDeringing": false,
    "optimiseScans": false,
    "optimizeScans": false,
    "optimiseCoding": true,
    "optimizeCoding": true,
    "quantisationTable": 0,
    "quantizationTable": 0,
    "force": true
    // quality (Number) 图片质量，整数1-100(可选，默认80)
    // progressive (Boolean) 使用渐进式(交错)扫描(可选，默认为false)
    // chromaSubsampling (String) 设置为“4:4:4”，以防止质量<= 90时色度子采样(可选，默认为“4:2:0”)
    // trellisQuantisation (Boolean) 应用网格量化，需要mozjpeg(可选，默认为false)
    // overshootDeringing (Boolean) 应用超调脱靶，需要mozjpeg(可选，默认为false)
    // optimiseScans (Boolean) 优化渐进式扫描，强制渐进式扫描，要求mozjpeg(可选，默认为false)
    // optimizeScans (Boolean) optimizeScan的替代拼写(可选，默认为false)
    // optimiseCoding (Boolean) 优化Huffman编码表(可选，默认为true)
    // optimizeCoding (Boolean) optimiseCoding的替代拼写(可选，默认为true)
    // quantisationTable (Number) 要使用量子化表，整数0-8，需要mozjpeg(可选，默认为0)
    // quantizationTable(Number) quantisationTable的替代边写，整数0-8，需要mozjpeg(可选，默认为0)
    // force (Boolean) 强制JPEG输出，否则尝试使用输入格式(可选，默认为true)
  },
  // progressive (Boolean) 使用渐进式(交错)扫描(可选，默认为false)
  // compressionLevel (Number) zlib压缩级别，0-9(可选，默认9)
  // adaptiveFiltering (Boolean) 使用自适应行筛选(可选，默认为false)
  // force (Boolean) 强制PNG输出，否则尝试使用输入格式(可选，默认为true)
  "png": {
    "progressive": false,
    "compressionLevel": 6,
    "adaptiveFiltering": false,
    "force": true,
    "palette": true,
    "quality": 75,
    "effort": 5,
    "bitdepth": 8,
    "dither": 1
  },
  // options (Object)
  // quality (Number) 质量，整数1-100(可选，默认80)
  // alphaQuality (Number) alpha层的质量，整数0-100(可选，默认100)
  // lossless (Boolean) 使用无损压缩模式(可选，默认为false)
  // nearLossless (Boolean) 使用接近无损压缩模式(可选，默认为false)
  // force (Boolean) 强制WebP输出，否则尝试使用输入格式(可选，默认为true)
  "webp": {
    "quality": 75,
    "alphaQuality": 100,
    "lossless": false,
    "nearLossless": false,
    "smartSubsample": false,
    "effort": 4
  },
  // quality (Number) 质量，整数1-100(可选，默认80)
  // force (Boolean) 强制TIFF输出，否则尝试使用输入格式(可选，默认为true)
  // compression (Boolean) 压缩选项:lzw, deflate, jpeg, ccittfax4(可选，默认'jpeg')
  // predictor (String) 压缩预测器选项:无、水平、浮动(可选、默认“水平”)
  // xres (Number) 水平分辨率(像素/mm)(可选，默认1.0)
  // yres (Number) 垂直分辨率(像素/mm)(可选，默认1.0)
  // squash (Boolean) 将8位图像压缩到1位(可选，默认为false)
  "tiff": {
    "quality": 80,
    "compression": "jpeg",
    "predictor": "horizontal",
    "pyramid": false,
    "bitdepth": 8,
    "tile": false,
    "tileHeight": 256,
    "tileWidth": 256,
    "xres": 1,
    "yres": 1,
    "resolutionUnit": "inch"
  },
  // gif
  // options.reoptimise boolean  始终生成新的调色板（速度较慢），默认情况下重复使用现有调色板（可选，默认为false）
  // options.reoptimize boolean  options.reoptimise的另一种拼写（可选，默认为false）
  // options.colours number  调色板条目的最大数量，包括透明度，介于2和256之间（可选，默认为256）
  // options.colors number  options.colours的另一种拼写（可选，默认为256）
  // options.effort number  CPU努力程度，介于1（最快）和10（最慢）之间（可选，默认为7）
  // options.dither number  Floyd-Steinberg误差扩散的级别，介于0（最少）和1（最多）之间（可选，默认为1.0）
  // options.interFrameMaxError number  透明度的最大帧间误差，介于0（无损）和32之间（可选，默认为0）
  // options.interPaletteMaxError number  调色板重用的最大调色板间误差，介于0和256之间（可选，默认为3）
  // options.loop number  动画迭代次数，使用0表示无限动画（可选，默认为0）
  // options.delay (number  | Array <number >)? 动画帧之间的延迟（以毫秒为单位）
  // options.force boolean  强制输出GIF，否则尝试使用输入格式（可选，默认为true）
  gif: {}

```

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [ISC](https://github.com/AI-Finance-FE/tiny-image/blob/master/LICENSE) licensed.

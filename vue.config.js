console.log(process.env.NODE_ENV)

module.exports = {
  // 基本 URL
  publicPath: './',
  // 生成的生产环境构建文件目录
  outputDir: './dist/',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: './',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: './index.html',
  // 是否开启静态资源文件名中的 hash
  filenameHashing: true,
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: true,
  // 是否需要生产环境的 source map
  productionSourceMap: false,
  // 是否为 CSS 开启 source map
  css: {
    sourceMap: false
  },
  devServer: {
    port: 80,
    // proxy: 'http://127.0.0.1:4000',
    disableHostCheck: true
  }
}

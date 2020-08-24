// vue.config.js
const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-more/' : '/', // 指定项目相对于服务器根地址的路径，此处设置是为了配合git pages
  outputDir: 'docs', // 指定build的输出文件夹，git pages只能指定根目录 / docs文件夹作为资源文件夹
  productionSourceMap: false,
  pluginOptions: {
    // 引入less全局变量
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/variables.less')]
    }
  }
}

const { resolve } = require('path')

module.exports = {
  publicPath: './',
  outputDir: 'sixty_admin',
  productionSourceMap: false,
  chainWebpack(config) {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          hoistUseStatements: true,
          resources: './src/styles/resources/*.scss',
        })
        .end()
    })
  },
}

const dayjs = require('dayjs')
process.env.VUE_APP_UPDATE_TIME = dayjs().format('YYYY-M-D HH:mm:ss')

module.exports = {
  publicPath: './',
  outputDir: 'sixty_admin',
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },
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

    config.module.rule('md').test(/\.md$/).use('text-loader').loader('text-loader').end()
  },
}

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
  },
}

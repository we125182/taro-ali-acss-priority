const fs = require('fs');
const path = require('path');

export default (ctx, options) => {
  const { outputPath } = ctx.paths
  const getFilePath = (filename) => path.join(outputPath, filename)
  ctx.onBuildComplete(() => {
    try {
      fs.accessSync(getFilePath('common.acss'), fs.constants.F_OK)
    } catch (error) {
      ctx.writeFileToDist({
        filePath: 'common.acss',
        content: ''
      })
    }
    ctx.writeFileToDist({
      filePath: 'app.acss',
      content: `@import './global.acss';@import './common.acss';`
    })
  })
  ctx.modifyWebpackChain(({ chain }) => {
    chain.plugin('miniCssExtractPlugin').tap(args => {
      args[0].filename = function(pathData) {
        if (pathData.chunk.name === 'app') {
          return 'global.acss'
        }
        return '[name].acss'
      }
      return args
    })
  })
}

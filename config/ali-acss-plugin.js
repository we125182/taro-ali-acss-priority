import { sources } from 'webpack';

const { RawSource } = sources;
const COMMON_STYLE = 'common.acss';
const APP_STYLE = 'app.acss';

/**
 * fix: 支付宝common.acss优先级小于app.acss https://github.com/NervJS/taro/issues/12778
 * @param {Object} ctx 插件上下文
 * @param {Object} options 配置
 * @returns
 */
export default function (ctx, options = { platform: 'alipay'}) {

  if (process.env.TARO_ENV !== options.platform) {
    return
  }

  /**
   * 修改编译后文件
   */
  ctx.modifyBuildAssets(({ assets }) => {
    /**
     * 新增app.acss用以导入全局及公共样式
     */
    if (!assets[APP_STYLE]) {
      assets[APP_STYLE] = new RawSource(`@import './global.acss';\n@import './common.acss';\n`);
    }
    /**
     * 防止common.acss为空的情况
     */
    if (!assets[COMMON_STYLE]) {
      assets[COMMON_STYLE] = new RawSource('');
    }
  })

  /**
   * 修改miniCssExtractPlugin配置:将app.acss改名为global.scss
   */
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

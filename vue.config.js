/* eslint-disable import/extensions */
module.exports = {
  transpileDependencies: [
    'vuetify',
  ],

  publicPath: '',
  productionSourceMap: false,

  pluginOptions: {
    cordovaPath: 'src-cordova',
  },
  configureWebpack: {
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  },

};

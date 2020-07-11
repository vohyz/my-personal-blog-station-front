module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  configureWebpack: config => {
      config.output.globalObject = "this"
  },
  configureWebpack: {
    externals: {
      'echarts': 'echarts',
      'element-ui': 'ELEMENT',
      'vue': 'Vue',
      'vue-router': 'VueRouter'
    }
  },
}

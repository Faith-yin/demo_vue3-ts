/*
 * @Date: 2021-01-10 15:53:56
 * @information: config
 */

 module.exports = {
  configureWebpack: {
    // 把webpack的配置写在这里 会自动合并
    // 以下库使用cdn，不会被打包
    externals: {
      // "vue": "Vue",
      // "element-plus": "ElementPlus",
      "AMap": "AMap",
    }
  },
  devServer: {
    open: false,
    hot: true,
    port: 8098,
    host: '0.0.0.0',
  },

 }



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
  // 打包时区分开发环境与生产环境静态资源路径
  publicPath: './', 
  // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,

  
}



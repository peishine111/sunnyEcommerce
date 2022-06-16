const Timestamp = new Date().getTime();
module.exports = {
  publicPath:'/sunnyEcommerce/dist',
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name]?v=${Timestamp}.js`,
      chunkFilename: `[name]?v=${Timestamp}.js`
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production"
  }
};

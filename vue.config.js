module.exports = {
  productionSourceMap: false,
  devServer: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  pwa: {
    name: 'ToGIF',
    themeColor: '#336699'
  }
}

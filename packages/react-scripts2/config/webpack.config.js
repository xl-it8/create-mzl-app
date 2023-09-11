module.exports = function (webpackEnv) {
  return {
    mode: webpackEnv === 'production' ? 'production' : 'development'
  }
}

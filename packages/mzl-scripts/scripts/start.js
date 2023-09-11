process.env.NODE_ENV = 'development'
const configFactory = require('../config/webpack.config')
const webpack = require('webpack')
const WebpackDevServer = require('webapck-dev-server')
const webpackConfig = configFactory('development')
const devServerOptions = { ...webpackConfig.devServer, open: true };
const complier = webpack(webpackConfig)
const server = new WebpackDevServer(devServerOptions,complier)

const runServer = async () => {
    console.log('Starting server...');
    await server.start();
  };
  
  runServer();
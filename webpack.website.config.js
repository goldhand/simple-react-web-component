const path = require('path');
const config = require('./webpack.config');

config.entry = "./src/render.js";
config.output.path = path.resolve(__dirname, "build/");
config.output.publicPath = "/simple-react-web-component/";
config.devServer = {
  contentBase: path.join(__dirname, "public/"),
  port: 8080,
  publicPath: "http://localhost:8080/simple-react-web-component/",
  hotOnly: true
};

module.exports = config;

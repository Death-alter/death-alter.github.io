"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "Touhou-Freshman-Camp.github.io";
const port = 8080;

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    host: "0.0.0.0",
    port: port,
    open: true,
    proxy: {
      "/isndes": {
        target: `https://www.isndes.com`,
        changeOrigin: true,
        pathRewrite: {
          "^/isndes" : "",
        },
      },
      "/thwiki": {
        target: `https://calendar.thwiki.cc`,
        changeOrigin: true,
        pathRewrite: {
          "^/thwiki" : "",
        },
      },
    },
    disableHostCheck: true,
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
};

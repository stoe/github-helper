const path = require('path')

const webpack = require('webpack')
const cp = require('copy-webpack-plugin')
const rm = require('remove-files-webpack-plugin')
const sh = require('webpack-shell-plugin')

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background.js',
    content: './src/content.js',
    options: './src/options.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new rm({
      before: {
        include: ['./build', './dist']
      }
    }),
    new cp({
      patterns: [
        {from: './src/manifest.json'},
        {from: './license'},
        {
          from: './src/html',
          to: 'html/',
          globOptions: {
            ignore: ['**/.DS_Store']
          }
        },
        {
          from: './src/icons',
          to: 'icons/',
          globOptions: {
            ignore: ['**/.DS_Store']
          }
        }
      ]
    }),
    new sh({
      onBuildEnd: ['script/build']
    })
  ]
}

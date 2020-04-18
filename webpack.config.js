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
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new rm({
      before: {
        include: ['./build'],
      },
    }),
    new cp(
      [
        {from: './src/manifest.json', cache: true},
        {from: './license', cache: true},
        {from: './src/icons', to: 'icons/', cache: true},
      ],
      {logLevel: 'silent', ignore: ['**/.DS_Store']},
    ),
    new sh({
      onBuildEnd: ['script/build'],
    }),
  ],
}

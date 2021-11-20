const path = require('path')

const webpack = require('webpack')
const cp = require('copy-webpack-plugin')
const rm = require('remove-files-webpack-plugin')
const sh = require('webpack-shell-plugin-next')

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    background: './src/background.js',
    options: ['./src/options.js', './src/html/options.html'],
    content: ['./src/highlighter.js', './src/repo-status.js', './src/css/style.scss']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'content.css'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
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
        {from: './.github/privacy.md', to: 'privacy.md'},
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
      onBuildEnd: {
        scripts: [
          'mkdir build/',
          './node_modules/.bin/crx3 -p key.pem -z ./build/github-helper.zip -o ./build/github-helper.crx ./dist/'
        ],
        blocking: false,
        parallel: true
      }
    })
  ]
}

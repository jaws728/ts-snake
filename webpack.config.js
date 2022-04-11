const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path:path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      // 不使用箭头函数
      arrowFunction: false,
      const: false
    }
  },
  //webpack打包模块
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // babel
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      'chrome': '88'
                    },
                    'corejs': '3',
                    // 按需引入corejs
                    'useBuiltIns': 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node-modules/
      },
      // less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "It is a title,"
      template: './src/index.html'
    })
  ],
  // 用于设置模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}
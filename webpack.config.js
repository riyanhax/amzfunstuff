const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: {
          loader:'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
        }
       },
      }
    ]
  },
  resolve: {
    alias: {
      '@material-ui/core': '@material-ui/core/es'
    }
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
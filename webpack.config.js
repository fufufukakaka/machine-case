const webpack = require('webpack');

module.exports = {
  context: __dirname + "/src",
  entry: {
   jsx: "./index.js"
  },

  output: {
    path: __dirname + "/python-server/static/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
    configFile: './.eslintrc'
  }
      }
    })
  ],
module: {
    rules: [
     { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "eslint-loader",enforce:"pre"},
    { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file?name=[name].[ext]' ,enforce:'post'},
      { test: /\.(woff|woff2|ttf|eot)$/, loader: 'file?name=[name].[ext]'  ,enforce:'post'},
      { test: /\.html$/, loader: "file?name=[name].[ext]"  ,enforce:'post'},
      { test: /\.css$/,
        loader: 'style!css'  ,enforce:'post'},
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: [
        {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                // env を指定することで、ES2017 を ES5 に変換。
                // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
                // webpack の Tree Shaking 機能が使えない
                ['env', {'modules': false}]
              ]
            }
          }
      ],enforce:'post'}
    ],
    loaders: [{
            test: /\.js$/,
            loaders: ['react-hot-loader/webpack', 'babel']
        }]
  },
  node: {
    fs: "empty"
  },
  devServer: {
    contentBase: "./src",
    hot: true
}
};

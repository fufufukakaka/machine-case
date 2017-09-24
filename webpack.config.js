module.exports = {
  context: __dirname + "/src",
  entry: {
   jsx: "./index.js"
  },

  output: {
    path: __dirname + "/python-server/static/",
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
        //Eslint loader
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "eslint-loader"}
    ],
    loaders: [
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file?name=[name].[ext]' },
      { test: /\.(woff|woff2|ttf|eot)$/, loader: 'file?name=[name].[ext]' },
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/,
        loader: 'style!css' },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ["react-hot-loader/webpack","babel-loader?stage=0&optional=runtime"]}
    ]
  },
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc'
  },
  devServer: {
    contentBase: "./src",
    hot: true
}
};

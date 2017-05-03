module.exports = {
  entry: "./lib/appAttack.js",
  output: {
    filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};

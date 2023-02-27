const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        API_KEY: JSON.stringify("28c5ca6b-3fdc-45b9-8d68-5dade4688abf"),
      },
    }),
  ],
};

const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "css/style.css"
});

module.exports = env => {
  return {
    mode: env.NODE_ENV, //"production"
    entry: {
      app: "./src/scripts/index.js"
    },
    output: {
      filename: "[name]-bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/"
    },
    // Change to production source maps
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.(css|scss)$/,
          use: extractSass.extract({
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: "sass-loader"
              }
            ],
            // use style-loader in development
            fallback: "style-loader"
          })
        },
        {
          test: /\.(jpg|png|gif|svg|pdf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new HtmlWebpackPlugin({
        title: "Production"
      }),
      new HtmlWebpackPlugin({
        template: "public/index.html"
        // favicon: "public/favicon.ico"
      }),
      new ExtractTextPlugin({
        filename: "styles/styles.[contenthash].css",
        allChunks: true
      }),
      extractSass,
      new ExtractTextPlugin({
        filename: "styles/styles.css",
        allChunks: true
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors-bundle",
            chunks: "all"
          }
        }
      }
    }
  };
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = (_, argv) => ({
  mode: argv.mode || "development",

  entry: "./src/index.tsx",

  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },

  devServer: {
    port: 3003,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "Cart",
      filename: "remoteEntry.js",
      exposes: {
        "./Cart": "./src/Cart"
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false }
      }
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
});

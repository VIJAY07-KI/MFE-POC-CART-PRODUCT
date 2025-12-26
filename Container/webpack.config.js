const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProd ? "production" : "development",
  entry: "./src/index.tsx",

  devServer: {
    port: 3000
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        Products: isProd
          ? "Products@https://product-poc.vercel.app/remoteEntry.js"
          : "Products@http://localhost:3002/remoteEntry.js",

        Cart: isProd
          ? "Cart@https://cart-poc.vercel.app/remoteEntry.js"
          : "Cart@http://localhost:3003/remoteEntry.js"
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true }
      }
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};

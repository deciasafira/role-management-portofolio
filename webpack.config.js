const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config();


const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
    output: {
        publicPath: "http://localhost:8088/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 8088,
        historyApiFallback: true,
    },

    module: {
        rules: [{
            test: /\.m?js/,
            type: "javascript/auto",
            resolve: {
                fullySpecified: false,
            },
        },
        {
            test: /\.(css|s[ac]ss)$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
        },
        {
            test: /\.(svg|png|gif|jpg)$/,
            use: ["file-loader"],
        },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new ModuleFederationPlugin({
            name: "fe_role_list",
            filename: "remoteEntry.js",
            remotes: {
                fe_user_list: "fe_user_list@http://localhost:8082/remoteEntry.js",
                fe_map: "fe_map@http://localhost:8069/remoteEntry.js",
            },
            exposes: {
                "./RoleManagement": "./src/App.jsx"
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
    ],
});
template: "./src/index.html"
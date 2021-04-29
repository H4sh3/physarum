const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['public/build']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ],
    output: {
        path: __dirname + '/public',
        filename: 'build/[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
}
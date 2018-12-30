const path = require('path')

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.join(__dirname, 'src', 'public'),
        filename: '[name].js'
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}
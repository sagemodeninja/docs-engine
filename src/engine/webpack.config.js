const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => {
    return {
        entry: ['./index.ts'],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'index.js',
            clean: true,
            module: true,
        },
        experiments: {
          outputModule: true,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename : 'index.css'
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
                '@': path.resolve(__dirname),
            }
        },
    }
}
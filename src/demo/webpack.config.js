const path = require('path')
const entries = require('./utlis/auto-entry')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, { mode }) => {
    const isDevelopment = mode === 'development'

    return {
        target: 'web',
        entry: entries.load({
            type: 'entry',
            dir: './scripts/views'
        }),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'scripts/[name].js',
            clean: true,
        },
        plugins: [
            ...entries.load({
                type: 'view',
                dir: './public'
            }),
            new MiniCssExtractPlugin({
                filename: 'styles/[name].css'
            })
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
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
            alias: {
                '@': path.resolve(__dirname, 'scripts'),
            }
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'build'),
            },
            compress: true,
            port: 6002,
        },
        devtool: isDevelopment ? 'inline-source-map' : false
    }
}
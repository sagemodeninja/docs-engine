const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function lookupFiles(dir, target, exlude) {
    const files = []

    fs.readdirSync(dir).forEach(file => {
        if ((ext = path.extname(file)) === target && (!exlude || !exlude.includes(file))) {
            files.push({
                entry: path.basename(file, ext),
                template: './' + path.join(dir, file),
            })
        }
    })

    return files
}

function loadEntries(options) {
    return lookupFiles(options.dir, '.ts', options?.exclude)
        .reduce((entries, file) => {
            return {
                ...entries,
                [file.entry]: file.template
            }
        }, {})
}

function loadViews(options) {
    return lookupFiles(options.dir, '.html', options?.exclude)
        .map(({template, entry}) => {
            return new HtmlWebpackPlugin({
                template,
                filename: `${entry}.html`,
                chunks: [entry]
            })
        })
}

module.exports = {
    load: (options) => {
        switch (options.type) {
            case 'entry':
                return loadEntries(options)
            case 'view':
                return loadViews(options)
            default:
                console.warn(`Unknown entry type: '${options.type}'.`)
        }
    }
}
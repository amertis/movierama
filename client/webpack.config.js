module.exports = {
    entry: './main.js',
    output: {
        filename: '../public/js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            }
        ]
    },
    externals: { 'restClient':'commonjs restClient', }

};
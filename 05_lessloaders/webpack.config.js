const path = require('path')

// const HtmlWebpackPlugin = require('html-webpack-plugin')

// // 配置自动生成 index.html 文件的插件:
// const htmlPlugin = new HtmlWebpackPlugin({
//     title: 'css/less 的 loader ',
//     /**
//      * 如果要使 这里的 title 生效, 则要将模板文件中的 title 改成: 
//      *  <title> <%= htmlWebpackPlugin.options.title %></title>
//      */
//     filename: 'index.html',
//     template: './public/index.html',
// })

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'js/[name].[chunkHash:6].js'
    },
    plugins: [
        htmlPlugin,
    ],
    stats: {
        // One of the two if I remember right 
        entrypoints: false,
        children: false
    }
}
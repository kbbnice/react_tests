const path = require('path')

// 插件们
const htmlWebpackPlugin = require('html-webpack-plugin')

const htmlPlugin = new htmlWebpackPlugin({
    title: '我是生成的标题~',
    filename: 'index.html',
    // chunk: []   // 多入口配置用
    template: './public/index.html'
})

module.exports = {  // 注意 module 不加 s, 但是 export 加 s; 

    mode: 'development',

    entry: './src/index.js',

    output: {
        path: path.resolve(process.cwd(), 'dist'),  
        // 当 本 config 文件不在根目录下的时候, 需要用process.cwd(), 
        // 当 在根目录下时, 可以用 __dirname, 
        filename: '[name].[chunkHash:6].js'
    },
    rules: [
        {
            
        }
    ],
    plugins: [
        htmlPlugin,
    ],

}
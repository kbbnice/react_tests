const path = require('path')

/**
 * 插件们
 */

// 自动生成 index.html 插件:  
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebpackPlugin({
    title: '我是生成的标题~',
    filename: 'index.html',
    // chunk: []   // 多入口配置用
    template: './public/index.html'
})

// 单独生成 css 文件 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const miniCssPlugin = new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkHash:6].css',
    // chunkFilename: ''
})


module.exports = { // 注意 module 不加 s, 但是 export 加 s; 

    mode: 'development',

    entry: './src/index.js',

    output: {
        path: path.resolve(process.cwd(), 'dist'),
        // 当 本 config 文件不在根目录下的时候, 需要用process.cwd(), 
        // 当 在根目录下时, 可以用 __dirname, 
        // filename: '[name].[chunkHash:6].js'  // 将 js 文件 放在 dist 中
        filename: 'js/[name].[chunkHash:6].js'  // 前缀 js/ 会将 js 文件放在 dist/js 中.
    },

    /**
     * 
     */
    module: {
        rules: [ // 在module 里面

            /**
             * loader 执行顺序: 写在后面的先执行
             */
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',     // 这个是将引入的 css 转换成 style 标签
                    // 要实现单独生成 css 文件, 则将 style-loader 用 mini-css-extract-pligin 替代
                    {   // use 里的loader 引入 不仅仅可以是字符串 , 也可以是对象
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true
                        }
                    },
                    'css-loader'
                ],
            },
            /**
             * 1. 单独只下载 css-loader 和 style-loader , 
             *      只会在 html 文件里, 新建一个 style 标签, 
             *      并 不会 单独生成一个 css 文件, 此时, 需要引入插件 mini-css-extract-plugin 
             */


        ],
    },
    plugins: [
        htmlPlugin,
        miniCssPlugin,
    ],

    // dev-server配置：(webpack有专门的文档)
    /**
     * proxy 也在 devServer 配置
     */
    devServer: {
        port: 3000
    },

    // 以下代码解决 编译时 xxx index = undefined 报错
    stats: {
        // One of the two if I remember right 
        entrypoints: false,
        children: false
    },
}

// webpack-dev-server 实时更新代码

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

// 配置自动生成 index.html 文件的插件:
const htmlPlugin = new HtmlWebpackPlugin({
    title: 'css/less 的 loader ',
    /**
     * 如果要使 这里的 title 生效, 则要将模板文件中的 title 改成: 
     *  <title> <%= htmlWebpackPlugin.options.title %></title>
     */
    filename: 'index.html',
    template: './public/index.html',
})

// 引入自动生成css文件的插件: 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const miniCssPlugin = new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkHash:8].css'
})


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'js/[name].[chunkHash:6].js'
    },
    plugins: [
        htmlPlugin,
        miniCssPlugin
    ],
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],
            // }, 
            // 使用 miniCssExtractPlugin 替换上述styleloader:

            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader, 
                    // 或者写成:
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true
                        }
                    },
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {

                        }
                    },
                    'postcss-loader', // postcss-loader 要放在cssloader 下面, 在cssloader 之前编译
                    // compiles Less to CSS.
                    // 这里必须有 css-loader 和 less-loader 
                    /**
                     * 因为less 会先解析成css 再渲染
                     */
                ],

            }
        ]
    },
    devServer: {
        port: 3000,
        open: true
    },
    stats: {
        // One of the two if I remember right 
        entrypoints: false,
        children: false
    }
}

/**
 * style-loader, css-loader 会将 导入 的 css 文件 变成 style 标签 插入 head 标签中,
 * 不会自动生成 css 文件
 */

/**
 * 添加前缀的loader : postcss-loader + autoprefixer
 * postcss-loader 需要配置 postcss.config.js 否则会报错
 * 
 * 添加浏览器前缀: borwserslist:
 * 1. 在package.json 添加一个字段:
 * "browserslist": [
    "last 8 version"
  ]
 * 2. 原理: 去调用 can I use 的 API.
 */
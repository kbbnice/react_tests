const path = require('path') // 详见 02 


/**
 * 在下载 html-webpack-plugin 插件之前, index.html 文件需要自己生成, 
 * 且 当 index.js 内容改变 重新编译时, main.js 的文件名哈希值不同.
 * 导致需要重新引入.
 * 
 * 因此, 需要完成以下步骤:
 * 1. 下载插件
 * 2. 引入插件: 
 * 3. 在webpack.config.js 文件的 plugins: [] 下, 添加:
 *      new HtmlWebpackPlugin()
 * 3-或者: 在webpack.config.js 下设置一个变量 保存 new HtmlWebpackPlugin({很多参数}), 并在plugins 中引用.
 * 
 */
// 引入插件: 
const HtmlWebpackPlugin = require('html-webpack-plugin')

// const htmlPlugin = new HtmlWebpackPlugin() // 默认的 html 配置 , 生成的 html 没有任何额外的内容.

// 配置带参数的htmlWebpackPlugin
const htmlPlugin = new HtmlWebpackPlugin({  // 在这个对象里, 写参数, 配置生成 index.html 的各项内容

    // 配置生成的html 文件 title
    title: '我是新配置的 index.html 的 title',  // String:  原来是: 'webpack App'

    // 配置 生成的 HTML 文件的文件名:
    filename: 'newIndex.html',  // String: 重命名 index.html,
    // filename: 'child/newIndex.html',  // 表示: 在dist目录下, 新建child文件夹 , 并把newIndex.html 保存到 child 文件夹中.,


    // 是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值:
    hash: false,     // 哈希值为 true 时, 会给引入的 main.哈希.js后面, 带串哈希值参数
    /**
     * hash 为 true 时, : 
     * newIndex.html 引入 的 js 如下:
     *  <script type="text/javascript" src="main.4dcf5dfa.js?c47baa6e47bb4b92cdd4"></script>
     *  其中, 比 hash 为 false 时 , 多了 mian.xx.js 后面的 ?xxxx
     */

     // 使用 html 模板: 
    /**
     * 此时, 项目目录下 已经建好了 public 文件夹 以及 public/index.html文件
     * 
     * 注意:
     *      1. 如果有设置 filename, 则生成的文件名, 就是 filename 设置的值.
     */
    template: './public/index.html',
    
    // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；
    // 举例 : chunks: ['home', 'about']
    // 用来给多入口的不同的 htmlWebpackPlugin 配置不同的 chunk. 

})

/**
 * 此时, 目录下 只有:
 *  > 手动生成html的dist夹/
 *  > 手动生成html的dist夹/
 *  > node_modules/
 *  > src/
 *  -pacage-lock.json
 *  -package.json
 *  -webpack.config.js
 * 
 * 并没有 public 文件夹 
 */

/**
 * 现在 要开始配置 htmlPlugin 的模板,
 * 新建 public 文件夹
 */

module.exports = {

    mode: 'development', // 详见 02
    entry: './src/index.js', // 详见 02
    output: {
        path: path.resolve(process.cwd(), "dist"), // 详见 02
        filename: '[name].[chunkHash:8].js' // 详见 02
    },
    plugins: [
        htmlPlugin
    ],

    // 我的妈呀, webpack 打包出现错误如下时,:
    /**
     * Child html-webpack-plugin for "index.html": 1 asset Entrypoint undefined = index.html
     */
    // 解决方式: 
    /**
     * stats: {
        // One of the two if I remember right
        entrypoints: false,
        children: false
    },
     */
    stats: {
        // One of the two if I remember right
        entrypoints: false,
        children: false
    },

}
/**
 * 当 npm i 或者 npm install 下载时后缀 -D -S 的含义: 
 * 1. -D: 即 --dev 即: 包名会被注册在package.json 的devDependencies 里, 仅在 开发环境下存在的包 使用 -D.
 *      例如: babel, sass-loader 这些解析器.
 * 2. -S: 即 --save 即:  包名会被注册在package.json 的dependencies 里面, 在生产环境下 , 这个包的依赖依然存在bundleRenderer.renderToStream
 * 3. 如果 ,,,,, 你.. 什么都不屑 ,,, 包名 不会进入package.json 里, 因此, 别人不知道你安装了这个包( ... 智障才这么干 ) 
 */

/**
 * npm i 和 npm install 的区别 
 * 1. 用npm i安装的模块无法用npm uninstall删除，用npm uninstall i才卸载掉
 * 2. npm i会帮助检测与当前node版本最匹配的npm包版本号，并匹配出来相互依赖的npm包应该提升的版本号
 * 3. 部分npm包在当前node版本下无法使用，必须使用建议版本
 * 4. 安装报错时intall肯定会出现npm-debug.log 文件，npm i不一定
 */

// 为插件html-webpack-plugin 而配置:
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
/**
 *  1. 创建一个插件实例对象
 *  2. 把插件放到webpack配置的plugins的节点中:
 *  3. html-webpack-plugin 插件 可以自动注入打包好的js文件.
 */

const htmlPlugin = new HtmlWebPackPlugin({

    template: path.join(__dirname, './src/index.html'), // 源文件
    filename: 'index.html' // 生成内存中的首页名称
})




// webpack 配置
// 向外暴露一个打包的配置对象:
module.exports = {

    mode: 'development', // 选项: development / production

    /**************************  版本一 start ************************/
    // // 编译入口:(即index.js 可以更换)
    // entry: './src/index.js', // 这是默认的, 如果想改名也可以. 
    // // entry: './src/testentry.js', // 可以将testentry.js 作为编译入口

    // // 在webpack 4.x 中, 有一个很大的特性, 约定大于配置. 
    // /**
    //  * 约定默认的打包入口路径是index.js.
    //  * 
    //  */

    //  // 编译生成文件位置: 
    // output: {

    //     // 路径:
    //     path: path.resolve(__dirname, "testdistdist"),
    //     filename: 'test_output.js'
    // },
    /**************************  版本一 end ************************/

    /**************************  版本二 start ************************/
    // 编译入口:(即index.js 可以更换)

    /**
     * 入口可以有多个入口
     */
    entry: { // 这是不仅可以是 字符串 路径, 还可以是 对象
        about: './src/about.js',
        main: './src/home.js',
    },

    // 如果需要加上哈希值
    /**
     * 1. 如果不指定filename, 则 build 生成的效果和 没有写 output 一样,
     * 2. 如果需要加上哈希值, 意味着需要给每个文件重命名. 则: 
     *      a. 用中括号引用 webpack 定义好的引用, 如下所示: 
     *          [name] 表示文件名
     *          [hash] 表示生成哈希 (所有文件用同一个哈希值)
     *              >> 在 [hash] 中还可以用冒号, 指定生成的哈希值的位数.
     *          [chunkHash] 表示生成哈希 (每个文件拥有不同的哈希值)
     *              >> 同 [hash]
     *          [一共有三种, 目前看两种, 一种再查把!@!!!!!!]
     *      b. 文件名增加哈希值的目的: 避免缓存.
     */
    output: {

        // 路径:
        path: path.resolve(__dirname, "dist2"),
        filename: '[name].[chunkHash:4].js'
    },


    /**************************  版本二 end ************************/



    // 插件: 
    plugins: [ // 是个数组, 且要加s. plugin 加 s;
        htmlPlugin
    ],

    // 所有第三方模块的配置规则
    /**
     * 因为webpack 默认只能打包处理.js后缀名类型的文件, 像 .png .vue 无法主动处理, 所以要配置第三方的loader.
     */
    module: {

        // rules: [ // 第三方匹配规则
        //     {
        //         test: /\.js|jsx$/, 
        //         use: 'babel-loader', // 多个需要写成数组
        //         exclude: /node_modules/ // 除了...之外.(必须排除node_modules文件夹)
        //     }
        // ]
    }

}

// 注意 直接 写 export default {} 目前不可以这样写.
// 这是 ES6 向外带出模块的 API, 与之对应的是 import xxx from xxx 的标识符.

/**
 * 如果需要指定非webpack.config.js 则: 
 * (例如, 如果webpack.config.js 在 根目录/scripts 目录下)
 * 则: 需要去配置 : package.json 中, "build" 等webpack 配置项后面 加上 --config 配置规则.
 * 例如:  指定不在根目录的配置文件位置:  "build": "webpack --config scripts/webpack.config.js"
 *  或者  指定根目录下名称非 webpack.config.js 的配置文件:   "build": "webpack --config webpack.xxxconfig.js"

 */
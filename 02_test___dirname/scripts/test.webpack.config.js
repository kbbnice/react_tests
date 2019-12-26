// node 的 path 模块

const path = require('path')

// webpack.config.js 配置
module.exports = {

    // mode 如果未设置 则报错如下:
    /**
     * WARNING in configuration 
     * The 'mode' option has not been set, webpack will 
     * fallback to 'production' for this value. Set 'mode' 
     * option to 'development' or 'production' to enable 
     * defaults for each environment.
     */
    // 解决方式: 设置mode: (二选一: development / production)
    mode: 'development',

    // 入口配置
    // eg: 单入口: 
    entry: './src/index.js',

    /**
     * 由于 __dirname 是当前脚本的目录, 因此 此时的 dist 文件夹 会生成在 script 目录下 (与 当前这个 config.js 同目录)
     * 因此: 
     *       >> 见下方 方案
     */
    output: {
        // 原来的:  path: path.resolve(__dirname, "dist"),  // 此时会把 dist 解析到 script 目录下 
        // 方案一:  path: path.resolve(__dirname, "../dist"),   // 加了 ../ 之后, 会在本目录上一层目录生成.
        //方案二:  
        path: path.resolve(process.cwd(), "dist"), // 此时 生成的 dist 文件夹 也在项目根目录下.
        /**
         * process.cwd() 方法 放回 node.js 进程的当前工作目录. 
         */
        filename: '[name].[chunkHash].js'
    }
    /**
     * 1. __dirname 是 node.js 中的一个全局变量, 它指向当前执行脚本所在的目录
     * 2. __dirname 与 __filename 的 path.dirname() 相同.
     *      即: __dirname == path.dirname(__filename)
     */

}
1. 项目中使用npm 包: 要先 `npm init`
    `npm init`
    *快速创建: `npm init -y`*

  

2. 下载webpack
    `npm install --save-dev webpack`

  

3. webpack4 开始 要单独安装 `webpack-cli`
    `npm install --save-dev webpack-cli`

  

4. 配置`package.json`  , 实现项目打包: (此时会出现报错, 往下操作即可)

  * 在 `script`  中新增:` "build": "webpack"`, 其中,  `build`  可以更改为任意字符串. 

  * 执行 `npm run build`  即可打包(其中, `build` 即为`script `标签中配置的`webpack`命令对应的  `key` .

  ```json
  {
    "name": "05_lessloaders",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack"		// 添加这一行, 即可使用: `npm run build` 打包项目
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.41.5",
      "webpack-cli": "^3.3.10"
    }
  }
  
  ```

  

5. 创建src/ index.js 入口文件 

  >如果在根目录直接创建 `index.js` 会报错如下: 
  >
  >```javascript
  >ERROR in Entry module not found: Error: Can't resolve './src' in 'D:\myfiles\project\personalPro\react\05_lessloaders'
  >```
  >
  >问题是: 
  >
  >*找不到入口 `./src` 文件夹*
  >
  >解决:
  >
  >*项目根目录创建 `src` 文件夹, 并创建默认入口文件 `index.js`*
  >
  >* 如果不是 `index.js`文件名, 也会报上述错误, 因为默认入口文件就是 `index.js`
  >* 入口文件以后可以配置(见下文)

  

6. 创建 `webpack.config.js` 

   ```javascript
   const path = require('path')	// 引入 node 的 path 模块
   
   module.exports = {	// 注意module 和 exports 是否加's'
   }
   ```
> 1. 出现waring: 
>
> ```
> WARNING in configuration
> The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
> You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
> ```
>
> *表示 没有配置 生产/开发 环境, 会默认 'production'(生产环境)*
>
> 解决: 
>
> ```javascript
> module.exports = {	// 注意module 和 exports 是否加's'
>  mode: 'development', 	// 可选: production / development   
> }
> ```
>
> *其中,`production` 会将代码压缩, `development`不会压缩代码*
>
> 2. 配置 入口 `entry` : (即上述所指修改入口文件位置/文件名等)
>
> ```javascript
> module.exports = {	// 注意module 和 exports 是否加's'
>     entry: './src/index.js', 	// 此时可以配置入口文件,例如: main.js/xxx.js等
> }
> ```
>
> 3. 配置 输出;
>
> ```javascript
> module.exports = {	// 注意module 和 exports 是否加's'
>     output: {
>         path: path.resolve(process.cwd(), 'dist'),	// 输出路径
>         // process.cwd()为当前工作文件夹.
>         // __dirname 为当前模块的目录名. (如果webpack.config.js 在根目录,可以用这个 ,如果 webpack.config.js不在根目录, 则 __dirname 会指向 这个config文件所在的目录
>         
>         filename: 'js/[name].[chunkHash:6].js'		// 输出文件路径/文件名(相对与整个输出文件夹dist/)
>         // js/ 配置文件生成在dist/js/文件夹下
>         // [name]根据入口文件动态生成文件名
>         // [hash]文件名会生成固定的哈希值
>         // [chunckHash]动态生成文件名哈希值
>         // [chunckHash:6 中的 6 表示生成 6位数 哈希值
>     },
> }
> ```
>
> 

*至此, 一个项目就可以正常打包*



7. 配置自动生成/自动引入css和js文件/动态实时更新页面 `index.html`页面: 

   *下载:` html-webpack-plugin` 插件*

   ```
   npm i --save-dev html-webpack-plugin
   ```

   ```javascript
   // 引入插件模块：  
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   
   // 配置插件：
   const htmlPlugin = new HtmlWebpackPlugin({
       title: 'css/less 的 loader ',
       /**
        * 如果要使 这里的 title 生效, 则要将模板文件中的 title 改成: 
        *  <title> <%= htmlWebpackPlugin.options.title %></title>
        */
       filename: 'index.html',
       template: './public/index.html',
   })
   
   // 在 webpack.config.js 的 module.exprots 中引入插件：
   module.exports = {
       plugins: [
           // 这里的 htmlPlugin 为上面创建的HtmlWebpakcPlugin实例， 
           // 也可以在这里面直接创建实例， 省去上面的const htmlPlugin = xxxx 部分， 但是为了方便直观， 在上面定义更合适。
           htmlPlugin,
       ]
   }
   
   
   ```
   
   

#### 问题解决

##### `npm run build 时 ,生成的文件异常: `Entrypoint undefined = index.html

*`webpack.connfig.js` 文件添加:*

```
stats: {
    // One of the two if I remember right 
    entrypoints: false,
    children: false
}
```


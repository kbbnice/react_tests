
// 二 html 版本 ( 一 见 index.js.v-1)

//  1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'

//  2. 创建虚拟 DOM 元素
const mydiv = React.createElement('div', {id: 'mydiv', title: 'this is div'}, '我是testentry文字啦')

// HTML 是最优秀的标记语言

// 单独写以下这行, 则报错: 
/**
 * Module parse failed: Unexpected token (12:14)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.
意思是 : 缺少loader.
 */
// const mydiv = <div id="mydiv" title="this is html div">这是html方式的div</div>
/**
 * 注意, 在 js 文件中, 默认 不能写这种 类似于 HTML 的标记; 否则, 打包会失败.
 * 可以用babel 来转换 js 中的标签.
 * 这种 在 js 中 混合写入类似于 HTML 的语法, 叫做JSX 语法. 符合 XML 规范 的 js 语法.
 */

 /**
  * 注意: JSX 语法的本质, 还是在运行的时候, 被转换成了 React.createElement 形式来执行.
  */

  /**
   * A. 需要安装 babel 插件: 
   *    1. babel-core babel-loader babel-plugin-transform-runtime 
   *    2. babel-preset-env babel-preset-stage-0
   * B. 安装能识别转换jsx语法的包:
   *    1. babel-preset-react
   * C. 添加 .babelrc 配置文件
   */
//  3. 调用 render 函数渲染
ReactDOM.render(mydiv, document.getElementById('app'))
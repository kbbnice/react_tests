```javascript
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
```

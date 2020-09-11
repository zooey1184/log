#### 说明

#### 安装
```sh
yarn add @zooey1184/log
# or
npm i @zooey1184/log
```

#### 类型
默认定义类型
|类型|颜色|
|--|--|
|success|green|
|warn|yellow|
|error|red|
|tip|cyan|
|info|blue|
|bold|加粗|
|underline|下划线|
|xxx(其他未定义)|white|


#### 使用
```js
// log === console.log   log.error ==> console.error
const log = require('log')

log('this is normal log style')
// 如果拆分多个，则第一个会设置成有背景色的提示
log.success('success', 'this is success log style')
// 如果字符串中有{{}}  包裹  包裹内部使用颜色  其他为白色
log.tip('this is {{tip}} log style')
log.warn('warn', 'this is {{warn}} ', 'log style')
log.xx('xxxx', 'not defined this function or property show this default style')
// bold | underline
log.bold('this is bold style')

// hex 使用hex 函数 颜色为hex 样式
log.hex('#d43f33')('this is hex style')

// 除此之外  你还可以自定义 或者覆盖原有样式
log.good = '#CD0074'
log.good(' GOOD ', 'this is {{good}} style')
// 支持rgb
log.bad = 'rgb(120,189,144)'
log.bad('this is bad style')
```
![example](https://tva1.sinaimg.cn/large/007S8ZIlly1gilj7itxkuj30uu0bwt9t.jpg)

[git 传送门](https://github.com/zooey1184/log)
[npm 传送门](https://www.npmjs.com/package/@zooey1184/log)

> 暂不支持 log.rgb(...)(xxx)
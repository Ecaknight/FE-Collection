##启航组件库

#### 添加 sass 支持

https://create-react-app.dev/docs/adding-a-sass-stylesheet

#### 色彩 + 字体设计

使用 scss 语法： https://www.sasscss.com/documentation/modules/color#darken
scss 命名：有*（下划线的）不会被编译到 css，通过@import 的时候不需要使用*， 这是 scss 的模块化功能

#### normalize.css

https://github.com/necolas/normalize.css/

1. 保留有用的默认值，不像 css reset 重置所有
2. 为各元素标准化样式
3. 修复与浏览器不一致的 bug
4. 高可用性

### Button

1. 不同的类型
2. 不同的尺寸
3. Disabled 状态

### FQA

1. 安装 node-sass 失败
   参考链接： https://segmentfault.com/a/1190000020993365
   个人原因： 安装版本正确，node v14.17.2 node-sass 4.14.1

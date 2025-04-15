# JS模块化

JS模块化

模块化模式：IIFE AMD CMD commonJS ESM UMD

前端所有的新的概念老的概念都脱离不开当时的发展的背景

模块化概念：

1.不同功能模块之间的管理组织 --模块化
2.A类型源码 --> B类型的代码的编译转换 --打包后的bundle 打包后的构建产物
3.模块内部变量私有化，外部不可擅自修改
4.模块提供给外部可操作的属性或方法

模块化一句话就是：将一个复杂度高的程序 -> 拆分成不同的具有原子功能的模块并将他们组合起来，模块化讲究高内聚、低耦合，这是他强调的内容

单一模块内部的方法应该是私有的，模块向外部提供定义好的属性或者方法或者接口

## 全局Function模式

直接在window上定义

这种方法写起来很简单但是她会污染全局，你也分不清这是哪一个文件创建的 （类似的还有eventBus事件总线）

```js
  window.a = function () { ... } 
  window.b = function () { ... }
```

那么如何避免呢？

## namespace模式

```js
  const moduleA = {
    data: {
      a: '123'
    },
    sayName() {
      console.log(this.data.a)
    }
  }
  moduleA.sayName()
  // 但是他有一个缺点，他内部的数据会被修改
  moduleA.data = { b: '456' }
  // 那么如何避免呢？ 
  // IIFE 出现了 ⬇️
```

## IIFE模式

立即执行函数

本质: 匿名函数的自调用

```js
// index.html
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
    module.foo()
    module.bar()
    
    module.data = 'hhh'

    module.foo() // zjh 因为闭包
</script>
// module.js
(function (window) {
  const data = "zjh";
  const foo = function () {
    console.log("foo was be called", data);
  };
  const bar = function () {
    console.log("bar was be called", data);
  };
  window.module = {
    foo,
    bar,
  };
})(window);


```

## IIFE模式增强

当模块A依赖另一个模块比如 这里的module.js依赖于jquery，这里就可以在module.js中接收参数

```html
  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/1.9.0/jquery.js"></script>
  <script type="text/javascript" src="module.js"></script>
  <script type="text/javascript">
      module.foo()
  </script>
```

```js
  (function (window, $) {
    const data = "zjh";
    const foo = function () {
      console.log("foo was be called", data);
      $("body").css("background", "red");
    };
    window.module = {
      foo,
    };
  })(window, jQuery);
```

但是他也有缺点：模块之间依赖关系不清晰
IIFE 强调的一个点就是保持它的script标签的顺序
如果我调换script标签的位置就会导致比如把module.js放在引入JQuery标签的前面就会报错，依赖之间的关系不清晰

## commonJs

模块加载 同步加载

commonJs都是同步执行的

1. 代码都是在模块内执行，模块化的作用域
2. 同步加载
3. 模块的加载方式是按照代码编写顺序执行
4. 模块如果加载多次会缓存，只在第一次加载的时候执行，后续内容会缓存

commonJs导出的内容是值的复制不能修改
esm导出的内容是值的引用可以修改

commonJS 的目标是浏览器以外的所有场景

## AMD

async module definition

异步模块定义

```js

// 定义方法：
// 定义没有依赖的模块
define(function () {
  return xxx;
})

// 定义有依赖的模块
define([jquery,lodash],function ($,_) {
  return XXX
})

// 配置依赖名称映射路径
require.config({
  paths: {
    alerter: "./modules/alerter",
    dataServer: "./modules/dataServer",
    jquery: "./libs/jquery",
    lodash: "./libs/lodash"
  },
});

// 引入方法
require(["alerter", "jquery"], function (alerter, $) {
  alerter.showMsg();
  $("body").css("background", "red");
});

```

## CMD

common module definition

将commonJs和AMD特点相结合

sea.js是 CMD  的一种实现

```js
// define 这种写法写法借鉴 AMD
define(function (require,exports,module) {
  // 如果有依赖的话,使用 require 引入模块
  let $ = require('./jquery.js') // 同步引入

  require.async('./jquery.js'，function($) {
    // xxx
  })


  // 导出的这种写法借鉴commonJs
  exports.xxx = xxx
  module.exports = xxx
})

```

AMD 与 CMD 区别

AMD:

1. 依赖前置，他是在定义声明的时候先引入
2. 通过 return 导出

CMD:

1. 就近依赖，需要的时候引入
2. 通过 module 或 exports 导出

esm 规范出来之前 都是这几种模块化

es6 出来之前，用esm规范的不多

他也是随着babel规范出来之后慢慢用的多了

## ESM

```javascript
import xxx from 'xxx'

import * as xxx from 'xxx'

export xxx

export default xxx
```

ESM和commonJs的区别

1. ESM输出的是值的引用，cjs是值的拷贝
2. ESM是编译时输出的，cjs是运行时加载的

cjs适用于服务端

cjs只有代码运行到 module.exports 的时候才知道这个值是一个什么，所以他是运行时的

esm是一个静态分析的时候定义好了内容

可以搭配babel使用esm

babel 先把 es6 => es5 => 打包后 => 发现打包后使用了 require 函数， 但是require是服务端的 => browserify => 浏览器可以使用的

## UMD

universal module definition

让JS可以再所有环境下使用

技能够满足commonJs又能够满足 AMD CMD 等等

```javascript
//  他的内部会进行各种判断
(function (root, factory) {
  if(typeof module === 'object' && typeof module.exports === 'object') {
    // commonJs规范 nodeJs环境
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD 规范，如 require.js
    define(factory)
  } else if (typeof define === 'function' && define.cmd) {
    // CMD 规范，如 sea.js
    define(function (require,exports, module) {
      module.exports = factory()
    })
  } else {
    // 没有模块坏经，挂在全局
    root.umdModule = factory();
  }
})()
```

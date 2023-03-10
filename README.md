#  Webpack 设计理念

通过手写webpack核心功能，对webpack工作机制进行深入理解。

## 一、核心思想 
- 第一步：首先，根据配置信息（`webpack.config.js`）找到入口文件（`src/index.js`）
- 第二步：找到入口文件所依赖的模块，并收集关键信息：比如`路径、源代码、它所依赖的模块`等
- 第三步：根据上一步得到的信息，生成最终输出到硬盘中的文件（dist）：包括 modules 对象、require 模版代码、入口执行文件等

在这过程中，由于浏览器并不认识除 html、js、css 以外的文件格式，所以我们还需要对源文件进行转换 —— **Loader 系统**。

**Loader 系统** 本质上就是接收资源文件，并对其进行转换，最终输出转换后的文件

除此之外，打包过程中也有一些特定的时机需要处理，比如：

- 在打包前需要校验用户传过来的参数，判断格式是否符合要求
- 在打包过程中，需要知道哪些模块可以忽略编译，直接引用 cdn 链接
- 在编译完成后，需要将输出的内容插入到 html 文件中
- 在输出到硬盘前，需要先清空 dist 文件夹
- ......

这个时候需要一个可插拔的设计，方便给社区提供可扩展的接口 —— **Plugin 系统**。

**Plugin 系统** 本质上就是一种事件流的机制，到了固定的时间节点就广播特定的事件，用户可以在事件内执行特定的逻辑，类似于生命周期。

这些设计也都是根据使用场景来的，只有理清需求后我们才能更好的理解它的设计思想。

在 **Webpack** 源码中，`compiler` 就像是一个大管家，在它上面挂载着各种生命周期函数，而 `compilation` 就像专管伙食的厨师，专门负责编译相关的工作，也就是打包过程中这个阶段。

## 二、具体实现 
- （1）搭建结构，读取配置参数
- （2）用配置参数对象初始化 `Compiler` 对象
- （3）挂载配置文件中的插件
- （4）执行 `Compiler` 对象的 `run` 方法开始执行编译
- （5）根据配置文件中的 `entry` 配置项找到所有的入口
- （6）从入口文件出发，调用配置的 `loader` 规则，对各模块进行编译
- （7）找出此模块所依赖的模块，再对依赖模块进行编译
- （8）等所有模块都编译完成后，根据模块之间的依赖关系，组装代码块 `chunk`
- （9）把各个代码块 `chunk` 转换成一个一个文件加入到输出列表
- （10）确定好输出内容之后，根据配置的输出路径和文件名，将文件内容写入到文件系统


代码中含有详细注释及执行步骤。

## 三、测试方法
```bash
node .\debugger.js
```

参考链接：[二十张图片彻底讲明白 Webpack 设计理念，以看懂为目的](https://mp.weixin.qq.com/s/Zy5geHwrgY_QN5Yy7n7Ekg)
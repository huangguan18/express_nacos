# express_nacos

## 简介
> Express_Nacos 项目是使用NodeJs的express4框架加上自写的一些工具类组成的。使用的编程工具是vs code。nacos是目前比较流行的生产环境注册中心，此项目就是类似在生产环境的springcloud模式的微服务。其中express_nacos_micro是微服务的服务端，express_nacos_gateway是微服务的网关转发端。express_nacos_micro在配置文件中默认不连接nacos，可单独运行。express_nacos_gateway请务必配置和nacos的连接，因为这个就是转发后端多个微服务用的统一入库。如果了解过springcloud的模式对此项目将不陌生。

## 快速开始
> 国内使用请先安装 cnpm
> 进入到目录express_nacos_micro
> 输入 cnpm install  例如: express_nacos_micro$cnpm install
> 输入 npm run dev  即可启动项目（单点项目）

## 使用微服务体系
> express_nacos_micro和express_nacos_gateway同样都可以进入src/config/application_config.js 修改nacos_config配置，连接到nacos。可使用微服务体系，访问网关即可转发请求到后边的多个微服务。express_nacos_micro&node ./src/start.js -p 8080.使用这样的方法可以启动不同的服务端口号，来开启多个微服务。当然您也可以使用docker环境。此代码不包含docker部署等方式。

## 其他说明
> nodejs推荐使用v10.0.0以上版本。个人建议使用v12.18.0以上。代码只用babel编译和支持es6 7 8标准。使用 npm run build可以使用webpack打包。这个项目是在全局安装了webpack-obfuscator和webpack。例如:cnpm install webpack-obfuscator -g 和 cnpm install webpack -g。使用cnpm link webpack-obfuscator 和 cnpm link webpack把全局工具链接到项目。请注意，不是在根目录运行。express_nacos_micro和express_nacos_gateway 两个目录都是项目目录，请进入项目目录编码或执行命令。test里边是一些工具类的例子和测试。请使用babel-node ./src/test/my_test.js这类的命令执行单文件测试。如果没有babel-node命令，请先全局安装babel-cli。
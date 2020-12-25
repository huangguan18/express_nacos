import express from 'express';
import bodyParser from 'body-parser';
import formidable from 'express-formidable';
import {application_config, nacos_config} from './config/application_config.js';
import { accesslogger, errorlogger, nacoslogger } from './utils/logger.js';
import SnowflakeID from './utils/SnowflakeID.js';
import NacosUtil from './utils/NacosUtil.js';
import router_config from './config/router_config.js';
import nacos_filter from './filter/nacos_filter.js';

const app = express();
let port = 3001;
// 如果命令行中有 -p 8080 这样的使用命令行中的端口启动服务,否则默认3000端口
let listenPortIdx = -1;
let myarguments = process.argv.splice(2);
myarguments.forEach((item,index) =>{
    if(item === '-p'){
        listenPortIdx = index;
    }
});

if(listenPortIdx>-1){
    // console.log(myarguments[listenPortIdx + 1]);
    port = myarguments[listenPortIdx + 1] ? myarguments[listenPortIdx + 1] : 3001;
}
//////////////////////////////////////////////////////
if(nacos_config && nacos_config.serverList && nacos_config.namespace) {
    nacoslogger.info("nacos配置存在，准备拉取服务列表...");
    NacosUtil.getInstance().subscribeService(application_config.application_name);
}

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(formidable());

app.disable('etag');

if(application_config.show_access_log){
    app.use(accesslogger);
}
// 路由注册在这个位置 通过路由配置文件
router_config.forEach((route)=>{
    app.use(route.path, route.router);
});

// 注册nacos过滤器
app.use(nacos_filter);
// app.use('/', mainRouter);
// app.use('/account', accountRouter);
// 接收错误的部分，需要放在router之后
app.use(function (err, req, res, next) {
    // console.log(req);
    let reqParam = {};
    reqParam['headers'] = req.headers;
    reqParam['method'] = req.method;
    reqParam['url'] = req.url;
    reqParam['body'] = req.body;
    let traceId = new SnowflakeID({ mid: +new Date() }).generate();
    errorlogger.error(` [${traceId}] ` + JSON.stringify(reqParam));
    errorlogger.error(` [${traceId}] ` + err.stack);
    next(err);
});

app.listen(port, () => console.log(`${application_config.application_name} app listening on port ${port}!`));
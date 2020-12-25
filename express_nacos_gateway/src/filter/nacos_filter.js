import _ from 'lodash';
import FormData from 'form-data';
import asyncHandler from '../utils/asyncHandler.js';
import HttpClientUtil from '../utils/HttpClientUtil.js';
import NacosUtil from '../utils/NacosUtil.js';
import CommonUtils from '../utils/CommonUtils.js';
import { nacos_config } from '../config/application_config.js';


const headerValContains = (headers, str) => {
    let result = false;
    _.forIn(headers, (value, key) => {
        if(_.includes(value, str)){
            result = true;
        }
    });
    return result;
};

/**
 * 主要作用是转发请求到其他的微服务上
 */
const nacos_filter = asyncHandler(async (req, res, next) => {
    const nacos_service_list = NacosUtil.getInstance().nacosServiceList;
    if (nacos_service_list.length <= 0) {
        res.send(500, "网关服务请求错误，没有找到任何微服务!!!");
        return;
    }
    let radomIdx = 0;
    if (nacos_config.loadBalanceType === 'RoundRobin') {
        // 轮询的就是一个一个来，处理数据的index
        let num = _.uniqueId() - 1;
        radomIdx = num % nacos_service_list.length;
    } else {
        // 默认是radom随机
        radomIdx = CommonUtils.genRangeRandom(0, nacos_service_list.length - 1);
    }

    if(!nacos_service_list[radomIdx].healthy){
        res.send(500, "后端微服务健康状态失效!!!" + JSON.stringify(nacos_service_list[radomIdx]));
        return;
    }
    // console.log('bbb:',nacos_service_list);
    // _.forEach(nacos_service_list, function(value) {
    //     console.log('aaa:',value);
    // });
    // console.log("aaaa:", _.includes(_.values(req.headers),'form-data'));
    // 请求头剔除 host
    let handled_headers = _.omit(req.headers, ['host','Host','HOST','content-length','Content-Length','CONTENT-LENGTH']);
    let handled_body = {};
    if (headerValContains(handled_headers, 'form-data')) {
        let formData = new FormData();
        _.forIn(req.fields, (value, key) => {
            formData.append(key,value);
        });
        _.forIn(req.files, (value, key) => {
            formData.append(key,value);
        });
        handled_body = formData;
        handled_headers = _.omit(handled_headers, ['content-type','Content-Type','CONTENT-TYPE']);
        handled_headers['content-type'] = `multipart/form-data; boundary=${formData._boundary}`;
    } else {
        handled_body = req.body;
    }
    
    const cofig = {
        baseURL: `http://${nacos_service_list[radomIdx].ip}:${nacos_service_list[radomIdx].port}`,
        url: req.originalUrl,
        method: req.method,
        headers: handled_headers,
        data: handled_body,
        timeout: 60 * 1000,
    };

    // console.log("=============1:", cofig);
    let result = await HttpClientUtil.request(cofig);
    // console.log("=============2:",result);
    _.forIn(result.headers, (value, key) => {
        // console.log('bbb1:',key);
        // console.log('bbb2:',value);
        res.setHeader(key, value);
    });
    res.send(result.data);
});

export default nacos_filter;
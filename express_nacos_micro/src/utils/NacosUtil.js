import {NacosNamingClient} from 'nacos';
import _ from 'lodash';
import {nacos_config} from '../config/application_config.js';
import {nacoslogger} from './logger.js';
import CommonUtils from './CommonUtils.js';

class NacosUtil {

    constructor() {
        this.client = new NacosNamingClient({
            logger:nacoslogger,
            serverList: nacos_config.serverList,
            namespace: nacos_config.namespace,
        });
    };

    static getInstance() {
        if (!this.instance) {
            this.instance = new NacosUtil();
        }
        return this.instance;
    };
    /**
     * 注册服务
     * @param {*} serviceName 
     * @param {*} port 
     */
    async registerService(serviceName, port) {
        let ip = 'localhost';
        ip = CommonUtils.getLocalIp();
        if(!_.isEmpty(nacos_config.serviceIp)){
            ip = nacos_config.serviceIp;
        }
        await this.client.ready();
        // registry instance
        await this.client.registerInstance(serviceName, {
            ip: ip,
            port: port,
        });
    };
    /**
     * 订阅服务，服务列表保存在实例变量中
     * @param {*} serviceName 
     */
    subscribeService(serviceName) {
        this.client.subscribe(serviceName, hosts => {
            nacoslogger.info("subscribeService: " + JSON.stringify(hosts));
            this.nacos_service_list = hosts;
        });
    };

    get nacosServiceList(){
        return this.nacos_service_list;
    };

    set nacosServiceList(arr){
        this.nacos_service_list = arr;
    };
};

export default NacosUtil;
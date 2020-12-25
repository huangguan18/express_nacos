import axios from 'axios';
import qs from 'qs';
import urlencode from 'urlencode';

class HttpClientUtil {
    /**
     * 使用axios框架处理http请求，是异步的，返回的是promise，config请参考axios的文档
     * @param {String} url 
     * @param {JSON} config axios的配置参数
     */
    static async doGet(url, config = null) {
        let conf = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0'
            },
            timeout: 10*1000
        };
        if (config) {
            conf = config;
        }
        return axios.get(url, conf);
    };
    /**
     * 发送post请求，默认对params进行urlencode
     * @param {String} url 
     * @param {JOSN} params post的参数
     * @param {JOSN} config axios的配置参数
     */
    static async doPost(url, params = null, config = null){
        let para = null;
        let conf = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 10*1000
        };
        if (config) {
            conf = config;
        }
        if(params){
            para = {};
            for(let k in params){
                para[k] = urlencode(params[k],"UTF-8");
            }
        }
        return axios.post(url, qs.stringify(para), conf);
    }
    /**
     * 发送post请求，默认是aplication/json的头，传递json，也可以传递= &分隔的字符串，可以自定义头。
     * @param {String} url 
     * @param {*} params 可以是json，字符串等数据
     * @param {JSON} config axios的配置参数
     */
    static async doPostBodyData(url, params = null, config = null){
        let conf = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0'
            },
            timeout: 10*1000
        };
        if (config) {
            conf = config;
        }
        return axios.post(url, params, conf);
    }

    static async request(config){
        return axios.request(config);
    }
}

export default HttpClientUtil;
import { redis_config } from '../config/application_config.js';
import Redis from 'ioredis';
import _ from 'lodash';

class RedisUtil {

    constructor() {
        if (redis_config.redisNodes.length > 1) {
            let options = _.omit(redis_config, ['redisNodes']);
            this.client = new Redis.Cluster(redis_config.redisNodes, options);
            // console.log('=========2:',options)
        } else if (redis_config.redisNodes.length == 1) {
            let options = redis_config.redisNodes[0];
            _.assign(options, _.omit(redis_config, ['redisNodes']));
            // console.log('=========:',options)
            this.client = new Redis(options);
        } else {
            throw ('redis 配置错误');
        }
    };

    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisUtil();
        }
        return this.instance;
    };

    get reids_client() {
        return this.client;
    };

    set reids_client(clt) {
        this.client = clt;
    };

    // 存储值,过期时间单位秒
    async setValue(key, value, expire = -1) {
        if (typeof value === 'string') {
            await this.client.set(key, value);
            if (expire > -1)
                await this.client.expire(key, expire);
        } else if (typeof value === 'object') {
            for (let item in value) {
                await this.client.hmset(key, item, value[item]);
            }
            if (expire > -1)
                await this.client.expire(key, expire);
        }
    };

    // 获取string
    async getValue(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    };

    // 获取hash
    async getHValue(key) {
        return new Promise((resolve, reject) => {
            this.client.hgetall(key, function (err, value) {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    };

    async Lpush(key, value) {
        return new Promise((resolve, reject) => {
            this.client.lpush(key, value, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };

    async Rpush(key, value) {
        return new Promise((resolve, reject) => {
            this.client.rpush(key, value, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };
};

export default RedisUtil;

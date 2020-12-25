import { mysql_config } from '../config/application_config.js';
import mysql from 'mysql2';
import _ from 'lodash';

class MySQLUtil {

    constructor() {
        this.mysql_pool_collect = {};
        _.forEach(mysql_config, (value, key) => {
            this.mysql_pool_collect[key] = mysql.createPool(value);
        });
    };

    static getInstance(dataSourceName = 'default') {
        if (!this.instance) {
            this.instance = new MySQLUtil();
        }
        // 这样赋值 才可以是赋值给mysqlutil的实例变量，因为实例是单利进行实例化的
        this.instance.datasource_name = dataSourceName;
        return this.instance;
    };

    async query(sql, arr = null) {
        const result = (async () => {
            const promisePool = this.mysql_pool_collect[this.datasource_name].promise();
            const [rows, fields] = await promisePool.query(sql, arr);
            return rows;
        })();
        return result;
    };

    async execute(sql, arr = null) {
        const result = (async () => {
            const promisePool = this.mysql_pool_collect[this.datasource_name].promise();
            const [rs] = await promisePool.execute(sql, arr);
            // console.log('000000000====:',rs);
            const id = await rs.insertId;
            return id;
        })();
        return result;
    }
};

export default MySQLUtil;
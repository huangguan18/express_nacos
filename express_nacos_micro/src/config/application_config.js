const application_config = {
    application_name: process.env.E_APPLICATION_NAME ? process.env.E_APPLICATION_NAME : 'Express_Nacos', //优先取环境变量(E_APPLICATION_NAME)中的项目名称
    show_access_log: false          // 是否开启访问日志
};
// 多数据源支持，但是请注意，至少要有一个 default 的定义
const mysql_config = {
    "default": {
        host: '192.168.2.80',
        user: 'root',
        password: null,
        database: 'jrails_test',
        port: 3306,
        charset: 'UTF8',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    "mysql1": {
        host: '192.168.2.80',
        user: 'root',
        password: null,
        database: 'webauth',
        port: 3306,
        charset: 'UTF8',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
};

// 支持单点和集群（Cluster）redis
const redis_config = {
    redisNodes: [{
        host: '127.0.0.1',
        port: 6379
    }],
    username: '',
    password: '',
    db: 0
};
// 默认serverList=null,namespace=null，即默认不注册到nacos，需要的时候请配置此项目到nacos的地址以及命名空间
const nacos_config = {
    serverList: null,  // '192.168.0.146:8848'
    namespace: null,  // '00abfe15-8a86-45f3-a2f2-6ce0e1b69e18'
    serviceIp: process.env.PUBLIC_IP ? process.env.PUBLIC_IP : ''  // 强制设定服务ip，从环境变量中优先，如果没有取设定值
};

export { application_config, mysql_config, redis_config, nacos_config };
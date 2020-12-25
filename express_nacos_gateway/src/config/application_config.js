const application_config = {
    application_name: process.env.E_APPLICATION_NAME ? process.env.E_APPLICATION_NAME : 'Express_Nacos', //优先取环境变量(E_APPLICATION_NAME)中的项目名称
    show_access_log: false          // 是否开启访问日志
};

const nacos_config = {
    serverList: '192.168.0.146:8848',
    namespace: '00abfe15-8a86-45f3-a2f2-6ce0e1b69e18',
    serviceIp: process.env.PUBLIC_IP ? process.env.PUBLIC_IP : '',  // 强制注册服务ip，从环境变量中优先，如果没有取设定值，如果没有设定任何值就取本机ip
    loadBalanceType: 'RoundRobin'                   //网关负载均衡模式，默认是随机，配置RoundRobin是轮询
};

export { application_config, nacos_config };
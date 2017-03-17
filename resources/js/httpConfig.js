define(function () {
    var httpConfig = {
        'siteUrl': 'http://192.168.16.84:8088',
        'requestHeader': {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        isDevEnvironment: true, //本地开发环境
        isMock: true //是否开启测试数据
    };
    return httpConfig;
});

var redis = require('redis'),
    RDS_PORT = 6379,        //端口号
    RDS_HOST = '192.168.31.3',    //服务器IP
    RDS_OPTS = {},            //设置项
    client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);

client.on('ready',function(err){
    console.log('ready');
});


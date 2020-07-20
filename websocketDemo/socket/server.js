const SocketServer = require('ws').Server;
const express = require('express');
const http = require('http');

// web服务器
const app = express()
app.use(express.static('./'));

// 利用http模块连接websocket服务器与web服务器
let server = http.createServer(app);

// WebSocket服务器
let wss = new SocketServer({
    server,
});

server.listen(2002,() => {
    console.log('web & websockt server启动成功,端口号2002')
});

wss.on('connection',client => {  //监听客户端的连接请求
    //client:当前连接我的客户端对象
    
    client.on('message',msg => {
        console.log(msg);
        wss.clients.forEach(item => {
            item.send(msg)
        })
    })

})
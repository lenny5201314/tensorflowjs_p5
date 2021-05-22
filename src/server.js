const express = require('express')
const app = express()

//將 express 放進 http 中開啟 Server 的 3000 port ，正確開啟後會在 console 中印出訊息
const server = require('http').Server(app)
    .listen(3000,()=>{console.log('open server!')})

//將啟動的 Server 送給 socket.io 處理
const io = require('socket.io')(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ['Origin','X-Requested-With','contentType','Content-Type','Accept','Authorization'],
        credentials: true
      }
})

//監聽 Server 連線後的所有事件，並捕捉事件 socket 執行
io.on('connection', socket => {
    //經過連線後在 console 中印出訊息
    console.log('success connect!')
    //監聽透過 connection 傳進來的事件
    socket.on('getMessage', message => {
        //回傳 message 給發送訊息的 Client
        console.log(message);
        socket.broadcast.emit("senddata",message);
        //socket.send("hello!");
        console.log("send!");    
    })
    
})

app.use(express.static(__dirname + '/'))
app.get('/p5', function(req, res) {
    res.sendFile(__dirname + '/sketch_210516b/index.html');
  });
  app.get('/sketch_210516b.js', function(req, res) {
    res.sendFile(__dirname + '/sketch_210516b/sketch_210516b.js');
  });
  app.get('/libraries/p5.min.js', function(req, res) {
    res.sendFile(__dirname + '/sketch_210516b/libraries/p5.min.js');
  });

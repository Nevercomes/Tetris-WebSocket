var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(3000);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('fumy other event', nction (data) {
    console.log(data);
  });
});
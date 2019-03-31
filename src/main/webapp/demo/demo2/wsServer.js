var ws = require("nodejs-websocket")

var PORT = 3000

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
		console.log("Received "+str)
		conn.sendText(str.toUpperCase())
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
	conn.on("error",function(err){
		console.log("handle error")
		console.log(err)
	})
}).listen(PORT)

console.log("WebSocket Server listen on port " + PORT);
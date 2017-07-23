var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
//server.listen(3000);
server.listen(process.env.PORT || 3000);

var mangUser = [];

io.on("connection", function(socket){
  console.log("Co nguoi ket noi:" + socket.id);

  socket.on("client-send-Username", function(data) {
  	if(mangUser.indexOf(data) >= 0) {
  		//fail
  		socket.emit("server-send-dki-thatbai");
  	}
  	else {
  		//success
  		mangUser.push(data);
  		socket.Username = data;
  		socket.emit("server-send-dki-thanhcong", data);
  		io.sockets.emit("server-send-danhsach-users", mangUser);
  	}
  });

  socket.on("logout", function () {
  	mangUser.splice(
  		mangUser.indexOf(socket.Username), 1
  	);
  	socket.broadcast.emit("server-send-danhsach-users", mangUser);
  });

  socket.on("user-send-message", function (data) {
  	io.sockets.emit("server-send-massage", {un: socket.Username, nd: data});
  });

  socket.on("toi-dang-go-chu", function () {
		var s = socket.Username + " dang go chu.";
		socket.broadcast.emit("co-ai-do-dang-go-chu", s);
  });

  socket.on("toi-ngung-go-chu", function () {
  	socket.broadcast.emit("co-ai-do-ngung-go-chu");
  })
});

app.get("/", function(req, res){
  res.render("trangchu");
});

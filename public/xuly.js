//var socket = io("http://localhost:3000");
var socket = io("https://thanhgiong-pj2.herokuapp.com");

socket.on("server-send-dki-thatbai", function () {
	alert("Sai Username, co nguoi dang ky roi!!!");
});

socket.on("server-send-dki-thanhcong", function (data) {
	$("#currentUser").html(data);
	$("#loginForm").hide(2000);
	$("#chatForm").show(1000);
});

socket.on("server-send-danhsach-users", function (data) {
	$("#boxContent").html("");
	data.forEach(function (i) {
		$("#boxContent").append("<div class='user'>" + i + "</div>");
	});
});

socket.on("server-send-massage", function (data) {
	$("#listMessages").append("<div class='ms'>" + data.un + " : " + data.nd + "</div>");
});

socket.on("co-ai-do-dang-go-chu", function (data) {
	$("#thongbao").html(data);
});

socket.on("co-ai-do-ngung-go-chu", function () {
	$("#thongbao").html("");
});

$(document).ready(function () {
	$("#loginForm").show();
	$("#chatForm").hide();

	$("#btnRegister").click(function () {
		socket.emit("client-send-Username", $("#txtUsername").val());
	});

	$("#btnLogout").click(function () {
		socket.emit("logout");
		$("#chatForm").hide(500);
		$("#loginForm").show(1000);
	});

	$("#btnSendMessage").click(function () {
		socket.emit("user-send-message", $("#txtMessage").val());
		$("#txtMessage").val("");
	});

	$("#txtMessage").focusin(function () {
		socket.emit("toi-dang-go-chu");
	});

	$("#txtMessage").focusout(function () {
		socket.emit("toi-ngung-go-chu");
	});
});
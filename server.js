var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var VoteManager = require('./modules/VoteSessionManager');

var voteManager = new VoteManager();
voteManager.registerSession('1234', 'Andre Teste');
server.listen(5000);

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/vote.html');
});
app.get('/voteboard', function (req, res) {
    res.sendFile(__dirname + '/views/voteboard.html');
});
app.get('/bluetooth', function (req, res) {
    res.sendFile(__dirname + '/views/bluetooth.html');
});
app.post('/api/vote/enter', function (req, res) {
    var signedIn = voteManager.signIn(req.body.nickname, req.body.sessionCode);
    var jsonResponse = {
        'status': signedIn ? 'ok' : 'not found.',
        'message': signedIn ? 'Nickname and session founded.' : 'Nickname and session not found.'
    };
    res.header('Access-Control-Allow-Origin', '*');
    res.send(200, jsonResponse);
});

//var devices = [];

io.sockets.on('connection', function (socket) {
    console.log('Socket.io connected. ' + socket.id);

    socket.on('sendData', function (data) {
        //devices[data.nickname] = data;
        let currentDatetime = new Date();
        data.socketId = socket.id;
        voteManager.registerClient(data);
        console.log('sendData called. ' + currentDatetime.toLocaleDateString() + ' ' + currentDatetime.toLocaleTimeString());
        io.sockets.emit('accelerationStream', voteManager.getClients());
    });
    socket.on('sendQuestion', function (data) {
        console.log("sendQuestion called.");
        io.sockets.emit('questionStream', data);
        console.log(data);
    });
});
io.sockets.on('disconnect', function (socket) {
    console.log('disconnected.');
})
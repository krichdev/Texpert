require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// JSON web token dependencies, including a secret key to sign the token
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;

var app = express();

//Sockets
var server = require('http').Server(app);
var io = require('socket.io')(server);

// mongoose models and connection
var mongoose = require('mongoose');
var User = require('./models/user');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/techport');

// decode POST data in JSON and URL encoded formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));


// controllers
app.use('/api/users', expressJWT({secret: secret})
  .unless({
    path: [{ url: '/api/users', methods: ['POST'] }]
  }), require('./controllers/users'));

// this middleware will check if expressJWT did not authorize the user, and return a message
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'You need an authorization token to view this information.' });
  }
});

//Socket user
var users = [];

io.sockets.on('connection', function(socket) {
 console.log('a user has connected');
//connections
 socket.on('get-users', function() {
     socket.emit('all-users', users);
 });
// new user
 socket.on('join', function(data) {
   console.log('this is my data ', data);
 //user name
   socket.nickname = data.nickname;
   socket.room = data.room;
   users[socket.nickname] = socket;

   var userObj = {
     nickname: data.nickname,
     socketid: socket.id
   };
   console.log('this is my userObj ', userObj)
   users.push(userObj);
   console.log('all users', users);
   io.emit('all-users', users);
 });

 socket.on('send-message', function(data) {
   //socket.broadcast.emit('message-received', data);
   io.emit('message-received', data);
 });

 socket.on('create', function(room){
    socket.join(room);
 });

 socket.on('send-like', function(data){
   console.log(data);
   socket.broadcast.to(data.like).emit('user-liked',data);
 });

 socket.on('disconnect', function(){
   // console.log('user disconnected', function() {
   users = users.filter(function(item) {
     return item.nickname !== socket.nickname;
   });
   io.emit('all-users', users);
 });

});


// POST /api/auth - if authenticated, return a signed JWT
app.post('/api/auth', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    // return 401 if error or no user
    if (err || !user) return res.status(401).send({ message: 'User not found' });

    // attempt to authenticate a user
    var isAuthenticated = user.authenticated(req.body.password);
    // return 401 if invalid password or error
    if (err || !isAuthenticated) return res.status(401).send({ message: 'User not authenticated' });

    // sign the JWT with the user payload and secret, then return
    var token = jwt.sign(user.toJSON(), secret);

    return res.send({ user: user, token: token });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;



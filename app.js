const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const compression = require('compression');
const config = require('./config/database');
const cookieSess = require('cookie-session');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const mainServer = express();
/*const chatServer = express();
const socketio = require('socket.io');
*/
const users = require('./users/routes/users');

// Ports to listen
const testPort= 3000;
const chatPort = 4550;
const prodPort = process.env.PORT || 80;

const myPort = testPort;
//const myPort = prodPort;

//Database stuff

const myDB = config.testDB;
//const myDB = config.prodDB;

	// Connect to Database
mongoose.connect(myDB);

	// On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database '+ myDB);
});

	// On Error
mongoose.connection.on('error', (err) => {
	console.log('Database error'+ err);
});


// Middlewares initialization

mainServer.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 

/* 
var limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes 
  max: 50, // limit each IP to 50 requests per windowMs 
  delayMs: 0 // disable delaying - full speed until the max limit is reached 
});
 
//  mainServerly to all requests 
mainServer.use(limiter);*/

	//mainServer compression

mainServer.use(compression());

	// Cors Middleware
mainServer.use(cors());

	// Body Parser Middleware
mainServer.use(bodyParser.json());

	//Cookie session Middleware
mainServer.use(cookieSess ({
	name: 'Panadoc Session',
	secret: config.cSecret,
    maxAge: 7*24 * 60 * 60 * 1000 //A week
	}));

mainServer.use(helmet());

	// Passport Middleware
mainServer.use(passport.initialize());
mainServer.use(passport.session());
require('./config/passport')(passport);

// Set Static Folder

//mainServer.use(express.static(path.join(__dirname, 'public')));

//Adding routes

mainServer.use('/users', users);

// Index Route
/*
	//In case of error
mainServer.get('/', (req, res) => {
	res.send('Waiting for the party to start!');
});*/

const frontRoute = "public/index.html"

	//Pointing to angular mainServer Need some work here
mainServer.get('/*', (req,res) => {
	var fileToSend = path.join(__dirname, frontRoute);
	res.sendFile(fileToSend);
});

	// Start mainServer
mainServer.listen(myPort, () => {
	console.log('mainServer started on port ' + myPort);
});

/*
chatServer.use(compression());
chatServer.use(cors());
chatServer.use(bodyParser.json());

const server = chatServer.listen(chatPort, () => {
    console.log("Chat server started on port: " + chatPort);
});

const io = socketio(chatServer);

// 
io.on('connection', (socket) => { 
    socket.emit('ACK', {data: "Welcome"});

    socket.on('ACK', (data) => {
        console.log(data);
	});
});

chatServer.get('/', (req, res, next) => {
	res.send('Guess you are looking in the wrong place...');
});*/
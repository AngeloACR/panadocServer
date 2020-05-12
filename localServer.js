const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const config = require('./config/environment');
const cookieSess = require('cookie-session');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const app = express();

const users = require('./users/routes/users');
const patients = require('./users/routes/patients');
const doctors = require('./users/routes/doctors');
const mails = require('./users/routes/mails');
const auth = require('./users/routes/auth');
const general = require('./general/routes/general');
const askadoc = require('./askadoc/routes/askadoc');
const clinica = require('./clinica/routes/clinica');
const reservas = require('./clinica/routes/reservas');
const comunciaciones = require('./comunicaciones/routes/comunicaciones');

module.exports.init = function(folder, thePath, port) {
    app.set('port', (port));

    // Middlewares initialization

    // app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 
    /* 
    var limiter = new RateLimit({
      windowMs: 15*60*1000, // 15 minutes 
      max: 50, // limit each IP to 50 requests per windowMs 
      delayMs: 0 // disable delaying - full speed until the max limit is reached 
    });
     
    //  apply to all requests 
    app.use(limiter);*/

    //App compression
    app.use(compression());

    // Cors Middleware
    app.use(cors());

    // Body Parser Middleware
    app.use(bodyParser.json());

    //Cookie session Middleware
    app.use(cookieSess({
        name: 'panaSess',
        secret: config.cSecret,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 //A week
    }));

    app.use(helmet());

    // Set Static Folder

    app.use(express.static(path.join(__dirname, folder)));

    //Adding routes

    app.use('/users', users);
    app.use('/doctors', doctors);
    app.use('/patients', patients);
    app.use('/mails', mails);
    app.use('/general', general);
    app.use('/auth', auth);
    app.use('/askadoc', askadoc);
    app.use('/clinica', clinica);
    app.use('/reservas', reservas);

    app.get('/', (req, res) => {
        res.send('We are having some troubles, please come back in a while!');
    });

    //Pointing to angular app
    app.get('/*', (req, res) => {
        var fileToSend = path.join(__dirname, thePath);
        res.sendFile(fileToSend);
    });

    return app
}
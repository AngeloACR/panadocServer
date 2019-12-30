import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import {User} from '../models/user.schema.model';
import { environment } from '../../../../environments/environment.prod';
import { sendOk, sendError} from '../../help';
import { auth } from '../../auth';
import { mockDoctor } from '@panadoc/data';

const router = express.Router();
const addr = "/mail";
// EMAIL SETUP
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: environment.contactMail,
    pass: environment.contactPass
  }
});

//Create token and send mail
router.post('/', /*auth,*/ async (req, res) => {
  try {
    const username = req.body.username;

	var user = await User.setToken(username);
		
    var mailOptions = {
		from: '"The Panadoc" <panadoc@gmail.com>', // sender address
		to: user.mail, // list of receivers
		subject: 'Panadoc validation', // Subject line
		text: 'Hello! Come on and enjoy the panadoc benefits!', // plaintext body
		html: '<b>'+user.validToken+'</b>' // html body
	};

	// send mail with defined transport object
	var sendMail = await transporter.sendMail(mailOptions);

    const msg = ` ${req.originalUrl}`;
    sendOk(msg, res, sendMail.response);
  } catch (e) { 
    sendError(addr, res, e) 
    }
});

router.post('/vUser', /*auth,*/ async (req, res) => {
  try {
    const token = req.body.token;
    const username = req.body.username;

	let isValid = await User.validateUser(username, token);

    const msg = ` ${req.originalUrl}`;
    sendOk(msg, res, isValid)
    
  } catch (e) { 
    sendError(addr, res, e) 
    }
});


export {
  addr as MAIL_ENDPOINT,
  router as MailRoutes
};
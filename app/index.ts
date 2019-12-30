import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
import * as cookieSess from "cookie-session";
import * as helmet from "helmet";
import * as cors from 'cors';
import { environment } from '../environments/environment';
import {
  USER_ENDPOINT,
  AUTH_ENDPOINT,
  ASKADOC_ENDPOINT,
  MGUIDE_ENDPOINT,
  MAIL_ENDPOINT,
  UserRoutes,
  AuthRoutes,
  AskADocRoutes,
  MguideRoutes,
  MailRoutes,
  COMMUNICATIONS_ENDPOINT,
  CommunicationsRoutes,
} from './modules';

const originsWhitelist = [
  'http://localhost:3000',
  'http://localhost:4200',
  'http://localhost:4201',
  'http://panadoc-dev1.tecnobunker.net',
  'http://panadoc-dev2.tecnobunker.net',

];
const corsOptions = {
  // origin: function (origin, callback) {
  //   var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
  //   callback(null, isWhitelisted);
  // },
  // credentials: true
};

const cookieSessionConfig = {
  name: 'Panadoc Session',
  secret: environment.cSecret,
  maxAge: 7 * 24 * 60 * 60 * 1000
};

export function startServer(port, folder) {
  const app = express();

  app.set('port', (port));
  // app.enable('trust proxy');
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(cookieSess(cookieSessionConfig));
  app.use(helmet());

  // Set Static Folder
  // if (environment.production) {
  app.use('/', express.static(path.join(__dirname, folder)));
  // }
  //Adding routes
  app.use(USER_ENDPOINT, UserRoutes);
  app.use(ASKADOC_ENDPOINT, AskADocRoutes);
  app.use(MGUIDE_ENDPOINT, MguideRoutes);
  app.use(AUTH_ENDPOINT, AuthRoutes);
  app.use(MAIL_ENDPOINT, MailRoutes);
  app.use(COMMUNICATIONS_ENDPOINT, CommunicationsRoutes);


  if (environment.production) {
    app.use(morgan);
  }
  return app;
}


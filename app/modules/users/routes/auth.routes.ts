import * as express from 'express';
import { User } from '../models/user.schema.model';
import { sendOk, sendError, fixUid } from '../../help';

const router = express.Router();
const addr = "/auth";
//**************************** USER AUTHENTICATION************************************//
router.post('/', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    let auth = await User.authUser(username, password);
    if (auth) {
      const msg = ` ${req.originalUrl} ${JSON.stringify(auth)}`;
      console.log(auth)
      sendOk(msg, res, {...auth,user:fixUid(auth.user)})
    } else {
      throw new Error('Something went wrong, try again')
    }
  } catch (e) {
    sendError(addr, res, e)
  }
});




export {
  addr as AUTH_ENDPOINT,
  router as AuthRoutes
};
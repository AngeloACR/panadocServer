import * as express from 'express';
import * as passport from 'passport';
import { User } from '../models/user.schema.model';
import * as async from 'async'
import { sendOk, sendError} from '../../help';
import { auth } from '../../auth';
import { mockDoctor } from '@panadoc/data';
import { Doctor } from '../../mguide/models/doctor.schema.model';
import { Patient } from '../../mguide/models/patient.schema.model';

const router = express.Router();
const addr = "/users";
//**************************** USER CRUD************************************//

router.post('/', auth, async (req, res) => {
  try {

    const user = {
      name: req.body.name,
      username: req.body.username,
      mail: req.body.mail,
      password: req.body.password,
      type: req.body.type,
    };

    
    let newUser = new User(user);
    
    const msg = ` ${req.originalUrl} ${JSON.stringify(user)}`;
    let addUser = await User.addUser(newUser);

    if(user.type == 'Doctor'){
      const doctor = {
        userId: addUser._id,
        speciality: req.body.speciality,
        summary: req.body.summary,
        experience: req.body.experience,
        addr: req.body.addr,
      };
      let newDoctor = new Doctor(doctor);
      const addDoctor = await Doctor.addDoctor(newDoctor);
    } else if(user.type == 'Patient'){
      const patient ={
        userId: addUser._id,
      }
      let newPatient = new Patient(patient);
      const addPatient = await Patient.addPatient(newPatient);
    }

    addUser = User.findOne(addUser._id)
      .populate('doctorId')
      .populate('patientId');
    
    console.log(addUser)

    sendOk(msg, res, addUser)
  }
  catch (e) { sendError(addr, res, e) }
});

router.get('/:userId', auth, async (req, res) => {
  try {
    const uid = req.params.userId;
    const user = await User.getUser(uid);
    const msg = ` ${req.originalUrl}`;

    sendOk(msg, res, user)
  }
  catch (e) { sendError(addr, res, e) }
});

router.delete('/:userId', auth, async (req, res) => {
  try {
    const id = req.params.userId;
    const msg = ` ${req.originalUrl}`;
    const data = await User.deleteUser(id);
  console.log('this is the data' + data);
    sendOk(msg, res, data)
  }
  catch (e) { sendError(addr, res, e) }
})

router.put('/', auth, async (req, res) => {
  try {
    const data = {
      id: req.body.id,
      name: req.body.name,
      avatarSrc: req.body.avatarSrc,
      phone: req.body.phone,
    };
    const msg = ` ${req.originalUrl}`;
    let user = await User.updateUser(data);
    sendOk(msg, res, user)
  }
  catch (e) { sendError(addr, res, e) }
});

router.get('/all', auth, async function (req, res) {
  try {
    const users = await User.getUsers();
    if (users && users.length) {
      const msg =       'GET' + addr;
      sendOk(msg, res, users)
    } else {
      throw ('There are not answered questions')
    }
  }
  catch (e) { sendError(addr, res, e) }
});
export {
  addr as USER_ENDPOINT,
  router as UserRoutes
};
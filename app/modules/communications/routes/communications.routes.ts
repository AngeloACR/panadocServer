import * as express from 'express';
import { sendOk, sendError } from '../../help';
import { auth } from '../../auth';
import { mockDoctor, Chat, ChatPreview, mockLog, mockPatient, UserType, mockChat, determineIfIsChatUnit, ChatUnit } from '@panadoc/data';
import User from '../../users/models/user.schema.model';

const router = express.Router();
const addr = "/communications";

const getMockUsers = async () => {
  const users = await User.find({});
  const patient = users.find(({ type }) =>  type===UserType.PATIENT);
  const doctor = users.find(({ type }) =>   type===UserType.DOCTOR);
  return { patient: { ...mockPatient, ...patient }, doctor: { ...mockDoctor, ...doctor } }
}
router.get('/chats/:userId', auth, async (req, res) => {
  try {
    //FIXME: Mocks
    const userId = req.params.userId;
    const { type } = await User.findById(userId);

    const { patient, doctor } = await getMockUsers();
    const chatPreviewList: ChatPreview[] = [
      {
        contact: type === UserType.DOCTOR
          ? { ...patient, uid: patient._id }
          : { ...doctor, uid: doctor._id },
        lastMessage: (mockLog
          .filter(c => {
            return determineIfIsChatUnit(c);
          })
          .find((log: ChatUnit) => {
            return log.senderId !== userId;
          }) as ChatUnit)
      }
    ]
    sendOk(` ${req.originalUrl}`, res, chatPreviewList)
  }
  catch (e) { sendError(addr, res, e) }
});
// router.get('/chat/:chatId', auth, async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const { patient, doctor } = await getMockUsers();
//     const chat: Chat = mockChat(mockPatient, mockDoctor);
//     sendOk(` ${req.originalUrl}`, res, chat)
//   }
//   catch (e) { sendError(addr, res, e) }
// })

export {
  addr as COMMUNICATIONS_ENDPOINT,
  router as CommunicationsRoutes
};
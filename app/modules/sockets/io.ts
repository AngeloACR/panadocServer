import * as Io from 'socket.io';
import {
  SocketEventType as Type,
  ChatUnit,
  mockLog,
  Chat,
  User,
  mockPatient,
  mockDoctor,
  mockChat,
  SocketPackage as Pkg
} from '@panadoc/data';

export function ioConfig(io: Io.Server) {
  io.on('connection', (socket) => {
    let user: User;
    let connectedUsers: number;
    let chat: Chat;
    socket.on(Type.CHAT_ADD_USER, async (payload: { user: User, chatId?: string }) => {
      if (user) { return } else { user = payload.user }


      if (!chat) {
        //FIXME: Get from database; GetChatStoryById(chatId);
        const me = mockPatient.uid === user.uid ? mockPatient : mockDoctor;
        const other = mockPatient.uid === user.uid ? mockDoctor : mockPatient;
        chat = await Promise.resolve(mockChat(me, other) as any);
      }
      socket.join(chat.uid);
      socket.emit(Type.CHAT_LOGIN, new Pkg(Type.CHAT_LOGIN, chat));
      io.sockets.in(chat.uid).clients((err, clients) => {
        connectedUsers = clients.length
        if (connectedUsers > 2) {
          console.error('MAS DE DOS USUARIO EN EL CHAT')
          return;
        }
        console.log(`Se conecto ${payload.user.name} a la sala ${chat.uid}, ahora tiene ${connectedUsers} usuarios`);
        socket.emit(Type.N_USERS, new Pkg(Type.N_USERS, connectedUsers))
        socket.broadcast.to(chat.uid).emit(Type.CHAT_USER_JOINED, new Pkg(Type.CHAT_USER_JOINED, { user: payload.user, total: connectedUsers }));
      });

    });
    // socket.on(Type.CHAT_USER_LEFT,(payload:))
    socket.on(Type.CHAT_NEW_MESSAGE, (chatUnit: ChatUnit) => {
      console.log(`${chatUnit.senderId} escribio ${JSON.stringify(chatUnit.message)}`);
      chat.log.push(chatUnit);
      socket.broadcast.to(chat.uid).emit(Type.CHAT_NEW_MESSAGE, new Pkg(Type.CHAT_NEW_MESSAGE, chatUnit));
    });

    socket.on(Type.CHAT_TYPING, () => { socket.broadcast.to(chat.uid).emit(Type.CHAT_TYPING, new Pkg(Type.CHAT_TYPING)); });

    socket.on(Type.CHAT_NO_TYPING, () => { socket.broadcast.to(chat.uid).emit(Type.CHAT_NO_TYPING, new Pkg(Type.CHAT_NO_TYPING)); });

    socket.on('disconnect', () => {
      if (user) {
        console.log(`Se desconectó ${user.name} de la sala ${chat.uid}`);
        io.sockets.in(chat.uid).clients((err, clients) => {
          if (clients.length === 0) {
            //FIXME: SAVE CHATID;
          }
        });
        socket.broadcast.to(chat.uid).emit(Type.CHAT_USER_LEFT, new Pkg(Type.CHAT_USER_LEFT));
      }
    });
  });
}
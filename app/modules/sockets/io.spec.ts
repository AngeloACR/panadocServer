import { ioConfig } from "./io";
const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');
describe('Description', () => {
  it('Test', () => {
    expect(true).toBe(true);
  });
});

// xdescribe('IO Test', () => {
//   let socketClient;
//   let httpServer;
//   let httpServerAddr;
//   let ioServer;
//   beforeAll((done) => {
//     httpServer = http.createServer().listen();
//     httpServerAddr = httpServer.address();
//     ioServer = ioBack(httpServer);
//     ioConfig(ioServer)
//     done();
//   });

//   afterAll((done) => {
//     ioServer.close();
//     httpServer.close();
//     done();
//   });

//   beforeEach((done) => {
//     // Setup
//     // Do not hardcode server port and address, square brackets are used for IPv6
//     socketClient = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
//       'reconnection delay': 0,
//       'reopen delay': 0,
//       'force new connection': true,
//       transports: ['websocket'],
//     });
//     socketClient.on('connect', () => {
//       done();
//     });
//   });

//   afterEach((done) => {
//     // Cleanup
//     if (socketClient.connected) {
//       socketClient.disconnect();
//     }
//     done();
//   });


//   xdescribe('basic socket.io example', () => {
//     test('should communicate', (done) => {
//       ioServer.emit('echo', 'Hello World');
//       socketClient.once('echo', (message) => {
//         // Check that the message matches
//         expect(message).toBe('Hello World');
//         done();
//       });
//       ioServer.on('connection', (mySocket) => {
//         expect(mySocket).toBeDefined();
//       });
//     });
//     test('should communicate with waiting for socket.io handshakes', (done) => {
//       // Emit sth from Client do Server
//       socketClient.emit('examlpe', 'some messages');
//       // Use timeout to wait for socket.io server handshakes
//       setTimeout(() => {
//         // Put your server side expect() here
//         done();
//       }, 50);
//     });
//   });

// });
const db = require('./database');
const localServer = require('./localServer');
const nxServer = require('./nxServer');
const landingServer = require('./landingServer');
const path = require('path');

const connection = db.initConnect();

/* const localPort = 3800;
const localFolder = './public/panaAppNx';
const localPath = localFolder + '/index.html';
const localApp = nxServer.init(localFolder, localPath, localPort);


localApp.listen(localPort, () => {
	console.log('Server running at: ' + localPort);
});
 */
const local2Port = 3400;
const local2Folder = './public/panaFront';
const local2Path = local2Folder + '/index.html';
const local2App = localServer.init(local2Folder, local2Path, local2Port);

local2App.listen(local2Port, () => {
	console.log('Server running at: ' + local2Port);
});


const landingPort = 6174;
const landingFolder = './public/panaLand';
const landingPath = landingFolder + '/index.html';
const landingApp = landingServer.init(landingFolder, landingPort);

 landingApp.get('/', (req, res) => {
	res.send('We are having some troubles, please come back in a while!');
});
 
//Pointing to angular app
landingApp.get('/*', (req, res) => {
	var fileToSend = path.join(__dirname, landingPath);
	res.sendFile(fileToSend);
})

landingApp.listen(landingPort, () => {
	console.log('Server running at: ' + landingPort);
});
const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');
const express = require('express');
const expressApp = express();
const server = require('http').createServer(expressApp);
const io = require('socket.io').listen(server);
const SocketIOFile = require('socket.io-file');
const {
  download
} = require('electron-dl');
// 
server.listen(process.env.PORT || 3000);
// 
var connections = [];

let mainWindow, loginWindow, clientWindow;
// 
require('electron-reload')(__dirname + '/resources');
// 
expressApp.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
// 
// expressApp.get('/socket.io-file-client.js', (req, res, next) => {
//   return res.sendFile(__dirname + '/node_modules/socket.io-file-client/socket.io-file-client.js');
// });
expressApp.use('/resources', express.static(__dirname + '/resources'));
expressApp.use('/data', express.static(__dirname + '/data'));
// 
io.sockets.on("connection", function (socket) {
  //connect
  connections.push(socket);
  console.log('Connected : %s sockets connected', connections.length);
  //diisconnect
  socket.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });
  //send Message
  socket.on('send message', function (data, room, date, sender, type, msgType) {
    console.log(data + '|' + room);
    uploader.rename = null;
    io.sockets.to(room).emit('new message', {
      msgText: data,
      dateMsg: date,
      emetteur: sender,
      Id_Client: room,
      emetteurType: type,
      msgType: msgType
    });
  });
  //new user
  socket.on('new user', function (data) {
    socket.username = data[0];
    socket.usertype = data[1];
  });
  //join room
  socket.on('join-room', function (room) {
    socket.leaveAll();
    socket.join(room);
    socket.currentRoom = room;
    uploader.options.uploadDir = 'data/Clients/' + room;
    console.log(socket.currentRoom);
    console.log(uploader.options.uploadDir);
  });
  // 
  //FILE UPLOADES
  var uploader = new SocketIOFile(socket, {
    uploadDir: 'data',
    chunkSize: 10240,
    transmissionDelay: 0,
    overwrite: true,
  });
  // 
  socket.on('change-upload-dir', function (dir) {
    uploader.options.uploadDir = dir;
  });
  socket.on('change-upload-name', function () {
    // uploader.options.rename = 'avatar.png';
    uploader.rename = 'avatar.png';
    console.log(uploader);
  });

  uploader.on('start', (fileInfo) => {
    console.log('Start Uploading');
    console.log(fileInfo);
  });
  uploader.on('stream', (fileInfo) => {
    console.log(`${fileInfo.wrote} / ${fileInfo.size} byte(s)`);
  });
  uploader.on('complete', (fileInfo) => {
    console.log('Upload Complete.');
    mainWindow.webContents.send('download complete', fileInfo);
    mainWindow.webContents.send('image saved', fileInfo);
    // mainWindow.reload();
    console.log(fileInfo);
  });
  uploader.on('error', (err) => {
    console.log('Error!', err);
  });
  uploader.on('abort', (fileInfo) => {
    console.log('Aborted: ', fileInfo);
  });

})

ipcMain.on('test', function (event, data) {
  download(BrowserWindow.getFocusedWindow(), data.url).then(dl => mainWindow.webContents.send('FINISHED', dl.getSavePath()));
  console.log('ur mum is gai');
});
app.on('ready', createWindow);

ipcMain.on('createLoginWindow', function () {
  createLoginWindow();
});
ipcMain.on('createClientWindow', function (event, data) {
  createClientWindow(data);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1202,
    height: 602,
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  ipcMain.on('create-Comptable-Window', function (event, data) {
    mainWindow.loadURL('http://localhost:3000/resources/html/mainComptable.html');
    mainWindow.webContents.on('did-finish-load', function () {
      // console.log('ready');
      console.log(data);
      mainWindow.webContents.send('Comptable-Login', data);
    });
  });

  mainWindow.loadFile('resources/html/mainWindow.html');
  /*mainWindow.webContents.openDevTools({
    mode: 'detach'
  });*/

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
// 
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 302,
    height: 402,
    frame: false,
    transparent: true,
    parent: mainWindow,
    modal: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  loginWindow.loadFile('resources/html/loginWindow.html');
  /*loginWindow.webContents.openDevTools({
    mode: 'detach'
  });*/

  loginWindow.on('closed', function () {
    loginWindow = null
  });
}

function createClientWindow(data) {
  clientWindow = new BrowserWindow({
    width: 852,
    height: 602,
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  clientWindow.loadURL('http://localhost:3000/resources/html/mainClient.html');
  clientWindow.webContents.openDevTools({
    mode: 'detach'
  });
  clientWindow.webContents.on('did-finish-load', function () {
    // console.log('ready');
    console.log(data);
    clientWindow.webContents.send('Client-Login', data);
  });
  clientWindow.on('closed', function () {
    clientWindow = null
  });
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
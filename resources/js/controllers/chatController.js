var socket;
const SocketIOFileClient = require('socket.io-file-client');
const {
    remote,
    ipcRenderer
} = require('electron');
const fs = require('fs-extra');
var uploader;

// import SocketIOFileClient from 'socket.io-file-client';
// var uploader = new SocketIOFileClient(socket);

function initiateConnection(currUser) {
    socket = io.connect();
    uploader = new SocketIOFileClient(socket);
    socket.on('new message', function (data) {
        // console.log(data);
        createMsgBub(data, currUser[1]);
    });
}
// 
function setCurrentUser(userId, userType) {
    socket.emit('new user', [userId, userType]);
}
// 
function joinRoom(room) {
    socket.emit('join-room', room);
}
// 
async function sendMessage(msg, room, date, emetteur, type, comptable, msgType) {
    var res = await saveMsgInDB([msg, date, emetteur, type, comptable, room, msgType]);
    if (res.affectedRows == 1)
        socket.emit('send message', msg, room, date, emetteur, type, msgType);
    else
        alertMsg('error', 'Message was not sent');
    // console.log('message was not sent');
}
// 
function scrollChatArea() {
    document.getElementById('msgArea').scroll(0, document.getElementById('msgArea').scrollHeight);
}
// 
function sendFile(fileEl, room, date, emetteur, emetteurType, comptable) {
    var executed = false;
    // console.log(fileEl.files);
    var uploadId = uploader.upload(fileEl.files);
    // console.log(uploadId);
    ipcRenderer.on('download complete', function (event, data) {
        if (!executed) {
            // console.log(data);
            // console.log(data.uploadDir);
            sendMessage(data.name, room, date, emetteur, emetteurType, comptable, 'file');
            fileEl.value = '';
            executed = true;
        }
    });
}

function downloadFile(dir) {
    var executionNB = 0;
    ipcRenderer.send('test', {
        url: 'http://localhost:3000/' + dir
    });
    ipcRenderer.on('FINISHED', function (event, data) {
        if (executionNB < 1) {
            // console.log(data);
            executionNB = executionNB + 1;
        }
    });
}
// 
function uploadImage(input, dir) {
    var executed = false;
    socket.emit('change-upload-dir', dir);
    socket.emit('change-upload-name');
    // if(input.files[0].type != 'image/jpeg' || input.files[0].type != 'image/png'){}
    var uploadId = uploader.upload(input.files);
    // console.log(uploadId);
    ipcRenderer.on('image saved', function (event, data) {
        if (!executed) {
            // console.log(data);
            // console.log(data.uploadDir);
            var loc = data.uploadDir.replace(/\\/g, "/");
            // console.log(loc);
            reloadWindow();
            // console.log(display);
            // // display.style = "background-image: url('http://localhost:3000/" + data.uploadDir + "')";
            // display.style = "background-image:url('http://localhost:3000/" + loc + "');";
            executed = true;
        }
    });
}
// 
function ifFileExists(name) {
    var ret = false;
    if (fs.existsSync(name)) {
        ret = true;
    }
    return ret;
}
// 
function reloadWindow() {
    remote.getCurrentWindow().reload();
}

function closeWindow() {
    remote.getCurrentWindow().close();
}

function minimizeWindow() {
    remote.getCurrentWindow().minimize();
}
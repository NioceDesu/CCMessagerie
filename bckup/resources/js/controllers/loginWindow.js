const {
    remote,
    ipcRenderer
} = require('electron');
const fs = require('fs');
var connectionMode = 'Comptable';

window.onload = () => {
    // 
    switcher();
    // 
    showHidePassword();
    // 
    document.getElementById('btnLogin').addEventListener('click', function (e) {
        const vals = document.getElementsByClassName('valInputs');
        loginUser(vals[0].value, vals[1].value);
    });
    // 
    document.getElementById('btnAnuller').addEventListener('click', function (e) {
        closeWindow();
    });
}
// 
async function loginUser(login, pass) {
    var dir = 'data/';
    if (connectionMode == 'Comptable') {
        var res = await getComptable(login, pass);
        if (res.length == 1) {
            dir += 'Comptables/' + res[0].Id_Comptable;
            createFolder(dir);
            ipcRenderer.send('create-Comptable-Window', [res[0].Id_Comptable, connectionMode]);
            closeWindow();
        }
    } else {
        var res = await getClient(login, pass);
        if (res.length == 1) {
            dir += 'Clients/' + res[0].Id_Client;
            createFolder(dir);
            ipcRenderer.send('createClientWindow', [res[0].Id_Client, connectionMode]);
            closeWindow();
        }
    }
}
// 
function closeWindow() {
    remote.getCurrentWindow().close();
}
// 
function createFolder(name) {
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }
}
// 
function switcher() {
    var switches = document.getElementsByClassName('switches');
    var loginMode;
    switches[0].addEventListener('click', function () {
        if (switchIt(0, switches, 1))
            connectionMode = 'Comptable';
    });
    switches[1].addEventListener('click', function () {
        if (switchIt(1, switches, 0))
            connectionMode = 'Client';
    });
}

function switchIt(pos, swtchs, loc) {
    var ret = false;
    if (swtchs[pos].id == 'switchOff') {
        swtchs[pos].setAttribute('id', 'switchOn');
        swtchs[loc].setAttribute('id', 'switchOff');
        ret = true;
    }
    return ret;
}
// 
function showHidePassword() {
    var type = 'password';
    var fileName = 'show.png';
    document.getElementById('passShowHide').addEventListener('click', function () {
        if (type == 'password') {
            type = 'text';
            fileName = 'hide.png';
        } else {
            type = 'password';
            fileName = 'show.png';
        }
        document.getElementById('passShowHide').style = "background-image:url('../icons/" + fileName + "');";
        document.getElementById('passwordVal').setAttribute('type', type);
    });
}
// 
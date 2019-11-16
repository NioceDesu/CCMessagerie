const {
    remote,
    ipcRenderer
} = require('electron');
// 
window.onload = () => {
    loginButton();
    // 
    windowControls();

}
// 
function loginButton() {
    document.getElementById('loginBtn').addEventListener('click', function (e) {
        ipcRenderer.send('createLoginWindow');
    });
}
// 
function windowControls() {
    var btns = document.getElementsByClassName('actionIcons');
    // 
    btns[2].addEventListener('click', () => {
        remote.getCurrentWindow().close();
    });
    btns[1].addEventListener('click', () => {
        remote.getCurrentWindow().minimize();
    });
    btns[0].addEventListener('click', () => {
        remote.getCurrentWindow().reload();
    });
}
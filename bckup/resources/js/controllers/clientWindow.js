window.onload = () => {
    ipcRenderer.on('Client-Login', async (event, data) => {
        var currentUser = [2, 'Client'];
        if (data)
            currentUser = data;
        // 
        windowControls();
        // 
        initiateConnection(currentUser);
        // 
        setCurrentUser(currentUser[0], currentUser[1]);
        // 
        joinRoom(currentUser[0]);
        // 
        setClientAvatar(currentUser[0]);
        // 
        recoverMsgs(currentUser);
        // 
        sendMessageToComptable(currentUser);
        // 
        clientSettings(currentUser);

    });
}
// 
function windowControls() {
    var btns = document.getElementsByClassName('actionIcons');
    // 
    btns[2].addEventListener('click', () => {
        closeWindow();
    });
    btns[1].addEventListener('click', () => {
        minimizeWindow();
    });
    btns[0].addEventListener('click', () => {
        reloadWindow();
    });
}
//  
function sendMessageToComptable(client) {
    document.getElementById('msgInput').addEventListener('keyup', function (e) {
        if (e.code == 'Enter' || e.code == 'NumpadEnter') {
            sndMsg(client);
        }
    });
    document.getElementById('btnSendMsg').addEventListener('click', function () {
        sndMsg(client);
    });
}

async function sndMsg(client) {
    const msgVal = document.getElementById('msgInput');
    var date = new Date();
    if (msgVal.value != '') {
        var res = await getClientRows(client[0]);
        sendMessage(msgVal.value, client[0], date, client[0], client[1], res[0].Id_Comptable, 'text');
        // console.log([msgVal.value, client[0], date, client[0], client[1], res[0].Id_Comptable, 'text']);
        msgVal.value = '';
    } else
        alertMsg('warning', "Message can't be empty");

}
// 
async function recoverMsgs(client) {
    var res = await getClientRows(client[0]);
    res = await recoverMsgsFromDB(res[0].Id_Client, res[0].Id_Comptable);
    // console.log(res);
    res.forEach(element => {
        createMsgBub(element, client[1]);
    });
}
// 
async function clientSettings(client) {
    var lastSelectedOption = -1;
    const btns = document.getElementsByClassName('clientSettings');
    var clientData = await getClientRows(client[0]);
    for (let i = 0; i < btns.length; i++) {
        (function (index) {
            btns[i].onclick = async () => {
                var currPos = index;
                if (index != lastSelectedOption)
                    shrinkAndExpande('50px 250px auto', 'grid');
                else {
                    shrinkAndExpande('50px auto', 'none');
                    currPos = -1;
                }

                if (index == 0) {
                    const res = await getBasicClientColumns(clientData[0].Id_Client);
                    createDataVisualizer(clientData[0], res);
                } else if (index == 1) {
                    const res = await getBasicComptable(clientData[0].Id_Comptable);
                    // console.log(res);
                    createDataVisualizer(res[0][0], res[1]);
                } else {
                    createDataUpdateForm();
                    document.getElementsByClassName('formButton')[0].addEventListener('click', async function () {
                        var inputVals = document.getElementsByClassName('formDataInput');
                        if (inputVals[0].value == clientData[0].Pass_Client) {
                            if (inputVals[1].value == inputVals[2].value) {
                                var res = await updatePassword(clientData[0].Id_Client, inputVals[1].value);
                                if (res.affectedRows == 1)
                                    alertMsg('succes', 'Password updated with succes');
                                // console.log('YEP');
                                else
                                    alertMsg('error', 'Error while updating password');
                            } else
                                alertMsg('error', "The password and it's confirmation doesn't match");
                        } else
                            alertMsg('error', "Password doesn't match in the database");

                    });
                    document.getElementsByClassName('formButton')[1].addEventListener('click', () => {
                        var inputVals = document.getElementsByClassName('formDataInput');
                        for (let y = 0; y < inputVals.length; y++) {
                            inputVals[y].value = '';
                        }
                    });
                }
                lastSelectedOption = currPos;
            }
        })(i)
    }
}
// 
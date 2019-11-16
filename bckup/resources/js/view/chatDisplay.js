function createMsgBub(data, userType) {
    const leftAlign = ['msgContainerLeft', 'imgContainerLeft', 'msgTextLeft', 'dateMsgTextLeft'];
    const rightAlign = ['msgContainerRight', 'imgContainerRight', 'msgTextRight', 'dateMsgTextRight'];
    var msgAlign = rightAlign;
    if (data.senderType != userType)
        msgAlign = leftAlign;

    var d = new Date(data.dateMsg);
    d = d.getHours() + ':' + d.getMinutes() + ' - ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    var msgContainer = document.createElement('div');
    var imgContainer = document.createElement('div');
    var msgText = document.createElement('span');
    var dateText = document.createElement('span');
    // 
    msgContainer.setAttribute('class', msgAlign[0]);
    imgContainer.setAttribute('class', msgAlign[1]);
    msgText.setAttribute('class', msgAlign[2]);
    dateText.setAttribute('class', msgAlign[3]);
    // 
    var avatarImgDir = 'data/';
    if (data.senderType == 'Client') {
        if (ifFileExists('data/Clients/' + data.sender + '/avatar.png'))
            avatarImgDir += 'Clients/' + data.sender + '/avatar.png';
        else
            avatarImgDir += 'unAvatar.png';
    } else {
        if (ifFileExists('data/Comptables/' + data.sender + '/avatar.png'))
            avatarImgDir += 'Comptables/' + data.sender + '/avatar.png';
        else
            avatarImgDir += 'unAvatar.png';
    }
    imgContainer.style = "background-image:url('http://localhost:3000/" + avatarImgDir + "');";
    // 
    if (data.msgType != 'text') {
        msgText.setAttribute('class', msgAlign[2] + ' ' + 'msgTypeData');
        msgText.onclick = () => {
            var dir = 'data/Clients/' + data.Id_Client + '/' + data.msg;
            if (fs.existsSync(dir))
                downloadFile(dir);
            else {
                //error msg
            }


        }
    }
    // 
    // imgContainer.style = "background-image:url('../imgs/avatar.png');background-size: 50px";
    msgText.innerText = data.msg;
    dateText.innerText = d;
    // 
    msgContainer.appendChild(imgContainer);
    msgContainer.appendChild(msgText);
    msgContainer.appendChild(dateText);
    // 
    document.getElementById('msgArea').appendChild(msgContainer);
    // 
    scrollChatArea();
}
// 
function alertMsg(type, msg) {
    // 
    var box = document.createElement('div');
    var icon = document.createElement('img');
    var text = document.createElement('span');
    // 
    box.setAttribute('id', 'alertBoxContainer');
    icon.setAttribute('id', 'alertBoxIcon');
    text.setAttribute('id', 'alertBoxText');
    // 
    text.innerText = msg;
    icon.src = "../icons/" + type + ".png";
    box.style = "background-color:var(--" + type + ");box-shadow: 0px 1px 6px var(--" + type + ");";
    // 
    box.appendChild(icon);
    box.appendChild(text);
    // 
    document.getElementsByTagName('body')[0].appendChild(box);
    // 
    setTimeout(() => {
        document.getElementById('alertBoxContainer').style.height = '25px';
        setTimeout(() => {
            document.getElementById('alertBoxContainer').style.height = '0px';
            setTimeout(() => {
                document.getElementById('alertBoxContainer').remove();
            }, 1000);
        }, 2000);
    }, 100);
}
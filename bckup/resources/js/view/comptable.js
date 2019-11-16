async function displayImportedClient(array) {
    var clientContainer = document.createElement('div');
    var seperator = document.createElement('div');
    var selectedClient = document.createElement('div');
    var avatarFrame = document.createElement('div');
    var clientInfosContainer = document.createElement('div');
    var nomPrenomClient = document.createElement('span');
    var telClient = document.createElement('span');
    // 
    clientContainer.setAttribute('class', 'clientContainer');
    seperator.setAttribute('class', 'clientsSeperator');
    selectedClient.setAttribute('class', 'selectedClient');
    avatarFrame.setAttribute('class', 'avatarFrame');
    clientInfosContainer.setAttribute('class', 'clientInfosContainer');
    nomPrenomClient.setAttribute('class', 'nomPrenomClient');
    telClient.setAttribute('class', 'telClient');
    // 
    clientContainer.setAttribute('id', array.Id_Client);
    const dir = "data/Clients/" + array.Id_Client + "/avatar.png";
    // console.log(dir);
    if (!ifFileExists(dir))
        await fs.copySync('resources/imgs/unAvatar.png', 'data/Clients/' + array.Id_Client + '/avatar.png');
    avatarFrame.style = "background-image:url('http://localhost:3000/" + dir + "');";

    // 
    nomPrenomClient.innerText = array.Prenom_Client + ' ' + array.Nom_Client;
    telClient.innerText = array.Tel_Client;
    // 
    clientInfosContainer.appendChild(nomPrenomClient);
    clientInfosContainer.appendChild(telClient);
    // 
    clientContainer.appendChild(selectedClient);
    clientContainer.appendChild(avatarFrame);
    clientContainer.appendChild(clientInfosContainer);
    // 
    document.getElementById('clientsList').appendChild(clientContainer);
    document.getElementById('clientsList').appendChild(seperator);
    // 
    var dirName = 'data/Clients/' + array.Id_Client;
    createFolder(dirName);
    // 
    clients = document.getElementsByClassName('clientContainer');
}
// 
function setSelectedClient(pos) {
    for (let j = 0; j < clients.length; j++) {
        clients[j].firstChild.style.visibility = 'hidden';
    }
    clients[pos].firstChild.style.visibility = 'visible';
}
// 
function fillClientInfo(data) {
    document.getElementById('clientBigImage').style = 'background-image:none';
    // 
    const dir = "data/Clients/" + data.Id_Client + "/avatar.png";
    var avatarUrl;
    // console.log(dir);
    if (ifFileExists(dir))
        avatarUrl = "http://localhost:3000/" + dir;
    else
        avatarUrl = "http://localhost:3000/data/unAvatar.png";
    document.getElementById('uciImage').style = "background-image:url('" + avatarUrl + "');";
    document.getElementById('clientBigImage').style = "background-image:url('" + avatarUrl + "');";
    // 
    document.getElementById('nomClient').innerText = data.Nom_Client;
    document.getElementById('prenomClient').innerText = data.Prenom_Client;
    document.getElementById('telClient').innerText = data.Tel_Client;
    document.getElementsByClassName('infoText')[0].innerText = data.Email_Client;
    document.getElementsByClassName('infoText')[1].innerText = data.Fax_Client;
    document.getElementsByClassName('infoText')[2].innerText = data.Cin_Client;
    document.getElementsByClassName('infoText')[3].innerText = data.RaisonSociale_Client;
    document.getElementsByClassName('infoText')[4].innerText = data.FormeJuridique_Client;
    document.getElementsByClassName('infoText')[5].innerText = data.Adresse_Client;
    document.getElementsByClassName('infoText')[6].innerText = data.Login_Client;
    document.getElementsByClassName('infoText')[7].innerText = data.Pass_Client;
}
// 
function showSearchResults(array) {
    var clList = document.getElementsByClassName('clientContainer');
    for (let x = 0; x < clList.length; x++) {
        clList[x].style = 'display:none';
        clList[x].nextSibling.style = 'display:none';
        for (let y = 0; y < array.length; y++) {
            if (array[y].Id_Client == clList[x].id) {
                clList[x].style = 'display:grid';
                clList[x].nextSibling.style = 'display:block';
            }
        }
    }
}
//
function removeClientFromClientsList(pos, array) {
    array[pos].nextSibling.style = 'display:none';
    array[pos].style = 'display:none';
    document.getElementById('chatSection').style.display = 'none';
    firstRun = false;
    /**/
    // array[pos].nextSibling.remove();
    // array[pos].remove();
    // document.getElementById('chatSection').style.display = 'none';
    // firstRun = false;
}
// 
function createEditableInputs(val, idClient) {
    var newInput = ['span', 'infoText', 'nomClient', 'prenomClient', 'telClient'];
    var oldInput = ['infoTextEditor', 'nomClientEditor', 'prenomClientEditor', 'telClientEditor'];
    var res = false;
    if (!val) {
        newInput = ['input', 'infoTextEditor', 'nomClientEditor', 'prenomClientEditor', 'telClientEditor'];
        oldInput = ['infoText', 'nomClient', 'prenomClient', 'telClient'];
        res = true;
    }
    var textHolders = document.getElementsByClassName(oldInput[0]);
    var len = textHolders.length;

    uniqueEditing(newInput[0], newInput[2], oldInput[1], val);
    uniqueEditing(newInput[0], newInput[3], oldInput[2], val);
    uniqueEditing(newInput[0], newInput[4], oldInput[3], val);

    for (let i = 0; i < len; i++) {
        var textEditor = document.createElement(newInput[0]);
        textEditor.setAttribute('class', newInput[1]);
        if (!val)
            textEditor.value = textHolders[0].innerText;
        else
            showSelectedClientInfos(idClient);
        // textEditor.innerText = textHolders[0].value;

        textHolders[0].replaceWith(textEditor);
    }
    if (res) {
        var confirmModificationBtn = document.createElement('input');
        confirmModificationBtn.type = 'button';
        confirmModificationBtn.value = 'Modifier';
        confirmModificationBtn.setAttribute('id', 'confirmModificationBtn');
        document.getElementById('clientIndepthInfos').appendChild(confirmModificationBtn);
        document.getElementById('clientBigImage').addEventListener('click', updateClientImage);
        document.getElementById('clientBigImage').setAttribute('class', 'updateImageDisplayer');
        document.getElementById('modifyClient').style.backgroundColor = 'rgba(250, 70, 64, 0.15)';
        document.getElementById('modifyClient').style.borderRadius = '4px';
    } else {
        document.getElementById('confirmModificationBtn').remove();
        document.getElementById('clientBigImage').style.cursor = 'default';
        document.getElementById('clientBigImage').removeEventListener('click', updateClientImage);
        document.getElementById('clientBigImage').removeAttribute('class');
        document.getElementById('modifyClient').style.background = 'none';
    }
    return res;
}

function uniqueEditing(type, attr1, attr2, check) {
    var textEditor = document.createElement(type);
    textEditor.setAttribute('id', attr1);
    if (!check)
        textEditor.value = document.getElementById(attr2).innerText;
    // else
    //     textEditor.innerText = document.getElementById(attr2).value;
    document.getElementById(attr2).replaceWith(textEditor);
}
// 
function modifySelectedClientContainer(data, pos, array) {
    array[pos].lastChild.firstChild.innerText = data[1] + ' ' + data[0];
    array[pos].lastChild.lastChild.innerText = data[2];
}
// 
async function setComptableAvatar(comptableId) {
    const dir = 'data/Comptables/' + comptableId + '/avatar.png';
    if (!ifFileExists(dir))
        await fs.copySync('resources/imgs/unAvatar.png', dir);
    const styleValue = "background-image:url('http://localhost:3000/" + dir + "');";
    document.getElementById('comptableAvatar').style = styleValue;
    document.getElementById('comptableImageContainer').style = styleValue;
}
// 
function showInvalidFields(inputs, inputsValidation) {
    for (let i = 0; i < inputs.length; i++) {
        let style = "";
        if (!inputsValidation[i]) {
            style = "box-shadow: 0px 0px 2px var(--error);";
            onHoverTollTip(inputs[i]);
        }
        else {
            style = "box-shadow: none;";
            inputs[i].onmouseover = () => { }
            inputs[i].onmouseout = () => { }
        }
        inputs[i].style = style;
    }
}
function onHoverTollTip(inp) {
    // console.log(inp.previousSibling.previousSibling);
    let pos = '';
    console.log(inp.previousSibling.previousSibling.innerText);
    const regexErrors = { "nom": "Field can't have digits or speacial characters", "cin": "Field should be 8 characters long only accepting digits and uppercase letters", "email": "format Email: example@domain.com", "tel": "Telephone should be 10 digits long starting with eather 06 or 07", "fax": "Fax should be 10 digits long starting with 05", "raison sociale": "Field should be 40 character long max", "forme juridique": "Field should be uppercase with 4 characters long", "adresse": "Adresse should start with appartment number", "identifiant": "Field only accepts digits and words with 5 characters min and 15 max", "mot de pass": "Field only accepts digits and words with 9 characters min and 25 max" };
    for (let j = 0; j < Object.keys(regexErrors).length; j++) {
        let title = inp.previousSibling.previousSibling.innerText.toLowerCase();
        // console.log(title.search(Object.keys(regexErrors)[j]));
        if (title.search(Object.keys(regexErrors)[j]) != -1)
            pos = Object.keys(regexErrors)[j];
    }
    if (pos != '') {
        inp.onmouseover = () => {
            let hoverOver = document.createElement('div');
            hoverOver.appendChild(document.createTextNode(regexErrors[pos]));
            hoverOver.setAttribute('class', 'tooltip');
            hoverOver.style = 'top:' + inp.offsetTop + 'px;left:' + (170 + inp.offsetLeft + 10) + 'px';
            if (inp.parentElement.parentElement.parentElement.id == 'rightArea' || inp.parentElement.parentElement.parentElement.parentElement.id == 'rightArea')
                hoverOver.style = 'top:' + inp.offsetTop + 'px;left:' + (inp.offsetLeft - 250) + 'px';

            inp.parentElement.appendChild(hoverOver);
        }
        inp.onmouseout = () => {
            inp.parentElement.removeChild(inp.parentElement.lastElementChild);
        }
    }
}

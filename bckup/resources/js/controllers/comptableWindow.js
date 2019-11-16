// const currentUser = [1, 'Comptable'];
// 
var clients, firstRun = false,
    editing = false;
window.onload = () => {
    ipcRenderer.on('Comptable-Login', async (event, data) => {
        console.log(data);
        const currentUser = data;
        console.log(currentUser);
        // 
        windowControls();
        // 
        initiateConnection(currentUser);
        // 
        setCurrentUser(currentUser[0], currentUser[1]);
        // 
        setComptableAvatar(currentUser[0]);
        // 
        await importClients(currentUser[0]);
        // 
        clientOnClick(currentUser);
        // 
        sendMessageToSelectedClient(currentUser);
        // 
        searchClient();
        // 
        deleteSelectedClient();
        // 
        modifyClient();
        // 
        addClient(currentUser);
        // 
        openSettings(currentUser[0]);
        // 
        sndFilePreview();
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
async function importClients(idComptable) {
    var res = await getClientsByComptableId(idComptable);
    res.forEach(element => {
        displayImportedClient(element);
    });
}
// 
async function clientOnClick(currentUser) {

    // await importClients(currentUser[0]);
    if (clients != undefined) {
        for (let i = 0; i < clients.length; i++) {
            (function (index) {
                clients[i].onclick = () => {
                    //only acces next client when the current one is not being edited
                    if (!editing) {
                        if (!firstRun) {
                            document.getElementById('chatSection').style.display = 'grid';
                            firstRun = true;
                        }
                        // 
                        joinRoom(clients[index].id);
                        // 
                        setSelectedClient(index);
                        // 
                        showSelectedClientInfos(clients[index].id);
                        // 
                        clearMsgsContainer();
                        // 
                        recoverMsgs(clients[index].id, currentUser[0], currentUser);
                    } else
                        alertMsg('warning', 'Stop editing first!');
                }
            })(i)
        }
    }
}
// // 
function sendMessageToSelectedClient(currentUser) {
    document.getElementById('msgInput').addEventListener('keyup', function (e) {
        if (e.code == 'Enter' || e.code == 'NumpadEnter') {
            sndMsg(currentUser);
            if (document.getElementById('upFile').files.length > 0)
                sndFile(currentUser);
        }
    });
    document.getElementById('btnSendMsg').addEventListener('click', function () {
        sndMsg(currentUser);
        if (document.getElementById('upFile').files.length > 0)
            sndFile(currentUser);
    });
}

function sndMsg(currentUser) {
    var containersList = document.getElementsByClassName('clientContainer');
    var pos = getSelectedClient(containersList);
    const msgVal = document.getElementById('msgInput');
    var date = new Date();
    if (msgVal.value != '') {
        sendMessage(msgVal.value, containersList[pos].id, date, currentUser[0], currentUser[1], currentUser[0], 'text');
        msgVal.value = '';
    } else
        alertMsg('warning', "Message can't be empty");
}

function sndFile(currentUser) {
    var containersList = document.getElementsByClassName('clientContainer');
    var pos = getSelectedClient(containersList);
    var date = new Date();
    sendFile(document.getElementById('upFile'), containersList[pos].id, date, currentUser[0], currentUser[1], currentUser[0]);
    document.getElementById('upFilePreview').innerText = '';
}

function getSelectedClient(array) {
    for (let y = 0; y < array.length; y++) {
        const element = array[y];
        if (element.firstChild.style.visibility == 'visible') {
            return y;
        }
    }
}
// 
async function showSelectedClientInfos(clientId) {
    var res = await getClientData(clientId);
    fillClientInfo(res[0]);
}
// 
function clearMsgsContainer() {
    document.getElementById('msgArea').innerHTML = '';
}
// 
async function recoverMsgs(idClient, idComptable, currentUser) {
    var res = await recoverMsgsFromDB(idClient, idComptable);
    res.forEach(element => {
        createMsgBub(element, currentUser[1]);
    });
}
// 
function searchClient() {
    var srchInput = document.getElementById('searchInput');
    srchInput.addEventListener('input', async function (e) {
        var res = await getClientsBySrchVal(srchInput.value);
        showSearchResults(res);
        // console.log(res);
    });
}
// 
function deleteSelectedClient() {
    document.getElementById('deleteClient').addEventListener('click', function () {
        if (!editing) {
            document.getElementById('confirmAction').style.display = 'grid';
            var containersList = document.getElementsByClassName('clientContainer');
            document.getElementsByClassName('caButton')[0].addEventListener('click', async () => {
                var pos = getSelectedClient(containersList);
                var res = await deleteClient(containersList[pos].id);
                if (res.affectedRows == 1) {
                    deleteMessages(containersList[pos].id);
                    // 
                    alertMsg('succes', 'Selected client has been deleted');
                    // console.log('client with the Id = ' + containersList[pos].id + ' was deleted');
                    removeClientFromClientsList(pos, containersList);
                    // 
                    deleteFolder('data/Clients/' + containersList[pos].id);
                    // 
                    clients = document.getElementsByClassName('clientContainer');
                    // 
                    document.getElementById('confirmAction').style.display = 'none';
                } else
                    alertMsg('error', 'Error while deleting Client');

            });
            document.getElementsByClassName('caButton')[1].addEventListener('click', () => {
                document.getElementById('confirmAction').style.display = 'none';
            });
        } else
            alertMsg('warning', 'Stop editing first!');
    });
}
// 
function modifyClient() {
    document.getElementById('modifyClient').addEventListener('click', function () {
        var clientsList = document.getElementsByClassName('clientContainer');
        const currentClientId = clientsList[getSelectedClient(clientsList)].id;
        editing = createEditableInputs(editing, currentClientId);
        if (editing) {
            document.getElementById('confirmModificationBtn').addEventListener('click', async function () {
                // console.log('huh');
                var newValsInputs = document.getElementsByClassName('infoTextEditor');
                var newVals = [], newInputsArray = [];
                // 
                newInputsArray.push(document.getElementById('nomClientEditor'));
                newInputsArray.push(document.getElementById('prenomClientEditor'));
                newInputsArray.push(document.getElementById('telClientEditor'));
                // 
                newVals.push(document.getElementById('nomClientEditor').value);
                newVals.push(document.getElementById('prenomClientEditor').value);
                newVals.push(document.getElementById('telClientEditor').value);
                for (let i = 0; i < newValsInputs.length; i++) {
                    newVals.push(newValsInputs[i].value);
                    newInputsArray.push(newValsInputs[i]);
                }
                newVals.push(currentClientId);
                // 
                console.log(document.getElementsByClassName('infoTitle'));
                const validatedFields = validateClientFields(newVals, document.getElementsByClassName('infoTitle'));
                // 
                let lastField = true;
                try {
                    validatedFields.forEach(element => {
                        if (element != lastField) {
                            lastField = false;
                            throw 'One field or more was not written properly ';
                        }
                    });
                } catch (e) {
                    alertMsg('error', e);
                }
                console.log([newValsInputs, newVals, document.getElementsByClassName('infoTitle')]);

                if (lastField) {
                    var res = await updateClientData(newVals);
                    if (res.affectedRows == 1) {
                        alertMsg('succes', "Client infos has been updated");
                        // console.log('succes');
                        modifySelectedClientContainer(newVals, getSelectedClient(clientsList), clientsList);
                        editing = createEditableInputs(true, currentClientId);
                    } else
                        alertMsg('error', "Client infos couldn't be updated");
                }
                else {
                    console.log(validatedFields);
                    showInvalidFields(newInputsArray, validatedFields);
                }
            });
        }
    });

}
// 
function addClient(currentUser) {
    document.getElementById('addClient').addEventListener('click', function () {
        if (!editing) {
            document.getElementById('addClientContainer').style.display = 'grid';
            const addClientInputs = document.getElementsByClassName('addClientInput');
            document.getElementsByClassName('addClientBtn')[0].addEventListener('click', async function () {
                var addClientValues = [];
                for (let i = 0; i < addClientInputs.length; i++) {
                    addClientValues.push(addClientInputs[i].value);
                }
                addClientValues.push(currentUser[0]);
                // 
                const validatedFields = validateClientFields(addClientValues, document.getElementsByClassName('addClientInputTitle'));
                // 
                let lastField = true;
                try {
                    validatedFields.forEach(element => {
                        if (element != lastField) {
                            lastField = false;
                            throw 'One field or more was not written properly ';
                        }
                    });
                } catch (e) {
                    alertMsg('error', e);
                }
                // 
                if (lastField) {
                    var res = await addClientInDB(addClientValues);
                    if (res.affectedRows == 1) {
                        alertMsg('succes', 'Client added with succes');
                        setTimeout(() => {
                            reloadWindow();
                        }, 1500);
                    } else
                        alertMsg('error', 'An error while adding Client');
                }
                else
                    showInvalidFields(addClientInputs, validatedFields);
            });
            document.getElementsByClassName('addClientBtn')[1].addEventListener('click', function () {
                for (let i = 0; i < addClientInputs.length; i++) {
                    addClientInputs[i].value = '';
                    addClientInputs[i].style.boxShadow = 'none';
                    addClientInputs[i].onmouseover = () => { }
                    addClientInputs[i].onmouseout = () => { }
                }
                document.getElementById('addClientContainer').style.display = 'none';
            });
        } else
            alertMsg('warning', 'Stop editing first!');
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
function createFolder(name) {
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }
}

function deleteFolder(name) {
    if (fs.existsSync(name)) {
        // fs.rmdirSync(name);
        fs.removeSync(name);
    }
}
// 
// 
// 
// 
// 
// 
function createClient() {
    ipcRenderer.send('createClientWindow');
}
// 
function openSettings(comptableId) {
    document.getElementById('settingsOnClick').addEventListener('click', () => {
        const rtut = { "nom": 'valar', "prob": 'valar', "rahib": 'valar' };
        console.log('SDF'.toLowerCase());
        console.log(Object.keys(rtut)[1]);
        console.log('prenom'.search(Object.keys(rtut)[0]));
        console.log(rtut);
        if (!editing) {
            var container = document.getElementById('settingsContainer');
            container.style.display = 'grid';
            // 
            let imageSelected = false;
            // 
            var fileInput = document.getElementById('ucUploadImage');
            fileInput.addEventListener('change', () => {
                if (fileInput.files.length == 1) {
                    var inputSelectedImage = window.URL.createObjectURL(fileInput.files[0]);
                    document.getElementById('comptableImageContainer').style = "background-image: url('" + inputSelectedImage + "');";
                    imageSelected = true;
                } else
                    imageSelected = false;
            });

            document.getElementById('ucChangeImage').addEventListener('click', () => {
                if (imageSelected) {
                    var dir = 'data/Comptables/' + comptableId;
                    uploadImage(document.getElementById('ucUploadImage'), dir);
                }
            });
            // 
            const inputs = document.getElementsByClassName('ucInput');
            var btns = document.getElementsByClassName('ucBtns');
            btns[0].addEventListener('click', async () => {
                var vals = [];
                for (let i = 0; i < inputs.length; i++) {
                    vals.push(inputs[i].value);
                }
                vals.push(comptableId);
                console.log([vals, document.getElementsByClassName('ucTitle')]);
                const validatedFields = validateClientFields(vals, document.getElementsByClassName('ucTitle '));
                // 
                let lastField = true;
                try {
                    validatedFields.forEach(element => {
                        if (element != lastField) {
                            lastField = false;
                            throw 'One field or more was not written properly ';
                        }
                    });
                } catch (e) {
                    alertMsg('error', e);
                }
                // 
                if (lastField) {
                    var res = await updateComptableData(vals);
                    if (res.affectedRows == 1)
                        alertMsg("succes", "Information updated with succes");
                    else
                        alertMsg('error', 'An error happend');
                }
                else
                    showInvalidFields(inputs, validatedFields);
            });
            btns[1].addEventListener('click', async () => {
                fileInput.value = '';
                document.getElementById('comptableImageContainer').style.backgroundImage = document.getElementById('comptableAvatar').style.backgroundImage;
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = '';
                    inputs[i].style.boxShadow = 'none';
                    inputs[i].onmouseover = () => { }
                    inputs[i].onmouseout = () => { }
                }
                container.style.display = 'none';
            });
        } else
            alertMsg('warning', 'Stop editing first!');
    });
}
// 
function updateClientImage() {
    var clientsList = document.getElementsByClassName('clientContainer');
    const currentClientId = clientsList[getSelectedClient(clientsList)].id;
    // console.log('cc');
    document.getElementById('updateClientImageContainer').style.display = 'grid';
    var imageSelected;
    var fileInput = document.getElementById('uciInput');
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length == 1) {
            var inputSelectedImage = window.URL.createObjectURL(fileInput.files[0]);
            document.getElementById('uciImage').style = "background-image: url('" + inputSelectedImage + "');";
            imageSelected = true;
        } else
            imageSelected = false;
    });
    document.getElementsByClassName('uciButton')[0].addEventListener('click', () => {
        if (imageSelected) {
            var dir = 'data/Clients/' + currentClientId;
            uploadImage(document.getElementById('uciInput'), dir);
        }
    });
    document.getElementsByClassName('uciButton')[1].addEventListener('click', () => {
        fileInput.value = '';
        document.getElementById('uciImage').style.backgroundImage = document.getElementById('clientBigImage').style.backgroundImage;
        document.getElementById('updateClientImageContainer').style.display = 'none';
    });
}
// 
function sndFilePreview() {
    var file = document.getElementById('upFile');
    var filePreview = document.getElementById('upFilePreview');
    file.addEventListener('change', () => {
        if (file.files.length != 0)
            filePreview.innerText = file.files[0].name;
        else
            filePreview.innerText = '';
    });
}
//
// 
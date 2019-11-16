function createDataVisualizer(rows, columns) {
    // console.log(rows);
    // 
    document.getElementById('userDataContainer').innerHTML = '';
    // 
    var basicContainer = document.createElement('div');
    var advancedContainer = document.createElement('div');
    var imgContainer = document.createElement('div');
    var nomPrenomContainer = document.createElement('div');
    var nom = document.createElement('span');
    var prenom = document.createElement('span');
    // 
    basicContainer.setAttribute('class', 'userDataBasic');
    advancedContainer.setAttribute('class', 'userDataAdvanced');
    imgContainer.setAttribute('class', 'userDataImage');
    nomPrenomContainer.setAttribute('class', 'userDataNPContainer');
    nom.setAttribute('class', 'userDataNom');
    prenom.setAttribute('class', 'userDataPrenom');
    // 
    columns.forEach(element => {
        if (element.name.search('Id')) {
            if (element.name.search('Nom')) {
                if (element.name.search('Prenom')) {
                    var dataContainer = document.createElement('div');
                    var dataTitle = document.createElement('span');
                    var dataText = document.createElement('span');
                    // 
                    dataContainer.setAttribute('class', 'userData');
                    dataTitle.setAttribute('class', 'userDataTitle');
                    dataText.setAttribute('class', 'userDataText');
                    // 
                    var ttle = element.name.replace('_', ' ') + ' :';
                    dataTitle.innerText = ttle;
                    dataText.innerText = rows[element.name];
                    // 
                    dataContainer.appendChild(dataTitle);
                    dataContainer.appendChild(dataText);
                    advancedContainer.appendChild(dataContainer);
                } else
                    prenom.innerText = rows[element.name];
            } else
                nom.innerText = rows[element.name];
        }
    });
    // 
    var user = 'Clients/';
    if (columns[0].name == 'Id_Comptable')
        user = 'Comptables/';
    var dir = 'data/' + user + rows[columns[0].name] + '/avatar.png';
    const imgStyle = expandedAvatar(dir);
    imgContainer.style = imgStyle;
    // 
    nomPrenomContainer.appendChild(nom);
    nomPrenomContainer.appendChild(prenom);
    // 
    basicContainer.appendChild(imgContainer);
    basicContainer.appendChild(nomPrenomContainer);
    // 
    document.getElementById('userDataContainer').appendChild(basicContainer);
    document.getElementById('userDataContainer').appendChild(advancedContainer);
}
// 
function createDataUpdateForm() {
    document.getElementById('userDataContainer').innerHTML = '';
    // 
    var titleContainer = document.createElement('div');
    var formContainer = document.createElement('div');
    var btnsContainer = document.createElement('div');
    var title = document.createElement('span');
    var button = document.createElement('input');
    // 
    titleContainer.setAttribute('id', 'titleContainer');
    btnsContainer.setAttribute('id', 'btnsContainer');
    formContainer.setAttribute('id', 'formContainer');
    title.setAttribute('id', 'formTitle');
    // 
    title.innerText = 'Mettre à jour mot de passe :';
    // 
    const titleVals = ['Ancien mot de passe :', 'Nouveau MP :', 'Confirmer le MP :'];
    for (let i = 0; i < titleVals.length; i++) {
        var formDataContainer = document.createElement('div');
        var formTitle = document.createElement('span');
        var formInput = document.createElement('input');
        // 
        formDataContainer.setAttribute('class', 'formDataContainer');
        formInput.setAttribute('class', 'formDataInput');
        formTitle.setAttribute('class', 'formDataTitle');
        // 
        formTitle.innerText = titleVals[i];
        formInput.type = 'password';
        // 
        formDataContainer.appendChild(formTitle);
        formDataContainer.appendChild(formInput);
        // 
        formContainer.appendChild(formDataContainer);
    }
    // 
    button.type = 'button';
    button.value = 'Valider';
    button.setAttribute('class', 'formButton');
    btnsContainer.appendChild(button);
    button = document.createElement('input');
    button.type = 'button';
    button.value = 'Anuller';
    button.setAttribute('class', 'formButton');
    btnsContainer.appendChild(button);
    // 
    formContainer.appendChild(btnsContainer);
    // 
    titleContainer.appendChild(title);
    // 
    document.getElementById('userDataContainer').appendChild(titleContainer);
    document.getElementById('userDataContainer').appendChild(formContainer);
}
// 
function shrinkAndExpande(style_1, style_2) {
    document.getElementById('bodyC').style.gridTemplateColumns = style_1;
    document.getElementById('infosHolder').style.display = style_2;
}
// 
function setClientAvatar(clientId) {
    const dir = 'data/Clients/' + clientId + '/avatar.png';
    if (ifFileExists(dir)) {
        document.getElementById('clientAvatar').style = "background-image:url('http://localhost:3000/" + dir + "');";
    }
}
// 
function expandedAvatar(dir) {
    var ret;
    if (ifFileExists(dir)) {
        ret = "background-image:url('http://localhost:3000/" + dir + "');";
    }
    return ret;
}
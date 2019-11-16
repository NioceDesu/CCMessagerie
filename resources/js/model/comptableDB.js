// 
async function getClientsByComptableId(id) {
    try {
        var req = 'select * from Client where Id_Comptable = ?',
            cnx = await connect(),
            res = await cnx.query(req, id);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function getClientData(clientId) {
    try {
        var req = 'select * from Client where Id_Client = ?',
            cnx = await connect(),
            res = await cnx.query(req, clientId);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function getClientsBySrchVal(val) {
    try {
        var req = "select Id_Client from Client where (Nom_Client like '%" + val + "%' ||Prenom_Client like '%" + val + "%')",
            cnx = await connect(),
            res = await cnx.query(req);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function deleteClient(clientId) {
    try {
        var req = 'delete from Client where Id_Client = ?',
            cnx = await connect(),
            res = await cnx.query(req, clientId);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function deleteMessages(clientId) {
    try {
        var req = 'delete from Messages where Id_Client = ?',
            cnx = await connect(),
            res = await cnx.query(req, clientId);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function updateClientData(data) {
    try {
        var req = 'update Client set Nom_Client = ?,Prenom_Client = ?,Tel_Client = ?,Email_Client = ?,Fax_Client = ?,Cin_Client = ?,RaisonSociale_Client = ?,FormeJuridique_Client = ?,Adresse_Client = ?,Login_Client = ?,Pass_Client = ? where Id_Client = ?',
            cnx = await connect(),
            res = await cnx.query(req, data);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function addClientInDB(array) {
    try {
        var req = 'insert into Client(Nom_Client,Prenom_Client,Cin_Client,Email_Client,Tel_Client,Fax_Client,RaisonSociale_Client,FormeJuridique_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values(?,?,?,?,?,?,?,?,?,?,?,?)',
            cnx = await connect(),
            res = await cnx.query(req, array);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function updateComptableData(array) {
    try {
        var req = 'update Comptable set Tel_Comptable = ?,Fax_Comptable = ?,Email_Comptable = ?,Adresse_Comptable = ?,Login_Comptable = ?,Pass_Comptable = ? where Id_Comptable = ?',
            cnx = await connect(),
            res = await cnx.query(req, array);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
async function getClient(clientId) {
    try {
        var req = 'select * from Client where Id_Client = ?',
            cnx = await connect(),
            res = await cnx.query(req, clientId);
        cnx.release();
        return res;
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function getBasicClient(clientId) {
    try {
        var req = 'select * from RefinedClient where Id_Client = ?',
            cnx = await connect(),
            res = await cnx.query(req, clientId);
        cnx.release();
        return res;
    } catch (err) {
        alertMsg('error', err);
    }
}
async function getBasicComptable(comptableId) {
    try {
        var req = 'select * from RefinedComptable where Id_Comptable = ?',
            cnx = await connect(),
            res = await cnx.query(req, comptableId);
        cnx.release();
        return res;
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function getComptable(comptableId) {
    try {
        var req = 'select * from Comptable where Id_comptable = ?',
            cnx = await connect(),
            res = await cnx.query(req, comptableId);
        cnx.release();
        return res;
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function updatePassword(clientId, clientPass) {
    // console.log([clientId, clientPass]);
    try {
        var req = 'update Client set Pass_Client = ? where Id_Client = ?',
            cnx = await connect(),
            res = await cnx.query(req, [clientPass, clientId]);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
// 
async function getClientRows(clientId) {
    var res = await getClient(clientId);
    return res[0];
}
// async function getClientColumns(clientId) {
//     var res = await getClient(clientId);
//     return res[1];
// }
// 
// async function getBasicClientRows(clientId) {
//     var res = await getBasicClient(clientId);
//     return res[0];
// }
async function getBasicClientColumns(clientId) {
    var res = await getBasicClient(clientId);
    return res[1];
}
// 
// async function getBasicComptableRows(comptableId) {
//     var res = await getBasicComptable(comptableId);
//     return res[0];
// }
// async function getBasicComptableColumns(comptableId) {
//     var res = await getBasicComptable(comptableId);
//     return res[1];
// }
// // 
// async function getComptableRows(comptableId) {
//     var res = await getComptable(comptableId);
//     return res[0];
// }
// async function getComptableColumns(comptableId) {
//     var res = await getComptable(comptableId);
//     return res[1];
// }
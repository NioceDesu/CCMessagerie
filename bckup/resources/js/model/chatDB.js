const mysql = require('mysql2/promise');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const connect = () => {
    return pool.getConnection();
}
// 
async function saveMsgInDB(data) {
    try {
        var req = 'insert into Messages values(?,?,?,?,?,?,?)',
            cnx = await connect(),
            res = await cnx.query(req, data);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
// 
async function recoverMsgsFromDB(idClient, idComptable) {
    try {
        var req = 'select * from Messages where Id_Comptable = ? and Id_Client = ?',
            cnx = await connect(),
            res = await cnx.query(req, [idComptable, idClient]);
        cnx.release();
        return res[0];
    } catch (err) {
        alertMsg('error', err);
    }
}
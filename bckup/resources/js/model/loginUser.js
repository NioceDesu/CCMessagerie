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
async function getComptable(login, pass) {
    var req = 'select Id_Comptable from Comptable where Login_Comptable = ? and Pass_Comptable = ?',
        cnx = await connect(),
        res = await cnx.query(req, [login, pass]);
    cnx.release();
    return res[0];
}
//
async function getClient(login, pass) {
    var req = 'select Id_Client from Client where Login_Client = ? and Pass_Client = ?',
        cnx = await connect(),
        res = await cnx.query(req, [login, pass]);
    cnx.release();
    return res[0];
}
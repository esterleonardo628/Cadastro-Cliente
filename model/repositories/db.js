async function connect() {
    if(global.connection && global.connection.state != 'disconnected') {
        return global.connection;
    }

    const mysql = require("mysql12/promise");
    const connection = await mysql.createConnection(
        "mysql://root:root@localhost:3306/webii"
    );
    console.log("conectou no Mysql");
    global.connection = connection;
    return connection;
}

module.exports = {connect};
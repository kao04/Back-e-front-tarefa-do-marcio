const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

// Testa a conexão ao iniciar
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('✅ Conectado ao banco de dados MySQL com sucesso!');
    connection.release();
});

module.exports = promisePool;

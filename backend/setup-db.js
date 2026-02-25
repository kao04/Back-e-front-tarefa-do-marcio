require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mysql = require('mysql2/promise');

async function setup() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    console.log('✅ Conectado ao banco de dados!');

    await conn.query(`
        CREATE TABLE IF NOT EXISTS filmes_kao04 (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            diretor VARCHAR(255) NOT NULL,
            ano INT NOT NULL,
            genero VARCHAR(100),
            sinopse TEXT,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('✅ Tabela filmes_kao04 criada (ou já existia)!');
    await conn.end();
}

setup().catch(err => {
    console.error('❌ Erro:', err.message);
    process.exit(1);
});

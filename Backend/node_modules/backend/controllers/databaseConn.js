const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "123",
    database: "SmartPath" // Corregido el nombre
});

// Conexión única (sin pool)
client.connect((err) => {
    if (err) {
        console.error('❌ Error de conexión:', err.message);
    } else {
        console.log('✅ Conexión exitosa a PostgreSQL');
    }
});

module.exports = client;
const client = require('./databaseConn');

// Obtener todos los paquetes
exports.getAllPaquetes = (req, res) => {
    client.query('SELECT * FROM paquetes', (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            console.log('📡 Datos enviados desde backend:', result.rows); // 🔍 Depuración
            res.json(result.rows);
        }
    });
};

// Crear nuevo paquete
exports.createPaquete = (req, res) => {
    const { descripcion, destinatario, latitud, longitud, tamano } = req.body;
    
    client.query(
        'INSERT INTO paquetes (descripcion, destinatario, latitud, longitud, tamano) VALUES ($1, $2, $3, $4, $5)',
        [descripcion, destinatario, latitud, longitud, tamano],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(201);
            }
        }
    );
};

// Actualizar paquete
exports.updatePaquete = (req, res) => {
    console.log('📥 Datos recibidos para actualizar:', req.body); // 🔍 Depuración

    const rastreo = req.params.rastreo;
    const { descripcion, destinatario, latitud, longitud, tamano } = req.body;

    client.query(
        `UPDATE paquetes 
        SET descripcion = $1, destinatario = $2, latitud = $3, longitud = $4, tamano = $5 
        WHERE rastreo = $6`,
        [descripcion, destinatario, latitud, longitud, tamano, rastreo],
        (err) => {
            if (err) {
                console.error('❌ Error al actualizar en la base de datos:', err);
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        }
    );
};

// Eliminar paquete
exports.deletePaquete = (req, res) => {
    const rastreo = req.params.rastreo;
    
    client.query(
        'DELETE FROM paquetes WHERE rastreo = $1',
        [rastreo],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        }
    );
};

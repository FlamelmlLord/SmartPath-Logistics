const client = require('./databaseConn');

exports.getAllPaquetes = (req, res) => {
    client.query('SELECT * FROM paquetes', (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result.rows);
        }
    });
};

exports.createPaquete = (req, res) => {
    const { descripcion, latitud, longitud, tamaño } = req.body;
    
    client.query(
        'INSERT INTO paquetes (descripcion, latitud, longitud, tamaño) VALUES ($1, $2, $3, $4)',
        [descripcion, latitud, longitud, tamaño],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(201);
            }
        }
    );
};

exports.updatePaquete = (req, res) => {
    const rastreo = req.params.rastreo;
    const { descripcion, latitud, longitud, tamaño } = req.body;
    
    client.query(
        `UPDATE paquetes 
        SET descripcion = $1, latitud = $2, longitud = $3, tamaño = $4 
        WHERE rastreo = $5`,
        [descripcion, latitud, longitud, tamaño, rastreo],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        }
    );
};

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
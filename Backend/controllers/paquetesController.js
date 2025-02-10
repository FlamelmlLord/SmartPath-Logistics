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
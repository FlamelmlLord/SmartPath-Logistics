const client = require('./databaseConn');

exports.getAllVehiculos = (req, res) => {
    client.query('SELECT * FROM vehiculos', (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result.rows);
        }
    });
};

exports.createVehiculo = (req, res) => {
    const { placa, color, modelo, marca, capacidad_carga } = req.body;
    
    client.query(
        'INSERT INTO vehiculos VALUES ($1, $2, $3, $4, $5)',
        [placa, color, modelo, marca, capacidad_carga],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(201);
            }
        }
    );
};

// Añadir métodos update y delete siguiendo el mismo patrón
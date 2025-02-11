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

exports.updateVehiculo = (req, res) => {
    const placa = req.params.placa;
    const { color, modelo, marca, capacidad_carga } = req.body;
    
    client.query(
        `UPDATE vehiculos 
        SET color = $1, modelo = $2, marca = $3, capacidad_carga = $4 
        WHERE placa = $5`,
        [color, modelo, marca, capacidad_carga, placa],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        }
    );
};

exports.deleteVehiculo = (req, res) => {
    const placa = req.params.placa;
    
    client.query(
        'DELETE FROM vehiculos WHERE placa = $1',
        [placa],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        }
    );
};
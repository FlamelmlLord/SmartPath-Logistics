const client = require('./databaseConn');

exports.getAllConductores = (req, res) => {
    client.query('SELECT * FROM conductores', (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result.rows);
        }
    });
};

exports.createConductor = (req, res) => {
    const { documento, nombre, apellido, telefono, correo_electronico, licencia } = req.body;
    
    client.query(
        'INSERT INTO conductores VALUES ($1, $2, $3, $4, $5, $6)',
        [documento, nombre, apellido, telefono, correo_electronico, licencia],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(201);
            }
        }
    );
};
const client = require('./databaseConn');

exports.getAllRutas = (req, res) => {
    client.query('SELECT * FROM rutas', (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result.rows);
        }
    });
};

exports.createRuta = (req, res) => {
    const { v_placa, c_documento, fecha_despacho } = req.body;
    client.query(
    'INSERT INTO rutas (v_placa, c_documento, fecha_despacho) VALUES ($1, $2, $3) RETURNING id',
    [v_placa, c_documento, fecha_despacho],
    (err, result) => {
        if (err) {
        res.status(500).send(err.message);
        } else {
        res.status(201).json({ id: result.rows[0].id });
        }
        }
    );
};

exports.addPaqueteToRuta = (req, res) => {
    const { r_id, p_rastreo } = req.body;
    
    client.query(
        'INSERT INTO ruta_paquetes VALUES ($1, $2)',
        [r_id, p_rastreo],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(201);
            }
        }
    );
};

exports.deleteRuta = (req, res) => {
    const id = req.params.id;
    client.query(
        'DELETE FROM rutas WHERE id = $1',
        [id],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        }
    );
};
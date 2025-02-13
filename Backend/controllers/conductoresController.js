const client = require('./databaseConn');

//_____________________________________________________________________
exports.getAllConductoresForSelect = (req, res) => {
const query = 'SELECT documento, nombre, apellido FROM conductores';
client.query(query, (err, result) => {
    if (err) {
    res.status(500).send(err.message);
    } else {
      // Por cada fila se crea un objeto con "value" y "label"
        const conductores = result.rows.map(row => ({
        value: row.documento.toString(), // Convierte a string si es necesario
        label: `${row.documento} ${row.nombre} ${row.apellido}`
        }));
        res.json(conductores);
    }
    });
};
//_____________________________________________________________________________

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

exports.updateConductor = (req, res) => {
    const documento = req.params.documento;
    const { nombre, apellido, telefono, correo_electronico, licencia } = req.body;
    
    client.query(
        `UPDATE conductores 
        SET nombre = $1, apellido = $2, telefono = $3, 
            correo_electronico = $4, licencia = $5 
        WHERE documento = $6`,
        [nombre, apellido, telefono, correo_electronico, licencia, documento],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        }
    );
};

exports.deleteConductor = (req, res) => {
    const documento = req.params.documento;
    client.query(
        'DELETE FROM conductores WHERE documento = $1',
        [documento],
        (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        }
    );
};
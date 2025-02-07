const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'database', 'ubicaciones.json');

const obtener_ubicaciones = (req, res) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const ubicaciones = JSON.parse(data);
        res.json(ubicaciones);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error al obtener las ubicaciones' });
    }
};

module.exports = {
    obtener_ubicaciones
};
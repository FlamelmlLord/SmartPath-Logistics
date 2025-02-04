const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'database', 'init.json');

const crear_vehiculo = (req, res) => {
    try {
        console.log("Guardar Vehículo");
        // crea vehiculo
        const nuevoVehiculo = {
            placa: req.body.placa,
            modelo: req.body.modelo,
            color: req.body.color,
            marca: req.body.marca,
            capacidad_carga: req.body.capacidad_carga
        };
        
        // guardar
        let vehiculos = [];
        
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            vehiculos = data ? JSON.parse(data) : [];
        }
        vehiculos.push(nuevoVehiculo);
        fs.writeFileSync(filePath, JSON.stringify(vehiculos, null, 2));
        res.json({ message: 'Vehículo Registrado Exitosamente', vehiculo: nuevoVehiculo });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error al registrar el vehículo' });
    }
};


module.exports = {
    crear_vehiculo
};

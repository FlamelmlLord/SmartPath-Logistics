const express = require('express');
const app = express();
const port = 3000;
const rutasVehiculo = require('./src/rutas/rutas_vehiculo')

app.use(express.json()); // El server entiende los req como json

app.use("/vehiculos", rutasVehiculo);





// dont delete
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


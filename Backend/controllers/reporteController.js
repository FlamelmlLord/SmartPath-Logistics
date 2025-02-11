const client = require('./databaseConn');

exports.getReporte = (req, res) => {
    const query = `
        SELECT 
            rp.r_id AS "ruta",
            r.v_placa AS "vehiculo",
            v.capacidad_carga AS "Capacidad m3",
            v.modelo AS "Modelo",
            CONCAT(c.nombre, ' ', c.apellido) AS "Nombre Conductor",
            r.c_documento AS "Documento",
            c.licencia AS "Licencia",
            rp.p_rastreo AS "Num Rastreo",
            p.descripcion AS "Ref Paquete",
            p.latitud AS "Latitud",
            p.longitud AS "Longitud",
            r.fecha_despacho AS "Fecha Despacho"
        FROM ruta_paquetes rp
        JOIN rutas r ON rp.r_id = r.id
        JOIN vehiculos v ON r.v_placa = v.placa
        JOIN conductores c ON r.c_documento = c.documento
        JOIN paquetes p ON rp.p_rastreo = p.rastreo
    `;

    client.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(result.rows);
        }
    });
};
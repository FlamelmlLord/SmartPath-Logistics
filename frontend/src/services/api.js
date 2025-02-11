import axios from 'axios';

// Usa la variable de entorno si está definida, si no usa 'http://localhost:3000'
const baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000';

// Crea la instancia de Axios con la URL base
const api = axios.create({
  baseURL, // ✅ Ahora está correctamente definido
  headers: {
    'Content-Type': 'application/json'
  }
});

// Vehículos
export const getVehiculos = () => api.get('/vehiculos');
export const createVehiculo = (data) => api.post('/vehiculos', data);
export const updateVehiculo = (placa, data) => api.put(`/vehiculos/${placa}`, data);
export const deleteVehiculo = (placa) => api.delete(`/vehiculos/${placa}`);

// Conductores
export const getConductores = () => api.get('/conductores');
export const createConductor = (data) => api.post('/conductores', data);
// Puedes agregar update y delete

// Paquetes
export const getPaquetes = () => api.get('/paquetes');
export const createPaquete = (data) => api.post('/paquetes', data);

// Rutas
export const getRutasDetalladas = () => api.get('/rutas-detalladas');
export const createRuta = (data) => api.post('/rutas', data);

export default api; // ✅ Exporta api por si quieres importar la instancia completa

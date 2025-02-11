<template>
  <div class="rutas">
    <h1>Lista de Rutas</h1>
    
    <!-- Sección de Filtros -->
    <div class="filters">
      <div class="form-group">
        <label for="filtroConductor">Filtrar por Conductor:</label>
        <input type="text" id="filtroConductor" v-model="filtroConductor" placeholder="Conductor encargado" />
      </div>
      <div class="form-group">
        <label for="filtroVehiculo">Filtrar por Vehículo:</label>
        <input type="text" id="filtroVehiculo" v-model="filtroVehiculo" placeholder="Vehículo asignado" />
      </div>
      <div class="form-group">
        <label for="filtroFecha">Filtrar por Fecha de Despacho:</label>
        <input type="date" id="filtroFecha" v-model="filtroFecha" />
      </div>
    </div>

    <!-- Tabla de Rutas -->
    <table>
      <thead>
        <tr>
          <th>Conductor Asignado</th>
          <th>Vehículo Asignado</th>
          <th>Paquetes</th>
          <th>Fecha de Despacho</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Se utiliza la propiedad computada "rutasFiltradas" para aplicar los filtros -->
        <tr v-for="(ruta, index) in rutasFiltradas" :key="index">
          <td>{{ ruta.conductorAsignado }}</td>
          <td>{{ ruta.vehiculoAsignado }}</td>
          <td>{{ ruta.paquetes.join(', ') }}</td>
          <td>{{ ruta.fechaDespacho }}</td>
          <td class="actions">
            <button @click="iniciarEdicion(index)">Editar</button>
            <button @click="eliminarRuta(index)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para Agregar una Nueva Ruta -->
    <h2>Agregar Ruta</h2>
    <form @submit.prevent="agregarRuta">
      <div class="form-group">
        <label for="conductorAsignado">Conductor Asignado:</label>
        <input type="text" id="conductorAsignado" v-model="nuevaRuta.conductorAsignado" required />
      </div>
      <div class="form-group">
        <label for="vehiculoAsignado">Vehículo Asignado:</label>
        <input type="text" id="vehiculoAsignado" v-model="nuevaRuta.vehiculoAsignado" required />
      </div>
      <div class="form-group">
        <label for="paquetesInput">Paquetes (separados por coma):</label>
        <input type="text" id="paquetesInput" v-model="paquetesInput" required />
      </div>
      <div class="form-group">
        <label for="fechaDespacho">Fecha de Despacho:</label>
        <input type="date" id="fechaDespacho" v-model="nuevaRuta.fechaDespacho" required />
      </div>
      <button type="submit">Agregar Ruta</button>
    </form>

    <!-- Formulario para Editar una Ruta (visible solo si se está editando) -->
    <div v-if="rutaEditando !== null">
      <h2>Editar Ruta</h2>
      <form @submit.prevent="actualizarRuta">
        <div class="form-group">
          <label for="editConductorAsignado">Conductor Asignado:</label>
          <input type="text" id="editConductorAsignado" v-model="rutaEditando.conductorAsignado" required />
        </div>
        <div class="form-group">
          <label for="editVehiculoAsignado">Vehículo Asignado:</label>
          <input type="text" id="editVehiculoAsignado" v-model="rutaEditando.vehiculoAsignado" required />
        </div>
        <div class="form-group">
          <label for="editPaquetesInput">Paquetes (separados por coma):</label>
          <input type="text" id="editPaquetesInput" v-model="paquetesEditInput" required />
        </div>
        <div class="form-group">
          <label for="editFechaDespacho">Fecha de Despacho:</label>
          <input type="date" id="editFechaDespacho" v-model="rutaEditando.fechaDespacho" required />
        </div>
        <button type="submit">Guardar Cambios</button>
        <button type="button" @click="cancelarEdicion">Cancelar</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RutaView',
  data() {
    return {
      // Datos de ejemplo para la tabla de rutas
      rutas: [
        {
          conductorAsignado: 'Juan Pérez',
          vehiculoAsignado: 'Toyota Corolla',
          paquetes: ['P001', 'P002'],
          fechaDespacho: '2025-03-15'
        },
        {
          conductorAsignado: 'María López',
          vehiculoAsignado: 'Ford Focus',
          paquetes: ['P003'],
          fechaDespacho: '2025-03-16'
        }
      ],
      // Objeto para agregar una nueva ruta
      nuevaRuta: {
        conductorAsignado: '',
        vehiculoAsignado: '',
        fechaDespacho: '',
        paquetes: []
      },
      // Cadena para capturar los paquetes (identificadores) ingresados separados por coma
      paquetesInput: '',
      // Variables para edición
      rutaEditando: null,
      indiceEditando: -1,
      paquetesEditInput: '',
      // Variables para filtros
      filtroConductor: '',
      filtroVehiculo: '',
      filtroFecha: ''
    };
  },
  computed: {
    // Computa las rutas filtradas según los criterios ingresados
    rutasFiltradas() {
      return this.rutas.filter(ruta => {
        const matchConductor =
          this.filtroConductor.trim() === '' ||
          ruta.conductorAsignado.toLowerCase().includes(this.filtroConductor.toLowerCase());
        const matchVehiculo =
          this.filtroVehiculo.trim() === '' ||
          ruta.vehiculoAsignado.toLowerCase().includes(this.filtroVehiculo.toLowerCase());
        const matchFecha =
          this.filtroFecha.trim() === '' ||
          ruta.fechaDespacho === this.filtroFecha;
        return matchConductor && matchVehiculo && matchFecha;
      });
    }
  },
  methods: {
    agregarRuta() {
      // Separa la cadena de paquetes y elimina espacios vacíos
      this.nuevaRuta.paquetes = this.paquetesInput.split(',')
        .map(p => p.trim())
        .filter(p => p !== '');
      // Agrega la nueva ruta al arreglo
      this.rutas.push({ ...this.nuevaRuta });
      // Reinicia el formulario
      this.nuevaRuta = {
        conductorAsignado: '',
        vehiculoAsignado: '',
        fechaDespacho: '',
        paquetes: []
      };
      this.paquetesInput = '';
    },
    iniciarEdicion(index) {
      this.indiceEditando = index;
      this.rutaEditando = { ...this.rutas[index] };
      // Prepara la cadena de paquetes para edición (separados por coma)
      this.paquetesEditInput = this.rutaEditando.paquetes.join(', ');
    },
    actualizarRuta() {
      // Actualiza la propiedad "paquetes" parseando la cadena editada
      this.rutaEditando.paquetes = this.paquetesEditInput.split(',')
        .map(p => p.trim())
        .filter(p => p !== '');
      // Actualiza la ruta en el arreglo
      this.rutas[this.indiceEditando] = { ...this.rutaEditando };
      // Reinicia el estado de edición
      this.rutaEditando = null;
      this.indiceEditando = -1;
      this.paquetesEditInput = '';
    },
    cancelarEdicion() {
      this.rutaEditando = null;
      this.indiceEditando = -1;
      this.paquetesEditInput = '';
    },
    eliminarRuta(index) {
      if (confirm('¿Estás seguro de eliminar esta ruta?')) {
        this.rutas.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.rutas {
  padding: 20px;
}

/* Estilos para la sección de filtros */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.filters .form-group {
  display: flex;
  flex-direction: column;
}

/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

thead th {
  background-color: #f2f2f2;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

.actions {
  text-align: center;
}

.actions button {
  margin: 0 5px;
}

/* Estilos para los formularios */
form {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

button[type="submit"] {
  grid-column: 1 / -1;
}
</style>
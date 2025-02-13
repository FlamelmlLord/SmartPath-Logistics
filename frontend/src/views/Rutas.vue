<template>
  <div class="rutas">
    <h1>Lista de Rutas</h1>
    
    <!-- Sección de Filtros -->
    <div class="filters">
      <div class="form-group">
        <label for="filtroConductor">Filtrar por Conductor (Documento):</label>
        <!-- Se filtra por el número de documento -->
        <input
          type="text"
          id="filtroConductor"
          v-model="filtroConductor"
          placeholder="Documento del conductor" />
      </div>
      <div class="form-group">
        <label for="filtroVehiculo">Filtrar por Vehículo (Placa):</label>
        <input
          type="text"
          id="filtroVehiculo"
          v-model="filtroVehiculo"
          placeholder="Placa del vehículo" />
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
          <th>Fecha de Despacho</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Usamos "ruta.id" como key, y mostramos c_documento y v_placa -->
        <tr v-for="(ruta, index) in rutasFiltradas" :key="ruta.id">
          <td>{{ getConductorLabel(ruta.c_documento) }}</td>
          <td>{{ getVehiculoLabel(ruta.v_placa) }}</td>
          <td>{{ ruta.fecha_despacho }}</td>
          <td class="actions">
            <button @click="iniciarEdicion(index)">Editar</button>
            <button @click="eliminarRuta(ruta.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para Agregar una Nueva Ruta -->
    <h2>Agregar Ruta</h2>
    <form @submit.prevent="agregarRuta">
      <div class="form-group">
        <label for="conductorAsignado">Conductor Asignado:</label>
        <select id="conductorAsignado" v-model="nuevaRuta.conductorAsignado" required>
          <option value="" disabled selected>Seleccione un conductor</option>
          <option
            v-for="conductor in conductoresList"
            :key="conductor.value"
            :value="conductor.value">
            {{ conductor.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="vehiculoAsignado">Vehículo Asignado:</label>
        <select id="vehiculoAsignado" v-model="nuevaRuta.vehiculoAsignado" required>
          <option value="" disabled selected>Seleccione un vehículo</option>
          <option
            v-for="vehiculo in vehiculosList"
            :key="vehiculo.value"
            :value="vehiculo.value">
            {{ vehiculo.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="fechaDespacho">Fecha de Despacho:</label>
        <input type="datetime-local" id="fechaDespacho" v-model="nuevaRuta.fechaDespacho" required />
      </div>

      <button type="submit">Agregar Ruta</button>
    </form>

    <!-- Formulario para Editar una Ruta (visible cuando se edita) -->
    <div v-if="rutaEditando !== null">
      <h2>Editar Ruta</h2>
      <form @submit.prevent="actualizarRuta">
        <div class="form-group">
          <label for="editConductorAsignado">Conductor Asignado:</label>
          <select id="editConductorAsignado" v-model="rutaEditando.c_documento" required>
            <option value="" disabled selected>Seleccione un conductor</option>
            <option
              v-for="conductor in conductoresList"
              :key="conductor.value"
              :value="conductor.value">
              {{ conductor.label }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="editVehiculoAsignado">Vehículo Asignado:</label>
          <select id="editVehiculoAsignado" v-model="rutaEditando.v_placa" required>
            <option value="" disabled selected>Seleccione un vehículo</option>
            <option
              v-for="vehiculo in vehiculosList"
              :key="vehiculo.value"
              :value="vehiculo.value">
              {{ vehiculo.label }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="editFechaDespacho">Fecha de Despacho:</label>
          <input type="datetime-local" id="editFechaDespacho" v-model="rutaEditando.fecha_despacho" required />
        </div>

        <button type="submit">Guardar Cambios</button>
        <button type="button" @click="cancelarEdicion">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RutaView',
  data() {
    return {
      conductoresList: [],
      vehiculosList: [],
      rutas: [],
      nuevaRuta: {
        conductorAsignado: '',
        vehiculoAsignado: '',
        fechaDespacho: ''
      },
      filtroConductor: '',
      filtroVehiculo: '',
      filtroFecha: '',
      rutaEditando: null,
      indiceEditando: -1
    };
  },
  computed: {
    rutasFiltradas() {
      return this.rutas.filter(ruta => {
        const matchConductor =
          this.filtroConductor.trim() === '' ||
          ruta.c_documento.toString().toLowerCase().includes(this.filtroConductor.toLowerCase());
        const matchVehiculo =
          this.filtroVehiculo.trim() === '' ||
          ruta.v_placa.toLowerCase().includes(this.filtroVehiculo.toLowerCase());
        const matchFecha =
          this.filtroFecha.trim() === '' ||
          ruta.fecha_despacho === this.filtroFecha;
        return matchConductor && matchVehiculo && matchFecha;
      });
    }
  },
  methods: {
    async fetchSelectOptions() {
      try {
        const [conductoresRes, vehiculosRes] = await Promise.all([
          axios.get('http://localhost:3000/conductores/for-select'),
          axios.get('http://localhost:3000/vehiculos/for-select')
        ]);
        this.conductoresList = conductoresRes.data;
        this.vehiculosList = vehiculosRes.data;
      } catch (error) {
        console.error('Error al obtener opciones para selects:', error);
      }
    },
    async fetchRutas() {
      try {
        const res = await axios.get('http://localhost:3000/rutas');
        this.rutas = res.data;
      } catch (error) {
        console.error('Error al obtener rutas:', error);
      }
    },
    getConductorLabel(value) {
      const conductor = this.conductoresList.find(c => c.value === value);
      return conductor ? conductor.label : value;
    },
    getVehiculoLabel(value) {
      const vehiculo = this.vehiculosList.find(v => v.value === value);
      return vehiculo ? vehiculo.label : value;
    },
    agregarRuta() {
      axios
        .post('http://localhost:3000/rutas', {
          v_placa: this.nuevaRuta.vehiculoAsignado,
          c_documento: this.nuevaRuta.conductorAsignado,
          fecha_despacho: this.nuevaRuta.fechaDespacho.replace('T', ' ')
        })
        .then(response => {
          console.log('Ruta agregada:', response.data);
          this.fetchRutas();
        })
        .catch(error => {
          console.error('Error al agregar ruta:', error);
        });
      this.nuevaRuta = { conductorAsignado: '', vehiculoAsignado: '', fechaDespacho: '' };
    },
    iniciarEdicion(index) {
      this.indiceEditando = index;
      this.rutaEditando = { ...this.rutas[index] };
    },
    actualizarRuta() {
      axios
        .put(`http://localhost:3000/rutas/${this.rutaEditando.id}`, {
          v_placa: this.rutaEditando.v_placa,
          c_documento: this.rutaEditando.c_documento,
          fecha_despacho: this.rutaEditando.fecha_despacho.replace('T', ' ')
        })
        .then(() => {
          this.fetchRutas();
        })
        .catch(error => console.error('Error al actualizar ruta:', error));
      this.rutaEditando = null;
      this.indiceEditando = -1;
    },
    cancelarEdicion() {
      this.rutaEditando = null;
      this.indiceEditando = -1;
    },
    eliminarRuta(id) {
      if (confirm('¿Estás seguro de eliminar esta ruta?')) {
        axios
          .delete(`http://localhost:3000/rutas/${id}`)
          .then(() => this.fetchRutas())
          .catch(error => console.error('Error al eliminar ruta:', error));
      }
    }
  },
  mounted() {
    this.fetchSelectOptions();
    this.fetchRutas();
  }
};
</script>

<style scoped>
.rutas {
  padding: 20px;
}
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
.form-group input,
.form-group select {
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

<template>
  <div class="vehiculos">
    <h1>Lista de Vehículos</h1>
    <!-- Tabla de vehículos -->
    <table>
      <thead>
        <tr>
          <th>Placa</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Color</th>
          <th>Capacidad de Carga</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vehiculo, index) in vehiculos" :key="index">
          <td>{{ vehiculo.placa }}</td>
          <td>{{ vehiculo.marca }}</td>
          <td>{{ vehiculo.modelo }}</td>
          <td>{{ vehiculo.color }}</td>
          <td>{{ vehiculo.capacidadCarga }}</td>
          <td class="actions">
            <button @click="iniciarEdicion(index)">Editar</button>
            <button @click="eliminarVehiculo(index)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para agregar un nuevo vehículo -->
    <h2>Agregar Vehículo</h2>
    <form @submit.prevent="agregarVehiculo">
      <div class="form-group">
        <label for="placa">Placa:</label>
        <input type="text" id="placa" v-model="nuevoVehiculo.placa" required />
      </div>
      <div class="form-group">
        <label for="marca">Marca:</label>
        <input type="text" id="marca" v-model="nuevoVehiculo.marca" required />
      </div>
      <div class="form-group">
        <label for="modelo">Modelo:</label>
        <input type="text" id="modelo" v-model="nuevoVehiculo.modelo" required />
      </div>
      <div class="form-group">
        <label for="color">Color:</label>
        <input type="text" id="color" v-model="nuevoVehiculo.color" required />
      </div>
      <div class="form-group">
        <label for="capacidadCarga">Capacidad de Carga:</label>
        <input type="number" id="capacidadCarga" v-model="nuevoVehiculo.capacidadCarga" required />
      </div>
      <button type="submit">Agregar Vehículo</button>
    </form>

    <!-- Formulario para editar vehículo (se muestra solo si se está editando alguno) -->
    <div v-if="vehiculoEditando !== null">
      <h2>Editar Vehículo</h2>
      <form @submit.prevent="actualizarVehiculo">
        <div class="form-group">
          <label for="editPlaca">Placa:</label>
          <input type="text" id="editPlaca" v-model="vehiculoEditando.placa" required />
        </div>
        <div class="form-group">
          <label for="editMarca">Marca:</label>
          <input type="text" id="editMarca" v-model="vehiculoEditando.marca" required />
        </div>
        <div class="form-group">
          <label for="editModelo">Modelo:</label>
          <input type="text" id="editModelo" v-model="vehiculoEditando.modelo" required />
        </div>
        <div class="form-group">
          <label for="editColor">Color:</label>
          <input type="text" id="editColor" v-model="vehiculoEditando.color" required />
        </div>
        <div class="form-group">
          <label for="editCapacidadCarga">Capacidad de Carga:</label>
          <input type="number" id="editCapacidadCarga" v-model="vehiculoEditando.capacidadCarga" required />
        </div>
        <button type="submit">Guardar Cambios</button>
        <button type="button" @click="cancelarEdicion">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VehiculosView',
  data() {
    return {
      // Datos de ejemplo para la tabla
      vehiculos: [
        {
          placa: 'ABC-123',
          marca: 'Toyota',
          modelo: 'Corolla',
          color: 'Rojo',
          capacidadCarga: 500
        },
        {
          placa: 'XYZ-789',
          marca: 'Ford',
          modelo: 'Focus',
          color: 'Azul',
          capacidadCarga: 600
        }
      ],
      // Objeto para el formulario de agregar un nuevo vehículo
      nuevoVehiculo: {
        placa: '',
        marca: '',
        modelo: '',
        color: '',
        capacidadCarga: ''
      },
      // Variables para la edición
      vehiculoEditando: null,  // Se almacenará el vehículo a editar
      indiceEditando: -1       // Se guarda el índice del vehículo que se está editando
    };
  },
  methods: {
    agregarVehiculo() {
      this.vehiculos.push({ ...this.nuevoVehiculo });
      // Reinicia el formulario
      this.nuevoVehiculo = {
        placa: '',
        marca: '',
        modelo: '',
        color: '',
        capacidadCarga: ''
      };
    },
    iniciarEdicion(index) {
      this.indiceEditando = index;
      this.vehiculoEditando = { ...this.vehiculos[index] };
    },
    actualizarVehiculo() {
      // Actualiza el vehículo en el array
      this.vehiculos[this.indiceEditando] = { ...this.vehiculoEditando };
      this.vehiculoEditando = null;
      this.indiceEditando = -1;
    },
    cancelarEdicion() {
      this.vehiculoEditando = null;
      this.indiceEditando = -1;
    },
    eliminarVehiculo(index) {
      if (confirm('¿Estás seguro de eliminar este vehículo?')) {
        this.vehiculos.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.vehiculos {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

/* Estilos para centrar y espaciar los botones de acción */
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

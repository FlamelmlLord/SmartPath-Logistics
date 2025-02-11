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
          <th>Capacidad de Carga en m³</th>
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
      vehiculos: [], // Se llenará con datos del backend
      nuevoVehiculo: {
        placa: '',
        marca: '',
        modelo: '',
        color: '',
        capacidad_carga: '' // 🔄 Ajustado para coincidir con el backend
      },
      vehiculoEditando: null,
      indiceEditando: -1
    };
  },
  methods: {
    // 🚀 Obtener todos los vehículos
    async fetchVehiculos() {
  try {
    const response = await fetch('http://localhost:3000/vehiculos');
    const data = await response.json();

    // Transformar los datos para que Vue use "capacidadCarga"
    this.vehiculos = data.map(vehiculo => ({
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      color: vehiculo.color,
      capacidadCarga: vehiculo.capacidad_carga // 🔄 Cambiamos el nombre para que Vue lo reconozca
    }));
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
  }
},

    // 🚀 Agregar un nuevo vehículo
    async agregarVehiculo() {
      try {
        const nuevoVehiculoData = { 
          ...this.nuevoVehiculo,
          capacidad_carga: this.nuevoVehiculo.capacidadCarga // Renombrado para backend
        };

        const response = await fetch('http://localhost:3000/vehiculos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoVehiculoData)
        });

        if (response.ok) {
          this.fetchVehiculos(); // Recargar lista
          this.nuevoVehiculo = { placa: '', marca: '', modelo: '', color: '', capacidadCarga: '' };
        } else {
          console.error('Error al agregar vehículo');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    // 🚀 Iniciar edición
    iniciarEdicion(index) {
  this.indiceEditando = index;
  this.vehiculoEditando = { ...this.vehiculos[index] }; // 🔄 Usamos los datos ya transformados en fetchVehiculos()
},

    // 🚀 Actualizar vehículo
    async actualizarVehiculo() {
      try {
        const vehiculoActualizado = { 
          ...this.vehiculoEditando,
          capacidad_carga: this.vehiculoEditando.capacidadCarga // Renombrado para backend
        };

        const response = await fetch(`http://localhost:3000/vehiculos/${this.vehiculoEditando.placa}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(vehiculoActualizado)
        });

        if (response.ok) {
          this.fetchVehiculos(); // Recargar lista
          this.vehiculoEditando = null;
          this.indiceEditando = -1;
        } else {
          console.error('Error al actualizar vehículo');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    // 🚀 Eliminar vehículo
    async eliminarVehiculo(index) {
      const placa = this.vehiculos[index].placa;
      if (!confirm('¿Seguro que deseas eliminar este vehículo?')) return;

      try {
        const response = await fetch(`http://localhost:3000/vehiculos/${placa}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          this.fetchVehiculos(); // Recargar lista
        } else {
          console.error('Error al eliminar vehículo');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  },
  mounted() {
    this.fetchVehiculos(); // Llamar a la API al cargar la vista
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

<template>
  <div class="conductores">
    <h1>Lista de Conductores</h1>
    
    <!-- Tabla de conductores -->
    <table>
      <thead>
        <tr>
          <th>Documento</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Número de Licencia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(conductor, index) in conductores" :key="index">
          <td>{{ conductor.documento }}</td>
          <td>{{ conductor.nombre }}</td>
          <td>{{ conductor.apellido }}</td>
          <td>{{ conductor.telefono }}</td>
          <td>{{ conductor.correo_electronico }}</td>
          <td>{{ conductor.licencia }}</td>
          <td class="actions">
            <button @click="iniciarEdicion(index)">Editar</button>
            <button @click="eliminarConductor(index)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para agregar un nuevo conductor -->
    <h2>Agregar Conductor</h2>
    <form @submit.prevent="agregarConductor">
      <div class="form-group">
        <label for="documento">Documento:</label>
        <input type="text" id="documento" v-model="nuevoConductor.documento" required />
      </div>
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nuevoConductor.nombre" required />
      </div>
      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" v-model="nuevoConductor.apellido" required />
      </div>
      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" v-model="nuevoConductor.telefono" required />
      </div>
      <div class="form-group">
        <label for="correo">Correo:</label>
        <input type="email" id="correo" v-model="nuevoConductor.correo" required />
      </div>
      <div class="form-group">
        <label for="numeroLicencia">Número de Licencia:</label>
        <input type="text" id="numeroLicencia" v-model="nuevoConductor.numeroLicencia" required />
      </div>
      <button type="submit">Agregar Conductor</button>
    </form>

    <!-- Formulario para editar conductor (se muestra solo si se está editando alguno) -->
    <div v-if="conductorEditando !== null">
      <h2>Editar Conductor</h2>
      <form @submit.prevent="actualizarConductor">
        <div class="form-group">
          <label for="editDocumento">Documento:</label>
          <input type="text" id="editDocumento" v-model="conductorEditando.documento" required />
        </div>
        <div class="form-group">
          <label for="editNombre">Nombre:</label>
          <input type="text" id="editNombre" v-model="conductorEditando.nombre" required />
        </div>
        <div class="form-group">
          <label for="editApellido">Apellido:</label>
          <input type="text" id="editApellido" v-model="conductorEditando.apellido" required />
        </div>
        <div class="form-group">
          <label for="editTelefono">Teléfono:</label>
          <input type="tel" id="editTelefono" v-model="conductorEditando.telefono" required />
        </div>
        <div class="form-group">
          <label for="editCorreo">Correo:</label>
          <input type="email" id="editCorreo" v-model="conductorEditando.correo" required />
        </div>
        <div class="form-group">
          <label for="editNumeroLicencia">Número de Licencia:</label>
          <input type="text" id="editNumeroLicencia" v-model="conductorEditando.numeroLicencia" required />
        </div>
        <button type="submit">Guardar Cambios</button>
        <button type="button" @click="cancelarEdicion">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConductoresView',
  data() {
    return {
      conductores: [],  // Inicialmente vacío, lo llenaremos con datos de la API
      nuevoConductor: {
        documento: '',
        nombre: '',
        apellido: '',
        telefono: '',
        correo_electronico: '', // 🔄 Ajuste para coincidir con el backend
        licencia: ''
      },
      conductorEditando: null,  
      indiceEditando: -1        
    };
  },
  methods: {
    // 🚀 Obtener la lista de conductores desde el backend
    async fetchConductores() {
      try {
        const response = await fetch('http://localhost:3000/conductores'); // Ajusta el puerto si es diferente
        this.conductores = await response.json();
      } catch (error) {
        console.error('Error al obtener conductores:', error);
      }
    },

    // 🚀 Agregar un nuevo conductor
    async agregarConductor() {
  try {
    const nuevoConductorData = { 
      ...this.nuevoConductor,
      correo_electronico: this.nuevoConductor.correo, // Renombrar para backend
      licencia: this.nuevoConductor.numeroLicencia    // Renombrar para backend
    };

    const response = await fetch('http://localhost:3000/conductores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoConductorData)
    });

    if (response.ok) {
      this.fetchConductores(); // Recargar la lista de conductores
      this.nuevoConductor = { documento: '', nombre: '', apellido: '', telefono: '', correo: '', numeroLicencia: '' };
    } else {
      console.error('Error al agregar conductor');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
},

    // 🚀 Iniciar edición
    iniciarEdicion(index) {
  this.indiceEditando = index;
  this.conductorEditando = { 
    ...this.conductores[index], 
    correo: this.conductores[index].correo_electronico,  // Renombrar para Vue
    numeroLicencia: this.conductores[index].licencia     // Renombrar para Vue
  };
},

    // 🚀 Actualizar conductor
    async actualizarConductor() {
  try {
    const conductorActualizado = { 
      ...this.conductorEditando,
      correo_electronico: this.conductorEditando.correo, // Renombrar para backend
      licencia: this.conductorEditando.numeroLicencia    // Renombrar para backend
    };

    const response = await fetch(`http://localhost:3000/conductores/${this.conductorEditando.documento}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(conductorActualizado)
    });

    if (response.ok) {
      this.fetchConductores(); // Recargar lista
      this.conductorEditando = null;
      this.indiceEditando = -1;
    } else {
      console.error('Error al actualizar conductor');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
},

    // 🚀 Eliminar conductor
    async eliminarConductor(index) {
      const documento = this.conductores[index].documento;
      if (!confirm('¿Seguro que deseas eliminar este conductor?')) return;

      try {
        const response = await fetch(`http://localhost:3000/conductores/${documento}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          this.fetchConductores(); // Recargar la lista de conductores
        } else {
          console.error('Error al eliminar conductor');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  },
  mounted() {
    this.fetchConductores(); // Llamar a la API al cargar la vista
  }
};
</script>


<style scoped>
.conductores {
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

/* Botones de envío y acción dentro de los formularios */
button[type="submit"] {
  grid-column: 1 / -1;
}

.actions {
  text-align: center; /* Centra el contenido dentro de la celda */
}

.actions button {
  margin: 0 5px; /* Da un margen horizontal entre los botones */
}

</style>

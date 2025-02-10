<template>
  <div class="paquetes">
    <h1>Lista de Paquetes</h1>
    <!-- Tabla de paquetes -->
    <table>
      <thead>
        <tr>
          <th>Identificador</th>
          <th>Tamaño</th>
          <th>Dirección Destino</th>
          <th>Nombre del Destinatario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(paquete, index) in paquetes" :key="index">
          <td>{{ paquete.identificador }}</td>
          <td>{{ paquete.tamaño }}</td>
          <td>{{ paquete.direccionDestino }}</td>
          <td>{{ paquete.nombreDestinatario }}</td>
          <td class="actions">
            <button @click="iniciarEdicion(index)">Editar</button>
            <button @click="eliminarPaquete(index)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario para agregar un nuevo paquete -->
    <h2>Agregar Paquete</h2>
    <form @submit.prevent="agregarPaquete">
      <div class="form-group">
        <label for="identificador">Identificador:</label>
        <input type="text" id="identificador" v-model="nuevoPaquete.identificador" required />
      </div>
      <div class="form-group">
        <label for="tamaño">Tamaño:</label>
        <input type="text" id="tamaño" v-model="nuevoPaquete.tamaño" required />
      </div>
      <div class="form-group">
        <label for="direccionDestino">Dirección Destino:</label>
        <input type="text" id="direccionDestino" v-model="nuevoPaquete.direccionDestino" required />
      </div>
      <div class="form-group">
        <label for="nombreDestinatario">Nombre del Destinatario:</label>
        <input type="text" id="nombreDestinatario" v-model="nuevoPaquete.nombreDestinatario" required />
      </div>
      <button type="submit">Agregar Paquete</button>
    </form>

    <!-- Formulario para editar un paquete (visible sólo si se está editando) -->
    <div v-if="paqueteEditando !== null">
      <h2>Editar Paquete</h2>
      <form @submit.prevent="actualizarPaquete">
        <div class="form-group">
          <label for="editIdentificador">Identificador:</label>
          <input type="text" id="editIdentificador" v-model="paqueteEditando.identificador" required />
        </div>
        <div class="form-group">
          <label for="editTamaño">Tamaño:</label>
          <input type="text" id="editTamaño" v-model="paqueteEditando.tamaño" required />
        </div>
        <div class="form-group">
          <label for="editDireccionDestino">Dirección Destino:</label>
          <input type="text" id="editDireccionDestino" v-model="paqueteEditando.direccionDestino" required />
        </div>
        <div class="form-group">
          <label for="editNombreDestinatario">Nombre del Destinatario:</label>
          <input type="text" id="editNombreDestinatario" v-model="paqueteEditando.nombreDestinatario" required />
        </div>
        <button type="submit">Guardar Cambios</button>
        <button type="button" @click="cancelarEdicion">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaquetesView',
  data() {
    return {
      // Datos de ejemplo para la tabla de paquetes
      paquetes: [
        {
          identificador: 'P001',
          tamaño: 'Grande',
          direccionDestino: 'Calle 123, Ciudad',
          nombreDestinatario: 'Juan Perez'
        },
        {
          identificador: 'P002',
          tamaño: 'Mediano',
          direccionDestino: 'Avenida 456, Ciudad',
          nombreDestinatario: 'María Lopez'
        }
      ],
      // Objeto para el formulario de agregar un nuevo paquete
      nuevoPaquete: {
        identificador: '',
        tamaño: '',
        direccionDestino: '',
        nombreDestinatario: ''
      },
      // Variables para edición
      paqueteEditando: null,
      indiceEditando: -1
    };
  },
  methods: {
    agregarPaquete() {
      // Agrega una copia del nuevo paquete al array
      this.paquetes.push({ ...this.nuevoPaquete });
      // Reinicia el formulario
      this.nuevoPaquete = {
        identificador: '',
        tamaño: '',
        direccionDestino: '',
        nombreDestinatario: ''
      };
    },
    iniciarEdicion(index) {
      this.indiceEditando = index;
      this.paqueteEditando = { ...this.paquetes[index] };
    },
    actualizarPaquete() {
      // Actualiza el paquete en el array
      this.paquetes[this.indiceEditando] = { ...this.paqueteEditando };
      this.paqueteEditando = null;
      this.indiceEditando = -1;
    },
    cancelarEdicion() {
      this.paqueteEditando = null;
      this.indiceEditando = -1;
    },
    eliminarPaquete(index) {
      if (confirm('¿Estás seguro de eliminar este paquete?')) {
        this.paquetes.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.paquetes {
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

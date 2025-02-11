<template>
  <div class="paquetes">
    <h1>Lista de Paquetes</h1>

    <!-- Tabla de paquetes -->
    <table>
      <thead>
        <tr>
          <th>Rastreo</th>
          <th>Descripción</th>
          <th>Destinatario</th>
          <th>Latitud</th>
          <th>Longitud</th>
          <th>Tamaño (m³)</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(paquete, index) in paquetes" :key="index">
          <td>{{ paquete.rastreo }}</td>
          <td>{{ paquete.descripcion }}</td>
          <td>{{ paquete.destinatario }}</td>
          <td>{{ paquete.latitud }}</td>
          <td>{{ paquete.longitud }}</td>
          <td>{{ paquete.tamano }}</td>
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
        <label for="descripcion">Descripción:</label>
        <input type="text" id="descripcion" v-model="nuevoPaquete.descripcion" required />
      </div>
      <div class="form-group">
        <label for="destinatario">Destinatario:</label>
        <input type="text" id="destinatario" v-model="nuevoPaquete.destinatario" required />
      </div>
      <div class="form-group">
        <label for="latitud">Latitud:</label>
        <input type="text" id="latitud" v-model="nuevoPaquete.latitud" required />
      </div>
      <div class="form-group">
        <label for="longitud">Longitud:</label>
        <input type="text" id="longitud" v-model="nuevoPaquete.longitud" required />
      </div>
      <div class="form-group">
        <label for="tamano">Tamaño(m³):</label>
        <input type="text" id="tamano" v-model="nuevoPaquete.tamano" required />
      </div>
      <button type="submit">Agregar Paquete</button>
    </form>

    <!-- Formulario para editar un paquete -->
    <div v-if="paqueteEditando !== null">
      <h2>Editar Paquete</h2>
      <form @submit.prevent="actualizarPaquete">
        <div class="form-group">
          <label for="editDescripcion">Descripción:</label>
          <input type="text" id="editDescripcion" v-model="paqueteEditando.descripcion" required />
        </div>
        <div class="form-group">
          <label for="editDestinatario">Destinatario:</label>
          <input type="text" id="editDestinatario" v-model="paqueteEditando.destinatario" required />
        </div>
        <div class="form-group">
          <label for="editLatitud">Latitud:</label>
          <input type="text" id="editLatitud" v-model="paqueteEditando.latitud" required />
        </div>
        <div class="form-group">
          <label for="editLongitud">Longitud:</label>
          <input type="text" id="editLongitud" v-model="paqueteEditando.longitud" required />
        </div>
        <div class="form-group">
          <label for="editTamano">Tamaño(m³):</label>
          <input type="text" id="editTamano" v-model="paqueteEditando.tamano" required />
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
      paquetes: [], // Se llenará desde la API
      nuevoPaquete: {
        descripcion: '',
        destinatario: '',
        latitud: '',
        longitud: '',
        tamano: ''
      },
      paqueteEditando: null,
      indiceEditando: -1
    };
  },
  methods: {
    // 🚀 Obtener paquetes
    async fetchPaquetes() {
      try {
        const response = await fetch('http://localhost:3000/paquetes');
        const data = await response.json();

        // Transformar nombres de las claves
        this.paquetes = data.map(paquete => ({
          rastreo: paquete.rastreo,
          descripcion: paquete.descripcion,
          destinatario: paquete.destinatario, // Nuevo campo
          latitud: paquete.latitud,
          longitud: paquete.longitud,
          tamano: paquete.tamano // ✅ Intentamos ambas versiones
        }));
      } catch (error) {
        console.error('Error al obtener paquetes:', error);
      }
    },

    // 🚀 Agregar paquete
    async agregarPaquete() {
      try {
        const response = await fetch('http://localhost:3000/paquetes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.nuevoPaquete)
        });

        if (response.ok) {
          this.fetchPaquetes();
          this.nuevoPaquete = { descripcion: '', destinatario: '', latitud: '', longitud: '', tamano: '' };
        } else {
          console.error('Error al agregar paquete');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    },

    // 🚀 Iniciar edición
    iniciarEdicion(index) {
      this.indiceEditando = index;
      this.paqueteEditando = { ...this.paquetes[index] };
      console.log('✏️ Editando paquete:', this.paqueteEditando); // 🔍 Depuración

    },

    // 🚀 Actualizar paquete
    async actualizarPaquete() {
  try {
    const paqueteActualizado = { 
      ...this.paqueteEditando,
      tamano: this.paqueteEditando.tamano  // Asegurar que tamano se envíe correctamente
    };

    console.log('📡 Enviando al backend:', paqueteActualizado); // 🔍 Depuración

    const response = await fetch(`http://localhost:3000/paquetes/${this.paqueteEditando.rastreo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paqueteActualizado)
    });

    if (response.ok) {
      this.fetchPaquetes();
      this.paqueteEditando = null;
      this.indiceEditando = -1;
    } else {
      console.error('❌ Error al actualizar paquete');
    }
  } catch (error) {
    console.error('🚨 Error de red:', error);
  }
},

    // 🚀 Eliminar paquete
    async eliminarPaquete(index) {
      const rastreo = this.paquetes[index].rastreo;
      if (!confirm('¿Seguro que deseas eliminar este paquete?')) return;

      try {
        const response = await fetch(`http://localhost:3000/paquetes/${rastreo}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          this.fetchPaquetes();
        } else {
          console.error('Error al eliminar paquete');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  },
  mounted() {
    this.fetchPaquetes();
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

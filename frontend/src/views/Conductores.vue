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
        </tr>
      </thead>
      <tbody>
        <tr v-for="(conductor, index) in conductores" :key="index">
          <td>{{ conductor.documento }}</td>
          <td>{{ conductor.nombre }}</td>
          <td>{{ conductor.apellido }}</td>
          <td>{{ conductor.telefono }}</td>
          <td>{{ conductor.correo }}</td>
          <td>{{ conductor.numeroLicencia }}</td>
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
  </div>
</template>

<script>
export default {
  name: 'ConductoresView',
  data() {
    return {
      // Array inicial con datos de ejemplo
      conductores: [
        {
          documento: '12345678',
          nombre: 'Juan',
          apellido: 'Pérez',
          telefono: '555-1234',
          correo: 'juan@example.com',
          numeroLicencia: 'ABC123'
        },
        {
          documento: '87654321',
          nombre: 'María',
          apellido: 'González',
          telefono: '555-5678',
          correo: 'maria@example.com',
          numeroLicencia: 'XYZ789'
        }
      ],
      // Objeto para almacenar los datos del nuevo conductor a agregar
      nuevoConductor: {
        documento: '',
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        numeroLicencia: ''
      }
    };
  },
  methods: {
    agregarConductor() {
      // Agrega el nuevo conductor al array de conductores
      this.conductores.push({ ...this.nuevoConductor });
      // Reinicia el formulario
      this.nuevoConductor = {
        documento: '',
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        numeroLicencia: ''
      };
    }
  }
};
</script>

<style scoped>
.conductores {
  padding: 20px;
}

/* Estilos para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead th {
  background-color: #f2f2f2;
  text-align: left;
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

/* Estilos para el formulario */
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

button[type="submit"] {
  grid-column: 1 / -1;
  padding: 10px;
  border: none;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button[type="submit"]:hover {
  background-color: #555;
}
</style>

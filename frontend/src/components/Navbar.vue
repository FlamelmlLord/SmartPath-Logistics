<template>
  <nav class="navbar">
    <ul>
      <li><button @click="navigate('conductores')">Conductores</button></li>
      <li><button @click="navigate('carros')">Vehiculos</button></li>
      <li><button @click="navigate('rutas')">Rutas</button></li>
      <li><button @click="navigate('mapa')">Visualizar Rutas</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  methods: {
    navigate(page) {
      // Definimos un objeto de rutas para cada botón
      const routes = {
        conductores: '/conductores',
        carros: '/carros', // Asegúrate de tener estas rutas definidas en tu router
        mapa: '/',         // Visualizar Rutas redirige a la ruta raíz
        rutas: '/rutas'
      };

      const route = routes[page];
      if (route) {
        this.$router.push(route);
      } else {
        console.log(`No se encontró la ruta para: ${page}`);
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px;
}
.navbar ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}
.navbar li {
  margin: 0 15px;
}
.navbar button {
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}
.navbar button:hover {
  color: #ddd;
}
</style>
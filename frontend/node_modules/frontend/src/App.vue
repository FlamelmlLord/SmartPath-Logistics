<template>
  <h1>Aplicación Entregas</h1>
  <p>Elija la opción de su preferencia</p>
  <AppNavbar />
  <router-view/>
</template>

<script>
import AppNavbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Si no usas Vue Router, elimina estos estilos:
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
*/
</style>
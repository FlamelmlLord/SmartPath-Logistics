// index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Conductores from '../views/Conductores.vue' // Importa el componente
import Vehiculos from '../views/Vehiculos.vue' // Importa el componente
import Paquetes from '../views/Paquetes.vue' // Importa el componente


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/conductores',
    name: 'conductores',
    component: Conductores
  },
  {
    path: '/vehiculos',
    name: 'vehiculos',
    component: Vehiculos
  },
  {
    path: '/paquetes',
    name: 'paquetes',
    component: Paquetes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

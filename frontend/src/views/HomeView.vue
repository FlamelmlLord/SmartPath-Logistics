<template>
  <div class="home">
    <MapaGoogle />
  </div>
</template>

<script>
import MapaGoogle from '@/components/MapaGoogle.vue'

export default {
  name: 'HomeView',
  components: {
    MapaGoogle
  }
}
</script>
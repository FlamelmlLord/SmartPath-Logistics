<template>
  <div>
    <div id="map" style="height: 500px;"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';

/* eslint-disable no-undef */
export default {
  name: 'MapaGoogle',
  data() {
    return {
      map: null,
      directionsService: null,
      directionsRenderer: null,
    };
  },
  async mounted() {
    const loader = new Loader({
      apiKey: 'AIzaSyCab2ATroSffTWeMOqPJQ6SNuvVVXj_hvk',
      version: 'weekly',
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 6,
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);

      this.cargarUbicaciones();
    });
  },
  methods: {
    async cargarUbicaciones() {
      try {
        const response = await axios.get('http://localhost:3000/vehiculos/ubicaciones');
        const ubicaciones = response.data;
        console.log('Ubicaciones:', ubicaciones); // Verificar la respuesta

        if (ubicaciones.length > 1) {
          const waypoints = ubicaciones.slice(1, -1).map(location => ({
            location: new google.maps.LatLng(location.lat, location.lng),
            stopover: true,
          }));

          const request = {
            origin: new google.maps.LatLng(ubicaciones[0].lat, ubicaciones[0].lng),
            destination: new google.maps.LatLng(ubicaciones[ubicaciones.length - 1].lat, ubicaciones[ubicaciones.length - 1].lng),
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
          };

          this.directionsService.route(request, (result, status) => {
            if (status === 'OK') {
              this.directionsRenderer.setDirections(result);
            } else {
              console.error('Error al obtener la ruta', status);
            }
          });
        } else {
          console.error('No hay suficientes ubicaciones para trazar una ruta');
        }
      } catch (error) {
        console.error('Error al cargar las ubicaciones', error);
      }
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
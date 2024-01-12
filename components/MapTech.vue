<template>

  <div class="relative z-50 h-screen w-screen">
    
    <l-map ref="map" class="z-0" :zoom="zoom" :center="[-26.52536, -53.8127]">
     <l-control-layers position="topright" ></l-control-layers>
      <l-tile-layer
        url="https://mt3.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
        layer-type="base"
        name="Google Satellite"
      ></l-tile-layer><UBadge>alerta</UBadge>
      <l-geo-json :geojson="limites" :options="options" :options-style="styleFunctionLimites" layer-type="overlay" name="Límites" />
      <l-geo-json :geojson="cuadriculas" :options="options" :options-style="styleFunctionCuadriculas" layer-type="overlay" name="Cuadrículas" />
      <l-geo-json :geojson="fajas" :options="optionsFajas" layer-type="overlay" name="Fajas" />
      <l-geo-json :geojson="areasDegradadas" :options="styleFunctionAreasDeg" layer-type="overlay" name="Áreas degradadas" />
      <l-geo-json :geojson="alertas" :options="optionsAlertasRayos" layer-type="overlay" name="Rayos" />
      <l-geo-json :geojson="alertas" :options="optionsAlertasAlta" layer-type="overlay" name="Alertas probabilidad alta" />
      <l-geo-json :geojson="alertas" :options="optionsAlertasMedia" layer-type="overlay" name="Alertas probabilidad media" />
      <l-geo-json :geojson="alertas" :options="optionsAlertasBajas" layer-type="overlay" name="Alertas probabilidad baja" />
      <l-geo-json :geojson="fotos" :options="optionsFotos" layer-type="overlay" name="Trabajo en campo" />
    </l-map>
  </div>
</template>
<script setup>
import "leaflet/dist/leaflet.css";
import { ref, onMounted } from 'vue';
import { LMap, LTileLayer, LGeoJson, LControlLayers, LIcon } from "@vue-leaflet/vue-leaflet";

const zoom = ref(12);
const limites = ref(null);
const cuadriculas = ref(null);
const fajas = ref(null);
const alertas = ref(null);
const fotos = ref(null);
const areasDegradadas = ref(null);

const onEachFeatureFunction = (feature, layer) => {
  let opciones = { year: 'numeric', month: 'short', day: 'numeric' };
  let fecha = new Date(feature.properties.acq_date).toLocaleDateString('es-AR', opciones);
  layer.bindTooltip('Fecha: ' + fecha, { permanent: false, sticky: true });
};



const onEachFeatureAreasDeg = (feature, layer) => {
  layer.bindPopup(
    'Nombre: ' + feature.properties.Name,
    { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
  );
};

const onEachFeatureFajas = (feature, layer) => {
  layer.bindPopup(
    feature.properties.description,
    { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
  );
};

const styleFunctionLimites = {
  color: 'red',
  weight: 4,
  opacity: 0.7,
  fillOpacity: 0.0,
  interactive: false
};

const styleFunctionCuadriculas = {
  color: 'green',
  weight: 1.5,
  opacity: 0.6,
  fillOpacity: 0.0,
  interactive: true
};

const styleFunctionFajas = {
  color: 'red',
  weight: 2,
  opacity: 0.7,
  fillOpacity: 0.0,
  interactive: true
};

const styleFunctionAreasDeg = {
  color: 'black',
  weight: 2,
  opacity: 0.5,
  fillOpacity: 0.0,
  interactive: true
};
const onEachFeatureFotos = (feature, layer) => {
  if (feature.properties.foto) {
    layer.bindPopup(
      '<img src="/images/rgs1_nov_23/' + feature.properties.foto + '" style="border-radius: 14px; border: 2px solid gray; max-width: auto""/><br/>Nombre: ' + feature.properties.Name + '<br/>Fecha: ' + feature.properties.Date + '',
      { permanent: false, sticky: true, maxWidth: "auto", closeButton: false, className: "popUpClass"}
    );
  }
};
const optionsFotos = {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: new L.Icon({
        'iconUrl': '/images/rgs1_nov_23/' + feature.properties.foto,
        'iconSize': [30, 30],
        'iconAnchor': [13, 27],
        'popupAnchor': [1, -24],
        'className': 'fotosClass'
      })
    });
  },
  onEachFeature: onEachFeatureFotos
};



const fetchData = async () => {
  const config = useRuntimeConfig();
  const fetchGeoJson = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  limites.value = await fetchGeoJson(config.public.url_base + '/capas/limites.geojson');
  cuadriculas.value = await fetchGeoJson(config.public.url_base + '/capas/cuadriculas.geojson');
  fajas.value = await fetchGeoJson(config.public.url_base + '/capas/reforestacion_fajas.geojson');
  fotos.value = await fetchGeoJson(config.public.url_base + '/capas/fotos.geojson');
  alertas.value = await fetchGeoJson('https://script.google.com/macros/s/AKfycbydNCzG37SZ88WEZIoikFGoZTqVNA02CHLbuZtxTO_S3mj-6jJS7he3v3q38-lZ5ghO/exec');
  areasDegradadas.value = await fetchGeoJson(config.public.url_base + '/capas/areas_degradadas.geojson');
};

onMounted(() => {
  fetchData();
});
</script>

<style>
  body {
    margin: 0;
  }
  .leaflet-popup-content {
    width: 250px;
  }
  .fotosClass {
    border-color: rgb(255, 255, 255);
    border-width: 1px;
  }
  .leaflet-popup-content-wrapper, .leaflet-popup-tip{
    color: white;
    background: rgba(0, 0, 0, 0.67);
    box-shadow: inset;
    text-align: left; 
    border: 1cap;
    border-radius: 14px;
  }
  .leaflet-tooltip {
    color: white;
    background: rgba(0, 0, 0, 0.67);
    box-shadow: inset;
    text-align: left; 
    border: 0cap;
    border-radius: 14px;
    padding: 1cap;
  }
  .leaflet-bar a{
    background-color: rgba(0, 0, 0, 0.67);
  }
  .leaflet-bar a span{
    color: white;
  }
  .leaflet-bar a span:hover{
    color: rgba(2, 2, 2, 0.836);
  }
  .leaflet-control-layers {
    background-color: rgba(0, 0, 0, 0.67);
    color: white;
  }
  .popUpClass{
    width: fit-content;
  }
</style>
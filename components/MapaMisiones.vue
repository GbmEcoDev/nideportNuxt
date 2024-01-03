<template>
  <div class="relative z-50 h-screen w-screen">
    <l-map ref="map" :zoom="zoom" :center="[-26.52536, -53.8127]">
      <l-control-layers position="topright" ></l-control-layers>
      <l-tile-layer
        url="https://mt3.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
        layer-type="base"
        name="Google Satellite"
      ></l-tile-layer>
      <l-geo-json 
        :geojson="limites" 
        :options="options" 
        :options-style="styleFunctionLimites" 
        layer-type="overlay" 
        name="Límites" 
      />
      <l-geo-json 
        :geojson="cuadriculas" 
        :options="options" 
        :options-style="styleFunctionCuadriculas" 
        layer-type="overlay" 
        name="Cuadrículas" 
      />
      <l-geo-json 
        :geojson="fajas" 
        :options="options" 
        :options-style="styleFunctionFajas"  
        layer-type="overlay" 
        name="Fajas" 
      />
      <l-geo-json 
        :geojson="alertas" 
        :options="optionsAlertasRayos" 
        :options-style="styleFunctionAlertasRayos" 
        layer-type="overlay" 
        name="Rayos"
      />
      <l-geo-json 
        :geojson="alertas"
        :options="optionsAlertasAlta" 
        :options-style="styleFunctionAlertasAlta" 
        layer-type="overlay" 
        name="Alertas probabilidad alta"
      />
      <l-geo-json 
        :geojson="alertas"
        :options="optionsAlertasMedia" 
        :options-style="styleFunctionAlertasMedia" 
        layer-type="overlay" 
        name="Alertas probabilidad media"
      />
      <l-geo-json 
        :geojson="alertas"
        :options="optionsAlertasBajas" 
        :options-style="styleFunctionAlertasBaja" 
        layer-type="overlay" 
        name="Alertas probabilidad baja"
      />
      <l-geo-json 
        :geojson="fotos" 
        :options="optionsFotos" 
        :options-style="styleFunctionFotos" 
        layer-type="overlay" 
        name="Trabajo en campo"
      />
    </l-map>
  </div>
</template>

<script>

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson, LControlLayers, LIcon } from "@vue-leaflet/vue-leaflet";

export default{
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LControlLayers,
    LIcon
  },
  data() {
    return {
      zoom: 12,
      limites: null,
      cuadriculas: null,
      fajas: null,
      alertas: null,
      fotos: null,
      optionsAlerts: '',
      styleFunction: '',
      styleFunctionLimites:{
        color: 'blue',
        weight: 4,
        opacity: 0.7,
        fillOpacity: 0.0,
        interactive: false
      },
      styleFunctionCuadriculas:{
        color: 'green',
        weight: 1.5,
        opacity: 0.6,
        fillOpacity: 0.0,
        interactive: true
      },
      styleFunctionFajas:{
        color: 'red',
        weight: 2,
        opacity: 0.7,
        fillOpacity: 0.0,
        interactive: true
      }
    };
  },
  computed: {
    optionsFotos() {
      return {
        pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: new L.Icon({
                  'iconUrl': '/images/rgs1_nov_23/'+feature.properties.foto ,
                  'iconSize': [30, 30],
                  'iconAnchor': [13, 27],
                  'popupAnchor':  [1, -24],
                  'className': 'fotosClass'
                })});
            },
        onEachFeature: this.onEachFeatureFotos
    }
    },
    optionsAlertasRayos() {
      return {
        filter: function(feature, layer) {
            if((feature.properties.tipo == 'Rayo')
            && (feature.properties.acq_date >= '2023-11-15')
            && (feature.properties.acq_date <= '2023-12-15')
            ) 
            return true;
        },
        pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: new L.Icon({
                  'iconUrl': '/images/icon/alertas-thunder.svg',
                  'iconSize': [20, 20],
                  'iconAnchor': [0, 0],
                  'popupAnchor':  [1, -24]
                })});
            },
        onEachFeature: this.onEachFeatureFunction
    }
    },
    optionsAlertasBajas() {
      return {
        filter: function(feature, layer) {
            if(feature.properties.tipo == 'Con probabilidad baja') return true;
        },
        pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: new L.Icon({
                  'iconUrl': '/images/icon/alertas-fire-baja.svg',
                  'iconSize': [20, 20],
                  'iconAnchor': [0, 0],
                  'popupAnchor':  [1, -24]
                })});
            },
        onEachFeature: this.onEachFeatureFunction
      }
    },
    optionsAlertasMedia() {
      return {
        filter: function(feature, layer) {
            if(feature.properties.tipo == 'Con probabilidad media') return true;
        },
        pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: new L.Icon({
                  'iconUrl': '/images/icon/alertas-fire-media.svg',
                  'iconSize': [20, 20],
                  'iconAnchor': [0, 0],
                  'popupAnchor':  [1, -24]
                })});
            },
        onEachFeature: this.onEachFeatureFunction
      }
    },
    optionsAlertasAlta() {
      return {
        filter: function(feature, layer) {
            if(feature.properties.tipo == 'Con probabilidad alta') return true;
        },
        pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {icon: new L.Icon({
                  'iconUrl': '/images/icon/alertas-fire-alta.svg',
                  'iconSize': [20, 20],
                  'iconAnchor': [0, 0],
                  'popupAnchor':  [1, -24]
                })});
            },
        onEachFeature: this.onEachFeatureFunction
      }
    },  
    onEachFeatureFunction() {
      return (feature, layer) => {
        let opciones = { year: 'numeric', month: 'short', day: 'numeric' }
        let fecha = new Date(feature.properties.acq_date).toLocaleDateString('es-AR', opciones)
        layer.bindTooltip(
          'Fecha: '+fecha,
          { permanent: false, sticky: true }
        );
      };
    },
    onEachFeatureFotos() {
      return (feature, layer) => {
        if(feature.properties.foto) {
          layer.bindPopup(
          '<img src="/images/rgs1_nov_23/'+feature.properties.foto+'" />',
          { permanent: false, sticky: true }
        );
        }
      };
    }
  },
  async created() {
    const config = useRuntimeConfig();
    const response = await fetch(config.public.url_base + '/capas/limites.geojson')
    const data = await response.json();
    this.limites = data;

    const responseC = await fetch(config.public.url_base + '/capas/cuadriculas.geojson')
    const dataC = await responseC.json();
    this.cuadriculas = dataC;

    const responseF = await fetch(config.public.url_base + '/capas/reforestacion_fajas.geojson')
    const dataF = await responseF.json();
    this.fajas = dataF;

    const responseFo = await fetch(config.public.url_base + '/capas/fotos.geojson')
    const dataFo = await responseFo.json();
    this.fotos = dataFo;

    const responseA = await fetch('https://script.google.com/macros/s/AKfycbydNCzG37SZ88WEZIoikFGoZTqVNA02CHLbuZtxTO_S3mj-6jJS7he3v3q38-lZ5ghO/exec')
    const dataA = await responseA.json();
    this.alertas = dataA;

  }
};
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
</style>
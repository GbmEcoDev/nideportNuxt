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
        :options="optionsFajas" 
        :options-style="styleFunctionFajas"  
        layer-type="overlay" 
        name="Fajas" 
      />
      <l-geo-json 
        :geojson="areasDegradadas" 
        :options="optionsAreasDeg" 
        :options-style="styleFunctionAreasDeg"  
        layer-type="overlay" 
        name="Áreas degradadas" 
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
      areasDegradadas: null,
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
      },
      styleFunctionAreasDeg:{
        color: 'black',
        weight: 2,
        opacity: 0.5,
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
    optionsAreasDeg() {
      return {
        onEachFeature: this.onEachFeatureAreasDeg
      }
    },
    optionsFajas() {
      return {
        onEachFeature: this.onEachFeatureFajas
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
          'Fecha: '+ fecha,
          { permanent: false, sticky: true }
        );
      };
    },
    onEachFeatureFotos() {
      return (feature, layer) => {
        if(feature.properties.foto) {
          layer.bindPopup(
          '<img src="/images/rgs1_nov_23/'+feature.properties.foto+'" style="border-radius: 14px; border: 2px solid gray; max-width: auto""/><br/>Nombre: '+feature.properties.Name+'<br/>Fecha: '+feature.properties.Date+'',
          { permanent: false, sticky: true, maxWidth: "auto", closeButton: false, className: "popUpClass"}
        );
        }
      };
    },
    onEachFeatureAreasDeg() {
      return (feature, layer) => {
          layer.bindPopup(
            'Nombre: '+feature.properties.Name,
          { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
        );
      };
    },
    onEachFeatureFajas() {
      return (feature, layer) => {
          layer.bindPopup(
            feature.properties.description,
          { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
        );
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

    const responseAreas = await fetch(config.public.url_base + '/capas/areas_degradadas.geojson')
    const dataAreas = await responseAreas.json();
    this.areasDegradadas = dataAreas;
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
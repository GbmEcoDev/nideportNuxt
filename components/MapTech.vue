<template>
 
  <div class="relative z-50 h-screen w-screen">

    <l-map ref="map" id="map" class="z-0" :zoom="zoom" :center="center" :options="mapoptions" >
      <l-tile-layer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" layer-type="base" name="Google Satellite" />
      <!-- <UBadge>alert</UBadge> -->
      <l-geo-json :geojson="limites" :options="optionsLimites" :options-style="styleFunctionLimites" layer-type="overlay" name="Límites" :visible=estadoLimites />
    <!--  <l-geo-json :geojson="cuadriculas" :options="optionsCuadriculas" :options-style="styleFunctionCuadriculas" layer-type="overlay" name="Cuadrículas" :visible=estadoCuadriculas /> -->
      <l-geo-json :geojson="fajas" :options="optionsFajas" :options-style="styleFunctionFajas" layer-type="overlay" name="Fajas" :visible=estadoFajas />
      <l-geo-json :geojson="areasDegradadas" :options="optionsAreasDeg" :options-style="styleFunctionAreasDeg" layer-type="overlay" name="Áreas degradadas" :visible=estadoAreasDeg />
      <l-geo-json :geojson="alertas" :options="optionsAlertasRayos" layer-type="overlay" name="Rayos" :visible=estadoRayos />
      <l-geo-json :geojson="alertas" :options="optionsAlertasAlta" layer-type="overlay" name="Alertas probabilidad alta" :visible=estadoAlta />
      <!-- <l-geo-json :geojson="alertas" :options="optionsAlertasMedia" layer-type="overlay" name="Alertas probabilidad media" :visible=estadoMedia />
      <l-geo-json :geojson="alertas" :options="optionsAlertasBajas" layer-type="overlay" name="Alertas probabilidad baja" :visible=estadoBaja /> -->
      <l-geo-json :geojson="fotos" :options="optionsFotos" layer-type="overlay" name="Trabajo en campo" :visible=estadoFotos />
      <l-geo-json :geojson="pois" :options="optionsPois" layer-type="overlay" name="Ubicaciones destacadas" :visible=estadoPois />
      <l-geo-json :geojson="caminos" :options="optionsCaminos" :options-style="styleFunctionCaminos" layer-type="overlay" name="Caminos principales" :visible=estadoCaminos />
      <l-geo-json :geojson="hidrografia" :options="optionsHidro" :options-style="styleFunctionHidro" layer-type="overlay" name="Hidrografía" :visible=estadoHidro />
    </l-map>
    <UNotification class="absolute w-40 right-0 top-0 z-1001 m-4" :id="idToShow" :title="showLastSixDigits(idToShow)" 
    icon="i-heroicons-command-line"
    v-show="idToShow !== null && isNotificationVisible"
    color="primary"
    variant="solid"
    :timeout="5000"
    :close-button="{ icon: 'i-heroicons-archive-box-x-mark', color: 'primary', variant: 'outline', padded: true, size: '2xs', ui: { rounded: 'rounded-full' },onClick: closeNotification }"
    />
  </div>
</template>
<script setup>
import "leaflet/dist/leaflet.css";
import { ref, onMounted , watch } from 'vue';
import { LMap, LTileLayer, LGeoJson , LPopup } from "@vue-leaflet/vue-leaflet";
const config = useRuntimeConfig();
const urlImg = config.public.url_base;
const isNotificationVisible = ref(false);

// Definir la prop para recibir el ID
const props = defineProps(['fotoId', 'estadoLimites' , 'limites' , 'estadoFajas' , 'estadoAreasDeg' , 'estadoRayos' , 'estadoAlta' , 'estadoFotos' , 'estadoPois' , 'estadoCaminos' , 'estadoHidro' ]);

const featureByName = ref([])
const map = ref(null)

// Usar ref para almacenar el ID recibido
const idToShow = ref(props.fotoId);

 // Arreglo para acortar string
 function showLastSixDigits(id) {
  const idString = id.toString();
  const lastSixDigits = idString.slice(-6);
  return `...${lastSixDigits}`;
}

// Cerrar UNotification
const closeNotification = () => {
  isNotificationVisible.value = false;
};

const zoom = ref(11);
const center = ref([-26.52536, -53.91])
const limites = ref(null);
// const cuadriculas = ref(null);
const fajas = ref(null);
const alertas = ref(null);
const fotos = ref(null);
const areasDegradadas = ref(null);
const pois = ref(null)
const caminos = ref(null)
const hidrografia = ref(null)

const mapoptions = {
  zoomControl: false
}

// Límites----------------------------------------
const styleFunctionLimites = {
  color: 'blue',
  weight: 4,
  opacity: 0.7,
  fillOpacity: 0.0,
  interactive: false
};

// Cuadrículas------------------------------------
/* const styleFunctionCuadriculas = {
  color: 'gray',
  weight: 1.5,
  opacity: 0.6,
  fillOpacity: 0.0,
  interactive: true
}; */

// Áreas donde se refoesta mediante método de Faja
const styleFunctionFajas = {
  color: 'green',
  weight: 2,
  opacity: 0.7,
  fillOpacity: 0.0,
  interactive: true
};
const optionsFajas = {
  onEachFeature: (feature, layer) => {
  layer.bindPopup(
    feature.properties.description,
    { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
  );
}
};

// Areas degradadas ------------------------------
const styleFunctionAreasDeg = {
  color: 'red',
  weight: 2,
  opacity: 0.5,
  fillOpacity: 0.0,
  interactive: true
};
const optionsAreasDeg = {
  onEachFeature: (feature, layer) => {
    layer.bindPopup(
      'Nombre: ' + feature.properties.Name,
      { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
    )
  }
}

// Fotos de trabajo en campo ----------------------
const optionsFotos = {
  pointToLayer: function(feature, latlng) {
  if (feature.properties.ubicacion === 'externo'){
    return L.marker(latlng, {
      icon: new L.Icon({
        'iconUrl': '/images/rgs1_nov_23/' + feature.properties.foto,
        'iconSize': [30, 30],
        'iconAnchor': [13, 27],
        'popupAnchor': [1, -24],
        'className': 'fotosClass'
      })
    });
  } else {
    return L.marker(latlng, {
      icon: new L.Icon({
        'iconUrl': '/images/rgs1_nov_23/' + feature.properties.foto,
        'iconSize': [30, 30],
        'iconAnchor': [13, 27],
        'popupAnchor': [1, -24],
        'className': 'fotosClass2'
      })
    });
  }
  },
  onEachFeature: (feature, layer) => {
    featureByName[feature.properties.ID] = layer;
    if (feature.properties.foto) {
        layer.bindPopup(
          '<img src="' + urlImg + '/images/rgs1_nov_23/' + feature.properties.foto + '" style="border-radius: 14px; border: 2px solid gray; max-width: auto""/><br/>Nombre: ' + feature.properties.Name + '<br/>Fecha: ' + feature.properties.Date + '',
          { permanent: false, sticky: true, maxWidth: "auto", closeButton: false, className: "popUpClass"}
        );
    }

  }
};


// OnEach para Alertas
const onEachFeatureFunction = (feature, layer) => {
        let opciones = { year: 'numeric', month: 'short', day: 'numeric' }
        let fecha = new Date(feature.properties.acq_date).toLocaleDateString('es-AR', opciones)
        layer.bindTooltip('Fecha: '+ fecha, { permanent: false, sticky: true });
      };

// Alertas por rayos -----------------------------
const optionsAlertasRayos = {
  filter: function(feature, layer) {
      if((feature.properties.tipo == 'Rayo')
      && (feature.properties.acq_date >= '2023-12-15')
      && (feature.properties.acq_date <= '2024-01-15')
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
  onEachFeature: onEachFeatureFunction
}

// Alertas Baja probailidad  ----------------------
/* const optionsAlertasBajas = {
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
  onEachFeature: onEachFeatureFunction
}

// Alertas probailidad media ----------------------
const optionsAlertasMedia = {
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
  onEachFeature: onEachFeatureFunction
} */

// Alertas probailidad alta ----------------------
const optionsAlertasAlta = {
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
  onEachFeature: onEachFeatureFunction
}

// Puntos destacados con videos
const optionsPois = {
  pointToLayer: function(feature, latlng) {
          return L.marker(latlng, {icon: new L.Icon({
            'iconUrl': "/images/icon/location-forest.svg",
            'iconSize': [30, 85]
        })} )
      },
  onEachFeature: (feature, layer) => {
      layer.bindPopup(
        '<div class="widget popupDetailsVideo"><h3>'+feature.properties.Name+'</h3><div class="video"><iframe width="100%" heigth="100%" src="/video/'+feature.properties.video+'.mp4?autoplay=1" frameborder="0" allowfullscreen></iframe></div></div>',
        { permanent: false, sticky: true, maxWidth: "auto", closeButton: false, className: "popUpClass"}
      );
  }
}

// Caminos principales
const styleFunctionCaminos ={
  color: 'rgba( 255, 175, 51, 0.5)',
  weight: 4,
  opacity: 0.5,
//  fillOpacity: 0.0,
  interactive: true
};

const optionsCaminos = {
  onEachFeature: (feature, layer) => {
      layer.bindPopup(
        feature.properties.Name,
        { permanent: false, sticky: true, maxWidth: "auto", closeButton: false, className: "popUpClass"}
      );
  }
}

// Hifrografía
 const styleFunctionHidro = (feature)=> 
    { 
      if (feature.properties.tipo == 'Río') { 
        return {
          color:'rgba(0,0,255,0.6)',
          weight: 2,
          opacity: 0.7,
          interactive: true
        }
      } else if (feature.properties.tipo == 'Arroyo') {
        return {
          color:'rgba(0,135,255,0.6)',
          weight: 2,
          opacity: 0.7,
          interactive: true
        }
      } else {
        return {
          color:'rgba(0,197,255,0.6)',
          weight: 2,
          opacity: 0.7,
          interactive: true
        }
      }

};
 
const optionsHidro = {
  onEachFeature: (feature, layer) => {
      layer.bindPopup(
        feature.properties.KEY,
        { permanent: false, sticky: true, maxWidth: "auto", closeButton: false, className: "popUpClass"}
      );
  }
}

const fetchData = async () => {
  const config = useRuntimeConfig();
  const fetchGeoJson = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  limites.value = await fetchGeoJson(config.public.url_base + '/capas/limites.geojson');
//  cuadriculas.value = await fetchGeoJson(config.public.url_base + '/capas/cuadriculas.geojson');
  fajas.value = await fetchGeoJson(config.public.url_base + '/capas/reforestacion_fajas.geojson');
  fotos.value = await fetchGeoJson(config.public.url_base + '/capas/fotos.geojson');
  alertas.value = await fetchGeoJson('https://script.google.com/macros/s/AKfycbydNCzG37SZ88WEZIoikFGoZTqVNA02CHLbuZtxTO_S3mj-6jJS7he3v3q38-lZ5ghO/exec');
  areasDegradadas.value = await fetchGeoJson(config.public.url_base + '/capas/areas_degradadas.geojson');
  pois.value = await fetchGeoJson(config.public.url_base + '/capas/pois.geojson');
  caminos.value = await fetchGeoJson(config.public.url_base + '/capas/caminos.geojson');
  hidrografia.value = await fetchGeoJson(config.public.url_base + '/capas/hidrografia.geojson');
};

onMounted(() => {
  fetchData();

});

const navigateTo = async (idFoto) => {

  center.value = featureByName[idFoto].getLatLng();
  zoom.value = 21;

  /* 
    '<img src="' + urlImg + '/images/rgs1_nov_23/' + featureByName[idFoto].properties.foto + '" style="border-radius: 14px; border: 2px solid gray; max-width: auto""/><br/>Nombre: ' + featureByName[idFoto].properties.Name + '<br/>Fecha: ' + featureByName[idFoto].properties.Date + '',
    { permanent: false, sticky: true, maxWidth: "auto", closeButton: false, className: "popUpClass"} 
  */
  
}

// Acciones a realizar cuando cambia el ID
watch( () => props.fotoId, (newValue, oldValue) =>  {
  idToShow.value = newValue;
  isNotificationVisible.value = true;
 
  if ( isNotificationVisible) {
      setTimeout(() => {
      closeNotification();
    }, 1000);
  }

  navigateTo(props.fotoId) 
}, { immediate: true });

defineExpose( { map , featureByName , navigateTo } )
</script>

<style>
  body {
    margin: 0;
  }
  .leaflet-popup-content {
    width: 250px;
  }
  .fotosClass2 {
    border-color: rgb(255, 255, 255);
    border-width: 1px;
  }
  .fotosClass {
    border-color: rgb(255, 255, 255);
    border-width: 1px;
    animation: pulse-animation 1s infinite;
  }
  @keyframes pulse-animation {
    0% {
      box-shadow: 0 0 0 10px rgb(255, 255, 255, 0.6);
    }
    100% {
      box-shadow: 0 0 0 30px rgba(255, 255, 255, 0);
    }
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
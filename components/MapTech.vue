<template>
 
  <div class="relative z-50 lg:w-screen lg:h-full xs:h-2/3 overflow-hidden">
    <l-map ref="map" id="map" class="z-0" :zoom="zoom" :center="center" :bounds="bounds" :options="mapoptions" >
      <l-tile-layer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" layer-type="base" name="Google Satellite" />
      <l-geo-json :geojson="limites" :options="optionsLimites" :options-style="styleFunctionLimites" layer-type="overlay" name="Límites" :visible=estadoLimites />
     <l-geo-json :geojson="fajas" :options="optionsFajas" :options-style="styleFunctionFajas" layer-type="overlay" name="Fajas" :visible=estadoFajas />
      <l-geo-json :geojson="areasArestaurar" :options="optionsArestaurar" :options-style="styleFunctionAreasRest" layer-type="overlay" name="Áreas a restaurar" :visible=estadoAreasArest />>
      <l-geo-json :geojson="fotos" :options="optionsFotos" layer-type="overlay" name="Trabajo en campo" :visible=estadoFotos />
      <l-geo-json :geojson="degradadas" :options="optionsDegradadas" :options-style="styleFunctionDegradadas" layer-type="overlay" name="Áreas degradadas" :visible=estadoDegradadas />
      <!-- <l-geo-json :geojson="pois" :options="optionsPois" layer-type="overlay" name="Ubicaciones destacadas" :visible=estadoPois /> -->
      <l-geo-json :geojson="caminos" :options="optionsCaminos" :options-style="styleFunctionCaminos" layer-type="overlay" name="Caminos principales" :visible=estadoCaminos />
      <l-geo-json :geojson="hidrografia" :options="optionsHidro" :options-style="styleFunctionHidro" layer-type="overlay" name="Hidrografía" :visible=estadoHidro />
      <l-geo-json :geojson="fueraProyecto" :options-style="styleFunctionFuera" layer-type="overlay" name="Fuera de proyecto" :visible=estadoFueraProy />
    </l-map>
  </div>
</template>
<script setup>
import "leaflet/dist/leaflet.css";
import { ref, onMounted , watch, computed } from 'vue';
import { LMap, LTileLayer, LGeoJson , LPopup } from "@vue-leaflet/vue-leaflet";
const config = useRuntimeConfig();
const { isMobile } = useDevice();

const urlImg = config.public.url_base;

const props = defineProps(['fotoId','areaId','fajaId','resetMap', 'estadoLimites' , 'limites' , 'estadoFajas' , 'estadoAreasArest' , 'estadoAlta' , 'estadoFotos' , 'estadoCaminos' , 'estadoHidro' , 'estadoDegradadas' , 'estadoFueraProy' ]);

const featureByName = ref([])
const featureByArea = ref([])
const featureByFaja = ref([])
const map = ref(null)
const bounds = ref(null)
const zoom = ref(11);
if(isMobile){
 zoom.value = 10;
}
const center = ref([-26.52536, -53.91])

 // Usar ref para almacenar el ID recibido
const idToShow = ref(props.fotoId);
const idAreaShow = ref(props.areaId);
const idFajaShow = ref(props.fajaId);
const resetedMap = ref(false);
//capas
const limites = ref(null);
const fajas = ref(null);
//const alertas = ref(null);
const fotos = ref(null);
const areasArestaurar = ref(null);
//const pois = ref(null)
const caminos = ref(null)
const hidrografia = ref(null)
const degradadas = ref(null)
const fueraProyecto = ref(null)
const openPanel = ref(false)
const openPanelArea = ref(false)
const mapoptions = {
zoomControl: false
}
// Límites----------------------------------------
const styleFunctionLimites = {
  color: 'white',
  weight: 2,
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
  color: 'rgb(112, 176, 85)',
  fillColor: 'rgb(112, 176, 85)',
  fillOpacity: 0.3,
  weight: 2,
  opacity: 0.6,
  interactive: true
};
const optionsFajas = {
  onEachFeature: (feature, layer) => {
    featureByFaja[feature.properties.id] = layer;
  layer.bindPopup(
    feature.properties.description,
    { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
  );
}
};

// Areas degradadas ------------------------------
/* const styleFunctionAreasDeg = {
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
}; */
// Areas a restaurar ------------------------------
const styleFunctionAreasRest  = (feature)=> 
    { 
      if (feature.properties.etapa == 'Etapa 2') { 
        return {
          color:'rgb(192, 209, 53)',
          fillColor: 'rgb(192, 209, 53)' ,
          fillOpacity: 0.3,
          weight: 1,
          opacity: 0.3,
          interactive: true
        }
      } else if (feature.properties.etapa == 'Etapa 3') {
        return {
          color:'rgb(217, 177, 42)',
          fillColor: 'rgb(217, 177, 42)' ,
          fillOpacity: 0.4,
          weight: 1,
          opacity: 0.3,
          interactive: true
        }
      } else if (feature.properties.etapa == 'Etapa 4') {
        return {
          color:'rgb(233, 118, 24)',
          fillColor: 'rgb(233, 118, 24)' ,
          fillOpacity: 0.4,
          weight: 1,
          opacity: 0.3,
          interactive: true
        }
      }

};
const optionsArestaurar = {
  onEachFeature: (feature, layer) => {
    featureByArea[feature.properties.ID] = layer;
    layer.bindPopup(
      'Nombre: ' + feature.properties.Name + '<br> Etapa: ' + feature.properties.etapa,
      { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
    )
  }
}

// Areas degradadas ------------------------------
const styleFunctionDegradadas  = (feature)=> 
    { 
        return {
          color:'gray',
          fillColor: 'gray' ,
          fillOpacity: 0.4,
          weight: 3,
          opacity: 0.2,
          interactive: true
        }
};

const optionsDegradadas = {
  onEachFeature: (feature, layer) => {
    layer.bindPopup(
      'Nombre: ' + feature.properties.name + '<br> Tipo: ' + feature.properties.nombre,
      { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
    )
  }
}

// Areas degradadas ------------------------------
const styleFunctionFuera  = (feature)=> 
    { 
        return {
          color:'rgb(44,44,44)',
          fillColor: 'rgb(44,44,44)' ,
          fillOpacity: 0.8,
          weight: 1,
          opacity: 0.2,
          interactive: true
        }
};

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
        if(isMobile){
         layer.bindPopup(
          '<img src="' + urlImg + '/images/rgs1_nov_23/' + feature.properties.foto + '" style="border-radius: 14px; border: 2px solid gray; max-width: auto""/><br/>Nombre: ' + feature.properties.Name + '<br/>Fecha: ' + feature.properties.Date + '',
          { permanent: false, sticky: true, maxWidth: "auto", closeButton: false, className: "popUpClass"}
        )
        }else{
        layer.on('click', () => selectItem(openPanel, feature.properties.ID)); 
    }
  }
    
  }
};

// OnEach para Alertas
/* const onEachFeatureFunction = (feature, layer) => {
        let opciones = { year: 'numeric', month: 'short', day: 'numeric' }
        let fecha = new Date(feature.properties.acq_date).toLocaleDateString('es-AR', opciones)
        layer.bindTooltip('Fecha: '+ fecha, { permanent: false, sticky: true });
      }; */

// Alertas por rayos -----------------------------
/* const optionsAlertasRayos = {
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
} */

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
/* const optionsAlertasAlta = {
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
} */

// Puntos destacados con videos
/* const optionsPois = {
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
} */

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
  //alertas.value = await fetchGeoJson('https://script.google.com/macros/s/AKfycbydNCzG37SZ88WEZIoikFGoZTqVNA02CHLbuZtxTO_S3mj-6jJS7he3v3q38-lZ5ghO/exec');
  //areasDegradadas.value = await fetchGeoJson(config.public.url_base + '/capas/areas_degradadas.geojson');
  areasArestaurar.value = await fetchGeoJson(config.public.url_base + '/capas/areas_arestaurar24_32.geojson');
  //pois.value = await fetchGeoJson(config.public.url_base + '/capas/pois.geojson');
  caminos.value = await fetchGeoJson(config.public.url_base + '/capas/caminos.geojson');
  hidrografia.value = await fetchGeoJson(config.public.url_base + '/capas/hidrografia.geojson');
  degradadas.value = await fetchGeoJson(config.public.url_base + '/capas/areas_degradadas.geojson');
  fueraProyecto.value = await fetchGeoJson(config.public.url_base + '/capas/fuera_de_proyecto.geojson');
};

onMounted(() => {
  fetchData();
});

// Acciones a realizar cuando se desea resetear el centro y zoom del map
/*  const needsRepositioning = computed(() => {
  return props.resetMap || resetedMap.value;
});

const resetMapTo = async () => {
  if (needsRepositioning.value) {
    center.value = [-26.52536, -53.91];
    zoom.value = 11;
    resetedMap.value = false;
    props.resetMap = false;
  }
};

watch(() => {
  // Se agrega resetedMap.value a la dependencia
  return props.resetMap || resetedMap.value;
}, resetMapTo); */

watch(() => props.resetMap, (newValue) => {
  if (newValue) {
    center.value = [-26.52536, -53.91];
    zoom.value = 11;
    resetedMap.value = false;
    props.resetMap = false;
    emit('falsear-reset', false);
  }
});


// Acciones a realizar cuando cambia el ID de area
const navigateTo = async (idArea) => {
 
  if(featureByArea[idArea]){
   bounds.value = featureByArea[idArea].getBounds().pad(.5);
   zoom.value=18;
  }
  }

watch( 
  () => props.areaId, 
  (newValue, oldValue) =>  {
    idAreaShow.value = newValue;
    navigateTo(props.areaId);

    if (newValue && featureByArea[newValue]) {
      const feature = featureByArea[newValue].feature;
      if (feature.properties.Name) {
        if (isMobile) {
          featureByArea[newValue]
            .bindPopup(
              'Nombre: ' + feature.properties.Name + '<br> Etapa: ' + feature.properties.etapa,
              { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
            )
            .openPopup();
        } else {
          //abrimos panel con datos del area
           featureByArea[newValue].on("click", () =>
            selectItemArea(openPanelArea, feature.properties.ID)
          );
        }
      }
    }
    
}, { immediate: true }); 


 // Acciones a realizar cuando cambia el ID de area
 const navigateFajaTo = async (idFaja) => {
 
  if(featureByFaja[idFaja]){
  bounds.value = featureByFaja[idFaja].getBounds().pad(.5);
  zoom.value=18;
  }
  }
  
watch( 
  () => props.fajaId, 
  (newValue, oldValue) =>  {
    idFajaShow.value = newValue;
    navigateFajaTo(props.fajaId);
    if (newValue && featureByFaja[newValue]) {
      const feature = featureByFaja[newValue].feature;
      if (feature.properties.Name) {
        if (isMobile) {
          featureByFaja[newValue]
            .bindPopup(
              'Nombre: ' + feature.properties.nombre + '<br> descripcion: ' + feature.properties.descripcion,
              { permanent: false, sticky: true, maxWidth: "auto", closeButton: false }
            )
            .openPopup();
        } else {
          //abrimos panel con datos del area
           featureByFaja[newValue].on("click", () =>
            selectItemFaja(openPanelFaja, feature.properties.id)
          );
        }
      }
    }
    
}, { immediate: true }); 

// Acciones a realizar cuando cambia el ID de foto
const flyTo = async (idFoto) => {
    if(featureByName[idFoto]){
    zoom.value=21;
    if(isMobile){
    const { lat, lng } = featureByName[idFoto].getLatLng();
    const newLat = lat + 0.001;
    center.value = [newLat, lng];
    }else{
      center.value = featureByName[idFoto].getLatLng();
    }
  }
}

watch(
  () => props.fotoId,
  (newValue, old) => {
    idToShow.value = newValue;
    flyTo(props.fotoId);
    //aca activo popup con info
    if (newValue && featureByName[newValue]) {
      const feature = featureByName[newValue].feature;
      if (feature.properties.foto) {
        if (isMobile) {
          featureByName[newValue]
            .bindPopup(
              `<img src="${urlImg}/images/rgs1_nov_23/${feature.properties.foto}" style="border-radius: 14px; border: 2px solid gray; max-width: auto" /><br/>Nombre: ${feature.properties.Name}<br/>Fecha: ${feature.properties.Date}`,
              {
                permanent: false,
                sticky: true,
                maxWidth: "auto",
                closeButton: false,
                className: "popUpClass",
              }
            )
            .openPopup();
            zoom.value=21;
        } else {
          featureByName[newValue].on("click", () =>
            selectItem(openPanel, feature.properties.ID)
          );
        }
      }
    }
  },
  { immediate: true }
);

defineExpose( { map , featureByName, featureByArea, featureByFaja , navigateTo, navigateFajaTo } );
  //get data item    
  const emit = defineEmits(['open-panel','open-panel-area','open-panel-faja', 'propsDetalle']);
  const selectItem = (openPanel, ID) => {
    emit('propsDetalle', ID);
    emit('open-panel',openPanel.value=true);
  };
  const selectItemArea = (openPanelArea, ID) => {
    emit('open-panel-area',openPanelArea.value=true);
  };
  const selectItemFaja = (openPanelFaja, ID) => {
    emit('open-panel-faja',openPanelFaja.value=true);
  };
  
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
      box-shadow: 0 0 0 5px rgb(255, 255, 255, 0.6);
    }
    100% {
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
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
<template>
  <div class="map-container">
    <div id="gaodeMap">
      <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
    </div>
    <div id="GaodeMap">
      <div id="popup2" class="ol-popup">
        <a href="#" id="popup-closer2" class="ol-popup-closer"></a>
        <div id="popup-content2"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'GaodeMap',
  data() {
    return {
      gaodeMap: null,
      GaodeMap: null
    } 
  },    
  mounted() {
    // 普通高德地图
    this.gaodeMap = new hdmap.initMap({
      gisEngine: 'gaode',
      domId: 'gaodeMap',
      // mapUrl: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=7',
      mapUrl: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
      sat: 0,
      center: [113.264385,23.129112],
      popupDom: {
        popup: 'popup',
        popupcloser: 'popup-closer',
        popupcontent: 'popup-content'
      }
    })

    // 高德卫星图
    this.GaodeMap = new hdmap.initMap({
      gisEngine: 'gaode',
      domId: 'GaodeMap',
      satUrl: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6',
      sat:1,
      center: [113.264385,23.129112],
    popupDom: { popup: 'popup2', popupcloser: 'popup-closer2', popupcontent: 'popup-content2' }
    })
  }
}
</script>
<style scoped>
.map-container {
  width: 80%;
  height: 1000px;
  position: relative;
}
#gaodeMap {
  height: 50%;
}
#GaodeMap {
  height: 50%;
}
</style>

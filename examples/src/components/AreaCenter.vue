<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  import mapImg from '@/assets/images/u768.jpg'
  import markerImg from '@/assets/images/icon.png'
  export default {
    name: 'TestMap',
    data() {
      return {
        polyCoords2: [
          [
            [-42.5, 94.9375],
            [-41.5, 33.9375],
            [-151, 39.4375],
            [-151.5, 99.4375],
            [-68.5, 112.9375],
            [-42.5, 93.9375]
          ]
        ],
      }
    },
    mounted() {
      // eslint-disable-next-line
      // 初始化一个地图
      this.bitmap = new hdmap.initMap({
        gisEngine: 'bitmap',
        sizeW: 1920,
        sizeH: 1080,
        domId: 'bitmap',
        mapUrl: mapImg,
        maxZoom: 7,
        minZoom: 3,
        center: [112.334403, 39.8],
        popupDom: {
          popup: 'popup',
          popupcloser: 'popup-closer',
          popupcontent: 'popup-content'
        }
      })
      // debugger
      var areaInfo = {
        id: 111,
        name: 'eastArea',
        areaType: '01',
        borderPoints: this.polyCoords2
      }
      this.bitmap.addArea(areaInfo)
      // console.log(this.bitmap);
      // 固定地图显示区域不收鼠标事件影响
      var that = this.bitmap
      this.bitmap.getMap().on('precompose', function () {
        // console.log(this);
        that.updateArea(areaInfo, hdmap.commonConfig.getMouseOverAreaStyle())
      })
      let id = new Date().valueOf()
      var areaCenter = hdmap.utils.getAreaCenter(this.polyCoords2[0]) //获取重心坐标
      var cameraCountPoint = hdmap.utils.getCameraCountPoint(this.polyCoords2[0]) //获取摄像头坐标
      var broadcastCountPoint = hdmap.utils.getBroadcastCountPoint(this.polyCoords2[0]) //获取广播坐标
      var warningConutPoint = hdmap.utils.getWarningConutPoint(this.polyCoords2[0]) //获取报警坐标

      // 添加点位
      this.bitmap.addMarker({
        id: 111,
        position: areaCenter,
        markerType: 'camera',
        name: "long3",
        imgUrl: markerImg,
        size: [32, 48]
      })
      this.bitmap.addMarker({
        id: 222,
        position: cameraCountPoint,
        markerType: 'cleaner',
        name: "long2",
        imgUrl: markerImg,
        size: [32, 48]
      })
      this.bitmap.addMarker({
        id: 333,
        position: broadcastCountPoint,
        markerType: 'guarder',
        name: "long1",
        imgUrl: markerImg,
        size: [32, 48]
      })
      this.bitmap.addMarker({
        id: 444,
        position: warningConutPoint,
        markerType: 'video',
        name: "long4",
        imgUrl: markerImg,
        size: [32, 48]
      })

    },
    methods: {

    }
  }
</script>
<style scoped>
</style>
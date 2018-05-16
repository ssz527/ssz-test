<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <el-button type="success" @click="openClick">点击开启zoom改变事件</el-button>
    <el-button type="success" @click="getVisibleAreaCenter">获取地图可视区域中心</el-button>
  </div>
</template>
<script>
/* eslint-disable */
import mapImg from '@/assets/images/u768.jpg'
import markerImg from '@/assets/images/icon.png'
export default {
  name: 'TestMap',
  data () {
    return {
      info: null,
      center: null,
      trianglePoint: null,
      areaCenter: null,
      polyCoords1: [
        [
          [9000, -3000],
          [9000, -3500],
          [9500, -3500],
          [9500, -3000],
          [9000, -3000]
        ]
      ],
      polyCoords2: [
        [
          // [-31.260024, 80.634982],
          // [-28.447524, -89.052518],
          // [231.239976, -83.427518],
          // [226.552476, 80.634982],
          // [210.614976, 81.572482],
          // [218.114976, -67.490018],
          // [-11.572524, -72.177518],
          // [-12.510024, 78.759982],
          // [-31.260024, 80.634982]
          // [-329.0625, 198.75],
          // [-428.4375, -97.5],
          // [-383.4375, -112.5],
          // [-272.8125, 213.75],
          // [-329.0625, 198.75],
          [-417.523148, 38.078704],
          [-160.648148, 165.578704],
          [-70.648148, -156.921296],
          [-181.273148, 94.328704],
          [-417.523148, 38.078704]
          // [355.353886, 86.653912],
          // [334.728886, 71.653912],
          // [372.228886, 71.653912],
          // [355.353886, 86.653912]
        ]
      ],
    }
  },
  mounted () {
    // eslint-disable-next-line
    // 初始化一个地图
    // this.bitmap = new hdmap.initMap({
    //   gisEngine: 'bitmap',
    //   sizeW: 1920,
    //   sizeH: 1080,
    //   domId: 'bitmap',
    //   mapUrl: mapImg,
    //   maxZoom: 7,
    //   minZoom: 3,
    //   center: [112.334403, 39.8],
    //   popupDom: {
    //     popup: 'popup',
    //     popupcloser: 'popup-closer',
    //     popupcontent: 'popup-content'
    //   }
    // })
     this.bitmap = new hdmap.initMap({
      gisEngine: 'tile',
      sizeW: 13623,
      sizeH: 9796,
      domId: 'bitmap',
      mapUrl: 'http://zc200008pc1.hdsc.com/hdyj/',
      minZoom: 0,
      maxZoom: 6,
      center: [0, 0],
      centerGPS: [113.619942, 23.304629],
      scale: 1.21,
      scaleType: 1,
      arcAngle: 1.2 // 弧度值
    })
    this.bitmap._map.updateSize()
    console.log(this.bitmap)
    var areaInfo = {
      id: 111,
      name: 'eastArea',
      areaType: '01',
      borderPoints: this.polyCoords2
    }
    var areaInfo11 = {
      id: 11222,
      name: 'eastArea111',
      areaType: '02',
      borderPoints: this.polyCoords1
    }
    this.info = areaInfo11
    this.bitmap.addArea(areaInfo)
    this.bitmap.addArea(areaInfo11)
    // console.log(this.bitmap);
    // 固定地图显示区域不收鼠标事件影响
    var that = this.bitmap
    this.bitmap.getMap().on('precompose', function () {
      that.updateArea(areaInfo, hdmap.commonConfig.getMouseOverAreaStyle())
      that.updateArea(areaInfo11, hdmap.commonConfig.getMouseOverAreaStyle())
    })
    let id = new Date().valueOf()
    // var areaCenter = hdmap.utils.getAreaCenter(this.polyCoords2[0]) //获取重心坐标
    // this.areaCenter = areaCenter
    var trianglePoint = hdmap.utils.getAreaCenter(this.polyCoords1[0]) //获取三角形重心坐标
    this.trianglePoint = trianglePoint
    var cameraCountPoint = hdmap.utils.getCameraCountPoint(this.polyCoords2[0]) //获取摄像头坐标
    // console.log(cameraCountPoint);
    var broadcastCountPoint = hdmap.utils.getBroadcastCountPoint(this.polyCoords2[0]) //获取广播坐标
    var warningConutPoint = hdmap.utils.getWarningConutPoint(this.polyCoords2[0]) //获取报警坐标
    // // var res = hdmap.utils.judgePointInsidePolygon(cameraCountPoint, this.polyCoords2[0])
    // var minDistance = hdmap.utils.getMinDistance(this.polyCoords2[0])
    // console.log(res);
    // console.log(minDistance);
    // 添加点位
    // this.bitmap.addMarker({
    //   id: 111,
    //   position: areaCenter,
    //   markerType: 'camera',
    //   name: "long3",
    //   imgUrl: markerImg,
    //   size: [32, 48]
    // })
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
    openClick () {
      this.bitmap.regEventListener('zoomChange', (e) => {
        console.log(e)
      })
    },
    getVisibleAreaCenter () {
      this.bitmap.regEventListener('moveend', (e) => {
        var center = hdmap.utils.getVisibleAreaCenter(this.bitmap)
        this.bitmap.addMarker({
          id: 555,
          position: center,
          markerType: 'video',
          name: "long5",
          imgUrl: markerImg,
          size: [32, 48]
        })
        // var res = hdmap.utils.pointTransboundary(this.bitmap, this.info.id, center)
        var res = hdmap.utils.judgePointInsidePolygon(center, this.polyCoords1[0])
        console.log(res)
      })
    }
  }
}
</script>
<style scoped>

</style>
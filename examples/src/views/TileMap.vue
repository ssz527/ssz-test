<template>
  <div class="container">
    <div id="tilemap">
    </div>
    <el-button type="success" @click="getVisibleAreaCenter">获取地图可视区域中心</el-button>
    <h1>Center postion of view:{{center}}</h1>
  </div>
</template>
<script>
import markerImg from '@/assets/images/icon.png'
export default {
  data () {
    return {
      mapObj: {},
      center: [0, 0]
    }
  },
  mounted () {
    // 切片地图控制部分
    // eslint-disable-next-line
    this.mapObj = new hdmap.initMap({
      gisEngine: 'tile',
      sizeW: 13623,
      sizeH: 9796,
      domId: 'tilemap',
      mapUrl: 'http://zc200008pc1.hdsc.com/hdyj/',
      maxZoom: 6,
      minZoom: 0,
      center: [0, 0],
      centerGPS: [113.619942, 23.304629],
      scale: 1.21,
      scaleType: 1,
      arcAngle: 1.2 // 弧度值
    })
    this.mapObj._map.updateSize()
    this.mapObj.regEventListener('zoomChange', (e) => {
      console.log(e)
    })
    this.getVisibleAreaCenter()
  },
  methods: {
    getVisibleAreaCenter () {
      let that = this
      this.mapObj.regEventListener('moveend', (e) => {
        var center = hdmap.utils.getVisibleAreaCenter(this.mapObj)
        that.center = center
        this.mapObj.addMarker({
          id: 555,
          position: center,
          markerType: 'video',
          name: 'long5',
          imgUrl: markerImg,
          size: [32, 48]
        })
      })
    }
  }
}
</script>

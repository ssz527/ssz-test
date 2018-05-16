<template>
  <div class="map-container">
    <div id="map1"></div>
    <el-button @click="createMap(1)">加载地图</el-button>
    <el-input v-model="pro1" placeholder="请输入内容"></el-input>
    <el-input v-model="d1" placeholder="请输入内容"></el-input>
    <div id="map2"></div>
    <el-button @click="createMap(2)">加载地图</el-button>
    <el-input v-model="pro2" placeholder="请输入内容"></el-input>
    <el-input v-model="d2" placeholder="请输入内容"></el-input>
    <div id="map3"></div>
    <el-button @click="createMap(3)">加载地图</el-button>
    <el-input v-model="pro3" placeholder="请输入内容"></el-input>
    <el-input v-model="d3" placeholder="请输入内容"></el-input>
    <div id="map4"></div>
    <el-button @click="createMap(4)">加载地图</el-button>
    <el-input v-model="pro4" placeholder="请输入内容"></el-input>
    <el-input v-model="d4" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
/* eslint-disable */
import bgtest from '@/assets/images/bgtest.jpg'
import guarder from '@/assets/images/guard.png'
import broadcast from '@/assets/images/broadcast.png'
import car from '@/assets/images/u23250.png'
import fixedPark from '@/assets/images/u23274.png'
import monthPark from '@/assets/images/u23266.png'
import TemporaryPark from '@/assets/images/u23282.png'
import arrearage from '@/assets/images/u21847.png'
import occupancy from '@/assets/images/u22459.png'
import mapF from '@/assets/images/u768.jpg'
import mapImg from '@/assets/images/hdmap.png';
// import localMap from '@/assets/local.png'
import localMap from '@/assets/lo.png'
import lo90 from '@/assets/lo90.png'
import lo180 from '@/assets/lo180.png'
import lo270 from '@/assets/lo270.png'

export default {
  name: 'CarStyle',
  data () {
    return {
      /* eslint-disable */
      mapObj1: null,
      mapObj2: null,
      mapObj3: null,
      mapObj4: null,
      pro1: 'map1',
      pro2: 'map2',
      pro3: 'map3',
      pro4: 'map4',
      d1: '恒大酒店与物业服务中心距离   ',
      d2: '恒大酒店与物业服务中心距离   ',
      d3: '恒大酒店与物业服务中心距离   ',
      d4: '恒大酒店与物业服务中心距离   ',
      markerPositionA: [],
      markerPositionB: [],
      GPSA: [],
      GPSB: [],
      posd: '',
      gpsd: '',
      map1: {
        option: {
          id: '000',
          gisEngine: 'bitmap',
          domId: 'map1',
          mapUrl: localMap,
          sizeW: 1277,
          sizeH: 786,
          maxZoom: 10,
          minZoom: 1,
          center: [0, 0],
          centerGPS: [113.6223732744191, 23.305851323204422],
          scale: 0.4992815760922407,
          arcAngle: 0.0006820138687829982,
          scaleType: 1
        },
        points: {
          pointA: [93.218505859375, -31.1767578125],
          pointB: [-272.79663085937494, -111.61279296875],
          pointC: [-417.45678710937494, -200.15478515625]
        },
      },
      map2: {
        option: {
          id: '000',
          gisEngine: 'bitmap',
          domId: 'map2',
          mapUrl: lo90,
          sizeW: 786,
          sizeH: 1277,
          maxZoom: 10,
          minZoom: 1,
          center: [0, 0],
          centerGPS: [113.6223732744191, 23.305851323204422],
          scale: 0.4992815760922407,
          arcAngle: 0.0006820138687829982,
          scaleType: 1
        },
        points: {
          pointA: [-31.1767578125, -93.218505859375],
          pointB: [-111.61279296875, 272.79663085937494],
          pointC: [-200.15478515625, 417.45678710937494]
        },
      },
      map3: {
        option: {
          id: '000',
          gisEngine: 'bitmap',
          domId: 'map3',
          mapUrl: lo180,
          sizeW: 1277,
          sizeH: 786,
          maxZoom: 10,
          minZoom: 1,
          center: [0, 0],
          centerGPS: [113.6223732744191, 23.305851323204422],
          scale: 0.4992815760922407,
          arcAngle: 0.0006820138687829982,
          scaleType: 1
        },
        points: {
          pointA: [-93.218505859375, 31.1767578125],
          pointB: [272.79663085937494, 111.61279296875],
          pointC: [417.45678710937494, 200.15478515625]
        },
      },
      map4: {
        option: {
          id: '000',
          gisEngine: 'bitmap',
          domId: 'map4',
          mapUrl: lo270,
          sizeW: 786,
          sizeH: 1277,
          maxZoom: 10,
          minZoom: 1,
          center: [0, 0],
          centerGPS: [113.6223732744191, 23.305851323204422],
          scale: 0.4992815760922407,
          arcAngle: 0.0006820138687829982,
          scaleType: 1
        },
        points: {
          pointA: [31.1767578125, 93.218505859375],
          pointB: [111.61279296875, -272.79663085937494],
          pointC: [200.15478515625, -417.45678710937494]
        },
      },
      lonlats: {
        lonlatA: [113.622792, 23.305724],
        lonlatB: [113.621148, 23.305392],
        lonlatC: [113.620501, 23.305027]
      },
    }
  },
  mounted () {
  },
  methods: {
    createMap (n) {
      if (n === 1) {
        this.mapObj1 = new hdmap.initMap(this.map1.option)
        this.mapObj1.addMarker({
          id: 1,
          markerType: 'camera',
          position: [0, 0],
          markerName: new Date().valueOf(),
          imgUrl: guarder
        })
        let position1 = this.mapObj1.transfromWGSToBitMap(this.lonlats.lonlatA)
        console.log(this.lonlats.lonlatA, position1)
        let pos = this.mapObj1.transBitmapToWGS(position1)
        console.log(pos)
        let angle1 = hdmap.utils.getArcAngle(this.mapObj1, this.lonlats, this.map1.points)
        let scale1 = hdmap.utils.getScaleByGPS(this.mapObj1, this.lonlats, this.map1.points)
        let centerGPS1 = hdmap.utils.getCenterGPS(this.mapObj1, this.lonlats, this.map1.points)
        this.mapObj1.mapConfig.arcAngle = angle1
        this.mapObj1.mapConfig.scale = scale1
        this.mapObj1.mapConfig.centerGPS = centerGPS1
        // 获取地图属性（centerGPS，scale，arcAngle）
        let p1 = hdmap.utils.getMapProperty(this.mapObj1, this.lonlats, this.map1.points)
        
        // 弧度转化角度
        let deg1 = p1.arcAngle * 180 / Math.PI
        console.log(p1)
        this.pro1 += '     centerGPS:   ' + p1.centerGPS + ',     scale:   ' + p1.scale + ',         arcAngle:    ' + p1.arcAngle + ',       deg:   ' + deg1
        this.mapObj1.addMarker({
          id: 11,
          markerType: 'camera',
          position: position1,
          markerName: new Date().valueOf(),
          imgUrl: guarder
        })
        // 点位之间的距离
        this.d1 += this.mapObj1.getDistanceByMarker(this.map1.points.pointA, this.map1.points.pointB)

      } else if (n === 2) {
        this.mapObj2 = new hdmap.initMap(this.map2.option)
        this.mapObj2.addMarker({
          id: 2,
          markerType: 'camera',
          position: [0, 0],
          markerName: new Date().valueOf(),
          imgUrl: guarder
        })
        let angle2 = hdmap.utils.getArcAngle(this.mapObj2, this.lonlats, this.map2.points)
        let scale2 = hdmap.utils.getScaleByGPS(this.mapObj2, this.lonlats, this.map2.points)
        let centerGPS2 = hdmap.utils.getCenterGPS(this.mapObj2, this.lonlats, this.map2.points)
        this.mapObj2.mapConfig.arcAngle = angle2
        this.mapObj2.mapConfig.scale = scale2
        this.mapObj2.mapConfig.centerGPS = centerGPS2
        let p2 = hdmap.utils.getMapProperty(this.mapObj2, this.lonlats, this.map2.points)
        let deg2 = p2.arcAngle * 180 / Math.PI
        console.log(p2)
        this.pro2 += '       centerGPS:   ' + p2.centerGPS + ',     scale:   ' + p2.scale + ',         arcAngle:   ' + p2.arcAngle + ',       deg:   ' + deg2
        let position2 = this.mapObj2.transfromWGSToBitMap(this.lonlats.lonlatA)
        this.mapObj2.addMarker({
          id: 22,
          markerType: 'camera',
          position: position2,
          markerName: new Date().valueOf(),
          imgUrl: guarder
        })
        this.d2 += this.mapObj2.getDistanceByMarker(this.map2.points.pointA, this.map2.points.pointB)
      } else if (n === 3) {
        this.mapObj3 = new hdmap.initMap(this.map3.option)
        this.mapObj3.addMarker({
          id: 3,
          markerType: 'camera',
          position: [0, 0],
          markerName: new Date().valueOf(),
          imgUrl: guarder
        })

        let angle3 = hdmap.utils.getArcAngle(this.mapObj3, this.lonlats, this.map3.points)
        let scale3 = hdmap.utils.getScaleByGPS(this.mapObj3, this.lonlats, this.map3.points)
        let centerGPS3 = hdmap.utils.getCenterGPS(this.mapObj3, this.lonlats, this.map3.points)
        this.mapObj3.mapConfig.arcAngle = angle3
        this.mapObj3.mapConfig.scale = scale3
        this.mapObj3.mapConfig.centerGPS = centerGPS3
        let p3 = hdmap.utils.getMapProperty(this.mapObj3, this.lonlats, this.map3.points)
        let deg3 = p3.arcAngle * 180 / Math.PI
        console.log(p3)
        this.pro3 += '      centerGPS:  ' + p3.centerGPS + ',     scale:  ' + p3.scale + ',         arcAngle:   ' + p3.arcAngle + ',       deg:  ' + deg3
        let position3 = this.mapObj3.transfromWGSToBitMap(this.lonlats.lonlatA)
        this.mapObj3.addMarker({
          id: 33,
          markerType: 'camera',
          position: position3,
          markerName: new Date().valueOf(),
          imgUrl: guarder
        })
        this.d3 += this.mapObj3.getDistanceByMarker(this.map3.points.pointA, this.map3.points.pointB)
      } else if (n === 4) {
        this.mapObj4 = new hdmap.initMap(this.map4.option)
        this.mapObj4.addMarker({
          id: 4,
          markerType: 'camera',
          position: [0, 0],
          markerName: new Date().valueOf(),
          imgUrl: guarder
        })

        let angle4 = hdmap.utils.getArcAngle(this.mapObj4, this.lonlats, this.map4.points)
        let scale4 = hdmap.utils.getScaleByGPS(this.mapObj4, this.lonlats, this.map4.points)
        let centerGPS4 = hdmap.utils.getCenterGPS(this.mapObj4, this.lonlats, this.map4.points)
        this.mapObj4.mapConfig.arcAngle = angle4
        this.mapObj4.mapConfig.scale = scale4
        this.mapObj4.mapConfig.centerGPS = centerGPS4
        let p4 = hdmap.utils.getMapProperty(this.mapObj4, this.lonlats, this.map4.points)
        let deg4 = p4.arcAngle * 180 / Math.PI
        console.log(p4)
        this.pro4 += '        centerGPS:    ' + p4.centerGPS + ',     scale:  ' + p4.scale + ',         arcAngle:  ' + p4.arcAngle + ',       deg:  ' + deg4
        let position4 = this.mapObj4.transfromWGSToBitMap(this.lonlats.lonlatA)
        this.mapObj4.addMarker({
          id: 44,
          markerType: 'camera',
          position: position4,
          markerName: new Date().valueOf(),
          imgUrl: guarder
        })
        this.d4 += this.mapObj4.getDistanceByMarker(this.map4.points.pointA, this.map4.points.pointB)
      }
    }
  }
}
</script>
<style scoped>
.map-container {
  width: 100%;
  height: 500px;
  position: relative;
}
/* #bitmap {
  left: 100px;
  height: 500px;
  width: 900px;
} */
.changemap {
  position: absolute;
  left: 0px;
  width: 100px;
  height: 300px;
}
.changemap li {
  width: 100px;
  height: 60px;
}
</style>

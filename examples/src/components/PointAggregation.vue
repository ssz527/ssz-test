<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%"></div>
    <ul>
      <li v-for="(item,index) in resdata" :key="index">{{item.name}}</li>
    </ul>
    <el-row class="row">
      <el-col :span="6">
        <el-button type="success" @click="getZoom">获取地图层级（最小为3）</el-button>
      </el-col>
      <el-col :span="13">
        <el-input v-model="zoom"></el-input>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="6">
        <el-button type="success" @click="getRadius">根据层级获取点位聚合半径</el-button>
      </el-col>
      <el-col :span="13">
        <el-input v-model="radius2"></el-input>
      </el-col>
    </el-row>
    <hr/>
    <el-button type="primary" @click="open">开启点位聚合</el-button>
    <el-button type="success" round @click="addMarker">添加点位</el-button>
  </div>
</template>
<script>
/* eslint-disable */
import mapImg from '@/assets/images/u768.jpg'
import markerImg from '@/assets/images/icon.png'
export default {
  // name: 'TestMap',
  data () {
    return {
      polyCoords: [
        [
          [-42.5, 94.9375],
          [-41.5, 33.9375],
          [-151, 39.4375],
          [-151.5, 99.4375],
          [-68.5, 112.9375],
          [-42.5, 93.9375]
        ]
      ],
      resdata: [],
      zoom: '',
      radius2: ''
    }
  },
  mounted () {
    // eslint-disable-next-line
    // 初始化一个地图
    // this.bitmap = new hdmap.initMap({
    //   gisEngine: 'tile',
    //   sizeW: 13623,
    //   sizeH: 9796,
    //   domId: 'bitmap',
    //   mapUrl: 'http://zc200008pc1.hdsc.com/hdyj/',
    //   maxZoom: 6,
    //   minZoom: 0,
    //   center: [0, 0],
    //   centerGPS: [113.619942, 23.304629],
    //   scale: 1.21,
    //   scaleType: 1,
    //   arcAngle: 1.2 // 弧度值
    // })
    // this.bitmap._map.updateSize()
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
    // console.log(this.bitmap.mapConfig.gisEngine);
    this.bitmap.regEventListener('zoomChange', (e) => {
      console.log(this.bitmap.getMap().getView().getResolution());
    })
    var areaInfo = {
      id: 1133333,
      name: 'eastArea',
      areaType: '01',
      borderPoints: this.polyCoords
    }
    this.bitmap.addArea(areaInfo)
    // 添加点位
    let id = new Date().valueOf()
    this.bitmap.addMarker({
      id: 111,
      position: [-34, 3.75],
      markerType: 'video',
      name: "广播",
      imgUrl: markerImg,
      size: [32, 48]
    })
    this.bitmap.addMarker({
      id: 112,
      position: [40, 3.75],
      markerType: 'camera',
      name: "摄像头",
      imgUrl: markerImg,
      size: [32, 48]
    })
    this.bitmap.addMarker({
      id: 113,
      position: [140, 43.75],
      markerType: 'guarder',
      name: "报警",
      imgUrl: markerImg,
      size: [32, 48]
    })
    this.bitmap.addMarker({
      id: 114,
      position: [-140, 43.75],
      markerType: 'guarder',
      name: "报警222",
      imgUrl: markerImg,
      size: [32, 48]
    })
    this.bitmap.addMarker({
      id: 115,
      position: [-190, 43.75],
      markerType: 'cleaner',
      name: "清洁工",
      imgUrl: markerImg,
      size: [32, 48]
    })
  },
  methods: {
    open () {
      this.bitmap.regEventListener('singleclick', (e) => {
        console.log(e.feature.layerkey)
        var coordinate = e.coordinate;
        this.resdata = hdmap.utils.getFeaturesInExtent(this.bitmap, coordinate)
        console.log(this.resdata)
      });
    },
    addMarker () {
      this.bitmap.regEventListener('singleclick', (e) => {
        let id1 = new Date().valueOf()
        var coordinate = e.coordinate;
        this.bitmap.addMarker({
          id: id1,
          position: coordinate,
          markerType: 'cleaner',
          name: "清洁工4444",
          imgUrl: markerImg,
          size: [32, 48]
        })
      });
    },
    getZoom () {
      this.zoom = this.bitmap.getZoom()
    },
    getRadius () {
      this.radius2 = 24 / Math.pow(2, this.zoom - 3)
    }
  }
}
</script>
<style scoped>
.map-container ul {
  background-color: #fff;
  width: 100px;
  border-radius: 5px;
  position: absolute;
  right: 140px;
  top: 130px;
}

.map-container ul li {
  height: 30px;
  border-bottom: 1px solid rgb(0, 0, 0);
}

.row {
  margin-top: 10px;
}
</style>
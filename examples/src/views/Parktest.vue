<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <el-button @click="close(warna)">取消报警A</el-button>
    <el-button @click="close(warnb)">取消报警B</el-button>
    <el-button @click="close(warnc)">取消报警C</el-button>
    <el-button @click="start(warna)">开启报警A</el-button>
    <el-button @click="start(warnb)">开启报警B</el-button>
    <el-button @click="start(warnc)">开启报警C</el-button>
    <el-button @click="update(warnd)">更新报警C</el-button>
  </div>
</template>
<script>
/* eslint-disable */
import mapImg from '@/assets/images/u768.jpg'
import markerImg from '@/assets/images/icon.png'
import img from '@/assets/images/u22560.png'
import icon from '@/assets/images/u22456.png'
export default {
  name: 'TestMap',
  data () {
    return {
      bitmap: null,
      warna: {
        id: 111,
        position: [0, 0],
        text: '落水报警',
        type: 'danger'
      },
      warnb: {
        id: 222,
        position: [0, 200],
        text: '重点人员'
      },
      warnc: {
        id: 999,
        position: [-200, 100],
        type: 'danger',
        color: '148,0,211'
      },
      warnd: {
        id: 111,
        position: [100, 100],
        text: '落水报警',
        type: 'danger'
      },
    }
  },
  mounted () {
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
      center: [0, 0],
      scaleType: 1,
    })
    let _this = this
    // console.log(this.bitmap._map.getControls().getArray())
    // this.bitmap._map.controls.array_[0].element.className = 'hdmap-ol-zoom ol-unselectable ol-control'
    this.bitmap.regEventListener('singleclick', function (e) {
      console.log(e)
    })
    this.bitmap.addMarker({
      id: 444,
      position: [0, 0],
      imgUrl: markerImg
    })
    this.bitmap.addArea({
      id: '2525',
      name: '22222',
      areaType: 'areatest',
      borderPoints: [
        [
          [300, -250],
          [-0, -200],
          [-300, 200],
          [-300, 250],
          [0, -200],
          [300, -300],
          [300, 250],
          [250, 200]
        ]
      ],
      visible: true
    },
      {
        fillColor: 'rgba(139,35,35,0.5)',
        strokeColor: 'orange'
      })
    this.bitmap.addArea({
      id: '5555',
      name: '22222',
      areaType: 'areatest',
      borderPoints: [
        [
          [-42.5, 94.9375],
          [-41.5, 33.9375],
          [-151, 20],
          [-151.5, 100],
          [-68.5, 112.9375],
          [-42.5, 100]
        ]
      ],
      visible: true
    },
      {
        fillColor: 'red',
        strokeColor: 'orange'
      })
    var a = this.bitmap.getMarkerBylayerKey('2525', 'gisLayer')
    var b = this.bitmap.getMarkerBylayerKey('5555', 'gisLayer')
    console.log(a)
    console.log(b.getGeometry().getExtent())
    console.log(a.getGeometry().intersectsExtent(b.getGeometry().getExtent()))
    // console.log(a.getGeometry().getFlatInteriorPoint())
    let inOrOut = hdmap.utils.judgePointInsidePolygon(
      null,
      [
        [
          [300, -250],
          [-0, -200],
          [-300, 200],
          [-300, 250],
          [0, -200],
          [300, -300],
          [300, 250],
          [250, 200]
        ]
      ]
    )
    console.log(inOrOut)
    this.bitmap.addMarker({
      id: 666,
      position: [-200, 100],
      imgUrl: markerImg
    })
  },
  methods: {
    close (a) {
      this.bitmap.warnMarkerCancel(a)
    },
    start (a) {
      this.bitmap.warnMarkerStart(a, function (e) {
        console.log(a)
        if (a.id === 111) {
          console.log(1111111111)
        } else {
          console.log(222222222)
        }
      })
      this.bitmap.addMarker({
        id: 666,
        position: [-400, 100],
        imgUrl: markerImg
      })
    },
    update (a) {
      this.bitmap.updateWarnMarker(a)
    }
  }
}
</script>
<style scoped>

</style>

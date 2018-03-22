<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <el-button type="success" @click="edit">开启编辑</el-button>
    <el-button type="success" @click="save">保存编辑</el-button>
    <el-button type="success" @click="updatePark">更新车位</el-button>
    <el-button type="success" @click="editOnce">再次编辑</el-button>
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
  data() {
    return {
      parkingCenter: [],
      areaInfo: {
        id: 123,
        name: 'eastArea',
        areaType: '01',
        borderPoints: [],
        areaTypesOf: 'parking'
      },
      styleObject: {
        fillColor: 'rgba(0,0,0,.2)',
        strokeColor: 'pink',
        strokeWidth: 2
      },
      rotate: 0
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
      center: [112.334403, 39.8]
    })
    let areaInfo = {
      borderPoints: [
        [
          [-179.03620993107282, 221.90611955975558],
          [-143.4593303108392, 203.62263968071161],
          [-180.02629006892718, 132.46888044024442],
          [-215.6031696891608, 150.75236031928839],
          [-179.03620993107282, 221.90611955975558]
        ]
      ],
      id: '00001',
      areaType: '002',
      name: '00002',
      areaTypesOf: 'parking',
      visible: true
    }
    let style = {
      fillColor: 'rgba(0,0,0,.2)',
      strokeColor: 'pink',
      strokeWidth: 2
    }
    let markerInfo = {
      id: 666,
      position: [-179.43224198621456, 186.1312239119511],
      markerType: 'car',
      markerName: '8888',
      imgUrl: img
    }
    let markerIcon = {
      id: 777,
      position: [-179.43224198621456, 186.1312239119511],
      markerType: 'video',
      markerName: '8888',
      imgUrl: icon
    }
    let styleRotation = {
      rotation: 0.47471726753091326
    }
    this.bitmap.addArea(areaInfo, style)
    this.bitmap.addMarker(markerInfo, styleRotation)
    this.bitmap.addMarker(markerIcon)
  },
  methods: {
    // 开启编辑状态
    edit() {
      this.bitmap.regEventListener('singleclick', e => {
        var parkingCenter = e.coordinate
        console.log(parkingCenter)
        this.areaInfo.borderPoints = hdmap.utils.getParkingCoordinates(
          parkingCenter
        )
        this.bitmap.editDrawShape(this.areaInfo)
        console.log(this.areaInfo)
      })
    },
    save() {
      var feat = this.bitmap.showDrawShape()
      console.log(feat[0].getRotate())
      this.areaInfo.borderPoints = feat[0].getGeometry().getCoordinates()
      this.rotate = feat[0].getRotate()
    },
    updatePark() {
      this.bitmap.getMap().on('precompose', () => {
        this.bitmap.updateArea(
          this.areaInfo,
          hdmap.commonConfig.getMouseOverAreaStyle(this.styleObject)
        )
        this.bitmap.getMap().updatesize()
      })
    },
    editOnce() {
      console.log(this.areaInfo)
      this.bitmap.editDrawShape(this.areaInfo)
    }
  }
}
</script>
<style scoped>

</style>

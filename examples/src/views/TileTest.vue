<template>
  <div class="container">
    <div id="map1"></div>
    <el-button type="danger" @click="closeAllPopup">关闭全部弹窗</el-button>
    <el-button type="danger" @click="closeWarningPopup(2)">关闭单个弹窗</el-button>
  </div>
</template>
<script>
import markerImg from '@/assets/images/icon.png'
// import loading from '@/assets/loading.gif'
export default {
  data () {
    return {
      mapObj: null,
      option1: {
        gisEngine: 'tile',
        sizeW: 13623,
        sizeH: 9796,
        domId: 'map1',
        mapUrl: 'http://zc200008pc1.hdsc.com/hdyj/',
        maxZoom: 6,
        minZoom: 0,
        center: [0, 0],
        centerGPS: [113.619942, 23.304629],
        scale: 1.21,
        scaleType: 1,
        zoom: 2,
        arcAngle: 1.2 // 弧度值
      }
    }
  },
  methods: {
    createMarker (num) {
      const _defaultObj = {
        courtUuid: 'string',
        sceneId: '添加测试4',
        markerName: '添加测试',
        longitude: 0,
        latitude: 8,
        markerOrder: 0,
        dragable: true,
        iconUrl: 'string',
        comment: 'string',
        createTime: 2868634,
        updateTime: 2868634,
        createUser: 'string',
        updateUser: 'string',
        deleteFlag: 1,
        imgUrl: markerImg
      }
      let finalData = []
      for (let i = 0; i < num; i++) {
        let tempData = Object.assign({}, _defaultObj)
        tempData.id = i + ''
        tempData.deviceId = i + ''
        let positionX = Math.floor(Math.random() * (12000 - 1500 + 1) + 1500)
        let positionY =
          0 - Math.floor(Math.random() * (5000 - 1500 + 1) + 1500)
        tempData.position = [positionX, positionY]
        tempData.markerType = 'warnMarker'
        tempData.zoomLevel = 0
        tempData.type = i % 2 === 0 ? 'warn' : 'danger'
        // tempData.markerStatus = tempData.markerType + '0' + (Math.floor(i % 2) + 1)
        finalData.push(tempData)
      }
      return finalData
    },
    closeAllPopup () {
      this.mapObj.clearWarningPopup()
    },
    closeWarningPopup (id) {
      this.mapObj.removeWarningPopup(id)
    }
  },
  mounted () {
    // 切片地图控制部分
    // eslint-disable-next-line
    this.mapObj = new hdmap.initMap(this.option1)
    this.mapObj._map.updateSize()
    var markerList = this.createMarker(4)
    console.log(markerList)
    for (var i = 0; i < markerList.length; i++) {
      this.mapObj.addWarningPopup(markerList[i])
    }
    this.mapObj.regEventListener('singleclick', function (e) {
      console.log('single click event')
      console.log(e)
    })
  }
}
</script>
<style>
.container {
  width: 1400px;
  height: 750px;
  position: relative;
}
#map1,
#map2 {
  width: 1400px;
  height: 700px;
  border: 2px solid red;
}
.active {
  z-index: -1;
}
</style>


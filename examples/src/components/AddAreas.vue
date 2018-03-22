<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <!-- 弹框 -->
    <div id="Popup">
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
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
        polyCoords: [
          [
            [-150.192114608162, 256.796067390244],
            [285.807885391838, 269.796067390244],
            [287.807885391838, 144.796067390244],
            [-49.192114608162, 137.796067390244],
            [-185.192114608162, 219.796067390244],
            [-150.192114608162, 257.796067390244]
          ]
        ],
        polyCoords1: [
          [
            [42.5, 94.9375],
            [41.5, 33.9375],
            [151, 39.4375],
            [151.5, 99.4375],
            [68.5, 112.9375],
            [42.5, 93.9375]
          ]
        ],
        polyCoords2: [
          [
            [-42.5, 94.9375],
            [-41.5, 33.9375],
            [-151, 39.4375],
            [-151.5, 99.4375],
            [-68.5, 112.9375],
            [-42.5, 93.9375]
          ]
        ]
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
      var areaInfo = {
        id: 111,
        name: 'eastArea',
        areaType: '01',
        borderPoints: this.polyCoords
      }
      var areaInfo1 = {
        id: 112,
        name: 'eastArea',
        areaType: '01',
        borderPoints: this.polyCoords1
      }
      var areaInfo2 = {
        id: 113,
        name: 'eastArea',
        areaType: '01',
        borderPoints: this.polyCoords2
      }
      var areaList = [areaInfo, areaInfo1, areaInfo2];
      this.bitmap.addAreas(areaList)
      // 添加弹框
      this.bitmap.addPopup('Popup')
      //坐标数组，进行遍历点位判断
      let borderPoints = [];
      for (let i = 0; i < areaList.length; i++) {
        this.bitmap.getMap().on('precompose', () => {
          this.bitmap.updateArea(areaList[i], hdmap.commonConfig.getMouseOverAreaStyle())
        })
        borderPoints.push(areaList[i].borderPoints[0])
        this.bitmap.regEventListener("singleclick", (e) => {
          //判断点位越界 
          for (let j = 0; j < borderPoints.length; j++) {
            let pointArea = hdmap.utils.judgePointInsidePolygon(e.coordinate, borderPoints[j])
            if (pointArea == "on" || pointArea == "in") {
              this.bitmap.showPopup('Popup', e.coordinate)
            }
          }
        })
      }
    },
    methods: {
      open() {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            });
          }
        });
      }
    }
  }
</script>
<style>
</style>
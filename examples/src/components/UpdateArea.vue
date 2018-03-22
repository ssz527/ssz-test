<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <div id="Popup">
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
      <span class="closePopup" @click="close">x</span>
    </div>

    <hr>
    <el-button type="info" @click="addArea">添加一个区域</el-button>
    <el-button type="danger" @click="btnRed">传入红色填充</el-button>
    <el-button type="primary" @click="btnBlue">传入蓝色填充</el-button>
    <el-button type="warning" @click="removeArea">删除区域</el-button>
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
        areaInfo: {
          id: 111,
          name: 'eastArea',
          areaType: '01',
          borderPoints: [
            [
              [-42.5, 94.9375],
              [-41.5, 33.9375],
              [-151, 39.4375],
              [-151.5, 99.4375],
              [-68.5, 112.9375],
              [-42.5, 93.9375]
            ]
          ]
        },
        styleObject1: {
          fillColor: "red",
          strokeColor: "black",
          strokeWidth: 2
        },
        styleObject2: {
          fillColor: "blue",
          strokeColor: "black",
          strokeWidth: 2
        },
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
      this.bitmap.addPopup('Popup')
      this.bitmap.regEventListener("singleclick", (e) => {
        //判断点位越界
        let pointArea = hdmap.utils.judgePointInsidePolygon(e.coordinate, this.areaInfo.borderPoints[0])
        if (pointArea == "on" || pointArea == "in") {
          this.bitmap.showPopup('Popup', e.coordinate)
        }
      })
    },
    methods: {
      close(){
        this.bitmap.closePopup();
      },
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
      },
      addArea() {
        this.bitmap.addArea(this.areaInfo)
        // 固定地图显示区域不收鼠标事件影响
        this.bitmap.getMap().on('precompose', () => {
          this.bitmap.updateArea(this.areaInfo, hdmap.commonConfig.getMouseOverAreaStyle())
        })
      },
      btnRed() {
        this.bitmap.getMap().on('precompose', () => {
          this.bitmap.updateArea(this.areaInfo, hdmap.commonConfig.getMouseOverAreaStyle(this.styleObject1))
        })
      },
      btnBlue() {
        this.bitmap.getMap().on('precompose', () => {
          this.bitmap.updateArea(this.areaInfo, hdmap.commonConfig.getMouseOverAreaStyle(this.styleObject2))
        })
      },
      removeArea() {
        this.bitmap.removeArea(this.areaInfo);
        this.close()
      },
    }
  }
</script>
<style scoped>
  .Popup {
    position: relative;
  }

  .closePopup {
    position: absolute;
    top: -4px;
    right: 5px;
    font-size: 12px;
    color: #666;
    font-weight: 900;
  }
</style>
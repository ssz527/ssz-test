<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <div id="Popup">
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </div>
    <hr>
    <el-row class="row">
      <el-col :span="6">
        <el-button type="success" @click="addArea">添加区域</el-button>
        <el-button type="success" @click="editArea">编辑区域</el-button>
        <el-button type="success" @click="getArea">获取区域</el-button>
      </el-col>
      <el-col :span="18">
        <el-input v-model="polyCoords" placeholder="请输入坐标数组如：[[x1,y1],[x2,y2],[x3,y3]...]"></el-input>
      </el-col>
    </el-row>
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
      polyCoords: "",
      areaInfos: {}
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
      center: [112.334403, 39.8],
      popupDom: {
        popup: 'popup',
        popupcloser: 'popup-closer',
        popupcontent: 'popup-content'
      }
    })
    // 添加弹框
    this.bitmap.addPopup('Popup')
    this.bitmap.regEventListener("singleclick", (e) => {
      //判断点位越界
      let pointArea = hdmap.utils.judgePointInsidePolygon(e.coordinate, JSON.parse(this.polyCoords))
      if (pointArea == "on" || pointArea == "in") {
        this.bitmap.showPopup('Popup', e.coordinate)
      }
    })
  },
  methods: {
    addArea () {
      // var res = [[42.5, 94.9375], [41.5, 33.9375], [151, 39.4375]]
      if (!this.polyCoords) {
        console.warn('please input area String in the input')
        return
      }
      var polyCoords = []
      polyCoords.push(JSON.parse(this.polyCoords))
      var areaInfo = {
        id: 111,
        name: 'eastArea',
        areaType: '01',
        borderPoints: polyCoords
      }
      this.bitmap.addArea(areaInfo)
      this.areaInfos = areaInfo
      // 固定地图显示区域不收鼠标事件影响
      this.bitmap.getMap().on('precompose', () => {
        this.bitmap.updateArea(areaInfo, hdmap.commonConfig.getMouseOverAreaStyle())
      })
    },
    editArea () {
      this.bitmap.editDrawShape(this.areaInfos)
    },
    getArea () {
      var feat = this.bitmap.showDrawShape({
        id: 111,
        name: 'eastArea',
        areaType: '01',
      });
      if (feat) {
        // 得到修改后几何图形的坐标点
        this.areaInfos.borderPoints = feat.getGeometry().getCoordinates();
        console.log(this.areaInfos);
      } else {
        console.warn('get null')
      }
    },
    open () {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
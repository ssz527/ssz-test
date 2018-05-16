<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <el-button type="success" @click="edit">开启车位编辑</el-button>
    <el-button type="primary" @click="save">保存车位编辑</el-button>
    <el-button type="info" @click="updatePark">更新车位样式</el-button>
    <el-button type="warning" @click="editOnce">再次编辑车位</el-button>
    <el-button type="danger" @click="editCar">首次放入车辆</el-button>
    <el-button type="success" @click="updateCar">再次更新车辆</el-button>
    <el-button type="success" @click="clearCar">未保存时删除车位</el-button>
    <el-button type="success" @click="removeCar">保存后删除车位</el-button>
    <el-button type="success" @click="select">点击事件选择编辑</el-button>
    <el-button type="success" @click="addParkingLock">添加车锁</el-button>
  </div>
</template>
<script>
/* eslint-disable */
import mapImg from '@/assets/images/u768.jpg'
import markerImg from '@/assets/images/u22563.png'
import parkingLockImg from '@/assets/images/parkingLock.png'
export default {
  name: 'TestMap',
  data () {
    return {
      areaInfo: {
        id: 123,
        name: 'eastArea',
        areaType: '01',
        borderPoints: [],
        areaTypesOf: "parking",
        rotate: 0,
      },
      styleObject: {
        fillColor: "orange",
        strokeColor: "pink",
        strokeWidth: 2
      },
      rotate: 0
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

  },
  methods: {
    // 开启编辑状态 
    edit () {
      var parkingCenter = [40, 40]
      this.areaInfo.borderPoints = hdmap.utils.getParkingCoordinates(parkingCenter)
      this.bitmap.editDrawShape(this.areaInfo);
    },
    // 保存信息
    save () {
      // 调用showDrawShape方法保存信息的同时关闭编辑状态
      var feat = this.bitmap.showDrawShape(this.areaInfo)
      console.log(feat);
      // 获取最新的顶点坐标数组
      this.areaInfo.borderPoints = feat.getGeometry().getCoordinates()
      // console.log(this.areaInfo.borderPoints[0][0]);
      // 获取最新的旋转角度
      this.rotate = feat.getRotate()
      // debugger
    },
    // 改变停车样式
    updatePark () {
      this.bitmap.getMap().on('precompose', () => {
        this.bitmap.updateArea(this.areaInfo, hdmap.commonConfig.getMouseOverAreaStyle(this.styleObject))
      })
    },
    // 再次编辑车位
    editOnce () {
      this.bitmap.editDrawShape(this.areaInfo);
    },
    // 放入车辆
    editCar () {
      var borderPoints = this.areaInfo.borderPoints[0]
      if (borderPoints.length === 5) {
        borderPoints.pop()
      } else {
        borderPoints = borderPoints
      }
      // 根据顶点坐标获取中心
      var center = hdmap.utils.getGeometryCenter(borderPoints)
      // 添加点位
      this.bitmap.addMarker({
        id: 111,
        position: center,
        markerType: 'car',
        name: "chewei",
        imgUrl: markerImg,
        // size: [33, 78]
      }, {
          rotation: this.rotate * Math.PI / 180//角度转弧度
        })
    },
    // 更新车辆
    updateCar () {
      var borderPoints = this.areaInfo.borderPoints[0]
      if (borderPoints.length === 5) {
        borderPoints.pop()
      }
      var carCenter = hdmap.utils.getGeometryCenter(borderPoints)
      // debugger
      this.bitmap.updateMarker({
        id: 111,
        position: carCenter,
        markerType: 'car',
        name: "chewei",
        imgUrl: markerImg,
        // size: [33, 78]
      }, {
          rotation: this.rotate * Math.PI / 180//角度转弧度
        })
    },
    clearCar () {
      this.bitmap.clearDrawShape()
      this.bitmap.closeDrawShapeTool()
      // 手动把角度归零
      this.areaInfo.rotate = 0
    },
    removeCar () {
      this.bitmap.closeDrawShapeTool()
      this.bitmap.clearDrawShape()
      this.bitmap.removeArea(this.areaInfo)
      // 手动把角度归零
      this.areaInfo.rotate = 0
    },
    //选择编辑
    select () {
      this.bitmap.regEventListener("singleclick", e => {
        if (e.feature) {
          this.bitmap.editDrawShape(e.feature);
        } else {
          this.$message({
            message: '没有选中车位',
            type: 'warning'
          })
        }
      })
    },
    addParkingLock () {
      if (this.areaInfo.borderPoints.length === 0) {
        this.$message({
          message: '请打开车位编辑，保存车位信息',
          type: 'warning'
        })
      } else {
        var parkingLockPoint = hdmap.utils.getParkingLockPoint(this.areaInfo.borderPoints, this.rotate)
        this.bitmap.addMarker({
          id: 1134,
          position: parkingLockPoint,
          markerType: 'parkingLock',
          name: "车位锁",
          imgUrl: parkingLockImg,
          // size: [33, 78]
        }, {
            rotation: this.rotate * Math.PI / 180//角度转弧度
          })

      }

    }
  }
}
</script>
<style scoped>

</style>
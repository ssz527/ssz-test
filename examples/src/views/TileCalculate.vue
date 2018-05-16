<template>
  <div class="container">
    <div id="TileCalculate"></div>
    <el-container>
      <el-button type="primary" @click="calculateProperty()">计算</el-button>
      <label>地图属性： 比例尺： {{formGPS.scale}} 中心经纬度： {{formGPS.centerLonLat}} 旋转角度： {{formGPS.arcAngle}}</label>
    </el-container>
    <el-form ref="formGPS" :model="formGPS" label-width="80px" class="form-calculate-coordinate">
      <el-form-item label="实际位置1:">
        <el-input v-model="formGPS.reallon1" prop="reallon1" class="input-small right-child" placeholder="输入经度值"></el-input>
        <el-input v-model="formGPS.reallat1" prop="reallat1" class="input-small left-child" placeholder="输入纬度值"></el-input>
      </el-form-item>
      <el-form-item label="点位坐标1:" @click.native="onPoint(1,$event)" ref="shuru">
        <el-input v-model="formGPS.ptlongitude1" prop='ptlongitude1' class="input-small right-child" readonly></el-input>
        <el-input v-model="formGPS.ptlat1" prop='ptlat1' class="input-small left-child" readonly></el-input>
        <div class="position-btn" @click.native="onPoint(5,$event)">
          <i class="el-icon-location pick-ico" title="点击我,再点击地图可获取点位坐标"></i>
        </div>
      </el-form-item>
      <el-form-item label="实际位置2:">
        <el-input v-model="formGPS.reallon2" prop="reallon2" class="input-small right-child" :maxlength="10" placeholder="输入经度值"></el-input>
        <el-input v-model="formGPS.reallat2" prop='reallat2' class="input-small left-child" :maxlength="10" placeholder="输入纬度值"></el-input>
      </el-form-item>
      <el-form-item label="点位坐标2:" ref="shuru" @click.native="onPoint(3,$event)">
        <el-input v-model="formGPS.ptlongitude2" prop="ptlongitude2" class="input-small right-child" readonly></el-input>
        <el-input v-model="formGPS.ptlat2" prop='ptlat2' class="input-small left-child" readonly></el-input>
        <div class="position-btn" @click.native="onPoint(3,$event)">
          <i class="el-icon-location pick-ico" title="点击我,再点击地图可获取点位坐标"></i>
        </div>
      </el-form-item>
      <el-form-item label="实际位置3:">
        <el-input v-model="formGPS.reallon3" prop="reallon3" class="input-small right-child" :maxlength="10" placeholder="输入经度值"></el-input>
        <el-input v-model="formGPS.reallat3" prop='reallat3' class="input-small left-child" :maxlength="10" placeholder="输入纬度值"></el-input>
      </el-form-item>
      <el-form-item label="点位坐标3:" ref="shuru" @click.native="onPoint(5,$event)">
        <el-input v-model="formGPS.ptlongitude3" prop='ptlongitude3' class="input-small right-child" readonly></el-input>
        <el-input v-model="formGPS.ptlat3" prop='ptlat3' class="input-small left-child" readonly></el-input>
        <div class="position-btn" @click.native="onPoint(5,$event)">
          <i class="el-icon-location pick-ico" title="点击我,再点击地图可获取点位坐标"></i>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import markerImg from '@/assets/images/icon.png'
import icon1 from '@/assets/images/icon1.png'
import icon2 from '@/assets/images/icon2.png'
import icon3 from '@/assets/images/icon3.png'
// import loading from '@/assets/loading.gif'
export default {
  data () {
    return {
      formGPS: {
        reallon1: null,
        reallat1: null,
        ptlongitude1: null,
        ptlat1: null,
        reallon2: null,
        reallat2: null,
        ptlongitude2: null,
        ptlat2: null,
        reallon3: null,
        reallat3: null,
        ptlongitude3: null,
        ptlat3: null,
        centerLonLat: null,
        arcAngle: 0,
        scale: null
      },
      mapObj: null,
      option1: {
        gisEngine: 'tile',
        sizeW: 15000,
        sizeH: 6350,
        domId: 'TileCalculate',
        mapUrl: 'http://192.168.0.108/mapTile/hdyjTiler0-6/',
        maxZoom: 6,
        minZoom: 0,
        center: [0, 0],
        centerGPS: [113.619942, 23.304629],
        scale: 1.21,
        scaleType: 1,
        zoom: 2,
        arcAngle: 1.2 // 弧度值
      },
      currentSelect: 1
    }
  },
  methods: {
    /**
     * @description 获取描点事件
     * @param {number} num 点位序号
     * @param $event  event事件
     */
    onPoint: function (num, $event) {
      console.log('select point:' + num)
      this.currentSelect = num
    },
    createMarker (num) {
      const _defaultObj = {
        markerName: '添加测试',
        imgUrl: markerImg,
        type: 'warn',
        size: [32, 48]
      }
      let finalData = []
      for (let i = 0; i < num; i++) {
        let tempData = Object.assign({}, _defaultObj)
        tempData.id = i + ''
        let positionX = Math.floor(Math.random() * (12000 - 1500 + 1) + 1500)
        let positionY = 0 - Math.floor(Math.random() * (5000 - 1500 + 1) + 1500)
        tempData.position = [positionX, positionY]
        // tempData.markerStatus = tempData.markerType + '0' + (Math.floor(i % 2) + 1)
        finalData.push(tempData)
      }
      return finalData
    },
    calculateProperty () {
      let lonlats = {
        lonlatA: [Number(this.formGPS.reallon1), Number(this.formGPS.reallat1)],
        lonlatB: [Number(this.formGPS.reallon2), Number(this.formGPS.reallat2)],
        lonlatC: [Number(this.formGPS.reallon3), Number(this.formGPS.reallat3)]
      }
      let points = {
        pointA: [Number(this.formGPS.ptlongitude1), Number(this.formGPS.ptlat1)],
        pointB: [Number(this.formGPS.ptlongitude2), Number(this.formGPS.ptlat2)],
        pointC: [Number(this.formGPS.ptlongitude3), Number(this.formGPS.ptlat3)]
      }
      let properties = hdmap.utils.getMapProperty(this.mapObj, lonlats, points)
      this.formGPS.centerLonLat = properties.centerGPS
      this.formGPS.arcAngle = properties.arcAngle
      this.formGPS.scale = properties.scale
    }
  },
  mounted () {
    // 切片地图控制部分
    // eslint-disable-next-line
    this.mapObj = new hdmap.initMap(this.option1)
    this.mapObj._map.updateSize()
    // var markerList = this.createMarker(20)
    // for (var i = 0; i < markerList.length; i++) {
    //   this.mapObj.addMarker(markerList[i])
    // }
    var that = this
    this.mapObj.regEventListener('singleclick', function (e) {
      console.log('single click event')
      console.log(e)
      var icon = icon1
      switch (that.currentSelect) {
        case 1:
          icon = icon1
          that.formGPS.ptlongitude1 = e.coordinate[0]
          that.formGPS.ptlat1 = e.coordinate[1]
          break
        case 3:
          icon = icon2
          that.formGPS.ptlongitude2 = e.coordinate[0]
          that.formGPS.ptlat2 = e.coordinate[1]
          break
        case 5:
          icon = icon3
          that.formGPS.ptlongitude3 = e.coordinate[0]
          that.formGPS.ptlat3 = e.coordinate[1]
          break
        default:
          console.log('currentSelect is not 1,3,5')
      }

      var locationMarker = {
        id: that.currentSelect + '-p',
        imgUrl: icon,
        position: e.coordinate
      }
      if (that.currentSelect) {
        that.mapObj.addMarker(locationMarker)
      }
    })
  }
}
</script>
<style lang='less' scoped>
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
.position-btn {
  float: left;
  width: 20px;
  .pick-ico {
    font-size: 20px;
    color: #e6a23c;
    cursor: pointer;
    &:hover {
      color: darken(#e6a23c, 10%);
    }
  }
}
.container /deep/ .el-form {
  display: flex;
  flex-wrap: wrap;
}
</style>


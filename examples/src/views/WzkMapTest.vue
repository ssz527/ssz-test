<template>
  <div class="map-container">
    <div id="wzkmap">
    </div>
    <div id="bitmap">
      <div id="info"></div>
    </div>

    <!--摄像头弹窗 -->
    <div id="camera" class="testclass">
      <el-button type="text" @click="open3">点击打开 Message Box</el-button>
    </div>
    <!-- 保安弹窗 -->
    <div id="guarder" class="testclass">
      <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>
    </div>
    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
    <!-- 广播弹窗 -->
    <div id="broadcast">
      <el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="testbtn">
      <h4>点位更新样式测试</h4>
      <button id="addfeature" @click="addfeature">添加</button>
      <button id="success" @click="featureSuccess">成功</button>
      <button id="default" @click="featureDefault">默认</button>
      <button id="warnfeature" @click="featureWarn">警告</button>
    </div>
    <div class="testbtn">
      <h4>添加统计点图标</h4>
      <button id="countCamera" @click="countCamera">摄像头</button>
      <button id="countCleaner" @click="countWarn">报警</button>
      <button id="countBroadcast" @click="countBroadcast">广播</button>
    </div>
    <div class="testbtn">
      <h4>切换显示统计点图标</h4>
      <label>
        <input id="checkcamera" type="checkbox" checked="cameraflag" @click="isShowCountCamera">摄像头</label>
      <label>
        <input id="checkwarning" type="checkbox" checked="warnflag" @click="isShowCountWarn">报警</label>
      <label>
        <input id="checkbroadcast" type="checkbox" checked="broadcastflag" @click="isShowCountBroadcast">广播</label>
    </div>
    <div class="testbtn">
      <h4>弹窗</h4>
      <button id="camerapop" @click="camerapopup">摄像头</button>
      <button id="guarderpop" @click="guarderpopup">保安</button>
      <button id="guarderpop" @click="broadcastpopup">广播</button>
      <button id="morefeature" @click="mutiplepopup">聚合</button>
      <button id="closepop" @click="closepopup">关闭</button>
    </div>
    <div class="testbtn">
      <h4>区域样式</h4>
      <button id="defaultAreaw" @click="addarea">添加区域</button>
      <button id="successAreaw" @click="addareaDefault">成功</button>
      <button id="addAreaw" @click="addareaWarn">报警</button>
      <button id="addAreaw" @click="closeWarn">解除警报</button>
    </div>

  </div>
</template>
<script>
/* eslint-disable */
import mapImg from '@/assets/images/u768.jpg'
import markerImg from '@/assets/images/icon.png'
import guarder from '@/assets/images/guard.png'
import broadcast from '@/assets/images/broadcast.png'
import cameraImg from '@/assets/images/u4838.png'
import cleanerImg from '@/assets/images/u4833.png'
import guarderImg from '@/assets/images/u4828.png'
import baseDefault from '@/assets/images/u887.png'
import baseWarn from '@/assets/images/u1076.png'
import countCamera from '@/assets/images/u349.png'
import countBroadcast from '@/assets/images/u950.png'
import countWarning from '@/assets/images/u787.png'

export default {
  name: 'WzkMapTest',
  data () {
    return {
      // eslint-disable-next-line
      overlay: new ol.Overlay({}),
      bitmap: null,
      outerVisible: false,
      innerVisible: false,
      initText2: 'initText2',
      initText: 'initText',
      tabPosition: 'top',
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      cameraflag: true,
      warnflag: true,
      broadcastflag: true,
      featureList: [
        {
          extProperties: {
            markerImg: cameraImg,
            markerName: '摄像头',
            markerType: 'camera'
          }
        },
        {
          extProperties: {
            markerImg: guarderImg,
            markerName: '保安',
            markerType: 'guarder'
          }
        },
        {
          extProperties: {
            markerImg: cleanerImg,
            markerName: '保洁',
            markerType: 'cleaner'
          }
        }
      ],
      areaTest: {
        name: 'testArea',
        areaType: '02',
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
      radius: 0,
      flag: true,
      opacity: 0.3
      // initText: 'init'
    }
  },
  mounted () {
    console.log('mounted')

    var map = new BMap.Map('wzkmap')
    map.centerAndZoom(new BMap.Point(121.491, 31.233), 11)
    map.enableScrollWheelZoom(true)
    map.addControl(new BMap.NavigationControl())
    map.addControl(new BMap.ScaleControl())
    map.addControl(new BMap.OverviewMapControl())
    console.log('hdmap create')
    // eslint-disable-next-line
    this.bitmap = new hdmap.initMap({
      gisEngine: 'bitmap',
      sizeW: 1920,
      sizeH: 1080,
      domId: 'bitmap',
      mapUrl: mapImg,
      maxZoom: 7,
      minZoom: 3,
      center: [112.334403, 39.8],
      centerGPS: [112.334403, 39.8],
      scale: 2,
      scaleType: 1
    })
    let id = new Date().valueOf()
    // 添加点位
    this.bitmap.setCenter([200, 100])
    this.bitmap.addMarker({
      id: 111,
      position: [700, 0],
      markerType: 'camera',
      name: id,
      imgUrl: markerImg,
      size: [32, 48]
    })

    this.bitmap.addMarker({
      id: 333,
      position: [200, 100],
      markerType: 'guarder',
      name: id,
      imgUrl: guarder
    })

    this.bitmap.addMarker({
      id: 555,
      position: [-100, 100],
      markerType: 'guarder',
      name: id,
      imgUrl: guarder
    })

    this.bitmap.addMarker({
      position: [300, 0],
      markerType: 'guarder',
      name: id,
      imgUrl: guarder
    })
    // this.bitmap.addMarkerByGPS({
    //   id: '15678922',
    //   markerType: 'guarder',
    //   position: [112.334403, 39.8],
    //   name: 'fgg',
    //   imgUrl: guarder,
    //   imgSize: [40, 60]
    // })

    // this.bitmap.addMarker({
    //   id: 444,
    //   position: [-100, -100],
    //   markerType: 'broadcast',
    //   name: id,
    //   imgUrl: broadcast
    // })
    let that = this
    this.bitmap.regEventListener('dragstart', function () {
      console.log('dragstart callback')
    })

    // 添加弹窗
    this.bitmap.addPopup({domId: 'camera', visible: true, arrow: true})
    this.bitmap.addPopup('guarder')
    this.bitmap.addPopup('broadcast')

    // 注册单击事件
    this.bitmap.regEventListener('singleclick', function (respones) {
      if (respones.feature) {
        // 根据点击处的点位的 markertype 显示对应的弹窗id
        if (respones.feature.markerType === 'camera') {
          that.bitmap.showPopup('camera', respones.coordinate)
        } else if (respones.feature.markerType === 'broadcast') {
          that.bitmap.showPopup('broadcast', respones.coordinate)
        } else if (respones.feature.markerType === 'guarder') {
          that.bitmap.showPopup('guarder', respones.coordinate)
        }
      } else {
        // 关闭弹窗
        that.bitmap.closePopup()
      }
    })
  },
  methods: {
    addfeature () {
      this.bitmap.addMarker({
        id: 222,
        position: [-140, 40],
        markerType: 'guarder',
        name: 222,
        imgUrl: guarder
      })
    },
    featureSuccess () {
      this.bitmap.updateMarker({
        position: [30, 20],
        markerType: 'camera',
        name: 111,
        imgUrl: markerImg
      })
    },
    featureDefault () {
      this.bitmap.updateMarker({
        id: 111,
        position: [30, 20],
        markerType: 'camera',
        name: 111,
        imgUrl: markerImg
      })
    },
    featureWarn () {
      this.bitmap.updateMarker(
        {
          id: 111,
          position: [30, 20],
          markerType: 'camera',
          name: 111,
          imgUrl: markerImg
        },
        {
          color: 'red'
        }
      )
    },
    countCamera () {
      this.bitmap.addCountMarker({
        id: 22,
        name: 22,
        markerType: 'countCamera',
        position: [40, 40],
        url: countCamera,
        baseUrl: baseDefault,
        cameraNum: '8'
      })
    },
    countWarn () {
      this.bitmap.addCountMarker({
        id: 22,
        name: 22,
        markerType: 'countWarning',
        position: [-40, -60],
        url: countWarning,
        baseUrl: baseWarn,
        warnNum: '8'
      })
    },
    countBroadcast () {
      this.bitmap.addCountMarker({
        id: 22,
        name: 22,
        markerType: 'countBroadcast',
        position: [-120, 10],
        url: countBroadcast,
        baseUrl: baseDefault,
        broadcastNum: '8'
      })
    },
    camerapopup () {
      this.bitmap.showPopup('camera', [0, 0])
      console.log(this.bitmap._overlays.length)
      for(var i in this.bitmap._overlays){
        console.log(this.bitmap._overlays[i].visible)
      }
    },
    guarderpopup () {
      this.bitmap.showPopup('guarder', [200, -100])
    },
    broadcastpopup () {
      this.bitmap.showPopup('broadcast', [-100, 0])
    },
    mutiplepopup () {
      this.bitmap.popupMultipoint([100, 0], this.featureList)
    },
    closepopup () {
      this.bitmap.closeCommonPopup()
    },
    addarea () {
      this.bitmap.addArea(this.areaTest)
    },
    addareaDefault () {
      this.bitmap.updateArea(
        this.areaTest,
        hdmap.commonConfig.getMouseOverAreaStyle()
      )
    },
    addareaWarn () {
      this.bitmap.warnAnimation(this.areaTest)
    },
    closeWarn () {
      this.bitmap.warnCancel(this.areaTest)
    },
    isShowCountCamera () {
      if (this.cameraflag) {
        this.bitmap.hideCountMarkers('countCamera')
        this.cameraflag = false
      } else {
        this.bitmap.showCountMarkers('countCamera')
        this.cameraflag = true
      }
    },
    isShowCountBroadcast () {
      if (this.broadcastflag) {
        this.bitmap.hideCountMarkers('countBroadcast')
        this.broadcastflag = false
      } else {
        this.bitmap.showCountMarkers('countBroadcast')
        this.broadcastflag = true
      }
    },
    isShowCountWarn () {
      if (this.warnflag) {
        this.bitmap.hideCountMarkers('countWarning')
        this.warnflag = false
      } else {
        this.bitmap.showCountMarkers('countWarning')
        this.warnflag = true
      }
    },
    open3 () {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    }
  }
}
</script>
<style scoped>
.map-container {
  width: 80%;
  height: 500px;
}
#bitmap {
  position: relative;
}
#baidumap {
  height: 50%;
}
#info {
  z-index: 1;
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0;
  background: rgba(0, 60, 136, 0.7);
  color: white;
  border: 0;
  transition: opacity 100ms ease-in;
}
.testclass {
  width: 300px;
  padding: 10px;
  background: white;
  text-align: center;
  color: red;
  /* border-radius: 10px; */
}
.testbtn {
  float: left;
  width: 300px;
  margin-top: 20px;
  margin-right: 10px;
}
</style>

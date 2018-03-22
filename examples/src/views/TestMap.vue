<template>
  <div class="map-container">
    <div id="bitmap">
    </div>
    <div id="testmap">
    </div>

    <!-- popup自定义弹窗容器 -->
    <div id="camera" class="testclass">
      <el-button type="text" @click="open3">点击打开 Message Box</el-button>
    </div>
    <div id="cleaner" class="testclass">
      <input type="text" v-text="initText2">
      <button @click="save2">save2</button>
      <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>
    </div>
    <!-- popup自定义弹窗结束 -->

    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import mapImg from '@/assets/images/u768.jpg'
import markerImg from '@/assets/images/icon.png'
// import cameraImg from '@/assets/images/u4838.png'
// import cleanerImg from '@/assets/images/u4833.png'
// import guarderImg from '@/assets/images/u4828.png'

export default {
  name: 'TestMap',
  data () {
    return {
      // eslint-disable-next-line
      overlay: new ol.Overlay({}),
      bitmap: null,
      outerVisible: false,
      innerVisible: false,
      initText2: 'initText2',
      initText: 'initText',
      markerData: [{
        id: 'camera',
        msg: 'this is camera'
      }, {
        id: 'guarder',
        msg: 'this is guarder'
      }, {
        id: 'cleaner',
        msg: 'this is cleaner'
      }, {
        id: 'video',
        msg: 'this is video'
      }]
      // initText: 'init'
    }
  },
  mounted () {
    console.log('mounted')

    var map = new BMap.Map('testmap')
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
      maxZoom: 3,
      minZoom: 3,
      center: [112.334403, 39.8],
      popupDom: {
        popup: 'popup',
        popupcloser: 'popup-closer',
        popupcontent: 'popup-content'
      }
    })
    let id = new Date().valueOf()

    // 添加点位
    this.bitmap.addMarker({
      id: 111,
      position: [30, 20],
      markerType: 'camera',
      name: id,
      imgUrl: markerImg,
      size: [32, 48]
    })
    this.bitmap.addMarker({
      id: 222,
      position: [-140, 40],
      markerType: 'cleaner',
      name: id,
      imgUrl: markerImg,
      size: [32, 48]
    })
    this.bitmap.addMarker({
      id: 333,
      position: [-50, 0],
      markerType: 'guarder',
      name: id,
      imgUrl: markerImg,
      size: [32, 48]
    })
    this.bitmap.addMarker({
      id: 444,
      position: [-50, -50],
      markerType: 'video',
      name: id,
      imgUrl: markerImg,
      size: [32, 48]
    })
    let that = this
    // this.bitmap.regEventListener('singleclick', function () {
    //     console.log('single click callback ')
    //     that.bitmap.unRegEventListener('singleclick')
    // })
    this.bitmap.regEventListener('dragstart', function () {
      console.log('dragstart callback')
    })

    // 添加自定义overlay，传入参数（overlayName,弹窗容器id）
    this.bitmap.addPopup('camera', 'camera')
    this.bitmap.addPopup('cleaner', 'cleaner')

    // 注册单击事件
    this.bitmap.regEventListener('singleclick', function (respones) {
      if (respones.feature) {
        // 根据点击处的点位的 markertype 显示对应的弹窗id
        if (respones.feature.extProperties.markerType === 'camera') {
          that.bitmap.showPopup('camera', respones.coordinate)
        } else {
          that.bitmap.showPopup('cleaner', respones.coordinate)
        }
      } else {
        // 关闭弹窗
        that.bitmap.closePopup()
      }
    })
  },
  methods: {
    save: function () {
      console.log('save')
    },
    save2: function () {
      console.log('save2')
    },
    open3 () {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>
<style>
.map-container {
  width: 100%;
  height: 500px;
}

#baidumap {
  height: 50%;
}

.testclass {
  width: 300px;
  padding: 10px;
  background: white;
  text-align: center;
  color: red;
  border-radius: 10px;
}
</style>
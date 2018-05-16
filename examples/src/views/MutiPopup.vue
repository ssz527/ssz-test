<template>
  <div class="map-container">
    <div id="bitmap"></div>
    <muti-pop ref="popup" :popData="popData" @closePop="closePop" @showPop="showPop">

      <!-- <div slot="warn" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>

      <div slot="broadcast" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click.stop="alert(2222)">确 定</el-button>
      </div>

      <div slot="guarder" class="dialog-footer">
        <el-button>取 消</el-button>
        <div @click.stop="alert(1111)">确 定</div>
        <el-button type="primary" @click.stop="alert(1111)">确 定</el-button>
      </div> -->

    </muti-pop>
    <el-button type="primary" @click="clear()">清 除</el-button>
  </div>
</template>
<script>
/* eslint-disable */
import mapImg from '@/assets/images/u768.jpg'
import markerImg from '@/assets/images/icon.png'
import guarder from '@/assets/images/guard.png'
import broadcast from '@/assets/images/broadcast.png'
import cameraImg from '@/assets/images/u4838.png'
import warnImg from '@/assets/images/warn.png'
import cleanerImg from '@/assets/images/u4833.png'
import guarderImg from '@/assets/images/u4828.png'
import baseDefault from '@/assets/images/u887.png'
import baseWarn from '@/assets/images/u1076.png'
import countCamera from '@/assets/images/u349.png'
import countBroadcast from '@/assets/images/u950.png'
import countWarning from '@/assets/images/u787.png'
import map from '@/assets/images/umap.jpg'

export default {
  name: 'MutiPopup',
  data () {
    return {
      // eslint-disable-next-line
      bitmap: null,
      items: 0,
      popName: '',
      catchs: {},
      popData: {
        Prefix: 'hsmap-popup',
        maxNum: 5
      }
    }
  },
  created () {

  },
  mounted () {
    console.log('mounted')
    console.log(this)
    // eslint-disable-next-line
    this.bitmap = new hdmap.initMap({
      gisEngine: 'bitmap',
      sizeW: 1920,
      sizeH: 1080,
      domId: 'bitmap',
      mapUrl: mapImg,
      maxZoom: 7,
      minZoom: 2,
      center: [112.334403, 39.8],
      centerGPS: [112.334403, 39.8],
      scale: 2,
      scaleType: 1,
      rotate: true
    })
    // 添加点位
    this.addmarker()
    var coo = this.bitmap.transfromWGSToBitMap([112.334403, 39.8])
    let that = this
    // 注册单击事件
    this.bitmap.regEventListener('singleclick', function (e) {
      if (e.feature) {
        console.log(that.bitmap.outterLayers)
        let n = that.bitmap.popupShowNum()
        console.log('curPopNum:' + n)
        if (n >= that.popData.maxNum) {
          alert('弹窗同时显示不能超过2个' + '当前个数：' + n)
        } else {
          if (that.$refs.popup.catchs[e.feature.id]) {
            that.bitmap.showPopup(that.$refs.popup.catchs[e.feature.id].id, e.feature.position)
            return
          }
          that.$refs.popup.createPop(that.bitmap, e.feature)
        }
      } else {
        // 关闭弹窗
        that.bitmap.closeTypePopup('broadcast')
      }
    })
  },
  methods: {
    addmarker () {
      let id = new Date().valueOf()
      this.bitmap.addMarker({
        id: 111,
        position: [0, 0],
        markerType: 'robot',
        name: id,
        imgUrl: warnImg
      })
      this.bitmap.addMarker({
        id: 333,
        position: [200, 100],
        markerType: 'signpost',
        name: id,
        imgUrl: guarder
      })
      this.bitmap.addMarker({
        id: 555,
        position: [-100, 100],
        markerType: 'broadcast',
        name: id,
        imgUrl: broadcast
      })
      this.bitmap.addMarker({
        id: 8888,
        position: [-150, 100],
        markerType: 'broadcast',
        name: id,
        imgUrl: broadcast
      })
      this.bitmap.addMarker({
        id: 9999,
        position: [-250, 100],
        markerType: 'broadcast',
        name: id,
        imgUrl: broadcast
      })
    },
    clear () {
      if (this.bitmap) {
        this.bitmap.closePopup()
        this.bitmap.clearMap(),
          this.items = [],
          this.catchs = {}
        this.addmarker()
      }
    },
    loadPopup () {
      this.$refs.popup.closepop()
    },
    closePop (id) {
      console.log(id)
      this.bitmap.closeSinglePopup(id)
    },
    showPop (feature, id) {
      console.log(feature, id)
      this.bitmap.showPopup(id, feature.position)
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
</style>

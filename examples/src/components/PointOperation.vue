<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <div id="Popup" style="text-align:center;">
      <span class="closePopup" @click="close">x</span>
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </div>
    <hr>
    <el-button type="warning" @click="clickWarn">开启告警点击事件</el-button>
    <el-button type="danger" @click="cancel">注销告警点击事件</el-button>
  </div>
</template>
<script>
  /* eslint-disable */
  import mapImg from '@/assets/images/u768.jpg'
  import markerImg from '@/assets/images/warn.png'
  export default {
    name: 'TestMap',
    data() {
      return {
        featureType:''
      }
    },
    mounted() {
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
        position: [-151, 39.4375],
        markerType: 'warn',
        name: id,
        imgUrl: markerImg,
        size: [38, 48]
      })
      // 添加弹框
      this.bitmap.addPopup('Popup')
    },
    methods: {
      close() {
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
      clickWarn() {
        this.featureType = 'warn'
        this.bitmap.regEventListener("singleclick", (e) => {
          this.bitmap.showPopup('Popup', e.coordinate)
        }, this.featureType)
      },
      cancel() {
        //注销点击事件
        this.featureType = 'warn';
        this.bitmap.unRegEventListener("singleclick", this.featureType);
        this.close()
      }
    },
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
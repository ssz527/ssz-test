<template>
  <div class="map-container" style="position:relative;">
    <div id="tempDiv" style="position:absolute;z-index:-1;"></div>
    <div id="bitmap" style="z-index:99;"></div>
    <!--摄像头弹窗 -->
    <div style="z-index:-1;position: absolute;left: 0;top: 0;" id="popwrap">
      <div v-for="(item, index) in items" class="popup" :key="index" style="position: absolute;left: 0;top: 0;">
        <div class="popup" :id="Prefix + index" @click="popshow(item, Prefix + index)">
          <a href="#" id="popup-closer" class="ol-popup-closer" @click.stop="closepop(Prefix + index)"></a>

          <div id="broadpop" v-if="catchs[item.id].feature.markerType === 'broadcast'">
            <el-switch v-model="value3" active-text="按月付费" inactive-text="按年付费">
            </el-switch>
          </div>
          <div id="broadpop" v-if="catchs[item.id].feature.markerType === 'video'">
          <!-- <div id="videopop" v-if="vflag"> -->
            <el-alert title="成功提示的文案" type="success" center></el-alert>
            <div id="change">切换地图啦</div>
          </div>
          <div id="broadpop" v-if="catchs[item.id].feature.markerType === 'camera'">
          <!-- <div id="warnpop" v-if="wflag"> -->
            <el-alert title="成功提示的文案" type="success" center></el-alert>
            <el-alert title="警告提示的文案" type="warning" center></el-alert>
          </div>

        </div>
      </div>
    </div>
    <ul class="changemap">
      <li>
        <el-button type="primary" @click="changeMap(option1)">Map1</el-button>
      </li>
      <li>
        <el-button type="primary" @click="changeMap(option2)">Map2</el-button>
      </li>
      <li>
        <el-button type="primary" @click="cancel(1)">Map3</el-button>
      </li>
      <li>
        <el-button type="primary" @click="cancel(2)">Map4</el-button>
      </li>
      <li>
        <el-button type="primary" @click="cancel(3)">Map5</el-button>
      </li>
      <li>
        <el-button type="primary" @click="start(1)">Map5</el-button>
      </li>
      <li>
        <el-button type="primary" @click="start(2)">Map5</el-button>
      </li>
      <li>
        <el-button type="primary" @click="start(3)">Map5</el-button>
      </li>
    </ul>
    <!-- <div id="broadcast">
      <el-switch v-model="value3" active-text="按月付费" inactive-text="按年付费">
      </el-switch>
    </div>
    <div id="video" @click="changeMap(option2)">
      <el-alert title="成功提示的文案" type="success" center></el-alert>
      <div id="change">切换地图啦</div>
    </div>
    <div id="warning">
      <el-alert title="成功提示的文案" type="success" center></el-alert>
      <el-alert title="警告提示的文案" type="warning" center></el-alert>
    </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import mapF from '@/assets/images/u768.jpg'
import mapS from '@/assets/images/u7602.png'
import test from '@/assets/images/hdmap.png'
import guarder from '@/assets/images/guard.png'
import broadcast from '@/assets/images/broadcast.png'
import baseDefault from '@/assets/images/u887.png'
import countBroadcast from '@/assets/images/u950.png'

let popupCtrl = {
  curZIndex: 1,
  curPopNum: 0,
  reset: function () {
    console.log('popupCtrl' + this.curPopNum)
    if (this.curPopNum === 0) {
      this.curZIndex = 1
    }
  },
  setPopupZIndex: function (popDom) {
    console.log(popDom +' ' + this.curZIndex)
    this.curZIndex++
    document.getElementById(popDom + '-wrapper').style.zIndex = this.curZIndex
  }
}


export default {
  name: 'CarTest',
  data () {
    return {
      maxPopNum: 5,
      items: [],
      Prefix: 'hsmap-popup',
      popName: '',
      catchs: {},
      /* eslint-disable */
      overlay: new ol.Overlay({}),
      mapObj: null,
      value3: true,
      cacheMapList: {},
      option0: {
        id: '000',
        gisEngine: 'bitmap',
        domId: 'bitmap',
        mapUrl: test,
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8]
        // popupDom: {
        //   popup: 'popup',
        //   popupcloser: 'popup-closer',
        //   popupcontent: 'popup-content'
        // }
      },
      option1: {
        id: '001',
        gisEngine: 'bitmap',
        domId: 'bitmap',
        mapUrl: mapF,
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8]
        // attribution: true,
        // controlZoom: false,
        // dragPan: false
      },
      option2: {
        id: '002',
        gisEngine: 'bitmap',
        domId: 'bitmap',
        mapUrl: mapS,
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8]
        // popupDom: {
        //   popup: 'popup',
        //   popupcloser: 'popup-closer',
        //   popupcontent: 'popup-content'
        // }
      },
      flag: true,
      areaflag: true,
      polyCoords1: [
        [
          [-42.5, 94.9375],
          [-41.5, 33.9375],
          [-151, 39.4375],
          [-151.5, 99.4375],
          [-68.5, 112.9375],
          [-42.5, 93.9375]
        ]
      ],
      polyCoords2: [
        [
          [42.5, 94.9375],
          [41.5, 33.9375],
          [151, 39.4375],
          [151.5, 99.4375],
          [68.5, 112.9375],
          [42.5, 93.9375]
        ]
      ],
      polyCoords3: [[[-100, 100], [100, 100], [100, -100], [-100, -100]]],
      style: '',
      areaid: '',
      selFeatures: {}
    }
  },
  mounted () {
    console.log('mounted')
    console.log('hdmap create')
    this.changeMap(this.option1)
    // let that = this
    // setInterval(function () {
    //   that.changeMap(that.option1)
    // }, 5000)
  },
  methods: {
    popshow (feature, id) {
      console.log(feature)
      this.mapObj.showPopup(id, feature.position)
    },
    changeMap (option) {
      let _this = this
      // 判断地图是否存在
      if (this.mapObj) {
        // 存储弹窗
        // this.mapObj.saveOutterPopup(['broadcast', 'video', 'warning'])
        console.log(this.items)
        // 关闭弹窗
        this.mapObj.closePopup()
        // 清空地图容器
        this.mapObj.clearMap()
        this.mapObj.getMap().setTarget(null)
      }
      for (var o in this.cacheMapList) {
        console.log(this.cacheMapList[o].getMap().ol_uid)
      }
      // 已经初始化的地图可以直接获取地图对象，进行地图的替换即可
      if (this.cacheMapList[option.id]) {
        this.mapObj = this.cacheMapList[option.id]
        this.mapObj.getMap().setTarget('bitmap')
        // this.mapObj.addPopup('broadcast')
        // this.mapObj.addPopup('video')
        // this.mapObj.addPopup('warning')
        this.addMarker(option)
        this.addArea(option)
        this.singerevent(option)
        // console.log(this.mapObj.getMap().getLayers().array_)
        return
      }
      // 如果没有初始化过，才需要进行地图的初始化
      this.cacheMapList[option.id] = new hdmap.initMap(option)
      this.mapObj = this.cacheMapList[option.id]
      this.mapObj.getMap().setTarget('bitmap')
      // this.mapObj.clearMap()
      // this.mapObj.addPopup('broadcast')
      // this.mapObj.addPopup('video')
      // this.mapObj.addPopup('warning')
      this.addMarker(option)
      this.addArea(option)
      this.singerevent(option)
    },
    addMarker (option) {
      if (option.id === '001') {
        this.mapObj.addMarkers([
          {
            id: 333,
            position: [200, -100],
            markerType: 'broadcast',
            markerName: '6666',
            imgUrl: broadcast
          },
          {
            id: 555,
            position: [-200, 100],
            markerType: 'video',
            markerName: '7777',
            imgUrl: guarder
          },
          {
            id: '0001',
            position: [-200, 80],
            markerType: 'video',
            markerName: 'this is four',
            imgUrl: guarder
          },
          {
            id: '0002',
            position: [-200, 120],
            markerType: 'video',
            markerName: 'this is three',
            imgUrl: guarder
          },
          {
            id: '0003',
            position: [-180, 100],
            markerType: 'video',
            markerName: 'this',
            imgUrl: guarder
          },
          {
            id: '0004',
            position: [-220, 100],
            markerType: 'video',
            markerName: 'this is one',
            imgUrl: guarder
          },
          {
            id: 7777,
            position: [150, -100],
            markerType: 'broadcast',
            markerName: '111111',
            imgUrl: broadcast
          }
        ])
        this.mapObj.addCountMarker({
          id: 22,
          markerName: 22,
          markerType: 'countBroadcast',
          position: [-120, 10],
          url: countBroadcast,
          baseUrl: baseDefault,
          broadcastNum: '8'
        })
        let id = new Date().valueOf()
        // 添加点位
        this.mapObj.addMarker({
          id: 111111111,
          position: [0, 0],
          markerType: 'camera',
          name: id,
          imgUrl: broadcast
        })
        this.mapObj.addMarker({
          id: 33333333,
          position: [200, 100],
          markerType: 'camera',
          name: id,
          imgUrl: broadcast
        })
        this.mapObj.addMarker({
          id: 555555555,
          position: [-100, 100],
          markerType: 'camera',
          name: id,
          imgUrl: broadcast
        })
      } else {
        this.mapObj.addMarkers([
          {
            id: 444,
            position: [-100, -100],
            markerType: 'broadcast',
            markerName: '6666',
            imgUrl: broadcast
          },
          {
            id: 666,
            position: [150, 100],
            markerType: 'video',
            markerName: '8888',
            imgUrl: guarder
          }
        ])
        let id = new Date().valueOf()
        // 添加点位
        this.mapObj.addMarker({
          id: 33333333333333,
          position: [0, 0],
          markerType: 'camera',
          name: id,
          imgUrl: broadcast
        })
        this.mapObj.addMarker({
          id: 44444444444444444,
          position: [200, 100],
          markerType: 'camera',
          name: id,
          imgUrl: broadcast
        })
        this.mapObj.addMarker({
          id: 1111111111111111111111,
          position: [-100, 100],
          markerType: 'camera',
          name: id,
          imgUrl: broadcast
        })
      }
    },
    singerevent (option) {
      let that = this
      that.mapObj.regEventListener('singleclick', function (e) {
        console.log(e)
        if (e.feature) {
          let n = that.mapObj.popupShowNum()
          // popupCtrl.curPopNum = n
          console.log('curPopNum:' + n)
          if (n >= that.maxPopNum) {
            alert('弹窗同时显示不能超过2个' + '当前个数：' + n)
          } else {
            if (that.catchs[e.feature.id]) {
              that.mapObj.showPopup(that.catchs[e.feature.id].id, e.feature.position)
              // popupCtrl.setPopupZIndex(that.catchs[e.feature.id].id)
              return
            }
            that.createPop(e.feature)
          }
        } else {
          // that.mapObj.closePopup()
        }
      })
    },
    addArea (option) {
      if (option.id === '001') {
        this.mapObj.addArea({
          id: '2525',
          name: '22222',
          areaType: 'areatest',
          borderPoints: this.polyCoords1
        })
        this.mapObj.warnAnimation({
          id: '2525',
          name: '22222',
          areaType: 'areatest',
          borderPoints: this.polyCoords1
        })
        this.mapObj.addArea(
          {
            id: '0002',
            name: '0006',
            deviceId: '0006',
            areaType: '2',
            borderPoints: this.polyCoords2
          },
          {
            fillColor: 'rgba(139,35,35,0.5)',
            strokeColor: 'orange'
          }
        )
        this.mapObj.warnAnimation({
          id: '0002',
          name: '0006',
          deviceId: '0006',
          areaType: '2',
          borderPoints: this.polyCoords2
        })
        this.mapObj.addArea({
          id: '0001',
          name: '0005',
          areaType: '5',
          borderPoints: this.polyCoords3
        })
        this.mapObj.warnAnimation({
          id: '0001',
          name: '0005',
          areaType: '5',
          borderPoints: this.polyCoords3
        })
        this.mapObj.updateArea(
          {
            id: '0001',
            name: '0005',
            areaType: '5',
            borderPoints: this.polyCoords3
          },
          hdmap.commonConfig.getNormalRouteStyle()
        )
      } else {
        this.mapObj.addArea(
          {
            id: '5252',
            name: '22222',
            deviceId: '2222222',
            areaType: 'areatest',
            borderPoints: this.polyCoords2
          },
          {
            fillColor: 'rgba(139,35,35,0.5)',
            strokeColor: 'orange'
          }
        )
      }
    },
    createPop (feature) {
      var id = feature.id
      var position = feature.position
      this.items.push(feature)
      this.popName = this.items.length - 1
      this.catchs[id] = {
        id: this.Prefix + this.popName,
        feature: feature,
        zIndex: -1
      }
      setTimeout(() => {
        if (document.getElementById(this.catchs[id].id)) {
          this.mapObj.addPopup({ domId: this.catchs[id].id, visible: true })
          this.mapObj.showPopup(this.catchs[id].id, position)
        }
      }, 0)
    },
    closepop (index) {
      console.log(index)
      this.mapObj.closeSinglePopup(index)
    },
    cancel (num) {
      if (num === 1) {
        this.mapObj.warnCancel({
          id: '2525',
          name: '22222',
          areaType: 'areatest',
          borderPoints: this.polyCoords1
        })
      } else if (num === 2) {
        this.mapObj.warnCancel({
          id: '0002',
          name: '0006',
          deviceId: '0006',
          areaType: '2',
          borderPoints: this.polyCoords2
        })
      } else if (num === 3) {
        this.mapObj.warnCancel({
          id: '0001',
          name: '0005',
          areaType: '5',
          borderPoints: this.polyCoords3
        })
      }
    },
    start (num) {
      if (num === 1) {
        this.mapObj.warnAnimation({
          id: '2525',
          name: '22222',
          areaType: 'areatest',
          borderPoints: this.polyCoords1
        })
      } else if (num === 2) {
        this.mapObj.warnAnimation({
          id: '0002',
          name: '0006',
          deviceId: '0006',
          areaType: '2',
          borderPoints: this.polyCoords2
        })
      } else if (num === 3) {
        this.mapObj.warnAnimation({
          id: '0001',
          name: '0005',
          areaType: '5',
          borderPoints: this.polyCoords3
        })
      }
    },
    removearea () {
      this.mapObj.removeArea({
        id: '2525',
        name: '22222',
        areaType: 'areatest',
        borderPoints: this.polyCoords1
      })
      this.mapObj.addArea({
        id: '5252',
        name: '22222',
        areaType: 'areatest',
        borderPoints: this.polyCoords2
      })
    },
    remove () {
      this.mapObj.clearMap({
        areaList: [
          {
            id: '2525',
            name: '22222',
            areaType: 'areatest',
            borderPoints: this.polyCoords1
          }
        ],
        markerList: [
          {
            id: 444,
            position: [-100, -100],
            markerType: 'broadcast',
            markerName: '6666',
            imgUrl: broadcast
          },
          {
            id: 666,
            position: [150, 100],
            markerType: 'video',
            markerName: '8888',
            imgUrl: guarder
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.map-container {
  width: 80%;
  height: 500px;
  position: relative;
}
#bitmap {
  position: absolute;
  left: 100px;
  height: 700px;
  width: 1000px;
}
.changemap {
  position: absolute;
  left: 0px;
  width: 100px;
  height: 300px;
}
.changemap li {
  width: 100px;
  height: 60px;
}
.testclass {
  width: 300px;
  padding: 10px;
  background: white;
  text-align: center;
  color: red;
  position: relative;
}
.popup {
  width: 300px;
  height: 100px;
  background: #fff;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: '✖';
}
</style>

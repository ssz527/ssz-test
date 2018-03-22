<template>
  <div class="map-container">
    <div id="bitmap"></div>
    <div id="park">
      <el-alert title="这是车位弹窗" type="success" center show-icon></el-alert>
    </div>
    <div id="car">
      <el-alert title="这是小汽车弹窗" type="warning" center show-icon></el-alert>
    </div>
    <div id="mark">
      <el-alert title="这是欠费标志弹窗" type="error" center show-icon></el-alert>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import bgtest from '@/assets/images/bgtest.jpg'
import guarder from '@/assets/images/guard.png'
import broadcast from '@/assets/images/broadcast.png'
import car from '@/assets/images/u23250.png'
import fixedPark from '@/assets/images/u23274.png'
import monthPark from '@/assets/images/u23266.png'
import TemporaryPark from '@/assets/images/u23282.png'
import arrearage from '@/assets/images/u21847.png'
import occupancy from '@/assets/images/u22459.png'
import mapF from '@/assets/images/u768.jpg'

export default {
  name: 'CarStyle',
  data () {
    return {
      /* eslint-disable */
      overlay: new ol.Overlay({}),
      mapObj: null,
      value3: true,
      cacheMapList: {},
      option: {
        id: '000',
        gisEngine: 'bitmap',
        domId: 'bitmap',
        mapUrl: bgtest,
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8],
        popupDom: {
          popup: 'popup',
          popupcloser: 'popup-closer',
          popupcontent: 'popup-content'
        }
      },
      polyCoords1: [
        [
          [-100.5, 140.9375],
          [-100.5, 55.9375],
          [-300.5, 55.9375],
          [-300.5, 140.9375]
        ]
      ],
      option1: {
        id: '001',
        gisEngine: 'bitmap',
        domId: 'bitmap',
        mapUrl: mapF,
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8],
        popupDom: {
          popup: 'popup',
          popupcloser: 'popup-closer',
          popupcontent: 'popup-content'
        }
      },
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
      polyCoords3: [
        [
          [-42.5, 94.9375],
          [-41.5, -33.9375],
          [-151, -39.4375],
          [-151.5, -99.4375],
          [-68.5, -112.9375],
          [42.5, 93.9375]
        ]
      ],
      scale: 2,
      rotation: Math.PI + 0.5
    }
  },
  mounted () {
    console.log('mounted')
    console.log('hdmap create')
    this.changeMap(this.option1)
  },
  methods: {
    changeMap (option) {
      let _this = this
      // 判断地图是否存在
      if (this.mapObj) {
        // 存储弹窗
        this.mapObj.saveOutterPopup(['park', 'car', 'mark'])
        // 关闭弹窗
        this.mapObj.closePopup()
        // 清空地图容器
        // this.remove()
        // this.removearea()
        this.mapObj.getMap().setTarget(null)
      }
      // 已经初始化的地图可以直接获取地图对象，进行地图的替换即可
      if (this.cacheMapList[option.id]) {
        this.mapObj = this.cacheMapList[option.id]
        this.mapObj.getMap().setTarget('bitmap')
        this.mapObj.addPopup('park')
        this.mapObj.addPopup('car')
        this.mapObj.addPopup('mark')
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
      this.mapObj.addPopup('park')
      this.mapObj.addPopup('car')
      this.mapObj.addPopup('mark')
      this.addMarker(option)
      this.addArea(option)
      this.singerevent(option)
    },
    addMarker (option) {
      if (option.id === '000') {
        this.mapObj.addMarker(
          {
            id: 222,
            position: [-200, 100],
            markerType: 'car',
            markerName: '222',
            imgUrl: fixedPark
          },
          {
            scale: this.scale,
            rotation: this.rotation
          }
        )
        this.mapObj.addMarker(
          {
            id: 111,
            position: [-200, 100],
            markerType: 'car',
            markerName: '111',
            imgUrl: car
          },
          {
            scale: this.scale,
            rotation: this.rotation
          }
        )
        this.mapObj.addMarker(
          {
            id: 333,
            position: [-200, 100],
            markerType: 'car',
            markerName: '333',
            imgUrl: arrearage
          },
          {
            scale: this.scale,
            color: 'red',
            rotation: this.rotation
          }
        )
      }
    },
    singerevent (option) {
      let that = this
      if (option.id === '000') {
        this.mapObj.regEventListener('singleclick', function (e) {
          if (e.feature) {
            if (e.feature.markerType === 'car' && e.feature.id === 111) {
              that.mapObj.showPopup('car', [0, 0])
            } else if (e.feature.markerType === 'car' && e.feature.id === 222) {
              that.mapObj.showPopup('park', [0, 0])
            } else if (e.feature.markerType === 'car' && e.feature.id === 333) {
              that.mapObj.showPopup('mark', [0, 0])
            }
          } else {
            that.mapObj.closePopup()
          }
        })
      } else {
        this.mapObj.getMap().on('pointermove', function (e) {
          var vector = that.mapObj.getLayerByKey('gisLayer')
          if (vector) {
            // 获取鼠标所在位置的feature
            var selectFeature = vector
              .getSource()
              .getFeaturesAtCoordinate(e.coordinate)
            if (selectFeature.length > 0) {
              // selectFeature[0].setStyle(
              //   // hdmap.commonConfig.getMouseOverAreaStyle()
              // )
            } else {
              that.mapObj.closePopup()
            }
          }
        })
        this.mapObj.regEventListener('singleclick', function (e) {
          if (e.feature) {
            if (e.feature.id) {
              that.changeMap(that.option)
            }
          }
        })
      }
    },
    addArea (option) {
      if (option.id === '000') {
        this.mapObj.addArea(
          {
            id: '2525',
            name: '22222',
            areaType: 'areatest',
            borderPoints: this.polyCoords1,
            visible: true
          },
          {
            fillColor: 'rgba(238,99,99,0.5)',
            strokeColor: '#b7eba8',
            strokeWidth: 5
          }
        )
      } else {
        this.mapObj.addArea(
          {
            id: '5252',
            name: '11111',
            areaType: 'areatest',
            borderPoints: this.polyCoords2
          }, {
            fillColor: 'rgba(238,99,99,0.5)',
            strokeColor: '#b7eba8',
            strokeWidth: 5
          }
        )
        this.mapObj.addArea(
          {
            id: '2525',
            name: '22222',
            areaType: 'areatest',
            borderPoints: this.polyCoords3
          }, {
            fillColor: 'rgba(238,99,99,0.5)',
            strokeColor: '#b7eba8',
            strokeWidth: 5
          }
        )
      }
    }
  }
}
</script>
<style scoped>
.map-container {
  width: 90%;
  height: 500px;
  position: relative;
}
#bitmap {
  left: 100px;
  height: 500px;
  width: 900px;
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
</style>

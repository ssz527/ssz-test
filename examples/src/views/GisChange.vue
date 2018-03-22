<template>
  <div class="map-container">
    <div id="bitmap"></div>
    <div id="control">
      <el-radio-group v-model="radio" @change="changeHandler">
        <el-radio class="radio" label="1" >百度卫星图</el-radio>
        <el-radio class="radio" label="2">百度普通地图</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'GisChange',
  data() {
    return {
      mapObj: null,
      cacheMapList: [],
      radio: '1',
      option: {
        id: '000',
        gisEngine: 'baidu',
        domId: 'bitmap',
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8],
        popupDom: {
          popup: 'popup',
          popupcloser: 'popup-closer',
          popupcontent: 'popup-content'
        },
        sat: 0
      },
      option1: {
        id: '001',
        gisEngine: 'baidu',
        domId: 'bitmap',
        sizeW: 1920,
        sizeH: 1080,
        maxZoom: 10,
        minZoom: 1,
        center: [112.334403, 39.8],
        popupDom: {
          popup: 'popup',
          popupcloser: 'popup-closer',
          popupcontent: 'popup-content'
        },
        sat: 1
      }
    }
  },
  mounted() {
    this.changeMap()
  },
  methods: {
    changeMap() {
      this.cacheMapList[0] = new hdmap.initMap(this.option)
      this.cacheMapList[1] = new hdmap.initMap(this.option1)
      this.cacheMapList[0].getMap().setTarget(null)
      this.cacheMapList[1].getMap().setTarget('bitmap')
      // this.mapObj = this.cacheMapList[option.id]
      // this.mapObj.getMap().setTarget('bitmap')
      // console.log(this.cacheMapList)

      // this.mapObj = new hdmap.initMap(option)
      // this.mapObj.getMap().setTarget('bitmap')
    },
    changeHandler(value) {
      var that = this
      if (value === '1') {
        this.cacheMapList[0].getMap().setTarget(null)
        this.cacheMapList[1].getMap().setTarget('bitmap')
      } else if (value === '2') {
        this.cacheMapList[1].getMap().setTarget(null)
        this.cacheMapList[0].getMap().setTarget('bitmap')
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
#control {
  padding: 20px 0;
  background: rgba(186, 85, 211, 0.8);
  width: 900px;
}
</style>

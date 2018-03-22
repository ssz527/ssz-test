<template>
  <div id="mapcontainer">
    <div v-if="errorComment" class="errorInfo">地图加载失败</div>
    <div id="map_wrap" class="map_wrap"></div>
  </div>
</template>

<script>
import { mapOptionFormat } from '@/globalcomponents/map_init/assets/js/util'
export default {
  name: 'MapInit',
  props: ['domId', 'option'],
  data () {
    return {
      errorComment: false,
      mapObj: null,
      cacheMapList: {},
      borderPoints: [[[-165.9375, 84.375], [-149.0625, -73.125], [122.8125, 14.0625], [42.1875, 133.125], [-165.9375, 84.375]]],
      borderPoints1: [[[-267.65625, -35.625], [-267.65625, -35.625], [-162.65625, -32.8125], [-185.15625, -182.8125], [-330.46875, -180.9375]]]
    }
  },
  methods: {
    createmap (option, popupArray) {
      let options = mapOptionFormat(option)
      // 判断地图是否存在
      if (this.mapObj) {
        this.mapObj.clearMap()
        this.mapObj.closePopup()
        if (popupArray && popupArray.length) {
          this.mapObj.saveOutterPopup(popupArray)
        }
        this.mapObj.getMap().setTarget(null)
      }
      // 已经初始化的地图可以直接获取地图对象，进行地图的替换即可
      if (this.cacheMapList[options.mapId]) {
        this.mapObj = this.cacheMapList[options.mapId]
        this.mapObj.getMap().setTarget('map_wrap')
        if (popupArray && popupArray.length) {
          for (let i = 0, len = popupArray.length; i < len; i++) {
            this.mapObj.addPopup(popupArray[i])
          }
        }
        return
      }
      // 如果没有初始化过，才需要进行地图的初始化
      // eslint-disable-next-line
      this.cacheMapList[options.mapId] = new hdmap.initMap(options)
      this.mapObj = this.cacheMapList[options.mapId]
      this.mapObj.getMap().setTarget('map_wrap')
      if (popupArray && popupArray.length) {
        for (let i = 0, len = popupArray.length; i < len; i++) {
          this.mapObj.addPopup(popupArray[i])
        }
      }
      this.mapObj.addArea(
        {
          borderPoints: this.borderPoints,
          areaType: 'gis',
          id: '001'
        }, {
          fillColor: 'rgba(255, 20, 20, 0.5)'
        }
      )
      this.mapObj.addArea(
        {
          borderPoints: this.borderPoints1,
          areaType: 'gis',
          id: '002'
        }, {
          fillColor: 'rgba(255, 20, 20, 0.5)'
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
#mapcontainer {
  margin: 0 auto;
  background: #55616d;
  overflow: hidden;
}
.map_wrap {
  width: 1200px;
  height: 800px;
}
</style>

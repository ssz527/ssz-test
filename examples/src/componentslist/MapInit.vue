<template>
  <div class="map_container">
    <MapInit ref="mapinit" :domId="domId" class="map_wrap" :option="options"></MapInit>
    <div id="control">
      <div v-for="(item, index) in dataList" :key="item.name" @click="changeStyle(item, index)" class="icon-btn"
      :class="{ togBefore: item.actived === true, togAfter: item.actived === false}">
        <img :src="item.srcInfo" class="arrow" height="16">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import cameraIcon from '@/assets/images/u815.png'
import cameraIconChange from '@/assets/images/u349.png'
import broadcastIcon from '@/assets/images/u803.png'
import broadcastIconChange from '@/assets/images/u939.png'
const images = [
  { first: cameraIcon, second: cameraIconChange },
  { first: broadcastIcon, second: broadcastIconChange }
]
export default {
  name: 'MapInitTest',
  data() {
    return {
      domId: 'mapinit',
      dataList: [
        {
          name: '摄像头',
          actived: true,
          srcInfo: images[0].second
        },
        {
          name: '广播',
          actived: false,
          srcInfo: images[1].first
        }
      ],
      options: {
        id: '4bbb1d5badc04299a0efdc7335a5b1d1',
        courtUuid: 'UNKOWN',
        sceneName: 'test_小区全图',
        url: 'http://192.168.0.246:8888/group1/M00/0D/3F/wKgA9lpygl6AFVUAAAK8hml0w74190.jpg',
        gpsLon: null,
        gpsLat: null,
        centerLon: 113.621698,
        centerLat: 23.30521,
        scale: 1,
        scaleType: 1,
        height: 1080,
        width: 1920,
        realHeight: null,
        realWidth: null,
        orgCode: '',
        sceneType: 1,
        createUser: 'testUser',
        updateUser: 'admin',
        deleteFlag: 1,
        parentArea: null,
        countWarning: 1,
        createTime: 1517453918210,
        updateTime: 1517887905040,
        orgName: '恒大山水城二期'
      },
      deepCopy: {}
    }
  },
  mounted() {
    this.$refs.mapinit.createmap(this.options)
  },
  methods: {
    changeStyle(item, index) {
      item.actived = !item.actived
      item.srcInfo = item.actived ? images[index].second : images[index].first
    }
  }
}
</script>
<style scoped>
.map_container {
  position: relative;
}
.map_wrap {
  /* width: 1400px;
  height: 800px; */
}
#control {
  position: absolute;
  right: 50px;
  top: 20px;
}
.icon-btn {
  display: inherit;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 60px;
  text-align: center;
  vertical-align: middle;
  z-index: 10;
  font-size: 0.7em;
  cursor: pointer;
  color: #666;
  border-radius: 2px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-around;
  align-items: center;
  float: left;
  margin-left: 20px;
}
.arrow {
  margin-top: 10px;
  margin-bottom: -8px;
}
.togBefore {
  color: white !important;
  background: rgba(34, 156, 255, 1) !important;
}
.togAfter {
  color: 666 !important;
  background: #f2f2f2 !important;
}
</style>

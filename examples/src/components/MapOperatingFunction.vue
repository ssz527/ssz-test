<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%; height: 600px;"></div>

    <el-row class='row'>
      <el-col :span="3">
        <el-button type="primary" @click='setCenter'>设置地图中心</el-button>
      </el-col>
      <el-col :span="8">
        <el-input v-model="input" placeholder="请输入坐标数组如[x,y]"></el-input>
      </el-col>
    </el-row>
    <el-row class='row'>
      <el-col :span="3">
        <el-button type="success" @click='getCenter'>获取地图中心</el-button>
      </el-col>
      <el-col :span="8">
        <el-input v-model="input1"></el-input>
      </el-col>
    </el-row>
    <el-row class='row'>
      <el-col :span="3">
        <el-button type="warning" @click='setZoom'>设置放大等级</el-button>
      </el-col>
      <el-col :span="8">
        <el-input v-model="zoom" placeholder="请输入地图放大倍数"></el-input>
      </el-col>
    </el-row>
    <el-row class='row'>
      <el-col :span="3">
        <el-button type="danger" @click='getZoom'>获取放大等级</el-button>
      </el-col>
      <el-col :span="8">
        <el-input v-model="getzoom"></el-input>
      </el-col>
    </el-row>

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
        input: '',
        input1: '',
        zoom: '',
        getzoom: ''
      }
    },
    mounted() {
      this.bitmap = new hdmap.initMap({
        gisEngine: 'bitmap',
        sizeW: 1920,
        sizeH: 1080,
        domId: 'bitmap',
        mapUrl: mapImg,
        maxZoom: 7,
        minZoom: 3,
        center: this.input,
        popupDom: {
          popup: 'popup',
          popupcloser: 'popup-closer',
          popupcontent: 'popup-content'
        }
      })
    },
    methods: {
      setCenter() {
        let input = JSON.parse(this.input)
        this.bitmap.setCenter(input)
      },
      getCenter() {
        this.input1 = JSON.stringify(this.bitmap.getCenter());
      },
      setZoom() {
        let zoom = JSON.parse(this.zoom)
        this.bitmap.setZoom(zoom)
      },
      getZoom() {
        this.getzoom = this.bitmap.getZoom();
      }
    },


  }
</script>
<style scoped>
  .row {
    margin-top: 4px;
  }
</style>
<template>
  <div id="app">

    <el-container class="main-content">
      <el-header class="header-style">
        <!-- <img src="./assets/logo.png" class="logo"> -->
        <div class="system-title">地图引擎HDMAP功能vue项目测试</div>
        <!-- <div class="right-menus">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px; font-size:20px;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>设置</span>
        </div> -->
      </el-header>
      <el-container>
        <el-aside>
          <aside-menu :item-list="functionList"></aside-menu>
          <!-- <div @click="search">获取配置</div> -->
          <!-- <div>{{configInfo}}</div> -->
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <!-- <el-footer>
        footer
      </el-footer> -->
    </el-container>
  </div>
</template>

<script>
/* eslint-disable */
import AsideMenu from '@/components/AsideMenu'
import axios from 'axios'
import config from './config/config'

export default {
  name: 'app',
  data () {
    return {
      functionList: [
        {
          name: '介绍',
          url: '/'
        },
        {
          name: '初始化',
          url: '/testmap'
        },
        {
          name: 'baiduMap',
          url: '/baiduMap'
        },
        {
          name: '区域重心',
          url: '/areacenter'
        },
        {
          name: '添加一个区域',
          url: '/addarea'
        },
        {
          name: '添加多个区域',
          url: '/addareas'
        },
        {
          name: '地图路线、区域编辑',
          url: '/editmap'
        },
        {
          name: '点位、区域样式 | 弹窗',
          url: '/wzkmaptest'
        },
        {
          name: '区域综合操作',
          url: '/updatearea'
        },
        {
          name: '车场测试',
          url: '/cartest'
        },
        {
          name: '计算',
          url: '/sjwmap'
        },
        {
          name: '切片计算',
          url: '/tilecalculate'
        },
        {
          name: '点位操作-事件处理',
          url: '/pointoperation'
        },
        {
          name: '地图操作函数',
          url: '/mapoperatingfunction'
        },
        {
          name: '点位聚合',
          url: '/pointaggregation'
        },
        {
          name: '路线巡更样式',
          url: '/routestyle'
        },
        {
          name: '停车场样式编辑',
          url: '/parkinglot'
        },
        {
          name: '车场样式',
          url: '/carstyle'
        },
        {
          name: '卫星图切换',
          url: '/gischange'
        },
        {
          name: '车位编辑',
          url: '/parktest'
        },
        {
          name: '组件测试',
          url: '/componentstest'
        },
        {
          name: '高德地图',
          url: '/gaodemap'
        },
        {
          name: '弹窗多显',
          url: '/mutipopup'
        },
        {
          name: '切片地图',
          url: '/tilemap'
        },
        {
          name: '切片测试',
          url: '/tiletest'
        },
        {
          name: 'GPS点位映射',
          url: '/vueexcel'
        }
      ]
      // configInfo: 'init'
    }
  },
  components: { AsideMenu },
  methods: {
    search: function () {
      console.log('search function')
      axios.post(config.url('getConfig')).then(function (rep) {
        console.log(rep)
      })
    }
  }
}
</script>

<style lang="less">
@import "../src/style/index.less";
.header-style {
  background-color: #1f6b75;
}

.system-title {
  color: #fff;
  font-size: 160%;
  font-weight: bold;
}
</style>
<template>
  <div class="map-container">
    <el-container>
      <el-aside>
        <div class="aside-menu">
          <div v-for="(item, index) in dataList" :key="index" class="list-item" @click="goTo(item.path)">
            <span>{{item.name}}</span>
          </div>
        </div>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'ComponentsTest',
  data() {
    return {
      dataList: [
        {
          name: 'MapInitTest',
          path: '/componentstest/mapinit'
        },
        {
          name: 'TableTest',
          path: '/componentstest/table'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    goTo(router) {
      this.$router.push({ path: router })
    }
  }
}
</script>
<style scoped>
.map-container {
  position: relative;
}
.aside-menu {
  background-color: #252323;
  /* position: absolute;
  left: 0;
  top: 0; */
}
.list-item {
  margin: 0 20px;
  padding: 10px 0;
  height: 20px;
  color: #eeeeee;
  border-bottom: solid 1px #555;
  text-align: center;
  cursor: pointer;
}
</style>

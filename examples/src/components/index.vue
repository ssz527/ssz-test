<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <p>
        地图引擎hdmap是使用openlayers 4.5.0版本封装出的一套js类库，暴露了一系列web API供恒大智慧小区项目使用。
      </p>
      <p>
        应用可以通过地图引擎API处理GIS地图和光栅图，可以实现地图的显示和缩放移动等地图操作。 
        <br>
        应用也可以在地图上实现点位管理、路线绘制和区域描边等功能，以实现各个小区管理、停车场、门禁、巡更等场景的业务需求。
      </p>
      <p>
        地图引擎会在系统应用的主框架处引入。在引入地图引擎后，会在全局对象上存在一个hdmap对象， 
        在hdmap上包含了地图的初始化函数initMap，地图管理器mapManager，地图默认样式集mapCommonConfig，地图工具函数集utils等属性。
      </p>
    </div>
    <h2>Go To Map</h2>
    <ul>
      <li>
        <router-link to="/baidumap">baidu Map</router-link>
      </li>
      <li>
        <router-link to="/testmap">test Map</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '恒大智慧小区地图引擎项目介绍'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.hello {
  p {
    font-size: 16;
    text-align: left;
    padding-left: 200px;
  }
}
</style>
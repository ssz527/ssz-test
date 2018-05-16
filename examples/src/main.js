// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './mock/mock'
import globalCom from './globalcomponents'
import 'hdmap'
// import 'openlayers'
import 'hdmap/dist/hdmap.css'
// import axios from 'axios'

Vue.use(globalCom)
Vue.use(ElementUI)

Vue.config.productionTip = false
// Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

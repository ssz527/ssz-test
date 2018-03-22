/**
 * mapManager 地图管理器
 * author: sunshengzhen
 * introduction: 作为地图编译入口，会对地图上有的内容进行整合
 */

// TODO: 需要完善作为manager的功能

// TODO: 需要实现一套map自己的style库

import 'myopenlayers'
import commonConfig from './commonConfig'
import HDMap from './hdmap.js'
import utils from './utils.js'

import '../extend-files/hdlayer-extends.js'
import '../extend-files/baidu-projection'
import '../extend-files/transforminteraction'

var hdmap = {
  initMap: HDMap,
  utils: utils,
  mapManager: {},
  commonConfig: commonConfig()
};
window.hdmap = hdmap;
export default hdmap;

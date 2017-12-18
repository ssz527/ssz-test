/**
 * mapManager 地图管理器
 */

//TODO: 需要完善作为manager的功能

//TODO: 需要实现一套map自己的style库

import 'myopenlayers'
import eventRegister from "./event-register.js"
import commonConfig from './commonConfig'
import HDMap from './hdmap.js'
import utils from './utils.js'

import '../extend-files/hdlayer-extends.js'
import '../extend-files/baidu-projection'

var hdmap = {
    initMap: HDMap,
    utils: utils,
    mapManager: {},
    commonConfig: commonConfig(),
    eventRegister: eventRegister
};
window.hdmap = hdmap;
export default hdmap;
/**
 * filename: layerManager.js
 * author: sunshengzhen
 * introduction: 进行图层管理的方法类在这里实现
 */

// feature类型和图层对照
const layerMap = {
  // 摄像头图层
  camera: 'cameraLayer',
  // 音频设备图层
  video: 'videoLayer',
  // 保安图层
  guarder: 'guarderLayer',
  // 保洁图层
  cleaner: 'cleanerLayer',
  // 车辆设备图层
  car: 'carLayer',
  // 报警图层
  warning: 'warningLayer',
  // 默认显示图层
  common: 'commonLayer',
  // 区域显示图层
  gis: 'gisLayer',
  // 路线现实图层
  line: 'lineLayer',
  // 电子围栏报警点图层
  fence: 'fenceLayer',
  // 摄像头统计图层
  countCamera: 'countCameraLayer',
  // 报警统计图层
  countWarning: 'countWarningLayer',
  // 广播统计图层
  countBroadcast: 'countBroadcastLayer',
  // 摄像头统计底图图层
  countCameraBase: 'cameraBase',
  // 报警统计底图图层
  countWarningBase: 'warningBase',
  // 广播统计底图图层
  countBroadcastBase: 'broadcastBase',
  // 机器人图层
  robot: 'robotLayer',
  // 电子指路牌图层
  signpost: 'signpostLayer',
  // 广播图层
  broadcast: 'broadcastLayer',
  // 点位报警图层
  warnMarker: 'warnMarkerLayer',
  // 住户图层
  households: 'householdsLayer',
  // 访客图层
  visitor: 'visitorLayer',
  // 陌生人图层
  stranger: 'strangerLayer',
  // 门禁图层
  control: 'controlLayer',
  // 车闸图层
  brake: 'brakeLayer',
  // 人行道闸图层
  gates: 'gatesLayer',
  // 电梯图层
  elevator: 'elevatorLayer',
  // 地锁图层
  lock: 'lockLayer'
}
/**
 * 根据feature的type获取对应所在图层的名称
 * @param {String} type 点位类型
 * @param {int|undefine} zoomLevel 点位需要在哪个缩放等级显示
 */
function getLayerKeyByType (type, zoomLevel) {
  // TODO 这里可能需要根据类型的数据进行判断获取，暂时用map方式存取
  if (zoomLevel) {
    // 点位的类型，如果有点位显示等级，则类型要加上等级
    return type + 'Layer_' + zoomLevel
  } else {
    if (layerMap[type]) {
      return layerMap[type]
    } else {
      return layerMap.common
    }
  }
}
function getLayerMap () {
  return layerMap
}

const layerManager = {
  getLayerKeyByType: getLayerKeyByType,
  getLayerMap: getLayerMap
}
export default layerManager

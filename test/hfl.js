import '../src/hdmap/mapManager.js'
// import utils from '../src//hdmap/utils'
export const hfl = function () {
  window.mapH = new hdmap.initMap({
    gisEngine: 'bitmap',
    domId: 'mapH',
    sizeW: 1100,
    sizeH: 600,
    mapUrl: './assets/images/u7602.png',
    center: [110.619942, 25.304629],
    popupDom: {
      popup: 'popup4',
      popupcloser: 'popup-closer4',
      popupcontent: 'popup-content4'
    }
  })
  var polyCoords = [
    [
      [-45.5, 94.9375],
      [-41.5, 33.9375],
      [-151, 39.4375],
      [-151.5, 99.4375],
      [-68.5, 112.9375],
      [-42.5, 93.9375]
    ]
  ]
  var areaCenter = hdmap.utils.getAreaCenter(polyCoords[0]) // 获取重心
  var cameraCountPoint = hdmap.utils.getCameraCountPoint(polyCoords[0]) // 获取摄像头坐标
  var broadcastCountPoint = hdmap.utils.getBroadcastCountPoint(polyCoords[0]) // 获取广播坐标
  var warningConutPoint = hdmap.utils.getWarningConutPoint(polyCoords[0]) // 获取报警坐标
  // console.log(areaCenter)
  var areaInfo = {
    id: 888008,
    name: 'eastArea',
    areaType: '02',
    borderPoints: polyCoords
  }
  let id = new Date().valueOf()
  mapH.addArea(areaInfo)
  // 固定地图显示区域不收鼠标事件影响
  mapH.getMap().on('precompose', function () {
    mapH.updateArea(areaInfo, hdmap.commonConfig.getMouseOverAreaStyle())
  })
  mapH.addMarker({
    id: 88800,
    position: areaCenter,
    markerType: 'camera',
    name: id,
    imgUrl: './assets/images/icon.png',
    size: [32, 48]
  })
  mapH.addMarker({
    id: 88801,
    position: cameraCountPoint,
    markerType: 'guarder',
    name: id,
    imgUrl: './assets/images/guard.png',
    size: [36, 48]
  })
  mapH.addMarker({
    id: 88802,
    position: broadcastCountPoint,
    markerType: 'broadcast',
    name: id,
    imgUrl: './assets/images/broadcast.png',
    size: [38, 48]
  })
  mapH.addMarker({
    id: 88803,
    position: warningConutPoint,
    markerType: 'warning',
    name: id,
    imgUrl: './assets/images/warn.png',
    size: [38, 48]
  })
}

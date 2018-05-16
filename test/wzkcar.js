import '../src/hdmap/mapManager.js'
export const wzkcar = function () {
  window.mapObjWzk = null
  // 测试模块
  var option = {
    gisEngine: 'baidu',
    domId: 'mapW',
    sizeW: 1100,
    sizeH: 600,
    // mapUrl: '../assets/images/bmap.jpg',
    // mapUrl: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
    // satUrl: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=sl&p=1&scaler=1&udt=20171115',
    center: [110.619942, 25.304629],
    // sat: 1,
    popupDom: {
      popup: 'popupw',
      popupcloser: 'popup-closerw',
      popupcontent: 'popup-contentw'
    }
  }
  function mapinit (option) {
    if (mapObjWzk) {
      mapObjWzk.getMap().setTarget(null)
    }
    mapObjWzk = new hdmap.initMap(option)
    mapObjWzk.getMap().setTarget(mapW)
  }
  
  // let id = new Date().valueOf()
  var gis = document.getElementById('gis')
  var bmap = document.getElementById('bmap')
  mapinit(option)
  gis.onclick = function () {
    console.log(mapObjWzk.getZoom())
    option.sat = 0
    console.log(option)
    mapinit(option)
  }
  bmap.onclick = function () {
    option.sat = 1
    console.log(option)
    mapinit(option)
  }
}

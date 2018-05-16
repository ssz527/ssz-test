import '../src/hdmap/mapManager.js'
export const wzk1 = function () {
  window.mapObjwzk1 = {}
  // 测试模块
  var polyCoords = [
    [
      [-150.192114608162, 256.796067390244],
      [285.807885391838, 269.796067390244],
      [287.807885391838, 144.796067390244],
      [-49.192114608162, 137.796067390244],
      [-185.192114608162, 219.796067390244],
      [-150.192114608162, 257.796067390244]
    ]
  ]
  var polyCoords1 = [
    [
      [42.5, 94.9375],
      [41.5, 33.9375],
      [151, 39.4375],
      [151.5, 99.4375],
      [68.5, 112.9375],
      [42.5, 93.9375]
    ]
  ]
  var polyCoords2 = [
    [
      [-160.19377517278105, 261.00737392941807],
      [-160.19377517278105, 122.00737392941807],
      [53.806224827218955, 127.00737392941807],
      [47.306224827218955, 268.50737392941807],
      [-160.69377517278105, 263.50737392941807]
    ]
  ]
  window.map3 = new hdmap.initMap({
    gisEngine: 'bitmap',
    domId: 'map3',
    sizeW: 1100,
    sizeH: 600,
    mapUrl: './assets/images/u7602.png',
    center: [110.619942, 25.304629],
    popupDom: {
      popup: 'popup3',
      popupcloser: 'popup-closer3',
      popupcontent: 'popup-content3'
    },
    gisLayer: [polyCoords1],
  })
  let id = new Date().valueOf()
  map3.addMarker({
    id: 111,
    position: [0, 0],
    markerType: 'camera',
    name: id,
    imgUrl: './assets/images/icon.png',
    size: [32, 48]
  })
  map3.addMarker({
    id: 222,
    position: [-140, 40],
    markerType: 'warning',
    name: id,
    imgUrl: './assets/images/warn.png',
    size: [38, 45]
  })
  map3.addMarker({
    id: 333,
    position: [-50, 0],
    markerType: 'guarder',
    name: id,
    imgUrl: './assets/images/guard.png',
    size: [38, 45]
  })
  map3.addMarker({
    id: 444,
    position: [40, 50],
    markerType: 'broadcast',
    name: id,
    imgUrl: './assets/images/broadcast.png',
    size: [38, 45]
  })
  map3.addMarker({
    id: 555,
    position: [200, -30],
    markerType: 'guarder',
    name: id,
    imgUrl: './assets/images/guard.png'
    // size: [32, 48]
  })
  let features = [
    {
      extProperties: {
        markerImg: '../test/assets/images/u4838.png',
        markerName: '摄像头',
        markerType: 'camera'
      }
    },
    {
      extProperties: {
        markerImg: '../test/assets/images/u4828.png',
        markerName: '保安',
        markerType: 'guarder'
      }
    },
    {
      extProperties: {
        markerImg: '../test/assets/images/u4833.png',
        markerName: '保洁',
        markerType: 'cleaner'
      }
    }
  ]
  // console.log(document.getElementById('broadcast').offsetHeight)
  // console.log(document.getElementById('broadcast').parentNode)
  map3.addPopup('camera')
  map3.addPopup('broadcast')
  map3.addPopup('guarder')
  map3.addPopup('warning')
  // console.log(document.getElementById('broadcast').offsetHeight)
  // console.log(document.getElementById('broadcast').parentNode)
  // console.log(document.getElementById('broadcast').parentNode.offsetHeight)
  map3.regEventListener('singleclick', function (respones) {
    if (respones.feature) {
      var popupDomName = respones.feature.markerType
      if (popupDomName === 'camera') {
        map3.showPopup('camera', respones.coordinate)
      } else if (popupDomName === 'broadcast') {
        map3.showPopup('broadcast', respones.coordinate)
      } else if (popupDomName === 'guarder') {
        map3.showPopup('guarder', respones.coordinate)
      } else if (popupDomName === 'warning') {
        map3.showPopup('warning', respones.coordinate)
      } else {
        map3.popupDefault(respones.coordinate, 'this is featureArea')
      }
    } else {
      map3.popupMultipoint(respones.coordinate, features)
    }
  })

  map3.addMarker({
    id: 888,
    position: [30, -20],
    markerType: 'camera',
    name: id,
    imgUrl: '../src/assets/images/u22560.png'
    // size: [32, 48]
  })
  map3.addMarker({
    id: 999,
    position: [-50, 50],
    markerType: 'camera',
    name: id,
    imgUrl: './assets/images/u346.png',
    size: [32, 48]
  })
  var node = map3.createNode('wrap', 'div', 'id', 'hdmap-ol-popup', 'hdmap-ol-popup')
  console.log(node)
  // 监听动画事件

  // 更新点位样式
  var success = document.getElementById('success')
  var def = document.getElementById('default')
  var warningfeature = document.getElementById('warnfeature')
  var removemarker = document.getElementById('delete')
  success.onclick = function () {
    map3.updateMarker(
      {
        id: 555,
        position: [-200, 0],
        markerType: 'guarder',
        name: id,
        imgUrl: './assets/images/guard.png',
        size: [38, 48]
      }
    )
  }
  def.onclick = function () {
    map3.updateMarker({
      id: 111,
      position: [30, 20],
      markerType: 'camera',
      name: id,
      imgUrl: './assets/images/u4838.png',
      size: [32, 48]
    })
  }
  warningfeature.onclick = function () {
    map3.updateMarker({
      id: 222,
      position: [-140, 40],
      markerType: 'warning',
      name: id,
      imgUrl: './assets/images/u4833.png',
      size: [32, 48]
    })
  }
  removemarker.onclick = function () {
    map3.removeMarker({
      id: 111,
      position: [30, 20],
      markerType: 'camera',
      name: id,
      imgUrl: './assets/images/u4838.png',
      size: [32, 48]
    })
  }
  // 统计图标测试
  var camera = document.getElementById('countCamera')
  var cleaner = document.getElementById('countCleaner')
  var broadcast = document.getElementById('countBroadcast')
  var addb = document.getElementById('addb')
  var removecount = document.getElementById('removecount')
  camera.onclick = function () {
    map3.addCountMarker({
      id: 22,
      name: id,
      markerType: 'countCamera',
      position: [0, 10],
      url: '../assets/images/u349.png',
      baseUrl: '../assets/images/u887.png',
      cameraNum: '9'
    })
  }
  cleaner.onclick = function () {
    map3.addCountMarker({
      id: 33,
      name: id,
      markerType: 'countWarning',
      position: [10, 60],
      url: '../assets/images/u787.png',
      baseUrl: '../assets/images/u1076.png',
      warnNum: '99'
    })
  }
  broadcast.onclick = function () {
    map3.addCountMarker({
      id: 44,
      name: id,
      markerType: 'countBroadcast',
      position: [60, 10],
      url: '../assets/images/u950.png',
      baseUrl: '../assets/images/u887.png',
      broadcastNum: '333'
    })
  }
  removecount.onclick = function () {
    // map3.removeCountMarkers('countBroadcast')
    var all = [
      'camera',
      'video',
      'guarder',
      'cleaner',
      'car',
      'warning',
      'common',
      'gis',
      'line',
      'countCamera',
      'countWarning',
      'countBroadcast',
      'countCameraBase',
      'countBroadcastBase'
    ]
    for (var i = 0; i < all.length; i++) {
      // map3.removeCountMarkers(all[i])
      // map3.removeLayerByLayerKey(all[i])
    }
    map3.clearMap()
    console.log(map3.getOutterLayers())
  }
  addb.onclick = function () {
    map3.addCountMarker({
      id: 7777,
      name: id,
      markerType: 'countBroadcast',
      position: [-200, 100],
      url: '../assets/images/u950.png',
      baseUrl: '../assets/images/u887.png',
      broadcastNum: '333'
    })
  }
  // 显示隐藏统计类图标
  var checkcamera = document.getElementById('checkcamera')
  var checkwarning = document.getElementById('checkwarning')
  var checkbroadcast = document.getElementById('checkbroadcast')
  checkcamera.onclick = function () {
    if (this.checked) {
      map3.hideCountMarkers('countCamera')
    } else {
      map3.showCountMarkers('countCamera')
    }
  }
  checkwarning.onclick = function () {
    if (this.checked) {
      map3.hideCountMarkers('countWarning')
    } else {
      map3.showCountMarkers('countWarning')
    }
  }
  checkbroadcast.onclick = function () {
    if (this.checked) {
      map3.hideCountMarkers('countBroadcast')
    } else {
      map3.showCountMarkers('countBroadcast')
    }
  }
  // 弹窗显示
  var cpopup = document.getElementById('camerapop')
  var gpopup = document.getElementById('guarderpop')
  var mpopup = document.getElementById('morefeature')
  var bpopup = document.getElementById('broadcastpop')
  var closepop = document.getElementById('closepop')
  cpopup.onclick = function () {
    map3.showPopup('camera', [0, 0])
  }
  gpopup.onclick = function () {
    map3.popupDefault([0, 50], '我是默认弹窗')
  }
  mpopup.onclick = function () {
    map3.popupMultipoint([100, 0], features)
  }
  bpopup.onclick = function () {
    map3.showPopup('broadcast', [50, 50])
  }

  var polyCoords3 = [
    [
      [-42.5, 94.9375],
      [-41.5, 33.9375],
      [-151, 39.4375],
      [-151.5, 99.4375],
      [-68.5, 112.9375],
      [-42.5, 93.9375]
    ]
  ]
  var areaTest2 = {
    id: '2222222',
    name: 'testArea',
    areaType: '02',
    borderPoints: polyCoords3
  }
  closepop.onclick = function () {
    map3.clearMap({
      areaList: [
        {
          id: '2222222',
          name: 'testArea',
          areaType: '02',
          borderPoints: polyCoords3
        }
      ],
      markerList: [
        {
          id: 111,
          position: [30, 20],
          markerType: 'camera',
          imgUrl: './assets/images/icon.png',
          size: [32, 48]
        },
        {
          id: 222,
          position: [-140, 40],
          markerType: 'warning',
          imgUrl: './assets/images/warn.png',
          size: [38, 45]
        }
      ]
    })
  }

  var radius = 1
  var def = document.getElementById('defaultAreaw')
  var successing = document.getElementById('successAreaw')
  var add = document.getElementById('addAreaw')
  var closeWarn = document.getElementById('closewarn')

  // 增加固定显示的区域
  // map3.addArea(areaTest2)
  // map3.getMap().on('precompose', function() {
  //   map3.updateArea(areaTest2, hdmap.commonConfig.getMouseOverAreaStyle())
  // })

  add.onclick = function () {
    map3.addArea(areaTest2)
    map3.updateArea(areaTest2, hdmap.commonConfig.getMouseOverAreaStyle())
  }
  successing.onclick = function () {
    map3.updateArea(areaTest2, hdmap.commonConfig.getMouseOverAreaStyle())
  }
  def.onclick = function () {
    map3.warnAnimation(areaTest2)
  }
  closeWarn.onclick = function () {
    map3.warnCancel(areaTest2)
  }
}

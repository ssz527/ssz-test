import '../src/hdmap/mapManager.js'
import { wzk1 } from './wzktest'
import { mymap } from './mymap'
import { ssz } from './ssz/sszTest'
import { sjw } from './sjwtest'
import { hfl } from './hfl'
import { lly } from './lly'
import { wzkcar } from './wzkcar'
import { llytest } from './llytest'
window.onload = function () {
  window.mapObj = {}
  window.map1 = new hdmap.initMap({
    gisEngine: 'baidu',
    domId: 'map1',
    mapUrl:
      'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
    sat: 0,
    center: [113.619942, 23.304629],
    popupDom: {
      popup: 'popup',
      popupcloser: 'popup-closer',
      popupcontent: 'popup-content'
    }
  })
  // window.map2 = new hdmap.initMap({
  //   gisEngine: "baidu",
  //   domId: "map2",
  //   mapUrl:
  //     "http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115",
  //   sat: 0,
  //   center: [110.619942, 25.304629],
  //   popupDom: {
  //     popup: "popup2",
  //     popupcloser: "popup-closer2",
  //     popupcontent: "popup-content2"
  //   }
  // });
  map1.regEventListener('singleclick', function (e) {
    // console.log(e)
    // 如果是新增的就会加入在textarea中加入坐标，上面的参数根据需要自己修改
    var text = $('#markerPos').html()
    // console.log(e);
    if (e.feature) {
      // text += "(" + e.feature.getId() + "：[" + e.coordinate + "])\n";
      // console.log('click 时获取的areainfo：')
      // console.log(e.feature)
      chooseFeat = e.feature
      e.feature.areaTypesOf = 'parking'
      if (e.feature instanceof ol.AreaFeature) map1.editDrawShape(e.feature)
    } else {
      // text += "未取得值";
      if (map1.getMapEditState() === '') {
        text = e.coordinate
      }
    }
    $('#markerPos').val(text)
  })
  var chooseFeat = null
  $('#delFeature').on('click', function (e) {
    // if (chooseFeat) {
    // debugger
    map1.removeMarkerBylayerKey('a0111', 'gisLayer')
    // }
  })
  // map1.regEventListener('pointerdrag', function (e) {
  //   console.log('map1  鼠标拖动')
  //   console.log(e)
  // })

  // map2.regEventListener('singleclick', function (e) {
  //   console.log('点击地图2222222')
  //   if (e.feature) {
  //     // text += "(" + e.feature.getId() + "：[" + e.coordinate + "])\n";
  //   } else {
  //     // text += "未取得值";
  //   }
  // })

  // map2._map.on('pointermove', function (e) {
  //   console.log('map2  鼠标移动')
  // })
  // wzk
  wzk1()
  mymap()
  ssz()
  sjw()
  hfl()
  lly()
  wzkcar()
  llytest()

  /*
   tab控制器 
   */
  $('.tab-list .tab-item').click(function () {
    var linum = $(this).index()
    $('.tab-list .tab-item').eq(linum).stop().addClass('active').siblings().removeClass('active')
    $('.main-container .tab-panel').eq(linum).stop().removeClass('hidden').addClass('shown').siblings().addClass('hidden').removeClass('shown')
    for (var o in hdmap.mapManager) {
      hdmap.mapManager[o].getMap().updateSize()
    }
  })
}

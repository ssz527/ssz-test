import '../src/hdmap/mapManager.js';
export const llytest = function () {
  window.mapObjllyTest = {};
  // 测试模块

  window.map50 = new hdmap.initMap({
    gisEngine: 'bitmap',
    domId: 'map50',
    sizeW: 1100,
    sizeH: 600,
    mapUrl: './assets/images/u7602.png',
    center: [287, 144],
    popupDom: {
      popup: 'popup15',
      popupcloser: 'popup-closer15',
      popupcontent: 'popup-content15'
    }
  });
  let id = new Date().valueOf();
  var polyCoords1 = [
    [
      [-180.5, 94],
      [-190.5, 33],
      [-151, 39],
      [-151.5, 99],
      [158.5, 112],
      [50, 90],
      [-100, -80]
    ]
  ];
  var polyCoords2 = [
    [
      // [-230.5, 134.9375],
      // [-230.5, -90.9375],
      // [170, -90.4375],
      // [170, 159.4375],
      // [18.5, 152.9375]

      [42.5, 34.9375],
      [41.5, -53.9375],
      [121, -59.4375],
      [121.5, 59.4375],
      [68.5, 52.9375]
    ]
  ];
  var areaInfo = {
    id: 111,
    name: 'eastArea',
    areaType: '01',
    borderPoints: polyCoords1
  };
  var areaInformation = {
    id: 112,
    name: 'otherArea',
    areaType: '01',
    borderPoints: polyCoords2
  };
  map50.addArea(areaInfo);
  map50.addArea(areaInformation);
  hdmap.utils.judgePolygonsOverlap(
    [
      [-180.5, 94],
      [-190.5, 33],
      [-151, 39],
      [-151.5, 99],
      [158.5, 112],
      [50, 90],
      [-100, -80]
    ],
    [
      // [-230.5, 134.9375],
      // [-230.5, -90.9375],
      // [170, -90.4375],
      // [170, 159.4375],
      // [18.5, 152.9375]

      [42.5, 34.9375],
      [41.5, -53.9375],
      [121, -59.4375],
      [121.5, 59.4375],
      [68.5, 52.9375]
    ]
  );
};

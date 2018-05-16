import "../src/hdmap/mapManager.js";
export const lly = function() {
  window.mapObjlly = {};
  // 测试模块

  window.map5 = new hdmap.initMap({
    gisEngine: "bitmap",
    domId: "map5",
    sizeW: 1100,
    sizeH: 600,
    mapUrl: "./assets/images/u7602.png",
    center: [287, 144],
    popupDom: {
      popup: "popup5",
      popupcloser: "popup-closer5",
      popupcontent: "popup-content5"
    }
  });
  let id = new Date().valueOf();
  map5.addMarker({
    id: 2222,
    position: [50,90],
    markerType: "camera",
    name: id,
    imgUrl: "./assets/images/icon.png",
    size: [32, 48]
  });
  var polyCoords1 = [
    [
      [-180.5, 94], 
      [-190.5, 33],
      [-151, 39],
      [-151.5, 99],
      [158.5, 112],
      [50,90],
      [-100,-80]
    ]
  ];
  var areaInfo = {
    id: 111,
    name: "eastArea",
    areaType: "01",
    borderPoints: polyCoords1
  };
  map5.addArea(areaInfo);
hdmap.utils.judgePointInsidePolygon([50,90], 
  [ 
    [-180.5, 94], 
    [-190.5, 33],
    [-151, 39],
    [-151.5, 99],
    [158.5, 112],
    [50,90],
    [-100,-80]
  ]
  );  
};

import "../../src/hdmap/mapManager.js";
export const ssz = function () {
  console.log('ssz init')
  if (map3) {
    var polyCoords1 = [
      [
        [42.5, 94.9375],
        [41.5, 33.9375],
        [151, 39.4375],
        [151.5, 99.4375],
        [68.5, 112.9375],
        [42.5, 93.9375]
      ]
    ];
    var areaInfo = {
      id: 111,
      name: 'eastArea',
      areaType: '01',
      borderPoints: polyCoords1
    }
    map3.addArea(areaInfo)

    var success = document.getElementById("successArea");
    var def = document.getElementById("defaultArea");
    var warn = document.getElementById("warningArea");
    success.onclick = function() {
      map3.updateArea(areaInfo, hdmap.commonConfig.getMouseOverAreaStyle())
    }
    def.onclick = function() {
      map3.updateArea()
    }
    warn.onclick = function() {
      map3.updateArea()
    }
  } else {
    console.warn('please init map3')
  }
}
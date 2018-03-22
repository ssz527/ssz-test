import '../src/hdmap/mapManager.js';

export const sjw = function () {
  var map4 = new hdmap.initMap({
    gisEngine: 'bitmap',
    domId: 'map4',
    sizeW: 800,
    sizeH: 600,
    mapUrl: '../test/assets/images/hdmap.png',
    zoom: 3,
    maxzoom: 3,
    minzoom: 3,
    center: [113.62346894750111, 23.301062531529166],
    popupDom: {
      popup: 'popup6',
      popupcloser: 'popup-closer6',
      popupcontent: 'popup-content6'
    }
  });
  var coordinates = [];
  map4.regEventListener('singleclick', function (e) {
    console.log(e);

    // if(type == 'new') {
    // var text = $('#markerPos').html();
    // console.log(e);
    if (e.feature) {
      // text += '(' + e.feature.getId() + '：[' + e.coordinate + '])\n';
    } else {
      // text += '未取得值';
      if (!map4.getMapEditState()) {
        // map1.addMarker({
        //   id: new Date().valueOf(),
        //   position: e.coordinate,
        //   markerType: 'camera',
        //   name: 'move marker' + Math.random() * 2,
        //   imgUrl: './assets/images/icon.png',
        //   size: [32, 48]
        // });
        var coordinate = e.coordinate;
        coordinates.push(coordinate);
        console.log(coordinates)
      }
    }
    $('#markerPos1').val(coordinates[0]);
    $('#markerPos2').val(coordinates[1]);
    $('#markerPos3').val(coordinates[2]);
  });

  map4._map.getView().on('change:resolution', function (e) {
    var view = map4._map.getView()
    var zoom = view.getZoom()
    console.log(zoom)
  })

  var btn1 = document.getElementById('btn1');
  var btn2 = document.getElementById('btn2');
  var btn3 = document.getElementById('btn3');
  var btn4 = document.getElementById('btn4');
  // var btn5 = document.getElementById('btn5');

  var lonlatA = [113.623583, 23.301617];
  var lonlatB = [113.624305, 23.300673];
  var lonlatC = [113.622706, 23.299229];

  // 通过两点的GPS坐标获取两点间的距离
  btn1.onclick = function () {
    // function rad(d) {
    //     return d * Math.PI / 180.0
    // }
    // let radLat1 = rad(lonlatA[1])
    // let radLat2 = rad(lonlatB[1])
    // let a = radLat1 - radLat2
    // let b = rad(lonlatA[0]) - rad(lonlatB[0])
    // let distance =  2 * Math.asin( Math.sqrt( Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    // distance = Math.round(distance * 6378137)
    var distance = map4.getDistance(lonlatB, lonlatC);
    console.log(distance);
    document.getElementById('input1').value = distance;
  };

  // 根据点位和比例尺计算距离
  btn2.onclick = function () {
    var pointA = coordinates[0];
    var pointB = coordinates[1];
    var pointC = coordinates[2];
    // var mcenter = map4.translate_4326_to_3857(map4.mapConfig.center);
    // var mlonlat1 = [mcenter[0] + pointA[0], mcenter[1] + pointA[1]];
    // var lonlat1 = map4.translate_3857_to_4326(mlonlat1);

    // console.log(lonlat1);

    // var mlonlat2 = [mcenter[0] + pointB[0], mcenter[1] + pointB[1]];
    // var lonlat2 = map4.translate_3857_to_4326(mlonlat2);
    // console.log(lonlat2);
    // function rad(d) {
    //     return d * Math.PI / 180.0
    // }
    // let radLat1 = rad(lonlat1[1])
    // let radLat2 = rad(lonlat2[1])
    // let a = radLat1 - radLat2
    // let b = rad(lonlat1[0]) - rad(lonlat2[0])
    // let distance =  2 * Math.asin( Math.sqrt( Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    // distance = Math.round(distance * 6378137)

    var mcenter = ol.proj.transform(
      map4.mapConfig.center,
      'EPSG:4326',
      'EPSG:3857'
    );
    pointA[0] = pointA[0] * scale;
    pointA[1] = pointA[1] * scale;
    pointB[0] = pointB[0] * scale;
    pointB[1] = pointB[1] * scale;
    pointC[0] = pointC[0] * scale;
    pointC[1] = pointC[1] * scale;
    pointC = [mcenter[0] + pointC[0], mcenter[1] + pointC[1]];
    pointB = [mcenter[0] + pointB[0], mcenter[1] + pointB[1]];

    // 第一个点
    var c1 = ol.proj.transform(pointB, 'EPSG:3857', 'EPSG:4326');
    console.log(c1);
    // 第二个点
    var c2 = ol.proj.transform(pointC, 'EPSG:3857', 'EPSG:4326');
    console.log(c2);
    var distance = map4.getDistance(c1, c2);
    console.log(distance);
    document.getElementById('input2').value = distance;
  };

  // 根据三个GPS点进行中心点计算

  btn3.onclick = function () {
    var pointA = coordinates[0];
    var pointB = coordinates[1];
    var pointC = coordinates[2];
    var lon, lon1, lon2, lon3;
    var lat, lat1, lat2, lat3;
    // console.log(pointA + pointB);

    // 计算AB两个GPS的中心点
    lon1 =
    lonlatA[0] -
    (lonlatB[0] - lonlatA[0]) * pointA[0] / (pointB[0] - pointA[0]);
    lat1 =
    lonlatB[1] -
    (lonlatB[1] - lonlatA[1]) * pointB[1] / (pointB[1] - pointA[1]);

    // 计算AC两个GPS的中心点
    lon2 =
    lonlatA[0] -
    (lonlatC[0] - lonlatA[0]) * pointA[0] / (pointC[0] - pointA[0]);
    lat2 =
    lonlatC[1] -
    (lonlatC[1] - lonlatA[1]) * pointC[1] / (pointC[1] - pointA[1]);

    // 计算BC两个GPS的中心点
    lon3 =
    lonlatC[0] -
    (lonlatB[0] - lonlatC[0]) * pointC[0] / (pointB[0] - pointC[0]);
    lat3 =
    lonlatB[1] -
    (lonlatB[1] - lonlatC[1]) * pointB[1] / (pointB[1] - pointC[1]);

    // 根据三个中心点算出平均值
    lon = (lon1 + lon2 + lon3) / 3;
    lat = (lat1 + lat2 + lat3) / 3;
    var lonlat = [lon, lat];
    console.log(lonlat);
    document.getElementById('input3').value = lonlat;
  };

  // 根据GPS和对应的坐标信息计算比例尺
  var scale;
  btn4.onclick = function () {
    var pointA = coordinates[0];
    var pointB = coordinates[1];
    var pointC = coordinates[2];
    var mlonlatA = map4.translate_4326_to_3857(lonlatA);
    var mlonlatB = map4.translate_4326_to_3857(lonlatB);
    var mlonlatC = map4.translate_4326_to_3857(lonlatC);
    var mcenter = map4.translate_4326_to_3857(map4.mapConfig.center);
    var pntAX = mlonlatA[0] - mcenter[0];
    var pntAY = mlonlatA[1] - mcenter[1];
    var pntBX = mlonlatB[0] - mcenter[0];
    var pntBY = mlonlatB[1] - mcenter[1];
    var pntCX = mlonlatC[0] - mcenter[0];
    var pntCY = mlonlatC[1] - mcenter[1];

    var scaleAX = pntAX / pointA[0];
    var scaleAY = pntAY / pointA[1];
    var scaleBX = pntBX / pointB[0];
    var scaleBY = pntBY / pointB[1];
    var scaleCX = pntCX / pointC[0];
    var scaleCY = pntCY / pointC[1];
    var scaleA = (scaleAX + scaleAY) / 2;
    var scaleB = (scaleBX + scaleBY) / 2;
    var scaleC = (scaleCX + scaleCY) / 2;
    scale = (scaleA + scaleB + scaleC) / 3;

    document.getElementById('input4').value = scale;
    console.log(scale);
  };
};

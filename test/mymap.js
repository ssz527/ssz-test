import '../src/hdmap/mapManager.js';
// import { debug } from 'util';
export const mymap = function (params) {
  let _hdmap = window.map1;
  // let _hdmap2 = hdmap.mapManager['map2'];
  let selFeatures = {};
  let feat = _hdmap.addMarker({
    id: "12689",
    position: [12615709.175160598, 2656371.0517649446],
    markerType: "camera",
    name: "test marker",
    imgUrl: "./assets/images/icon.png",
    size: [32, 48]
  });
  // 切换地图测试
  $('#changeMap').on('click', function (e) {
    let flag = $(this).attr('data-flag');
    if (flag === '0') {
      flag = '1';
      $(this).text('切换地图：2-1');
      _hdmap._map.setTarget(null);
      _hdmap._map.setTarget('map2');
      _hdmap2._map.setTarget(null);
      _hdmap2._map.setTarget('map1');
    } else {
      flag = '0';
      $(this).text('切换地图：1-2');
      _hdmap._map.setTarget(null);
      _hdmap._map.setTarget('map1');
      _hdmap2._map.setTarget(null);
      _hdmap2._map.setTarget('map2');
    }
    $(this).attr('data-flag', flag);
  });

  $('#modifyMap').on('click', function (e) {
    console.log('open drag tool');
    let flag = $(this).attr('data-flag');
    if (flag === '0') {
      _hdmap.openDragTool(
        // dragstart callback
        function (e) {
          console.log('dragstart callback');
          // console.log(e);
          // var feat = e.features.getArray()[0];
          // console.log(feat.getGeometry().getCoordinates());
        },
        // dragend callback
        function (e) {
          // console.log('dragend callback');
          // console.log(e);
          // var feat = e.features.getArray()[0];
          // console.log(feat.getGeometry().getCoordinates());
        },
        // select callback
        function (e) {
          // console.log('select callback ' + e.selected.length);
          if (e.selected.length > 0) {
            selFeatures = {};
            let feat = e.selected[0]; //
            selFeatures[feat.id_] = feat.layerKey;
            feat.setStyle(
              new ol.style.Style({
                image: new ol.style.Icon(
                  /** @type {olx.style.IconOptions} */ ({
                    src: './assets/images/u346.png'
                  })
                )
              })
            );
          }
        },
        false,
        function (e) {
          // var feat = e.features.getArray()[0]
          // console.log(feat.getGeometry().getCoordinates())
        }
      );
      flag = '1';
      $(this).text('关闭地图编辑');
    } else {
      selFeatures = {};
      _hdmap.closeDragTool();
      flag = '0';
      $(this).text('开启地图编辑');
    }
    $(this).attr('data-flag', flag);
  });

  $('#delFeature').on('click', function (e) {
    for (let id in selFeatures) {
      _hdmap.removeMarkerBylayerKey(id, selFeatures[id]);
    }
    selFeatures = {};
    _hdmap.closeDragTool(); // 删除点位前，要释放对点位的select
    $('#modifyMap').attr('data-flag', '0');
    $('#modifyMap').text('开启地图编辑');
  });

  $('#drawLine').on('click', function (e) {
    var pointS = new ol.style.Icon(
      /** @type {olx.style.IconOptions} */ ({
        src: './assets/images/icon.png',
        size: [32, 48],
        color: '#ff0000',
        opacity: 0.8,
        scale: 1
      })
    );
    var pointS1 = new ol.style.Circle({
      radius: 6, // 点的大小
      fill: new ol.style.Fill({
        color: 'orange'
      })
    });
    var k = -1;
    _hdmap.openDrawLineTool({ color: '#ff0033', width: 5 }, pointS1, function (start, end) {
      return [start, end];
    }, function (e) {
      console.log(' 画线结束')
    }, function (e) {}, false);
  });
  var optionLine = {
    id: '123bbb',
    name: 'testareaf',
    lineType: '003',
    borderPoints: [
      [12544316.990742246, 2714004.57109197],
      [12791361.466159936, 2654077.9409163916],
      [12634206.936005615, 2548900.589995989]
    ],
    testa: 'abc'
  };
  $('#saveLine').on('click', function (e) {
    // _hdmap.closeDrawLineTool();
    var feat = _hdmap.showDrawLine(optionLine); // optionLine
    if (feat instanceof Array) {
      optionLine.borderPoints = feat[0].getGeometry().getCoordinates();
    } else {
      optionLine.borderPoints = feat.getGeometry().getCoordinates();
    }
    
    console.log('保存画线结果：')
    console.log(feat)
    // console.log(feat.getGeometry().getCoordinates())
  });
  $('#editLine').on('click', function (e) {
    _hdmap.editDrawLine(optionLine);
  });
  $('#removeLine').on('click', function (e) {
      _hdmap.removeLine(optionLine);
  });
  var drawShapeE = null;
  $('#drawShape').on('click', function (e) {
    var _type = $('#chooseShapeType').val(); // "Polygon";
    _hdmap.openDrawShapeTool(
      _type,
      function (e) {
        console.log('画区域结束：');
        // console.log(e.feature);
      },
      function (e) {
        // 修改区域点位结束 事件
        // console.log(e);
        // var farr = e.features.getArray();
        // farr.every(function (feature) {
        //   var aa = feature.getGeometry().getCoordinates();
        //   console.log('修改区域结束：');
        //   console.log(aa);
        // });
      },
      false
    );
  });

  $('#saveShape').on('click', function (e) {
    // _hdmap.closeDrawShapeTool();
    /** 在gisLayer上显示刚才画的图形 */
    var obj = {
      id: 'a0111',
      name: 'testareaf',
      areaType: '001'
    }
    var feat = _hdmap.showDrawShape(option);
    if (feat instanceof Array) {
      option.borderPoints = feat[0].getGeometry().getCoordinates();
      option.angle = feat[0].getProperties().angle
      if (feat[1])option1.borderPoints = feat[1].getGeometry().getCoordinates();
      if (feat[1])option1.angle = feat[1].getProperties().angle
    } else if (feat) {
      option.borderPoints = feat.getGeometry().getCoordinates();
      option.angle = feat.getProperties().angle
    }
    console.log('保存区域：');
    console.log(feat);
    // 删除所画图形
    // _hdmap.deleteDrawShape()
  });
  var option = {
    id: 'a0111',
    name: 'testareaf',
    areaType: '001',
    borderPoints: [
      [
        [12673954.190713905, 2583144.378667748],
        [12673954.190713905, 2715227.5635445327],
        [12541871.00583712, 2715227.5635445327],
        [12541871.00583712, 2583144.378667748],
        [12673954.190713905, 2583144.378667748]
      ]
    ],
    areaTypesOf: 'parking',
    rotate: -0.5548,
    originId: 10
  };
  var option1 = {
    id: 'a0222',
    name: 'testareaf22',
    areaType: '002',
    borderPoints: [
      [
        [12413456.798318025, 2663861.8805368943],
        [12563273.37375697, 2663861.8805368943],
        [12563273.37375697, 2755586.3144791056],
        [12413456.798318025, 2755586.3144791056],
        [12413456.798318025, 2663861.8805368943]
      ]
    ],
    areaTypesOf: 'parking'
  };
  var opArr = [option, option1]

  $('#editShape').on('click', function (e) {
    // _hdmap.closeDrawShapeTool();
    if (opArr.length > 0)_hdmap.editDrawShape(option);
    // if (opArr.length > 0)_hdmap.editDrawShape(opArr.shift());
  });
  $('#chooseShapeType').on('change', function (e) {
    var _type = $('#chooseShapeType').val();
    _hdmap.openDrawShapeTool(_type, function (e) {});
  });
  /** 生成点位 */
  $('#addmarker').on('click', function (e) {
    var _id = $('#markerId').val();
    var arr = $('#markerPos')
      .val()
      .split(',');
    var _markerPos = [parseFloat(arr[0]), parseFloat(arr[1])];
    var _markerType = $('#markerType').val();
    var _markerName = $('#markerName').val();
    var _imgUrl = $('.choosebox[name="imgurl"]:checked ')
      .siblings('img')
      .attr('src');
    var _num = parseInt($('#markerNum').val());

    if (_num > 1) {
      var m,
        s = 0;

      for (var i = 0; i < _num; i++) {
        s = Math.random() * 300000;
        m = Math.random() * 1000;
        _hdmap.addMarker({
          id: _id + s,
          position: [_markerPos[0] + s, _markerPos[1] + m],
          markerType: _markerType,
          name: _markerName + s,
          imgUrl: _imgUrl,
          size: [32, 48]
        });
      }
    }
  });
  
  /** 显示或隐藏某类型的点位，实际是显示或隐藏该类型点位所在的层 */
  $('#controlMar').on('click', function (e) {
    var flag = $(this).attr('data-flag');
    var _markerType = $('#chooseMarkerType').val();
    if (flag === '0') {
      _hdmap.hideMarkers(_markerType);
      $(this).text('显示点位');
      $(this).attr('data-flag', '1');
    } else {
      _hdmap.showMarkers(_markerType);
      $(this).text('隐藏点位');
      $(this).attr('data-flag', '0');
    }
  });
};

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('myopenlayers'), require('perfect-scrollbar')) :
	typeof define === 'function' && define.amd ? define(['myopenlayers', 'perfect-scrollbar'], factory) :
	(global.hdmap = factory(null,global.PerfectScrollbar));
}(this, (function (myopenlayers,PerfectScrollbar) { 'use strict';

PerfectScrollbar = PerfectScrollbar && PerfectScrollbar.hasOwnProperty('default') ? PerfectScrollbar['default'] : PerfectScrollbar;

/**
 * filename: commonConfig.js
 * author: sunshengzhen
 * introduction: 这里保存一些地图的常用配置信息，一些默认的样式等
 */
// import cameraImg from '@/assets/images/u349'

var warnLogTag = '[mapEngine warn]';
var infoLogTag = '[mapEngine info]';


function commonConfig() {
  // gis地图情况下的一些通用配置
  var gisConfig = {
    mapType: 'baidu',
    mapUrl: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
    mapSatUrl: 'http://shangetu1.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009&udt=20171115',
    SatUrl: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=sl&p=1&scaler=1&udt=20171115',
    center: [116.40348, 39.923758]
    // 设备层级对应的zindex 配置
  };var layerZindex = {
    // 摄像头图层
    cameraLayer: { zindex: 8 },
    // 音频设备图层
    videoLayer: { zindex: 8 },
    // 保安图层
    guarderLayer: { zindex: 8 },
    // 保洁图层
    cleanerLayer: { zindex: 8 },
    // 车辆设备图层
    carLayer: { zindex: 8 },
    // 报警图层
    warningLayer: { zindex: 11 },
    // 默认显示图层
    commonLayer: { zindex: 8 },
    // 区域显示图层
    gisLayer: { zindex: 10 },
    // 路线现实图层
    lineLayer: { zindex: 10 },
    // 电子围栏报警点图层
    fenceLayer: { zindex: 11 },
    // 摄像头统计图层
    countCameraLayer: { zindex: 10 },
    // 报警统计图层
    countWarningLayer: { zindex: 10 },
    // 广播统计图层
    countBroadcastLayer: { zindex: 10 },
    // 摄像头统计底图图层
    cameraBase: { zindex: 9 },
    // 报警统计底图图层
    warningBase: { zindex: 9 },
    // 广播统计底图图层
    broadcastBase: { zindex: 9 },
    // 机器人图层
    robotLayer: { zindex: 12 },
    // 电子指路牌图层
    signpostLayer: { zindex: 12 },
    // 广播图层
    broadcastLayer: { zindex: 9 },
    // 点位报警图层
    markerWarnLayer: { zindex: 12 },
    // 住户图层
    households: { zindex: 9 },
    // 访客图层
    visitor: { zindex: 9 },
    // 陌生人图层
    stranger: { zindex: 9 },
    // 门禁图层
    control: { zindex: 9 },
    // 车闸图层
    brake: { zindex: 9 },
    // 人行道闸图层
    gates: { zindex: 9 },
    // 电梯图层
    elevator: { zindex: 9 },
    // 地锁图层
    lock: { zindex: 9 }

    /**
     * 鼠标移动到区域时显示的样式
     * styleObj
     * @param {Object} styleObj 自定义样式对象
     * styleObj: {
     *    fillColor: red,   填充颜色
     *    strokeColor: black, 边框颜色
     *    strokeWidth: 5 边框宽度
     * }
     */
  };var getMouseOverAreaStyle = function getMouseOverAreaStyle(styleObj) {
    var fillColor = styleObj && styleObj.fillColor ? styleObj.fillColor : 'rgba(100,149,237,0.2)';
    var strokeColor = styleObj && styleObj.strokeColor ? styleObj.strokeColor : '#1E90FF';
    var strokeWidth = styleObj && styleObj.strokeWidth ? styleObj.strokeWidth : 2;
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: strokeColor,
        width: strokeWidth,
        lineDash: [5, 10]
        // lineDash: ol.style.Stroke.getLineDash()
      })
    });
  };

  var setAreaStyle = function setAreaStyle(styleObj) {
    var fillColor = styleObj && styleObj.fillColor ? styleObj.fillColor : 'rgba(0,0,0,0)';
    var strokeColor = styleObj && styleObj.strokeColor ? styleObj.strokeColor : 'rgba(0,0,0,0)';
    var strokeWidth = styleObj && styleObj.strokeWidth ? styleObj.strokeWidth : '2';
    var lineDash = styleObj && styleObj.lineDash ? styleObj.lineDash : [5, 10];
    var rotation = styleObj && styleObj.rotation ? styleObj.rotation : 0;
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: fillColor
      }),
      stroke: new ol.style.Stroke({
        color: strokeColor,
        width: strokeWidth,
        lineDash: lineDash,
        rotation: rotation
      })
    });
  };

  /**
   * 点位默认样式
   * @param {Object} markerInfo 点位信息
   * @param {Object} styleObj : 样式
   * 参数示例：
   *   markerInfo: {
   *    id: 1,  //唯一确定的主键 (必填)
   *    markerType: 'camera' // 点位的类型，决定该点添加的图层，如果不填写，则添加到commonLayer图层上面
   *    position: [20, 30], //点位的坐标，如果添加在光栅图中，[0,0] 这种类型的数组即可，元素0为x，元素1为y
   *    name:new Date().valueOf(),    //点位的名字  选填
   *    imgUrl:"arrow.png",   //点位展示的图片的url，必填
   *    size:[32,32]    //图片的大小
   *  }
   *  styleObj: {
   *    color: 'red' 颜色
   *    scale: '1' 缩放
   *    opacity: '1' 透明度
   *    rotation: Math.PI 弧度
   *  }
   * @param {Object} styleObj 自定义需传
   */
  var getFeatureStyle = function getFeatureStyle(markerInfo, styleObj) {
    var color = styleObj && styleObj.color ? styleObj.color : 'white';
    var scale = styleObj && styleObj.scale ? styleObj.scale : 1;
    var opacity = styleObj && styleObj.opacity ? styleObj.opacity : 1;
    var rotation = styleObj && styleObj.rotation ? styleObj.rotation : 0;
    var anchor = styleObj && styleObj.anchor ? styleObj.anchor : [0.5, 1];
    return new ol.style.Style({
      image: new ol.style.Icon(
      /** @type {olx.style.IconOptions} */{
        src: markerInfo.imgUrl,
        size: markerInfo.size,
        color: color,
        opacity: opacity,
        scale: scale,
        rotation: rotation,
        anchor: anchor
      })
    });
  };

  /**
   * 区域报警样式
   * @param {Number} opacity 透明度
   */
  var getWarningAreaStyle = function getWarningAreaStyle(opacity) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255,0,0,' + opacity + ')'
      }),
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 2,
        lineDash: [5, 10]
        // lineDash: ol.style.Stroke.getLineDash()
      })
    });
  };

  /**
   * 统计摄像头个数样式
   * @param {Object} markerInfo 点位信息
   * @param {Object} style 自定义样式，选填
   */
  var getCountCameraFeatureStyle = function getCountCameraFeatureStyle(markerInfo, style) {
    var offsetX, offsetY, anchor, fontsize;
    switch (markerInfo.cameraNum.length) {
      case 1:
        offsetX = style && style.offsetX ? style.offsetX : 9;
        offsetY = style && style.offsetY ? style.offsetY : -2;
        anchor = style && style.anchor ? style.anchor : [0.9, 0.7];
        fontsize = '15px bold Calibri,sans-serif';
        break;
      case 2:
        offsetX = style && style.offsetX ? style.offsetX : 9;
        offsetY = style && style.offsetY ? style.offsetY : -2;
        anchor = style && style.anchor ? style.anchor : [1.1, 0.7];
        fontsize = '13px bold Calibri,sans-serif';
        break;
      case 3:
        offsetX = style && style.offsetX ? style.offsetX : 8;
        offsetY = style && style.offsetY ? style.offsetY : -2;
        anchor = style && style.anchor ? style.anchor : [1.4, 0.7];
        fontsize = '13px bold Calibri,sans-serif';
        break;
    }
    return new ol.style.Style({
      image: new ol.style.Icon(
      /** @type {olx.style.IconOptions} */{
        // img: cameraImg,
        // imgSize: [24, 24],
        // src: '../assets/images/u349.png',
        src: markerInfo.url,
        // size: [20, 20],
        color: 'white',
        scale: style && style.scale ? style.scale : 0.8,
        anchor: anchor
      }),
      text: new ol.style.Text({
        text: markerInfo.cameraNum,
        font: fontsize,
        fill: new ol.style.Fill({
          color: 'white'
        }),
        offsetX: offsetX,
        offsetY: offsetY
      })
    });
  };

  /**
   * 统计报警个数样式
   * @param {Object} markerInfo 点位信息
   * @param {Object} style 自定义样式，选填
   */
  var getCountWarningFeatureStyle = function getCountWarningFeatureStyle(markerInfo, style) {
    var offsetX, offsetY, anchor, fontsize;
    switch (markerInfo.warnNum.length) {
      case 1:
        offsetX = style && style.offsetX ? style.offsetX : 8;
        offsetY = style && style.offsetY ? style.offsetY : -2;
        anchor = style && style.anchor ? style.anchor : [0.9, 0.7];
        fontsize = '15px bold Calibri,sans-serif';
        break;
      case 2:
        offsetX = style && style.offsetX ? style.offsetX : 8;
        offsetY = style && style.offsetY ? style.offsetY : -2;
        anchor = style && style.anchor ? style.anchor : [1.1, 0.7];
        fontsize = '13px bold Calibri,sans-serif';
        break;
      case 3:
        offsetX = style && style.offsetX ? style.offsetX : 8;
        offsetY = style && style.offsetY ? style.offsetY : -2;
        anchor = style && style.anchor ? style.anchor : [1.4, 0.7];
        fontsize = '13px bold Calibri,sans-serif';
        break;
    }
    return new ol.style.Style({
      image: new ol.style.Icon(
      /** @type {olx.style.IconOptions} */{
        src: markerInfo.url,
        // size: [20, 20],
        color: 'white',
        scale: style && style.scale ? style.scale : 0.8,
        anchor: anchor
      }),
      text: new ol.style.Text({
        text: markerInfo.warnNum,
        font: fontsize,
        fill: new ol.style.Fill({
          color: 'white'
        }),
        offsetX: offsetX,
        offsetY: offsetY
      })
    });
  };

  /**
   * 统计广播个数样式
   * @param {Object} markerInfo 点位信息
   * @param {Object} style 自定义样式，选填
   */
  var getCountBroadcastFeatureStyle = function getCountBroadcastFeatureStyle(markerInfo, style) {
    var offsetX, offsetY, anchor, fontsize;
    switch (markerInfo.broadcastNum.length) {
      case 1:
        offsetX = style && style.offsetX ? style.offsetX : 8;
        offsetY = style && style.offsetY ? style.offsetY : -2;
        anchor = style && style.anchor ? style.anchor : [1.1, 0.7];
        fontsize = '15px bold Calibri,sans-serif';
        break;
      case 2:
        offsetX = style && style.offsetX ? style.offsetX : 8;
        offsetY = style && style.offsetY ? style.offsetY : -2;
        anchor = style && style.anchor ? style.anchor : [1.1, 0.7];
        fontsize = '13px bold Calibri,sans-serif';
        break;
      case 3:
        offsetX = style && style.offsetX ? style.offsetX : 8;
        offsetY = style && style.offsetY ? style.offsetY : -2;
        anchor = style && style.anchor ? style.anchor : [1.4, 0.7];
        fontsize = '12px bold Calibri,sans-serif';
        break;
    }
    return new ol.style.Style({
      image: new ol.style.Icon(
      /** @type {olx.style.IconOptions} */{
        // src: '../assets/images/u950.png',
        src: markerInfo.url,
        // size: [20, 20],
        color: 'white',
        scale: style && style.scale ? style.scale : 0.8,
        anchor: anchor
      }),
      text: new ol.style.Text({
        text: markerInfo.broadcastNum,
        font: fontsize,
        fill: new ol.style.Fill({
          color: 'white'
        }),
        offsetX: offsetX,
        offsetY: offsetY
      })
    });
  };

  /**
   * 统计图标图层默认样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountDefaultStyle = function getCountDefaultStyle(markerInfo) {
    var scale;
    if (markerInfo.cameraNum) {
      scale = markerInfo.cameraNum.length < 3 ? 1 : 1.1;
    }
    if (markerInfo.broadcastNum) {
      scale = markerInfo.broadcastNum.length < 3 ? 1 : 1.1;
    }
    return new ol.style.Style({
      image: new ol.style.Icon({
        // src: '../assets/images/u887.png',
        src: markerInfo.baseUrl,
        size: [45, 42],
        scale: scale,
        offset: [0, 0]
      })
    });
  };

  /**
   * 统计图标图层报警样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountWarningStyle = function getCountWarningStyle(markerInfo) {
    var scale = markerInfo.warnNum.length < 3 ? 1 : 1.1;
    return new ol.style.Style({
      image: new ol.style.Icon({
        src: markerInfo.baseUrl,
        size: [45, 42],
        scale: scale,
        offset: [0, 0]
      })
    });
  };

  /**
   * 获取巡更路线正常样式
   * @param {Object} 颜色对象 { color: '#f39826', width: 8 } 选填
   * @return {Object} 巡更路线正常样式对象
   */
  var getNormalRouteStyle = function getNormalRouteStyle(obj) {
    var curColor = obj ? obj.color : '#7740dc';
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: curColor,
        width: 8
      })
    });
  };

  /**
   * 获取巡更路线离线样式
   * @return {Object} 巡更路线离线样式对象
   */
  var getOfflineRouteStyle = function getOfflineRouteStyle() {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#f39826',
        width: 8
      })
    });
  };

  /**
   * 获取巡更路线报警样式
   * @return {Object} 巡更路线报警样式对象
   */
  var getWarningRouteStyle = function getWarningRouteStyle() {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ff0000',
        width: 8
      })
    });
  };
  /**
   * 获取巡更路线报警动画样式
   * @param {Object} map 地图对象
   * @param {Object} lineInfo 线路参数
   * 线路参数示例
   * {
   *  id: '111' 线路id
   *  name: '巡更路线' 线路名称
   *  lineType: '01' 线路类型
   *  borderPoints: [[42.5, 94.9375], [41.5, 33.9375]......]
   * }
   */
  var getRouteStyleAnimation = function getRouteStyleAnimation(map, lineInfo) {
    var timer = map.lineTimer[lineInfo.id];
    if (timer === undefined || timer === null) {
      timer = lineInfo.id;
    } else {
      clearInterval(timer);
    }
    var num = 0;
    var timerInfo = setInterval(function () {
      num++;
      var style;
      if (num % 2 === 0) {
        style = getWarningRouteStyle();
      } else {
        style = getOfflineRouteStyle();
      }
      map.updateLine(lineInfo, style);
    }, 500);
    map.lineTimer[lineInfo.id] = timerInfo;
  };
  /**
   * 消除巡更路线报警动画样式
   * @param {Object} map 地图对象
   * @param {Object} lineInfo 线路参数
   * @param {Object} obj 颜色对象 { color: '#f39826', width: 8 } 选填
   * 线路参数示例
   * {
   *  id: '111' 线路id
   *  name: '巡更路线' 线路名称
   *  lineType: '01' 线路类型
   *  borderPoints: [[42.5, 94.9375], [41.5, 33.9375]......]
   * }
   */
  var warnRouteCancel = function warnRouteCancel(map, lineInfo, obj) {
    var timer = map.lineTimer[lineInfo.id];
    if (timer) {
      clearInterval(timer);
      if (obj) {
        map.updateLine(lineInfo, getNormalRouteStyle(obj));
      } else {
        map.updateLine(lineInfo, getNormalRouteStyle());
      }
    }
  };
  /**
   * 获取层级对应的zindex
   * @param {String} layerkey 层级id
   */
  var getLayerZindex = function getLayerZindex(layerkey) {
    return layerZindex[layerkey];
  };
  return {
    gisConfig: gisConfig,
    getMouseOverAreaStyle: getMouseOverAreaStyle,
    getFeatureStyle: getFeatureStyle,
    getWarningAreaStyle: getWarningAreaStyle,
    getCountCameraFeatureStyle: getCountCameraFeatureStyle,
    getCountWarningFeatureStyle: getCountWarningFeatureStyle,
    getCountBroadcastFeatureStyle: getCountBroadcastFeatureStyle,
    getCountDefaultStyle: getCountDefaultStyle,
    getCountWarningStyle: getCountWarningStyle,
    setAreaStyle: setAreaStyle,
    getNormalRouteStyle: getNormalRouteStyle,
    getOfflineRouteStyle: getOfflineRouteStyle,
    getWarningRouteStyle: getWarningRouteStyle,
    getRouteStyleAnimation: getRouteStyleAnimation,
    warnRouteCancel: warnRouteCancel,
    getLayerZindex: getLayerZindex
  };
}

/**
 * filename: baidu-projection.js
 * author: yangyida
 * discription: extend baidu map
 */

var forEachPoint = function forEachPoint(func) {
  return function (input, optOutput, optDimension) {
    var len = input.length;
    var dimension = optDimension || 2;
    var output;
    if (optOutput) {
      output = optOutput;
    } else {
      if (dimension !== 2) {
        output = input.slice();
      } else {
        output = new Array(len);
      }
    }
    for (var offset = 0; offset < len; offset += dimension) {
      func(input, output, offset);
    }
    return output;
  };
};

var sphericalMercator = {};

var RADIUS = 6378137;
var MAX_LATITUDE = 85.0511287798;
var RAD_PER_DEG = Math.PI / 180;

sphericalMercator.forward = forEachPoint(function (input, output, offset) {
  var lat = Math.max(Math.min(MAX_LATITUDE, input[offset + 1]), -MAX_LATITUDE);
  var sin = Math.sin(lat * RAD_PER_DEG);

  output[offset] = RADIUS * input[offset] * RAD_PER_DEG;
  output[offset + 1] = RADIUS * Math.log((1 + sin) / (1 - sin)) / 2;
});

sphericalMercator.inverse = forEachPoint(function (input, output, offset) {
  output[offset] = input[offset] / RADIUS / RAD_PER_DEG;
  output[offset + 1] = (2 * Math.atan(Math.exp(input[offset + 1] / RADIUS)) - Math.PI / 2) / RAD_PER_DEG;
});

var baiduMercator = {};

var MCBAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0];

var LLBAND = [75, 60, 45, 30, 15, 0];

var MC2LL = [[1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2], [-7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [-3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37], [-1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06], [3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4], [2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]];

var LL2MC = [[-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5], [0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5], [0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5], [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [-0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]];

function getRange(v, min, max) {
  v = Math.max(v, min);
  v = Math.min(v, max);

  return v;
}

function getLoop(v, min, max) {
  var d = max - min;
  while (v > max) {
    v -= d;
  }
  while (v < min) {
    v += d;
  }

  return v;
}

function convertor(input, output, offset, table) {
  var px = input[offset];
  var py = input[offset + 1];
  var x = table[0] + table[1] * Math.abs(px);
  var d = Math.abs(py) / table[9];
  var y = table[2] + table[3] * d + table[4] * d * d + table[5] * d * d * d + table[6] * d * d * d * d + table[7] * d * d * d * d * d + table[8] * d * d * d * d * d * d;

  output[offset] = x * (px < 0 ? -1 : 1);
  output[offset + 1] = y * (py < 0 ? -1 : 1);
}

baiduMercator.forward = forEachPoint(function (input, output, offset) {
  var lng = getLoop(input[offset], -180, 180);
  var lat = getRange(input[offset + 1], -74, 74);

  var table = null;
  var j;
  for (j = 0; j < LLBAND.length; ++j) {
    if (lat >= LLBAND[j]) {
      table = LL2MC[j];
      break;
    }
  }
  if (table === null) {
    for (j = LLBAND.length - 1; j >= 0; --j) {
      if (lat <= -LLBAND[j]) {
        table = LL2MC[j];
        break;
      }
    }
  }
  output[offset] = lng;
  output[offset + 1] = lat;
  convertor(output, output, offset, table);
});

baiduMercator.inverse = forEachPoint(function (input, output, offset) {
  var yabs = Math.abs(input[offset + 1]);

  var table = null;
  for (var j = 0; j < MCBAND.length; j++) {
    if (yabs >= MCBAND[j]) {
      table = MC2LL[j];
      break;
    }
  }

  convertor(input, output, offset, table);
});

var gcj02 = {};

var PI = Math.PI;
var AXIS = 6378245.0;
var OFFSET = 0.00669342162296594323; // (a^2 - b^2) / a^2

function delta(wgLon, wgLat) {
  var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
  var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
  var radLat = wgLat / 180.0 * PI;
  var magic = Math.sin(radLat);
  magic = 1 - OFFSET * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = dLat * 180.0 / (AXIS * (1 - OFFSET) / (magic * sqrtMagic) * PI);
  dLon = dLon * 180.0 / (AXIS / sqrtMagic * Math.cos(radLat) * PI);
  return [dLon, dLat];
}

function outOfChina(lon, lat) {
  if (lon < 72.004 || lon > 137.8347) {
    return true;
  }
  if (lat < 0.8293 || lat > 55.8271) {
    return true;
  }
  return false;
}

function transformLat(x, y) {
  var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformLon(x, y) {
  var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
  return ret;
}

gcj02.toWGS84 = forEachPoint(function (input, output, offset) {
  var lng = input[offset];
  var lat = input[offset + 1];
  if (!outOfChina(lng, lat)) {
    var deltaD = delta(lng, lat);
    lng = lng - deltaD[0];
    lat = lat - deltaD[1];
  }
  output[offset] = lng;
  output[offset + 1] = lat;
});

gcj02.fromWGS84 = forEachPoint(function (input, output, offset) {
  var lng = input[offset];
  var lat = input[offset + 1];
  if (!outOfChina(lng, lat)) {
    var deltaD = delta(lng, lat);
    lng = lng + deltaD[0];
    lat = lat + deltaD[1];
  }
  output[offset] = lng;
  output[offset + 1] = lat;
});

var bd09 = {};

var X_PI = PI * 3000 / 180;

function toGCJ02(input, output, offset) {
  var x = input[offset] - 0.0065;
  var y = input[offset + 1] - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  output[offset] = z * Math.cos(theta);
  output[offset + 1] = z * Math.sin(theta);
  return output;
}

function fromGCJ02(input, output, offset) {
  var x = input[offset];
  var y = input[offset + 1];
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  output[offset] = z * Math.cos(theta) + 0.0065;
  output[offset + 1] = z * Math.sin(theta) + 0.006;
  return output;
}

bd09.toWGS84 = function (input, optOutput, optDimension) {
  var output = forEachPoint(toGCJ02)(input, optOutput, optDimension);
  return gcj02.toWGS84(output, output, optDimension);
};

bd09.fromWGS84 = function (input, optOutput, optDimension) {
  var output = gcj02.fromWGS84(input, optOutput, optDimension);
  return forEachPoint(fromGCJ02)(output, output, optDimension);
};

var projzh = {};

projzh.smerc2bmerc = function (input, optOutput, optDimension) {
  var output = sphericalMercator.inverse(input, optOutput, optDimension);
  output = bd09.fromWGS84(output, output, optDimension);
  return baiduMercator.forward(output, output, optDimension);
};

projzh.bmerc2smerc = function (input, optOutput, optDimension) {
  var output = baiduMercator.inverse(input, optOutput, optDimension);
  output = bd09.toWGS84(output, output, optDimension);
  return sphericalMercator.forward(output, output, optDimension);
};

projzh.bmerc2ll = function (input, optOutput, optDimension) {
  var output = baiduMercator.inverse(input, optOutput, optDimension);
  return bd09.toWGS84(output, output, optDimension);
};

projzh.ll2bmerc = function (input, optOutput, optDimension) {
  var output = bd09.fromWGS84(input, optOutput, optDimension);
  return baiduMercator.forward(output, output, optDimension);
};

projzh.ll2smerc = sphericalMercator.forward;
projzh.smerc2ll = sphericalMercator.inverse;

var extent = [72.004, 0.8293, 137.8347, 55.8271];

var baiduMercatorProj = new ol.proj.Projection({
  code: 'baidu',
  extent: ol.extent.applyTransform(extent, projzh.ll2bmerc),
  units: 'm'
});

ol.proj.addProjection(baiduMercatorProj);
ol.proj.addCoordinateTransforms('EPSG:4326', baiduMercatorProj, projzh.ll2bmerc, projzh.bmerc2ll);
ol.proj.addCoordinateTransforms('EPSG:3857', baiduMercatorProj, projzh.smerc2bmerc, projzh.bmerc2smerc);

var bmercResolutions = new Array(19);
for (var i = 0; i < 19; ++i) {
  bmercResolutions[i] = Math.pow(2, 18 - i);
}

/**
 * filename: event-register.js
 * author: sunshengzhen
 * introduction: 各种地图事件的事件的统一管理注册类
 * 这里会定义地图上事件的默认处理函数，并根据事件的属性等进行业务处理
 */

// TODO: 地图应当有自身默认的事件处理方法，当用户没有注册事件监听时，进行地图默认事件处理，具体函数待完善

function getDefaultCallback(map, eventType) {
  return map.eventCallback[eventType].default;
}

function getTargetMap(e) {
  return hdmap.mapManager[e.map.ol_uid];
}
var curZoom = 0;
var eventRegister = {
  /**
   * eventType: singleclick
   * 单击事件注册的默认处理函数
   * @param {event} e 单击事件
   */
  singleclick: function singleclick(e) {
    var tarMap = getTargetMap(e);
    tarMap.closeCommonPopup();
    // 如果是正在进行划线或者区域选择点位状态，则此事件不处理
    if (!tarMap.getDrawLineState()) {
      // 获取click点的feature信息
      var feature = e.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        return feature;
      });
      var defaultCallback = getDefaultCallback(tarMap, 'singleclick');
      // 如果是单个的设备被点击,看是否有此类型的对应事件注册
      if (feature) {
        // 判断点击聚合
        var features = hdmap.utils.getFeaturesInExtent(tarMap, e.coordinate);
        // 过滤统计点位逻辑
        features = features.filter(function (item) {
          return item.imgUrl && item.markerType !== 'car';
        });
        if (features.length > 1 && feature instanceof ol.DevFeature) {
          tarMap.popupMultipoint(e.coordinate, features);
          return;
        }
        // 单点位
        if (feature instanceof ol.DevFeature || feature instanceof ol.AreaFeature || feature instanceof ol.LineFeature || feature instanceof ol.CountFeature) {
          var featureType = feature.extProperties.markerType;
          if (feature.extProperties.markerType === '' || null || undefined) {
            featureType = 'common';
          }
          var callback = tarMap.eventCallback.singleclick[featureType];
          var backEventObj = {
            feature: feature.extProperties,
            eventType: 'singleclick',
            coordinate: e.coordinate,
            layerKey: feature.layerKey,
            mapEvent: e
          };
          if (callback) {
            callback.call(this, backEventObj);
          } else if (defaultCallback !== null) {
            defaultCallback.call(this, backEventObj);
          }
        }
      } else {
        // 点击区域没有元素的情况下，如果有default的click监听，执行回调，返回点击位置的坐标信息
        if (defaultCallback !== null) {
          defaultCallback.call(this, {
            feature: null,
            eventType: 'singleclick',
            coordinate: e.coordinate,
            layerKey: null,
            mapEvent: e
          });
        }
      }
    }
  },
  /**
   * eventType: selected
   * 点位选中事件监听
   * @param {event} e 事件
   */
  selected: function selected(e) {
    // TODO 选择点位事件处理
    var tarMap = getTargetMap(e);
    // 如果没有处于编辑状态，退出事件处理
    if (!tarMap.getDragState()) {
      return;
    }
    // 获取到事件点位的feature对象
    var feature = e.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      return feature;
    });
    if (tarMap.eventCallback.selected.default !== null) {
      tarMap.eventCallback.selected.default.call(this, {
        feature: feature,
        eventType: 'selected',
        coordinate: e.coordinate
      });
    }
  },
  /**
   * eventType: cancelSelected
   * 取消选中事件监听
   * @param {event} e 事件
   */
  cancelSelected: function cancelSelected(e) {
    // TODO 取消选择点位事件处理
    var tarMap = getTargetMap(e);
    // 如果没有处于编辑状态，退出事件处理
    if (!tarMap.getDragState()) {
      return;
    }
    // 获取到事件点位的feature对象
    var feature = e.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      return feature;
    });
    if (tarMap.eventCallback.cancelSelected.default !== null) {
      tarMap.eventCallback.cancelSelected.default.call(this, {
        feature: feature,
        eventType: 'cancelSelected',
        coordinate: e.coordinate
      });
    }
  },
  /**
   * eventType: pointermove
   * 鼠标移动事件监听
   * @param {event} e 事件
   */
  pointermove: function pointermove(e) {
    // TODO 鼠标移动事件监听
    var tarMap = getTargetMap(e);
    var vector = tarMap.getLayerByKey('gisLayer');
    // var vector = tarMap.getLayerByKey('gisLayer')
    // 获取用户注册的pointermove默认处理回调
    var defaultCallback = getDefaultCallback(tarMap, 'pointermove');
    // 区域相关的处理逻辑
    if (vector) {
      // 获取鼠标所在位置的feature
      var selectFeature = vector.getSource().getFeaturesAtCoordinate(e.coordinate);
      if (selectFeature.length > 0) {
        // 判断区域是否设置visible属性，默认是false
        if (!selectFeature[0].extProperties.visible) {
          selectFeature[0].setStyle(hdmap.commonConfig.getMouseOverAreaStyle());
          // 获取图层上所有的feature
          var features = vector.getSource().getFeatures();
          for (var i = 0; i < features.length; i++) {
            if (!features[i].extProperties.visible && features[i].extProperties.id !== selectFeature[0].extProperties.id) {
              features[i].setStyle(null);
            }
          }
        }
        if (defaultCallback) {
          defaultCallback.call(this, {
            feature: selectFeature[0],
            eventType: 'pointermove',
            coordinate: e.coordinate
          });
        }
      } else {
        // 获取图层上所有的feature
        var featureicons = vector.getSource().getFeatures();
        for (var j = 0; j < featureicons.length; j++) {
          if (!featureicons[j].extProperties.visible) {
            featureicons[j].setStyle(null);
          }
        }
        if (defaultCallback) {
          defaultCallback.call(this, {
            feature: selectFeature[0],
            eventType: 'pointermove',
            coordinate: e.coordinate
          });
        }
      }
      return;
    }
    if (defaultCallback) {
      defaultCallback.call(this, {
        feature: null,
        eventType: 'pointermove',
        coordinate: e.coordinate
      });
    }
  },
  /**
   * eventType: zoomChange
   * 地图等级变化事件监听
   * @param {event} e 事件
   */
  zoomChange: function zoomChange(e) {
    var tarMap = hdmap.mapManager[this.ol_uid];
    var defaultCallback = getDefaultCallback(tarMap, 'zoomChange');
    var zoom = tarMap.getZoom();
    var nowZoom = parseInt(zoom);
    // 地图缩放时，控制层级的显示、隐藏
    if (curZoom !== nowZoom) {
      curZoom = nowZoom;
      var layerArr = tarMap.outterLayers;
      for (var item in layerArr) {
        var layer = layerArr[item];
        var lkey = layer.layerKey;
        var zl = lkey.split('_');
        if (zl[1]) {
          if (curZoom >= parseInt(zl[1]) && layer.getVisibleFlag()) {
            tarMap.setLayerVisible(lkey, true);
          } else {
            tarMap.setLayerVisible(lkey, false);
          }
        }
      }
    }
    if (defaultCallback !== null) {
      defaultCallback.call(this, {
        zoom: zoom,
        eventType: 'zoomChange'
      });
    }
  },
  /**
   * eventType: movestart
   * 地图等级变化事件监听
   * @param {event} e 事件
   */
  movestart: function movestart(e) {
    var tarMap = getTargetMap(e);
    var defaultCallback = getDefaultCallback(tarMap, 'movestart');
    if (defaultCallback !== null) {
      defaultCallback.call(this, {
        eventType: 'movestart'
      });
    }
  },
  /**
   * eventType: moveend
   * 地图等级变化事件监听
   * @param {event} e 事件
   */
  moveend: function moveend(e) {
    var tarMap = getTargetMap(e);
    var defaultCallback = getDefaultCallback(tarMap, 'moveend');
    if (defaultCallback !== null) {
      defaultCallback.call(this, {
        eventType: 'moveend'
      });
    }
  }
};

/**
 * filename: layerManager.js
 * author: sunshengzhen
 * introduction: 进行图层管理的方法类在这里实现
 */

// feature类型和图层对照
var layerMap = {
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
  /**
   * 根据feature的type获取对应所在图层的名称
   * @param {String} type 点位类型
   * @param {int|undefine} zoomLevel 点位需要在哪个缩放等级显示
   */
};function getLayerKeyByType(type, zoomLevel) {
  // TODO 这里可能需要根据类型的数据进行判断获取，暂时用map方式存取
  if (zoomLevel) {
    // 点位的类型，如果有点位显示等级，则类型要加上等级
    return type + 'Layer_' + zoomLevel;
  } else {
    if (layerMap[type]) {
      return layerMap[type];
    } else {
      return layerMap.common;
    }
  }
}
function getLayerMap() {
  return layerMap;
}

var layerManager = {
  getLayerKeyByType: getLayerKeyByType,
  getLayerMap: getLayerMap
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * filename: hdmap.js
 * author: yangyida & sunshengzhen
 * introduction: 封装openlayers 3.20.0版本做的一个web GIS 引擎
 */

/**
 * 弹窗控制器
 */
var popupCtrl = {
  curZIndex: 1,
  curPopNum: 0,
  reset: function reset() {
    if (this.curPopNum === 0) {
      this.curZIndex = 1;
    }
  },
  setPopupZIndex: function setPopupZIndex(popDom) {
    this.curZIndex++;
    document.getElementById(popDom + '-wrapper').style.zIndex = this.curZIndex;
  }

  /**
   * HDMap
   * @param {Object} options map初始化参数
   */
};function HDMap(options) {
  // 左上角 +- 控制
  this.controlZoom = true;
  // 鼠标点击，拖动地图
  this.dragPan = true;
  // 右下角地图信息
  this.attribution = false;
  // 参数验证
  if (options.controlZoom === false) {
    this.controlZoom = false;
  }
  if (options.dragPan === false) {
    this.dragPan = false;
  }
  if (options.attribution === true) {
    this.attribution = true;
  }
  // map对象
  this._map = null;
  // 存储基础图层
  this.layers = [];
  // 气泡对象
  this._overlay = null;
  // 气泡dom
  this.popup_container = null;
  // 关闭气泡按键
  this.popup_closer = null;
  // 气泡内容
  this.popup_content = null;
  // 气泡点位聚合列表
  this.popup_contentWrap = [];
  // 是否显示气泡关闭按键
  this.popup_closestatus = false;
  // 手动添加的气泡
  this._overlays = [];
  // 点位报警气泡
  this._warnOverlays = [];
  // 存储区域报警定时器
  this.areaTimer = {};
  // 存储电子围栏报警定时器
  this.lineTimer = {};
  this._outPopupWarp = 'hdmap-outterPopup';
  // 地图分辨率集合，与zoom一一对应
  this.mapResolutions = [];
  /*
    自己添加的图层
    设计为不同类型的点位放在不同的图层上面，方便批量控制的实现
    图层的类型配对信息放在commonConfig.js中
  */
  this.outterLayers = {};
  // 用户注册的事件监听记录对象
  this.eventCallback = {
    singleclick: {
      default: null
    },
    // dragstart: {
    //   default: null
    // },
    // dragend: {
    //   default: null
    // },
    selected: {
      default: null
    },
    cancelSelected: {
      default: null
    },
    pointermove: {
      default: null
    },
    pointerdrag: {
      default: null
    },
    zoomChange: {
      default: null
    },
    movestart: {
      default: null
    },
    moveend: {
      default: null
    }
    // 事件监听的key管理对象
  };this.eventKey = {};
  // 画线工具
  this.drawTool = {};
  // 地图的配置信息
  this.mapConfig = {};
  // 拖拽工具
  this.dragFeatureTool = {};
  // 初始化地图
  this.mapInit(options);
  // 将初始化的地图对象放到mapManager对象中
  hdmap.mapManager[this.getMapUid()] = this;
  // 注册默认监听函数
  this.regDefaulEventCallback();
}

/**
 * mapInit 参数验证函数
 * 当没有传地图引擎时，默认为gis地图引擎，中心点为北京
 * @param {Object} options
 * @return {bool} 验证结果
 */
function optionsVerify(options) {
  if (!options.popupDom) {
    options.popupDom = {
      popup: options.domId + '-popup',
      popupcloser: options.domId + '-popup-closer',
      popupcontent: options.domId + '-popup-content'
    };
  }
  if (!options.arcAngle) {
    options.arcAngle = 0;
  }
  if (!options.scale) {
    options.scale = 1;
  }
  if (!options.scaleType) {
    options.scaleType = 0;
  }
  if (!options.gisEngine) {
    options.gisEngine = 'baidu';
    options.mapUrl = hdmap.commonConfig.gisConfig.mapUrl;
    options.center = hdmap.commonConfig.gisConfig.center;
  } else if (options.gisEngine === 'baidu') {
    options.mapUrl = options.sat ? hdmap.commonConfig.gisConfig.mapSatUrl : hdmap.commonConfig.gisConfig.mapUrl;
    options.satUrl = hdmap.commonConfig.gisConfig.SatUrl;
  } else if (options.gisEngine === 'bitmap') {
    if (!options.mapUrl) {
      console.warn(warnLogTag + 'bitmap without picture url');
      return false;
    }
    if (!options.sizeH || !options.sizeW) {
      console.warn(warnLogTag + 'bitmap without size of the picture');
      return false;
    }
  } else if (options.gisEngine === 'tile') {
    if (!options.mapUrl) {
      console.warn(warnLogTag + 'tilemap param without tile service url');
      return false;
    }
    if (!options.sizeH || !options.sizeW) {
      console.warn(warnLogTag + 'tilemap param without extent of the map');
      return false;
    }
    if (!options.centerGPS) {
      console.warn(warnLogTag + 'tilemap param without centerGPS');
      return false;
    }
    if (undefined === options.maxZoom) {
      options.maxZoom = 6;
    }
    if (undefined === options.minZoom) {
      options.minZoom = 0;
    }
    if (!options.zoom) {
      options.zoom = 2;
    }
    if (!options.rangeCoefficient || options.rangeCoefficient < 1) {
      console.warn(warnLogTag + 'illegal rangeCoefficient, will use default value 2');
      options.rangeCoefficient = 2;
    }
    if (!options.mapMaxResolution) {
      console.warn(warnLogTag + 'illegal mapMaxResolution, will use default value 1');
      options.mapMaxResolution = 1;
    }
    if (undefined === options.tileMinZoom) {
      console.warn(warnLogTag + 'illegal tileMinZoom, will set options.minZoom to tileMinZoom');
      options.tileMinZoom = options.minZoom;
    }
    if (undefined === options.tileMaxZoom) {
      console.warn(warnLogTag + 'illegal tileMaxZoom, will set options.maxZoom to tileMaxZoom');
      options.tileMaxZoom = options.maxZoom;
    }
    if (!options.moveTolerance || typeof options.moveTolerance !== 'number') {
      options.moveTolerance = 5;
    }
  }
  return true;
}

/**
 * 地图初始化函数
 * HDMap.prototype.mapInit
 * @param {JSON} options
 */
HDMap.prototype.mapInit = function (options) {
  if (optionsVerify(options) === false) {
    return;
  }
  this.copyAttr(this.mapConfig, options);
  this.popupInit(options.popupDom);
  if (options.gisEngine === 'baidu') {
    this.initBaiduMap(options);
  } else if (options.gisEngine === 'bitmap') {
    this.initBitmap(options);
  } else if (options.gisEngine === 'gaode') {
    this.initGaodeMap(options);
  } else if (options.gisEngine === 'tile') {
    this.initTileMap(options);
  }
};

/**
 * 初始化切片地图函数
 * HDMap.prototype.initTileMap
 * @param {Object} options
  参数示例:
  var options = {
    // 必传参数
    gisEngine:"tile",
    sizeW:13623,
    sizeH:9796,
    domId:'map',
    mapUrl:"http://zc200008pc1.hdsc.com/hdyj/",
    maxZoom: 10,
    minZoom: 3,
    tileMinZoom: 0, // 切片时的最小等级
    tileMaxZoom: 6, // 切片时的最大等级
    mapMaxResolution: 1, // 地图最大分辨率
    centerGPS:[113.619942,23.304629],
    scale: 1.21,
    scaleType: 1,
    arcAngle: 1.2, //弧度值
    // 可选参数
    center: [0,0],
    rangeCoefficient: 2, // 可视区域系数， 大于1的值，将会往左右各按系数延伸扩展
    moveTolerance: 5 // 此参数优化点击体验，当移动地图超过此值的像素移动时，才认为是拖动事件，否则认为是click
  };
 */
HDMap.prototype.initTileMap = function (options) {
  var mapExtent = [0.00000000, -options.sizeH, options.sizeW, 0.00000000];
  var minZoom = options.minZoom;
  var maxZoom = options.maxZoom;
  var mapMinZoom = options.tileMinZoom;
  var mapMaxZoom = options.tileMaxZoom;
  var mapMaxResolution = options.mapMaxResolution;
  var tileExtent = [0.00000000, -options.sizeH, options.sizeW, 0.00000000];

  for (var z = 0; z <= mapMaxZoom; z++) {
    this.mapResolutions.push(Math.pow(2, mapMaxZoom - z) * mapMaxResolution);
  }

  var mapTileGrid = new ol.tilegrid.TileGrid({
    extent: tileExtent,
    minZoom: mapMinZoom,
    resolutions: this.mapResolutions
  });
  var tileLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      projection: 'PIXELS',
      tileGrid: mapTileGrid,
      url: options.mapUrl + '{z}/{x}/{y}.png'
    })
  });

  this.layers.push(tileLayer);

  this._map = new ol.Map({
    // 初始化map
    logo: false,
    target: options.domId,
    view: new ol.View({
      projection: ol.proj.get('PIXELS'),
      extent: mapExtent,
      maxResolution: mapTileGrid.getResolution(minZoom),
      zoom: options.zoom,
      maxZoom: maxZoom,
      minZoom: minZoom
    }),
    overlays: [this._overlay],
    layers: this.layers,
    interactions: ol.interaction.defaults({
      dragPan: this.dragPan,
      // 去除两个手指旋转地图--针对移动端
      pinchRotate: false
    }),
    controls: ol.control.defaults({
      attribution: this.attribution,
      zoom: this.controlZoom
    }),
    moveTolerance: options.moveTolerance
  });
  this._map.getView().fit(mapExtent, this._map.getSize());
  this.setZoom(options.zoom);

  // 设置可视区域范围
  var rangeCoefficient = options.rangeCoefficient;
  this.mapConfig.viewRange = {
    minX: -(rangeCoefficient - 1) * options.sizeW,
    maxX: rangeCoefficient * options.sizeW,
    minY: -rangeCoefficient * options.sizeH,
    maxY: (rangeCoefficient - 1) * options.sizeH
  };
};

/**
  初始化地图参数解释
  必须的参数：
  gisEngine : "baidu" | "bitmap"
    //baidu为初始化百度地图 //bitmap为光栅图
  domId : "map"
    //此参数为存放地图的div元素的id属性
  center:[0,0]
    //这个参数非常重要，必须有，因为光栅图坐标系与真实经纬度坐标系的换算需要使用此函数，地图初始化的时候定位的中心点，光栅图会自动以[0,0]为中点，如果到时候需要，也可修改一下hdMap.js中的代码，就可光栅图也能够进行初始化定位中心点，此处最好设置成后台能够动态配置，
    //比如配置到一个文件中，可以读取，这样到时候不同地区就可以通过修改此值，修改地图加载后自动定位到的点，如果此处不填，则会以北京为中点进行定位
  scale: 2,
    //比例尺
  scaleType: '1',
    //比例尺的类型
  centerGPS: ['110.121212', '45.121121']
    //中心点GPS坐标

  可选参数：
    controlZoom: 地图缩放控件   默认 true
    attribution: 右下角的地图信息控件  默认 false
    dragPan: 鼠标左键，拖拽地图   默认 true
    sizeW : 1200
    sizeH : 750
      // sizeW和sizeH为光栅图时才需要传递，为了计算地图的extent参数，sizeW和sizeH为光栅图图片的宽和高
    sat:0
      // 此参数为加载百度地图时才使用，0代表加载普通图层，1代表加载卫星图层，默认为0
    mapUrl: "map.jpg"
      //地图地图的url，如果为光栅图，此处为图片的url，如果为百度地图，则需要根据sat来判断，sat为0时，此处的url;当sat为1时，此处的url为;
    satUrl: "http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=sl&p=1&scaler=1&udt=20171115"
      //  此参数只有当sat为1时，才会使用，这个为加载百度卫星图时，地图的路网图层
    zoom:4
      //此参数为地图初始化的时候地图的放大级别，百度地图的放大级别为0-19 ,光栅图理论上是无限的，但是建议0-8之间，太大了图片分辨率达不到,如果不传，光栅图默认为3，百度地图默认为8
    maxZoom:19
      //限制最大缩放级别
    minZoom:0
      //限制最小缩放级别
    popupDom : {popup:,popupcloser:,popupcontent:}
      //存放气泡的dom元素

  参数示例:
  var options = {
    gisEngine:"bitmap",
    sizeW:1024,
    sizeH:986,
    domId:'map',
    mapUrl:"map.png",
    maxZoom:3,
    center:[113.619942,23.304629]
  };
*/
HDMap.prototype.initBitmap = function (options) {
  var extent$$1 = [];
  extent$$1.push(options.sizeW / 2 * -1, options.sizeH / 2 * -1, options.sizeW / 2, options.sizeH / 2);
  var projection = new ol.proj.Projection({
    code: 'EPSG:3857',
    extent: extent$$1
  });
  var imageLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
      url: options.mapUrl,
      projection: projection,
      imageExtent: extent$$1,
      imageSize: [options.sizeW, options.sizeH]
    })
  });
  this.layers.push(imageLayer);
  if (!options.maxZoom) {
    options.maxZoom = 7;
  }
  if (!options.minZoom) {
    options.minZoom = 0;
  }
  if (!options.zoom) {
    options.zoom = 3;
  }
  this._map = new ol.Map({
    // 初始化map
    logo: false,
    target: options.domId,
    overlays: [this._overlay],
    layers: this.layers,
    view: new ol.View({
      projection: projection,
      center: ol.extent.getCenter(extent$$1),
      zoom: options.zoom,
      maxZoom: options.maxZoom,
      minZoom: options.minZoom,
      extent: [options.sizeW / 2 * -1, options.sizeH / 2 * -1, options.sizeW / 2, options.sizeH / 2]
    }),
    interactions: ol.interaction.defaults({
      dragPan: this.dragPan
    }),
    controls: ol.control.defaults({
      attribution: this.attribution,
      zoom: this.controlZoom
    })
  });
};

/**
  参数示例:
    初始化普通百度地图
    var options = {
      gisEngine:'baidu',
      domId:'map',
      mapUrl:'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
      sat:0,
      center:[113.619942,23.304629]
    };

    初始化百度地图卫星图
    var options = {
      gisEngine:'baidu',
      domId:'map',
      mapUrl:'http://shangetu1.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009&udt=20171115',
      satUrl:'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=sl&p=1&scaler=1&udt=20171115'
      sat:1,
      center:[113.619942,23.304629]
    }
*/
HDMap.prototype.initBaiduMap = function (options) {
  if (options.sat === 1) {
    var baidugis = new ol.layer.Tile({
      source: new ol.source.XYZ({
        projection: 'baidu',
        maxZoom: 18,
        tileUrlFunction: function tileUrlFunction(tileCoord) {
          var x = tileCoord[1];
          var y = tileCoord[2];
          var z = tileCoord[0];
          var url = options.mapUrl;
          url = url.replace('{x}', x).replace('{y}', y).replace('{z}', z);
          return url;
        },
        tileGrid: new ol.tilegrid.TileGrid({
          resolutions: bmercResolutions,
          origin: [0, 0],
          extent: ol.extent.applyTransform(extent, projzh.ll2bmerc),
          tileSize: [256, 256]
        })
      })
    });
    var baidulabel = new ol.layer.Tile({
      source: new ol.source.XYZ({
        projection: 'baidu',
        maxZoom: 18,
        tileUrlFunction: function tileUrlFunction(tileCoord) {
          var x = tileCoord[1];
          var y = tileCoord[2];
          var z = tileCoord[0];
          var url = options.satUrl;
          url = url.replace('{x}', x).replace('{y}', y).replace('{z}', z);
          return url;
        },
        tileGrid: new ol.tilegrid.TileGrid({
          resolutions: bmercResolutions,
          origin: [0, 0],
          extent: ol.extent.applyTransform(extent, projzh.ll2bmerc),
          tileSize: [256, 256]
        })
      })
    });
    this.layers.push(baidugis);
    this.layers.push(baidulabel);
  } else {
    var baidumap = new ol.layer.Tile({
      source: new ol.source.XYZ({
        projection: 'baidu',
        maxZoom: 18,
        tileUrlFunction: function tileUrlFunction(tileCoord) {
          var x = tileCoord[1];
          var y = tileCoord[2];
          var z = tileCoord[0];
          var url = options.mapUrl;
          url = url.replace('{x}', x).replace('{y}', y).replace('{z}', z);
          return url;
        },
        tileGrid: new ol.tilegrid.TileGrid({
          resolutions: bmercResolutions,
          origin: [0, 0],
          extent: ol.extent.applyTransform(extent, projzh.ll2bmerc),
          tileSize: [256, 256]
        })
      })
    });
    this.layers.push(baidumap);
  }
  if (!options.maxZoom) {
    options.maxZoom = 19;
  }
  if (!options.minZoom) {
    options.minZoom = 0;
  }
  if (!options.zoom) {
    options.zoom = 8;
  }
  if (!options.center || options.center.length !== 2) {
    options.center = [112.334403, 39.8];
  }
  this._map = new ol.Map({
    layers: this.layers,
    target: options.domId,
    logo: false,
    view: new ol.View({
      center: this.translate_4326_to_3857(this.translate_4326_to_bd09(options.center)),
      projection: 'EPSG:3857',
      zoom: options.zoom,
      maxZoom: options.maxZoom,
      minZoom: options.minZoom
    }),
    interactions: ol.interaction.defaults({
      dragPan: this.dragPan
    }),
    controls: ol.control.defaults({
      attribution: this.attribution,
      zoom: this.controlZoom
    })
  });
  this.mapConfig = options;
};

/**
  参数示例:
    初始化普通高德地图
    var options = {
      gisEngine:'gaode',
      domId:'map',
      mapUrl:'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7',
      sat:0,
      center:[113.619942,23.304629]
    };

    初始化高德地图卫星图
    var options = {
      gisEngine:'gaode',
      domId:'map',
      satUrl:'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6',
      sat:1,
      center:[113.619942,23.304629]
    }
*/
HDMap.prototype.initGaodeMap = function (options) {
  if (options.sat === 1) {
    var gaodelabel = new ol.layer.Tile({
      source: new ol.source.XYZ({
        maxZoom: 18,
        url: options.satUrl
      })
    });
    this.layers.push(gaodelabel);
  } else {
    var gaodemap = new ol.layer.Tile({
      source: new ol.source.XYZ({
        maxZoom: 18,
        url: options.mapUrl
      })
    });
    this.layers.push(gaodemap);
  }
  if (!options.maxZoom) {
    options.maxZoom = 19;
  }
  if (!options.minZoom) {
    options.minZoom = 0;
  }
  if (!options.zoom) {
    options.zoom = 8;
  }
  if (!options.center || options.center.length !== 2) {
    options.center = [112.334403, 39.8];
  }
  this._map = new ol.Map({
    layers: this.layers,
    target: options.domId,
    logo: false,
    view: new ol.View({
      center: this.translate_4326_to_3857(this.translate_4326_to_gcj02(options.center)),
      projection: 'EPSG:3857',
      zoom: options.zoom,
      maxZoom: options.maxZoom,
      minZoom: options.minZoom
    })
  });
  this.mapConfig = options;
};

/**
 * 初始化矢量图层
 * HDMap.prototype.initGisLayer
 * @returns {ol.layer.HDVector} vector
 */
HDMap.prototype.initGisLayer = function () {
  var features = [];
  var source = new ol.source.Vector({
    features: features
  });
  var vector = new ol.layer.HDVector('gisLayer', {
    source: source,
    style: null,
    zIndex: 10
  });
  this._map.addLayer(vector);
  this.outterLayers['gisLayer'] = vector;
  return vector;
};
/**
 * 初始化路线图层，用来放编辑出来的路线feature
 * HDMap.prototype.initLineLayer
 * @returns {ol.layer.HDVector} vector
 */
HDMap.prototype.initLineLayer = function () {
  var features = [];
  var source = new ol.source.Vector({
    features: features
  });
  var vector = new ol.layer.HDVector('lineLayer', {
    source: source,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ff0033',
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ff0033'
        })
      })
    }),
    zIndex: 10
  });
  this._map.addLayer(vector);
  this.outterLayers['lineLayer'] = vector;
  return vector;
};

/**
 *
  popupDom: {
    popup: String,                  气泡外层div
    popupcloser: String,            气泡关闭div
    popupcontent: String,           气泡内容div
    popupstatus： Boolean 默认false  是否显示气泡关闭div
  },
*/
HDMap.prototype.createPopup = function (popupDom) {
  // 创建气泡外层div
  document.body.appendChild(this.createNode('wrap', 'div', 'id', popupDom.popup, 'hdmap-ol-popup'));
  this.popup_container = document.getElementById(popupDom.popup);
  this.toggleClassName(this.popup_container, 'hdmap-list-popup', 'hdmap-ol-popup');
  // 创建气泡关闭div
  if (!this.popup_closestatus) {
    this.popup_container.appendChild(this.createNode('popcloser', 'a', 'id', popupDom.popupcloser));
    this.popup_closer = document.getElementById(popupDom.popupcloser);
    this.toggleClassName(this.popup_closer, 'hdmap-list-popup-closer', 'hdmap-ol-popup-closer');
  }
  // 创建气泡内容div
  this.popup_container.appendChild(this.createNode('popcontent', 'div', 'id', popupDom.popupcontent));
  this.popup_content = document.getElementById(popupDom.popupcontent);
  this.popup_container.appendChild(this.createNode('popcontent', 'div', 'id', popupDom.popupcontent));
};

// 因为ol3的特性，气泡在地图上由一组div持有，所以这里初始化
/**
 * 气泡初始化
 * @param {Object} popupDom 气泡对象
 */
HDMap.prototype.popupInit = function (popupDom) {
  if (!document.getElementById(this._outPopupWarp)) {
    var outerPopup = document.createElement('div');
    outerPopup.id = this._outPopupWarp;
    outerPopup.style.zIndex = '-1';
    document.body.appendChild(outerPopup);
  }
  if (!popupDom) {
    return;
  }
  this.popup_closestatus = popupDom.popupstatus;
  this.popup_container = document.getElementById(popupDom.popup);
  this.popup_content = document.getElementById(popupDom.popupcontent);
  if (this.popup_container === null || undefined) {
    this.createPopup(popupDom);
  }
  // 气泡初始化
  this._overlay = new ol.Overlay({
    element: this.popup_container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  });
};

/**
 *存储气泡
 * @param {Array} popIdList
 */
HDMap.prototype.saveOutterPopup = function (popIdList) {
  var popWrap = document.getElementById(this._outPopupWarp);
  if (popWrap.children.length !== popIdList.length) {
    if (popIdList instanceof Array) {
      for (var i = 0, len = popIdList.length; i < len; i++) {
        var popItem = document.getElementById(popIdList[i]);
        if (popItem) {
          var popwrap = popItem.parentNode;
          popWrap.appendChild(popItem);
          popwrap.parentNode.removeChild(popwrap);
        } else {
          console.warn(warnLogTag + 'popId is undefined');
        }
      }
    }
  }
};

/**
 * HDMap.prototype.addMarker
 * 在地图上添加设备点位
 * @param {Object} markerInfo : 点位信息,对象
 * @param {Object} styleObj : 自定义样式，选填
 * @return {feature} 返回添加的点位对象
 * 参数示例：
 *   markerInfo: {    必填
 *    id: 1,  //唯一确定的主键 (必填)
 *    markerType: 'camera' // 点位的类型，决定该点添加的图层，如果不填写，则添加到commonLayer图层上面
 *    position: [20, 30], //点位的坐标，如果添加在光栅图中，[0,0] 这种类型的数组即可，元素0为x，元素1为y
 *    markerName:new Date().valueOf(),    //点位的名字  选填
 *    imgUrl:"arrow.png",   //点位展示的图片的url，必填
 *    size:[32,32]    //图片的大小
 *    zoomLevel: 2 Number类型
 *  }
 *  styleObj: {     选填
 *    color: 'red' 颜色
 *    scale: '1' 缩放
 *    opacity: '1' 透明度
 *    rotation: Math.PI 弧度
 *    anchor: 位置偏移 ，默认值是[0.5,1]
 *  }
 */
HDMap.prototype.addMarker = function (markerInfo, styleObj, layerkey) {
  // 参数验证
  if (!markerInfo.position || markerInfo.position.length !== 2) {
    console.warn(warnLogTag + 'addMarker Error : marker position can not be empty');
    return null;
  }
  if (!this.isInTileMapViewArea(markerInfo.position)) {
    console.warn(warnLogTag + 'addMarker Error : marker position is not in tile map viewArea');
    return null;
  }
  if (!markerInfo.id) {
    console.warn(warnLogTag + 'addMarker Error : id is required');
    return null;
  }
  if (markerInfo.zoomLevel && (markerInfo.zoomLevel > this.mapConfig.maxZoom || markerInfo.zoomLevel < this.mapConfig.minZoom)) {
    console.warn(warnLogTag + 'addMarker Error : zoomLevel is not between maxZoom & minZoom');
    return null;
  }
  var layerKey = layerkey !== undefined ? layerkey : layerManager.getLayerKeyByType(markerInfo.markerType, markerInfo.zoomLevel);

  var layer = this.getLayerByKey(layerKey);
  if (layer === undefined || layer === null) {
    // 图层不存在，则进行图层创建的操作
    layer = this.addLayerByLayerKey(layerKey);
  }
  var feature = this.getMarkerBylayerKey(markerInfo.id, layerKey);
  if (feature) {
    // 点位在要添加的图层上已存在，直接返回该点对象
    this.updateMarker(markerInfo, styleObj, layerkey);
    return feature;
  }
  var iconFeature = createFeature(markerInfo, layerKey);
  iconFeature.setStyle(hdmap.commonConfig.getFeatureStyle(markerInfo, styleObj));
  layer.getSource().addFeature(iconFeature);
  return iconFeature;
};

/**
 * 添加统计点图标
 * @param {Object} markerInfo 统计图标点信息
 * 参数示例：
 *   {
 *    id: 1,  //唯一确定的主键 (必填)
 *    markerType: 'countCamera' // 统计点点位类型 countCamera | countWarn |countBroadcast 必填
 *    position: [20, 30], //点位的坐标，如果添加在光栅图中，[0,0] 这种类型的数组即可，元素0为x，元素1为y
 *    name: 'aaa',    //点位的名字  选填
 *    url: 小图标   必填
 *    baseUrl: 背景图片   必填
 *    cameraNum: '10' String 必填 与 markerType 对应出现
 *    broadcastNum: '2' String
 *    warnNum: '999' String
 *   }
 */
HDMap.prototype.addCountMarker = function (markerInfo, style) {
  if (markerInfo.markerType === 'countWarning' || markerInfo.markerType === 'countCamera' || markerInfo.markerType === 'countBroadcast') {
    var marker = Object.assign({}, markerInfo);
    marker.id = marker.id + 'base';
    this.addBgLayer(marker);
    var layerKey = layerManager.getLayerKeyByType(markerInfo.markerType);
    var layer = this.getLayerByKey(layerKey);
    var countStyle = '';
    // var commonlayer = this.getLayerByKey(layerKey)
    if (layer === undefined || layer === null) {
      // 图层不存在，则进行图层创建的操作
      layer = this.addLayerByLayerKey(layerKey);
    }
    var iconFeature = createFeature(markerInfo, layerKey);
    if (markerInfo.markerType === 'countCamera') {
      countStyle = hdmap.commonConfig.getCountCameraFeatureStyle(markerInfo, style);
    } else if (markerInfo.markerType === 'countWarning') {
      countStyle = hdmap.commonConfig.getCountWarningFeatureStyle(markerInfo, style);
    } else if (markerInfo.markerType === 'countBroadcast') {
      countStyle = hdmap.commonConfig.getCountBroadcastFeatureStyle(markerInfo, style);
    }
    iconFeature.setStyle(countStyle);
    layer.getSource().addFeature(iconFeature);
  } else {
    console.warn(warnLogTag + 'markerType is error');
  }
};

/**
 * 添加统计底图图层
 * @param {Object} markerInfo 统计图标点信息
 */
HDMap.prototype.addBgLayer = function (markerInfo) {
  var layerBase = markerInfo.markerType + 'Base';
  var layerKey = layerManager.getLayerKeyByType(layerBase);
  var layer = this.getLayerByKey(layerKey);
  if (layer === undefined || layer === null) {
    // 图层不存在，则进行图层创建的操作
    layer = this.addLayerByLayerKey(layerKey);
  }
  var iconBgFeature = createFeature(markerInfo, layerKey);
  if (markerInfo.markerType === 'countWarning') {
    iconBgFeature.setStyle(hdmap.commonConfig.getCountWarningStyle(markerInfo));
  } else if (markerInfo.markerType === 'countCamera') {
    iconBgFeature.setStyle(hdmap.commonConfig.getCountDefaultStyle(markerInfo));
  } else if (markerInfo.markerType === 'countBroadcast') {
    iconBgFeature.setStyle(hdmap.commonConfig.getCountDefaultStyle(markerInfo));
  }
  layer.getSource().addFeature(iconBgFeature);
};

/**
 * 隐藏统计类点位
 * @param {String} type 统计图层
 */
HDMap.prototype.hideCountMarkers = function (type) {
  var layerBase = type + 'Base';
  var layerkey = layerManager.getLayerKeyByType(type);
  var layerBaseKey = layerManager.getLayerKeyByType(layerBase);
  this.setLayerVisible(layerkey, false);
  this.setLayerVisible(layerBaseKey, false);
};

/**
 * 显示统计类点位
 * @param {String} type 统计图层
 */
HDMap.prototype.showCountMarkers = function (type) {
  var layerBase = type + 'Base';
  var layerkey = layerManager.getLayerKeyByType(type);
  var layerBaseKey = layerManager.getLayerKeyByType(layerBase);
  this.setLayerVisible(layerkey, true);
  this.setLayerVisible(layerBaseKey, true);
};

/**
 * 删除统计类点位
 * @param {String} type 统计图层
 */
HDMap.prototype.removeCountMarkers = function (type) {
  var layerBase = type + 'Base';
  var layerkey = layerManager.getLayerKeyByType(type);
  var layerBaseKey = layerManager.getLayerKeyByType(layerBase);
  this.removeLayerByLayerKey(layerkey);
  this.removeLayerByLayerKey(layerBaseKey);
};

/**
 * HDMap.prototype.addMarkerByGPS
 * 通过GPS信息往地图上添加
 * @param {Object} markerInfo
 * 参数示例：
 *   {
 *    id: 1,  //唯一确定的主键 (必填)
 *    markerType: 'camera' // 点位的类型，决定该点添加的图层，如果不填写，则添加到commonLayer图层上面
 *    position:ol.proj.transform([113.61994199999998, 23.304629000000006],'EPSG:4326', 'EPSG:3857'),
 *      //点位的坐标，示例中是添加在百度地图中的。如果添加在光栅图中，[0,0] 这种类型的数组即可，元素0为x，元素1为y
 *    name:new Date().valueOf(),    //点位的名字  选填
 *    imgUrl:"arrow.png",   //点位展示的图片的url，必填
 *    imgSize:[32,32]    //图片的大小
 *   }
 */
HDMap.prototype.addMarkerByGPS = function (markerInfo, styleObj) {
  if (this.mapConfig.scaleType === 1 || this.mapConfig.scaleType === '1') {
    markerInfo.GPSInfo = markerInfo.position;
    markerInfo.position = this.transfromWGSToBitMap(markerInfo.position);
    this.addMarker(markerInfo, styleObj);
  } else {
    console.warn(warnLogTag + 'ScaleType is error');
  }
};

/**
 * HDMap.prototype.addMarkersByGPS
 * 批量通过GPS新增点位函数
 * @param {Array} markerList
 * @param {Object} styleObj
 *  styleObj: {     选填
 *    color: 'red' 颜色
 *    scale: '1' 缩放
 *    opacity: '1' 透明度
 *    rotation: Math.PI 弧度
 *    anchor: 位置偏移 ，默认值是[0.5,0.5]
 *  }
 */
HDMap.prototype.addMarkersByGPS = function (markerList, styleObj) {
  if (!(markerList instanceof Array)) {
    console.warn(warnLogTag + 'addMarkersByGPS require an Array instance argument');
    return;
  }
  for (var i = 0; i < markerList.length; i++) {
    var marker = markerList[i];
    this.addMarkerByGPS(marker, styleObj);
  }
};

/**
 * HDMap.prototype.addMarkers
 * 批量新增点位函数，可以处理批量点位列表
 * @param {Array} markerList
 * @param {Object} styleObj
 *  styleObj: {     选填
 *    color: 'red' 颜色
 *    scale: '1' 缩放
 *    opacity: '1' 透明度
 *    rotation: Math.PI 弧度
 *    anchor: 位置偏移 ，默认值是[0.5,0.5]
 *  }
 */
HDMap.prototype.addMarkers = function (markerList, styleObj, layerkey) {
  if (!(markerList instanceof Array)) {
    console.warn(warnLogTag + 'addMarkers require an Array instance argument');
    return;
  }
  for (var i = 0; i < markerList.length; i++) {
    var marker = markerList[i];
    this.addMarker(marker, styleObj, layerkey);
  }
};
/**
 * HDMap.prototype.hideMarkers
 * 隐藏某类点位
 * @param {String} type
 */
HDMap.prototype.hideMarkers = function (type) {
  var layerkey = layerManager.getLayerKeyByType(type);
  this.setLayerVisible(layerkey, false, false);
};
/**
 * HDMap.prototype.showMarkers
 * 显示某类点位
 * @param {String} type
 */
HDMap.prototype.showMarkers = function (type) {
  var layerkey = layerManager.getLayerKeyByType(type);
  this.setLayerVisible(layerkey, true, true);
};
/**
 * 通过marker的id和图层名称移除marker
 * @param {String} id:addMarker时，配置的主键
 * @param {String} layerKey:图层名
 * 这样设计是为了减少不必要的遍历，提高性能，否则要定位到某个marker要遍历地图上所有的marker
 */
HDMap.prototype.removeMarkerBylayerKey = function (id, layerKey) {
  var layer = this.getLayerByKey(layerKey);
  if (!layer) {
    console.warn(warnLogTag + 'please give a legal layerkey');
    return null;
  }
  var feature = layer.getSource().getFeatureById(id);
  if (feature) {
    layer.getSource().removeFeature(feature);
  }
};

/**
 * HDMap.prototype.removeMarker
 * @param {Object} markerInfo 点位信息
 * 参数示例：
 * {
      id: 111, 必填
      markerType: 'camera', 必填
      ... 其他信息选填
    }
 */
HDMap.prototype.removeMarker = function (markerInfo) {
  if (markerInfo.markerType && markerInfo.id) {
    var layerKey = layerManager.getLayerKeyByType(markerInfo.markerType);
    if (layerKey && layerKey !== 'commonLayer') {
      var layer = this.getLayerByKey(layerKey);
      if (!layer) {
        console.warn(warnLogTag + 'can not find this layer:' + layerKey);
      }
      var feature = layer.getSource().getFeatureById(markerInfo.id);
      if (feature) {
        layer.getSource().removeFeature(feature);
      }
    }
  } else {
    console.warn(warnLogTag + 'markerInfo is error');
  }
};

/**
 * 点位更新
 * @param {Object} markerInfo 点位更新需要的数据，markerInfo与addMarker时的数据字段一致，也可以新加样式字段，存入extProperties中
 * markerInfo：{
 *    id: 333,  必填
      position: [-50, 0],
      markerType: "guarder",  必填
      markerName: id,
      imgUrl: "./assets/images/u4828.png",  必填
      size: [32, 48]
 * }
 * @param {Object} styleObj 自定义样式对象，默认不传，如需自定义，则传入对象
 * styleObj: {
 *  color: 'red', 颜色
 *  scale: 2, 缩放
 *  opacity: 0.8 透明度
 * }
 */
HDMap.prototype.updateMarker = function (markerInfo, styleObj, layerkey) {
  // 通过marker， style 获取到id，layerkey，markerinfo，style
  if (!markerInfo.id) {
    console.warn(warnLogTag + 'markerId can not be empty');
    return null;
  }
  var layerKey = layerkey !== undefined ? layerkey : layerManager.getLayerKeyByType(markerInfo.markerType, markerInfo.zoomLevel);
  var marker = this.getMarkerBylayerKey(markerInfo.id, layerKey);
  if (marker) {
    var properties = marker.getExtProperties();
    this.copyAttr(properties, markerInfo);
    if (markerInfo.position) {
      marker.getGeometry().setCoordinates(markerInfo.position);
    }
    if (markerInfo.markerName) {
      marker.set('markerName', markerInfo.markerName);
    }
    marker.setStyle(hdmap.commonConfig.getFeatureStyle(markerInfo, styleObj));
  } else {
    console.warn(warnLogTag + 'This point does not exist');
  }
};

/**
 * HDMap.prototype.copyAttr
 * 拷贝属性
 * @param {Object} marker
 * @param {Object} attrs
 */
HDMap.prototype.copyAttr = function (marker, attrs) {
  for (var attr in attrs) {
    marker[attr] = attrs[attr];
  }
};

/**
 * 通过主键id和图层名获取特定的marker
 * @param {String} id 查找的marker的id
 * @param {String} layerKey marker所在的图层
 */
HDMap.prototype.getMarkerBylayerKey = function (id, layerKey) {
  var layer = this.getLayerByKey(layerKey);
  if (!layer) {
    console.warn(warnLogTag + 'please give a layerkey');
    return null;
  }
  var feature = layer.getSource().getFeatureById(id);
  return feature;
};

/**
 * 通过点位ID 获取点位 | 区域信息
 * @param {String} id
 */
HDMap.prototype.getMarkerById = function (id) {
  var layers = this.getMap().getLayers().array_;
  for (var i = 1, len = layers.length; i < len; i++) {
    var feature = layers[i].getSource().getFeatureById(id);
    if (feature) {
      return feature;
    }
  }
};

/**
 * HDMap.prototype.addArea
 * 新增区域
 * @param {Object} areaInfo 区域信息
 * @param {Object} styleObj 自定义样式
 * @returns {ol.AreaFeature}
 * areaInfo  参数示例
 * {
 *  id: '111' 区域id
 *  name: 'eastArea' 区域名称
 *  areaType: '01' 区域类型
 *  borderPoints: [[[42.5, 94.9375], [41.5, 33.9375], [151, 39.4375], [151.5, 99.4375], [68.5, 112.9375], [42.5, 93.9375]]]
 *    边界点addarealist
 *  warningNum: 10, // 报警数量
 *  cameraNum: 10, // 报警数量
 *  broadcastNum: 10, // 报警数量
 *  visibal: true // 是否可见的
 * }
 *
 * styleObj  参数示例  选填
 * {
 * fillColor: 'red' 填充色 选填
 * strokeColor: 'blue' 边框色 选填
 * strokeWidth: 2 边框宽度 选填
 * }
 */
HDMap.prototype.addArea = function (areaInfo, styleObj) {
  var areaLayer = this.outterLayers['gisLayer'];
  if (!areaLayer) {
    areaLayer = this.initGisLayer();
  }
  if (!areaInfo.id) {
    areaInfo.id = new Date().valueOf();
  }
  var feature = this.getMarkerBylayerKey(areaInfo.id, 'gisLayer');
  if (feature) {
    // 点位在要添加的图层上已存在，更新点位的信息，再返回该点对象
    feature.getGeometry().setCoordinates(areaInfo.borderPoints);
    feature.setExtProperties(areaInfo);
    if (areaInfo.rotate) feature.setRotate(areaInfo.rotate);
    return feature;
  }
  var areaFeature = new ol.AreaFeature({
    geometry: new ol.geom.Polygon(areaInfo.borderPoints),
    geometryName: 'Polygon',
    style: null
  }, areaInfo, 'gisLayer');
  areaFeature.setId(areaInfo.id);
  if (styleObj) {
    areaFeature.setStyle(hdmap.commonConfig.setAreaStyle(styleObj));
  }

  areaLayer.getSource().addFeature(areaFeature);
  return areaFeature;
};

/**
 * HDMap.prototype.addAreas
 * 批量新增区域
 * @param {Array} areaList 区域列表
 * @param {Object} styleObj 自定义样式
 * styleObj  参数示例  选填
 * {
 * fillColor: 'red' 填充色 选填
 * strokeColor: 'blue' 边框色 选填
 * strokeWidth: 2 边框宽度 选填
 * }
 */
HDMap.prototype.addAreas = function (areaList, styleObj) {
  if (!(areaList instanceof Array)) {
    console.warn(warnLogTag + 'addAreas require an Array instance argument');
    return;
  }
  for (var i = 0; i < areaList.length; i++) {
    var area = areaList[i];
    this.addArea(area, styleObj);
  }
};

/**
 * HDMap.prototype.updateArea
 * 更新区域样式
 * @param {Object} areaInfo
 * @param {Object} styleObject
 */
HDMap.prototype.updateArea = function (areaInfo, styleObject) {
  var areaObj = this.getMarkerBylayerKey(areaInfo.id, 'gisLayer');
  if (areaObj) {
    areaObj.setStyle(styleObject);
  } else {
    console.warn(warnLogTag + 'Warning of hdmap: not find the area');
  }
};

/**
 * HDMap.prototype.removeArea
 * 移除区域信息
 * @param {Object} areaInfo
 */
HDMap.prototype.removeArea = function (areaInfo) {
  this.removeMarkerBylayerKey(areaInfo.id, 'gisLayer');
};

/**
 * HDMap.prototype.hideArea
 * 隐藏区域
 * @param {Object} areaInfo
 */
HDMap.prototype.hideArea = function (areaInfo) {
  var areaObj = this.getMarkerBylayerKey(areaInfo.id, 'gisLayer');
  areaObj.extProperties.visible = false;
  areaObj.setStyle(null);
};

/**
 * HDMap.prototype.showArea
 * 显示区域
 * @param {Object} areaInfo
 */
HDMap.prototype.showArea = function (areaInfo) {
  var areaObj = this.getMarkerBylayerKey(areaInfo.id, 'gisLayer');
  areaObj.setStyle(hdmap.commonConfig.getMouseOverAreaStyle());
  areaObj.extProperties.visible = true;
};

/**
 * HDMap.prototype.addLine
 * 新增线路
 * @param {Object} lineInfo
 * 线路参数示例
 * {
 *  id: '111' 线路id
 *  name: '巡更路线' 线路名称
 *  lineType: '01' 线路类型
 *  borderPoints: [[42.5, 94.9375], [41.5, 33.9375], [151, 39.4375], [151.5, 99.4375], [68.5, 112.9375], [42.5, 93.9375]]--二维数组
 *    边界点list
 * }
 * @param {Object} lineStyle 线的样式，示例：{color: "#ff0033",width: 2}
 * @returns {ol.LineFeature}
 */
HDMap.prototype.addLine = function (lineInfo, lineStyle) {
  if (!lineInfo || !lineInfo.borderPoints) {
    console.warn(warnLogTag + 'addLine require an lineInfo Object');
    return;
  }
  var lineLayer = this.outterLayers['lineLayer'];
  if (!lineLayer) {
    lineLayer = this.initLineLayer();
  }
  var _style = null;
  if (lineStyle) {
    _style = new ol.style.Style({
      stroke: new ol.style.Stroke(lineStyle)
    });
  }
  var feature = this.getMarkerBylayerKey(lineInfo.id, 'lineLayer');
  if (feature) {
    // 点位在要添加的图层上已存在，更新点位的信息，再返回该点对象
    feature.getGeometry().setCoordinates(lineInfo.borderPoints);
    feature.setExtProperties(lineInfo);
    if (_style) feature.setStyle(_style);
    return feature;
  }

  var lineFeature = new ol.LineFeature({
    geometry: new ol.geom.LineString(lineInfo.borderPoints),
    geometryName: 'LineString',
    style: _style
  }, lineInfo, 'lineLayer');
  lineFeature.setId(lineInfo.id);
  if (_style) lineFeature.setStyle(_style);
  lineLayer.getSource().addFeature(lineFeature);
  return lineFeature;
};
/**
 * HDMap.prototype.addLines
 * 批量新增路线
 * @param {Array} LineList
 * 路线对象数组里，每个对象的数据格式示例：
 * {
 *  id: '111' 线路id
 *  name: '巡更路线' 线路名称
 *  lineType: '01' 线路类型
 *  borderPoints: [[[42.5, 94.9375], [41.5, 33.9375], [151, 39.4375], [151.5, 99.4375], [68.5, 112.9375], [42.5, 93.9375]]]
 *    边界点list
 *  lineStyle: 线的样式，示例：{color: "#ff0033",width: 2}
 * }
 * @returns Array<ol.LineFeature>
 */
HDMap.prototype.addLines = function (LineList) {
  if (!(LineList instanceof Array)) {
    console.warn(warnLogTag + 'addLines require an Array instance argument');
    return;
  }
  var list = [];
  var lineObj = null;
  for (var i = 0; i < LineList.length; i++) {
    var line = LineList[i];
    var style = LineList[i].lineStyle;
    lineObj = this.addLine(line, style);
    list.push(lineObj);
  }
  return list;
};
/**
 * HDMap.prototype.updateLine
 * 更新路线样式
 * @param {Object} lineInfo
 * @param {Object} styleObject，参考ol.style.Stroke
 */
HDMap.prototype.updateLine = function (lineInfo, styleObject) {
  var lineObj = this.getMarkerBylayerKey(lineInfo.id, 'lineLayer');
  if (lineObj) {
    lineObj.setStyle(styleObject);
  } else {
    console.warn(warnLogTag + 'Warning of hdmap: not find the line');
  }
};
/**
 * HDMap.prototype.removeLineFeature
 * 移除线路信息
 * @param {Object} lineInfo
 */
HDMap.prototype.removeLine = function (lineInfo) {
  this.removeMarkerBylayerKey(lineInfo.id, 'lineLayer');
};

/**
 * HDMap.prototype.hideLineFeature
 * 隐藏线路
 * @param {Object} lineInfo
 */
HDMap.prototype.hideLine = function (lineInfo) {
  var areaObj = this.getMarkerBylayerKey(lineInfo.id, 'lineLayer');
  areaObj.setStyle(null);
};
/**
 * HDMap.prototype.getOutterLayers
 * 获取地图对象中被添加的对外业务图层
 * @returns {Array} this.outterLayers
 */
HDMap.prototype.getOutterLayers = function () {
  return this.outterLayers;
};

/**
 * 在地图上添加图层
 * @param {String} layerKey 图层名，用于以后获取特定图层使用
 */
HDMap.prototype.addLayerByLayerKey = function (layerKey) {
  if (layerKey) {
    // var hdmap = this
    // let zd = 11
    // let adarr = layerKey.split('_')
    // let zdo = hdmap.commonConfig.getLayerZindex(adarr[0])
    // if (zdo) zd = zdo.zindex
    var vectorSource = new ol.source.Vector({});
    var vectorLayer = new ol.layer.HDVector(layerKey, {
      source: vectorSource,
      // map: hdmap._map,//map 属性存在问题
      zIndex: 11 // zd mod by zmj 2018-04-30 设备点位的层级待定
    });
    this._map.addLayer(vectorLayer);
    this.outterLayers[layerKey] = vectorLayer;
    // 根据当前zoom，和层级显示所需等级对比，判断当前是否显示该层
    var arr = layerKey.split('_');
    if (arr[1]) {
      var level = parseInt(arr[1]);
      var z = this.getZoom();
      var flag = true;
      if (z < level) flag = false;
      vectorLayer.setVisible(flag);
    }
    return vectorLayer;
  } else {
    console.warn(warnLogTag + 'addLayer Error : layerKey can not be empty');
    return null;
  }
};

/**
 * HDMap.prototype.removeLayerByLayerKey
 * 通过layerKey移除图层
 * @param {String} layerKey : 图层名
 */
HDMap.prototype.removeLayerByLayerKey = function (layerKey) {
  var layer = this.getLayerByKey(layerKey);
  if (layer) {
    layer.getSource().clear();
    this._map.removeLayer(layer);
    delete this.outterLayers[layerKey];
  }
};

/**
 * HDMap.prototype.getLayerByKey
 * 通过layerKey获取图层
 * 这里还加入了一个outterLayers数组单独维护是因为
 * 光栅图或者矢量图的底图也是一个图层，如果直接获取
 * 地图的全部图层去遍历的话会报错，因为原生的layer没有实现
 * getLayerKey方法
 * @param {String} key
 */
HDMap.prototype.getLayerByKey = function (key) {
  var layer = this.outterLayers[key];
  if (layer) {
    return layer;
  }
};

/**
 * 通过定时器key获取定时器
 * @param {String} key
 */
HDMap.prototype.getTimerByKey = function (key) {
  var timer = this.areaTimer[key];
  if (timer) {
    return timer;
  }
};

/**
 * 设置气泡位置
 * @param {Array} coordinate click点的位置
 */
HDMap.prototype.popupSetPlace = function (coordinate) {
  this._overlay.setPosition(coordinate);
  if (this.popup_closer) {
    var hdmap = this;
    this.popup_closer.onclick = function () {
      hdmap._overlay.setPosition(undefined);
      hdmap.popup_closer.blur();
    };
  }
};

/**
 * 添加overlay
 * @param {String || Object} popOption 弹窗参数信息
 * popOption: {
 *  domId: 'camera', 必填
 *  visible: true， 必填
 *  arrow: true 选填 默认false显示箭头
 *  type: 'cam' 选填 关闭某一类使用
 * } || popOption: 'camera'
 */
HDMap.prototype.addPopup = function (popOption) {
  if (typeof popOption === 'string') {
    if (document.getElementById(popOption)) {
      var wrapperDom = this.createNode('wrapperDom', 'div', 'id', popOption + '-wrapper', 'hdmap-popup-wrapper');
      document.body.appendChild(wrapperDom);
      var newpopup = new ol.Overlay({});
      newpopup.setElement(wrapperDom);
      this._overlays[popOption] = newpopup;
      this._overlays[popOption].show = false;
      this.getMap().addOverlay(newpopup);
      var height = document.getElementById(popOption).offsetHeight;
      wrapperDom.style.height = height + 'px';
      var width = document.getElementById(popOption).offsetWidth;
      wrapperDom.style.width = width + 'px';
      wrapperDom.appendChild(document.getElementById(popOption));
    } else {
      console.warn(warnLogTag + 'The element node does not exist');
    }
  } else if ((typeof popOption === 'undefined' ? 'undefined' : _typeof(popOption)) === 'object' && popOption.visible === true) {
    if (document.getElementById(popOption.domId)) {
      var wrapperDomObject;
      if (popOption.arrow === true) {
        wrapperDomObject = this.createNode('wrapperDomObject', 'div', 'id', popOption.domId + '-wrapper', 'hdmap-popup-wrapper-arrow');
      } else {
        wrapperDomObject = this.createNode('wrapperDomObject', 'div', 'id', popOption.domId + '-wrapper', 'hdmap-popup-wrapper');
      }
      document.body.appendChild(wrapperDomObject);
      var newObjectpopup = new ol.Overlay({});
      newObjectpopup.setElement(wrapperDomObject);
      this._overlays[popOption.domId] = newObjectpopup;
      this._overlays[popOption.domId].visible = popOption.visible;
      this._overlays[popOption.domId].show = false;
      if (popOption.type) {
        this._overlays[popOption.domId].type = popOption.type;
      }
      this.getMap().addOverlay(newObjectpopup);
      var heightObject = document.getElementById(popOption.domId).offsetHeight;
      wrapperDomObject.style.height = heightObject + 'px';
      var widthObject = document.getElementById(popOption.domId).offsetWidth;
      wrapperDomObject.style.width = widthObject + 'px';
      wrapperDomObject.appendChild(document.getElementById(popOption.domId));
    } else {
      console.warn(warnLogTag + 'The element node does not exist');
    }
  }
};

/**
 * 显示弹窗
 * @param {String} overlayName 显示overlay Name
 * @param {Array} coordinate 设置点位坐标
 * @param {Object} styleObj 自定义样式
 * styleObj: { top: -100, left: 50 }
 */
HDMap.prototype.showPopup = function (domId, coordinate, styleObj) {
  if (domId) {
    var wrapY = parseInt(document.getElementById(domId).parentNode.style.height);
    var wrapX = parseInt(document.getElementById(domId).parentNode.style.width);
    if (styleObj && (typeof styleObj === 'undefined' ? 'undefined' : _typeof(styleObj)) === 'object') {
      var top = styleObj.top ? parseInt(styleObj.top) : -30;
      var left = styleObj.left ? parseInt(styleObj.left) : 0;
      document.getElementById(domId).parentNode.style.top = -wrapY + top + 'px';
      document.getElementById(domId).parentNode.style.left = -wrapX / 2 + left + 'px';
    } else {
      document.getElementById(domId).parentNode.style.top = -wrapY - 12 + 'px';
    }
    this.closeCommonPopup();
    this._overlays[domId].show = true;
    this._overlays[domId].setPosition(coordinate);
    popupCtrl.setPopupZIndex(domId);
  } else {
    console.warn(warnLogTag + 'The element node does not exist');
  }
};

/**
 * 默认弹窗
 * @param {Array} coordinate click点的位置
 * @param {String} innerHTML 默认显示内容
 */
HDMap.prototype.popupDefault = function (coordinate, innerHTML) {
  this.closeCommonPopup();
  this.toggleClassName(this.popup_container, 'hdmap-list-popup', 'hdmap-ol-popup');
  this.toggleClassName(this.popup_container, 'hdmap-list-popup-multi', 'hdmap-ol-popup-default');
  this.toggleClassName(this.popup_closer, 'hdmap-list-popup-closer', 'hdmap-ol-popup-closer');
  this.popup_content.innerHTML = innerHTML;
  this.popupSetPlace(coordinate);
  if (!this.popup_container.parentNode.querySelector('.hdmap-list-popup-arrow')) {
    var popupArrow = document.createElement('div');
    popupArrow.setAttribute('class', 'hdmap-list-popup-arrow');
    this.popup_container.parentNode.appendChild(popupArrow);
    var ps = new PerfectScrollbar(this.popup_container);
    console.log(ps);
  }
};

/**
 * 气泡点位聚合弹窗
 * @param {Array} coordinate  鼠标点击处的坐标信息
 * @param {Array} features    点位聚合列表
 */
HDMap.prototype.popupMultipoint = function (coordinate, features) {
  var _this = this;

  this.popup_content.innerHTML = '';
  this.closeCommonPopup();
  this.toggleClassName(this.popup_container, 'hdmap-ol-popup', 'hdmap-list-popup');
  this.toggleClassName(this.popup_container, 'hdmap-ol-popup-default', 'hdmap-list-popup-multi');
  if (!this.popup_container.parentNode.querySelector('.hdmap-list-popup-arrow')) {
    var popupArrow = document.createElement('div');
    popupArrow.setAttribute('class', 'hdmap-list-popup-arrow');
    this.popup_container.parentNode.appendChild(popupArrow);
    var ps = new PerfectScrollbar(this.popup_container);
    console.log(ps);
  }
  this.popup_closer.classList.remove('hdmap-ol-popup-closer');
  this.popup_contentWrap.length = 0;
  for (var i = 0, len = features.length; i < len; i++) {
    var contentWrap = document.createElement('div');
    contentWrap.classList.add('hdmap-list-popupcontent');
    var contentImg = document.createElement('img');
    contentImg.src = features[i].imgUrl ? features[i].imgUrl : features[i].url;
    contentImg.classList.add('hdmap-list-popupimg');
    var contentDetail = document.createElement('p');
    contentDetail.classList.add('hdmap-list-popupparm');
    contentDetail.innerHTML = features[i].markerName;
    contentWrap.appendChild(contentImg);
    contentWrap.appendChild(contentDetail);
    this.popup_contentWrap.push(contentWrap);
    this.popup_content.appendChild(contentWrap);
  }
  var hdmap = this;

  var _loop = function _loop(_i, _len) {
    // TODO 这里添加监听的方式可能需要优化，要考虑怎么注销监听
    _this.popup_contentWrap[_i].onclick = function (e) {
      // TODO 这里考虑回调类型的判断优化
      hdmap.closeCommonPopup();
      var defaultcb = hdmap.eventCallback['singleclick'].default;
      defaultcb.call(this, {
        feature: features[_i],
        eventType: 'singleclick',
        coordinate: coordinate,
        mapEvent: e
      });
    };
  };

  for (var _i = 0, _len = this.popup_contentWrap.length; _i < _len; _i++) {
    _loop(_i, _len);
  }
  this.popupSetPlace(coordinate);
};

/**
 * 气泡无点位方法
 * @param {Array} coordinate 鼠标点击处的坐标信息
 */
HDMap.prototype.popupNoFeature = function (coordinate) {
  this.toggleClassName(this.popup_container, 'hdmap-list-popup', 'hdmap-ol-popup');
  this.toggleClassName(this.popup_closer, 'hdmap-list-popup-closer', 'hdmap-ol-popup-closer');
  this.popup_content.innerHTML = '当前位置：' + coordinate;
  this.popupSetPlace(coordinate);
};

/**
 * HDMap.prototype.closePopup
 * 关闭全部气泡
 */
HDMap.prototype.closePopup = function () {
  for (var i in this._overlays) {
    if (this._overlays[i].show) {
      this._overlays[i].show = false;
    }
    this._overlays[i].setPosition(undefined);
  }
  this._overlay.setPosition(undefined);
  if (this.popup_closer) {
    this.popup_closer.blur();
  }
  popupCtrl.curPopNum = this.popupShowNum();
  popupCtrl.reset();
};

/**
 * HDMap.prototype.closeCommonPopup
 * 关闭普通气泡（visible !== true）
 */
HDMap.prototype.closeCommonPopup = function () {
  for (var i in this._overlays) {
    if (this._overlays[i].visible === undefined) {
      if (this._overlays[i].show) {
        this._overlays[i].show = false;
      }
      this._overlays[i].setPosition(undefined);
    }
  }
  this._overlay.setPosition(undefined);
  if (this.popup_closer) {
    this.popup_closer.blur();
  }
};

/**
 * HDMap.prototype.regDefaulEventCallback
 * 注册地图各事件的默认监听事件
 */
HDMap.prototype.regDefaulEventCallback = function () {
  for (var eventType in eventRegister) {
    var tarMap = this._map;
    var key = null;
    if (eventType === 'zoomChange') {
      key = this._map.getView().on('change:resolution', eventRegister[eventType], tarMap);
    } else {
      key = this._map.on(eventType, eventRegister[eventType]);
    }
    this.eventKey[eventType] = key;
  }
};

/**
 * 警报动画开启
 * @param {Object} areaInfo 区域信息
 */
HDMap.prototype.warnAnimation = function (areaInfo) {
  var _this2 = this;

  var areaObj = this.getMarkerBylayerKey(areaInfo.id, 'gisLayer');
  areaObj.extProperties.visible = true;
  var timer = this.getTimerByKey(areaInfo.id);
  if (timer === undefined || timer === null) {
    timer = areaInfo.id;
  } else {
    clearInterval(timer);
  }
  var num = 0;
  var timerInfo = setInterval(function () {
    num++;
    num = num % 20;
    var opacity = num / 50 + 0.1;
    _this2.updateArea(areaInfo, hdmap.commonConfig.getWarningAreaStyle(opacity));
  }, 50);
  this.areaTimer[areaInfo.id] = timerInfo;
};

/**
 * 解除警报
 * @param {Object} areaInfo 区域信息
 */
HDMap.prototype.warnCancel = function (areaInfo) {
  var areaObj = this.getMarkerBylayerKey(areaInfo.id, 'gisLayer');
  var timer = this.getTimerByKey(areaInfo.id);
  if (timer) {
    clearInterval(timer);
    areaObj.extProperties.visible = false;
    this.updateArea(areaInfo, null);
  }
};

/**
 * HDMap.prototype.regEventListener
 * 注册地图事件监听
 * @param {String} eventType : 事件类型(具体都有哪些类型查看ol.MapBrowserEvent)
 * @param call : 回调函数
 * @param featureType : 注册的事件类型在那些点位类型上生效
 */
HDMap.prototype.regEventListener = function (eventType, callback, featureType) {
  // 入参判断
  if (typeof eventType !== 'string' || typeof callback !== 'function' || this.eventCallback[eventType] === undefined) {
    return;
  }
  // 如果在注册监听时加了featureType，表示该监听是注册到这类点上的回调，只在这类点位的对应事件触发时才会触发
  if (featureType) {
    this.eventCallback[eventType][featureType] = callback;
  } else {
    this.eventCallback[eventType].default = callback;
  }
};

/**
 * HDMap.prototype.unRegEventListener
 * 注销地图上的事件监听
 * @param {String} eventType
 * @param {String} featureType
 */
HDMap.prototype.unRegEventListener = function (eventType, featureType) {
  if (typeof eventType !== 'string' || this.eventCallback[eventType] === undefined) {
    return;
  }
  if (featureType) {
    this.eventCallback[eventType][featureType] = null;
  } else {
    this.eventCallback[eventType].default = null;
  }
};

/*
  加入地图事件监听
  eventType : 事件类型(具体都有哪些类型查看ol.MapBrowserEvent)
  call : 回调函数
*/
HDMap.prototype.addEventListener = function (eventType, call) {
  var key = this._map.on(eventType, call);
  this.eventKey[eventType] = key;
  return key;
};

/*
  移除地图事件监听
  eventType:事件类型，参考ol.MapBrowserEvent
*/
HDMap.prototype.removeEventListener = function (eventType) {
  var key = this.eventKey[eventType];
  if (key) {
    this._map.unByKey(key);
    delete this.eventKey[eventType];
  }
};

/**
 * 返回map对象
 */
HDMap.prototype.getMap = function () {
  return this._map;
};

/**
 * 返回mapUid
 */
HDMap.prototype.getMapUid = function () {
  return this._map.ol_uid;
};

/*
  在地图上画点、线（ps：画图形和画线是一个意思）
  fId : 此元素的主键
  fType ：feature的类型，'point'   'line' （必须传）
  pointArr : 坐标数组 （必须传）
  cssStyle ：想画得feature的样式 （可传）
  layerKey : 想要画在哪个图层上 （必须传）

  这里的逻辑与addMarker对图层的处理逻辑就不一样，这里如果没有图层则会创建，
  所以也可以采用这种逻辑
*/
HDMap.prototype.drawFeature = function (fId, fType, pointArr, cssStyle, layerKey) {
  if (fId && pointArr && layerKey && pointArr.length > 0) {
    var layer = this.getLayerByKey(layerKey);
    if (layer == null) {
      layer = this.addLayer(layerKey);
    }
    var feature = null;
    if (fType === 'point' && pointArr.length > 0) {
      // 下面这句话是对这整个图层的style配置
      layer.setStyle(new ol.style.Style({ image: new ol.style.Circle(cssStyle) }));
      feature = new ol.Feature({
        id: fId,
        geometry: new ol.geom.Point([pointArr[0].mapX, pointArr[0].mapY])
      });
      // 下面这句话是对单个feature的style配置，效果和对整个图层配置style一样
      // feature.setStyle(new ol.style.Style({image: new ol.style.Circle(cssStyle)}));
    } else if (fType === 'line' && pointArr.length > 0) {
      layer.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke(cssStyle)
      }));
      var coordinates = [];
      for (var i = 0; i < pointArr.length; i++) {
        var point = [];
        point.push(pointArr[i].mapX);
        point.push(pointArr[i].mapY);
        coordinates.push(point);
      }
      feature = new ol.Feature({
        id: fId,
        geometry: new ol.geom.LineString(coordinates)
      });
    }
    layer.getSource().addFeature(feature);
    return feature;
  }
};
/**
 *  初始化画线编辑状态
 * @param {*} lineStyle 线的样式：{color:'#ffcc33',width:2}
 * @param {*} pointStyle
 * @param {*} positioncall
 */
HDMap.prototype.initDrawLineTool = function (lineStyle, pointStyle, positioncall) {
  if (!this.drawTool.lineDraw) {
    var source = new ol.source.Vector();
    var styleFunction = function styleFunction(feature, resolution) {
      var geometry = feature.getGeometry();
      var styles = [
      // linestring
      new ol.style.Style({
        stroke: new ol.style.Stroke(lineStyle)
      })];
      if (typeof positioncall === 'function') {
        geometry.forEachSegment(function (start, end) {
          var posArr = positioncall.call(this, start, end);
          for (var i = 0; i < posArr.length; i++) {
            styles.push(new ol.style.Style({
              geometry: new ol.geom.Point(posArr[i]),
              image: pointStyle
            }));
          }
        }, feature);
      }
      return styles;
    };
    var vector = new ol.layer.HDVector('drawLineLayer', {
      source: source,
      style: styleFunction
    });
    this.outterLayers['drawLineLayer'] = vector;
    this._map.addLayer(vector);
    // 初始化交互对象
    this.drawTool.lineModify = new ol.interaction.Modify({ source: source });
    this.drawTool.lineDraw = new ol.interaction.Draw({
      source: source,
      type: /** @type {ol.geom.GeometryType} */'LineString'
    });
    this.drawTool.lineSnap = new ol.interaction.Snap({ source: source });
  } // end if
};

/**
 * 打开画线工具，可以画线
 * @param {*} lineStyle 线的样式,具体都有什么样式参考api中的ol.style.Stroke，例如：{color:'#ffcc33',width:2}
 * @param {*} pointStyle 如果positioncall传值时，这里必须传值，具体传值参考例子ol.style.Circle或者ol.style.Icon
 * @param {*} positioncall 自己写的点位置计算函数，比如我们想要在线的中间加点，则需要写此函数，参数为start,end 即一条线的起点和终点坐标
 * @param {*} drawendCall 画结束的回调函数
 * @param {*} modifyCall 修改画线的回调函数
 * @param {Boolean} multi 是否可同时画多条线路，true可以，false每次只能画一条，默认true
 */
HDMap.prototype.openDrawLineTool = function (lineStyle, pointStyle, positioncall, drawendCall, modifyCall, multi) {
  var _this3 = this;

  this.setMapEditState('drawLineState');
  this.initDrawLineTool(lineStyle, pointStyle, positioncall);
  this._map.addInteraction(this.drawTool.lineModify);
  this._map.addInteraction(this.drawTool.lineDraw);
  this._map.addInteraction(this.drawTool.lineSnap);
  // 画线开始时，判断是否可画多条，不可则清空之前的画线 mod by zmj 2018-02-25
  this.eventKey['linedrawstart'] = this.drawTool.lineDraw.on('drawstart', function (e) {
    var that = _this3;
    if (!multi && multi !== undefined) {
      var curMap = e.target.map_;
      var pix = e.target.downPx_;
      var fArr = curMap.getFeaturesAtPixel(pix);
      var uidArr = [];
      fArr.map(function (feat, index) {
        if (feat.getGeometry().getType() === 'LineString') {
          uidArr.push(feat.ol_uid);
        }
      });
      var feats = _this3.getFrontDrawLine(); // 当前画线层的所有线feature
      feats.map(function (feat, index) {
        if (uidArr.indexOf(feat.ol_uid) === -1) {
          that.removeFrontDrawLine(feat);
        }
      });
    }
    // if (!multi && multi !== undefined) this.clearDrawLine()
  });
  if (drawendCall) {
    this.eventKey['linedrawend'] = this.drawTool.lineDraw.on('drawend', function (e) {
      drawendCall.call(_this3, e);
    });
  }
  if (modifyCall) {
    this.eventKey['linemodifyend'] = this.drawTool.lineModify.on('modifyend', function (e) {
      modifyCall.call(this, e);
    });
  }
};

/**
 * 编辑完线路后，调用此方法，把线路显示在lineLayer上，并返回Feature对象
 * @param {Object|Array} option 线路参数示例，可以单独传入一个参数Object，或者一个Array[lineInfo,lineInfo...]
 * {
 *  id: '111' 线路id
 *  name: 'lineName' 线路名称
 *  markerType: '01' 线路类型
 *  ...任意其他参数，都会在线路的getExtProperties()里
 * }
 */
HDMap.prototype.showDrawLine = function (option) {
  if (!option) {
    console.warn(warnLogTag + 'showDrawLine Error : option is  must need');
    return null;
  }
  var layer = this.outterLayers['drawLineLayer'];
  if (layer) {
    var source = layer.getSource();
    var features = source.getFeatures();
    if (features.length === 0) {
      console.warn(warnLogTag + 'showDrawLine Error : there is no feature for save');
      return null;
    }
    var lineFeaturesArr = [];
    var optionArr = [];
    if (option instanceof Array && option.length > 0) {
      optionArr = optionArr.concat(option);
    } else if (option instanceof Object) {
      optionArr.push(option);
    }
    // 获取当前画线层上的所有线，封装数据后，添加到lineLayer层
    var nums = 0;
    var opLen = optionArr.length;
    for (var len = features.length, i = len - 1; i >= 0; i--) {
      if (nums < opLen) {
        var borderpoint = features[i].getGeometry().getCoordinates();
        var _id = new Date().valueOf() + Math.random() * 1000;
        var opObj = {
          id: _id,
          name: 'lineFeature_' + _id,
          lineType: '001'
        };
        if (optionArr[nums] && optionArr[nums].id) {
          opObj = Object.assign({}, optionArr[nums]);
        }
        if (features[i] instanceof ol.LineFeature) {
          var exprop = features[i].getExtProperties();
          if (exprop) {
            opObj = Object.assign({}, exprop);
          }
        }
        opObj.borderPoints = borderpoint;
        var feat = this.addLine(opObj);
        lineFeaturesArr.push(feat);
        nums++;
      }
    } // end for
    source.clear();
    if (!option || option instanceof Array) {
      return lineFeaturesArr;
    } else {
      return lineFeaturesArr[0];
    }
  }
  return null;
};

/**
 * 清空画线层的图形
 * 注意：该方法会清空当前画图层上的所有图形
 */
HDMap.prototype.clearDrawLine = function () {
  var layer = this.outterLayers['drawLineLayer'];
  if (layer) {
    var source = layer.getSource();
    source.clear();
  }
};

/**
 * 获得当前画线层上的所有线feature
 */
HDMap.prototype.getFrontDrawLine = function () {
  var layer = this.outterLayers['drawLineLayer'];
  if (layer) {
    var source = layer.getSource();
    var features = source.getFeatures();
    return features;
  }
  return [];
};

/**
 * 移除指定的画线feature
 */
HDMap.prototype.removeFrontDrawLine = function (feat) {
  var layer = this.outterLayers['drawLineLayer'];
  if (layer) {
    var source = layer.getSource();
    source.removeFeature(feat);
  }
};
/**
 * 重新编辑之前画的线路
 * @param {Objcet} option
 * * 线路数据对象示例:
 * {
 *  id: '111' 线路id
 *  name: 'eastArea' 线路名称
 *  lineType: '01' 线路类型
 *  borderPoints: [[[42.5, 94.9375], [41.5, 33.9375], [151, 39.4375], [151.5, 99.4375], [68.5, 112.9375], [42.5, 93.9375]]]  边界点list
 * }
 * @param {*} lineStyle 线的样式,具体都有什么样式参考api中的ol.style.Stroke，例如：{color:'#ffcc33',width:2}
 * @param {*} pointStyle 如果positioncall传值时，这里必须传值，具体传值参考例子ol.style.Circle或者ol.style.Icon
 * @param {*} positioncall 自己写的点位置计算函数，比如我们想要在线的中间加点，则需要写此函数，参数为start,end 即一条线的起点和终点坐标
 * @param {*} drawendCall 画结束的回调函数
 * @param {*} modifyCall 修改画线的回调函数
 */
HDMap.prototype.editDrawLine = function (option, lineStyle, pointStyle, positioncall, drawendCall, modifyCall) {
  if (!option) {
    console.warn(warnLogTag + 'editDrawLine Error : line option can not be null');
    return;
  }
  var bp = option.position ? option.position : option.borderPoints;
  if (!bp) {
    console.warn(warnLogTag + 'editDrawLine Error : line option.borderPoints or option.position can not be null');
    return;
  }
  var feature = null;
  if (option instanceof ol.Feature) {
    // 如果传进来的是Feature对象，必须是这个Feature没添加在别的层上
    feature = option;
  } else if (option instanceof Object) {
    var _style = null;
    if (lineStyle) {
      _style = new ol.style.Style({
        stroke: new ol.style.Stroke(lineStyle)
      });
    }
    feature = new ol.LineFeature({
      geometry: new ol.geom.LineString(option.borderPoints),
      geometryName: 'LineString',
      style: _style
    }, option, 'lineLayer');
    feature.setId(option.id);
    if (_style) feature.setStyle(_style);
  }
  var layer = this.outterLayers['drawLineLayer'];
  var source = null;
  if (layer && feature) {
    source = layer.getSource();
    source.addFeature(feature);
    this._map.addInteraction(this.drawTool.lineModify);
    this._map.addInteraction(this.drawTool.lineSnap);
    this.setMapEditState('drawLineState');
  } else {
    this.openDrawLineTool(lineStyle, pointStyle, positioncall, drawendCall, modifyCall);
    layer = this.outterLayers['drawLineLayer'];
    source = layer.getSource();
    source.addFeature(feature);
    this._map.removeInteraction(this.drawTool.lineDraw); // 编辑图形，不需要画图工具
  }
};

/**
 * 生成用于画图的交互对象 ol.interaction.Draw
 * @param {*} type 画线类型
 * @param {*} source 图层数据源
 */
HDMap.prototype.createDrawIntera = function (type, source) {
  var geometryFunction, maxPoints;
  if (type === 'Box') {
    type = 'Circle';
    geometryFunction = ol.interaction.Draw.createBox();
  } else if (type === 'Square') {
    type = 'Circle';
    geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
  }

  this.drawTool.shapeDraw = new ol.interaction.Draw({
    source: source,
    type: /** @type {ol.geom.GeometryType} */type,
    geometryFunction: geometryFunction,
    maxPoints: maxPoints
    // freehand: true // 多边形自由绘制
  });
};
/**
 * 初始化画图交互工具
 * @param {String} type 画图类型：Polygon
 */
HDMap.prototype.initDrawShapeTool = function (type) {
  var source = null;
  if (!this.drawTool.shapeDraw) {
    source = new ol.source.Vector({ wrapX: false });
    var vector = new ol.layer.HDVector('drawShapeLayer', {
      source: source,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
          color: '#33c7ff',
          width: 2
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#33c7ff'
          })
        })
      })
    });
    this.drawTool.shapeSelect = new ol.interaction.Select({ layers: [vector] });
    // let select = this.drawTool.shapeSelect
    this.drawTool.shapeModify = new ol.interaction.Modify({
      source: source
      // , // 加上这个设置，编辑区域时，就只能拖动顶点
      // insertVertexCondition: function () {
      //   // prevent new vertices to be added to the polygons
      //   return !select.getFeatures().getArray().every(function (feature) {
      //     return feature.getGeometry().getType().match(/Polygon/);
      //   });
      // }
    });
    this.createDrawIntera(type, source);
    this.drawTool.shapeSnap = new ol.interaction.Snap({ source: source });
    this.outterLayers['drawShapeLayer'] = vector;
    this._map.addLayer(vector);
  } else {
    if (this.drawTool.shapeDraw.type !== type) {
      this._map.removeInteraction(this.drawTool.shapeDraw);
      var layer = this.outterLayers['drawShapeLayer'];
      source = layer.getSource();
      this.createDrawIntera(type, source);
    }
  }
};

/**
 *框选，圈选,多边形绘制
 * @param {*} type : Circle(圆) || Box（矩形） || Polygon（多边形）———— 注：不传类型，则默认是多边形
 * @param {*} drawendCall 绘制结束的回调
 * @param {*} modifyendCall 修改图形的回调
 * @param {Boolean} multi 是否可同时画多个区域，true可以，false每次只能画一个，默认true
 */
HDMap.prototype.openDrawShapeTool = function (type, drawendCall, modifyendCall, multi) {
  var _this4 = this;

  if (!type) type = 'Polygon';
  this.setMapEditState('drawShapeState');
  this.initDrawShapeTool(type);
  // 画区域开始时，判断是否可画多个，不可则清空之前的区域 mod by zmj 2018-02-25
  this.eventKey['shapedrawstart'] = this.drawTool.shapeDraw.on('drawstart', function (e) {
    var that = _this4;
    if (!multi && multi !== undefined) {
      var curMap = e.target.map_;
      var pix = e.target.downPx_;
      var fArr = curMap.getFeaturesAtPixel(pix);
      var uidArr = [];
      fArr.map(function (feat, index) {
        if (feat.getGeometry().getType() === 'Polygon') {
          uidArr.push(feat.ol_uid);
        }
      });
      var feats = _this4.getFrontDrawShape(); // 当前画线层的所有线feature
      feats.map(function (feat, index) {
        if (uidArr.indexOf(feat.ol_uid) === -1) {
          that.removeFrontDrawShape(feat);
        }
      });
    }
    // if (!multi && multi !== undefined) this.clearDrawShape()
  });
  if (drawendCall) {
    this.eventKey['shapedrawend'] = this.drawTool.shapeDraw.on('drawend', function ( /* {ol.interaction.DrawEvent} */e) {
      drawendCall.call(this, e);
    });
  }
  if (modifyendCall) {
    this.eventKey['shapemodifyend'] = this.drawTool.shapeModify.on('modifyend', function ( /* {ol.interaction.DrawEvent} */e) {
      modifyendCall.call(this, e);
    });
  }
  // this._map.addInteraction(this.drawTool.shapeSelect)
  this._map.addInteraction(this.drawTool.shapeModify);
  this._map.addInteraction(this.drawTool.shapeDraw);
  this._map.addInteraction(this.drawTool.shapeSnap);
};
/**
 * 编辑完图形后，调用此方法，把图形以AreaFeature类型显示在gisLayer上，并返回AreaFeature对象
 * @param {Object|Array} option
 1、option:Object : 是一个区域数据对象,调用此方法返回一个AreaFeature对象
 2、option:Array : 是一个存放多个‘区域数据对象’的数组,调用此方法返回一个存放所有所画图形(AreaFeature对象)的数组[areaInfo,areaInfo...]
 * 区域数据对象示例
 * {
 *  id: '111' 区域id
 *  name: 'eastArea' 区域名称
 *  areaType: '01' 区域类型
  ...任意其他传入的字段，都可以在区域对象的getExtProperties()里得到
 * }
 */
HDMap.prototype.showDrawShape = function (option) {
  if (!option) {
    console.warn(warnLogTag + 'showDrawShape Error : option is  must need');
    return null;
  }
  var layer = this.outterLayers['drawShapeLayer'];
  var areaFeatureArr = [];
  if (layer) {
    var source = layer.getSource();
    var features = source.getFeatures();
    if (features.length === 0) {
      console.warn(warnLogTag + 'showDrawShape Error : there is no feature for save');
      return null;
    }
    var optionArr = [];
    if (option instanceof Array && option.length > 0) {
      optionArr = optionArr.concat(option);
    } else if (option instanceof Object) {
      optionArr.push(option);
    }
    // 循环获取画图层上的区域feature
    var nums = 0;
    var opLen = optionArr.length;
    for (var len = features.length, i = len - 1; i >= 0; i--) {
      if (nums < opLen) {
        var borderpoint = features[i].getGeometry().getCoordinates();
        var _id = new Date().valueOf() + Math.random() * 1000;
        var opObj = {
          id: _id,
          name: 'areaFeature_' + _id,
          areaType: '001'
        };
        if (optionArr[nums] && optionArr[nums].id) {
          opObj = Object.assign({}, optionArr[nums]);
        }
        if (features[i] instanceof ol.AreaFeature) {
          var exprop = features[i].getExtProperties();
          if (exprop) {
            exprop.rotate = features[i].getRotate();
            exprop.areaTypesOf = features[i].getAreaTypesOf();
            opObj = Object.assign({}, exprop);
          }
        }
        opObj.borderPoints = borderpoint;
        var feat = this.addArea(opObj);
        areaFeatureArr.push(feat);
        nums++;
      }
    } // end for
    source.clear();
    this.closeDrawShapeTool(); // 关闭区域编辑状态
    if (!option || option instanceof Array) {
      return areaFeatureArr;
    } else {
      return areaFeatureArr[0];
    }
  }
};
/**
 * 清空画图层的图形
 * 注意：该方法会清空当前画图层上的所有图形
 */
HDMap.prototype.clearDrawShape = function () {
  var layer = this.outterLayers['drawShapeLayer'];
  if (layer) {
    var source = layer.getSource();
    source.clear();
  }
};

/**
 * 获得当前画图层上的所有线feature
 */
HDMap.prototype.getFrontDrawShape = function () {
  var layer = this.outterLayers['drawShapeLayer'];
  if (layer) {
    var source = layer.getSource();
    var features = source.getFeatures();
    return features;
  }
  return [];
};

/**
 * 移除指定的画图feature
 */
HDMap.prototype.removeFrontDrawShape = function (feat) {
  var layer = this.outterLayers['drawShapeLayer'];
  if (layer) {
    var source = layer.getSource();
    source.removeFeature(feat);
  }
};
/**
 * 重新编辑之前画的图形
 * @param {Object} option 区域数据对象
 * 区域数据对象示例:
 * {
 *  id: '111' 区域id
 *  name: 'eastArea' 区域名称
 *  areaType: '01' 区域类型
 *  borderPointers : [[[42.5, 94.9375], [41.5, 33.9375], [151, 39.4375], [151.5, 99.4375], [68.5, 112.9375], [42.5, 93.9375]]] 边界点list
 *  areaTypesOf: parking 停车场专用区域类型(是为了区分停车场区域和一般区域的，作用禁止修改区域边线)
 * }
 * @param {function} selectCall : 编辑停车场区域时，传入此参数，可在选中区域时回调此方法
 */
HDMap.prototype.editDrawShape = function (option, selectCall) {
  if (!option) {
    console.warn(warnLogTag + 'editDrawShape Error : shape option can not be null');
    return;
  }
  var bp = option.position ? option.position : option.borderPoints;
  if (!bp) {
    console.warn(warnLogTag + 'editDrawShape Error : shape option.borderPoints or option.position can not be null');
    return;
  }
  var feature = null;
  if (option instanceof ol.Feature) {
    // 如果传进来的是Feature对象，必须是这个Feature没添加在别的层上
    feature = option;
  } else if (option instanceof Object) {
    feature = new ol.AreaFeature({
      geometry: new ol.geom.Polygon(bp),
      geometryName: 'Polygon',
      style: null
    }, option, 'drawShapeLayer');
    feature.setId(option.id);
    // if (option.rotate) {
    //   var geom_ = feature.getGeometry().clone();
    //   var center_ = ol.extent.getCenter(geom_.getExtent());
    //   var angle = parseFloat(option.rotate)
    //   geom_.rotate(angle, center_);
    //   feature.setGeometry(geom_)
    // }
  }
  // 以下是设置画图层状态和交互
  var layer = this.outterLayers['drawShapeLayer'];
  var source = null;
  var state = this.getMapEditState(); // 获取当前地图编辑状态
  if (layer && feature) {
    if (state !== 'drawShapeState') {
      this.setMapEditState('drawShapeState');
    }
  } else {
    this.openDrawShapeTool('Polygon');
    layer = this.outterLayers['drawShapeLayer'];
  }
  source = layer.getSource();
  source.addFeature(feature);
  // 判断如果没添加过交互，则添加对应的交互
  if (!state || state !== 'drawShapeState') {
    if (option.areaTypesOf && option.areaTypesOf === 'parking') {
      this._map.removeInteraction(this.drawTool.shapeModify); // 编辑停车场区域，不需要修改工具
      this._map.addInteraction(this.drawTool.shapeSelect);
      this.drawTool.shapeSelect.setActive(false);
    } else {
      this._map.addInteraction(this.drawTool.shapeModify);
      this._map.addInteraction(this.drawTool.shapeSnap);
    }
    this._map.removeInteraction(this.drawTool.shapeDraw); // 编辑图形，不需要画图工具
    if (!this.drawTool.transform) {
      this.drawTool.transform = new ol.interaction.Transform({
        translateFeature: false,
        scale: true,
        rotate: true,
        keepAspectRatio: ol.events.condition.always,
        translate: true,
        stretch: false,
        layers: [layer]
      });
      this.drawTool.transform.on(['rotateend', 'translateend', 'scaleend'], function (e) {
        var _angle = e.feature.get('angle');
        if (e.type === 'rotateend') {
          // 弧度转角度
          _angle = -((_angle * 180 / Math.PI - 180) % 360 + 180);
          if (e.feature.setRotate instanceof Function) {
            e.feature.setRotate(e.feature.rotate + _angle);
          }
        }
        console.log(infoLogTag + '当前的旋转角度：' + e.feature.rotate);
        // console.log(e)
      });
      // Transform 交互添加 '选中feature' 事件监听
      this.drawTool.transform.on('select', function (e) {
        if (selectCall) {
          selectCall.call(this, e);
        }
      });
    }
    this._map.addInteraction(this.drawTool.transform);
  } // end if state
};
/**
 * 设置地图编辑状态
 * @param {*String} type drawLineState：画线，drawShapeState：画图，dragState：编辑点位
 */
HDMap.prototype.setMapEditState = function (type) {
  switch (type) {
    case 'drawLineState':
      this.drawTool['drawLineState'] = true;
      this.closeDrawShapeTool();
      this.closeDragTool();
      break;
    case 'drawShapeState':
      this.drawTool['drawShapeState'] = true;
      this.closeDrawLineTool();
      this.closeDragTool();
      break;
    case 'dragState':
      this.dragFeatureTool['dragState'] = true;
      this.closeDrawLineTool();
      this.closeDrawShapeTool();
      break;
    default:
      this.closeDrawLineTool();
      this.closeDrawShapeTool();
      this.closeDragTool();
      break;
  }
  this.drawTool['drawState'] = type;
};

HDMap.prototype.getMapEditState = function () {
  return this.drawTool['drawState'] ? this.drawTool['drawState'] : '';
};

/*
  关闭多边形选择工具
*/
HDMap.prototype.closeDrawShapeTool = function () {
  if (this.drawTool['drawShapeState']) {
    var drawkeystart = this.eventKey['shapedrawstart'];
    var drawkey = this.eventKey['shapedrawend'];
    var modifykey = this.eventKey['shapemodifyend'];
    ol.Observable.unByKey(drawkeystart);
    delete this.eventKey['shapedrawstart'];
    ol.Observable.unByKey(drawkey);
    delete this.eventKey['shapedrawend'];
    ol.Observable.unByKey(modifykey);
    delete this.eventKey['shapemodifyend'];
    this._map.removeInteraction(this.drawTool.shapeSelect);
    this._map.removeInteraction(this.drawTool.shapeModify);
    this._map.removeInteraction(this.drawTool.shapeDraw);
    this._map.removeInteraction(this.drawTool.shapeSnap);
    this._map.removeInteraction(this.drawTool.transform);
    // this._map.removeLayer(this.drawTool["drawShapeLayer"]);
    this.drawTool['drawShapeState'] = false;
    this.drawTool['drawState'] = '';
  }
};

/*
  关闭划线工具,同时清理图层和feature
*/
HDMap.prototype.closeDrawLineTool = function () {
  if (this.drawTool['drawLineState']) {
    var drawstartkey = this.eventKey['linedrawstart'];
    var drawkey = this.eventKey['linedrawend'];
    var modifykey = this.eventKey['linemodifyend'];
    ol.Observable.unByKey(drawstartkey);
    delete this.eventKey['linedrawstart'];
    ol.Observable.unByKey(drawkey);
    delete this.eventKey['linedrawend'];
    ol.Observable.unByKey(modifykey);
    delete this.eventKey['linemodifyend'];
    this._map.removeInteraction(this.drawTool.lineModify);
    this._map.removeInteraction(this.drawTool.lineDraw);
    this._map.removeInteraction(this.drawTool.lineSnap);
    // this._map.removeLayer(this.outterLayers["drawLineLayer"]);
    this.drawTool['drawLineState'] = false;
    this.drawTool['drawState'] = '';
  }
};

HDMap.prototype.getDrawLineState = function () {
  return this.drawTool['drawLineState'];
};

HDMap.prototype.getDrawShapeState = function () {
  return this.drawTool['drawShapeState'];
};

/**
 * HDMap.prototype.setCenter
 * 为地图提供定位功能，coordinate为坐标数组 元素[0] 为x  元素[1]为y
 * @param {ol.Coordinate} coordinate 点位坐标
 * 如果百度地图想要使用此方法，需要先将经纬度用提供的方法转换成米坐标系，再传入参数
 * @param {int} zoom 参数是放大倍数，如果不填则不会进行放大，只定位
 */
HDMap.prototype.setCenter = function (
/* type : ol.Coordinate */coordinate, zoom) {
  if (coordinate) {
    if (zoom) {
      this.setZoom(zoom);
      this._map.getView().setCenter(coordinate);
    } else {
      this._map.getView().setCenter(coordinate);
    }
  }
};
/**
 * HDMap.prototype.getCenter
 * 获取目前地图的中心点
 * @return {ol.Coordinate}
 */
HDMap.prototype.getCenter = function () {
  return this._map.getView().getCenter();
};

/**
 * HDMap.prototype.setZoom
 * 设置地图的放大倍数
 * 当大于最大值时，使用maxZoom，小于minZoom，使用minZoom
 * @param {number} zoom
 */
HDMap.prototype.setZoom = function (zoom) {
  if (this.mapConfig.gisEngine === 'tile') {
    zoom = zoom - this.mapConfig.minZoom;
    if (zoom && zoom > this.mapConfig.maxZoom) {
      this._map.getView().setZoom(this.mapConfig.maxZoom - this.mapConfig.minZoom);
    } else if (zoom && zoom < 0) {
      this._map.getView().setZoom(0);
    } else {
      this._map.getView().setZoom(zoom);
    }
  } else {
    if (zoom && zoom > this.mapConfig.maxZoom) {
      this._map.getView().setZoom(this.mapConfig.maxZoom);
    } else if (zoom && zoom < this.mapConfig.minZoom) {
      this._map.getView().setZoom(this.mapConfig.minZoom);
    } else {
      this._map.getView().setZoom(zoom);
    }
  }
};

/**
 * HDMap.prototype.getZoom
 * 得到目前地图的放大倍数
 * @return {number}
 */
HDMap.prototype.getZoom = function () {
  var zoom = this._map.getView().getZoom();
  if (this.mapConfig.gisEngine === 'tile') {
    return zoom + this.mapConfig.minZoom;
  } else {
    return zoom;
  }
};

/*
  通过普通的浏览器事件获取当前的地理经纬度

  e:浏览器原生的事件
  isGis: 如果传true，则此函数会把浏览器原生事件点击的转换成真实的gps坐标
  如果不传，则会返回米坐标系的坐标,只有在百度地图的情况下，有需要的时候再传，否则不要传
  返回的参数是一个数组，第一个元素是经度，第二个元素是纬度
*/
HDMap.prototype.getLonLat = function (e, isGis) {
  var pixel = this._map.getEventPixel(e);
  var lonlat = this._map.getCoordinateFromPixel(pixel);
  if (isGis) {
    lonlat = ol.proj.transform(lonlat, 'EPSG:3857', 'EPSG:4326');
  }
  return lonlat;
};

/*
  控制图层的显示\隐藏
  layerKey:为图层的标识
  flag:为图层的显示\隐藏  true 显示   false 隐藏
*/
HDMap.prototype.setLayerVisible = function (layerKey, flag, isforbi) {
  var z = this.mapConfig.maxZoom;
  var nowZoom = this.getZoom();
  var lk = '';
  var bool = false;
  var layer = null;
  for (var i = Math.floor(z); i > 0; i--) {
    lk = layerKey + '_' + i;
    layer = this.getLayerByKey(lk);
    if (layer) {
      if (nowZoom >= i) layer.setVisible(flag);
      if (isforbi !== undefined) layer.setVisibleFlag(isforbi);
      bool = true;
    }
  }
  layer = this.getLayerByKey(layerKey);
  if (layer) {
    layer.setVisible(flag);
    if (isforbi !== undefined) layer.setVisibleFlag(isforbi);
    bool = true;
  }
  // 上面那句执行完后必须要鼠标点击或者拖动一下地图，我们才看的到图层进行隐藏\显示了，
  // 所以加上这句，强制它动一下。
  if (bool) this._map.updateSize();
};

/*
  打开拖动marker的工具
  dragStart是拖动前需要调用的函数
  dragEnd是拖动完成后需要调用的函数
*/
HDMap.prototype.initDragTool = function () {
  var selectFilterFunction = function selectFilterFunction(feature, layer) {
    return true;
  };
  var layerArr = [];
  for (var key in this.outterLayers) {
    layerArr.push(this.outterLayers[key]);
  }
  this.dragFeatureTool.select = new ol.interaction.Select({
    filter: selectFilterFunction,
    layers: layerArr
  });
  /* if(selectStyle) {
    this.dragFeatureTool.select.setStyle(selectStyle);
  } */
  var thismap = this;
  this.dragFeatureTool.translate = new ol.interaction.Translate({
    features: thismap.dragFeatureTool.select.getFeatures()
  });
};

/*
  打开拖拽工具
  dragStartCall：拖拽前的回调函数
  dragEndCall: 拖拽后的回调函数
  selectcall:选中的回调函数
  multi : 是否允许选中多个marker，false为不允许，true为允许
  dragIngCall: 拖动事件回调
  isNoDrag: 不允许拖动，不传该值的时候，默认可拖动点位,传值则不可拖动
*/
HDMap.prototype.openDragTool = function (dragStartCall, dragEndCall, selectCall, multi, dragIngCall, isNoDrag) {
  this.setMapEditState('dragState');
  if (!this.dragFeatureTool.translate || !this.dragFeatureTool.select) {
    this.initDragTool();
  }
  if (dragStartCall) {
    this.eventKey['translatestart'] = this.dragFeatureTool.translate.on('translatestart', dragStartCall);
  }
  if (dragEndCall) {
    this.eventKey['translateend'] = this.dragFeatureTool.translate.on('translateend', dragEndCall);
  }
  if (dragIngCall) {
    this.eventKey['translating'] = this.dragFeatureTool.translate.on('translating', dragIngCall);
  }
  if (selectCall) {
    this.eventKey['select'] = this.dragFeatureTool.select.on('select', selectCall);
  }
  this.dragFeatureTool.select.set('multi', multi);
  this._map.addInteraction(this.dragFeatureTool.select);
  if (!isNoDrag) this._map.addInteraction(this.dragFeatureTool.translate);
  // this.dragFeatureTool["dragState"] = true;
};

/*
  关闭拖拽工具
*/
HDMap.prototype.closeDragTool = function () {
  if (this.dragFeatureTool['dragState']) {
    var transstart = this.eventKey['translatestart'];
    var transend = this.eventKey['translateend'];
    var transing = this.eventKey['translating'];
    var select = this.eventKey['select'];
    ol.Observable.unByKey(transstart);
    delete this.eventKey['translatestart'];
    ol.Observable.unByKey(transend);
    delete this.eventKey['translateend'];
    ol.Observable.unByKey(transing);
    delete this.eventKey['translating'];
    ol.Observable.unByKey(select);
    delete this.eventKey['select'];
    console.log(infoLogTag + 'transstart = ');
    console.log(transstart);
    this._map.removeInteraction(this.dragFeatureTool.select);
    this._map.removeInteraction(this.dragFeatureTool.translate);
    this.dragFeatureTool.select = null;
    this.dragFeatureTool.translate = null;
    this.dragFeatureTool['dragState'] = false;
    this.drawTool['drawState'] = '';
  }
};

HDMap.prototype.getDragState = function () {
  return this.dragFeatureTool['dragState'];
};

// TODO: 需要将这些坐标转换的工具函数进行提取或者封装，不需要向外暴露

/**
 * 经纬度转球面墨卡托坐标系
 * @param {Array} position
 * @return {Array} coordinate
 */
HDMap.prototype.translate_4326_to_3857 = function (position) {
  if (position[0] > 180 || position[0] < -180 || position[1] > 90 || position[1] < -90) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90');
    return;
  }
  var coor = ol.proj.transform(position, 'EPSG:4326', 'EPSG:3857');
  return coor;
};

/**
 * 球面墨卡托坐标系转真实经纬度
 * @param {Array} position
 * @return {Array} coordinate
 */
HDMap.prototype.translate_3857_to_4326 = function (position) {
  var coor = ol.proj.transform(position, 'EPSG:3857', 'EPSG:4326');
  return coor;
};

/**
 * 百度坐标转换成火星坐标系
 * 即百度地图转谷歌、高德
 * @param {Array} position
 * @return {Array} lonlat
 */
HDMap.prototype.translate_bd09_to_gcj02 = function (position) {
  if (position[0] > 180 || position[0] < -180 || position[1] > 90 || position[1] < -90) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90');
    return;
  }
  var x = position[0] - 0.0065;
  var y = position[1] - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  var lonlat = [];
  lonlat.push(z * Math.cos(theta));
  lonlat.push(z * Math.sin(theta));
  return lonlat;
};
/**
 * 火星坐标系转换成百度坐标
 * 即谷歌、高德地图转百度
 * @param {Array} position
 * @return {Array} lonlat
 */
HDMap.prototype.translate_gcj02_to_bd09 = function (position) {
  if (position[0] > 180 || position[0] < -180 || position[1] > 90 || position[1] < -90) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90');
    return;
  }
  var x = position[0];
  var y = position[1];
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  var lonlat = [];
  lonlat.push(z * Math.cos(theta) + 0.0065);
  lonlat.push(z * Math.sin(theta) + 0.006);
  return lonlat;
};

/**
 * 火星坐标系转换成4326(经纬度)坐标系
 * @param {Array} position
 * @return {Array} lonlat
 */
HDMap.prototype.translate_gcj02_to_4326 = function (position) {
  if (position[0] > 180 || position[0] < -180 || position[1] > 90 || position[1] < -90) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90');
    return;
  }
  var lng = position[0];
  var lat = position[1];
  if (!outOfChina(lng, lat)) {
    var deltaD = delta(lng, lat);
    lng = lng - deltaD[0];
    lat = lat - deltaD[1];
  }
  var lonlat = [];
  lonlat.push(lng);
  lonlat.push(lat);
  return lonlat;
};
/**
 * 4326(经纬度)坐标系转换成火星坐标系
 * @param {Array} position
 * @return {Array}  lonlat
 */
HDMap.prototype.translate_4326_to_gcj02 = function (position) {
  if (position[0] > 180 || position[0] < -180 || position[1] > 90 || position[1] < -90) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90');
    return;
  }
  var lng = position[0];
  var lat = position[1];
  if (!outOfChina(lng, lat)) {
    var deltaD = delta(lng, lat);
    lng = lng - deltaD[0];
    lat = lat - deltaD[1];
  }
  var lonlat = [];
  lonlat.push(lng);
  lonlat.push(lat);
  return lonlat;
};

/**
 * 4326(经纬度)坐标转百度坐标
 * @param {Array} 百度坐标
 * @return {Array} 4326坐标
 */
HDMap.prototype.translate_4326_to_bd09 = function (position) {
  if (position[0] > 180 || position[0] < -180 || position[1] > 90 || position[1] < -90) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90');
    return;
  }
  var tmp = this.translate_4326_to_gcj02(position);
  var lonlat = this.translate_gcj02_to_bd09(tmp);
  return lonlat;
};

/**
 * 百度坐标转4326(经纬度)坐标
 * @param {Array} 百度坐标
 * @return {Array} 4326坐标
 */
HDMap.prototype.translate_bd09_to_4326 = function (position) {
  if (position[0] > 180 || position[0] < -180 || position[1] > 90 || position[1] < -90) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90');
    return;
  }
  var tmp = this.translate_bd09_to_gcj02(position);
  var lonlat = this.translate_gcj02_to_4326(tmp);
  return lonlat;
};

/**
 * 两个GPS点的距离
 * @param {Array} lonlatA
 * @param {Array} lonlatB
 * @return {Number} 长度
 */
HDMap.prototype.getDistance = function (lonlatA, lonlatB) {
  var wgs84Sphere = new ol.Sphere(6378137);
  var distance = wgs84Sphere.haversineDistance(lonlatA, lonlatB);
  distance = Math.round(distance * 100) / 100;
  return distance;
};

/**
 * HDMap.prototype.destroy
 * 注销函数
 */
HDMap.prototype.destroy = function () {
  // 清理注册事件
  for (var i = 0; i < this.eventKey.length; i++) {
    this._map.unByKey(this.eventKey[i]);
  }
  // 清理控制器
  this._map.getInteractions().clear();
  // 清理图层上的点位
  var layers = this._map.getLayers();
  for (var j = 0; j < layers.getLength(); j++) {
    if (layers.item(j).getSource().clear) {
      layers.item(j).getSource().clear();
    }
  }
  layers.clear();
  delete hdmap.mapManager[this.getMapUid()];
};

/**
 * 清理地图
 */
HDMap.prototype.clearMap = function () {
  // 清理图层（保留底图）
  for (var o in layerManager.getLayerMap()) {
    this.removeCountMarkers(o);
  }

  // 清理区域报警定时器
  for (var key in this.areaTimer) {
    clearInterval(this.areaTimer[key]);
  }

  // 清理电子围栏报警定时器
  for (var linekey in this.lineTimer) {
    clearInterval(this.lineTimer[linekey]);
  }

  // 清理图层
  // this._map.getLayers().clear()
  // 清理控制器
  // this._map.getControls().clear()
  // 清理交互状态
  // this._map.getInteractions().clear()
  // 清理弹窗
  // this._map.getOverlays().clear()
  // 清楚map容器
  // this._map.setTarget(null)
};

/**
 * 监听地图层级变化
 * @return {Number} 地图层级zoom
 */
HDMap.prototype.changeZoom = function () {
  this._map.getView().on('change:resolution', function (e) {
    var zoom = this.getZoom();
    return zoom;
  });
};

/**
 * 创建节点
 * @param {String} element 元素名
 * @param {String} nodeName 节点名称
 * @param {String} attr 属性名
 * @param {String} value 属性值
 * @param {String} className 类名
 */
HDMap.prototype.createNode = function (element, nodeName, attr, value, className) {
  element = document.createElement(nodeName);
  element.setAttribute(attr, value);
  if (className) {
    element.classList.add(className);
  }
  return element;
};

/**
 * 切换类名
 * @param {String} element
 * @param {String} oldName
 * @param {String} newName
 */
HDMap.prototype.toggleClassName = function (element, oldName, newName) {
  if (element.classList) {
    element.classList.remove(oldName);
    element.classList.add(newName);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + oldName.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    element.className += ' ' + newName;
  }
};

/**
 * 获取当前弹窗显示个数
 * @return {Number}
 */
HDMap.prototype.popupShowNum = function () {
  var popnum = 0;
  for (var o in this._overlays) {
    if (this._overlays[o].show) {
      popnum++;
    }
  }
  return popnum;
};

/**
 * 关闭指定弹窗
 * @param {String} popName 弹窗节点名
 */
HDMap.prototype.closeSinglePopup = function (popName) {
  this._overlays[popName].show = false;
  this._overlays[popName].setPosition(undefined);
  popupCtrl.curPopNum = this.popupShowNum();
  popupCtrl.reset();
};

/**
 * 关闭某类弹窗
 * @param {String} type 类型
 */
HDMap.prototype.closeTypePopup = function (type) {
  for (var i in this._overlays) {
    if (this._overlays[i].type === type) {
      this._overlays[i].show = false;
      this._overlays[i].setPosition(undefined);
    }
  }
  popupCtrl.curPopNum = this.popupShowNum();
  popupCtrl.reset();
};

/**
 * 经纬度(4326)坐标换算光栅图坐标
 * @param {Array} 经纬度坐标
 * @return {Array} 光栅坐标
 */
HDMap.prototype.transfromWGSToBitMap = function (lonlat) {
  if (lonlat[0] > 180 || lonlat[0] < -180 || lonlat[1] > 90 || lonlat[1] < -90) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90');
    return null;
  }
  if (this.mapConfig.scaleType === 1 || this.mapConfig.scaleType === '1') {
    var mlonlat = this.translate_4326_to_3857(lonlat);
    var mcenter = this.translate_4326_to_3857(this.mapConfig.centerGPS);
    if (!mcenter) {
      console.warn(warnLogTag + 'centerGPS of this map error');
      return;
    }
    var pntX = (mlonlat[0] - mcenter[0]) / this.mapConfig.scale;
    var pntY = (mlonlat[1] - mcenter[1]) / this.mapConfig.scale;
    var r = Math.sqrt(Math.pow(pntX, 2) + Math.pow(pntY, 2));
    var angle = Math.atan2(pntY, pntX) - this.mapConfig.arcAngle;
    var pos = [];
    pos[0] = r * Math.cos(angle);
    pos[1] = r * Math.sin(angle);
    return pos;
  } else {
    console.warn(warnLogTag + 'ScaleType must equal 1');
    return null;
  }
};

/**
 * 光栅图坐标转换经纬度(4326)坐标
 * @param {Array} 光栅图坐标
 * @return {Array} 经纬度
 */
HDMap.prototype.transBitmapToWGS = function (coordinate) {
  if (this.mapConfig.scaleType !== '1' && this.mapConfig.scaleType !== 1) {
    console.warn(warnLogTag + 'this map cannot translate XYZ to GPS');
    return;
  }

  // 坐标转换成3857坐标
  function toLonArr(point, center, scale, arcAngle) {
    var angle = Math.atan2(point[1], point[0]) + arcAngle;
    var r = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
    var arr = [];
    arr[0] = center[0] + r * Math.cos(angle) * scale;
    arr[1] = center[1] + r * Math.sin(angle) * scale;
    return arr;
  }

  var mcenter = this.translate_4326_to_3857(this.mapConfig.centerGPS);
  if (!mcenter) {
    console.warn(warnLogTag + 'centerGPS of this map error');
    return;
  }
  var lonArr = toLonArr(coordinate, mcenter, this.mapConfig.scale, this.mapConfig.arcAngle);
  var lonlat = this.translate_3857_to_4326(lonArr);
  return lonlat;
};

/**
 * 获取两点位之间的距离
 * @param {Array} pointA 点位光栅坐标
 * @param {Array} pointB 点位光栅坐标
 */
HDMap.prototype.getDistanceByMarker = function (pointA, pointB) {
  var distance;
  if (this.mapConfig.scaleType === 1 || this.mapConfig.scaleType === '1') {
    var lonA = this.transBitmapToWGS(pointA);
    var lonB = this.transBitmapToWGS(pointB);
    distance = this.getDistance(lonA, lonB);
    return distance;
  } else if (this.mapConfig.scaleType === 2) {
    var sizeDistance = Math.sqrt(Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2));
    distance = sizeDistance / this.mapConfig.scale;
    return distance;
  } else {
    console.warn(warnLogTag + 'ScaleType is error');
    return null;
  }
};

/**
 * 添加报警弹窗
 * @param {Object} warnInfo 报警信息
 */
HDMap.prototype.addWarnPopup = function (warnInfo, fn) {
  if (!document.getElementById(warnInfo.id)) {
    var color = warnInfo && warnInfo.color ? warnInfo.color : warnInfo.type === 'danger' ? '255,165,0' : '255,0,0';
    // 创建弹窗
    var wrapperDomObject = this.createNode('wrapperDomObject', 'div', 'id', warnInfo.id, 'hdmap-warn-pop');
    wrapperDomObject.innerText = warnInfo.text || '报警事件';
    wrapperDomObject.style.backgroundColor = 'rgb(' + color + ')';
    // 创建箭头div
    var arrow = this.createNode('arrow', 'div', 'id', warnInfo.domId + '-arrow', 'hdmap-warn-pop-arrow');
    arrow.style.borderRightColor = 'rgb(' + color + ')';
    wrapperDomObject.appendChild(arrow);
    document.body.appendChild(wrapperDomObject);
    // 添加点击事件
    if (fn && typeof fn === 'function') {
      wrapperDomObject.onclick = fn;
    }
    // 创建气泡
    var newObjectpopup = new ol.Overlay({});
    newObjectpopup.setElement(wrapperDomObject);
    this._warnOverlays[warnInfo.id] = newObjectpopup;
    this.getMap().addOverlay(newObjectpopup);
    // 显示气泡
    this._warnOverlays[warnInfo.id].setPosition(warnInfo.position);
  } else {
    console.warn(warnLogTag + 'node is already save');
  }
};

/**
 * 点位报警
 * @param {Object} warnInfo 点位信息
 * {
 *  position: [0,0], 必填
 *  id: '111', 必填
 *  type: 'warn' || 'danger', 默认warn
 *  text: '落水预警', 默认'报警事件'
 *  color: '100,100,100' 自定义动画颜色，当传入color，type不起作用
 * }
 */
HDMap.prototype.warnMarkerStart = function (warnInfo, fn) {
  var color = warnInfo && warnInfo.color ? warnInfo.color : warnInfo.type === 'danger' ? '255,165,0' : '255,0,0';
  var layerKey = layerManager.getLayerKeyByType('warnMarker');
  var layer = this.getLayerByKey(layerKey);
  if (layer === undefined || layer === null) {
    // 图层不存在，则进行图层创建的操作
    layer = this.addLayerByLayerKey(layerKey);
  }
  layer.setZIndex(999);
  // 创建点位
  var feature2 = createFeature(warnInfo, layerKey, 'out');
  var feature1 = createFeature(warnInfo, layerKey, 'in');
  var feature = createFeature(warnInfo, layerKey);

  // 添加样式
  feature.setStyle(warnStyle(10, 'rgba(' + color + ',1)'));

  // 添加点位，只执行一次
  if (!layer.getSource().getFeatureById(warnInfo.id)) {
    layer.getSource().addFeature(feature);
    layer.getSource().addFeature(feature1);
    layer.getSource().addFeature(feature2);
  }

  // 监听动画，改变样式
  var radius = 0;
  this._map.on('postcompose', function () {
    radius += 0.4;
    if (radius < 10) {
      feature2.setStyle(warnStyle(0, 'rgba(' + color + ',0.3)'));
      feature1.setStyle(warnStyle(0, 'rgba(' + color + ',0.5)'));
    } else if (radius < 20 && radius >= 10) {
      feature1.setStyle(warnStyle(15, 'rgba(' + color + ',0.5)'));
    } else if (radius < 30 && radius >= 20) {
      feature2.setStyle(warnStyle(20, 'rgba(' + color + ',0.3)'));
    } else if (radius >= 30) {
      radius = 0;
      feature2.setStyle(warnStyle(0, 'rgba(' + color + ',0.3)'));
      feature1.setStyle(warnStyle(0, 'rgba(' + color + ',0.5)'));
    }
  });

  // 添加气泡
  if (fn && typeof fn === 'function') {
    this.addWarnPopup(warnInfo, fn);
  } else {
    this.addWarnPopup(warnInfo);
  }
  return feature;
};

/**
 * 取消点位报警
 * @param {Object} warnInfo 点位信息
 */
HDMap.prototype.warnMarkerCancel = function (warnInfo) {
  // 移除点位
  this.removeMarkerBylayerKey(warnInfo.id + 'in', 'warnMarkerLayer');
  this.removeMarkerBylayerKey(warnInfo.id + 'out', 'warnMarkerLayer');
  this.removeMarkerBylayerKey(warnInfo.id, 'warnMarkerLayer');
  // 移除气泡
  this.getMap().removeOverlay(this._warnOverlays[warnInfo.id]);
};

/**
 * 更新点位报警
 * @param {Object} warnInfo 点位信息
 */
HDMap.prototype.updateWarnMarker = function (warnInfo) {
  if (!warnInfo.id) {
    console.warn(warnLogTag + 'markerId can not be empty');
  } else {
    var marker = this.getMarkerBylayerKey(warnInfo.id, 'warnMarkerLayer');
    var markerIn = this.getMarkerBylayerKey(warnInfo.id + 'in', 'warnMarkerLayer');
    var markerOut = this.getMarkerBylayerKey(warnInfo.id + 'out', 'warnMarkerLayer');
    if (marker) {
      var properties = marker.getExtProperties();
      this.copyAttr(properties, warnInfo);
      if (warnInfo.position) {
        // 更新点位与弹窗
        marker.getGeometry().setCoordinates(warnInfo.position);
        markerIn.getGeometry().setCoordinates(warnInfo.position);
        markerOut.getGeometry().setCoordinates(warnInfo.position);
        this._warnOverlays[warnInfo.id].setPosition(warnInfo.position);
      }
    } else {
      console.warn(warnLogTag + 'This point does not exist');
    }
  }
};

/**
 * 创建点位
 * @param {Object} warnInfo 点位信息
 * @param {String} layerKey 图层名
 * @param {String} suffix 后缀
 */
function createFeature(warnInfo, layerKey, suffix) {
  var feature = new ol.DevFeature({
    geometry: new ol.geom.Point(warnInfo.position),
    name: warnInfo.markerName,
    population: 4000,
    rainfall: 500
  }, warnInfo, layerKey);
  if (suffix) {
    feature.setId(warnInfo.id + suffix);
  } else {
    feature.setId(warnInfo.id);
  }
  return feature;
}

/**
 * 报警点样式
 * @param {Number} radius 半径
 * @param {String} color 颜色
 */
function warnStyle(radius, color) {
  var style = new ol.style.Style({
    image: new ol.style.Circle({
      radius: radius,
      fill: new ol.style.Fill({
        color: color
      })
    })
  });
  return style;
}

/**
 * 添加报警弹窗
 * @param {Object} warnInfo 报警信息
 * {
 *  position: [0,0], 必填
 *  id: '111', 必填
 *  type: '', 默认danger
 *  text: '落水预警', 默认'预警事件'
 * }
 */
HDMap.prototype.addWarningPopup = function (warnInfo) {
  if (!document.getElementById(warnInfo.id)) {
    var type = warnInfo.type ? warnInfo.type : 'danger';
    var text = warnInfo.text ? warnInfo.text : '预警事件';
    var html;
    var wrapperDomObject = this.createNode('wrapperDomObject', 'div', 'id', warnInfo.id, 'hdmap-warning-popup-wrap');
    if (type === 'warn') {
      html = '<div class="hdmap-popup-warn"></div><div class="hdmap-warn-pop">' + text + '<div class="hdmap-warn-pop-arrow"></div></div>';
    } else {
      html = '<div class="hdmap-popup-danger"></div><div class="hdmap-danger-pop">' + text + '<div class="hdmap-danger-pop-arrow"></div></div>';
    }
    wrapperDomObject.innerHTML = html;
    document.body.appendChild(wrapperDomObject);
    // 添加点击事件
    var that = this;
    wrapperDomObject.onclick = function (e) {
      that.eventCallback['singleclick'].default.call(this, {
        feature: warnInfo,
        eventType: 'singleclick',
        coordinate: warnInfo.position,
        layerKey: null,
        mapEvent: {
          originalEvent: e
        }
      });
    };
    // 创建气泡
    var newObjectpopup = new ol.Overlay({});
    newObjectpopup.setElement(wrapperDomObject);
    this._warnOverlays[warnInfo.id] = newObjectpopup;
    this.getMap().addOverlay(newObjectpopup);
    // 显示气泡
    this._warnOverlays[warnInfo.id].setPosition(warnInfo.position);
  } else {
    console.warn('node is already save');
  }
};

/**
 * 移除报警弹窗
 * @param {String} id 点位id
 */
HDMap.prototype.removeWarningPopup = function (id) {
  // 移除气泡
  this.getMap().removeOverlay(this._warnOverlays[id]);
};

/**
 * 清除全部报警弹窗
 */
HDMap.prototype.clearWarningPopup = function () {
  // 移除气泡
  for (var i in this._warnOverlays) {
    this.getMap().removeOverlay(this._warnOverlays[i]);
  }
};

/**
 * 判断点位是否在可视区域内
 * @param {Array} coordinate 需要判断的点位坐标（可以为GPS）
 * @param {Number} isGPS 传递的coordinate是否为GPS坐标
 * @returns {Boolean} 点位是否在可视区域内
 */
HDMap.prototype.isInTileMapViewArea = function (coordinate, isGPS) {
  if (this.mapConfig.gisEngine !== 'tile') {
    return true;
  }
  if (isGPS) {
    coordinate = this.transfromWGSToBitMap(coordinate);
    if (!coordinate) {
      console.warn(warnLogTag + ' can not translate GPS to position');
      return false;
    }
  }
  var range = this.mapConfig.viewRange;
  if (coordinate[0] >= range.minX && coordinate[0] <= range.maxX && coordinate[1] >= range.minY && coordinate[1] <= range.maxY) {
    return true;
  } else {
    return false;
  }
};

/**
 * filename: utils.js
 * author: sunshengzhen
 * introduction: 提供一些计算能力方法
 */

/**
 * 判断GPS坐标是否不在国内
 * @param {Number} 经度
 * @param {Number} 纬度
 * @return {Boolean}
 */
/**
 * 通过两点的GPS坐标获取两点间的距离
 * @param {HDMap} 地图对象
 * @param {Array} lonlatA
 * @param {Array} lonlatB
 * @return {Number} 距离 单位m
 */
function getDistanceByGPS(map, lonlatA, lonlatB) {
  if (lonlatA[0] > 180 || lonlatA[0] < -180 || lonlatA[1] > 90 || lonlatA[1] < -90 || lonlatB[0] > 180 || lonlatB[0] < -180 || lonlatB[1] > 90 || lonlatB[1] < -90) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90');
    return;
  }
  var distance = map.getDistance(lonlatA, lonlatB);
  return distance;
}

/**
 * 获取地图某个区域（多边形）重心
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} areaCenter  重心坐标
 */
function getAreaCenter(points) {
  // 初始化多边形面积
  var aolygonArea = 0;
  var areaCenter = [];
  // 初始化多边形重心的 Gx Gy
  var Gx = 0;
  var Gy = 0;
  for (var i = 1; i <= points.length; i++) {
    // 获取x 坐标
    var iLat = points[i % points.length][0];
    // 获取y 坐标
    var iLng = points[i % points.length][1];
    // console.log(iLat, iLng)
    var nextLat = points[i - 1][0];
    var nextLng = points[i - 1][1];
    // 一个三角形的面积
    var temp = (iLat * nextLng - iLng * nextLat) / 2;
    aolygonArea += temp;
    Gx += temp * (iLat + nextLat) / 3;
    Gy += temp * (iLng + nextLng) / 3;
  }
  Gx = Gx / aolygonArea;
  Gy = Gy / aolygonArea;
  areaCenter[0] = Gx;
  areaCenter[1] = Gy;
  return areaCenter;
}
/**
 * 获取三角形重心
 * @param {Array} points 三角形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]]  二维数组
 * @return {Array} 三角形重心trianglePoint:[x,y]
 */
function getTrianglePoint(points) {
  var trianglePoint = [0, 0];
  for (var i = 0; i < points.length; i++) {
    trianglePoint[0] += points[i][0];
    trianglePoint[1] += points[i][1];
  }
  trianglePoint[0] = trianglePoint[0] / 3;
  trianglePoint[1] = trianglePoint[1] / 3;
  return trianglePoint;
}
/**
 * 获取重心点到多边形最近某个点的最短x轴,y轴的距离
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} minDistance  重心点到多边形最近点的X，Y 轴绝对值距离
 */
function getMinDistance(points) {
  var minDistance = [];
  var disistanceX = []; // 重心点到各个点的x轴距离集合
  var disistanceY = []; // 重心点到各个点的y轴距离集合
  for (var i = 0; i < points.length; i++) {
    var iLatx = Math.abs(points[i][0]);
    var iLaty = Math.abs(points[i][1]);
    disistanceX.push(iLatx);
    disistanceY.push(iLaty);
  }
  // 多边形最小点的x,y 轴绝对值
  var minPointX = Math.min.apply(null, disistanceX);
  var minPointY = Math.min.apply(null, disistanceY);
  // 重心坐标X ,y轴的绝对值
  var areaCenterX = Math.abs(getAreaCenter(points)[0]);
  var areaCenterY = Math.abs(getAreaCenter(points)[1]);
  minDistance[0] = Math.abs(minPointX - areaCenterX) / 2;
  minDistance[1] = Math.abs(minPointY - areaCenterY) / 2;
  return minDistance;
}
/**
 * 根据三角形重心是否在区域范围内求点位坐标
 * @param {Array} points 区域多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @param {Array} triangle 形成三角形的第三个点 一维数组
 * @param {Array} interceptingCoordinate 形成三角形的前两个点  二维数组
 * @return {Array} trianglePoint  点位坐标 一维数组 [x,y]
 */
function recursionPoint(points, triangle, interceptingCoordinate) {
  interceptingCoordinate.push(triangle);
  // 获取三角形重心
  var trianglePoint = getTrianglePoint(interceptingCoordinate);
  var judge = judgePointInsidePolygon(trianglePoint, points);
  if (judge === 'in' || judge === 'on') {
    return trianglePoint;
  }
  interceptingCoordinate.pop();
  return recursionPoint(points, trianglePoint, interceptingCoordinate);
}
/**
 * 获取摄像头坐标
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} cameraCountPoint  摄像头坐标
 */
function getCameraCountPoint(points) {
  var cameraCountPoint = [];
  // 计算摄像头坐标
  var cameraCountPointX = getAreaCenter(points)[0] - getMinDistance(points)[0];
  var cameraCountPointY = getAreaCenter(points)[1];
  cameraCountPoint[0] = cameraCountPointX;
  cameraCountPoint[1] = cameraCountPointY;
  var isTrue = judgePointInsidePolygon(cameraCountPoint, points);
  if (isTrue === 'on' || isTrue === 'in') {
    return cameraCountPoint;
  } else {
    // 截取顶点坐标数组前两个
    var interceptingCoordinate = points.slice(0, 2);
    cameraCountPoint = recursionPoint(points, points[2], interceptingCoordinate);
    return cameraCountPoint;
  }
}
/**
 * 获取广播坐标
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} broadcastCountPoint  广播坐标
 */
function getBroadcastCountPoint(points) {
  var broadcastCountPoint = [];
  // 计算广播坐标
  var broadcastCountPointX = getAreaCenter(points)[0] + getMinDistance(points)[0];
  var broadcastCountPointY = getAreaCenter(points)[1];
  broadcastCountPoint[0] = broadcastCountPointX;
  broadcastCountPoint[1] = broadcastCountPointY;
  // return broadcastCountPoint
  var isTrue = judgePointInsidePolygon(broadcastCountPoint, points);
  if (isTrue === 'on' || isTrue === 'in') {
    return broadcastCountPoint;
  } else {
    // 截取顶点坐标数组第二，第三个
    var interceptingCoordinate1 = points.slice(1, 3);
    broadcastCountPoint = recursionPoint(points, points[3], interceptingCoordinate1);
    return broadcastCountPoint;
  }
}
/**
 * 获取报警坐标
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} waringConutPoint  报警坐标
 */
function getWarningConutPoint(points) {
  var waringConutPoint = [];
  // 计算报警坐标 X Y轴坐标
  var waringConutPointX = getAreaCenter(points)[0];
  var waringConutPointY = getAreaCenter(points)[1] - getMinDistance(points)[1];
  waringConutPoint[0] = waringConutPointX;
  waringConutPoint[1] = waringConutPointY;
  // return waringConutPoint
  var isTrue = judgePointInsidePolygon(waringConutPoint, points);
  if (isTrue === 'on' || isTrue === 'in') {
    return waringConutPoint;
  } else {
    var interceptingCoordinate2 = [];
    if (points.length === 4) {
      interceptingCoordinate2[0] = points[2];
      interceptingCoordinate2[1] = points[3];
      waringConutPoint = recursionPoint(points, points[0], interceptingCoordinate2);
    } else {
      interceptingCoordinate2 = points.slice(2, 4);
      waringConutPoint = recursionPoint(points, points[3], interceptingCoordinate2);
    }
    return waringConutPoint;
  }
}
/**
 * 射线法判断点是否在多边形内部
 * @param {Array} point 待判断的点，格式：[X坐标, Y坐标]
 * @param {Array} poly 多边形顶点，二维数组 poly:[[X1, Y1],[X2, Y2],[X3, Y3].......]
 * @return {String} 点 point 和多边形 poly 的几何关系
 */
function judgePointInsidePolygon(point, poly) {
  function rayMethod(point, poly) {
    for (var f = false, i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
      // 点与多边形顶点重合
      if (poly[i][0] === point[0] && poly[i][1] === point[1] || poly[j][0] === point[0] && poly[j][1] === point[1]) {
        return 'on';
      }
      // 判断线段两端点是否在射线两侧
      if (poly[i][1] < point[1] && poly[j][1] >= point[1] || poly[i][1] >= point[1] && poly[j][1] < point[1]) {
        // 线段上与射线 Y 坐标相同的点的 X 坐标
        var x = poly[i][0] + (point[1] - poly[i][1]) * (poly[j][0] - poly[i][0]) / (poly[j][1] - poly[i][1]);
        // 点在多边形的边上
        if (x === point[0]) {
          return 'on';
        }
        // 射线穿过多边形的边界
        if (x > point[0]) {
          f = !f;
        }
      }
    }
    // 射线穿过多边形边界的次数为奇数时点在多边形内
    return f ? 'in' : 'out';
  }
  if (point instanceof Array && point.length === 2) {
    var result = rayMethod(point, poly);
    return result;
  } else {
    console.warn('点位越界传参有误： position must be a array && position.length === 2');
    return null;
  }
}

/**
 * 获取点位聚合信息
 * @param {Object} map 初始化地图对象
 * @param {Array} coordinate 鼠标点击点坐标，格式：[X坐标, Y坐标]
 * @return {Array} markersInfo 点位信息数组[{},{}]
 */
function getFeaturesInExtent(map, coordinate) {
  var resolution;
  var distance;
  if (map.mapConfig.gisEngine === 'tile') {
    // 设置半径根据地图分辨率等级变大而相应的变大
    resolution = map.getMap().getView().getResolution();
    if (resolution === 1) {
      distance = 32;
    } else {
      distance = 64 * Math.log2(resolution);
    }
  } else {
    var zoom = map.getZoom();
    distance = 24 / Math.pow(2, zoom - 3);
  }
  // 设置区域范围
  var extent$$1 = [coordinate[0] - distance, coordinate[1] - distance, coordinate[0] + distance, coordinate[1] + distance];
  var layers = map.getOutterLayers();
  // 保存全部图层信息
  var layersInfo = [];
  // 保存点位图层信息
  var markersInfo = [];
  for (var key in layers) {
    if (layers[key].getVisible()) {
      // 选定区域
      var layer = layers[key].getSource().getFeaturesInExtent(extent$$1);
      layersInfo.push(layer);
    }
  }
  // 排空
  var resdata = layersInfo.filter(function (item) {
    return item.length !== 0;
  });
  for (var i = 0; i < resdata.length; i++) {
    var element = resdata[i];
    for (var j = 0; j < element.length; j++) {
      var ele = element[j];
      // 判断是否有点位信息
      if (ele.extProperties && ele.extProperties.markerType) {
        ele.extProperties.layerkey = ele.getLayerKey();
        markersInfo.push(ele.extProperties);
      }
    }
  }
  return markersInfo;
}
/**
 * 获取规则多边形的中心
 * @param {Array} points 多边形的顶点坐标：[[x1,y1],[x2,y2].....]
 * @return {Array} geometryCenter  多边形的中心(重心)：[x,y]
 */
function getGeometryCenter(points) {
  var geometryCenter = [];
  var coordinateX = 0;
  var coordinateY = 0;
  for (var i = 0; i < points.length; i++) {
    coordinateX += points[i][0];
    coordinateY += points[i][1];
  }
  geometryCenter[0] = coordinateX / points.length;
  geometryCenter[1] = coordinateY / points.length;
  return geometryCenter;
}
/**
 * 获取巡更路线报警动画样式的报警点位置
 * @param {Object} lineInfo 多边形的顶点坐标：[[x1,y1],[x2,y2].....]
 * @return {Array} makerPosition  报警点位置函数
 */
function getWarningPosition(lineInfo) {
  var makerPosition = [];
  makerPosition[0] = (lineInfo.borderPoints[0][0] + lineInfo.borderPoints[1][0]) / 2;
  makerPosition[1] = (lineInfo.borderPoints[0][1] + lineInfo.borderPoints[1][1]) / 2;
  return makerPosition;
}
/**
 * 根据车位中心获取车位顶点坐标
 * @param {Array} parkingCenter 车位中心坐标：[x1,y1]
 * @return {Array} borderPoints 车位顶点坐标 ：[[[x1,y1],[x2,y2],[x3,y3],[x4,y4],[x1,y1]]]--首尾相连形成闭合
 */
function getParkingCoordinates(parkingCenter) {
  // 车位顶点坐标
  var borderPoints = [];
  var parkingCoordinates = [];
  // 车位中心坐上角
  var leftTop = [];
  var rightTop = [];
  var rightBottom = [];
  var leftBottom = [];
  leftTop[0] = parkingCenter[0] - 20;
  leftTop[1] = parkingCenter[1] + 40;
  parkingCoordinates.push(leftTop);
  rightTop[0] = parkingCenter[0] + 20;
  rightTop[1] = parkingCenter[1] + 40;
  parkingCoordinates.push(rightTop);
  rightBottom[0] = parkingCenter[0] + 20;
  rightBottom[1] = parkingCenter[1] - 40;
  parkingCoordinates.push(rightBottom);
  leftBottom[0] = parkingCenter[0] - 20;
  leftBottom[1] = parkingCenter[1] - 40;
  parkingCoordinates.push(leftBottom);
  parkingCoordinates.push(leftTop);
  borderPoints.push(parkingCoordinates);
  return borderPoints;
}
/**
 * 计算车位的长度
 * @param {Array} borderPoints 车位顶点坐标 ：[[[x1,y1],[x2,y2],[x3,y3],[x4,y4],[x1,y1]]]--首尾相连形成闭合
 * @return {Number} parkingLong 车位的长度
 */
function getParkingLong(borderPoints) {
  // 两点之间X距离的平方
  var parkingLongX = Math.pow(borderPoints[0][1][0] - borderPoints[0][2][0], 2);
  // 两点之间Y距离的平方
  var parkingLongY = Math.pow(borderPoints[0][1][1] - borderPoints[0][2][1], 2);
  // 车位的长度
  var parkingLong = Math.sqrt(parkingLongX + parkingLongY);
  return parkingLong;
}
/**
 * 根据车位顶点坐标和角度获取车位锁坐标
 * @param {Array} borderPoints 车位顶点坐标 ：[[[x1,y1],[x2,y2],[x3,y3],[x4,y4],[x1,y1]]]--首尾相连形成闭合
 * @param {Number} rotate 车位角度
 * @return {Array} parkingLockPoint 车位锁坐标:[x,y]
 */
function getParkingLockPoint(borderPoints, rotate) {
  // ParkingLockPoint  车锁的坐标
  var parkingLockPoint = [];
  // 车位的长
  var parkingLong = getParkingLong(borderPoints);
  var coordinatesPoint = null;
  if (borderPoints[0].length === 5) {
    borderPoints[0].pop();
    coordinatesPoint = borderPoints[0];
  } else {
    coordinatesPoint = borderPoints[0];
  }
  if (rotate === 0 || rotate === 360 || rotate === -360) {
    // 车锁的坐标
    parkingLockPoint[0] = getGeometryCenter(coordinatesPoint)[0];
    parkingLockPoint[1] = getGeometryCenter(coordinatesPoint)[1] - parkingLong / 3;
  } else if (rotate === -90 || rotate === 270) {
    // 车锁的坐标
    parkingLockPoint[0] = getGeometryCenter(coordinatesPoint)[0] + parkingLong / 3;
    parkingLockPoint[1] = getGeometryCenter(coordinatesPoint)[1];
  } else if (rotate === 90 || rotate === -270) {
    // 车锁的坐标
    parkingLockPoint[0] = getGeometryCenter(coordinatesPoint)[0] - parkingLong / 3;
    parkingLockPoint[1] = getGeometryCenter(coordinatesPoint)[1];
  } else if (rotate === 180 || rotate === -180) {
    // 车锁的坐标
    parkingLockPoint[0] = getGeometryCenter(coordinatesPoint)[0];
    parkingLockPoint[1] = getGeometryCenter(coordinatesPoint)[1] + parkingLong / 3;
  } else {
    // 第一点和第二点两点之间的中心坐标
    var firstPointCenter = [];
    firstPointCenter[0] = (coordinatesPoint[0][0] + coordinatesPoint[1][0]) / 2;
    firstPointCenter[1] = (coordinatesPoint[0][1] + coordinatesPoint[1][1]) / 2;
    // 第三点和第四点两点之间的中心坐标
    var lastPointCenter = [];
    lastPointCenter[0] = (coordinatesPoint[2][0] + coordinatesPoint[3][0]) / 2;
    lastPointCenter[1] = (coordinatesPoint[2][1] + coordinatesPoint[3][1]) / 2;
    // 车锁坐标
    parkingLockPoint[0] = firstPointCenter[0] - (firstPointCenter[0] - lastPointCenter[0]) * 5 / 6;
    parkingLockPoint[1] = firstPointCenter[1] - (firstPointCenter[1] - lastPointCenter[1]) * 5 / 6;
  }
  return parkingLockPoint;
}

/**
 * 点到折线的最短距离
 * @param {Object} 地图
 * @param {Array} 点的坐标
 * @param {Array} 折线点的集合 [[x1,y1],[x2,x2],...]
 * @return {Number} 距离
 */
function pointToPolyline(map, point, points) {
  // 计算点到折线第一条线段的距离
  if (point instanceof Array && point.length === 2) {
    var distance = pointToLine(map, point, points[0], points[1]);
    // 当折线是一条线段时，返回点到线的距离
    if (points.length === 2) {
      return distance;
    }
    if (points.length > 2) {
      // 遍历点到剩下的每个折线线段的距离,对比最短距离
      for (var i = 1; i < points.length - 1; i++) {
        var distance1 = pointToLine(map, point, points[i], points[i + 1]);
        distance = distance < distance1 ? distance : distance1;
        return distance;
      }
    }
  } else {
    console.warn('point must be a array & point.length === 2');
    return null;
  }
}

/**
 * 点到线的距离
 * @param {Object} 地图
 * @param {Array} 点的坐标
 * @param {Array} 坐标A
 * @param {Array} 坐标B
 * @return {Number} 距离
 */
function pointToLine(map, point, pointA, pointB) {
  var distance = void 0;
  var cross = (pointB[0] - pointA[0]) * (point[0] - pointA[0]) + (pointB[1] - pointA[1]) * (point[1] - pointA[1]);
  var d = Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2); // 计算折线两点距离的平方
  // 将坐标点转换为GPS坐标
  var lonlat = map.transBitmapToWGS(point);
  var lonlatA = map.transBitmapToWGS(pointA);
  var lonlatB = map.transBitmapToWGS(pointB);
  // 点的位置在线段外右侧,点到线段距离为点到A点的距离
  if (cross <= 0) {
    distance = getDistanceByGPS(map, lonlat, lonlatA);
    return distance;
  }
  // 点的位置在线段外左侧,点到线段距离为点到B点的距离
  if (cross >= d) {
    distance = getDistanceByGPS(map, lonlat, lonlatB);
    return distance;
  }
  // 点的位置在线段外中间范围内,点到线段距离为点到线段的垂线
  var r = cross / d;
  var px = pointA[0] + (pointB[0] - pointA[0]) * r;
  var py = pointA[1] + (pointB[1] - pointA[1]) * r;
  var lonlatC = map.transBitmapToWGS([px, py]);
  distance = getDistanceByGPS(map, lonlat, lonlatC);
  return distance;
}

/**
 * 区域重叠的判断函数,判断两个区域是否重叠
 * @param {Array} segment 线段坐标点: [[x1,y1], [x2,y2]]
 * @param {Array} polygon 多边形坐标点: [[[x1,y1],[x2,y2],[x3,y3],[x4,y4]...]
 * @return {Boolean} 两多边形重叠为true,否则为false
 * */
/* eslint-disable */
function judgePolygonsOverlap(polyA, polyB) {
  // 线段是否相交
  function judgeSegmentsIntersectant(segA, segB) {
    var abc = (segA[0][0] - segB[0][0]) * (segA[1][1] - segB[0][1]) - (segA[0][1] - segB[0][1]) * (segA[1][0] - segB[0][0]);
    var abd = (segA[0][0] - segB[1][0]) * (segA[1][1] - segB[1][1]) - (segA[0][1] - segB[1][1]) * (segA[1][0] - segB[1][0]);
    if (abc * abd >= 0) {
      return false;
    }
    var cda = (segB[0][0] - segA[0][0]) * (segB[1][1] - segA[0][1]) - (segB[0][1] - segA[0][1]) * (segB[1][0] - segA[0][0]);
    var cdb = cda + abc - abd;
    return !(cda * cdb >= 0);
  }
  // 判断两多边形边界是否相交
  function judgePolygonsIntersectant(polyA, polyB) {
    for (var i = 0, l = polyA.length; i < l; i++) {
      for (var j = 0, k = polyB.length; j < k; j++) {
        var segA = [polyA[i], polyA[i === l - 1 ? 0 : i + 1]];
        var segB = [polyB[j], polyB[j === k - 1 ? 0 : j + 1]];
        if (judgeSegmentsIntersectant(segA, segB)) {
          return true;
        }
      }
    }
    return false;
  }
  // 判断两多边形是否存在点与区域的包含关系(多边形A的点在多边形B的区域内或多边形B的点在多边形A的区域内)
  function judgePointContainByPolygon(polyA, polyB) {
    for (var i = 0; i < polyA.length; i++) {
      if (hdmap.utils.judgePointInsidePolygon(polyA[i], polyB) !== 'out') {
        return true;
      }
    }
    for (var _i = 0; _i < polyB.length; _i++) {
      if (hdmap.utils.judgePointInsidePolygon(polyB[_i], polyA) !== 'out') {
        return true;
      }
    }
    return false;
  }
  return judgePolygonsIntersectant(polyA, polyB) || judgePointContainByPolygon(polyA, polyB);
}

/**
 * 根据三个GPS和对应的坐标信息计算比例尺
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points  { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {Number} scale
 */
function getScaleByGPS(map, lonlats, points) {
  // 判断经纬度范围
  for (var key in lonlats) {
    if (lonlats[key][0] > 180 || lonlats[key][0] < -180 || lonlats[key][1] > 90 || lonlats[key][1] < -90) {
      console.warn('Error: Longitude range: -180 to 180, latitude range: -90 to 90');
      return null;
    }
  }
  // 计算两个点的距离
  function toSqrt(a, b) {
    var sqrt = Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    return sqrt;
  }

  var A = points['pointA'];
  var B = points['pointB'];
  var C = points['pointC'];
  var mlonlatA = map.translate_4326_to_3857(lonlats['lonlatA']);
  var mlonlatB = map.translate_4326_to_3857(lonlats['lonlatB']);
  var mlonlatC = map.translate_4326_to_3857(lonlats['lonlatC']);

  // A、B两点确定比例尺
  var scaleAB = toSqrt(mlonlatA, mlonlatB) / toSqrt(A, B);

  // A、C两点确定比例尺
  var scaleAC = toSqrt(mlonlatA, mlonlatC) / toSqrt(A, C);

  // B、C两点确定比例尺
  var scaleBC = toSqrt(mlonlatB, mlonlatC) / toSqrt(B, C);

  var scale = (scaleAB + scaleAC + scaleBC) / 3;
  return scale;
}

/**
 * 根据三个GPS和对应的坐标信息计算中心点GPS
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points  { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {Array} 中心点GPS
 */
function getCenterGPS(map, lonlats, points) {
  // 判断经纬度范围
  for (var key in lonlats) {
    if (lonlats[key][0] > 180 || lonlats[key][0] < -180 || lonlats[key][1] > 90 || lonlats[key][1] < -90) {
      console.warn('Error: Longitude range: -180 to 180, latitude range: -90 to 90');
      return null;
    }
  }
  // 光栅点位转换4326
  function toArr(point, lonlat, scale, arcAngle) {
    var angle = Math.atan2(point[1], point[0]) + arcAngle;
    var r = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
    var arr = [];
    arr[0] = lonlat[0] - r * Math.cos(angle) * scale;
    arr[1] = lonlat[1] - r * Math.sin(angle) * scale;
    return arr;
  }

  var A = points['pointA'];
  var B = points['pointB'];
  var C = points['pointC'];
  var scale = getScaleByGPS(map, lonlats, points);
  var arcAngle = getArcAngle(map, lonlats, points);
  var mlonlatA = map.translate_4326_to_3857(lonlats['lonlatA']);
  var mlonlatB = map.translate_4326_to_3857(lonlats['lonlatB']);
  var mlonlatC = map.translate_4326_to_3857(lonlats['lonlatC']);

  // A点确定中心点
  var lonlatA = map.translate_3857_to_4326(toArr(A, mlonlatA, scale, arcAngle));

  // B点确定中心点
  var lonlatB = map.translate_3857_to_4326(toArr(B, mlonlatB, scale, arcAngle));

  // C点确定中心点
  var lonlatC = map.translate_3857_to_4326(toArr(C, mlonlatC, scale, arcAngle));

  var lon = (lonlatA[0] + lonlatB[0] + lonlatC[0]) / 3;
  var lat = (lonlatA[1] + lonlatB[1] + lonlatC[1]) / 3;
  var centerGPS = [lon, lat];
  return centerGPS;
}

/**
 * 根据三个GPS和对应的坐标信息计算旋转弧度
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points  { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {Number} 旋转弧度
 */
function getArcAngle(map, lonlats, points) {
  for (var key in lonlats) {
    if (lonlats[key][0] > 180 || lonlats[key][0] < -180 || lonlats[key][1] > 90 || lonlats[key][1] < -90) {
      console.warn('Error: Longitude range: -180 to 180, latitude range: -90 to 90');
      return null;
    }
  }

  // 计算两点的方位角弧度
  function toArc(A, B) {
    var arc = Math.atan2(B[1] - A[1], B[0] - A[0]);
    return arc;
  }

  var A = points['pointA'];
  var B = points['pointB'];
  var C = points['pointC'];
  var mlonlatA = map.translate_4326_to_3857(lonlats['lonlatA']);
  var mlonlatB = map.translate_4326_to_3857(lonlats['lonlatB']);
  var mlonlatC = map.translate_4326_to_3857(lonlats['lonlatC']);

  // 根据AB两点计算弧度
  var arcAB = toArc(mlonlatB, mlonlatA) - toArc(B, A);

  // 根据AC两点计算弧度
  var arcAC = toArc(mlonlatC, mlonlatA) - toArc(C, A);

  // 根据BC两点计算弧度
  var arcBC = toArc(mlonlatC, mlonlatB) - toArc(C, B);

  // 以arcAB为基准，校正arcAC和arcBC的值，使其处于相同的PI范围内
  if (Math.abs(arcAC - arcAB) > Math.PI) {
    arcAC = arcAC > arcAB ? arcAC - 2 * Math.PI : arcAC + 2 * Math.PI;
  }
  if (Math.abs(arcBC - arcAB) > Math.PI) {
    arcBC = arcBC > arcAB ? arcBC - 2 * Math.PI : arcBC + 2 * Math.PI;
  }
  var arcAngle = ((arcAB + arcAC + arcBC) / 3 + 2 * Math.PI) % (2 * Math.PI);
  return arcAngle;
}

/**
 * 根据三个GPS和对应的坐标信息获取比例尺、中心点GPS、旋转弧度属性集合
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {JSON} 
 */
function getMapProperty(map, lonlats, points) {
  var attributes = {};
  attributes.centerGPS = getCenterGPS(map, lonlats, points);
  attributes.scale = getScaleByGPS(map, lonlats, points);
  attributes.arcAngle = getArcAngle(map, lonlats, points);
  return attributes;
}

/**
 * 根据两点坐标及真实距离计算比例尺
 * @param {Array} pointA 
 * @param {Array} pointB 
 * @param {Number} distance 
 * @returns {Number}
 */
// function getScaleBySize (pointA, pointB, distance) {
//   let sizeDistance = Math.sqrt(Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2))
//   let scale = sizeDistance / distance
//   return scale
// }

/**
 * 根据地图的长宽和真实长宽进行比例尺计算
 * @param {*} sizeWidth
 * @param {*} sizeHeight
 * @param {*} realWidth
 * @param {*} realHeight
 * @return {Number} scale分母
 */
function getScaleBySize(sizeWidth, sizeHeight, realWidth, realHeight) {
  // 根据图片宽高和真实宽高获取比例尺
  // let width = sizeWidth * 0.0254 / 72
  var widthScale = sizeWidth / realWidth;
  var heightScale = sizeHeight / realHeight;

  // 根据两个比例尺求出平均比例尺
  var scale = (widthScale + heightScale) / 2;
  return scale;
}
/**
 * 获取地图可视区域的中心
 * @param {Object} map 地图对象
 * @return {Array} visibleAreaCenter 地图可视区域的中心坐标：[x,y]
 */
function getVisibleAreaCenter(map) {
  var extent$$1 = map.getMap().getView().calculateExtent(map.getMap().getSize());
  var visibleAreaCenter = ol.extent.getCenter(extent$$1);
  return visibleAreaCenter;
}
/**
 * 判断点位越界
 * @param {Object} map 地图对象
 * @param {Object} id 区域id
 * @param {Object} point 要判断的点的坐标:[x,y]
 * @return {Boolean} boolean ture表示在区域内，false表示在区域外
 */
function pointTransboundary(map, id, point) {
  var region = map.getMarkerBylayerKey(id, 'gisLayer');
  var boolean = region.getGeometry().intersectsCoordinate(point);
  return boolean;
}
var utils = {
  outOfChina: outOfChina,
  getDistanceByGPS: getDistanceByGPS,
  getScaleByGPS: getScaleByGPS,
  getCenterGPS: getCenterGPS,
  getScaleBySize: getScaleBySize,
  getAreaCenter: getAreaCenter,
  getTrianglePoint: getTrianglePoint,
  getMinDistance: getMinDistance,
  getCameraCountPoint: getCameraCountPoint,
  getBroadcastCountPoint: getBroadcastCountPoint,
  getWarningConutPoint: getWarningConutPoint,
  judgePointInsidePolygon: judgePointInsidePolygon,
  getFeaturesInExtent: getFeaturesInExtent,
  getGeometryCenter: getGeometryCenter,
  getWarningPosition: getWarningPosition,
  getParkingCoordinates: getParkingCoordinates,
  getParkingLockPoint: getParkingLockPoint,
  pointToPolyline: pointToPolyline,
  judgePolygonsOverlap: judgePolygonsOverlap,
  getArcAngle: getArcAngle,
  getMapProperty: getMapProperty,
  getVisibleAreaCenter: getVisibleAreaCenter,
  pointTransboundary: pointTransboundary
};

/**
 * filename: hdlayer-extend.js
 * author: yangyida
 * discription: extend the openlayer class
 */

goog.provide('ol.layer.HDVector');
goog.provide('ol.DevFeature');
goog.provide('ol.AreaFeature');
goog.provide('ol.LineFeature');
goog.provide('ol.CountFeature');

goog.require('ol');
goog.require('ol.layer.Vector');
goog.require('ol.Feature');
/**
 * ol.layer.HDVector
 * 此类是对ol.layer.Vector的一个扩展，扩展了layerKey字段，
 * 扩展此字段的意义是能够在查找layer中的feature时，能够根据
 * 想要的feature种类中查找，而无需遍历所有layer进行查找。
 * @param {String} layerKey 图层名称
 * @param {olx.layer.VectorOptions} optOptions 图层选项
 */
ol.layer.HDVector = function (layerKey, optOptions) {
  var options = optOptions || {};

  var baseOptions = ol.obj.assign({}, options);
  // goog.base(this, /** @type {olx.layer.LayerOptions} */ (baseOptions));
  ol.layer.Vector.call(this,
  /** @type {olx.layer.LayerOptions} */baseOptions);
  this.layerKey = layerKey;
  this.visibleFlag = true;
};
ol.inherits(ol.layer.HDVector, ol.layer.Vector);

ol.layer.HDVector.prototype.getLayerKey = function () {
  return this.layerKey;
};
/**
 * 此参数指示该层是否被人为控制显示状态：true可显示，false不可显示
 */
ol.layer.HDVector.prototype.getVisibleFlag = function () {
  return this.visibleFlag;
};
/**
 * 此参数指示该层是否被人为控制显示状态：true可显示，false不可显示
 * params {Boolean}
 */
ol.layer.HDVector.prototype.setVisibleFlag = function (flag) {
  this.visibleFlag = flag;
};
/**
 * 此类是对ol.Feature的一个扩展，在ol3中已经没有了marker这个概念，
 * 想在地图上添加设备点位，需要一个feature，为了迎合业务，所以对其
 * 进行字段的扩展，用于存储设备信息，方便后续点位的操作
 *
 * layerKey是为了在后续业务中能够直接判断出此点位类型，方便业务操作
 * @param {Object} optOptions 点位属性信息
 * @param {Object} extProperties markerInfo 点位信息 用于存储该点位信息，在事件处理时返回给用户
 * @param {String} layerKey 点位所在图层名称
 */
ol.DevFeature = function (optOptions, extProperties, layerKey) {
  var options = optOptions || {};

  var baseOptions = ol.obj.assign({}, options);
  // goog.base(this, (baseOptions));
  ol.Feature.call(this, /** @type {olx.layer.LayerOptions} */baseOptions);
  this.extProperties = extProperties;
  this.layerKey = layerKey;
};
ol.inherits(ol.DevFeature, ol.Feature);

ol.DevFeature.prototype.getExtProperties = function () {
  return this.extProperties;
};

ol.DevFeature.prototype.setExtProperties = function (extProperties) {
  this.extProperties = extProperties;
};

ol.DevFeature.prototype.getLayerKey = function () {
  return this.layerKey;
};

ol.DevFeature.prototype.setLayerKey = function (layerKey) {
  this.layerKey = layerKey;
};

/**
 * 此类是对ol.Feature的一个扩展，在ol3中使用的是feature这个概念，
 * 想在地图上添加区域，也是增加一个feature，为了迎合业务，所以对其
 * 进行字段的扩展，用于存储该区域的相关信息，方便后续对区域的操作
 *
 * layerKey是为了在后续业务中能够直接判断出此区域的类型，方便业务操作
 * @param {Object} optOptions 区域属性信息
 * @param {Object} extProperties areaInfo 区域信息 用于存储该区域信息，在事件处理时返回给用户
 * @param {String} layerKey 区域所在图层名称， 默认为gisLayer
 */
ol.AreaFeature = function (optOptions, extProperties, layerKey) {
  var options = optOptions || {};

  var baseOptions = ol.obj.assign({}, options);
  // goog.base(this, (baseOptions));
  ol.Feature.call(this, /** @type {olx.layer.LayerOptions} */baseOptions);
  this.extProperties = extProperties;
  this.layerKey = layerKey;
  this.rotate = extProperties.rotate ? extProperties.rotate : 0;
  this.areaTypesOf = extProperties.areaTypesOf ? extProperties.areaTypesOf : '';
  this.originId = extProperties.originId ? extProperties.originId : 0;
};
ol.inherits(ol.AreaFeature, ol.Feature);

ol.AreaFeature.prototype.getExtProperties = function () {
  return this.extProperties;
};

ol.AreaFeature.prototype.setExtProperties = function (extProperties) {
  this.extProperties = extProperties;
};

ol.AreaFeature.prototype.getLayerKey = function () {
  return this.layerKey;
};

ol.AreaFeature.prototype.setLayerKey = function (layerKey) {
  this.layerKey = layerKey;
};
ol.AreaFeature.prototype.getAreaTypesOf = function () {
  return this.areaTypesOf;
};

ol.AreaFeature.prototype.setAreaTypesOf = function (areaTypesOf) {
  this.areaTypesOf = areaTypesOf;
};
ol.AreaFeature.prototype.getRotate = function () {
  return this.rotate;
};

ol.AreaFeature.prototype.setRotate = function (rotate) {
  if (rotate > 360) {
    rotate = rotate % 360;
  } else if (rotate < -360) {
    rotate = rotate % -360;
  }
  this.rotate = rotate;
  this.extProperties.rotate = rotate;
};
ol.AreaFeature.prototype.getOriginId = function () {
  return this.originId;
};

ol.AreaFeature.prototype.setOriginId = function (originId) {
  this.originId = originId;
};
/**
 * 此类是对ol.Feature的一个扩展，路线一个feature，存储的是路线的相关信息，方便后续对区域的操作
 *
 * @param {Object} optOptions 路线属性信息
 * @param {Object} extProperties lineInfo 点位信息 用于存储路线的相关信息，在事件处理时返回给用户
 * @param {String} layerKey 路线所在图层名称
 */
ol.LineFeature = function (optOptions, extProperties, layerKey) {
  var options = optOptions || {};

  var baseOptions = ol.obj.assign({}, options);
  // goog.base(this, (baseOptions));
  ol.Feature.call(this, /** @type {olx.layer.LayerOptions} */baseOptions);
  this.extProperties = extProperties;
  this.layerKey = layerKey;
};
ol.inherits(ol.LineFeature, ol.Feature);

ol.LineFeature.prototype.getExtProperties = function () {
  return this.extProperties;
};

ol.LineFeature.prototype.setExtProperties = function (extProperties) {
  this.extProperties = extProperties;
};

ol.LineFeature.prototype.getLayerKey = function () {
  return this.layerKey;
};

ol.LineFeature.prototype.setLayerKey = function (layerKey) {
  this.layerKey = layerKey;
};

/**
 * 此类是对ol.Feature的一个扩展，在ol3中使用的是feature这个概念，
 * 想在地图上添加区域，也是增加一个feature，为了迎合业务，所以对其
 * 进行字段的扩展，用于存储该区域的相关信息，方便后续对区域的操作
 *
 * layerKey是为了在后续业务中能够直接判断出此区域的类型，方便业务操作
 * @param {Object} optOptions 统计区域属性信息
 * @param {Object} extProperties areaInfo 统计区域信息 用于存储该区域信息，在事件处理时返回给用户
 * @param {String} layerKey 统计区域所在图层名称， 默认为gisLayer
 */
ol.CountFeature = function (optOptions, extProperties, layerKey) {
  var options = optOptions || {};

  var baseOptions = ol.obj.assign({}, options);
  // goog.base(this, (baseOptions));
  ol.Feature.call(this, /** @type {olx.layer.LayerOptions} */baseOptions);
  this.extProperties = extProperties;
  this.layerKey = layerKey;
};
ol.inherits(ol.CountFeature, ol.Feature);

ol.CountFeature.prototype.getExtProperties = function () {
  return this.extProperties;
};

ol.CountFeature.prototype.setExtProperties = function (extProperties) {
  this.extProperties = extProperties;
};

ol.CountFeature.prototype.getLayerKey = function () {
  return this.layerKey;
};

ol.CountFeature.prototype.setLayerKey = function (layerKey) {
  this.layerKey = layerKey;
};

/** Interaction rotate
 * @constructor
 * @extends {ol.interaction.Pointer}
 * @fires select | rotatestart | rotating | rotateend | translatestart | translating | translateend | scalestart | scaling | scaleend
 * @param {olx.interaction.TransformOptions}
 *  - layers {Array<ol.Layer>} array of layers to transform,
 *  - features {ol.Collection<ol.Feature>} collection of feature to transform,
 *- translateFeature {bool} Translate when click on feature
 *- translate {bool} Can translate the feature
 *- stretch {bool} can stretch the feature
 *- scale {bool} can scale the feature
 *- rotate {bool} can rotate the feature
 *- keepAspectRatio { ol.events.ConditionType | undefined } A function that takes an ol.MapBrowserEvent and returns a boolean to keep aspect ratio, default ol.events.condition.shiftKeyOnly.
 *- style {} list of ol.style for handles
 *
 */
ol.interaction.Transform = function (options) {
  if (!options) options = {};
  var self = this;

  // Create a new overlay layer for the sketch
  this.handles_ = new ol.Collection();
  this.overlayLayer_ = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: this.handles_,
      useSpatialIndex: false
    }),
    name: 'Transform overlay',
    displayInLayerSwitcher: false,
    // Return the style according to the handle type
    style: function style(feature) {
      return self.style[(feature.get('handle') || 'default') + (feature.get('constraint') || '') + (feature.get('option') || '')];
    }
  });

  // Extend pointer
  ol.interaction.Pointer.call(this, {
    handleDownEvent: this.handleDownEvent_,
    handleDragEvent: this.handleDragEvent_,
    handleMoveEvent: this.handleMoveEvent_,
    handleUpEvent: this.handleUpEvent_
  });

  /** Collection of feature to transform */
  this.features_ = options.features;
  /** List of layers to transform */
  this.layers_ = options.layers ? options.layers instanceof Array ? options.layers : [options.layers] : null;

  /** Translate when click on feature */
  this.set('translateFeature', options.translateFeature !== false);
  /** Can translate the feature */
  this.set('translate', options.translate !== false);
  /** Can stretch the feature */
  this.set('stretch', options.stretch !== false);
  /** Can scale the feature */
  this.set('scale', options.scale !== false);
  /** Can rotate the feature */
  this.set('rotate', options.rotate !== false);
  /** Keep aspect ratio */
  this.set('keepAspectRatio', options.keepAspectRatio || function (e) {
    return e.originalEvent.shiftKey;
  });

  // Force redraw when changed
  this.on('propertychange', function () {
    this.drawSketch_();
  });

  // setstyle
  this.setDefaultStyle();
};
ol.inherits(ol.interaction.Transform, ol.interaction.Pointer);

/** Cursors for transform
*/
ol.interaction.Transform.prototype.Cursors = {
  'default': 'auto',
  'select': 'pointer',
  'translate': 'move',
  'rotate': 'move',
  'scale': 'ne-resize',
  'scale1': 'nw-resize',
  'scale2': 'ne-resize',
  'scale3': 'nw-resize',
  'scalev': 'e-resize',
  'scaleh1': 'n-resize',
  'scalev2': 'e-resize',
  'scaleh3': 'n-resize'
};

/**
 * Remove the interaction from its current map, if any,  and attach it to a new
 * map, if any. Pass `null` to just remove the interaction from the current map.
 * @param {ol.Map} map Map.
 * @api stable
 */
ol.interaction.Transform.prototype.setMap = function (map) {
  if (!map) {
    this.feature_ = null;
  }
  if (this.getMap()) this.getMap().removeLayer(this.overlayLayer_);
  ol.interaction.Pointer.prototype.setMap.call(this, map);
  this.overlayLayer_.setMap(map);
  if (map !== null) {
    this.isTouch = /touch/.test(map.getViewport().className);
    this.setDefaultStyle();
  }
};

/**
 * Activate/deactivate interaction
 * @param {bool}
 * @api stable
 */
ol.interaction.Transform.prototype.setActive = function (b) {
  this.select(null);
  this.overlayLayer_.setVisible(b);
  ol.interaction.Pointer.prototype.setActive.call(this, b);
};

/** Set efault sketch style
*/
ol.interaction.Transform.prototype.setDefaultStyle = function () {
  // Style
  var stroke = new ol.style.Stroke({ color: [255, 0, 0, 1], width: 1 });
  var strokedash = new ol.style.Stroke({ color: [255, 0, 0, 1], width: 1, lineDash: [4, 4] });
  var fill0 = new ol.style.Fill({ color: [255, 0, 0, 0.01] });
  var fill = new ol.style.Fill({ color: [255, 255, 255, 0.8] });
  var circle = new ol.style.RegularShape({
    fill: fill,
    stroke: stroke,
    radius: this.isTouch ? 12 : 6,
    points: 15
  });
  circle.getAnchor()[0] = this.isTouch ? -10 : -5;
  var bigpt = new ol.style.RegularShape({
    fill: fill,
    stroke: stroke,
    radius: this.isTouch ? 16 : 8,
    points: 4,
    angle: Math.PI / 4
  });
  var smallpt = new ol.style.RegularShape({
    fill: fill,
    stroke: stroke,
    radius: this.isTouch ? 12 : 6,
    points: 4,
    angle: Math.PI / 4
  });
  function createStyle(img, stroke, fill) {
    return [new ol.style.Style({ image: img, stroke: stroke, fill: fill })];
  }
  /** Style for handles */
  this.style = {
    'default': createStyle(bigpt, strokedash, fill0),
    'translate': createStyle(bigpt, stroke, fill),
    'rotate': createStyle(circle, stroke, fill),
    'rotate0': createStyle(bigpt, stroke, fill),
    'scale': createStyle(bigpt, stroke, fill),
    'scale1': createStyle(bigpt, stroke, fill),
    'scale2': createStyle(bigpt, stroke, fill),
    'scale3': createStyle(bigpt, stroke, fill),
    'scalev': createStyle(smallpt, stroke, fill),
    'scaleh1': createStyle(smallpt, stroke, fill),
    'scalev2': createStyle(smallpt, stroke, fill),
    'scaleh3': createStyle(smallpt, stroke, fill)
  };
  this.drawSketch_();
};

/**
 * Set sketch style.
 * @param {ol.Map} map Map.
 * @api stable
 */
ol.interaction.Transform.prototype.setStyle = function (style, olstyle) {
  if (!olstyle) return;
  if (olstyle instanceof Array) this.style[style] = olstyle;else this.style[style] = [olstyle];
  for (var i = 0; i < this.style[style].length; i++) {
    var im = this.style[style][i].getImage();
    if (im) {
      if (style === 'rotate') im.getAnchor()[0] = -5;
      if (this.isTouch) im.setScale(1.8);
    }
    var tx = this.style[style][i].getText();
    if (tx) {
      if (style === 'rotate') tx.setOffsetX(this.isTouch ? 14 : 7);
      if (this.isTouch) tx.setScale(1.8);
    }
  }
  this.drawSketch_();
};

/** Get Feature at pixel
 * @param {ol.Pixel}
 * @return {ol.feature}
 * @private
 */
ol.interaction.Transform.prototype.getFeatureAtPixel_ = function (pixel) {
  var self = this;
  return this.getMap().forEachFeatureAtPixel(pixel, function (feature, layer) {
    var found = false;
    // Overlay ?
    if (!layer) {
      if (feature === self.bbox_) return false;
      self.handles_.forEach(function (f) {
        if (f === feature) found = true;
      });
      if (found) return { feature: feature, handle: feature.get('handle'), constraint: feature.get('constraint'), option: feature.get('option') };
    }
    // feature belong to a layer
    if (self.layers_) {
      for (var i = 0; i < self.layers_.length; i++) {
        if (self.layers_[i] === layer) return { feature: feature };
      }
      return null;
    } else if (self.features_) {
      // feature in the collection
      self.features_.forEach(function (f) {
        if (f === feature) found = true;
      });
      if (found) return { feature: feature };else return null;
    } else return { feature: feature }; // Others
  }) || {};
};

/** Draw transform sketch
* @param {boolean} draw only the center
*/
ol.interaction.Transform.prototype.drawSketch_ = function (center) {
  this.overlayLayer_.getSource().clear();
  if (!this.feature_) return;
  if (center === true) {
    if (!this.ispt_) {
      this.overlayLayer_.getSource().addFeature(new ol.Feature({ geometry: new ol.geom.Point(this.center_), handle: 'rotate0' }));
      var ext = this.feature_.getGeometry().getExtent();
      var geom1 = ol.geom.Polygon.fromExtent(ext);
      var f1 = this.bbox_ = new ol.Feature(geom1);
      this.overlayLayer_.getSource().addFeature(f1);
    }
  } else {
    var exte = this.feature_.getGeometry().getExtent();
    if (this.ispt_) {
      var p = this.getMap().getPixelFromCoordinate([exte[0], exte[1]]);
      exte = ol.extent.boundingExtent([this.getMap().getCoordinateFromPixel([p[0] - 10, p[1] - 10]), this.getMap().getCoordinateFromPixel([p[0] + 10, p[1] + 10])]);
    }
    var geom = ol.geom.Polygon.fromExtent(exte);
    var f = this.bbox_ = new ol.Feature(geom);
    var features = [];
    var g = geom.getCoordinates()[0];
    if (!this.ispt_) {
      features.push(f);
      // Middle
      var i = 0;
      if (this.get('stretch') && this.get('scale')) {
        for (i = 0; i < g.length - 1; i++) {
          f = new ol.Feature({ geometry: new ol.geom.Point([(g[i][0] + g[i + 1][0]) / 2, (g[i][1] + g[i + 1][1]) / 2]), handle: 'scale', constraint: i % 2 ? 'h' : 'v', option: i });
          features.push(f);
        }
      }
      if (this.get('scale')) {
        // Handles
        for (i = 0; i < g.length - 1; i++) {
          f = new ol.Feature({ geometry: new ol.geom.Point(g[i]), handle: 'scale', option: i });
          features.push(f);
        }
      }
      if (this.get('translate') && !this.get('translateFeature')) {
        // Center
        f = new ol.Feature({ geometry: new ol.geom.Point([(g[0][0] + g[2][0]) / 2, (g[0][1] + g[2][1]) / 2]), handle: 'translate' });
        features.push(f);
      }
    }
    // Rotate
    if (this.get('rotate')) {
      f = new ol.Feature({ geometry: new ol.geom.Point(g[3]), handle: 'rotate' });
      features.push(f);
    }
    // Add sketch
    this.overlayLayer_.getSource().addFeatures(features);
  }
};

/** Select a feature to transform
* @param {ol.Feature} the feature to transform
*/
ol.interaction.Transform.prototype.select = function (feature) {
  this.feature_ = feature;
  this.ispt_ = this.feature_ ? this.feature_.getGeometry().getType() === 'Point' : false;
  this.drawSketch_();
  this.dispatchEvent({ type: 'select', feature: this.feature_ });
};

/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `true` to start the drag sequence.
 */
ol.interaction.Transform.prototype.handleDownEvent_ = function (evt) {
  var sel = this.getFeatureAtPixel_(evt.pixel);
  var feature = sel.feature;
  if (this.feature_ && this.feature_ === feature && (this.ispt_ && this.get('translate') || this.get('translateFeature'))) {
    sel.handle = 'translate';
  }
  if (sel.handle) {
    this.mode_ = sel.handle;
    this.opt_ = sel.option;
    this.constraint_ = sel.constraint;
    // Save info
    this.coordinate_ = evt.coordinate;
    this.pixel_ = evt.pixel;
    this.geom_ = this.feature_.getGeometry().clone();
    this.extent_ = ol.geom.Polygon.fromExtent(this.geom_.getExtent()).getCoordinates()[0];
    this.center_ = ol.extent.getCenter(this.geom_.getExtent());
    this.angle_ = Math.atan2(this.center_[1] - evt.coordinate[1], this.center_[0] - evt.coordinate[0]);

    this.dispatchEvent({ type: this.mode_ + 'start', feature: this.feature_, pixel: evt.pixel, coordinate: evt.coordinate });
    return true;
  } else {
    this.feature_ = feature;
    this.ispt_ = this.feature_ ? this.feature_.getGeometry().getType() === 'Point' : false;
    this.drawSketch_();
    this.dispatchEvent({ type: 'select', feature: this.feature_, pixel: evt.pixel, coordinate: evt.coordinate });
    return false;
  }
};

/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 */
ol.interaction.Transform.prototype.handleDragEvent_ = function (evt) {
  switch (this.mode_) {
    case 'rotate':
      {
        var a = Math.atan2(this.center_[1] - evt.coordinate[1], this.center_[0] - evt.coordinate[0]);
        if (!this.ispt) {
          var geometry1 = this.geom_.clone();
          geometry1.rotate(a - this.angle_, this.center_);
          this.feature_.setGeometry(geometry1);
          this.feature_.set('angle', a - this.angle_);
        }
        this.drawSketch_(true);
        this.dispatchEvent({ type: 'rotating', feature: this.feature_, angle: a - this.angle_, pixel: evt.pixel, coordinate: evt.coordinate });
        break;
      }
    case 'translate':
      {
        var deltaX = evt.coordinate[0] - this.coordinate_[0];
        var deltaY = evt.coordinate[1] - this.coordinate_[1];

        this.feature_.getGeometry().translate(deltaX, deltaY);
        this.handles_.forEach(function (f) {
          f.getGeometry().translate(deltaX, deltaY);
        });

        this.coordinate_ = evt.coordinate;
        this.dispatchEvent({ type: 'translating', feature: this.feature_, delta: [deltaX, deltaY], pixel: evt.pixel, coordinate: evt.coordinate });
        break;
      }
    case 'scale':
      {
        var center = this.center_;
        if (evt.originalEvent.metaKey || evt.originalEvent.ctrlKey) {
          center = this.extent_[(Number(this.opt_) + 2) % 4];
        }

        var scx = (evt.coordinate[0] - center[0]) / (this.coordinate_[0] - center[0]);
        var scy = (evt.coordinate[1] - center[1]) / (this.coordinate_[1] - center[1]);

        if (this.constraint_) {
          if (this.constraint_ === 'h') scx = 1;else scy = 1;
        } else {
          if (this.get('keepAspectRatio')(evt)) {
            // evt.originalEvent.shiftKey)
            scx = scy = Math.min(scx, scy);
          }
        }
        var i = 0;
        var geometry = this.geom_.clone();
        geometry.applyTransform(function (g1, g2, dim) {
          if (dim < 2) return g2;

          for (i = 0; i < g1.length; i += dim) {
            if (scx !== 1) g2[i] = center[0] + (g1[i] - center[0]) * scx;
            if (scy !== 1) g2[i + 1] = center[1] + (g1[i + 1] - center[1]) * scy;
          }
          return g2;
        });
        this.feature_.setGeometry(geometry);
        this.drawSketch_();
        this.dispatchEvent({ type: 'scaling', feature: this.feature_, scale: [scx, scy], pixel: evt.pixel, coordinate: evt.coordinate });
        break;
      }
    default:
      break;
  }
};

/**
 * @param {ol.MapBrowserEvent} evt Event.
 */
ol.interaction.Transform.prototype.handleMoveEvent_ = function (evt) {
  // console.log("handleMoveEvent");
  if (!this.mode_) {
    // var map = evt.map;
    var sel = this.getFeatureAtPixel_(evt.pixel);
    var element = evt.map.getTargetElement();
    if (sel.feature) {
      var c = sel.handle ? this.Cursors[(sel.handle || 'default') + (sel.constraint || '') + (sel.option || '')] : this.Cursors.select;

      if (this.previousCursor_ === undefined) {
        this.previousCursor_ = element.style.cursor;
      }
      element.style.cursor = c;
    } else {
      if (this.previousCursor_ !== undefined) element.style.cursor = this.previousCursor_;
      this.previousCursor_ = undefined;
    }
  }
};
/**
 * @param {ol.MapBrowserEvent} evt Map browser event.
 * @return {boolean} `false` to stop the drag sequence.
 */
ol.interaction.Transform.prototype.handleUpEvent_ = function (evt) {
  // dispatchEvent
  this.dispatchEvent({ type: this.mode_ + 'end', feature: this.feature_, oldgeom: this.geom_ });
  this.drawSketch_();
  this.mode_ = null;
  return false;
};

/**
 * mapManager 地图管理器
 * author: sunshengzhen
 * introduction: 作为地图编译入口，会对地图上有的内容进行整合
 */

// TODO: 需要完善作为manager的功能

// TODO: 需要实现一套map自己的style库

var hdmap$1 = {
  initMap: HDMap,
  utils: utils,
  mapManager: {},
  commonConfig: commonConfig()
};
window.hdmap = hdmap$1;

return hdmap$1;

})));

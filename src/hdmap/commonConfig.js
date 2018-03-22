/**
 * filename: commonConfig.js
 * author: sunshengzhen
 * introduction: 这里保存一些地图的常用配置信息，一些默认的样式等
 */
// import cameraImg from '@/assets/images/u349'

export default function commonConfig () {
  // gis地图情况下的一些通用配置
  var gisConfig = {
    mapType: 'baidu',
    mapUrl:
      'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
    mapSatUrl:
      'http://shangetu1.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009&udt=20171115',
    SatUrl:
      'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=sl&p=1&scaler=1&udt=20171115',
    center: [116.40348, 39.923758]
  }

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
  var getMouseOverAreaStyle = function (styleObj) {
    let fillColor =
      styleObj && styleObj.fillColor
        ? styleObj.fillColor
        : 'rgba(100,149,237,0.2)'
    let strokeColor =
      styleObj && styleObj.strokeColor ? styleObj.strokeColor : '#1E90FF'
    let strokeWidth =
      styleObj && styleObj.strokeWidth ? styleObj.strokeWidth : 2
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
    })
  }

  var setAreaStyle = function (styleObj) {
    let fillColor = styleObj && styleObj.fillColor ? styleObj.fillColor : ''
    let strokeColor =
      styleObj && styleObj.strokeColor ? styleObj.strokeColor : ''
    let strokeWidth =
      styleObj && styleObj.strokeWidth ? styleObj.strokeWidth : '2'
    let lineDash = styleObj && styleObj.lineDash ? styleObj.lineDash : [5, 10]
    let rotation = styleObj && styleObj.rotation ? styleObj.rotation : 0
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
    })
  }

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
  var getFeatureStyle = function (markerInfo, styleObj) {
    let color = styleObj && styleObj.color ? styleObj.color : 'white'
    let scale = styleObj && styleObj.scale ? styleObj.scale : 1
    let opacity = styleObj && styleObj.opacity ? styleObj.opacity : 1
    let rotation = styleObj && styleObj.rotation ? styleObj.rotation : 0
    let anchor = styleObj && styleObj.anchor ? styleObj.anchor : [0.5, 0.5]
    return new ol.style.Style({
      image: new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ ({
          src: markerInfo.imgUrl,
          size: markerInfo.size,
          color: color,
          opacity: opacity,
          scale: scale,
          rotation: rotation,
          anchor: anchor
        })
      )
    })
  }

  /**
   * 区域报警样式
   * @param {Number} opacity 透明度
   */
  var getWarningAreaStyle = function (opacity) {
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
    })
  }

  /**
   * 统计摄像头个数样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountCameraFeatureStyle = function getCountCameraFeatureStyle (
    markerInfo, style
  ) {
    var offsetX, offsetY, anchor, fontsize
    switch (markerInfo.cameraNum.length) {
    case 1:
      offsetX = (style && style.offsetX) ? style.offsetX : 9
      offsetY = (style && style.offsetY) ? style.offsetY : -2
      anchor = (style && style.anchor) ? style.anchor : [0.9, 0.7]
      fontsize = '15px bold Calibri,sans-serif';
      break;
    case 2:
      offsetX = (style && style.offsetX) ? style.offsetX : 9
      offsetY = (style && style.offsetY) ? style.offsetY : -2
      anchor = (style && style.anchor) ? style.anchor : [1.1, 0.7]
      fontsize = '13px bold Calibri,sans-serif';
      break;
    case 3:
      offsetX = (style && style.offsetX) ? style.offsetX : 8
      offsetY = (style && style.offsetY) ? style.offsetY : -2
      anchor = (style && style.anchor) ? style.anchor : [1.4, 0.7]
      fontsize = '13px bold Calibri,sans-serif';
      break;
    }
    return new ol.style.Style({
      image: new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ {
          // img: cameraImg,
          // imgSize: [24, 24],
          // src: '../assets/images/u349.png',
          src: markerInfo.url,
          // size: [20, 20],
          color: 'white',
          scale: (style && style.scale) ? style.scale : 0.8,
          anchor: anchor
        }
      ),
      text: new ol.style.Text({
        text: markerInfo.cameraNum,
        font: fontsize,
        fill: new ol.style.Fill({
          color: 'white'
        }),
        offsetX: offsetX,
        offsetY: offsetY
      })
    })
  }

  /**
   * 统计报警个数样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountWarningFeatureStyle = function getCountWarningFeatureStyle (
    markerInfo, style
  ) {
    var offsetX, offsetY, anchor, fontsize
    switch (markerInfo.warnNum.length) {
    case 1:
      offsetX = (style && style.offsetX) ? style.offsetX : 8
      offsetY = (style && style.offsetY) ? style.offsetY : -2
      anchor = (style && style.anchor) ? style.anchor : [0.9, 0.7]
      fontsize = '15px bold Calibri,sans-serif'
      break
    case 2:
      offsetX = (style && style.offsetX) ? style.offsetX : 8
      offsetY = (style && style.offsetY) ? style.offsetY : -2
      anchor = (style && style.anchor) ? style.anchor : [1.1, 0.7]
      fontsize = '13px bold Calibri,sans-serif'
      break
    case 3:
      offsetX = (style && style.offsetX) ? style.offsetX : 8
      offsetY = (style && style.offsetY) ? style.offsetY : -2
      anchor = (style && style.anchor) ? style.anchor : [1.4, 0.7]
      fontsize = '13px bold Calibri,sans-serif'
      break
    }
    return new ol.style.Style({
      image: new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ {
          src: markerInfo.url,
          // size: [20, 20],
          color: 'white',
          scale: (style && style.scale) ? style.scale : 0.8,
          anchor: anchor
        }
      ),
      text: new ol.style.Text({
        text: markerInfo.warnNum,
        font: fontsize,
        fill: new ol.style.Fill({
          color: 'white'
        }),
        offsetX: offsetX,
        offsetY: offsetY
      })
    })
  }

  /**
   * 统计广播个数样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountBroadcastFeatureStyle = function getCountBroadcastFeatureStyle (
    markerInfo, style
  ) {
    var offsetX, offsetY, anchor, fontsize
    switch (markerInfo.broadcastNum.length) {
    case 1:
      offsetX = (style && style.offsetX) ? style.offsetX : 8
      offsetY = (style && style.offsetY) ? style.offsetY : -2
      anchor = (style && style.anchor) ? style.anchor : [1.1, 0.7]
      fontsize = '15px bold Calibri,sans-serif'
      break
    case 2:
      offsetX = (style && style.offsetX) ? style.offsetX : 8
      offsetY = (style && style.offsetY) ? style.offsetY : -2
      anchor = (style && style.anchor) ? style.anchor : [1.1, 0.7]
      fontsize = '13px bold Calibri,sans-serif'
      break
    case 3:
      offsetX = (style && style.offsetX) ? style.offsetX : 8
      offsetY = (style && style.offsetY) ? style.offsetY : -2
      anchor = (style && style.anchor) ? style.anchor : [1.4, 0.7]
      fontsize = '12px bold Calibri,sans-serif'
      break
    }
    return new ol.style.Style({
      image: new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ {
          // src: '../assets/images/u950.png',
          src: markerInfo.url,
          // size: [20, 20],
          color: 'white',
          scale: (style && style.scale) ? style.scale : 0.8,
          anchor: anchor
        }
      ),
      text: new ol.style.Text({
        text: markerInfo.broadcastNum,
        font: fontsize,
        fill: new ol.style.Fill({
          color: 'white'
        }),
        offsetX: offsetX,
        offsetY: offsetY
      })
    })
  }

  /**
   * 统计图标图层默认样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountDefaultStyle = function getCountDefaultStyle (markerInfo) {
    var scale
    if (markerInfo.cameraNum) {
      scale = markerInfo.cameraNum.length < 3 ? 1 : 1.1
    }
    if (markerInfo.broadcastNum) {
      scale = markerInfo.broadcastNum.length < 3 ? 1 : 1.1
    }
    return new ol.style.Style({
      image: new ol.style.Icon({
        // src: '../assets/images/u887.png',
        src: markerInfo.baseUrl,
        size: [45, 42],
        scale: scale,
        offset: [0, 0]
      })
    })
  }

  /**
   * 统计图标图层报警样式
   * @param {Object} markerInfo 点位信息
   */
  var getCountWarningStyle = function getCountWarningStyle (markerInfo) {
    var scale = markerInfo.warnNum.length < 3 ? 1 : 1.1
    return new ol.style.Style({
      image: new ol.style.Icon({
        src: markerInfo.baseUrl,
        size: [45, 42],
        scale: scale,
        offset: [0, 0]
      })
    })
  }

  /**
   * 获取巡更路线正常样式
   * @return {Object} 巡更路线正常样式对象
   */
  var getNormalRouteStyle = function getNormalRouteStyle () {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#7740dc',
        width: 8
      })
    })
  }

  /**
   * 获取巡更路线离线样式
   * @return {Object} 巡更路线离线样式对象
   */
  var getOfflineRouteStyle = function getOfflineRouteStyle () {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#f39826',
        width: 8
      })
    })
  }

  /**
   * 获取巡更路线报警样式
   * @return {Object} 巡更路线报警样式对象
   */
  var getWarningRouteStyle = function getWarningRouteStyle () {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ff0000',
        width: 8
      })
    })
  }
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
  var getRouteStyleAnimation = function getRouteStyleAnimation (map, lineInfo) {
    var timer = map.lineTimer[lineInfo.id]
    if (timer === undefined || timer === null) {
      timer = lineInfo.id
    } else {
      clearInterval(timer)
    }
    var num = 0
    var timerInfo = setInterval(() => {
      num++
      var style
      if (num % 2 === 0) {
        style = getWarningRouteStyle()
      } else {
        style = getOfflineRouteStyle()
      }
      map.updateLine(lineInfo, style)
    }, 500)
    map.lineTimer[lineInfo.id] = timerInfo
  }
  /**
   * 消除巡更路线报警动画样式
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
  var warnRouteCancel = function warnRouteCancel (map, lineInfo) {
    var timer = map.lineTimer[lineInfo.id]
    if (timer) {
      clearInterval(timer)
      map.updateLine(lineInfo, getNormalRouteStyle())
    }
  }
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
    warnRouteCancel: warnRouteCancel
  }
}

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
import { outOfChina } from '../extend-files/baidu-projection.js'
import { warnLogTag } from './commonConfig'

/**
 * 通过两点的GPS坐标获取两点间的距离
 * @param {HDMap} 地图对象
 * @param {Array} lonlatA
 * @param {Array} lonlatB
 * @return {Number} 距离 单位m
 */
function getDistanceByGPS (map, lonlatA, lonlatB) {
  if (
    (lonlatA[0] > 180 || lonlatA[0] < -180) ||
    (lonlatA[1] > 90 || lonlatA[1] < -90) ||
    (lonlatB[0] > 180 || lonlatB[0] < -180) ||
    (lonlatB[1] > 90 || lonlatB[1] < -90)
  ) {
    console.warn(warnLogTag + 'Error: Longitude range: -180 to 180, latitude range: -90 to 90')
    return
  }
  let distance = map.getDistance(lonlatA, lonlatB)
  return distance
}

/**
 * 获取地图某个区域（多边形）重心
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} areaCenter  重心坐标
 */
function getAreaCenter (points) {
  // 初始化多边形面积
  var aolygonArea = 0
  var areaCenter = []
  // 初始化多边形重心的 Gx Gy
  var Gx = 0
  var Gy = 0
  for (var i = 1; i <= points.length; i++) {
    // 获取x 坐标
    var iLat = points[i % points.length][0]
    // 获取y 坐标
    var iLng = points[i % points.length][1]
    // console.log(iLat, iLng)
    var nextLat = points[i - 1][0]
    var nextLng = points[i - 1][1]
    // 一个三角形的面积
    var temp = (iLat * nextLng - iLng * nextLat) / 2
    aolygonArea += temp
    Gx += temp * (iLat + nextLat) / 3
    Gy += temp * (iLng + nextLng) / 3
  }
  Gx = Gx / aolygonArea
  Gy = Gy / aolygonArea
  areaCenter[0] = Gx
  areaCenter[1] = Gy
  return areaCenter
}
/**
 * 获取三角形重心
 * @param {Array} points 三角形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]]  二维数组
 * @return {Array} 三角形重心trianglePoint:[x,y]
 */
function getTrianglePoint (points) {
  var trianglePoint = [0, 0]
  for (let i = 0; i < points.length; i++) {
    trianglePoint[0] += points[i][0]
    trianglePoint[1] += points[i][1]
  }
  trianglePoint[0] = trianglePoint[0] / 3
  trianglePoint[1] = trianglePoint[1] / 3
  return trianglePoint
}
/**
 * 获取重心点到多边形最近某个点的最短x轴,y轴的距离
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} minDistance  重心点到多边形最近点的X，Y 轴绝对值距离
 */
function getMinDistance (points) {
  var minDistance = []
  var disistanceX = [] // 重心点到各个点的x轴距离集合
  var disistanceY = [] // 重心点到各个点的y轴距离集合
  for (var i = 0; i < points.length; i++) {
    var iLatx = Math.abs(points[i][0])
    var iLaty = Math.abs(points[i][1])
    disistanceX.push(iLatx)
    disistanceY.push(iLaty)
  }
  // 多边形最小点的x,y 轴绝对值
  var minPointX = Math.min.apply(null, disistanceX)
  var minPointY = Math.min.apply(null, disistanceY)
  // 重心坐标X ,y轴的绝对值
  var areaCenterX = Math.abs(getAreaCenter(points)[0])
  var areaCenterY = Math.abs(getAreaCenter(points)[1])
  minDistance[0] = Math.abs(minPointX - areaCenterX) / 2
  minDistance[1] = Math.abs(minPointY - areaCenterY) / 2
  return minDistance
}
/**
 * 根据三角形重心是否在区域范围内求点位坐标
 * @param {Array} points 区域多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @param {Array} triangle 形成三角形的第三个点 一维数组
 * @param {Array} interceptingCoordinate 形成三角形的前两个点  二维数组
 * @return {Array} trianglePoint  点位坐标 一维数组 [x,y]
 */
function recursionPoint (points, triangle, interceptingCoordinate) {
  interceptingCoordinate.push(triangle)
  // 获取三角形重心
  var trianglePoint = getTrianglePoint(interceptingCoordinate)
  var judge = judgePointInsidePolygon(trianglePoint, points)
  if (judge === 'in' || judge === 'on') {
    return trianglePoint
  }
  interceptingCoordinate.pop()
  return recursionPoint(points, trianglePoint, interceptingCoordinate)
}
/**
 * 获取摄像头坐标
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} cameraCountPoint  摄像头坐标
 */
function getCameraCountPoint (points) {
  var cameraCountPoint = []
  // 计算摄像头坐标
  var cameraCountPointX = getAreaCenter(points)[0] - getMinDistance(points)[0]
  var cameraCountPointY = getAreaCenter(points)[1]
  cameraCountPoint[0] = cameraCountPointX
  cameraCountPoint[1] = cameraCountPointY
  var isTrue = judgePointInsidePolygon(cameraCountPoint, points)
  if (isTrue === 'on' || isTrue === 'in') {
    return cameraCountPoint
  } else {
    // 截取顶点坐标数组前两个
    var interceptingCoordinate = points.slice(0, 2)
    cameraCountPoint = recursionPoint(points, points[2], interceptingCoordinate)
    return cameraCountPoint
  }
}
/**
 * 获取广播坐标
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} broadcastCountPoint  广播坐标
 */
function getBroadcastCountPoint (points) {
  var broadcastCountPoint = []
  // 计算广播坐标
  var broadcastCountPointX =
    getAreaCenter(points)[0] + getMinDistance(points)[0]
  var broadcastCountPointY = getAreaCenter(points)[1]
  broadcastCountPoint[0] = broadcastCountPointX
  broadcastCountPoint[1] = broadcastCountPointY
  // return broadcastCountPoint
  var isTrue = judgePointInsidePolygon(broadcastCountPoint, points)
  if (isTrue === 'on' || isTrue === 'in') {
    return broadcastCountPoint
  } else {
    // 截取顶点坐标数组第二，第三个
    var interceptingCoordinate1 = points.slice(1, 3)
    broadcastCountPoint = recursionPoint(points, points[3], interceptingCoordinate1)
    return broadcastCountPoint
  }
}
/**
 * 获取报警坐标
 * @param {Array} points 多边形各点的坐标数组 [[x1,y1],[x2,y2],[x3,y3]....]  二维数组
 * @return {Array} waringConutPoint  报警坐标
 */
function getWarningConutPoint (points) {
  var waringConutPoint = []
  // 计算报警坐标 X Y轴坐标
  var waringConutPointX = getAreaCenter(points)[0]
  var waringConutPointY = getAreaCenter(points)[1] - getMinDistance(points)[1]
  waringConutPoint[0] = waringConutPointX
  waringConutPoint[1] = waringConutPointY
  // return waringConutPoint
  var isTrue = judgePointInsidePolygon(waringConutPoint, points)
  if (isTrue === 'on' || isTrue === 'in') {
    return waringConutPoint
  } else {
    var interceptingCoordinate2 = []
    if (points.length === 4) {
      interceptingCoordinate2[0] = points[2]
      interceptingCoordinate2[1] = points[3]
      waringConutPoint = recursionPoint(points, points[0], interceptingCoordinate2)
    } else {
      interceptingCoordinate2 = points.slice(2, 4)
      waringConutPoint = recursionPoint(points, points[3], interceptingCoordinate2)
    }
    return waringConutPoint
  }
}
/**
 * 射线法判断点是否在多边形内部
 * @param {Array} point 待判断的点，格式：[X坐标, Y坐标]
 * @param {Array} poly 多边形顶点，二维数组 poly:[[X1, Y1],[X2, Y2],[X3, Y3].......]
 * @return {String} 点 point 和多边形 poly 的几何关系
 */
function judgePointInsidePolygon (point, poly) {
  function rayMethod (point, poly) {
    for (var f = false, i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
      // 点与多边形顶点重合
      if (
        (poly[i][0] === point[0] && poly[i][1] === point[1]) ||
        (poly[j][0] === point[0] && poly[j][1] === point[1])
      ) {
        return 'on'
      }
      // 判断线段两端点是否在射线两侧
      if (
        (poly[i][1] < point[1] && poly[j][1] >= point[1]) ||
        (poly[i][1] >= point[1] && poly[j][1] < point[1])
      ) {
        // 线段上与射线 Y 坐标相同的点的 X 坐标
        var x =
          poly[i][0] +
          (point[1] - poly[i][1]) *
          (poly[j][0] - poly[i][0]) /
          (poly[j][1] - poly[i][1])
        // 点在多边形的边上
        if (x === point[0]) {
          return 'on'
        }
        // 射线穿过多边形的边界
        if (x > point[0]) {
          f = !f
        }
      }
    }
    // 射线穿过多边形边界的次数为奇数时点在多边形内
    return f ? 'in' : 'out'
  }
  if (point instanceof Array && point.length === 2) {
    var result = rayMethod(point, poly)
    return result
  } else {
    console.warn('点位越界传参有误： position must be a array && position.length === 2')
    return null
  }
}

/**
 * 获取点位聚合信息
 * @param {Object} map 初始化地图对象
 * @param {Array} coordinate 鼠标点击点坐标，格式：[X坐标, Y坐标]
 * @return {Array} markersInfo 点位信息数组[{},{}]
 */
function getFeaturesInExtent (map, coordinate) {
  var resolution
  var distance
  if (map.mapConfig.gisEngine === 'tile') {
    // 设置半径根据地图分辨率等级变大而相应的变大
    resolution = map.getMap().getView().getResolution()
    if (resolution === 1) {
      distance = 32
    } else {
      distance = 64 * (Math.log2(resolution))
    }
  } else {
    var zoom = map.getZoom()
    distance = 24 / Math.pow(2, zoom - 3)
  }
  // 设置区域范围
  var extent = [
    coordinate[0] - distance,
    coordinate[1] - distance,
    coordinate[0] + distance,
    coordinate[1] + distance
  ]
  var layers = map.getOutterLayers()
  // 保存全部图层信息
  var layersInfo = []
  // 保存点位图层信息
  var markersInfo = []
  for (var key in layers) {
    if (layers[key].getVisible()) {
      // 选定区域
      var layer = layers[key].getSource().getFeaturesInExtent(extent)
      layersInfo.push(layer)
    }
  }
  // 排空
  var resdata = layersInfo.filter(function (item) {
    return item.length !== 0
  })
  for (let i = 0; i < resdata.length; i++) {
    const element = resdata[i]
    for (let j = 0; j < element.length; j++) {
      const ele = element[j]
      // 判断是否有点位信息
      if (ele.extProperties && ele.extProperties.markerType) {
        ele.extProperties.layerkey = ele.getLayerKey()
        markersInfo.push(ele.extProperties)
      }
    }
  }
  return markersInfo
}
/**
 * 获取规则多边形的中心
 * @param {Array} points 多边形的顶点坐标：[[x1,y1],[x2,y2].....]
 * @return {Array} geometryCenter  多边形的中心(重心)：[x,y]
 */
function getGeometryCenter (points) {
  var geometryCenter = []
  var coordinateX = 0
  var coordinateY = 0
  for (let i = 0; i < points.length; i++) {
    coordinateX += points[i][0]
    coordinateY += points[i][1]
  }
  geometryCenter[0] = coordinateX / points.length
  geometryCenter[1] = coordinateY / points.length
  return geometryCenter
}
/**
 * 获取巡更路线报警动画样式的报警点位置
 * @param {Object} lineInfo 多边形的顶点坐标：[[x1,y1],[x2,y2].....]
 * @return {Array} makerPosition  报警点位置函数
 */
function getWarningPosition (lineInfo) {
  var makerPosition = []
  makerPosition[0] =
    (lineInfo.borderPoints[0][0] + lineInfo.borderPoints[1][0]) / 2
  makerPosition[1] =
    (lineInfo.borderPoints[0][1] + lineInfo.borderPoints[1][1]) / 2
  return makerPosition
}
/**
 * 根据车位中心获取车位顶点坐标
 * @param {Array} parkingCenter 车位中心坐标：[x1,y1]
 * @return {Array} borderPoints 车位顶点坐标 ：[[[x1,y1],[x2,y2],[x3,y3],[x4,y4],[x1,y1]]]--首尾相连形成闭合
 */
function getParkingCoordinates (parkingCenter) {
  // 车位顶点坐标
  var borderPoints = []
  var parkingCoordinates = []
  // 车位中心坐上角
  var leftTop = []
  var rightTop = []
  var rightBottom = []
  var leftBottom = []
  leftTop[0] = parkingCenter[0] - 20
  leftTop[1] = parkingCenter[1] + 40
  parkingCoordinates.push(leftTop)
  rightTop[0] = parkingCenter[0] + 20
  rightTop[1] = parkingCenter[1] + 40
  parkingCoordinates.push(rightTop)
  rightBottom[0] = parkingCenter[0] + 20
  rightBottom[1] = parkingCenter[1] - 40
  parkingCoordinates.push(rightBottom)
  leftBottom[0] = parkingCenter[0] - 20
  leftBottom[1] = parkingCenter[1] - 40
  parkingCoordinates.push(leftBottom)
  parkingCoordinates.push(leftTop)
  borderPoints.push(parkingCoordinates)
  return borderPoints
}
/**
 * 计算车位的长度
 * @param {Array} borderPoints 车位顶点坐标 ：[[[x1,y1],[x2,y2],[x3,y3],[x4,y4],[x1,y1]]]--首尾相连形成闭合
 * @return {Number} parkingLong 车位的长度
 */
function getParkingLong (borderPoints) {
  // 两点之间X距离的平方
  var parkingLongX = Math.pow((borderPoints[0][1][0] - borderPoints[0][2][0]), 2)
  // 两点之间Y距离的平方
  var parkingLongY = Math.pow((borderPoints[0][1][1] - borderPoints[0][2][1]), 2)
  // 车位的长度
  var parkingLong = Math.sqrt(parkingLongX + parkingLongY)
  return parkingLong
}
/**
 * 根据车位顶点坐标和角度获取车位锁坐标
 * @param {Array} borderPoints 车位顶点坐标 ：[[[x1,y1],[x2,y2],[x3,y3],[x4,y4],[x1,y1]]]--首尾相连形成闭合
 * @param {Number} rotate 车位角度
 * @return {Array} parkingLockPoint 车位锁坐标:[x,y]
 */
function getParkingLockPoint (borderPoints, rotate) {
  // ParkingLockPoint  车锁的坐标
  var parkingLockPoint = []
  // 车位的长
  var parkingLong = getParkingLong(borderPoints)
  var coordinatesPoint = null
  if (borderPoints[0].length === 5) {
    borderPoints[0].pop()
    coordinatesPoint = borderPoints[0]
  } else {
    coordinatesPoint = borderPoints[0]
  }
  if (rotate === 0 || rotate === 360 || rotate === -360) {
    // 车锁的坐标
    parkingLockPoint[0] = getGeometryCenter(coordinatesPoint)[0]
    parkingLockPoint[1] = getGeometryCenter(coordinatesPoint)[1] - (parkingLong / 3)
  } else if (rotate === -90 || rotate === 270) {
    // 车锁的坐标
    parkingLockPoint[0] = getGeometryCenter(coordinatesPoint)[0] + (parkingLong / 3)
    parkingLockPoint[1] = getGeometryCenter(coordinatesPoint)[1]
  } else if (rotate === 90 || rotate === -270) {
    // 车锁的坐标
    parkingLockPoint[0] = getGeometryCenter(coordinatesPoint)[0] - (parkingLong / 3)
    parkingLockPoint[1] = getGeometryCenter(coordinatesPoint)[1]
  } else if (rotate === 180 || rotate === -180) {
    // 车锁的坐标
    parkingLockPoint[0] = getGeometryCenter(coordinatesPoint)[0]
    parkingLockPoint[1] = getGeometryCenter(coordinatesPoint)[1] + (parkingLong / 3)
  } else {
    // 第一点和第二点两点之间的中心坐标
    var firstPointCenter = []
    firstPointCenter[0] = (coordinatesPoint[0][0] + coordinatesPoint[1][0]) / 2
    firstPointCenter[1] = (coordinatesPoint[0][1] + coordinatesPoint[1][1]) / 2
    // 第三点和第四点两点之间的中心坐标
    var lastPointCenter = []
    lastPointCenter[0] = (coordinatesPoint[2][0] + coordinatesPoint[3][0]) / 2
    lastPointCenter[1] = (coordinatesPoint[2][1] + coordinatesPoint[3][1]) / 2
    // 车锁坐标
    parkingLockPoint[0] = firstPointCenter[0] - ((firstPointCenter[0] - lastPointCenter[0]) * 5 / 6)
    parkingLockPoint[1] = firstPointCenter[1] - ((firstPointCenter[1] - lastPointCenter[1]) * 5 / 6)
  }
  return parkingLockPoint
}

/**
 * 点到折线的最短距离
 * @param {Object} 地图
 * @param {Array} 点的坐标
 * @param {Array} 折线点的集合 [[x1,y1],[x2,x2],...]
 * @return {Number} 距离
 */
function pointToPolyline (map, point, points) {
  // 计算点到折线第一条线段的距离
  if (point instanceof Array && point.length === 2) {
    let distance = pointToLine(map, point, points[0], points[1])
    // 当折线是一条线段时，返回点到线的距离
    if (points.length === 2) {
      return distance
    }
    if (points.length > 2) {
      // 遍历点到剩下的每个折线线段的距离,对比最短距离
      for (var i = 1; i < points.length - 1; i++) {
        let distance1 = pointToLine(map, point, points[i], points[i + 1])
        distance = distance < distance1 ? distance : distance1
        return distance
      }
    }
  } else {
    console.warn('point must be a array & point.length === 2')
    return null
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
function pointToLine (map, point, pointA, pointB) {
  let distance
  let cross = (pointB[0] - pointA[0]) * (point[0] - pointA[0]) + (pointB[1] - pointA[1]) * (point[1] - pointA[1])
  let d = Math.pow((pointB[0] - pointA[0]), 2) + Math.pow((pointB[1] - pointA[1]), 2) // 计算折线两点距离的平方
  // 将坐标点转换为GPS坐标
  let lonlat = map.transBitmapToWGS(point)
  let lonlatA = map.transBitmapToWGS(pointA)
  let lonlatB = map.transBitmapToWGS(pointB)
  // 点的位置在线段外右侧,点到线段距离为点到A点的距离
  if (cross <= 0) {
    distance = getDistanceByGPS(map, lonlat, lonlatA)
    return distance
  }
  // 点的位置在线段外左侧,点到线段距离为点到B点的距离
  if (cross >= d) {
    distance = getDistanceByGPS(map, lonlat, lonlatB)
    return distance
  }
  // 点的位置在线段外中间范围内,点到线段距离为点到线段的垂线
  let r = cross / d
  let px = pointA[0] + (pointB[0] - pointA[0]) * r
  let py = pointA[1] + (pointB[1] - pointA[1]) * r
  let lonlatC = map.transBitmapToWGS([px, py])
  distance = getDistanceByGPS(map, lonlat, lonlatC)
  return distance
}

/**
 * 区域重叠的判断函数,判断两个区域是否重叠
 * @param {Array} segment 线段坐标点: [[x1,y1], [x2,y2]]
 * @param {Array} polygon 多边形坐标点: [[[x1,y1],[x2,y2],[x3,y3],[x4,y4]...]
 * @return {Boolean} 两多边形重叠为true,否则为false
 * */
/* eslint-disable */
function judgePolygonsOverlap (polyA, polyB) {
  // 线段是否相交
  function judgeSegmentsIntersectant (segA, segB) {
    const abc =
      (segA[0][0] - segB[0][0]) * (segA[1][1] - segB[0][1]) -
      (segA[0][1] - segB[0][1]) * (segA[1][0] - segB[0][0]);
    const abd =
      (segA[0][0] - segB[1][0]) * (segA[1][1] - segB[1][1]) -
      (segA[0][1] - segB[1][1]) * (segA[1][0] - segB[1][0]);
    if (abc * abd >= 0) {
      return false;
    }
    const cda =
      (segB[0][0] - segA[0][0]) * (segB[1][1] - segA[0][1]) -
      (segB[0][1] - segA[0][1]) * (segB[1][0] - segA[0][0]);
    const cdb = cda + abc - abd;
    return !(cda * cdb >= 0);
  }
  // 判断两多边形边界是否相交
  function judgePolygonsIntersectant (polyA, polyB) {
    for (let i = 0, l = polyA.length; i < l; i++) {
      for (let j = 0, k = polyB.length; j < k; j++) {
        const segA = [polyA[i], polyA[i === l - 1 ? 0 : i + 1]];
        const segB = [polyB[j], polyB[j === k - 1 ? 0 : j + 1]];
        if (judgeSegmentsIntersectant(segA, segB)) {
          return true;
        }
      }
    }
    return false;
  }
  // 判断两多边形是否存在点与区域的包含关系(多边形A的点在多边形B的区域内或多边形B的点在多边形A的区域内)
  function judgePointContainByPolygon (polyA, polyB) {
    for (let i = 0; i < polyA.length; i++) {
      if (hdmap.utils.judgePointInsidePolygon(polyA[i], polyB) !== 'out') {
        return true;
      }
    }
    for (let i = 0; i < polyB.length; i++) {
      if (hdmap.utils.judgePointInsidePolygon(polyB[i], polyA) !== 'out') {
        return true;
      }
    }
    return false;
  }
  return (
    judgePolygonsIntersectant(polyA, polyB) ||
    judgePointContainByPolygon(polyA, polyB)
  );
}

/**
 * 根据三个GPS和对应的坐标信息计算比例尺
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points  { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {Number} scale
 */
function getScaleByGPS (map, lonlats, points) {
  // 判断经纬度范围
  for (var key in lonlats) {
    if ((lonlats[key][0] > 180 || lonlats[key][0] < -180) || (lonlats[key][1] > 90 || lonlats[key][1] < -90)) {
      console.warn('Error: Longitude range: -180 to 180, latitude range: -90 to 90')
      return null
    }
  }
  // 计算两个点的距离
  function toSqrt (a, b) {
    var sqrt = Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
    return sqrt
  }

  let A = points['pointA']
  let B = points['pointB']
  let C = points['pointC']
  let mlonlatA = map.translate_4326_to_3857(lonlats['lonlatA'])
  let mlonlatB = map.translate_4326_to_3857(lonlats['lonlatB'])
  let mlonlatC = map.translate_4326_to_3857(lonlats['lonlatC'])

  // A、B两点确定比例尺
  let scaleAB = toSqrt(mlonlatA, mlonlatB) / toSqrt(A, B)

  // A、C两点确定比例尺
  let scaleAC = toSqrt(mlonlatA, mlonlatC) / toSqrt(A, C)

  // B、C两点确定比例尺
  let scaleBC = toSqrt(mlonlatB, mlonlatC) / toSqrt(B, C)

  var scale = (scaleAB + scaleAC + scaleBC) / 3
  return scale
}

/**
 * 根据三个GPS和对应的坐标信息计算中心点GPS
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points  { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {Array} 中心点GPS
 */
function getCenterGPS (map, lonlats, points) {
  // 判断经纬度范围
  for (var key in lonlats) {
    if ((lonlats[key][0] > 180 || lonlats[key][0] < -180) || (lonlats[key][1] > 90 || lonlats[key][1] < -90)) {
      console.warn('Error: Longitude range: -180 to 180, latitude range: -90 to 90')
      return null
    }
  }
  // 光栅点位转换4326
  function toArr (point, lonlat, scale, arcAngle) {
    var angle = Math.atan2(point[1], point[0]) + arcAngle
    var r = Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2))
    let arr = []
    arr[0] = lonlat[0] - r * Math.cos(angle) * scale
    arr[1] = lonlat[1] - r * Math.sin(angle) * scale
    return arr
  }

  let A = points['pointA']
  let B = points['pointB']
  let C = points['pointC']
  var scale = getScaleByGPS(map, lonlats, points)
  var arcAngle = getArcAngle(map, lonlats, points)
  let mlonlatA = map.translate_4326_to_3857(lonlats['lonlatA'])
  let mlonlatB = map.translate_4326_to_3857(lonlats['lonlatB'])
  let mlonlatC = map.translate_4326_to_3857(lonlats['lonlatC'])

  // A点确定中心点
  var lonlatA = map.translate_3857_to_4326(toArr(A, mlonlatA, scale, arcAngle))

  // B点确定中心点
  var lonlatB = map.translate_3857_to_4326(toArr(B, mlonlatB, scale, arcAngle))

  // C点确定中心点
  var lonlatC = map.translate_3857_to_4326(toArr(C, mlonlatC, scale, arcAngle))

  let lon = (lonlatA[0] + lonlatB[0] + lonlatC[0]) / 3
  let lat = (lonlatA[1] + lonlatB[1] + lonlatC[1]) / 3
  var centerGPS = [lon, lat]
  return centerGPS
}

/**
 * 根据三个GPS和对应的坐标信息计算旋转弧度
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points  { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {Number} 旋转弧度
 */
function getArcAngle (map, lonlats, points) {
  for (var key in lonlats) {
    if ((lonlats[key][0] > 180 || lonlats[key][0] < -180) || (lonlats[key][1] > 90 || lonlats[key][1] < -90)) {
      console.warn('Error: Longitude range: -180 to 180, latitude range: -90 to 90')
      return null
    }
  }

  // 计算两点的方位角弧度
  function toArc (A, B) {
    var arc = Math.atan2(B[1] - A[1], B[0] - A[0])
    return arc
  }

  let A = points['pointA']
  let B = points['pointB']
  let C = points['pointC']
  let mlonlatA = map.translate_4326_to_3857(lonlats['lonlatA'])
  let mlonlatB = map.translate_4326_to_3857(lonlats['lonlatB'])
  let mlonlatC = map.translate_4326_to_3857(lonlats['lonlatC'])

  // 根据AB两点计算弧度
  var arcAB = toArc(mlonlatB, mlonlatA) - toArc(B, A)

  // 根据AC两点计算弧度
  var arcAC = toArc(mlonlatC, mlonlatA) - toArc(C, A)

  // 根据BC两点计算弧度
  var arcBC = toArc(mlonlatC, mlonlatB) - toArc(C, B)

  // 以arcAB为基准，校正arcAC和arcBC的值，使其处于相同的PI范围内
  if (Math.abs(arcAC - arcAB) > Math.PI) {
    arcAC = arcAC > arcAB ? arcAC - 2 * Math.PI : arcAC + 2 * Math.PI
  }
  if (Math.abs(arcBC - arcAB) > Math.PI) {
    arcBC = arcBC > arcAB ? arcBC - 2 * Math.PI : arcBC + 2 * Math.PI
  }
  var arcAngle = ((arcAB + arcAC + arcBC) / 3 + 2 * Math.PI) % (2 * Math.PI)
  return arcAngle
}

/**
 * 根据三个GPS和对应的坐标信息获取比例尺、中心点GPS、旋转弧度属性集合
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {JSON} 
 */
function getMapProperty (map, lonlats, points) {
  var attributes = {}
  attributes.centerGPS = getCenterGPS(map, lonlats, points)
  attributes.scale = getScaleByGPS(map, lonlats, points)
  attributes.arcAngle = getArcAngle(map, lonlats, points)
  return attributes
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
function getScaleBySize (sizeWidth, sizeHeight, realWidth, realHeight) {
  // 根据图片宽高和真实宽高获取比例尺
  // let width = sizeWidth * 0.0254 / 72
  let widthScale = sizeWidth / realWidth
  let heightScale = sizeHeight / realHeight

  // 根据两个比例尺求出平均比例尺
  let scale = (widthScale + heightScale) / 2
  return scale
}
/**
 * 获取地图可视区域的中心
 * @param {Object} map 地图对象
 * @return {Array} visibleAreaCenter 地图可视区域的中心坐标：[x,y]
 */
function getVisibleAreaCenter (map) {
  var extent = map.getMap().getView().calculateExtent(map.getMap().getSize())
  var visibleAreaCenter = ol.extent.getCenter(extent)
  return visibleAreaCenter
}
/**
 * 判断点位越界
 * @param {Object} map 地图对象
 * @param {Object} id 区域id
 * @param {Object} point 要判断的点的坐标:[x,y]
 * @return {Boolean} boolean ture表示在区域内，false表示在区域外
 */
function pointTransboundary (map, id, point) {
  var region = map.getMarkerBylayerKey(id, 'gisLayer')
  var boolean = region.getGeometry().intersectsCoordinate(point)
  return boolean
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
}
export default utils

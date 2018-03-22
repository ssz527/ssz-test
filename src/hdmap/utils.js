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
    console.warn(
      'Error: Longitude range: -180 to 180, latitude range: -90 to 90'
    )
    return
  }
  // // 经纬度转换成三角函数中度分表形式
  // function rad(d) {
  //   return d * Math.PI / 180.0
  // }
  // let radLat1 = rad(lonlatA[1])
  // let radLat2 = rad(lonlatB[1])
  // let a = radLat1 - radLat2
  // let b = rad(lonlatA[0]) - rad(lonlatB[0])
  // let distance =
  //   2 *
  //   Math.asin(
  //     Math.sqrt(
  //       Math.pow(Math.sin(a / 2), 2) +
  //         Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
  //     )
  //   )
  // distance = Math.round(distance * 6378137)
  let distance = map.getDistance(lonlatA, lonlatB)
  return distance
}

/**
 * 根据两点的坐标计算两点距离
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points  { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {Number} 距离 单位m
 */
function getDistanceByPoint (map, lonlats, points) {
  // 判断经纬度范围
  for (var key in lonlats) {
    if ((lonlats[key][0] > 180 || lonlats[key][0] < -180) || (lonlats[key][1] > 90 || lonlats[key][1] < -90)) {
      console.warn('Error: Longitude range: -180 to 180, latitude range: -90 to 90')
      return null
    }
  }
  // 光栅图坐标换算经纬度
  let centerGPS = getCenterGPS(lonlats, points) // 中心点GPS坐标
  let mcenter = map.translate_4326_to_3857(centerGPS) // 中心点GPS坐标转光栅坐标
  let scale = getScaleByGPS(map, lonlats, points) // 获取偏移比例尺

  // 修正AB两点的坐标位置
  let pntAX = points['pointA'][0] * scale
  let pntAY = points['pointA'][1] * scale
  let pntBX = points['pointB'][0] * scale
  let pntBY = points['pointB'][1] * scale
  let mlonlatA = [mcenter[0] + pntAX, mcenter[1] + pntAY]
  let lonlatA = map.translate_3857_to_4326(mlonlatA) // 点位A的GPS坐标

  let mlonlatB = [mcenter[0] + pntBX, mcenter[1] + pntBY]
  let lonlatB = map.translate_3857_to_4326(mlonlatB) // 点位B的GPS坐标

  let distance = map.getDistance(lonlatA, lonlatB)
  return distance
}

/**
 * 根据三个GPS和对应的坐标信息计算修正地图的比例尺
 * @param {HDMap} 地图对象
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points  { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {Number} scale分母
 */
function getScaleByGPS (map, lonlats, points) {
  // 判断经纬度范围
  for (var key in lonlats) {
    if ((lonlats[key][0] > 180 || lonlats[key][0] < -180) || (lonlats[key][1] > 90 || lonlats[key][1] < -90)) {
      console.warn('Error: Longitude range: -180 to 180, latitude range: -90 to 90')
      return null
    }
  }
  // 经纬度换算光栅图坐标
  let centerGPS = getCenterGPS(lonlats, points) // 中心点GPS坐标
  let mcenter = map.translate_4326_to_3857(centerGPS) // 中心点GPS坐标转光栅坐标
  let mlonlatA = map.translate_4326_to_3857(lonlats['lonlatA'])
  let mlonlatB = map.translate_4326_to_3857(lonlats['lonlatB'])
  let mlonlatC = map.translate_4326_to_3857(lonlats['lonlatC'])

  let pntAX = mlonlatA[0] - mcenter[0]
  let pntAY = mlonlatA[1] - mcenter[1]
  let pntBX = mlonlatB[0] - mcenter[0]
  let pntBY = mlonlatB[1] - mcenter[1]
  let pntCX = mlonlatC[0] - mcenter[0]
  let pntCY = mlonlatC[1] - mcenter[1]

  let scaleAX = pntAX / points['pointA'][0]
  let scaleAY = pntAY / points['pointA'][1]
  let scaleBX = pntBX / points['pointB'][0]
  let scaleBY = pntBY / points['pointB'][1]
  let scaleCX = pntCX / points['pointC'][0]
  let scaleCY = pntCY / points['pointC'][1]
  let scaleA = (scaleAX + scaleAY) / 2
  let scaleB = (scaleBX + scaleBY) / 2
  let scaleC = (scaleCX + scaleCY) / 2
  var scale = (scaleA + scaleB + scaleC) / 3
  return scale
}

/**
 * 根据三个GPS点进行中心点计算
 * @param {JSON} lonlats { 'lonlatA':[],'lonlatB':[],'lonlatC':[] }
 * @param {JSON} points  { 'pointA':[], 'pointB':[], 'pointC':[] }
 * @return {Array}
 */
function getCenterGPS (lonlats, points) {
  // 判断GPS点的范围
  for (var key in lonlats) {
    if ((lonlats[key][0] > 180 || lonlats[key][0] < -180) || (lonlats[key][1] > 90 || lonlats[key][1] < -90)) {
      console.warn('Error: Longitude range: -180 to 180, latitude range: -90 to 90')
      return null
    }
  }
  // 判断点是否在同一水平上
  if (
    (lonlats['lonlatA'][0] === lonlats['lonlatB'][0] ||
      lonlats['lonlatA'][0] === lonlats['lonlatC'][0] ||
      lonlats['lonlatB'][0] === lonlats['lonlatC'][0]) ||
    (lonlats['lonlatA'][1] === lonlats['lonlatB'][1] ||
      lonlats['lonlatA'][1] === lonlats['lonlatC'][1] ||
      lonlats['lonlatB'][1] === lonlats['lonlatC'][1])
  ) {
    console.warn(
      'The latitude and longitude of two points can\'t be the same'
    )
    return null
  }
  // 计算AB两个GPS的中心点
  let lon1 =
    lonlats['lonlatA'][0] - (lonlats['lonlatB'][0] - lonlats['lonlatA'][0]) * points['pointA'][0] / (points['pointB'][0] - points['pointA'][0])
  let lat1 =
    lonlats['lonlatB'][1] -
    (lonlats['lonlatB'][1] - lonlats['lonlatA'][1]) *
    points['pointB'][1] /
    (points['pointB'][1] - points['pointA'][1])

  // 计算AC两个GPS的中心点
  let lon2 =
    lonlats['lonlatA'][0] -
    (lonlats['lonlatC'][0] - lonlats['lonlatA'][0]) *
    points['pointA'][0] /
    (points['pointC'][0] - points['pointA'][0])
  let lat2 =
    lonlats['lonlatC'][1] -
    (lonlats['lonlatC'][1] - lonlats['lonlatA'][1]) *
    points['pointC'][1] /
    (points['pointC'][1] - points['pointA'][1])

  // 计算BC两个GPS的中心点
  let lon3 =
    lonlats['lonlatC'][0] -
    (lonlats['lonlatB'][0] - lonlats['lonlatC'][0]) *
    points['pointC'][0] /
    (points['pointB'][0] - points['pointC'][0])
  let lat3 =
    lonlats['lonlatB'][1] -
    (lonlats['lonlatB'][1] - lonlats['lonlatC'][1]) *
    points['pointB'][1] /
    (points['pointB'][1] - points['pointC'][1])

  // 根据三个中心点算出平均值
  let lon = (lon1 + lon2 + lon3) / 3
  let lat = (lat1 + lat2 + lat3) / 3
  let centerGPS = [lon, lat]
  if (lon > 180 || lon < -180 || (lat > 90 || lat < -90)) {
    console.warn(
      'Error: centerGPS: [' +
      centerGPS +
      '] The longitude must be between -180 and 180, latitude must be between -90 and 90'
    )
    return false
  } else {
    return centerGPS
  }
}

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
  let width = sizeWidth * 0.0254 / 72
  let height = sizeHeight * 0.0254 / 72
  let widthScale = realWidth / width
  let heightScale = realHeight / height

  // 根据两个比例尺求出平均比例尺
  let scale = (widthScale + heightScale) / 2
  console.log(scale)
  return scale
}
/**
 * 获取地图某个区域（多边形）重心
 * @param {Array} points 多边形各点的坐标数组
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
 * 获取重心点到多边形最近某个点的最短x轴,y轴的距离
 * @param {Array} points 多边形各点的坐标数组
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
 * 获取摄像头坐标
 * @param {Array} points 多边形各点的坐标数组
 * @return {Array} cameraCountPoint  摄像头坐标
 */
function getCameraCountPoint (points) {
  var cameraCountPoint = []
  // 计算摄像头坐标
  var cameraCountPointX = getAreaCenter(points)[0] - getMinDistance(points)[0]
  var cameraCountPointY = getAreaCenter(points)[1]
  cameraCountPoint[0] = cameraCountPointX
  cameraCountPoint[1] = cameraCountPointY
  return cameraCountPoint
}
/**
 * 获取广播坐标
 * @param {Array} points 多边形各点的坐标数组
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
  return broadcastCountPoint
}
/**
 * 获取报警坐标
 * @param {Array} points 多边形各点的坐标数组
 * @return {Array} waringConutPoint  报警坐标
 */
function getWarningConutPoint (points) {
  var waringConutPoint = []
  // 计算报警坐标 X Y轴坐标
  var waringConutPointX = getAreaCenter(points)[0]
  var waringConutPointY = getAreaCenter(points)[1] - getMinDistance(points)[1]
  waringConutPoint[0] = waringConutPointX
  waringConutPoint[1] = waringConutPointY
  return waringConutPoint
}
/**
 * 射线法判断点是否在多边形内部
 * @param {Array} point 待判断的点，格式：[X坐标, Y坐标]
 * @param {Array} poly 多边形顶点，数组成员的格式同 point
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
  // console.log(poly)
  var result = rayMethod(point, poly)
  // console.log(result)
  return result
}

/**
 * 获取点位聚合信息
 * @param {Object} map 初始化地图对象
 * @param {Array} coordinate 鼠标点击点坐标，格式：[X坐标, Y坐标]
 * @return {Array} markersInfo 点位信息数组[{},{}]
 */
function getFeaturesInExtent (map, coordinate) {
  // 设置半径根据地图放大等级而相应的缩小
  var zoom = map.getZoom()
  var distance = 24 / Math.pow(2, zoom - 3)
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
    // 选定区域
    var layer = layers[key].getSource().getFeaturesInExtent(extent)
    layersInfo.push(layer)
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
  let distance = pointToLine(point, points[0], points[1])
  // 当折线是一条线段时，返回点到线的距离
  if (points.length === 2) {
    return distance
  }
  if (points.length > 2) {
    // 遍历点到剩下的每个折线线段的距离,对比最短距离
    for (var i = 1; i < points.length - 1; i++) {
      let distance1 = pointToLine(point, points[i], points[i + 1])
      distance = distance < distance1 ? distance : distance1
      return distance
    }
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
var utils = {
  outOfChina: outOfChina,
  getDistanceByGPS: getDistanceByGPS,
  getDistanceByPoint: getDistanceByPoint,
  getScaleByGPS: getScaleByGPS,
  getCenterGPS: getCenterGPS,
  getScaleBySize: getScaleBySize,
  getAreaCenter: getAreaCenter,
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
  judgePolygonsOverlap: judgePolygonsOverlap
}
export default utils

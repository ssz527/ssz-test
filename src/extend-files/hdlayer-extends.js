/**
 * filename: hdlayer-extend.js
 * author: yangyida
 * discription: extend the openlayer class
 */

goog.provide('ol.layer.HDVector')
goog.provide('ol.DevFeature')
goog.provide('ol.AreaFeature')
goog.provide('ol.LineFeature')
goog.provide('ol.CountFeature')

goog.require('ol')
goog.require('ol.layer.Vector')
goog.require('ol.Feature')
/**
 * ol.layer.HDVector
 * 此类是对ol.layer.Vector的一个扩展，扩展了layerKey字段，
 * 扩展此字段的意义是能够在查找layer中的feature时，能够根据
 * 想要的feature种类中查找，而无需遍历所有layer进行查找。
 * @param {String} layerKey 图层名称
 * @param {olx.layer.VectorOptions} optOptions 图层选项
 */
ol.layer.HDVector = function (layerKey, optOptions) {
  var options = optOptions || {}

  var baseOptions = ol.obj.assign({}, options)
  // goog.base(this, /** @type {olx.layer.LayerOptions} */ (baseOptions));
  ol.layer.Vector.call(
    this,
    /** @type {olx.layer.LayerOptions} */ (baseOptions)
  )
  this.layerKey = layerKey
  this.visibleFlag = true
}
ol.inherits(ol.layer.HDVector, ol.layer.Vector)

ol.layer.HDVector.prototype.getLayerKey = function () {
  return this.layerKey
}
/**
 * 此参数指示该层是否被人为控制显示状态：true可显示，false不可显示
 */
ol.layer.HDVector.prototype.getVisibleFlag = function () {
  return this.visibleFlag
}
/**
 * 此参数指示该层是否被人为控制显示状态：true可显示，false不可显示
 * params {Boolean}
 */
ol.layer.HDVector.prototype.setVisibleFlag = function (flag) {
  this.visibleFlag = flag
}
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
  var options = optOptions || {}

  var baseOptions = ol.obj.assign({}, options)
  // goog.base(this, (baseOptions));
  ol.Feature.call(this, /** @type {olx.layer.LayerOptions} */ (baseOptions))
  this.extProperties = extProperties
  this.layerKey = layerKey
}
ol.inherits(ol.DevFeature, ol.Feature)

ol.DevFeature.prototype.getExtProperties = function () {
  return this.extProperties
}

ol.DevFeature.prototype.setExtProperties = function (extProperties) {
  this.extProperties = extProperties
}

ol.DevFeature.prototype.getLayerKey = function () {
  return this.layerKey
}

ol.DevFeature.prototype.setLayerKey = function (layerKey) {
  this.layerKey = layerKey
}

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
  var options = optOptions || {}

  var baseOptions = ol.obj.assign({}, options)
  // goog.base(this, (baseOptions));
  ol.Feature.call(this, /** @type {olx.layer.LayerOptions} */ (baseOptions))
  this.extProperties = extProperties
  this.layerKey = layerKey
  this.rotate = extProperties.rotate ? extProperties.rotate : 0
  this.areaTypesOf = extProperties.areaTypesOf ? extProperties.areaTypesOf : ''
  this.originId = extProperties.originId ? extProperties.originId : 0
}
ol.inherits(ol.AreaFeature, ol.Feature)

ol.AreaFeature.prototype.getExtProperties = function () {
  return this.extProperties
}

ol.AreaFeature.prototype.setExtProperties = function (extProperties) {
  this.extProperties = extProperties
}

ol.AreaFeature.prototype.getLayerKey = function () {
  return this.layerKey
}

ol.AreaFeature.prototype.setLayerKey = function (layerKey) {
  this.layerKey = layerKey
}
ol.AreaFeature.prototype.getAreaTypesOf = function () {
  return this.areaTypesOf
}

ol.AreaFeature.prototype.setAreaTypesOf = function (areaTypesOf) {
  this.areaTypesOf = areaTypesOf
}
ol.AreaFeature.prototype.getRotate = function () {
  return this.rotate
}

ol.AreaFeature.prototype.setRotate = function (rotate) {
  if (rotate > 360) {
    rotate = rotate % 360
  } else if (rotate < -360) {
    rotate = rotate % -360
  }
  this.rotate = rotate
  this.extProperties.rotate = rotate
}
ol.AreaFeature.prototype.getOriginId = function () {
  return this.originId
}

ol.AreaFeature.prototype.setOriginId = function (originId) {
  this.originId = originId
}
/**
 * 此类是对ol.Feature的一个扩展，路线一个feature，存储的是路线的相关信息，方便后续对区域的操作
 *
 * @param {Object} optOptions 路线属性信息
 * @param {Object} extProperties lineInfo 点位信息 用于存储路线的相关信息，在事件处理时返回给用户
 * @param {String} layerKey 路线所在图层名称
 */
ol.LineFeature = function (optOptions, extProperties, layerKey) {
  var options = optOptions || {}

  var baseOptions = ol.obj.assign({}, options)
  // goog.base(this, (baseOptions));
  ol.Feature.call(this, /** @type {olx.layer.LayerOptions} */ (baseOptions))
  this.extProperties = extProperties
  this.layerKey = layerKey
}
ol.inherits(ol.LineFeature, ol.Feature)

ol.LineFeature.prototype.getExtProperties = function () {
  return this.extProperties
}

ol.LineFeature.prototype.setExtProperties = function (extProperties) {
  this.extProperties = extProperties
}

ol.LineFeature.prototype.getLayerKey = function () {
  return this.layerKey
}

ol.LineFeature.prototype.setLayerKey = function (layerKey) {
  this.layerKey = layerKey
}

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
  var options = optOptions || {}

  var baseOptions = ol.obj.assign({}, options)
  // goog.base(this, (baseOptions));
  ol.Feature.call(this, /** @type {olx.layer.LayerOptions} */ (baseOptions))
  this.extProperties = extProperties
  this.layerKey = layerKey
}
ol.inherits(ol.CountFeature, ol.Feature)

ol.CountFeature.prototype.getExtProperties = function () {
  return this.extProperties
}

ol.CountFeature.prototype.setExtProperties = function (extProperties) {
  this.extProperties = extProperties
}

ol.CountFeature.prototype.getLayerKey = function () {
  return this.layerKey
}

ol.CountFeature.prototype.setLayerKey = function (layerKey) {
  this.layerKey = layerKey
}

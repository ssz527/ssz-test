goog.provide('ol.layer.HDVector');
goog.provide('ol.DevFeature');


goog.require('ol');
goog.require('ol.layer.Vector');
goog.require('ol.Feature');
/*
此类是对ol.layer.Vector的一个扩展，扩展了layerKey字段，
扩展此字段的意义是能够在查找layer中的feature时，能够根据
想要的feature种类中查找，而无需遍历所有layer进行查找。
*/
ol.layer.HDVector = function(layerKey,opt_options) {
  var options = opt_options ?
      opt_options : /** @type {olx.layer.VectorOptions} */ ({});

  var baseOptions = ol.obj.assign({}, options);
 // goog.base(this, /** @type {olx.layer.LayerOptions} */ (baseOptions));
  ol.layer.Vector.call(this, /** @type {olx.layer.LayerOptions} */ (baseOptions));
  this.layerKey = layerKey;
};
ol.inherits(ol.layer.HDVector, ol.layer.Vector);

ol.layer.HDVector.prototype.getLayerKey = function() {
  return this.layerKey;
};

/*
此类是对ol.Feature的一个扩展，在ol3中已经没有了marker这个概念，
想在地图上添加设备点位，需要一个feature，为了迎合业务，所以对其
进行字段的扩展，用于存储设备信息，方便后续点位的操作

layerKey是为了在后续业务中能够直接判断出此点位类型，方便业务操作
*/
ol.DevFeature = function(opt_options,extProperties,layerKey) {
  var options = opt_options ?
      opt_options : ({});

  var baseOptions = ol.obj.assign({}, options);
  //goog.base(this, (baseOptions));
  ol.Feature.call(this, /** @type {olx.layer.LayerOptions} */ (baseOptions));
  this.extProperties = extProperties;
  this.layerKey = layerKey;
};
ol.inherits(ol.DevFeature, ol.Feature);

ol.DevFeature.prototype.getExtProperties = function() {
  return this.extProperties;
};

ol.DevFeature.prototype.setExtProperties = function(extProperties) {
   this.extProperties = extProperties;
};

ol.DevFeature.prototype.getLayerKey = function() {
  return this.layerKey;
};

ol.DevFeature.prototype.setLayerKey = function(layerKey) {
   this.layerKey = layerKey;
};

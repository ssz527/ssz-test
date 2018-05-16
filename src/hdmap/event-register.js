/**
 * filename: event-register.js
 * author: sunshengzhen
 * introduction: 各种地图事件的事件的统一管理注册类
 * 这里会定义地图上事件的默认处理函数，并根据事件的属性等进行业务处理
 */

// TODO: 地图应当有自身默认的事件处理方法，当用户没有注册事件监听时，进行地图默认事件处理，具体函数待完善

function getDefaultCallback (map, eventType) {
  return map.eventCallback[eventType].default
}

function getTargetMap (e) {
  return hdmap.mapManager[e.map.ol_uid]
}
var curZoom = 0
var eventRegister = {
  /**
   * eventType: singleclick
   * 单击事件注册的默认处理函数
   * @param {event} e 单击事件
   */
  singleclick: function (e) {
    var tarMap = getTargetMap(e)
    tarMap.closeCommonPopup()
    // 如果是正在进行划线或者区域选择点位状态，则此事件不处理
    if (!tarMap.getDrawLineState()) {
      // 获取click点的feature信息
      var feature = e.map.forEachFeatureAtPixel(e.pixel, function (
        feature,
        layer
      ) {
        return feature
      })
      var defaultCallback = getDefaultCallback(tarMap, 'singleclick')
      // 如果是单个的设备被点击,看是否有此类型的对应事件注册
      if (feature) {
        // 判断点击聚合
        var features = hdmap.utils.getFeaturesInExtent(tarMap, e.coordinate)
        // 过滤统计点位逻辑
        features = features.filter(function (item) {
          return item.imgUrl && item.markerType !== 'car'
        })
        if (features.length > 1 && feature instanceof ol.DevFeature) {
          tarMap.popupMultipoint(e.coordinate, features)
          return
        }
        // 单点位
        if (
          feature instanceof ol.DevFeature ||
          feature instanceof ol.AreaFeature ||
          feature instanceof ol.LineFeature ||
          feature instanceof ol.CountFeature
        ) {
          var featureType = feature.extProperties.markerType
          if (feature.extProperties.markerType === '' || null || undefined) {
            featureType = 'common'
          }
          var callback = tarMap.eventCallback.singleclick[featureType]
          var backEventObj = {
            feature: feature.extProperties,
            eventType: 'singleclick',
            coordinate: e.coordinate,
            layerKey: feature.layerKey,
            mapEvent: e
          }
          if (callback) {
            callback.call(this, backEventObj)
          } else if (defaultCallback !== null) {
            defaultCallback.call(this, backEventObj)
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
          })
        }
      }
    }
  },
  /**
   * eventType: selected
   * 点位选中事件监听
   * @param {event} e 事件
   */
  selected: function (e) {
    // TODO 选择点位事件处理
    var tarMap = getTargetMap(e)
    // 如果没有处于编辑状态，退出事件处理
    if (!tarMap.getDragState()) {
      return
    }
    // 获取到事件点位的feature对象
    var feature = e.map.forEachFeatureAtPixel(e.pixel, function (
      feature,
      layer
    ) {
      return feature
    })
    if (tarMap.eventCallback.selected.default !== null) {
      tarMap.eventCallback.selected.default.call(this, {
        feature: feature,
        eventType: 'selected',
        coordinate: e.coordinate
      })
    }
  },
  /**
   * eventType: cancelSelected
   * 取消选中事件监听
   * @param {event} e 事件
   */
  cancelSelected: function (e) {
    // TODO 取消选择点位事件处理
    var tarMap = getTargetMap(e)
    // 如果没有处于编辑状态，退出事件处理
    if (!tarMap.getDragState()) {
      return
    }
    // 获取到事件点位的feature对象
    var feature = e.map.forEachFeatureAtPixel(e.pixel, function (
      feature,
      layer
    ) {
      return feature
    })
    if (tarMap.eventCallback.cancelSelected.default !== null) {
      tarMap.eventCallback.cancelSelected.default.call(this, {
        feature: feature,
        eventType: 'cancelSelected',
        coordinate: e.coordinate
      })
    }
  },
  /**
   * eventType: pointermove
   * 鼠标移动事件监听
   * @param {event} e 事件
   */
  pointermove: function (e) {
    // TODO 鼠标移动事件监听
    var tarMap = getTargetMap(e)
    var vector = tarMap.getLayerByKey('gisLayer')
    // var vector = tarMap.getLayerByKey('gisLayer')
    // 获取用户注册的pointermove默认处理回调
    var defaultCallback = getDefaultCallback(tarMap, 'pointermove')
    // 区域相关的处理逻辑
    if (vector) {
      // 获取鼠标所在位置的feature
      var selectFeature = vector
        .getSource()
        .getFeaturesAtCoordinate(e.coordinate)
      if (selectFeature.length > 0) {
        // 判断区域是否设置visible属性，默认是false
        if (!selectFeature[0].extProperties.visible) {
          selectFeature[0].setStyle(hdmap.commonConfig.getMouseOverAreaStyle())
          // 获取图层上所有的feature
          var features = vector.getSource().getFeatures()
          for (var i = 0; i < features.length; i++) {
            if (!features[i].extProperties.visible && features[i].extProperties.id !== selectFeature[0].extProperties.id) {
              features[i].setStyle(null)
            }
          }
        }
        if (defaultCallback) {
          defaultCallback.call(this, {
            feature: selectFeature[0],
            eventType: 'pointermove',
            coordinate: e.coordinate
          })
        }
      } else {
        // 获取图层上所有的feature
        var featureicons = vector.getSource().getFeatures()
        for (var j = 0; j < featureicons.length; j++) {
          if (!featureicons[j].extProperties.visible) {
            featureicons[j].setStyle(null)
          }
        }
        if (defaultCallback) {
          defaultCallback.call(this, {
            feature: selectFeature[0],
            eventType: 'pointermove',
            coordinate: e.coordinate
          })
        }
      }
      return
    }
    if (defaultCallback) {
      defaultCallback.call(this, {
        feature: null,
        eventType: 'pointermove',
        coordinate: e.coordinate
      })
    }
  },
  /**
   * eventType: zoomChange
   * 地图等级变化事件监听
   * @param {event} e 事件
   */
  zoomChange: function (e) {
    var tarMap = hdmap.mapManager[this.ol_uid]
    var defaultCallback = getDefaultCallback(tarMap, 'zoomChange')
    var zoom = tarMap.getZoom();
    let nowZoom = parseInt(zoom)
    // 地图缩放时，控制层级的显示、隐藏
    if (curZoom !== nowZoom) {
      curZoom = nowZoom
      let layerArr = tarMap.outterLayers
      for (let item in layerArr) {
        let layer = layerArr[item]
        let lkey = layer.layerKey
        let zl = lkey.split('_')
        if (zl[1]) {
          if (curZoom >= parseInt(zl[1]) && layer.getVisibleFlag()) {
            tarMap.setLayerVisible(lkey, true)
          } else {
            tarMap.setLayerVisible(lkey, false)
          }
        }
      }
    }
    if (defaultCallback !== null) {
      defaultCallback.call(this, {
        zoom: zoom,
        eventType: 'zoomChange'
      })
    }
  },
  /**
   * eventType: movestart
   * 地图等级变化事件监听
   * @param {event} e 事件
   */
  movestart: function (e) {
    var tarMap = getTargetMap(e)
    var defaultCallback = getDefaultCallback(tarMap, 'movestart')
    if (defaultCallback !== null) {
      defaultCallback.call(this, {
        eventType: 'movestart'
      })
    }
  },
  /**
   * eventType: moveend
   * 地图等级变化事件监听
   * @param {event} e 事件
   */
  moveend: function (e) {
    var tarMap = getTargetMap(e)
    var defaultCallback = getDefaultCallback(tarMap, 'moveend')
    if (defaultCallback !== null) {
      defaultCallback.call(this, {
        eventType: 'moveend'
      })
    }
  }
}

export default eventRegister

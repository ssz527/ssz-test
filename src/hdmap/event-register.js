/*
  各种地图事件的事件的统一管理注册类
  注意:此类只是一个大体框架，具体实现还需要根据业务来填写
*/
//TODO: 这里需要将注册事件放到map对象上，当某个地图事件触发时也只执行该地图的事件，不应该是一个全部触发的
//TODO: 地图应当有自身默认的事件处理方法，当用户没有注册事件监听时，进行地图默认事件处理
var eventRegister = {
	callback : {
		singleclick: {}
	},
	register : function(callbackObj) {
		if(callbackObj.singleclick) {
			this.callback.singleclick[callbackObj.mapId] = callbackObj.singleclick;
		}
		if(callbackObj.dragstart) {
			this.callback.dragstart = callbackObj.dragstart;
		}
		if(callbackObj.dragend) {
			this.callback.dragend = callbackObj.dragend;
		}
		if(callbackObj.selected) {
			this.callback.selected = callbackObj.selected;
		}
		if(callbackObj.cancelSelected) {
			this.callback.cancelSelected = callbackObj.cancelSelected;
		}
	},
	singleclick : function(e) {
		var feature = e.map.forEachFeatureAtPixel(e.pixel,
								function(feature, layer) {
									return feature;
								});
		var tarMap = hdmap.mapManager[e.map.getTarget()];
		var type = 'old';
		if(!tarMap.getDrawLineState()&&!tarMap.getDrawShapeState()) {
			if(feature) {
				if(feature instanceof ol.DevFeature) {
					tarMap.popup(e.coordinate,'我是设备点位');
				}else {
					tarMap.popup(e.coordinate,'我是矢量图层点位');
				}
			}else {
				var id = new Date().valueOf();
				feature = tarMap.addMarker({id:id,position:e.coordinate,name:id,imgUrl:"icon.png",size:[32,48]},"testLayer");
				tarMap.closePopup();
				type = 'new';
			}
			if(eventRegister.callback.singleclick[e.map.getTarget()]) {
				eventRegister.callback.singleclick[e.map.getTarget()].call(this,e,feature,type);
			}
		}
		
		/*
			这是另外一种判断是否击中marker的方式
			var pixel = map.getEventPixel(e.originalEvent);
			var hit = map.hasFeatureAtPixel(pixel);
			if(hit) {
			}else {
			}
		*/
	},
	pointermove : function(e) {
		var tarMap = hdmap.mapManager[e.map.getTarget()];
		var vector = tarMap.getLayerByKey("gisLayer");
		if(vector) {
			var selectFeature = vector.getSource().getFeaturesAtCoordinate(e.coordinate);
			if(selectFeature.length > 0) {
				selectFeature[0].setStyle(style);
			}else {
				var features = vector.getSource().getFeatures();
				for(var i = 0;i < features.length;i++) {
					features[i].setStyle(null);
				}
			}
		}
	}
}

export default eventRegister;
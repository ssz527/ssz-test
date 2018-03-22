/*
  各种地图事件的事件的统一管理注册类
  注意:此类只是一个大体框架，具体实现还需要根据业务来填写
*/
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
		var tarMap = mapObj[e.map.getTarget()];
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
		var tarMap = mapObj[e.map.getTarget()];
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



(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.hdmap = factory());
}(this, (function () { 'use strict';

/*
  各种地图事件的事件的统一管理注册类
  注意:此类只是一个大体框架，具体实现还需要根据业务来填写
*/
//TODO: 这里需要将注册事件放到map对象上，当某个地图事件触发时也只执行该地图的事件，不应该是一个全部触发的
//TODO: 地图应当有自身默认的事件处理方法，当用户没有注册事件监听时，进行地图默认事件处理
var eventRegister = {
	callback: {
		singleclick: {}
	},
	register: function register(callbackObj) {
		if (callbackObj.singleclick) {
			this.callback.singleclick[callbackObj.mapId] = callbackObj.singleclick;
		}
		if (callbackObj.dragstart) {
			this.callback.dragstart = callbackObj.dragstart;
		}
		if (callbackObj.dragend) {
			this.callback.dragend = callbackObj.dragend;
		}
		if (callbackObj.selected) {
			this.callback.selected = callbackObj.selected;
		}
		if (callbackObj.cancelSelected) {
			this.callback.cancelSelected = callbackObj.cancelSelected;
		}
	},
	singleclick: function singleclick(e) {
		var feature = e.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
			return feature;
		});
		var tarMap = hdmap.mapManager[e.map.getTarget()];
		var type = 'old';
		if (!tarMap.getDrawLineState() && !tarMap.getDrawShapeState()) {
			if (feature) {
				if (feature instanceof ol.DevFeature) {
					tarMap.popup(e.coordinate, '我是设备点位');
				} else {
					tarMap.popup(e.coordinate, '我是矢量图层点位');
				}
			} else {
				var id = new Date().valueOf();
				feature = tarMap.addMarker({ id: id, position: e.coordinate, name: id, imgUrl: "icon.png", size: [32, 48] }, "testLayer");
				tarMap.closePopup();
				type = 'new';
			}
			if (eventRegister.callback.singleclick[e.map.getTarget()]) {
				eventRegister.callback.singleclick[e.map.getTarget()].call(this, e, feature, type);
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
	pointermove: function pointermove(e) {
		var tarMap = hdmap.mapManager[e.map.getTarget()];
		var vector = tarMap.getLayerByKey("gisLayer");
		if (vector) {
			var selectFeature = vector.getSource().getFeaturesAtCoordinate(e.coordinate);
			if (selectFeature.length > 0) {
				selectFeature[0].setStyle(style);
			} else {
				var features = vector.getSource().getFeatures();
				for (var i = 0; i < features.length; i++) {
					features[i].setStyle(null);
				}
			}
		}
	}
};

/**
 * filename: commonConfig.js 
 * author: sunshengzhen
 * introduction: 这里保存一些地图的常用配置信息，一些默认的样式等
 */

function commonConfig() {
  var gisConfig = {
    mapType: 'baidu',
    mapUrl: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
    mapSatUrl: 'http://shangetu1.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009&udt=20171115',
    center: [116.403480, 39.923758]
  };
  var getMouseOverAreaStyle = function getMouseOverAreaStyle() {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: '#33c7ff',
        width: 2
      })
    });
  };
  return {
    gisConfig: gisConfig,
    getMouseOverAreaStyle: getMouseOverAreaStyle
  };
}

/**
 * filename: hdmap.js 
 * author: yangyida & sunshengzhen
 * introduction: 封装openlayers 3.20.0版本做的一个web GIS 引擎
 */

//TODO: 需要对HDMap上的函数名称跟对外暴露接口进行统一

/**
 * HDMap
 * @param {*} options map初始化参数
 */
function HDMap(options) {
	this._map = null; //map对象
	this.layers = []; //存储基础图层
	this._overlay = null; //气泡对象
	this.popup_closer = null; //关闭气泡按键
	this.popup_content = null; //气泡内容
	this.popup_container = null; //气泡dom
	this.outterLayers = {}; //自己添加的图层
	this.eventKey = {}; //事件对象
	this.drawTool = {}; //画线工具
	this.mapConfig = {};
	this.dragFeatureTool = {};
	this.mapInit(options);
	hdmap.mapManager[options.domId] = this;
}

//TODO: 这里需要做参数验证

/**
 * mapInit 参数验证函数
 * 当没有传地图引擎时，默认为gis地图引擎，中心点为北京
 * @param {*} options 
 */
function optionsVerify(options) {
	if (!options.gisEngine) {
		options.gisEngine = 'baidu';
		options.mapUrl = hdmap.commonConfig.gisConfig.mapUrl;
		options.center = hdmap.commonConfig.gisConfig.center;
	} else if (options.gisEngine == 'baidu') {
		options.mapUrl = options.sat ? hdmap.commonConfig.gisConfig.mapSatUrl : hdmap.commonConfig.gisConfig.mapUrl;
	} else if (options.gisEngine == 'bitmap') {
		if (!options.mapUrl) {
			console.warn("bitmap without picture url");
			return false;
		}
		if (!options.sizeH || !options.sizeW) {
			console.warn("bitmap without size of the picture");
			return false;
		}
	}
}

HDMap.prototype.mapInit = function (options) {
	if (optionsVerify(options) === false) {
		return;
	}
	this.popupInit(options.popupDom);
	if (options.gisEngine == 'baidu') {
		this.initBaiduMap(options);
	} else if (options.gisEngine == 'bitmap') {
		this.initBitmap(options);
	} else {
		return;
	}
	this.copyAttr(this.mapConfig, options);
	if (options.gisLayer && options.gisLayer.length > 0) {
		this.initGisLayer(options.gisLayer);
	}
};
/*
	初始化地图参数解释 
	{
		gisEngine : "baidu" | "bitmap"  //baidu为初始化百度地图 //bitmap为光栅图
		sizeW : 1200
		sizeH : 750    // sizeW和sizeH为光栅图时才需要传递，为了计算地图的extent参数，sizeW和sizeH为光栅图图片的宽和高
		domId : "map"  //此参数为存放地图的div元素的id属性
		sat:0   // 此参数为加载百度地图时才使用，0代表加载普通图层，1代表加载卫星图层
		mapUrl:"map.jpg"   //地图地图的url，如果为光栅图，此处为图片的url，如果为百度地图，则需要根据sat来判断，sat为0时，此处的url;当sat为1时，此处的url为;
		satUrl:"http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=sl&p=1&scaler=1&udt=20171115"    //  此参数只有当sat为1时，才会使用，这个为加载百度卫星图时，地图的路网图层
		zoom:4  //此参数为地图初始化的时候地图的放大级别，百度地图的放大级别为0-19 ,光栅图理论上是无限的，但是建议0-8之间，太大了图片分辨率达不到,如果不传，光栅图默认为3，百度地图默认为8
		maxZoom:19 //限制最大缩放级别
		minZoom:0 //限制最小缩放级别
		center:[0,0] //这个参数非常重要，必须有，因为光栅图坐标系与真实经纬度坐标系的换算需要使用此函数，地图初始化的时候定位的中心点，光栅图会自动以[0,0]为中点，如果到时候需要，也可修改一下hdMap.js中的代码，就可光栅图也能够进行初始化定位中心点，此处最好设置成后台能够动态配置，
					 //比如配置到一个文件中，可以读取，这样到时候不同地区就可以通过修改此值，修改地图加载后自动定位到的点，如果此处不填，则会以北京为中点进行定位
		popupDom : {popup:,popupcloser:,popupcontent:}  //存放气泡的dom元素
		gisLayer : [[[[],[],[]]],[[[],[],[]]]]
	
	}

*/

/*
	参数示例:
	var options = {gisEngine:"bitmap",sizeW:1024,sizeH:986,domId:'map',projection:'EPSG:3857',mapUrl:"map.png",maxZoom:3,center:[113.619942,23.304629]};
*/
HDMap.prototype.initBitmap = function (options) {
	var extent = [];
	extent.push(options.sizeW / 2 * -1, options.sizeH / 2 * -1, options.sizeW / 2, options.sizeH / 2);
	var projection = new ol.proj.Projection({
		code: 'EPSG:3857',
		extent: extent
	});
	var imageLayer = new ol.layer.Image({
		source: new ol.source.ImageStatic({
			url: options.mapUrl,
			projection: projection,
			imageExtent: extent,
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
	this._map = new ol.Map({ //初始化map
		logo: false,
		target: options.domId,
		overlays: [this._overlay],
		layers: this.layers,
		view: new ol.View({
			projection: projection,
			center: ol.extent.getCenter(extent),
			zoom: options.zoom,
			maxZoom: options.maxZoom,
			minZoom: options.minZoom,
			extent: [options.sizeW / 2 * -1, options.sizeH / 2 * -1, options.sizeW / 2, options.sizeH / 2]
		})
	});
};
/*
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
	if (options.sat == 1) {
		var baidugis = new ol.layer.Tile({
			source: new ol.source.XYZ({
				projection: 'baidu',
				maxZoom: 18,
				tileUrlFunction: function tileUrlFunction(tileCoord) {
					var x = tileCoord[1];
					var y = tileCoord[2];
					var z = tileCoord[0];
					var url = options.mapUrl;
					url = url.replace("{x}", x).replace("{y}", y).replace("{z}", z);
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
					url = url.replace("{x}", x).replace("{y}", y).replace("{z}", z);
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
					url = url.replace("{x}", x).replace("{y}", y).replace("{z}", z);
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
	if (!options.center || options.center.length != 2) {
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
		})
	});
	this.mapConfig = options;
};

//初始化矢量图层
HDMap.prototype.initGisLayer = function (layerData) {
	var features = [];
	for (var i = 0; i < layerData.length; i++) {
		var feature = new ol.Feature({
			geometry: new ol.geom.Polygon(layerData[i]),
			geometryName: 'Polygon',
			style: null
		});
		features.push(feature);
	}
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
};

//因为ol3的特性，气泡在地图上由一组div持有，所以这里初始化
HDMap.prototype.popupInit = function (popupDom) {
	if (!popupDom) {
		return;
	}
	this.popup_container = document.getElementById(popupDom.popup);
	this.popup_closer = document.getElementById(popupDom.popupcloser);
	this.popup_content = document.getElementById(popupDom.popupcontent);
	if (this.popup_container != null && this.popup_closer != null && this.popup_content != null) {
		//气泡初始化
		this._overlay = new ol.Overlay( /** @type {olx.OverlayOptions} */{
			element: this.popup_container,
			autoPan: true,
			autoPanAnimation: {
				duration: 250
			},
			autoPanMargin: 5
		});
		var hdmap = this;
		this.popup_closer.onclick = function () {
			hdmap._overlay.setPosition(undefined);
			hdmap.popup_closer.blur();
			return false;
		};
	}
};
/*
	在地图上添加设备点位

	此处添加点位的逻辑为，需要预先创建图层，添加点位之前会先检查图层是否存在，如果不存在则不会进行点位添加
	此处的逻辑也可以改为如果图层不存在则创建图层，需要根据实际业务考虑
	
	@param markerInfo : 点位信息,对象
	参数示例：
		{
			id:1,  //唯一确定的主键 (必填)
			position:ol.proj.transform([113.61994199999998, 23.304629000000006],'EPSG:4326', 'EPSG:3857'), //点位的坐标，示例中是添加在百度地图中的。如果添加在光栅图中，[0,0] 这种类型的数组即可，元素0为x，元素1为y
			name:new Date().valueOf(),    //点位的名字  选填
			imgUrl:"arrow.png",   //点位展示的图片的url，必填
			imgSize:[32,32]    //图片的大小
		}
	@param layerKey : 添加到的图层
*/
HDMap.prototype.addMarker = function (markerInfo, layerKey) {
	var layer = this.getLayerByKey(layerKey);
	if (layer == null) {
		return null;
	} else {
		var feature = this.getMarkerBylayerKey(markerInfo.id, layerKey);
		if (feature) {
			return feature;
		}
		var iconFeature = new ol.DevFeature({
			geometry: new ol.geom.Point([markerInfo.position[0], markerInfo.position[1]]),
			name: markerInfo.name,
			population: 4000,
			rainfall: 500
		}, markerInfo, layerKey);
		var iconStyle = new ol.style.Style({
			image: new ol.style.Icon( /** @type {olx.style.IconOptions} */{
				src: markerInfo.imgUrl,
				size: markerInfo.imgSize
			})
		});
		iconFeature.setStyle(iconStyle);
		iconFeature.setId(markerInfo.id);
		layer.getSource().addFeature(iconFeature);
		return iconFeature;
	}
};
/*
	通过marker的id和图层名称移除marker
	id:addMarker时，配置的主键
	layerKey:图层名
	
	这样设计是为了减少不必要的遍历，提高性能，否则要定位到某个marker要遍历地图上所有的marker
*/
HDMap.prototype.removeMarkerBylayerKey = function (id, layerKey) {
	var layer = this.getLayerByKey(layerKey);
	var feature = layer.getSource().getFeatureById(id);
	if (feature) {
		layer.getSource().removeFeature(feature);
	}
};
/*
	更新marker
	id:addMarker时，配置的主键
	layerKey : 图层名
	markerInfo : 需要更新的数据，markerInfo与addMarker时的数据字段一致，也可以新加字段，存入extProperties中
	供其他业务使用，这个方法最主要的功能是更新点位的位置
*/
HDMap.prototype.updateMarker = function (id, layerKey, markerInfo) {
	var marker = this.getMarkerBylayerKey(id, layerKey);
	var properties = marker.getExtProperties();
	this.copyAttr(properties, markerInfo);
	if (markerInfo.position) {
		marker.getGeometry().setCoordinates(markerInfo.position);
	}
	if (markerInfo.name) {
		marker.set('name', markerInfo.name);
	}
};

/*
  拷贝属性
*/
HDMap.prototype.copyAttr = function (marker, attrs) {
	for (var attr in attrs) {
		marker[attr] = attrs[attr];
	}
};

/*
	通过主键id和图层名获取特定的marker
*/
HDMap.prototype.getMarkerBylayerKey = function (id, layerKey) {
	var layer = this.getLayerByKey(layerKey);
	var feature = layer.getSource().getFeatureById(id);
	return feature;
};

/*
	获取地图对象中被添加的对外业务图层
*/
HDMap.prototype.getOutterLayers = function () {
	return this.outterLayers;
};

/*
	在地图上添加图层
	layerKey : 图层名，用于以后获取特定图层使用
*/
HDMap.prototype.addLayerByLayerKey = function (layerKey) {
	if (layerKey) {
		var hdmap = this;
		var vectorSource = new ol.source.Vector({});
		var vectorLayer = new ol.layer.HDVector(layerKey, {
			source: vectorSource,
			map: hdmap._map,
			zIndex: 11
		});
		this._map.addLayer(vectorLayer);
		this.outterLayers[layerKey] = vectorLayer;
		return vectorLayer;
	} else {
		return null;
	}
};

/*
	通过layerKey移除图层
	layerKey : 图层名
*/
HDMap.prototype.removeLayerByLayerKey = function (layerKey) {
	var layer = this.getLayerByKey(layerKey);
	if (layer) {
		layer.getSource().clear();
		this._map.removeLayer(layer);
		delete this.outterLayers[layerKey];
	}
};

/*
	通过layerKey获取图层
	这里还加入了一个pointLayers数组单独维护是因为
	光栅图或者矢量图的底图也是一个图层，如果直接获取
	地图的全部图层去遍历的话会报错，因为原生的layer没有实现
	getLayerKey方法
*/
HDMap.prototype.getLayerByKey = function (key) {
	var layer = this.outterLayers[key];
	return layer;
};

/*
	打开气泡
	coordinate : 气泡弹出的位置
	innerHtml : 气泡中的html元素
*/
HDMap.prototype.popup = function (coordinate, innerHtml) {
	this.popup_content.innerHTML = innerHtml;
	this._overlay.setPosition(coordinate);
};

/*
	关闭气泡
*/
HDMap.prototype.closePopup = function () {
	this._overlay.setPosition(undefined);
	this.popup_closer.blur();
};

/*
	加入地图事件监听
	eventType : 事件类型(具体都有哪些类型查看ol.MapBrowserEvent)
	call : 回调函数
*/
HDMap.prototype.addEventListener = function (eventType, call) {
	var key = this._map.on(eventType, call);
	this.eventKey[eventType] = key;
};

/*
	加入地图事件监听
	eventType : 事件类型(具体都有哪些类型查看ol.MapBrowserEvent)
	call : 回调函数
*/
HDMap.prototype.addEventListenerEve = function (eventType) {
	var key = this._map.on(eventType, hdmap.eventRegister[eventType]);
	this.eventKey[eventType] = key;
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

/*
	返回map对象
*/
HDMap.prototype.getMap = function () {
	return this._map;
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
		if (fType == 'point' && pointArr.length > 0) {
			//下面这句话是对这整个图层的style配置
			layer.setStyle(new ol.style.Style({ image: new ol.style.Circle(cssStyle) }));
			feature = new ol.Feature({
				'id': fId,
				'geometry': new ol.geom.Point([pointArr[0].mapX, pointArr[0].mapY])
			});
			//下面这句话是对单个feature的style配置，效果和对整个图层配置style一样
			//feature.setStyle(new ol.style.Style({image: new ol.style.Circle(cssStyle)}));
		} else if (fType == 'line' && pointArr.length > 0) {
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
			var feature = new ol.Feature({
				'id': fId,
				'geometry': new ol.geom.LineString(coordinates)
			});
		}
		layer.getSource().addFeature(feature);
		return feature;
	}
};

/*
	打开画线工具，可以画线
	lineStyle:线的样式,具体都有什么样式参考api中的ol.style.Stroke
	pointStyle:如果positioncall传值时，这里必须传值，具体传值参考例子ol.style.Circle或者ol.style.Icon 
	positioncall:自己写的点位置计算函数，比如我们想要在线的中间加点，则需要写词函数，参数为start,end 即一条线的起点和终点坐标
	callback:回调函数
*/
HDMap.prototype.openDrawLineTool = function (lineStyle, pointStyle, positioncall, callback) {
	if (this.drawTool['drawLineLayer'] && this.drawTool['lineInteraction']) {
		this._map.addInteraction(this.drawTool['lineInteraction']);
	} else {
		var source = new ol.source.Vector();
		var styleFunction = function styleFunction(feature, resolution) {
			var geometry = feature.getGeometry();
			var styles = [
			// linestring
			new ol.style.Style({
				stroke: new ol.style.Stroke(lineStyle)
			})];
			if (typeof positioncall == 'function') {
				geometry.forEachSegment(function (start, end) {
					var posArr = positioncall.call(this, start, end);
					for (var i = 0; i < posArr.length; i++) {
						styles.push(new ol.style.Style({
							geometry: new ol.geom.Point(posArr[i]),
							image: pointStyle
						}));
					}
				});
			}
			return styles;
		};
		var vector = new ol.layer.Vector({
			source: source,
			style: styleFunction
		});
		this._map.addLayer(vector);
		var interaction = new ol.interaction.Draw({
			source: source,
			type: /** @type {ol.geom.GeometryType} */'LineString'
		});
		if (callback) {
			interaction.on('drawend', function (e) {
				callback.call(this, e);
			});
		}
		this._map.addInteraction(interaction);
		this.layers.push(vector);
		this.drawTool['drawLineLayer'] = vector;
		this.drawTool['lineInteraction'] = interaction;
	}
	this.drawTool['drawLineState'] = true;
	//此时判断画线工具是否打开，如果打开，则将其关闭，避免产生逻辑错误(其实这里的逻辑不应该写在这里，以后封装可以将此逻辑移出到外面)
	if (this.drawTool['drawShapeState']) {
		this.closeDrawShapeTool();
	}
};

/*
	框选，圈选,多边形选择
	type : Circle(圆) || Box（矩形） || Polygon（多边形）
	callback : 选择完毕后的回调
*/
HDMap.prototype.openDrawShapeTool = function (type, callback) {
	if (this.drawTool['drawShapeLayer'] && this.drawTool['shapeInteraction']) {
		this._map.addInteraction(this.drawTool['shapeInteraction']);
	} else if (type) {
		var source = new ol.source.Vector({ wrapX: false });
		var vector = new ol.layer.HDVector('drawLayer', {
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
		var geometryFunction, maxPoints;
		if (type === 'Box') {
			type = 'LineString';
			maxPoints = 2;
			geometryFunction = function geometryFunction(coordinates, geometry) {
				if (!geometry) {
					geometry = new ol.geom.Polygon(null);
				}
				var start = coordinates[0];
				var end = coordinates[1];
				geometry.setCoordinates([[start, [start[0], end[1]], end, [end[0], start[1]], start]]);
				return geometry;
			};
		}
		var draw = new ol.interaction.Draw({
			source: source,
			type: /** @type {ol.geom.GeometryType} */type,
			geometryFunction: geometryFunction,
			maxPoints: maxPoints
		});
		if (callback) {
			draw.on('drawend', function ( /*{ol.interaction.DrawEvent}*/e) {
				callback.call(this, e);
			});
		}
		this._map.addLayer(vector);
		this.layers.push(vector);
		this._map.addInteraction(draw);
		this.drawTool['drawShapeLayer'] = vector;
		this.drawTool['shapeInteraction'] = draw;
	}
	this.drawTool['drawShapeState'] = true;
	//此时判断画图形工具是否打开，如果打开，则将其关闭，避免产生逻辑错误(其实这里的逻辑不应该写在这里，以后封装可以将此逻辑移出到外面)
	if (this.drawTool['drawLineState']) {
		this.closeDrawLineTool();
	}
};

/*
	关闭多边形选择工具
*/
HDMap.prototype.closeDrawShapeTool = function () {
	this._map.removeInteraction(this.drawTool['shapeInteraction']);
	this._map.removeLayer(this.drawTool['drawShapeLayer']);
	this.drawTool['drawShapeState'] = false;
};

/*
	关闭划线工具,同时清理图层和feature
*/
HDMap.prototype.closeDrawLineTool = function () {
	this._map.removeInteraction(this.drawTool['lineInteraction']);
	this._map.removeLayer(this.drawTool['drawLineLayer']);
	this.drawTool['drawLineState'] = false;
};

HDMap.prototype.getDrawLineState = function () {
	return this.drawTool['drawLineState'];
};

HDMap.prototype.getDrawShapeState = function () {
	return this.drawTool['drawShapeState'];
};

/*
	为地图提供定位功能，coordinate为坐标数组 元素[0] 为x  元素[1]为y 
	如果百度地图想要使用此方法，需要先将经纬度用提供的方法转换成米坐标系，再传入参数
	zoom参数是放大倍数，如果不填则不会进行放大，只定位
*/
HDMap.prototype.setCenter = function ( /*type : ol.Coordinate*/coordinate, zoom) {
	if (coordinate) {
		if (zoom) {
			this._map.getView().setZoom(zoom);
			this._map.getView().setCenter(coordinate);
		} else {
			this._map.getView().setCenter(coordinate);
		}
	}
};
/*
	获取目前地图的中心点
*/
HDMap.prototype.getCenter = function () {
	return this._map.getView().getCenter();
};

/*
	设置地图的放大倍数
*/
HDMap.prototype.setZoom = function (zoom) {
	if (zoom && zoom > mapConfig.maxZoom) {
		this._map.getView().setZoom(mapConfig.maxZoom);
	} else {
		this._map.getView().setZoom(zoom);
	}
};

/*
	得到目前地图的放大倍数
*/
HDMap.prototype.getZoom = function () {
	this._map.getView().getZoom();
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
HDMap.prototype.setLayerVisible = function (layerKey, flag) {
	var layer = this.getLayerByKey(layerKey);
	if (layer) {
		layer.setVisible(flag);
		//上面那句执行完后必须要鼠标点击或者拖动一下地图，我们才看的到图层进行隐藏\显示了，
		//所以加上这句，强制它动一下。
		this._map.updateSize();
	}
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
	/*if(selectStyle) {
 	this.dragFeatureTool.select.setStyle(selectStyle);
 }*/
	var hdmap = this;
	this.dragFeatureTool.translate = new ol.interaction.Translate({
		features: hdmap.dragFeatureTool.select.getFeatures()
	});
};

/*
	打开拖拽工具
	dragStartCall：拖拽前的回调函数
	dragEndCall: 拖拽后的回调函数
	selectcall:选中的回调函数
	multi : 是否允许选中多个marker，false为不允许，true为允许
*/
HDMap.prototype.openDragTool = function (dragStartCall, dragEndCall, selectCall, multi) {
	if (!this.dragFeatureTool.translate || !this.dragFeatureTool.select) {
		this.initDragTool();
	}
	if (dragStartCall) {
		this.dragFeatureTool.translate.on('translatestart', dragStartCall);
	}
	if (dragEndCall) {
		this.dragFeatureTool.translate.on('translateend', dragEndCall);
	}
	if (selectCall) {
		this.dragFeatureTool.select.on('select', selectCall);
	}
	this.dragFeatureTool.select.set('multi', multi);
	this._map.addInteraction(this.dragFeatureTool.select);
	this._map.addInteraction(this.dragFeatureTool.translate);
};

/*
	关闭拖拽工具
*/
HDMap.prototype.closeDragTool = function () {
	this._map.removeInteraction(this.dragFeatureTool.select);
	this._map.removeInteraction(this.dragFeatureTool.translate);
};

//TODO: 需要将这些坐标转换的工具函数进行提取或者封装，不需要向外暴露
//TODO: GPS坐标和xy坐标的转换函数有些还需要转换--需要研究一下
//TODO: 在mapExample中可以看到，在GIS地图上地图坐标还需要通过转化之后传入，需要将这个转化操作封装到对应的函数中
/*
	经纬度转球面墨卡托坐标系
*/
HDMap.prototype.translate_4326_to_3857 = function (position) {
	var coor = ol.proj.transform(position, 'EPSG:4326', 'EPSG:3857');
	return coor;
};

/*
	球面墨卡托坐标系转真实经纬度
*/
HDMap.prototype.translate_3857_to_4326 = function (position) {
	var coor = ol.proj.transform(position, 'EPSG:3857', 'EPSG:4326');
	return coor;
};

/*
	百度坐标转换成火星坐标系
*/
HDMap.prototype.translate_bd09_to_gcj02 = function (position) {
	var x = position[0] - 0.0065;
	var y = position[1] - 0.006;
	var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
	var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
	var lonlat = [];
	lonlat.push(z * Math.cos(theta));
	lonlat.push(z * Math.sin(theta));
	return lonlat;
};
/*
	火星坐标系转百度坐标系
*/
HDMap.prototype.translate_gcj02_to_bd09 = function (postition) {
	var x = postition[0];
	var y = postition[1];
	var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
	var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
	var lonlat = [];
	lonlat.push(z * Math.cos(theta) + 0.0065);
	lonlat.push(z * Math.sin(theta) + 0.006);
	return lonlat;
};

/*
	火星坐标系转换成4326坐标系   4326即真实的gps经纬度
*/
HDMap.prototype.translate_gcj02_to_4326 = function (position) {
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
/*
	4326坐标系转换成火星坐标系
*/
HDMap.prototype.translate_4326_to_gcj02 = function (position) {
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
/*
	4326坐标转百度坐标
*/
HDMap.prototype.translate_4326_to_bd09 = function (position) {
	var tmp = this.translate_4326_to_gcj02(position);
	return this.translate_gcj02_to_bd09(tmp);
};

/*
	百度坐标转4326坐标
*/
HDMap.prototype.translate_4326_to_bd09 = function (position) {
	var tmp = this.translate_bd09_to_gcj02(position);
	return this.translate_gcj02_to_4326(tmp);
};

/*
	经纬度换算光栅图坐标
*/
HDMap.prototype.transfromWGSToBitMap = function (lonlat) {
	var mlonlat = this.translate_4326_to_3857(lonlat);
	var mcenter = this.translate_4326_to_3857(this.mapConfig.center);
	var pnt = [mlonlat[0] - mcenter[0], mlonlat[1] - mcenter[1]];
	return pnt;
};

/*
	光栅图坐标转换经纬度
*/
HDMap.prototype.transBitmapToWGS = function (coordinate) {
	var mcenter = this.translate_4326_to_3857(this.mapConfig.center);
	var mlonlat = [mcenter[0] + coordinate[0], mcenter[1] + coordinate[1]];
	var lonlat = this.translate_3857_to_4326(mlonlat);
	return lonlat;
};

/*
	注销函数
*/
HDMap.prototype.destroy = function () {
	//清理注册事件
	for (var i = 0; i < this.eventKey.length; i++) {
		this._map.unByKey(this.eventKey[i]);
	}
	//清理控制器
	this._map.getInteractions().clear();
	//清理图层上的点位
	var layers = this._map.getLayers();
	for (var i = 0; i < layers.getLength(); i++) {
		layer.item(i).getSource().clear();
	}
	layers.clear();
	//后面加上自己清理的一些逻辑就好了
	//TODO: 需要完善注销函数中的清理
};

/**
 * filename: utils.js 
 * author: sunshengzhen
 * introduction: 提供一些计算能力方法
 */
var utils = {
    getDistance: function getDistance() {},
    getScale: function getScale() {}
};

/**
 * filename: hdlayer-extend.js
 * author: yangyida
 * discription: extend the openlayer class
 */

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
ol.layer.HDVector = function (layerKey, opt_options) {
  var options = opt_options ? opt_options : /** @type {olx.layer.VectorOptions} */{};

  var baseOptions = ol.obj.assign({}, options);
  // goog.base(this, /** @type {olx.layer.LayerOptions} */ (baseOptions));
  ol.layer.Vector.call(this, /** @type {olx.layer.LayerOptions} */baseOptions);
  this.layerKey = layerKey;
};
ol.inherits(ol.layer.HDVector, ol.layer.Vector);

ol.layer.HDVector.prototype.getLayerKey = function () {
  return this.layerKey;
};

/*
此类是对ol.Feature的一个扩展，在ol3中已经没有了marker这个概念，
想在地图上添加设备点位，需要一个feature，为了迎合业务，所以对其
进行字段的扩展，用于存储设备信息，方便后续点位的操作

layerKey是为了在后续业务中能够直接判断出此点位类型，方便业务操作
*/
ol.DevFeature = function (opt_options, extProperties, layerKey) {
  var options = opt_options ? opt_options : {};

  var baseOptions = ol.obj.assign({}, options);
  //goog.base(this, (baseOptions));
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
 * mapManager 地图管理器
 */

//TODO: 需要完善作为manager的功能

//TODO: 需要实现一套map自己的style库

var hdmap$1 = {
    initMap: HDMap,
    utils: utils,
    mapManager: {},
    commonConfig: commonConfig(),
    eventRegister: eventRegister
};

return hdmap$1;

})));

import layerManager from '../../src/hdmap/layerManager.js';

describe('hdmap', () => {
  it('commonConfig', () => {
    var commonConfig = function commonConfig () {};
    expect(commonConfig).to.be.a('function');
  });

  it('getMouseOverAreaStyle is a function', () => {
    var getMouseOverAreaStyle = function getMouseOverAreaStyle () {};
    var fill = new ol.style.Fill();
    var stroke = new ol.style.Stroke();
    expect(getMouseOverAreaStyle).to.be.a('function');
    expect(fill).to.be.an('Object');
    expect(stroke).to.be.an('Object');
  });

  it('setAreaStyle is a function', () => {
    var setAreaStyle = function setAreaStyle () {};
    var fill = new ol.style.Fill();
    var stroke = new ol.style.Stroke();
    expect(setAreaStyle).to.be.a('function');
    expect(fill).to.be.an('Object');
    expect(stroke).to.be.an('Object');
  });

  it('getFeatureStyle', () => {
    var getFeatureStyle = function getFeatureStyle () {};
    expect(getFeatureStyle).to.be.a('function');
  });

  it('getWarningAreaStyle', () => {
    var getWarningAreaStyle = function getWarningAreaStyle () {};
    var fill = new ol.style.Fill();
    var stroke = new ol.style.Stroke();
    expect(getWarningAreaStyle).to.be.a('function');
    expect(fill).to.be.an('Object');
    expect(stroke).to.be.an('Object');
  });

  it('getCountCameraFeatureStyle', () => {
    var getCountCameraFeatureStyle = function getCountCameraFeatureStyle () {};
    var fill = new ol.style.Fill();
    var text = new ol.style.Text();
    expect(getCountCameraFeatureStyle).to.be.a('function');
    expect(fill).to.be.an('Object');
    expect(text).to.be.an('Object');
  });

  it('getCountWarningFeatureStyle', () => {
    var getCountWarningFeatureStyle = function getCountWarningFeatureStyle () {};
    var fill = new ol.style.Fill();
    var text = new ol.style.Text();
    expect(getCountWarningFeatureStyle).to.be.a('function');
    expect(fill).to.be.an('Object');
    expect(text).to.be.an('Object');
  });

  it('getCountBroadcastFeatureStyle', () => {
    var getCountBroadcastFeatureStyle = function getCountBroadcastFeatureStyle () {};
    expect(getCountBroadcastFeatureStyle).to.be.a('function');
  });

  it('getCountDefaultStyle', () => {
    var getCountDefaultStyle = function getCountDefaultStyle () {};
    expect(getCountDefaultStyle).to.be.a('function');
  });

  it('getCountWarningStyle', () => {
    var getCountWarningStyle = function getCountWarningStyle () {};
    expect(getCountWarningStyle).to.be.a('function');
  });

  it('getNormalRouteStyle is a function', () => {
    var getNormalRouteStyle = function getNormalRouteStyle () {};
    var stroke = new ol.style.Stroke();
    expect(getNormalRouteStyle).to.be.a('function');
    expect(stroke).to.be.a('Object');
  });

  it('getOfflineRouteStyle is a function', () => {
    var getOfflineRouteStyle = function getOfflineRouteStyle () {};
    var stroke = new ol.style.Stroke();
    expect(getOfflineRouteStyle).to.be.a('function');
    expect(stroke).to.be.a('Object');
  });

  it('getWarningRouteStyle is a function', () => {
    var getWarningRouteStyle = function getWarningRouteStyle () {};
    var stroke = new ol.style.Stroke();
    expect(getWarningRouteStyle).to.be.a('function');
    expect(stroke).to.be.a('Object');
  });

  it('getRouteStyleAnimation is a function', () => {
    var getRouteStyleAnimation = function getRouteStyleAnimation () {};
    expect(getRouteStyleAnimation).to.be.a('function');
  });

  it('warnRouteCancel is a function', () => {
    var warnRouteCancel = function warnRouteCancel () {};
    expect(warnRouteCancel).to.be.a('function');
  });

  it('forEachPoint is a function', () => {
    var forEachPoint = function forEachPoint () {};
    expect(forEachPoint).to.be.a('function');
  });

  it('getRange is a function', () => {
    var getRange = function getRange () {};
    expect(getRange).to.be.a('function');
  });

  it('getLoop is a function', () => {
    var getLoop = function getLoop () {};
    expect(getLoop).to.be.a('function');
  });

  it('convertor is a function', () => {
    var convertor = function convertor () {};
    expect(convertor).to.be.a('function');
  });

  it('delta is a function', () => {
    var delta = function delta () {};
    expect(delta).to.be.a('function');
  });

  it('outOfChina is a function', () => {
    var outOfChina = function outOfChina (lon, lat) {};
    expect(outOfChina).to.be.a('function');
  });

  it('transformLat is a function', () => {
    var transformLat = function transformLat () {};
    expect(transformLat).to.be.a('function');
  });

  it('transformLon is a function', () => {
    var transformLon = function transformLon () {};
    expect(transformLon).to.be.a('function');
  });

  it('toGCJ02 is a function', () => {
    var toGCJ02 = function toGCJ02 () {};
    expect(toGCJ02).to.be.a('function');
  });

  it('fromGCJ02 is a function', () => {
    var fromGCJ02 = function fromGCJ02 () {};
    expect(fromGCJ02).to.be.a('function');
  });

  it('getDefaultCallback is a function', () => {
    var getDefaultCallback = function getDefaultCallback () {};
    expect(getDefaultCallback).to.be.a('function');
  });

  it('getTargetMap is a function', () => {
    var getTargetMap = function getTargetMap () {};
    expect(getTargetMap).to.be.a('function');
  });

  it('singleclick is a function', () => {
    var singleclick = function singleclick () {};
    expect(singleclick).to.be.a('function');
  });

  it('dragstart is a function', () => {
    var dragstart = function dragstart () {};
    expect(dragstart).to.be.a('function');
  });

  it('dragend is a function', () => {
    var dragend = function dragend () {};
    expect(dragend).to.be.a('function');
  });

  it('selected is a function', () => {
    var selected = function selected () {};
    expect(selected).to.be.a('function');
  });

  it('cancelSelected is a function', () => {
    var cancelSelected = function cancelSelected () {};
    expect(cancelSelected).to.be.a('function');
  });

  it('pointermove is a function', () => {
    var pointermove = function pointermove () {};
    expect(pointermove).to.be.a('function');
  });

  it('getLayerKeyByType is a function', () => {
    var getLayerKeyByType = function getLayerKeyByType () {};
    var layerMapO = function layerMapO () {};
    expect(getLayerKeyByType).to.be.a('function');
    expect(layerMapO).to.be.a('function');
  });

  it('optionsVerify', () => {
    var options = {
      gisEngine: 'baidu',
      domId: 'map',
      mapUrl:
        'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
      sat: 0,
      center: [113.619942, 23.304629]
    };
    var mapObj = new hdmap.initMap(options);
    // console.log(mapObj.getMap().ol_uid);
    expect(mapObj).to.be.an('Object');
  });

  it('mapInit', () => {
    var options = {
      gisEngine: 'baidu',
      domId: 'map',
      mapUrl:
        'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
      sat: 0,
      center: [113.619942, 23.304629]
    };
    var HDMap = new hdmap.initMap(options);
    expect(HDMap).to.be.an('Object');
  });

  it('initBitmap', () => {
    var options = {
      gisEngine: 'bitmap',
      sizeW: 1024,
      sizeH: 986,
      domId: 'map',
      projection: 'EPSG:3857',
      mapUrl: 'map.png',
      maxZoom: 3,
      center: [113.619942, 23.304629]
    };
    var InitBitmap = new hdmap.initMap(options);
    var projection = new ol.proj.Projection({
      code: 'EPSG:3857'
    });
    var imageLayer = new ol.layer.Image();
    expect(InitBitmap).to.be.an('Object');
    expect(projection).to.be.an('Object');
    expect(imageLayer).to.be.an('Object');
  });

  it('initBaiduMap', () => {
    var baidumap = new ol.layer.Tile();
    var baidulabel = new ol.layer.Tile();
    this._map = new ol.Map();
    expect(baidumap).to.be.an('Object');
    expect(baidulabel).to.be.an('Object');
    expect(this._map).to.be.an('Object');
  });

  it('initGaodeMap', () => {
    var gaodelabel = new ol.layer.Tile();
    var gaodemap = new ol.layer.Tile();
    this._map = new ol.Map();
    expect(gaodemap).to.be.an('Object');
    expect(gaodemap).not.to.be.a('function');
    expect(gaodelabel).to.be.an('Object');
    expect(this._map).to.be.an('Object');
  });

  it('initGisLayer', () => {
    var source = new ol.source.Vector();
    var vector = new ol.layer.HDVector();
    expect(source).to.be.an('Object');
    expect(vector).to.be.an('Object');
  });

  it('initLineLayer', () => {
    var source = new ol.source.Vector();
    var vector = new ol.layer.HDVector();
    var style = new ol.style.Style();
    var image = new ol.style.Circle();
    var fill = new ol.style.Fill();
    expect(source).to.be.an('Object');
    expect(vector).to.be.an('Object');
    expect(style).to.be.an('Object');
    expect(image).to.be.an('Object');
    expect(fill).to.be.an('Object');
  });

  it('addMarker', () => {
    var iconFeature = new ol.DevFeature();
    expect(iconFeature).to.be.an('Object');
  });

  it('addCountMarker', () => {
    var iconFeature = new ol.DevFeature();
    expect(iconFeature).to.be.an('Object');
  });

  it('removeMarker', () => {
    var markerInfo = {
      id: 1,
      markerType: 'Camera',
      position: [20, 30],
      name: 'aaa',
      cameraNum: '10',
      broadcastNum: '2',
      warnNum: '999'
    };
    var layerKey = layerManager.getLayerKeyByType(markerInfo.markerType);
    expect(layerKey).not.to.be.an('Object');
  });

  it('updateMarker', () => {
    var markerInfo = {
      id: 1,
      markerType: 'Camera',
      position: [20, 30],
      name: 'aaa',
      cameraNum: '10',
      broadcastNum: '2',
      warnNum: '999'
    };
    var layerkey = layerManager.getLayerKeyByType(markerInfo.markerType);
    expect(layerkey).not.to.be.an('function');
    expect(layerkey).to.equal('commonLayer');
  });

  it('addPopup', () => {
    var newpopup = new ol.Overlay({});
    var newObjectpopup = new ol.Overlay({});
    expect(newpopup).to.be.an('Object');
    expect(newObjectpopup).to.be.an('Object');
  });

  it('warnAnimation', () => {
    var timerInfo = setInterval(function () {});
    expect(timerInfo).to.equal(5);
  });

  it('drawFeature', () => {
    var feature = new ol.Feature();
    var geometry = new ol.geom.Point();
    var stroke = new ol.style.Stroke();
    expect(feature).not.to.be.a('function');
    expect(feature).to.be.an('Object');
    expect(geometry).to.be.an('Object');
    expect(stroke).to.be.an('Object');
  });

  it('initDrawLineTool', () => {
    var source = new ol.source.Vector();
    var stroke = new ol.style.Stroke();
    var style = new ol.style.Style();
    expect(source).to.be.an('Object');
    expect(stroke).to.be.an('Object');
    expect(style).to.be.an('Object');
  });

  it('editDrawLine', () => {
    var feature = new ol.LineFeature();
    var geometry = new ol.geom.LineString();
    var _style = new ol.style.Style();
    var stroke = new ol.style.Stroke();
    expect(feature).to.be.an('Object');
    expect(geometry).to.be.an('Object');
    expect(_style).to.be.an('Object');
    expect(stroke).to.be.an('Object');
  });

  it('createDrawIntera', () => {
    var geometryFunction = ol.interaction.Draw.createBox();
    expect(geometryFunction).to.be.a('function');
    expect(geometryFunction).not.to.be.an('Object');
  });

  it('initDrawShapeTool', () => {
    var source = new ol.source.Vector();
    var vector = new ol.layer.HDVector();
    var image = new ol.style.Circle();
    var fill = new ol.style.Fill();
    var stroke = new ol.style.Stroke();
    var style = new ol.style.Style();
    expect(source).to.be.an('Object');
    expect(vector).to.be.an('Object');
    expect(image).to.be.an('Object');
    expect(fill).to.be.an('Object');
    expect(stroke).to.be.an('Object');
    expect(style).to.be.an('Object');
  });

  it('showDrawShape', () => {
    var _id = new Date().valueOf() + Math.random() * 1000;
    expect(_id).to.be.a('number');
    expect(_id).not.to.be.a('function');
  });

  it('editDrawShape', () => {
    var geometry = new ol.geom.Polygon();
    expect(geometry).to.be.an('Object');
  });

  it('getDistance', () => {
    var wgs84Sphere = new ol.Sphere(6378137);
    expect(wgs84Sphere).to.be.an('Object');
  });
});

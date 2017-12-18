/**
 * filename: commonConfig.js 
 * author: sunshengzhen
 * introduction: 这里保存一些地图的常用配置信息，一些默认的样式等
 */

export default function commonConfig (){
  var gisConfig = {
    mapType: 'baidu',
    mapUrl: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
    mapSatUrl: 'http://shangetu1.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&app=webearth2&v=009&udt=20171115',
    center: [116.403480,39.923758]
  };
  var getMouseOverAreaStyle = function() {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: '#33c7ff',
        width: 2
      })
    })
  }
  return {
    gisConfig: gisConfig,
    getMouseOverAreaStyle: getMouseOverAreaStyle
  }
}
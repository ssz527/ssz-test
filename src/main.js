import '../dist/hdmap.min.js'

window.onload = function() {
    window.mapObj = {};
    window.map1 = new hdmap.initMap({
        gisEngine:'baidu',
        domId:'map1',
        mapUrl:'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
        sat:0,
        center:[113.619942,23.304629],
        popupDom:{popup:'popup',popupcloser:'popup-closer',popupcontent:'popup-content'}
    });
    window.map2 = new hdmap.initMap({
        gisEngine:'baidu',
        domId:'map2',
        mapUrl:'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
        sat:0,
        center:[110.619942,25.304629],
        popupDom:{popup:'popup2',popupcloser:'popup-closer2',popupcontent:'popup-content2'}
    });
    map1.addEventListenerEve('singleclick');
    // map2.addEventListenerEve('singleclick');
    hdmap.eventRegister.register({
        mapId: 'map1',
        singleclick : function(e,feature,type){
            console.log('single click event');
            //如果是新增的就会加入在textarea中加入坐标，上面的参数根据需要自己修改
            if(type == 'new') {
                var text = $("#markertextarea").html();
                if(feature){
                    text += '(' + feature.getId() + ',' + e.coordinate + ')';
                } else {
                    text += '未取得值';
                }
                $("#markertextarea").html(text);
            }
        }
    });
}
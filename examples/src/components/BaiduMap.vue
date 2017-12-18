<template>
    <div class="map-container">
        <div id="bitmap"></div>
        <div id="mapBaidu"></div>
        <div id="baidumap"></div>
    </div>
</template>
<script>
import mapImg from '@/assets/images/u768.jpg'

export default {
    name: 'BaiduMap',
    data () {
        return {
            mapBaidu: null,
            bitmap: null
        }
    },
    mounted () {
        console.log('mounted')

        var map = new BMap.Map('baidumap')
        map.centerAndZoom(new BMap.Point(121.491, 31.233), 11)
        map.enableScrollWheelZoom(true)
        map.addControl(new BMap.NavigationControl())
        map.addControl(new BMap.ScaleControl())
        map.addControl(new BMap.OverviewMapControl())

        console.log('hdmap create')

        // eslint-disable-next-line
        this.mapBaidu = new hdmap.initMap({
            gisEngine: 'baidu',
            domId: 'mapBaidu',
            mapUrl: 'http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115',
            sat: 0,
            center: [113.619942, 23.304629],
            popupDom: { popup: 'popup', popupcloser: 'popup-closer', popupcontent: 'popup-content' }
        })

        // eslint-disable-next-line
        this.bitmap = new hdmap.initMap({
            gisEngine: 'bitmap',
            sizeW: 1920,
            sizeH: 1080,
            domId: 'bitmap',
            mapUrl: mapImg,
            maxZoom: 3,
            minZoom: 3,
            center: [112.334403, 39.8],
            popupDom: {
                popup: 'popup',
                popupcloser: 'popup-closer',
                popupcontent: 'popup-content'
            }
        })
    }
}
</script>
<style>
.map-container {
    width: 100%;
    height: 500px;
}
#baidumap {
    height: 50%;
}
</style>
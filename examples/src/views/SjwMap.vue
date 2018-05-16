<template>
  <div class="map-container">
    <div id="bitmap"></div>
    <div class="item">
      <h4>从地图上选取点位坐标</h4>
      <div>
        <el-input type="text" class="valText" v-model="pointA" placeholder="点位坐标1"></el-input>
        <el-input type="text" class="valText" v-model="pointB" placeholder="点位坐标2"></el-input>
        <el-input type="text" class="valText" v-model="pointC" placeholder="点位坐标3"></el-input>
      </div>
      <div>
        <el-input type="text" class="valText" value="113.623583, 23.301617"></el-input>
        <el-input type="text" class="valText" value="113.624305, 23.300673"></el-input>
        <el-input type="text" class="valText" value="113.622706, 23.299229"></el-input>
      </div>
    </div>
    <div class="calculate">
      <div>
        <el-button class="btn" @click="btn3">中心点计算</el-button>
        <el-input type="text" v-model="centerGPS" class="input-small"></el-input>
      </div>
      <div>
        <el-button class="btn" @click="btn4">计算偏移比例尺</el-button>
        <el-input type="text" v-model="scale" class="input-small"></el-input>
      </div>
      <div>
        <el-button class="btn" @click="btn1">计算两GPS点距离</el-button>
        <el-input type="text" v-model="distance1" class="input-small success"></el-input>
      </div>
      <div>
        <el-button class="btn" @click="btn2">计算两个点位距离</el-button>
        <el-input type="text" v-model="distance2" class="input-small"></el-input>
      </div>
      <div>
        <el-button class="btn" @click="btn5">计算地图旋转角度</el-button>
        <el-input type="text" v-model="transitionAngle" class="input-small"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import mapImg from '@/assets/images/hdmap.png';

export default {
  name: 'SjwMap',
  data () {
    return {
      // eslint-disable-next-line
      lonlatA: [113.623583, 23.301617],
      // lonlatB: [113.624305, 23.300673],
      // lonlatC: [113.622706, 23.299229],
      lonlatC: [113.624305, 23.300673],
      lonlatB: [113.622706, 23.299229],
      pointA: [11.1328125, 50.390625],
      pointB: '',
      pointC: '',
      coordinates: [],
      distance1: '',
      distance2: '',
      centerGPS: '',
      transitionAngle: ''
      // initText: 'init'
    }
  },
  mounted () {
    // console.log(Math.atan2(3, -30) * 180 / Math.PI)
    // console.log(Math.atan2(2, -2) * 180 / Math.PI)
    var a = Math.atan2(2, -2) * 180 / Math.PI
    var b = Math.atan2(1 - Math.sqrt(3), 1 + Math.sqrt(3)) * 180 / Math.PI
    var c = Math.atan2(-2, -1) * 180 / Math.PI
    // // var d = Math.atan2(2, 2) * 180 / Math.PI
    // // var e = Math.atan2(-2, 2) * 180 / Math.PI
    // var e = Math.atan2(-3, -3) * 180 / Math.PI
    console.log(a, b, c)
    // console.log(d - a)
    // console.log(e - c)
    // console.log(Math.atan2(Math.sqrt(3) + 1, 1 - Math.sqrt(3)) * 180 / Math.PI)
    // var map = new BMap.Map("sjwmap");
    // eslint-disable-next-line
    this.bitmap = new hdmap.initMap({
      gisEngine: 'bitmap',
      domId: 'bitmap',
      sizeW: 800,
      sizeH: 600,
      mapUrl: mapImg,
      maxzoom: 3,
      minzoom: 3,
      center: [113.62347582567831, 23.301070034352808],
      centerGPS: [113.62346465365766, 23.301070641626044]
    });
    console.log(this.bitmap)
    // 注册单击事件
    var that = this;
    this.bitmap.regEventListener('singleclick', function (e) {
      if (e.feature) {
        // text += "(" + e.feature.getId() + "：[" + e.coordinate + "])\n";
      } else {
        console.log(e)
        // text += "未取得值";
        if (!that.bitmap.getMapEditState()) {
          let coordinate = e.coordinate;
          that.coordinates.push(coordinate);
        }
      }
      that.pointA = that.coordinates[0];
      that.pointB = that.coordinates[1];
      that.pointC = that.coordinates[2];
    });
  },

  methods: {
    // GPS两点的距离
    btn1 () {
      this.distance1 = hdmap.utils.getDistanceByGPS(this.bitmap, this.lonlatA, this.lonlatB)
    },
    // btn1: function() {
    //   function rad(d) {
    //     return d * Math.PI / 180.0
    //   }
    //   let that = this;
    //   let radLat1 = rad(that.lonlatA[1])
    //   let radLat2 = rad(that.lonlatB[1])
    //   let a = radLat1 - radLat2
    //   let b = rad(that.lonlatA[0]) - rad(that.lonlatB[0])
    //   let distance =  2 * Math.asin( Math.sqrt( Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    //   that.distance1 = Math.round(distance * 6378137 * 100) / 100 
    //   console.log(that.distance1)
    // },


    // 两坐标点的距离
    btn2 () {
      this.distance2 = hdmap.utils.getDistanceByBitmap(this.bitmap, {
        lonlatA: this.lonlatA,
        lonlatB: this.lonlatB,
        lonlatC: this.lonlatC
      }, {
        pointA: [11.1328125, 50.390625],
        pointB: [-62.008974365169735, -165.02012998288635],
        pointC: [68.89766570059817, -37.086604154633946]
        })
    },
    btn5 () {
      this.transitionAngle = hdmap.utils.getArcAngle(this.bitmap, {
        lonlatA: this.lonlatA,
        lonlatB: this.lonlatB,
        lonlatC: this.lonlatC
      }, {
        pointA: [11.1328125, 50.390625],
        pointB: [-62.008974365169735, -165.02012998288635],
        pointC: [68.89766570059817, -37.086604154633946]
        })
      console.log(this.bitmap.transBitmapToLonlat(this.pointA))
      // [113.62356466141391, 23.301486387710398]
      console.log(this.bitmap.transfromLonlatToBitmap(this.lonlatA))
      // [13.174254566431049, 66.22155803442001]
    },
    // btn2: function() {
    //   // 光栅图坐标换算经纬度
    //   var that = this;
    //   console.log(that.bitmap.mapConfig.center)
    //   var mcenter = that.bitmap.translate_4326_to_3857(that.bitmap.mapConfig.center);
    //   // var mcenter = that.bitmap.translate_4326_to_3857(that.bitmap.translate_4326_to_bd09(that.bitmap.mapConfig.center))
    //   console.log(mcenter)

    //   var pntAX = that.pointA[0]*that.scale;
    //   var pntAY = that.pointA[1]*that.scale;
    //   var pntBX = that.pointB[0]*that.scale;
    //   var pntBY = that.pointB[1]*that.scale;
    //   var pntCX = that.pointC[0]*that.scale;
    //   var pntCY = that.pointC[1]*that.scale;    //   var pntBY = that.pointB[1]*that.scale;
    //   var pntCX = that.pointC[0]*that.scale;
    //   var pntCY = that.pointC[1]*that.scale;

    //   var mlonlat1 = [mcenter[0] + pntAX, mcenter[1] + pntAY];
    //   var lonlatA = that.bitmap.translate_3857_to_4326(mlonlat1);
    //   console.log(lonlatA);

    //   var mlonlat2 = [mcenter[0] + pntBX, mcenter[1] + pntBY];
    //   var lonlatB = that.bitmap.translate_3857_to_4326(mlonlat2);
    //   console.log(lonlatB);

    //   that.distance2 = that.bitmap.getDistance(lonlatA, lonlatB)
    // },

    // 计算中心点
    btn3 () {
      this.centerGPS = hdmap.utils.setCenterGPS(this.bitmap, {
        lonlatA: this.lonlatA,
        lonlatB: this.lonlatB,
        lonlatC: this.lonlatC
      }, {
        pointA: [11.1328125, 50.390625],
        pointB: [-62.008974365169735, -165.02012998288635],
        pointC: [68.89766570059817, -37.086604154633946]
        })
      console.log(this.bitmap.transBitmapToLonlat(this.pointA))
      console.log(this.bitmap.transfromLonlatToBitmap(this.lonlatA))
      // 10.3515625,51.023910984848484
    },
    // btn3: function() { 
    //   var lon, lon1, lon2, lon3;
    //   var lat, lat1, lat2, lat3;
    //   var that = this;

    //   // 计算AB两个GPS的中心点
    //   lon1 = that.lonlatA[0] - (that.lonlatB[0] - that.lonlatA[0]) * that.pointA[0] / (that.pointB[0] - that.pointA[0]);
    //   lat1 = that.lonlatB[1] - (that.lonlatB[1] - that.lonlatA[1]) * that.pointB[1] / (that.pointB[1] - that.pointA[1]);

    //   // 计算AC两个GPS的中心点
    //   lon2 = that.lonlatA[0] - (that.lonlatC[0] - that.lonlatA[0]) * that.pointA[0] / (that.pointC[0] - that.pointA[0]);
    //   lat2 = that.lonlatC[1] - (that.lonlatC[1] - that.lonlatA[1]) * that.pointC[1] / (that.pointC[1] - that.pointA[1]);

    //   // 计算BC两个GPS的中心点
    //   var lon3 = that.lonlatC[0] - (that.lonlatB[0] - that.lonlatC[0]) * that.pointC[0] / (that.pointB[0] - that.pointC[0]);
    //   var lat3 = that.lonlatB[1] - (that.lonlatB[1] - that.lonlatC[1]) * that.pointB[1] / (that.pointB[1] - that.pointC[1]);

    //   // 根据三个中心点算出平均值
    //   lon = (lon1 + lon2 + lon3) / 3;
    //   lat = (lat1 + lat2 + lat3) / 3;
    //   if((lon>180 || lon<-180) || (lat>90 || lat<-90)){
    //     console.warn('Error: The centerGPS: longitude must be between -180 and 180, latitude must be between -90 and 90')
    //     return
    //   }else{
    //     that.centerGPS = [lon,lat];
    //   console.log(that.centerGPS); 
    //   }
    // },

    // 偏移比例尺
    btn4 () {
      this.scale = hdmap.utils.setScale(this.bitmap, {
        lonlatA: this.lonlatA,
        lonlatB: this.lonlatB,
        lonlatC: this.lonlatC
      }, {
        pointA: [11.1328125, 50.390625],
        pointB: [-62.008974365169735, -165.02012998288635],
        pointC: [68.89766570059817, -37.086604154633946]
        })
    }
    // btn4: function() {
    //   var that = this;
    //   console.log(that.centerGPS)
    //   // GPS坐标转换光栅坐标

    //   let mcenter = that.bitmap.translate_4326_to_3857(that.centerGPS)
    //   let mlonlatA = that.bitmap.translate_4326_to_3857(that.lonlatA);
    //   let mlonlatB = that.bitmap.translate_4326_to_3857(that.lonlatB);
    //   let mlonlatC = that.bitmap.translate_4326_to_3857(that.lonlatC);

    //   let pntAX = mlonlatA[0] - mcenter[0];
    //   let pntAY = mlonlatA[1] - mcenter[1];
    //   let pntBX = mlonlatB[0] - mcenter[0];
    //   let pntBY = mlonlatB[1] - mcenter[1];
    //   let pntCX = mlonlatC[0] - mcenter[0];
    //   let pntCY = mlonlatC[1] - mcenter[1];

    //   let scaleAX = pntAX / that.pointA[0];
    //   let scaleAY = pntAY / that.pointA[1];
    //   let scaleBX = pntBX / that.pointB[0];
    //   let scaleBY = pntBY / that.pointB[1];
    //   let scaleCX = pntCX / that.pointC[0];
    //   let scaleCY = pntCY / that.pointC[1];
    //   let scaleA = (scaleAX + scaleAY) / 2;
    //   let scaleB = (scaleBX + scaleBY) / 2;
    //   let scaleC = (scaleCX + scaleCY) / 2;
    //   that.scale = (scaleA + scaleB + scaleC) / 3;
    //   console.log(that.scale);
    // }
  }
};
</script>
<style scoped>
.map-container {
  width: 90%;
  height: 500px;
}
.item {
  margin-top: 10px;
}
.calculate {
  display: inline-block;
  margin-top: 10px;
}
.input-small {
  width: 200px;
  height: 30px;
  margin: 10px;
}
.left-child {
  margin: 10px 7px 3px 0;
}
.right-child {
  margin: 0 0 3px 8px;
}

.btn {
  width: 200px;
  height: 40px;
  margin: 20px 10px 0px 0px;
}
</style>
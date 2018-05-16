<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <div class="controlCon">
      <ul class="menu-list">
        <li>
          <el-switch v-model="flag1" active-value="1" inactive-value="0" @change="changeDrawLine" active-text="开启画线工具" inactive-text="关闭画线工具"></el-switch>
          <el-button type="primary" @click="showDrawLine">显示刚才画的路线图</el-button>
          <el-button type="primary" @click="editDrawLine">编辑指定路线图</el-button>
        </li>
        <li>
          <el-switch v-model="flag2" active-value="1" inactive-value="0" @change="changeDrawShape" active-text="开启画图工具" inactive-text="关闭画图工具"></el-switch>
          <el-button type="primary" @click="showAreaShape">显示刚才画的区域图</el-button>
          <el-button type="primary" @click="editAreaShape">编辑指定区域图</el-button>
        </li>
      </ul>

    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'EditMap',
  data () {
    return {
      flag1: false,
      flag2: false,
      optionLine: {
        id: "123bbb",
        name: "testareaf",
        lineType: "003",
        borderPoints: [
          [12544316.990742246, 2714004.57109197],
          [12791361.466159936, 2654077.9409163916],
          [12634206.936005615, 2548900.589995989]
        ]
      },
      testAreas: {
        id: "123a01",
        name: "testareaf",
        areaType: "001",
        borderPoints: [
          [
            [12569999.832246065, 2737852.923916945],
            [12824993.758605413, 2712781.578639407],
            [12676400.17561903, 2552569.5673536775],
            [12569999.832246065, 2737852.923916945]
          ]
        ]
      }
    }
  },// end data
  mounted () {
    // eslint-disable-next-line
    // 初始化一个地图
    this.bitmap = new hdmap.initMap({
      gisEngine: "baidu",
      sizeW: 1920,
      sizeH: 1080,
      domId: 'bitmap',
      mapUrl: "http://online1.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&p=1&scaler=1&udt=20171115",
      sat: 0,
      center: [113.619942, 23.304629],
      popupDom: {
        popup: 'popup',
        popupcloser: 'popup-closer',
        popupcontent: 'popup-content'
      }
    })
    var that = this
    this.bitmap.regEventListener("singleclick", function (e) {
      console.log("single click event")
      //如果是新增的就会加入在textarea中加入坐标，上面的参数根据需要自己修改\
      if (e.feature) {
        // text += "(" + e.feature.getId() + "：[" + e.coordinate + "])\n";
      } else {
        // text += "未取得值";
        if (that.bitmap.getMapEditState() === "") {
          console.log(e.coordinate);
        }
      }

    });
  },// end mounted
  methods: {
    changeDrawLine: function (params) {
      if (params === "1") {// 开启画线工具
        this.bitmap.openDrawLineTool({ color: "#ff0033", width: 2 }, null, null, function (e) {
          console.log('画线结束')
        }, null, false);
      } else {
        this.bitmap.closeDrawLineTool();
      }
    },
    changeDrawShape: function (params) {
      if (params === "1") {// 开启画图工具
        this.bitmap.openDrawShapeTool('Polygon', function (e) {
          console.log('画图结束')
        }, null, false)
      } else {
        this.bitmap.closeDrawShapeTool()
      }
    },
    // 画完图形后，调用此方法把刚才画的线路在lineLayer层上显示出来
    showDrawLine: function (e) {
      this.bitmap.closeDrawLineTool();
      this.flag1 = 0
      /** 在lineLayer上显示刚才画的线路 */
      var feat = this.bitmap.showDrawLine(this.optionLine);
      this.optionLine.borderPoints = feat.getGeometry().getCoordinates();
      console.log(this.optionLine.borderPoints)
    },
    // 给定线路参数，编辑此区线路
    editDrawLine: function (e) {
      this.flag1 = true
      this.bitmap.editDrawLine(this.optionLine, { color: "#00f033", width: 2 });
    },
    // 画完线路后，调用此方法把刚才画的图在gis层上显示出来
    showAreaShape: function (e) {
      this.bitmap.closeDrawShapeTool();
      this.flag2 = 0
      /** 在gisLayer上显示刚才画的图形 */
      var feat = this.bitmap.showDrawShape({
        id: "123a01",
        name: "testareaf",
        areaType: "001"
      });
      this.testAreas.borderPoints = feat.getGeometry().getCoordinates();
    },
    // 给定区域参数，编辑此区域图
    editAreaShape: function (e) {
      this.flag2 = 1
      this.bitmap.editDrawShape(this.testAreas);
    }


  }// end methods
}
</script>
<style scoped>
.controlCon {
  margin-top: 20px;
  text-align: left;
}

.menu-list li {
  /* height:30px; */
  padding: 10px 0px;
  line-height: 30px;
  border-bottom: 1px solid #999;
}
</style>
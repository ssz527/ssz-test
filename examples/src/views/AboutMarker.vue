<template>
  <div class="map-container">
    <!-- 装初始化地图的容器 必有-->
    <div id="bitmap" style="width: 100%">
    </div>
    <div class="controlCon">
      <ul class="menu-list">
        <li>
          <el-form class="markerForm" :model="form" label-width="130px">
            <el-form-item label="点位id" class="hadWidth">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="点击地图，选取点位添加的位置坐标" class="hadWidth">
              <el-input v-model="form.condis" readonly></el-input>
            </el-form-item>
            <el-form-item label="点位名称" class="hadWidth">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="点位类型">
              <el-select v-model="form.markerType" placeholder="请选择活动区域">
                <el-option label="摄像头" value="camera"></el-option>
                <el-option label="广播设备" value="video"></el-option>
                <el-option label="保安" value="guarder"></el-option>
                <el-option label="保洁" value="cleaner"></el-option>
                <el-option label="车辆" value="car"></el-option>
                <el-option label="区域显示" value="gis"></el-option>
                <el-option label="默认" value="common"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="点位图片">
              <el-radio-group v-model="form.icon">
                <el-radio :label="common"><img :src="common" /></el-radio>
                <el-radio :label="vedio"><img :src="vedio" /></el-radio>
                <el-radio :label="broadcast"><img :src="broadcast" /></el-radio>
                <el-radio :label="guarder"><img :src="guarder" /></el-radio>
                <el-radio :label="cleaner"><img :src="cleaner" /></el-radio>
                <el-radio :label="car"><img :src="car" /></el-radio>
                <el-radio :label="gisarea"><img :src="gisarea" /></el-radio>
                <!-- <el-radio :label="3">备选项</el-radio>
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio> -->
              </el-radio-group>
            </el-form-item>
            <el-form-item label="点位数量">
              <el-input-number v-model="form.num1" :min="1" :max="1000" label="点位数量"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="createMarker">生成点位</el-button>
              <el-button type="primary" @click="deleteMarker">删除点位</el-button><br/>
            </el-form-item>
          </el-form>
        </li>
        <li>
          <div class="blockCl">
            <el-select v-model="form.visiMarkerType" placeholder="请选择活动区域">
              <el-option label="摄像头" value="camera"></el-option>
              <el-option label="广播设备" value="video"></el-option>
              <el-option label="保安" value="guarder"></el-option>
              <el-option label="保洁" value="cleaner"></el-option>
              <el-option label="车辆" value="car"></el-option>
              <el-option label="区域显示" value="gis"></el-option>
              <el-option label="默认" value="common"></el-option>
            </el-select>
          </div>
          <el-switch v-model="flag3" active-value="1" inactive-value="0" @change="changeControlMarker" active-text="隐藏某种类型点位" inactive-text="显示某种类型点位"></el-switch>
        </li>
        <li>
          <el-switch v-model="flag0" active-value="1" inactive-value="0" @change="changeEditMarker" active-text="关闭点位编辑" inactive-text="开启点位编辑"></el-switch>
        </li>
      </ul>

    </div>
  </div>
</template>
<<script>
/* eslint-disable */
  import mapImg from '@/assets/images/u768.jpg'
  import markerImg from '@/assets/images/icon.png'
  import vedio from '@/assets/images/u4838.png'
  import broadcast from '@/assets/images/broadcast.png'
  import guarder from '@/assets/images/guard.png'
  import cleaner from '@/assets/images/u4833.png'
  import car from '@/assets/images/warn.png'
  import gisarea from '@/assets/images/u346.png'
  import selectImg from '@/assets/images/u1076.png'
export default {
  name: 'EditMap',
  data () {
    return {
      flag0: false,
      flag3: true,
      vedio: vedio,
      broadcast: broadcast,
      guarder: guarder,
      cleaner: cleaner,
      car: car,
      gisarea: gisarea,
      common: markerImg,
      form: {
        id: '123456',
        name: '点位名称',
        condis: '',
        markerType: 'camera',//要生成的点位的类型
        icon: '',//markerImg
        num1: 10,
        visiMarkerType: 'camera'//要显示或隐藏的点位的类型
      },
      selFeatures: {} // 选中的点位信息 ： key点位id，value点位的layerKey
    }
  },// end data
  mounted() {
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
    this.bitmap.regEventListener("singleclick", function(e) {
    console.log("single click event")
    //如果是新增的就会加入在textarea中加入坐标，上面的参数根据需要自己修改\
    console.log(that.form.icon);
    if (e.feature) {
      // text += "(" + e.feature.getId() + "：[" + e.coordinate + "])\n";
    } else {
      // text += "未取得值";
      if (that.bitmap.getMapEditState()==="") {
        that.form.condis = e.coordinate+''
      }
    }
    
  });
  },// end mounted
  methods: {
    changeEditMarker: function (params) {
      let that = this
      if(params === "1"){// 开启点位编辑功能
        this.bitmap.openDragTool(
          function (e) {// 开始拖动
            console.log("dragstart callback")
          },
          function (e) {//结束拖动
            console.log("dragend callback")
          },
          function (e) {// 选择点位
            console.log("select callback")
            if (e.selected.length > 0){
              that.selFeatures = {};
              let feat = e.selected[0]; //
              that.selFeatures[feat.id_] = feat.layerKey;
              feat.setStyle(
                new ol.style.Style({
                  image: new ol.style.Icon(
                    /** @type {olx.style.IconOptions} */ ({
                      src: selectImg
                    })
                  )
                })
              );
            }
          },
          false //是否多选
        )
      }else {
        // 关闭点位编辑功能
        this.bitmap.closeDragTool()
      }
    },
    /** 生成点位 */
    createMarker: function (params) {
      let arr = this.form.condis.split(",")
      let _markerPos = [parseFloat(arr[0]), parseFloat(arr[1])]
      let _num = this.form.num1
      let m,s = 0;
      for (let i = 0; i < _num; i++){
        s = Math.random() * 300000;
        m = Math.random() * 1000;
        this.bitmap.addMarker({
          id: this.form.id + s,
          position: [_markerPos[0] + s, _markerPos[1] + m],
          markerType: this.form.markerType,
          name: this.form.name+i,
          imgUrl: this.form.icon,
          size: [32, 48]
        })
        
      }
    },
    deleteMarker: function (params) {
      for (let id in this.selFeatures) {
        this.bitmap.removeMarkerBylayerKey(id, this.selFeatures[id])
      }
      this.selFeatures = {};
      this.flag0 = 0
      this.bitmap.closeDragTool() //删除点位前，要释放对点位的select
    },
    changeControlMarker: function (params) {
      if(params === "1"){// 显示某类型点位
        this.bitmap.hideMarkers(this.form.visiMarkerType)
      }else {
        this.bitmap.showMarkers(this.form.visiMarkerType)
      }
    }
  }// end methods
}
</script>
<<style scoped>
.controlCon{
  margin-top: 20px;
  text-align:left;
}
.menu-list li{
  /* height:30px; */
  padding:10px 0px;
  line-height:30px;
  border-bottom: 1px solid #999;
}
.markerForm .hadWidth{
  width:500px;
}
.blockCl{
  margin:10px auto;
}
</style>





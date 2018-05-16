<template>
  <div>
    <div class="rowBtn">
      <el-row>
        <el-col :span="5">
          <div class="file-btn">
            <input type="file" multiple="false" id="sheetjs-input" :accept="SheetJSFT" @change="onchange" />请上传表格（注意格式）
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="success" @click="openClick">点位GPS映射</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="success" id="export-table" style="visibility:hidden" @click="onexport">导出</el-button>
        </el-col>
      </el-row>
      <br>
    </div>
    <div class="content">
      <div id="out-table">
        <table border="1" id="table">
          <thead>
            <tr>
              <td rowspan="2">序号</td>
              <td rowspan="2">摄像头编号</td>
              <td rowspan="2">点位编号</td>
              <td colspan="2">像素GPS位置</td>
              <td rowspan="2">像素横坐标</td>
              <td rowspan="2">像素纵坐标</td>
            </tr>
            <tr>
              <td>纬度 十进制度格式</td>
              <td>经度 十进制度格式</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in jsonData" :key="index" :class="{ 'active': (markerIds.indexOf(index)>=0)?1:0 }">
              <td v-if="item['序号']" rowspan="30">{{item['序号']}}</td>
              <td v-if="item['序号']" rowspan="30">{{item['摄像头编号']}}</td>
              <td>{{item['点位编号']}}</td>
              <td>{{item['像素GPS位置']}}</td>
              <td>{{item['__EMPTY']}}</td>
              <td>{{item['像素横坐标']}}</td>
              <td>{{item['像素纵坐标']}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="tilemap"></div>
      <div id="Popup" style="text-align:center;" class="testclass">
        <p style="margin-bottom: 5px;">点位编号：{{markerInfo.name}}</p>
        <el-button type="success" @click='confirm'>选中</el-button>
        <el-button type="info" @click='cancel'>取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import { SheetJSFT } from '../assets/utils.js'
import { getSceneList } from '../assets/index.js'
import mappingImg from '@/assets/images/mapping.png'
export default {
  name: 'ExcelLoad',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      SheetJSFT: SheetJSFT,
      jsonData: [],
      markerList: [],
      markerInfo: {},
      markerIds: []
    }
  },
  mounted () {
    getSceneList({
      sceneName: '',
      sceneType: '1'
    }).then(res => {
      var option = res.data.data[0]
      // eslint-disable-next-line
      this.mapObj = new hdmap.initMap({
        gisEngine: 'tile',
        sizeW: option.width,
        sizeH: option.height,
        domId: 'tilemap',
        mapUrl: option.url,
        maxZoom: option.maxZoom,
        minZoom: option.minZoom,
        center: [0, 0],
        centerGPS: [option.centerLon, option.centerLat],
        scale: option.scale,
        scaleType: option.scaleType,
        arcAngle: option.arcAngle
      })
      this.mapObj.regEventListener('singleclick', (e) => {
        console.log(e)
        if (e.feature) {
          this.markerInfo = e.feature
          this.mapObj.showPopup('Popup', e.coordinate)
        } else {
          // 关闭弹窗
          this.mapObj.closePopup()
        }
      })
      // 添加弹框
      var options = {
        domId: 'Popup',
        visible: true
      }
      this.mapObj.addPopup(options)
    })
  },
  methods: {
    cancel () {
      // 关闭弹窗
      if (this.markerIds.length) {
        var key = this.markerIds.indexOf(Number(this.markerInfo.id) - 1)
        if (key >= 0) {
          this.markerIds.splice(key, 1)
        }
      }
      this.mapObj.updateMarker(this.markerInfo, { scale: 0.5 })
      this.mapObj.closePopup()
    },
    confirm () {
      if (this.markerIds.indexOf(Number(this.markerInfo.id) - 1) === -1) {
        this.markerIds.push(Number(this.markerInfo.id) - 1)
      }
      this.mapObj.updateMarker(this.markerInfo, { color: 'red', scale: 0.5 })
      this.mapObj.closePopup()
    },
    onchange: function (evt) {
      this.markerIds = []
      if (this.markerList.length) {
        for (let i = 0; i < this.markerList.length; i++) {
          this.mapObj.removeMarkerBylayerKey(this.markerList[i].id, 'commonLayer')
        }
      }
      let that = this
      var file
      var files = evt.target.files

      if (!files || files.length === 0) return

      file = files[0]
      // TODO 新建读取对象
      var reader = new FileReader()
      reader.onload = function (e) {
        // pre-process data
        // binary 二进制数
        var binary = ''
        // Uint8Array 返回数组中元素的字节数
        var bytes = new Uint8Array(e.target.result)
        // 字节数长度
        var length = bytes.byteLength
        for (var i = 0; i < length; i++) {
          // fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。
          binary += String.fromCharCode(bytes[i])
        }

        /* read workbook */
        var wb = XLSX.read(binary, { type: 'binary' })
        /* grab first sheet */
        var wsname = wb.SheetNames[0]
        var ws = wb.Sheets[wsname]
        /* generate HTML */
        /* generate HTML */
        var JSON = XLSX.utils.sheet_to_json(ws)
        JSON.shift()
        console.log(JSON)
        if (Object.getOwnPropertyNames(JSON[0]).length !== 8 && Object.getOwnPropertyNames(JSON[1]).length !== 6) {
          that.$message({
            message: '请上传正确的表格格式',
            type: 'warning'
          })
          return false
        }
        that.jsonData = JSON
        var markerList = []
        that.jsonData.forEach(element => {
          let markerInfo = {}
          markerInfo.id = element['点位编号']
          markerInfo.position = [Number(element['__EMPTY']), Number(element['像素GPS位置'])]
          markerInfo.name = element['点位编号']
          markerInfo.imgUrl = mappingImg
          markerList.push(markerInfo)
        })
        that.markerList = markerList
        // /* update table */
        /* show export button */
        document.getElementById('export-table').style.visibility = 'visible'
      }

      reader.readAsArrayBuffer(file)
    },
    onexport: function (evt) {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.getElementById('out-table'))
      /* generate file and force a download */
      XLSX.writeFile(wb, 'sheetjs.xlsx')
    },
    openClick () {
      if (this.markerList) {
        this.mapObj.addMarkersByGPS(this.markerList, { scale: 0.5 })
      }
    }
  }
}
</script>
<style scoped>
table {
  border-collapse: collapse;
}

td {
  text-align: center;
  cursor: pointer;
}
#out-table {
  float: left;
}
#tilemap {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 40%;
  height: 600px;
  border: 1px solid;
}
.active {
  color: white;
  background: rgb(255, 34, 63);
}
.testclass {
  width: 300px;
  height: 80px;
  text-align: center;
}
.file-btn {
  position: relative;
  display: inline-block;
  background: #d0eeff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  padding: 5px 10px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 30px;
}
.file-btn input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.file-btn:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
</style>
<template>
  <div id="muti-pop-wrap">
    <div v-for="(item, index) in items" class="spread-popup-wrap" :key="index">
      <div class="spread-popup-wrap" :id="popData.Prefix + index" @click="showPop(item, popData.Prefix + index)">
        <a href="#" id="popup-closer" class="hdmap-popup-closer" @click.stop="closePop(popData.Prefix + index)"></a>

        <div v-if="catchs[item.id].feature.markerType === 'broadcast'">
          <!-- <slot name="broadcast"></slot> -->
          <div class="broadcast">
            <el-button>广 播</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </div>

        <div v-if="catchs[item.id].feature.markerType === 'guarder'">
          <!-- <slot name="guarder"></slot> -->
          <div class="guarder">
            <el-button>保 安</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </div>

        <div v-if="catchs[item.id].feature.markerType === 'warn'">
          <!-- <slot name="warn"></slot> -->
          <div class="warn">
            <el-button>报 警</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </div>

        <!-- <div v-for="(key, index) in $slots" :key="index" v-if="catchs[item.id].feature.markerType === index">
          <slot :name="index"></slot>
        </div> -->

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'MutiPop',
  props: ['popData'],
  data () {
    return {
      items: [],
      catchs: {}
    }
  },
  created () {
  },
  mounted () {
    console.log(this.$slots)
    console.log(this.popData)
  },
  methods: {
    createPop (map, feature) {
      var id = feature.id
      var position = feature.position
      this.items.push(feature)
      var num = 0
      num = this.items.length - 1
      this.catchs[id] = {
        id: this.popData.Prefix + num,
        feature: feature
      }
      this.$nextTick(function () {
        if (document.getElementById(this.catchs[id].id)) {
          map.addPopup({ domId: this.catchs[id].id, visible: true, arrow: true, type: feature.markerType })
          map.showPopup(this.catchs[id].id, position)
        }
      })
      // setTimeout(() => {
      //   if (document.getElementById(this.catchs[id].id)) {
      //     map.addPopup({ domId: this.catchs[id].id, visible: true, arrow: true, type: feature.markerType })
      //     map.showPopup(this.catchs[id].id, position)
      //   }
      // }, 0)
    },
    closePop (id) {
      this.$emit('closePop', id)
    },
    showPop (feature, id) {
      this.$emit('showPop', feature, id)
    }
  }
}
</script>
<style lang="less" scoped>
#muti-pop-wrap {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
}
.spread-popup-wrap {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 200px;
}
.hdmap-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
  z-index: 9999;
}
.hdmap-popup-closer:after {
  content: '✖';
}
.warn {
  width: 300px;
  height: 150px;
  background: #ddd;
}
.broadcast {
  width: 300px;
  height: 200px;
  background: #abc;
}
.guarder {
  width: 300px;
  height: 250px;
  background: #cdc;
}
</style>

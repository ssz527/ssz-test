<template>
  <div class="map_container">
    <el-rate v-model="value6" show-text>
    </el-rate>
    <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker v-model="value4" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
      </el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TableTest',
  data () {
    return {
      value6: null,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value4: ''
    }
  },
  mounted () {
  },
  methods: {
    addClass (el, className) {
      if (el.classList) {
        el.classList.add(className)
      } else {
        el.className += ' ' + className
      }
    },
    removeClass (el, className) {
      if (el.classList) {
        el.classList.remove(className)
      } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
      }
    },
    removeNode (node) {
      return node && node.parentNode ? node.parentNode.removeChild(node) : null
    },
    removeChildren (node) {
      while (node.lastChild) {
        node.removeChild(node.lastChild)
      }
    },
    isArrayEqual (arr1, arr2) {
      let len = arr1.length
      if (len !== arr2.length) {
        return false
      }
      for (var i = 0; i < len; i++) {
        if (arr1[i] !== arr2[i]) {
          return false
        }
      }
      return true
    }
  }
}
</script>
<style scoped>

</style>

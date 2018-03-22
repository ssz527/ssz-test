<template>
  <div class="aside-menu">
    <div v-for="(item, index) in list" :key="index" class="list-item" @click="goTo(item.url)">
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsideMenu',
  props: ['itemList'],
  data () {
    return {
      list: this.itemList
    }
  },
  methods: {
    goTo: function (url) {
      this.$router.push(url)
    }
  }
}
</script>
<style scoped>
.aside-menu {
  background-color: #252323;
}
.list-item {
  margin: 0 20px;
  padding: 10px 0;
  height: 20px;
  color: #eeeeee; 
  border-bottom: solid 1px #555;
  text-align: center;
  cursor: pointer;
}
</style>
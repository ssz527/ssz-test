<template>
    <div id="app">
        <el-container class="main-content">
            <el-header>
                <img src="./assets/logo.png" class="logo">
                <div>恒大智慧小区</div>
                <div class="right-menus">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px; font-size:20px;"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>设置</span>
                </div>
            </el-header>
            <el-container>
                <el-main>
                    <router-view/>
                </el-main>
                <el-aside>
                    <aside-menu></aside-menu>
                    <div @click="search">获取配置</div>
                    <div>{{configInfo}}</div>
                </el-aside>
            </el-container>
            <el-footer>
                footer
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'
import axios from 'axios'
import config from './config/config'

export default {
    name: 'app',
    data () {
        return {
            configInfo: 'init'
        }
    },
    components: { AsideMenu },
    methods: {
        search: function () {
            console.log('search function')
            axios.post(config.url('getConfig')).then(function (rep) {
                console.log(rep)
            })
        }
    }
}
</script>
<style lang="less">
@import "../src/style/index.less";
</style>
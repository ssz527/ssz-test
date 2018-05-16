import Axios from './AxiosPlugin.js'
// 代码提交部署时使用/scp-mapapp作上下文
const contextPath = '/scp-mapapp'

// 调试用上下文字段为空
// const contextPath = ''
/* -------------------- 地图通用配置接口 start -------------------- */
/**
 * @description setMapSetting 设置地图通用配置
 */
export const setMapSetting = data => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/setMapSetting',
    data
  })
}

/**
 * @description getMapSetting 获取地图通用配置信息
 */
export const getMapSetting = () => {
  return Axios.get(contextPath + '/mapService/getMapSetting')
}
/* -------------------- 地图通用配置接口 end -------------------- */

/* -------------------- 场景接口 start -------------------- */
/**
 * @description getScenePageList 获取场景分页列表
 */
export const getScenePageList = (pageNum, pageSize, params) => {
  params.pageNum = pageNum
  params.pageSize = pageSize
  return Axios({
    url: contextPath + '/mapService/getScenePageList',
    method: 'get',
    params
  })
}

/**
 * @description getSceneList 获取场景列表
 */
export const getSceneList = (data) => {
  return Axios({
    url: contextPath + '/mapService/getSceneList',
    method: 'get',
    params: data
  })
}

/**
 * @description getParkList 获取车位列表
 */
export const getParkList = (data) => {
  return Axios({
    url: contextPath + '/mapService/getParkList',
    method: 'get',
    params: data
  })
}

/**
 * @description addScene 增加场景
 */
export const addScene = data => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/addScene',
    data
  })
}

/**
 * @description updateScene 场景信息更新
 */
export const updateScene = data => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/updateScene',
    data
  })
}

/**
 * @description getSceneInfo 获取场景详情
 */
export const getSceneInfo = (data) => {
  return Axios({
    url: contextPath + '/mapService/getSceneInfo',
    method: 'get',
    params: data
  })
}

/**
 * @description setSceneScaleByReal 更新比例尺宽高信息
 */
export const setSceneScaleByReal = data => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/setSceneScale/byReal',
    data
  })
}
/**
 * @description setSceneScaleByGPS 更新比例尺点位信息
 */
export const setSceneScaleByGPS = data => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/setSceneScale/byGPS',
    data
  })
}

/**
 * @description deleteScene 删除场景
 */
export const deleteScene = data => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/deleteScene',
    data
  })
}
/* -------------------- 场景接口 end -------------------- */

/* -------------------- 应用接口 start -------------------- */
/**
 * @description getDeviceList 获取设备列表
 */
export const getDeviceList = (data) => {
  return Axios({
    url: contextPath + '/mapapp/getDeviceList',
    method: 'get',
    params: data
  })
}
/**
 * @description getDeviceInfo 获取设备信息
 */
export const getDeviceInfo = (data) => {
  return Axios({
    url: contextPath + '/mapapp/getDeviceInfo',
    method: 'get',
    params: data
  })
}
/**
 * @description getOrgTree 获取组织树
 */
export const getOrgTree = (data) => {
  return Axios({
    url: contextPath + '/mapapp/getOrgTree',
    method: 'get',
    params: data
  })
}
/**
 * @description getDictionary 获取字典表
 */
export const getDictionary = (data) => {
  return Axios({
    url: contextPath + '/mapapp/getDictionary',
    method: 'get',
    params: data
  })
}
/* -------------------- 应用接口 end -------------------- */

/* -------------------- 点位接口 start -------------------- */
/**
 * @description getMarkerInfo 获取单个点位信息
 */
export const getMarkerInfo = (data) => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getMarkerInfo',
    params: data
  })
}
/**
 * @description getMarkerList 获取点位列表
 */
export const getMarkerList = (data) => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getMarkerList',
    params: data
  })
}
/**
 * @description addMarker 增加点位
 */
export const addMarker = (data) => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/addMarker',
    data
  })
}
/**
 * @description addMarkerList 增加点位列表
 */
export const addMarkerList = (data) => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/addMarkerList',
    data
  })
}
/**
 * @description updateMarker 更新点位
 */
export const updateMarker = (data) => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/updateMarker',
    data
  })
}
/**
 * @description deleteMarker 删除点位
 */
export const deleteMarker = (data) => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/deleteMarker',
    data
  })
}
/* -------------------- 点位接口 end -------------------- */

/* -------------------- 区域接口 start -------------------- */
/**
 * @description addArea 新增区域
 */
export const addArea = data => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/addArea',
    data
  })
}

/**
 * @description getAreaList 查询区域列表
 * @param {string} sceneId 场景ID
 * @param {number} areaType 区域类型
 */
export const getAreaList = (data) => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getAreaList',
    params: data
  })
}

/**
 * @description updateArea 更新区域信息
 * @param {Object} 区域信息
 */
export const updateArea = data => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/updateArea',
    data
  })
}

/**
 * @description deleteArea 删除区域
 * @param {Array} areaIds 区域ID数组
 */
export const deleteArea = data => {
  return Axios({
    method: 'post',
    url: contextPath + '/mapService/deleteArea',
    data
  })
}

/**
 * @description getAreaInfo 获取区域信息
 * @param {string} areaId 区域ID
 */
export const getAreaInfo = (data) => {
  return Axios({
    method: 'get',
    url: contextPath + '/mapService/getAreaInfo',
    params: data
  })
}

/* -------------------- 区域接口 end -------------------- */

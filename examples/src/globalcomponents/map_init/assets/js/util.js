
export const mapOptionFormat = options => {
  let formatedOption = {}
  formatedOption.mapId = options.id
  formatedOption.sceneName = options.sceneName
  formatedOption.gisEngine = 'bitmap'
  formatedOption.sizeW = options.width ? options.width : 1900
  formatedOption.sizeH = options.height ? options.height : 1080
  formatedOption.realHeight = options.realHeight
  formatedOption.realWidth = options.realWidth
  formatedOption.mapUrl = options.url
  formatedOption.center = [0, 0]
  formatedOption.centerGPS = []
  formatedOption.centerGPS.push(options.centerLon)
  formatedOption.centerGPS.push(options.centerLat)
  formatedOption.scale = options.scale
  formatedOption.scaleType = options.scaleType
  formatedOption.countWarning = options.countWarning
  formatedOption.controlZoom = false
  formatedOption.minZoom = 2.5
  formatedOption.maxZoom = 4
  formatedOption.zoom = 2.5
  return formatedOption
}

export const extendObj = (object, extend) => {
  for (let key in extend) {
    object[key] = extend[key]
  }
  return object
}

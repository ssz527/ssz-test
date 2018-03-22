##弹框组件使用说明

### 1.组件引用

`import globalCom from '@/globalcomponents'`

### 2.全局组件注册

`Vue.use(globalCom)`

### 3.组件使用

```html
<DeviceMap ref="DeviceMap"></DeviceMap>
```

```javascript
this.$refs.DeviceMap.addMap({
  deviceID: '3022000BAB62AFF40004',
  width: '800px',
  height: '500px'
})
```

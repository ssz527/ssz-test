# Release Notes

# v3.0.13

### 更新内容
1. 解决计算旋转角度错误的问题


# v3.0.7

### 更新内容
1. 优化点位聚合弹窗样式，当聚合点列表太长时，可滚动查看
2. 切片地图增加viewRange,添加点位时判断点位是否在可视范围内

# v3.0.6

### 更新内容
1. 优化addmarker方法
2. 给地图自动生成的popup弹窗id，跟domID关联，生成本地图唯一popup弹窗
3. 添加地锁图层及zindex值

# v3.0.3

### 更新内容
1. 新增点位逻辑，当点位存在时为更新操作，点位未添加时才会新增点位
2. 设置点位聚合函数半径根据地图分辨率变大而变大，兼容非切片情况
3. 点位聚合函数过滤未显示图层上的点位

# v3.0.1

### 更新内容
1. 支持切片地图加载
2. 地图图层处理优化
3. 增加move事件监听

# v2.0.0

### 更新内容
1. 考虑地图旋转的情况，更新计算地图比例尺，中心点GPS的算法，新增计算地图旋转角度算法
2. 更新考虑地图旋转情况下的地图上GPS和点位的映射算法
3. 更新example用例及验证

# v1.1.5

### 更新内容
1. 新增点到多边形最短距离函数：pointToPolyline (map, point, points)
2. 新增车位锁位置计算函数：getParkingLockPoint (borderPoints, rotate)
3. 解决destroy函数问题

# v1.1.0

### 更新内容

1. 弹窗自适应展示和地图是否允许鼠标拖动关联
    默认：地图允许鼠标拖动，弹窗自适应开启；
    地图不允许鼠标拖动，弹窗自适应关闭

# v1.0.9~v1.0.11

### 更新内容

1. 添加点位、更新点位、添加区域增加id验证
    1. addMarker方法增加了id验证，id不存在，给了时间戳；
    2. updateMarker方法添加了id验证，id不存在，给warn提示；
      这样可以避免报错，不影响其他点位加载
2. 优化pointermove监听
3. 新增无箭头指向的浮窗显示模式

# v1.0.7~v1.0.8

### 更新内容

1. 区域和路线编辑新增可以单图形绘制功能，在打开编辑时传入multi: false即可开启
  这种情况下，绘制新图形时会将之前绘制的图形清理掉
2. 新增高德地图的支持
3. 解决单图形绘制模式下的问题

# v1.0.6

### 更新内容

1. 扩展addPopup(popOption)
  由于之前的方式是传入domId方式新增弹窗，为了继承该操作方式，增加入参判断
	typeof(popOption) === string
		原先的获取dom加载模式
	typeof(popOption) === object
		将传递的属性放到生成的pop对象用以其他逻辑处理
	当前新增参数：`visible`
2. 新增closeCommonPopup 函数，关闭除visible === true以外的弹窗

# v1.0.1~v1.0.5

### 更新内容

1. 区域对象添加属性originId，保存画线方法可以一次保存多个；增加了清空画线层方法clearDrawLine
2. 线路、区域保存方法修改，现在可传入任意字段，在getExtProperties()里可以获得
3. 地区编辑状态：点位、路线、区域编辑的监听方法，都会在关闭编辑状态时移除，
4. 线路、区域保存方法必传参数，且传入的参数个数与返回的个数相等

# v1.0.1

### 更新内容

1. 解决车位编辑问题 
2. 完善addmarkers函数
3. 解决同时编辑多个区域时，transform事件多次添加问题
4. 解决二次编辑区域，保存区域信息时，未同时更新ExtProperties数据问题

# v1.0.0

### 更新内容

1. 1.0.0发布，引擎基本功能开发基本完成
2. 解决一些绘制车位功能的问题
3. 事件处理流程优化

# v0.5.61

### 更新问题

1、解决安装失败问题

# v0.5.6

### 更新内容

1. 解决pointerdrag事件错误导致画区域时无法拖动的问题
2. 增加车位编辑功能相关代码

# v0.5.5

### 更新内容

解决_myopenlayer文件夹导致hdmap安装失败的问题

# v0.5.4

### 更新内容

1. 增加车位编辑功能
2. 解决统计点位显示异常问题
3. 新增围栏样式
4. 层级监听方法用例实现

# v0.5.3

### 更新内容

1. popup给默认值，不再是必传参数
2. 增加control和信息图标的隐藏参数设置
3. 修复pointermove事件产生多次回调问题

# v0.5.2

### 变更内容

1. 解决根据e.map.getTarget获取的地图和显示地图不对应的问题

# v0.5.1

### 更新内容

1. 新增eslint校验

# v0.5.0

### 更新内容

1. 算法优化

2. 优化方法入参验证

3. 区域优化

# v0.4.2

### 更新内容
1. 增加异常判断处理
2. 完善demo文档
3. 新增点位删除方法 removeMarker(markerInfo)
4. 优化更新点位传参方式 updateMarker(markerInfo, styleObj)
### 更新内容

# v0.4.1

### 更新内容

1. 对外example框架优化
2. 新增越界判断函数judgePointInsidePolygon
3. 路线处理函数实现
4. 计算函数和样式优化

# v0.4.0

### 更新内容
1. pointermove事件监听完善

2. 区域、路线编辑方法增加可编辑功能openDrawShapeTool、openDrawLineTool

3. 区域重心和广播、摄像头、报警坐标功能函数的封装以及在vue工程上面实现例子

# myopenlayers v1.1.0

升级openlayers的代码为v4.5.0，以便使用myopenlayers的区域编辑，计算方法等新特性

# v0.3.1
### Release Notes
1. 默认样式的优化
2. 实现区域的图层处理逻辑，在首次添加区域时创建gislayer
3. addArea,addAreas, updateArea, removeArea函数功能实现
4. 新增创建overlay方法： addPopup(overlayName,弹窗id)
5. 新增显示弹窗方法：showPopup(overlayName,coordinate)
6. 默认弹窗方法更改为：popupDefault(coordinate,feature,innerHTML)
7. 优化关闭弹窗方法：closePopup()
8. 新增设置地图编辑状态方法：setMapEditState(type)//type = drawLineState：画线，drawShapeState：画图，dragState：编辑点位
9. 新增获取地图编辑状态方法：getMapEditState() //编辑状态返回对应状态类型，非编辑状态返回空字符串

# v0.3.0

1. 默认弹窗以及点位聚合弹窗功能
2. 点位更新updateMarker功能
3. 点位聚合计算函数实现
4. 点位删除功能实现
5. 默认样式集中
  1. 点位报警样式
  2. 区域报警样式

# v0.2.0

1. 实现了点位新增时对图层的判断控制逻辑
2. 图层显示隐藏的控制实现(showMarkers, hideMarkers)
3. 事件处理机制完善
4. 距离计算函数，比例尺计算函数实现()

# v0.1.0
1. 重构打包流程，排除openlayers源码

2. 实现事件注册机制，在地图构建时注册默认监听，用户的监听会在默认监听中进行处理

# v0.0.2

1. 修改了对openlayers的引入使用方式，不再将其打包到hdmap.js中，因为这样会引起初始化错误
2. 修改了hdmap的main入口文件为mapManager.js文件，不使用组件本身的全包文件
3. 解决了baidu-projection对象报错问题

# v0.1.0 myopenlayers

This project provide an openlayers module that has been rebuild for hdmap.

You can import this module to hdmap, then there will be window.ol & window.goog impl to use. 

## Use
1. add the behind module to your dependecies of hdmap,
```
"myopenlayers": "git+http://gitlab/xiaxuanyin/UI-mapcomponent.git#myopenlayers"
```
2. then import myopenlayers at the code of hdmap entry file or bundle file 

## code part

我们添加了下面两行代码到原来的openlayers的代码中，这样openlayers才能够提供出全局的ol对象和goog对象用来进行扩展。
```javascript
window.ol = ol;
window.goog = goog;
```

# v0.0.1
Base version of hdmap engine.

Add the behind line to the package.json file of your project,

```
"hdmap": "git+http://gitlab/xiaxuanyin/UI-mapcomponent.git#master"
```

then import hdmap and css file at the enter file of your project file 

```
import 'hdmap'
import 'hdmap/dist/hdmap.css'
```

# Introduction

This project provide an openlayers module that has been rebuild for hdmap.

You can import this module to hdmap, then there will be window.ol & window.goog impl to use. 

# Use
1. add the behind module to your dependecies of hdmap,
```
"myopenlayers": "git+http://gitlab/xiaxuanyin/UI-mapcomponent.git#myopenlayers"
```
2. then import myopenlayers at the code of hdmap entry file or bundle file 

# code part

我们添加了下面两行代码到原来的openlayers的代码中，这样openlayers才能够提供出全局的ol对象和goog对象用来进行扩展。
```javascript
window.ol = ol;
window.goog = goog;
```

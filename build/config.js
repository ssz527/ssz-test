var header = '/**\n' +
' * <%= pkg.name %> <%= pkg.version %>\n' +
' * <%= pkg.description %>\n' +
' *\n' +
' * Copyright 2017\n' +
' * Released under the <%= pkg.license %> license.\n' +
'*/\n\n';

module.exports = {
    headerFile: './headerEnd/header.js',

    olSourceCode: '../lib/ol_v3.20.0/ol-debug-export.js',

    baiduProjection: '../src/extend-files/baidu-projection.js',
    hdlayerExtend: '../src/extend-files/hdlayer-extends.js',

    rollupInput: '../src/hdmap/mapManager.js',
    rollupOutput: '../dist/hdmap-bundle.js',

    hdmapAndOlBundle: '../dist/hdmap-ol-bundle.js',

    header: header,

    cssFiles: [
        '../lib/ol_v3.20.0/ol.css',
        '../src/assets/css/*'
    ],

    dist: '../dist'
}
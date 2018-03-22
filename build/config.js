var header = '/**\n' +
' * <%= pkg.name %> <%= pkg.version %>\n' +
' * <%= pkg.description %>\n' +
' *\n' +
' * Copyright 2017\n' +
' * Released under the <%= pkg.license %> license.\n' +
'*/\n\n';

module.exports = {
    headerFile: './headerEnd/header.js',

    rollupInput: '../src/hdmap/mapManager.js',
    rollupOutput: '../dist/hdmap.bundle.js',

    header: header,

    cssFiles: [
        '../node_modules/myopenlayers/myopenlayers//ol.css',
        '../src/assets/css/*'
    ],

    dist: '../dist'
}
// Karma configuration
// Generated on Mon Jan 22 2018 17:15:08 GMT+0800 (中国标准时间)
var webpackConfig = require('../examples/build/webpack.test.conf')
module.exports = function (config) {
  config.set({

    basePath: '',
    browsers: ['Chrome'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: [
      'spec',
      'coverage'
    ],
    files: [
      '../node_modules/myopenlayers/myopenlayers/ol-debug.js',
      '../dist/hdmap.js',
      './specs/**/*.js'
    ],
    preprocessors: {
      '../src/hdmap/*.js': 'coverage',
      './specs/**/*.js': ['webpack', 'coverage', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [{
        type: 'html',
        subdir: '.'
      }, {
        type: 'text-summary'
      }]
    },
    // 服务器端口号
    port: 9876,
    // 在输出内容（报告器和日志）中启用/禁用颜色
    colors: true,
    // 启用/禁用监视文件变化重新执行测试的功能
    autoWatch: true,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

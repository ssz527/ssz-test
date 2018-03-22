// Karma configuration
// Generated on Tue Jan 23 2018 16:08:03 GMT+0800 (中国标准时间)
var webpackConfig = require('./examples/build/webpack.test.conf')
module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    // 这里使用的是PhantomJS作为浏览器测试环境，这个插件支持DOM, CSS, JSON, Canvas, and SVG.的解析
    basePath: '',
    browsers: ['Chrome'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['spec', 'coverage'],
    files: ['./unit/specs/**/*.js'],
    preprocessors: {
      './unit/specs/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }]
    },
    // 服务器端口号
    port: 9876,
    // 在输出内容（报告器和日志）中启用/禁用颜色
    colors: true,
    // 启用/禁用监视文件变化重新执行测试的功能
    autoWatch: true,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};

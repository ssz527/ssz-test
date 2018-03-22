const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint')

const gulp = require('gulp')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')
const banner = require('gulp-banner')
const cleanCss = require('gulp-clean-css')
const base64 = require('gulp-base64')

const config = require('./config')
const package = require('../package.json')

//清空文件夹，避免资源冗余  
gulp.task('clean',function(){
    return gulp.src('../dist',{read:false})
        .pipe(clean({force:true}));  
});  

//构建hdmap.bundle.js文件
gulp.task('bundle', ['clean'], async function(cb){
    var bundle = await rollup.rollup({
        input: config.rollupInput,
        plugins: [ eslint({
              exclude: [
                '**/extend-files/*.js',
              ]
            }), babel()]
    });

    await bundle.write({
        format: 'umd',
        name: 'hdmap', //umd或iife模式下，若入口文件含 export，必须加上该属性
        file: config.rollupOutput,
        // sourcemap: true, //是否需要源码对照
        globals: {
            openlayers: 'ol'
        }
    });

    return gulp.src(config.rollupOutput)
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('../dist'))
})

gulp.task('hdmap-build', ['bundle'], function(){
    return gulp.src(config.rollupOutput)
    .pipe(rename('hdmap.js'))
    .pipe(banner(config.header, {
        pkg: package
    }))
    .pipe(gulp.dest('../dist'))
})

gulp.task('css-build', ['clean'], function(){
    return gulp.src(config.cssFiles)
    .pipe(concat('hdmap.css'))
    .pipe(base64())
    .pipe(cleanCss())
    .pipe(gulp.dest('../dist'))
})

gulp.task('build',['css-build','hdmap-build'], function(){
    return gulp.src('../dist/hdmap.bundle.min.js')
        .pipe(rename('hdmap.min.js'))
        .pipe(banner(config.header, {
            pkg: package
        }))
        .pipe(gulp.dest('../dist'))
})

// gulp.task('default', ['build']);
gulp.task('default', ['bundle']);

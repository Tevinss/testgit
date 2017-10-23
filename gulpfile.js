/**
 * Created by tevins on 2017/10/23/0023.
 */

/* 需求
 * 1.less编译  压缩  合并
 * 2.js合并 压缩 混淆
 * 3.image复制
 * 4.html压缩
 * 5.浏览器自动同步
 * */

/*载入gulp等一系列包*/
var gulp = require('gulp');

/*5.浏览器自动同步*/
var browserSync = require('browser-sync').create();
// 静态服务器 + 监听 css/js/html 文件
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch('src/styles/*.less', ['style']);//监听所有的less文件，执行style方法
    gulp.watch('src/scripts/*.js', ['script']);//监听所有的js文件，执行script方法
    gulp.watch('src/images/*.*', ['image']);//监听所有的image文件，执行image方法
    gulp.watch('src/index.html', ['html']);//监听所有的index.html文件，执行html方法
});


// gulp.task("autowork", function () {
//     gulp.watch('src/styles/*.less', ['style']).on('change', reload);//监听所有的less文件，执行style方法
//     gulp.watch('src/scripts/*.js', ['script']).on('change', reload);//监听所有的js文件，执行script方法
//     gulp.watch('src/images/*.*', ['image']).on('change', reload);//监听所有的image文件，执行image方法
//     gulp.watch('src/index.html', ['html']).on('change', reload);//监听所有的index.html文件，执行html方法
// });
/*1.less编译  压缩  合并*/
var less = require('gulp-less');//less转css工具
var cssnano = require('gulp-cssnano');//css压缩工具
gulp.task('style', function () {
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])//目标文件包含*.less，但是不包含_*.less（此处可以直接使用css预处理方式引入（less直接import），不需要借助gulp工具）
        .pipe(less())//将less转化为css
        .pipe(cssnano())//压缩css
        .pipe(gulp.dest('dist/styles'))//复制到dist/styles目录下
        .pipe(browserSync.reload({stream: true}));//页面重新载入css
});

/*2.js合并 压缩 混淆*/
var concat = require('gulp-concat');//js合并工具
var uglify = require('gulp-uglify');//js压缩混淆工具
gulp.task('script', function () {
    gulp.src(['src/scripts/*.js'])//目标文件包含*.js
        .pipe(concat('all.js'))
        .pipe(uglify())//将js压缩混淆
        .pipe(gulp.dest('dist/scripts/'))//复制到dist/script目录下
        .pipe(browserSync.reload({stream: true}));//页面重新载入js
});

/*3.image复制*/
gulp.task('image', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream: true}));//页面重新载入图片;
});

/*4.html压缩*/
var htmlmin = require('gulp-htmlmin');//html压缩工具
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
    }
    gulp.src('src/index.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));//页面重新载入html
});




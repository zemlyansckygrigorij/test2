/*
    1.  Установите Node.js локально в домашней директории
    2.  Выполнить команду npm init
    3.  Установить плагины:
            - локально      npm i ИМЯ_МОДУЛЯ --save-dev
            - и глобально   npm i ИМЯ_МОДУЛЯ --save-dev -g

            gulp                - сборщик Gulp
            gulp-concat         - объединения файлов в один
            gulp-rename         - переименование файла/ов
            gulp-plumber        - обработчик ошибок сборщика;
            gulp-sourcemaps     - генерация Source-maps
            path                - утилита для работы с путями

            pump                - для логирования (т.е. нормальных логов в командной строке) кода при сборке
            gulp-babel          - транслятор из ES6 в ES5. Для перевода одного стандарта в другой, требует установки модулей ниже:          
                babel-cli
                babel-core
                babel-preset-stage-0
                babel-loader
                babel-preset-env
                babel-preset-es2015
                                    При этом в package.json нужно добавить:
                                        "babel": {
                                            "presets": ["es2015"]
                                        }

            webpack             - используется как сборщик js
            gulp-util           - красивые логи и создание ошибок в gulp формате
            node-notifier       - получение информации по ошибкам

            gulp-clean-css      - Сжимает css

            postcss
            postcss-import              - Поддержка @import в postcss
            postcss-mixins              - Поддержка mixin и @define-mixin
            postcss-nested-ancestors    - Поддержка вложенности селекторов
            postcss-nested        
            postcss-simple-vars         - Поддержка переменных
            postcss-hexrgba             - Поддержка вставки hex в rgba
            postcss-units               - Генерация rem или em при необходимости
            postcss-cssnext             - Поддержка некоторых функций css4: http://cssnext.io/
            postcss-easings             - Поддержка кривых для transition из: http://easings.net/ru
            postcss-extend              - Поддержка заполнителей для селекторов
            postcss-object-fit-images   - Преобразование object-fit и object-position для старых браузеров
            postcss-flexibility         - Преобразование display flex
            postcss-math                - Поддержка математически операций
            postcss-conditionals        - Поддержка условий в селекторах
            postcss-assets              - Изолирование путей в css до файлов/изображений
*/

const   gulp                    = require('gulp'),
        plumber                 = require('gulp-plumber'),
        path                    = require('path'),                       
        concat                  = require('gulp-concat'),              
        cleanCSS                = require('gulp-clean-css'),    
        rename                  = require('gulp-rename'),           
        sourcemaps              = require('gulp-sourcemaps');

    // PostCSS
const postcss                   = require('gulp-postcss'),
    postcss_import              = require('postcss-import'),
    postcss_mixins              = require('postcss-mixins'),
    postcss_nested_ancestors    = require('postcss-nested-ancestors'),
    postcss_nested              = require('postcss-nested'),
    postcss_simple_vars         = require('postcss-simple-vars'),
    postcss_hexrgba             = require('postcss-hexrgba'),
    postcss_units               = require('postcss-units'),
    postcss_cssnext             = require('postcss-cssnext'),
    postcss_easings             = require('postcss-easings'),
    postcss_extend              = require('postcss-extend'),
    postcss_object_fit_images   = require('postcss-object-fit-images'),
    postcss_flexibility         = require('postcss-flexibility'),
    postcss_math                = require('postcss-math'),
    postcss_conditionals        = require('postcss-conditionals'),
    postcss_assets              = require('postcss-assets');


    // JS
const   pump            = require('pump'),
        babel           = require('gulp-babel');

    // ES6
const   webpack     = require('webpack'),
        gutil       = require('gulp-util'),
        notifier    = require('node-notifier');

    // Webpack
var webpackConfig = require('./webpack.config.js');

var postcssPath = './public/css/postcss/',                  // Папка с PostCss файлами
    mainPostCSS = path.join(postcssPath, 'style.pcss'),     // Имя главного pcss файла проекта
    cssOutPath = './public/css/c/';                         // папка со склеенным и уменьшенным css. Файл имеет имя cssOutFile

    // Определяем порядок сборки JS файлов
var JS = [
    './js/bundle.js'
];

gulp.task('postcss-build', function(cb) {
    return gulp.src(mainPostCSS)
        //.pipe(sourcemaps.init())
        .pipe( postcss([ 
                postcss_import(),
                postcss_mixins(),
                postcss_nested_ancestors(),
                postcss_nested(),
                postcss_simple_vars(),
                postcss_hexrgba(),
                postcss_units(),
                postcss_cssnext({ browsers: ['> 0.5%', 'last 10 versions'] }),
                postcss_easings(),
                postcss_extend(),
                postcss_object_fit_images(),
                postcss_flexibility(),
                postcss_math(),
                postcss_conditionals(),
                postcss_assets({ loadPaths: ['.'] }),
            ]) 
        )        
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe( rename('style.css') )
        //.pipe( sourcemaps.write('./maps') )
        .pipe( gulp.dest(cssOutPath) );
});

var onError = function (err) {
    gutil.beep();
    console.log(err);
};

    // для красивых логов в консоли
var statsLog      = { 
    colors: true,
    reasons: true
};

/**
 * Сборка и минификация js
 */
gulp.task('js-build', (done) => {

    webpack(webpackConfig, onComplete);

    function onComplete(error, stats) {
        if (error) { 
            onError(error);
        } else if ( stats.hasErrors() ) { 
            onError( stats.toString(statsLog) );
        } else {
            onSuccess( stats.toString(statsLog) );
        }
    };

    function onError(error) {
        var formatedError = new gutil.PluginError('webpack', error);
        notifier.notify({ // чтобы сразу узнать об ошибке
            title: `Error: ${formatedError.plugin}`,
            message: formatedError.message
        });
        done(formatedError);
    };

    function onSuccess(detailInfo) {
            // Сборка js файлов клиента
        buildJs();
        gutil.log('[webpack]', detailInfo);
        done();
    };

    function buildJs(cb) {
        pump([
            gulp.src(JS),
            concat('script.js'),
            babel(),
            gulp.dest('./js/c/')
        ], cb)
    };

});

/**
 * Наблюдение за изменениями всех css файлов
 */
gulp.task('watch-css', function() {
    gulp.watch(postcssPath+'**/*.pcss', ['postcss-build']);
})
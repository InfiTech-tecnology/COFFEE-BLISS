const {src, dest, watch, series, parallel} = require('gulp');
// css 
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
// imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const cssnano = require('cssnano');

function css() {
    return src('src/scss/app.scss')
        .pipe( sass())
        .pipe( postcss([autoprefixer, cssnano()]))
        .pipe( dest('build/css'))
}

function imagenes() {
    return src('src/img/**/*')
            .pipe( imagemin({optimizationLevel: 3}))
            .pipe( dest('build/img'))
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
            .pipe( webp())
            .pipe( dest('build/img'))
}

function versionAvif() {
     return src('src/img/**/*.{png,jpg}')
            .pipe( avif())
            .pipe( dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev )


// Series - Ejecuta una tarea y asta que termine ejecuta la otra tarea.
// Parallel - Ejecuta todas las tareas a la vez.
const { watch, src, dest, parallel } = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

sass.compiler = require('node-sass')

browserSync.init({
  server: "./src"
});

function css(){
  return src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src/css'))
    .pipe(browserSync.stream());
}

function js(){
  return src(['./node_modules/bootstrap/dist/js/bootstrap.js', './node_modules/jquery/dist/jquery.js'])
  .pipe(dest('./src/js'))
}

//font awesome
function fas(){
  return src(['./node_modules/@fortawesome/fontawesome-free/**/*'])
  .pipe(dest('./src/fontawesome'))
}

watch('./src/scss/*.scss', css)
watch('./src/*.html').on('change', browserSync.reload)
exports.default = parallel(fas, css, js)

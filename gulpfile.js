const project_folder = require("path").basename(__dirname);
const source_folder = "#src";
const fs = require("fs");

const path = {
  build: {
    pug: project_folder + "/",
    scss: project_folder + "/styles/",
    scripts: project_folder + "/scripts/",
    img: project_folder + "/assets/img/",
    icons: project_folder + "/assets/icons/",
    fonts: project_folder + "/assets/fonts/",
  },
  src: {
    pug: source_folder + "/pug/index.pug",
    scss: source_folder + "/scss/styles.scss",
    scripts: source_folder + "/scripts/scripts.js",
    img: source_folder + "/assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
    icons: source_folder + "/assets/icons/sprite.svg",
    fonts: source_folder + "/assets/fonts/*.ttf",
  },
  watch: {
    pug: source_folder + "/**/*.pug",
    scss: source_folder + "/scss/**/*.scss",
    scripts: source_folder + "/scripts/**/*.js",
    img: source_folder + "/assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + project_folder + "/",
};

const { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  plumber = require('gulp-plumber'),
  pug = require("gulp-pug"),
  //puglinter = require('gulp-pug-linter'),
  htmlvalidator = require('gulp-w3c-html-validator'),
  bemvalidator = require('gulp-html-bem-validator'),
  //gulpstylelint = require('gulp-stylelint'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  shorthand = require("gulp-shorthand"),
  cleancss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  //eslint = require('gulp-eslint'),
  terser = require('gulp-terser'),
  babel = require('gulp-babel'),
  imagemin = require("gulp-imagemin"),
  concat = require("gulp-concat"),
  svgsprite = require("gulp-svg-sprite"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter"),
  del = require("del");

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function pug2html() {
  return src(path.src.pug)
    .pipe(plumber())
    //.pipe(puglinter({ reporter: 'default' }))
    .pipe(pug())
    .pipe(htmlvalidator())
    .pipe(bemvalidator())
    .pipe(dest(path.build.pug))
    .pipe(browsersync.stream());
}

function styles() {
  return src(path.src.scss)
    .pipe(plumber())
    /*.pipe(gulpstylelint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ]
    }))*/
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(shorthand())
    .pipe(dest(path.build.scss))
    .pipe(cleancss())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.scss))
    .pipe(browsersync.stream());
}

function scripts() {
  return src(path.src.scripts)
    .pipe(plumber())
    //.pipe(eslint())
    //.pipe(eslint.format())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat("scripts.js"))
    .pipe(terser())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.scripts))
    .pipe(browsersync.stream());
}

function images() {
  src(path.src.img)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 70, progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeUnusedNS: false },
          { removeUselessStrokeAndFill: false },
          { cleanupIDs: false },
          { removeComments: true },
          { removeEmptyAttrs: true },
          { removeEmptyText: true },
          { collapseGroups: true }
        ]
      })
    ]))
    .pipe(dest(path.build.img));
    return src(path.src.icons)
      .pipe(dest(path.build.icons))
      .pipe(browsersync.stream());
}


function libs() {
  src([
    'node_modules/normalize.css/normalize.css',
  ])
  .pipe(concat("styles.min.css"))
  .pipe(dest(path.build.scss));
  return src([
      'node_modules/svg4everybody/dist/svg4everybody.legacy.min.js',
    ])
    .pipe(concat("scripts.min.js"))
    .pipe(dest(path.build.scripts));
}

function fonts() {
  src([source_folder + "/assets/fonts/*.otf"])
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(source_folder + "/assets/fonts/"));
  src(source_folder + "/assets/fonts/*.{woff2,woff}").pipe(dest(path.build.fonts));
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

function fontsStyle(params) {
  let file_content = fs.readFileSync(source_folder + "/scss/_fonts.scss");
  if (file_content == "") {
    fs.writeFile(source_folder + "/scss/_fonts.scss", "", cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split(".");
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(source_folder + "/scss/_fonts.scss", '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    });
  }
}

function cb() {}

// gulp svgsprite
gulp.task("svgsprite", function () {
  return gulp
    .src([source_folder + "/assets/icons/*.svg"])
    .pipe(
      svgsprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest(source_folder + "/assets/icons/"));
});

function watchFiles(params) {
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.pug], pug2html);
  gulp.watch([path.watch.scss], styles);
  gulp.watch([path.watch.scripts], scripts);
  
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(libs, images, pug2html, styles, scripts, fonts, fontsStyle));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.libs = libs;
exports.images = images;
exports.pug2html = pug2html;
exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;
exports.build = build;
exports.watch = watch;
exports.default = watch;
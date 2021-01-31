# Gulp Build

## Lighthouse score

![lighthouse score](https://github.com/tsybulska/gulp-build/blob/main/%23src/assets/img/lighthouse.png 'lighthouse score')

## Features

-   Resize mobile or tablet images, retina 1x, 2x, 3x via gulp task and use with picture tag
-   Automaticly create svg sprite by adding svg icons to /#src/assets/icons/, svg support ie
-   Automaticly create favicon by adding the svg icon to /#src/assets/favicon/
-   Convert fonts to woff2 and woff, copy them to /#src/assets/fonts/ and clean /#src/scss/\_fonts.scss/ file
-   Two pug template pages with separate includes folders, common files in extends folder (layout, header, footer)
-   Scss styles with separate components

## List of gulp tasks

-   clean.js — Clean folder
-   pug2html.js — Pug to HTML, pug linter, html validator, bem validator
-   styles.js — SCSS to CSS, webpcss, group css media, stylelint, sourcemaps, autoprefixer, csso, rename to min
-   scripts.js — Scripts, concat to one file scripts.js and libs, eslint.format, sourcemaps, babel, terser, rename to min
-   fonts.js — Fonts, copy woff2 and woff, other convert to woff2 and woff
-   img.js — Images, optimize (quality 85) and copy images, convert to webp and resize
-   svgSprites.js — SVG sprites, optimize, make sprite and template to /dist/assets/icons/
-   copyDependencies.js — Copy dependencies, template if dont want to concat libs with scripts.js
-   favicon.js — Favicon, create from svg icon
-   favicon2html.js — Favicon to HTML, add favicon links to HTML head
-   fontsStyle.js — Fonts style, write info about fonts to /#src/scss/\_fonts.scss
-   serve.js — Live server, watching

## Requirements

-   [Node.js with npm](https://nodejs.org/en/)

## Installation

-   Extract folder in your project
-   Install all packages via `npm i` command
-   Run watcher and live server with `npm start` command

## Project structure

```
├─── /#src/                                 # Developing folder
    ├─── /assets/                           # Folder with favicon, fonts, icons, images
        ├─── /favicon/
            └─── favicon.ico
        ├─── /fonts/
            └─── Roboto-Regular.ttf
        ├─── /icons/
            └─── moon.svg
        └─── /img/
            └─── hello.png
    ├─── /pug/                              # Folder with pug files
        ├─── /extends/                      # Folder with layout
            ├─── layout.pug
            ├─── header.pug
            └─── footer.pug
        ├─── /includes/                     # Folders for page sections
            ├─── /about/
            └─── /index/
        ├───about.pug                       # Page
        └───index.pug                       # Page
    ├─── /scripts/                          # Folder with scripts
        └─── scripts.js
    └─── /scss/                             # Folder with styles
        ├─── /components/                   # Folder with styles for each section
            └─── header.scss
        ├─── _variables.scss                # For variable definition
        ├─── _fonts.scss                    # Turning on fonts
        ├─── _mixin.scss                    # Mixins for fonts, media etc
        ├─── _global.scss                   # For global styles
        └─── styles.scss                    # Importing all style files, normalize.css
├─── /gulp/                                 # Gulp tasks folder
    ├─── clean.js
    ├─── copyDependencies.js
    ├─── favicon.js
    ├─── favicon2html.js
    ├─── fonts.js
    ├─── fontsStyle.js
    ├─── img.js
    ├─── pug2html.js
    ├─── scripts.js
    ├─── serve.js
    ├─── scripts.js
    ├─── styles.js
    └─── svgSprites.js
├─── /dist/
    ├─── /assets/
        ├─── /favicon/
            └─── favicon.ico
        ├─── /fonts/
            ├─── Roboto-Regular.woff
            └─── Roboto-Regular.woff2
        ├─── /icons/
            └─── /stack/
                └─── sprite.stack.html
            └─── sprite.svg
        └─── /img/
            └─── hello.png
    ├─── /scripts/
        ├─── libs.min.js
        └─── scripts.min.js
    └─── /styles/
        └─── styles.min.css
    ├─── about.html
    └─── index.html
├─── .eslintignore                          # Linters
├─── .eslintrc.json
├─── .pug-lint.json
├─── .stylelintrc.json
├─── .gitattributes                         # Git files
├─── .gitignore
├─── gulpfile.js                            # Config Gulp.js
├─── package-lock.json                      # Config file
├─── package.json                           # Config file
└─── README.md                              # Documentation
```

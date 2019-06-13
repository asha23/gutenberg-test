/*
 * @title Styles
 * @description A task to compile Sass to CSS
 */

// Dependencies
import { src, dest, series } from 'gulp';
//import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import errorHandler from '../util/errorHandler.js';
import Assets from 'gulp-asset-hash';

import browserSync from 'browser-sync'

// Config
import { paths, isProd } from "../config";

export function scss() {
  return src(paths.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: ["node_modules"],
        outputStyle: "compressed"
      })
    )
    .pipe(postcss([autoprefixer({ browsers: "last 2 versions" })]))
    .pipe(sourcemaps.write("./maps"))
    .pipe(dest(paths.styles.dest))
  
    .pipe(browserSync.stream())
    .pipe(Assets.hash({
      manifest: './build/manifest.json',
      hashKey: 'g8Yz',
      hasher: 'md5'
    }));
    
}

// export function stylelint() {
//   return src(paths.styles.watch)
//     .pipe(gulpStylelint({
//       failAfterError: isProd,
//       reporters: [{ formatter: 'string', console: true }],
//       syntax: 'scss'
//     }));
// }

export const styles = series(scss);

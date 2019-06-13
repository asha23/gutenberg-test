/*
 * @title Images
 * @description A task to copy images
 */

// Dependencies
import { src, dest } from 'gulp';
import plumber from 'gulp-plumber';
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";
import errorHandler from '../util/errorHandler.js';

// Config
import { paths } from "../config";

// Task
export function images() {
  return src(paths.images.src)
    .pipe(plumber({ errorHandler }))
    .pipe(imagemin({verbose:true}))
    .pipe(changed(paths.images.dest))
    .pipe(dest(paths.images.dest));
}

// Optimise the WP uploads folder
export function images_uploads() {
  return src(paths.images_uploads.src)
    .pipe(plumber({ errorHandler }))
    .pipe(imagemin({verbose:true}))
    .pipe(changed(paths.images_uploads.dest))
    .pipe(dest(paths.images_uploads.dest));
}

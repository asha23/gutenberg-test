/*
 * @title Config
 */

// Paths
export const paths = {
  localhost: "http://collaborate.core",
  src: './library',
  dest: './build',
  deploy: './build/**/*',
  styles: {
    src: 'library/scss/styles.scss',
    watch: 'library/scss/**/*.scss',
    modules: 'library/modules/**/*.scss',
    dest: 'build/css',
    lint: 'library/scss/**/*.s+(a|c)ss'
  },
  scripts: {
    src: './library/js/app.js',
    watch: 'library/js/**/*.js',
    modules: 'library/modules/**/*.js',
    dest: 'build/js'
  },
  templates: {
    src: 'library/templates/pages/*.{twig,html}',
    watch: 'library/templates/**/*.{twig,html}',
    modules: 'library/modules/**/*.{twig,html}',
    dest: 'build/'
  },
  images: {
    src: 'library/images/**/*',
    dest: 'build/images'
  },
  images_uploads: {
    src: '../../uploads/**/*',
    dest: '../../uploads_optimised'
  },
  fonts: {
    src: 'library/fonts/**/*',
    dest: 'build/fonts'
  },
  copy: {
    src: 'library/robots.txt',
    dest: 'build/'
  }
};

export const isProd = process.env.NODE_ENV === 'production';

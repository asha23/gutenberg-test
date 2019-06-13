/*
 * @title gulpfile.babel.js
 * @description A directory file loader to include all the gulp tasks
 */

// Dependencies
import gulp from 'gulp';
import { series, parallel } from 'gulp';

// Tasks
import { reload, serve } from './tasks/server';
import { clean } from './tasks/clean';
import { styles } from './tasks/styles';
import { scripts } from './tasks/scripts';
import { images, images_uploads } from './tasks/images';
import { fonts } from './tasks/fonts';
import { deploy } from './tasks/deploy';

// Config
import { paths } from './config';

// Gulp Tasks
function watchFiles(done) {
	gulp.watch(
		[
			paths.styles.watch,
			paths.styles.modules
		],
		series(styles)
	);

	gulp.watch(
		[
			paths.scripts.watch,
			paths.scripts.modules
		],
		series(scripts, reload)
	);

	gulp.watch(
		paths.images.src,
		series(images, reload)
	);

	gulp.watch(
		paths.fonts.src,
		series(fonts, reload)
	);
	done();
}

export const build = series(
	clean,
	parallel(styles, scripts, images, images_uploads, fonts)
);

export const img = series(
	clean,
	parallel(images)
)

export const dev = series(
	build,
	serve,
	watchFiles
);

export const devWatch = series(
	serve,
	watchFiles
);

exports.deploy = deploy;

exports.watch = devWatch;

export default dev;

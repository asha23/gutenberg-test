<?php


//==============================================================================
// SCRIPTS & ENQUEUEING
//==============================================================================

add_action( 'wp_enqueue_scripts', 'seed_scripts_and_styles', 999 );

function seed_scripts_and_styles() {
	global $wp_styles;
	if (!is_admin()) {

		// Load asset manifest
		$assetstr = file_get_contents(dirname(dirname(__FILE__))."/build/manifest.json");
		$assets = json_decode($assetstr, true);
		$assets     = array(
			'css' => '/build/css/styles.css' . '?' . $assets['build/css/styles.css']['hash'],
			'vendor-scripts' => '/build/js/vendor.js' . '?' . $assets['build/js/vendor.js']['hash'],
			'js'  => '/build/js/app.js' . '?' . $assets['build/js/app.js']['hash'],
		);

		wp_register_style( 'styles', get_stylesheet_directory_uri() . $assets['css'], array(), '', 'all' );

		wp_deregister_script( 'jquery' );
		wp_register_script( 'scripts', get_stylesheet_directory_uri() . $assets['js'], array(), '', true );

		// Do it.
		wp_enqueue_style( 'styles' );
		wp_enqueue_script( 'scripts' );
		wp_enqueue_script( 'vendor' );

	}
}

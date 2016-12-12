<?php 
define( 'ET_BUILDER_THEME', true );

function extra_setup_builder() {
	add_action( 'et_builder_ready', 'extra_load_layout_builder_modules' );
}

add_action( 'init', 'extra_load_layout_builder_modules', 0 );

function extra_load_layout_builder_modules() {
	require dirname( __FILE__ ) . '/modules.php';
}

<?php
	add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
	function theme_enqueue_styles() {
	    wp_enqueue_style( 'divi', get_template_directory_uri() . '/style.css' );
      wp_enqueue_script( 'divi-script',get_template_directory_uri(). '-child/js/scripts.js', array( 'jquery' ), '0.1.2', true );

            wp_enqueue_script( 'maskinput-jquery',get_template_directory_uri(). '-child/js/maskinput-jquery.js', array( 'jquery', 'divi-script' ), '0.1.2', true );

            wp_enqueue_script( 'icheck-jquery',get_template_directory_uri(). '-child/js/icheck.min.js', array( 'jquery', 'divi-script' ), '0.1.2', true );

	}

	if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page();
	
}

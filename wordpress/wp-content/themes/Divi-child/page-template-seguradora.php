<?php
/*
Template Name: Seguradoras
*/

get_header();

$query = new WP_Query( array( 'cat' => 8 ) );?>

<div id="main-content">

<?php if ( $query->have_posts()) : ?>

	<div class="container">
		<div id="content-area" class="clearfix">
		    <?php while ( $query->have_posts() ) : $query->the_post(); ?>
				<?php
					$thumb = '';

					$width = (int) apply_filters( 'et_pb_index_blog_image_width', 1080 );

					$height = (int) apply_filters( 'et_pb_index_blog_image_height', 675 );
					$classtext = 'et_featured_image';
					$titletext = get_the_title();
					$thumbnail = get_thumbnail( $width, $height, $classtext, $titletext, $titletext, false, 'Blogimage' );
					$thumb = $thumbnail["thumb"];
					print_thumbnail( $thumb, $thumbnail["use_timthumb"], $titletext, $width, $height );					
				?>

					<div class="entry-content">
					<?php
						echo $query->post_content();

					?>
					</div> <!-- .entry-content --> 

				</article> <!-- .et_pb_post -->		
			<?php endwhile; ?>
		</div>	
	</div> <!-- #main-content -->
<?php endif; ?>
</div>
<?php get_footer(); ?>
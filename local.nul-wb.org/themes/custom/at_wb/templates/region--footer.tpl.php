<?php
/**
 * Available variables:
 *  
 * $content - The content for this region, typically blocks.
 * $classes - String of classes that can be used to style contextually through CSS. It can be manipulated through the variable $classes_array from preprocess functions. The default values can be one or more of the following:
 * region: The current template type, i.e., "theming hook".
 * region-[name]: The name of the region with underscores replaced with dashes. For example, the page_top region would have a region-page-top class.
 * $region - The name of the region variable as defined in the theme's .info file.
 *
 * Helper variables:
 * 
 * $classes_array - Array of html class attribute values. It is flattened into a string within the variable $classes.
 * $is_admin - Flags true when the current user is an administrator.
 * $is_front - Flags true when presented in the front page.
 * $logged_in - Flags true when the current user is a logged-in member.
 * 
 **/
?>
<div id='wb-footer'>

	<div class='wb-footer-description'>
    <?php print $content; ?>
    </div>

	<div class='wb-footer-content'>
	   <div class='wb-footer-menu'>
	   <?php
	      $main_menu_tree = menu_tree_all_data('main-menu');
          $main_menu_expanded = menu_tree_output($main_menu_tree);
		  print drupal_render($main_menu_expanded);
       ?>
       </div>

       <div class='wb-footer-logos'>
       	   <div class='wb-footer-nul-logo'>
            <img src='http://local.nul-wb.org/sites/local.nul-wb.org/files/images/footer/nul_emp_red_logo.png' />
       	   </div>
       	   <div class='wb-footer-iamemp-logo'>
       	   	  <img src='http://local.nul-wb.org/sites/local.nul-wb.org/files/images/footer/iae_logo_community.png' />
       	   </div>
       </div>

	   <div class='wb-footer-copyright'>
		Copyright &#169;<?php echo date('Y'); ?> National Urban League. All Rights Reserved.
	   </div>
	</div>
</div>
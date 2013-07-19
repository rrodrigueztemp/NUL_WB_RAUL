<?php
  if($is_front){
    $title = ''; // This is optional ... it removes the default Welcome to @site-name
    $page['content']['system_main']['default_message'] = array(); // This will remove the 'No front page content has been created yet.'
  }
?>

<div id="tophat"><?php print render($page['leaderboard']); ?></div>
<div id="page" class="container">
<div id="mobile_banner"> <?php print render($page['mobile_banner']); ?>
 </div> 
<?php //if ($secondary_navigation): print $secondary_navigation; endif; ?>
  <header class="" role="banner">
    <meta name="google-site-verification" content="puxbdFzUpjJMUuCJEPvFxMkIvFhEGZafjiO1Pl5NAX8" />
    <?php if ($linked_site_logo): ?>
      <div id="logo"><?php print $linked_site_logo; ?></div>
    <?php endif; ?>

    <?php print render($page['header']); ?>
    <div class="clearfix"></div>
  </header>

  <div id="main_nav">
  <?php print render($page['menu_bar']); ?>
  <?php //if ($primary_navigation): //print $primary_navigation; //endif; ?>
    <div id="nav_bar_underline">
    </div>
  </div>
 
  <?php print $messages; ?>
  <?php print render($page['help']); ?>
 
  <?php print render($page['secondary_content']); ?>
 
  <div id="columns"><div class="columns-inner clearfix">
    <div id="content-column"><div class="content-inner">

      <?php print render($page['highlighted']); ?>

      <?php $tag = $title ? 'section' : 'div'; ?>
      <<?php print $tag; ?> id="main-content" role="main">

        <?php print render($title_prefix); ?>
        <?php if ($title || $primary_local_tasks || $secondary_local_tasks || $action_links = render($action_links)): ?>
          <header>
            <?php if (!$is_front && $title): ?>
              <h1 id="page-title"><?php print $title; ?></h1>
            <?php endif; ?>

            <?php if ($primary_local_tasks || $secondary_local_tasks || $action_links): ?>
              <div id="tasks">
                <?php if ($primary_local_tasks): ?>
                  <ul class="tabs primary clearfix"><?php print render($primary_local_tasks); ?></ul>
                <?php endif; ?>
                <?php if ($secondary_local_tasks): ?>
                  <ul class="tabs secondary clearfix"><?php print render($secondary_local_tasks); ?></ul>
                <?php endif; ?>
                <?php if ($action_links = render($action_links)): ?>
                  <ul class="action-links clearfix"><?php print $action_links; ?></ul>
                <?php endif; ?>
              </div>
            <?php endif; ?>
          </header>
        <?php endif; ?>
        <?php print render($title_suffix); ?>

        <div id="content"><?php print render($page['content']); ?></div>

       

      </<?php print $tag; ?>>

      <?php print render($page['content_aside']); ?>

    </div>
    </div>
    <?php print render($page['sidebar_first']); ?>
    <?php print render($page['sidebar_second']); ?>

  </div>
  </div>
  
<div id="bottom-graphic">
  <?php print render($page['tertiary_content']); ?>

    <footer role="contentinfo">
      <?php if ($page['footer']): ?>
        <?php print render($page['footer']); ?>
      <?php endif; ?>
    </footer>
</div>

    <div id="footer-bottom" class="container">
    <div id="footer-bottom-right"></div>
    <div id="footer-bottom-left"></div>
    </div>

</div>

<!-- loadstorm-35415 -->
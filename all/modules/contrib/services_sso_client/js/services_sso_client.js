(function ($) {
  Drupal.behaviors.services_sso_client = {
    attach: function(context) {
      // Attach colorbox to edit links. This falls back gracefully without JS.
      jQuery('a.load-modal').each(function(i) {
        jQuery(this).colorbox({
          speed: 500,
          iframe: true,
          width: 1000,
          height: '80%',

          onClosed: function() {
            // Force a page refresh after colorbox has been closed.
            window.location.reload(false);
          }
        });
      });
    }
  };
})(jQuery);
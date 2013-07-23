(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;

(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
(function ($) {
  Drupal.viewsSlideshow = Drupal.viewsSlideshow || {};

  /**
   * Views Slideshow Controls
   */
  Drupal.viewsSlideshowControls = Drupal.viewsSlideshowControls || {};

  /**
   * Implement the play hook for controls.
   */
  Drupal.viewsSlideshowControls.play = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the pause hook for controls.
   */
  Drupal.viewsSlideshowControls.pause = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views Slideshow Text Controls
   */

  // Add views slieshow api calls for views slideshow text controls.
  Drupal.behaviors.viewsSlideshowControlsText = {
    attach: function (context) {

      // Process previous link
      $('.views_slideshow_controls_text_previous:not(.views-slideshow-controls-text-previous-processed)', context).addClass('views-slideshow-controls-text-previous-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_previous_', '');
        $(this).click(function() {
          Drupal.viewsSlideshow.action({ "action": 'previousSlide', "slideshowID": uniqueID });
          return false;
        });
      });

      // Process next link
      $('.views_slideshow_controls_text_next:not(.views-slideshow-controls-text-next-processed)', context).addClass('views-slideshow-controls-text-next-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_next_', '');
        $(this).click(function() {
          Drupal.viewsSlideshow.action({ "action": 'nextSlide', "slideshowID": uniqueID });
          return false;
        });
      });

      // Process pause link
      $('.views_slideshow_controls_text_pause:not(.views-slideshow-controls-text-pause-processed)', context).addClass('views-slideshow-controls-text-pause-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_pause_', '');
        $(this).click(function() {
          if (Drupal.settings.viewsSlideshow[uniqueID].paused) {
            Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID, "force": true });
          }
          else {
            Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID, "force": true });
          }
          return false;
        });
      });
    }
  };

  Drupal.viewsSlideshowControlsText = Drupal.viewsSlideshowControlsText || {};

  /**
   * Implement the pause hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.pause = function (options) {
    var pauseText = Drupal.theme.prototype['viewsSlideshowControlsPause'] ? Drupal.theme('viewsSlideshowControlsPause') : '';
    $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(pauseText);
  };

  /**
   * Implement the play hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.play = function (options) {
    var playText = Drupal.theme.prototype['viewsSlideshowControlsPlay'] ? Drupal.theme('viewsSlideshowControlsPlay') : '';
    $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(playText);
  };

  // Theme the resume control.
  Drupal.theme.prototype.viewsSlideshowControlsPause = function () {
    return Drupal.t('Resume');
  };

  // Theme the pause control.
  Drupal.theme.prototype.viewsSlideshowControlsPlay = function () {
    return Drupal.t('Pause');
  };

  /**
   * Views Slideshow Pager
   */
  Drupal.viewsSlideshowPager = Drupal.viewsSlideshowPager || {};

  /**
   * Implement the transitionBegin hook for pagers.
   */
  Drupal.viewsSlideshowPager.transitionBegin = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the goToSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.goToSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the previousSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.previousSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the nextSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.nextSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views Slideshow Pager Fields
   */

  // Add views slieshow api calls for views slideshow pager fields.
  Drupal.behaviors.viewsSlideshowPagerFields = {
    attach: function (context) {
      // Process pause on hover.
      $('.views_slideshow_pager_field:not(.views-slideshow-pager-field-processed)', context).addClass('views-slideshow-pager-field-processed').each(function() {
        // Parse out the location and unique id from the full id.
        var pagerInfo = $(this).attr('id').split('_');
        var location = pagerInfo[2];
        pagerInfo.splice(0, 3);
        var uniqueID = pagerInfo.join('_');

        // Add the activate and pause on pager hover event to each pager item.
        if (Drupal.settings.viewsSlideshowPagerFields[uniqueID][location].activatePauseOnHover) {
          $(this).children().each(function(index, pagerItem) {
            var mouseIn = function() {
              Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
              Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID });
            }
            
            var mouseOut = function() {
              Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID });
            }
          
            if (jQuery.fn.hoverIntent) {
              $(pagerItem).hoverIntent(mouseIn, mouseOut);
            }
            else {
              $(pagerItem).hover(mouseIn, mouseOut);
            }
            
          });
        }
        else {
          $(this).children().each(function(index, pagerItem) {
            $(pagerItem).click(function() {
              Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
            });
          });
        }
      });
    }
  };

  Drupal.viewsSlideshowPagerFields = Drupal.viewsSlideshowPagerFields || {};

  /**
   * Implement the transitionBegin hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.transitionBegin = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_'+ pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
    }

  };

  /**
   * Implement the goToSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.goToSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
    }
  };

  /**
   * Implement the previousSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.previousSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');

      // If we are on the first pager then activate the last pager.
      // Otherwise activate the previous pager.
      if (pagerNum == 0) {
        pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length() - 1;
      }
      else {
        pagerNum--;
      }

      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + pagerNum).addClass('active');
    }
  };

  /**
   * Implement the nextSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.nextSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');
      var totalPagers = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length();

      // If we are on the last pager then activate the first pager.
      // Otherwise activate the next pager.
      pagerNum++;
      if (pagerNum == totalPagers) {
        pagerNum = 0;
      }

      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + slideNum).addClass('active');
    }
  };


  /**
   * Views Slideshow Slide Counter
   */

  Drupal.viewsSlideshowSlideCounter = Drupal.viewsSlideshowSlideCounter || {};

  /**
   * Implement the transitionBegin for the slide counter.
   */
  Drupal.viewsSlideshowSlideCounter.transitionBegin = function (options) {
    $('#views_slideshow_slide_counter_' + options.slideshowID + ' .num').text(options.slideNum + 1);
  };

  /**
   * This is used as a router to process actions for the slideshow.
   */
  Drupal.viewsSlideshow.action = function (options) {
    // Set default values for our return status.
    var status = {
      'value': true,
      'text': ''
    }

    // If an action isn't specified return false.
    if (typeof options.action == 'undefined' || options.action == '') {
      status.value = false;
      status.text =  Drupal.t('There was no action specified.');
      return error;
    }

    // If we are using pause or play switch paused state accordingly.
    if (options.action == 'pause') {
      Drupal.settings.viewsSlideshow[options.slideshowID].paused = 1;
      // If the calling method is forcing a pause then mark it as such.
      if (options.force) {
        Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 1;
      }
    }
    else if (options.action == 'play') {
      // If the slideshow isn't forced pause or we are forcing a play then play
      // the slideshow.
      // Otherwise return telling the calling method that it was forced paused.
      if (!Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce || options.force) {
        Drupal.settings.viewsSlideshow[options.slideshowID].paused = 0;
        Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 0;
      }
      else {
        status.value = false;
        status.text += ' ' + Drupal.t('This slideshow is forced paused.');
        return status;
      }
    }

    // We use a switch statement here mainly just to limit the type of actions
    // that are available.
    switch (options.action) {
      case "goToSlide":
      case "transitionBegin":
      case "transitionEnd":
        // The three methods above require a slide number. Checking if it is
        // defined and it is a number that is an integer.
        if (typeof options.slideNum == 'undefined' || typeof options.slideNum !== 'number' || parseInt(options.slideNum) != (options.slideNum - 0)) {
          status.value = false;
          status.text = Drupal.t('An invalid integer was specified for slideNum.');
        }
      case "pause":
      case "play":
      case "nextSlide":
      case "previousSlide":
        // Grab our list of methods.
        var methods = Drupal.settings.viewsSlideshow[options.slideshowID]['methods'];

        // if the calling method specified methods that shouldn't be called then
        // exclude calling them.
        var excludeMethodsObj = {};
        if (typeof options.excludeMethods !== 'undefined') {
          // We need to turn the excludeMethods array into an object so we can use the in
          // function.
          for (var i=0; i < excludeMethods.length; i++) {
            excludeMethodsObj[excludeMethods[i]] = '';
          }
        }

        // Call every registered method and don't call excluded ones.
        for (i = 0; i < methods[options.action].length; i++) {
          if (Drupal[methods[options.action][i]] != undefined && typeof Drupal[methods[options.action][i]][options.action] == 'function' && !(methods[options.action][i] in excludeMethodsObj)) {
            Drupal[methods[options.action][i]][options.action](options);
          }
        }
        break;

      // If it gets here it's because it's an invalid action.
      default:
        status.value = false;
        status.text = Drupal.t('An invalid action "!action" was specified.', { "!action": options.action });
    }
    return status;
  };
})(jQuery);
;
(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + Drupal.settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;
/**
 * @file
 *
 * Implement a modal form.
 *
 * @see modal.inc for documentation.
 *
 * This javascript relies on the CTools ajax responder.
 */

(function ($) {
  // Make sure our objects are defined.
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.Modal = Drupal.CTools.Modal || {};

  /**
   * Display the modal
   *
   * @todo -- document the settings.
   */
  Drupal.CTools.Modal.show = function(choice) {
    var opts = {};

    if (choice && typeof choice == 'string' && Drupal.settings[choice]) {
      // This notation guarantees we are actually copying it.
      $.extend(true, opts, Drupal.settings[choice]);
    }
    else if (choice) {
      $.extend(true, opts, choice);
    }

    var defaults = {
      modalTheme: 'CToolsModalDialog',
      throbberTheme: 'CToolsModalThrobber',
      animation: 'show',
      animationSpeed: 'fast',
      modalSize: {
        type: 'scale',
        width: .8,
        height: .8,
        addWidth: 0,
        addHeight: 0,
        // How much to remove from the inner content to make space for the
        // theming.
        contentRight: 25,
        contentBottom: 45
      },
      modalOptions: {
        opacity: .55,
        background: '#fff'
      }
    };

    var settings = {};
    $.extend(true, settings, defaults, Drupal.settings.CToolsModal, opts);

    if (Drupal.CTools.Modal.currentSettings && Drupal.CTools.Modal.currentSettings != settings) {
      Drupal.CTools.Modal.modal.remove();
      Drupal.CTools.Modal.modal = null;
    }

    Drupal.CTools.Modal.currentSettings = settings;

    var resize = function(e) {
      // When creating the modal, it actually exists only in a theoretical
      // place that is not in the DOM. But once the modal exists, it is in the
      // DOM so the context must be set appropriately.
      var context = e ? document : Drupal.CTools.Modal.modal;

      if (Drupal.CTools.Modal.currentSettings.modalSize.type == 'scale') {
        var width = $(window).width() * Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = $(window).height() * Drupal.CTools.Modal.currentSettings.modalSize.height;
      }
      else {
        var width = Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = Drupal.CTools.Modal.currentSettings.modalSize.height;
      }

      // Use the additionol pixels for creating the width and height.
      $('div.ctools-modal-content', context).css({
        'width': width + Drupal.CTools.Modal.currentSettings.modalSize.addWidth + 'px',
        'height': height + Drupal.CTools.Modal.currentSettings.modalSize.addHeight + 'px'
      });
      $('div.ctools-modal-content .modal-content', context).css({
        'width': (width - Drupal.CTools.Modal.currentSettings.modalSize.contentRight) + 'px',
        'height': (height - Drupal.CTools.Modal.currentSettings.modalSize.contentBottom) + 'px'
      });
    }

    if (!Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.modal = $(Drupal.theme(settings.modalTheme));
      if (settings.modalSize.type == 'scale') {
        $(window).bind('resize', resize);
      }
    }

    resize();

    $('span.modal-title', Drupal.CTools.Modal.modal).html(Drupal.CTools.Modal.currentSettings.loadingText);
    Drupal.CTools.Modal.modalContent(Drupal.CTools.Modal.modal, settings.modalOptions, settings.animation, settings.animationSpeed);
    $('#modalContent .modal-content').html(Drupal.theme(settings.throbberTheme));
  };

  /**
   * Hide the modal
   */
  Drupal.CTools.Modal.dismiss = function() {
    if (Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.unmodalContent(Drupal.CTools.Modal.modal);
    }
  };

  /**
   * Provide the HTML to create the modal dialog.
   */
  Drupal.theme.prototype.CToolsModalDialog = function () {
    var html = ''
    html += '  <div id="ctools-modal">'
    html += '    <div class="ctools-modal-content">' // panels-modal-content
    html += '      <div class="modal-header">';
    html += '        <a class="close" href="#">';
    html +=            Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '        </a>';
    html += '        <span id="modal-title" class="modal-title">&nbsp;</span>';
    html += '      </div>';
    html += '      <div id="modal-content" class="modal-content">';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    return html;
  }

  /**
   * Provide the HTML to create the throbber.
   */
  Drupal.theme.prototype.CToolsModalThrobber = function () {
    var html = '';
    html += '  <div id="modal-throbber">';
    html += '    <div class="modal-throbber-wrapper">';
    html +=        Drupal.CTools.Modal.currentSettings.throbber;
    html += '    </div>';
    html += '  </div>';

    return html;
  };

  /**
   * Figure out what settings string to use to display a modal.
   */
  Drupal.CTools.Modal.getSettings = function (object) {
    var match = $(object).attr('class').match(/ctools-modal-(\S+)/);
    if (match) {
      return match[1];
    }
  }

  /**
   * Click function for modals that can be cached.
   */
  Drupal.CTools.Modal.clickAjaxCacheLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return Drupal.CTools.AJAX.clickAJAXCacheLink.apply(this);
  };

  /**
   * Handler to prepare the modal for the response
   */
  Drupal.CTools.Modal.clickAjaxLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return false;
  };

  /**
   * Submit responder to do an AJAX submit on all modal forms.
   */
  Drupal.CTools.Modal.submitAjaxForm = function(e) {
    var $form = $(this);
    var url = $form.attr('action');

    setTimeout(function() { Drupal.CTools.AJAX.ajaxSubmit($form, url); }, 1);
    return false;
  }

  /**
   * Bind links that will open modals to the appropriate function.
   */
  Drupal.behaviors.ZZCToolsModal = {
    attach: function(context) {
      // Bind links
      // Note that doing so in this order means that the two classes can be
      // used together safely.
      /*
       * @todo remimplement the warm caching feature
       $('a.ctools-use-modal-cache', context).once('ctools-use-modal', function() {
         $(this).click(Drupal.CTools.Modal.clickAjaxCacheLink);
         Drupal.CTools.AJAX.warmCache.apply(this);
       });
        */

      $('area.ctools-use-modal, a.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        // Create a drupal ajax object
        var element_settings = {};
        if ($this.attr('href')) {
          element_settings.url = $this.attr('href');
          element_settings.event = 'click';
          element_settings.progress = { type: 'throbber' };
        }
        var base = $this.attr('href');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });

      // Bind buttons
      $('input.ctools-use-modal, button.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        var button = this;
        var element_settings = {};

        // AJAX submits specified in this manner automatically submit to the
        // normal form action.
        element_settings.url = Drupal.CTools.Modal.findURL(this);
        element_settings.event = 'click';

        var base = $this.attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);

        // Make sure changes to settings are reflected in the URL.
        $('.' + $(button).attr('id') + '-url').change(function() {
          Drupal.ajax[base].options.url = Drupal.CTools.Modal.findURL(button);
        });
      });

      // Bind our custom event to the form submit
      $('#modal-content form', context).once('ctools-use-modal', function() {
        var $this = $(this);
        var element_settings = {};

        element_settings.url = $this.attr('action');
        element_settings.event = 'submit';
        element_settings.progress = { 'type': 'throbber' }
        var base = $this.attr('id');

        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        Drupal.ajax[base].form = $this;

        $('input[type=submit], button', this).click(function(event) {
          Drupal.ajax[base].element = this;
          this.form.clk = this;
          // An empty event means we were triggered via .click() and
          // in jquery 1.4 this won't trigger a submit.
          if (event.bubbles == undefined) {
            $(this.form).trigger('submit');
            return false;
          }
        });
      });

      // Bind a click handler to allow elements with the 'ctools-close-modal'
      // class to close the modal.
      $('.ctools-close-modal', context).once('ctools-close-modal')
        .click(function() {
          Drupal.CTools.Modal.dismiss();
          return false;
        });
    }
  };

  // The following are implementations of AJAX responder commands.

  /**
   * AJAX responder command to place HTML within the modal.
   */
  Drupal.CTools.Modal.modal_display = function(ajax, response, status) {
    if ($('#modalContent').length == 0) {
      Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(ajax.element));
    }
    $('#modal-title').html(response.title);
    // Simulate an actual page load by scrolling to the top after adding the
    // content. This is helpful for allowing users to see error messages at the
    // top of a form, etc.
    $('#modal-content').html(response.output).scrollTop(0);
    Drupal.attachBehaviors();
  }

  /**
   * AJAX responder command to dismiss the modal.
   */
  Drupal.CTools.Modal.modal_dismiss = function(command) {
    Drupal.CTools.Modal.dismiss();
    $('link.ctools-temporary-css').remove();
  }

  /**
   * Display loading
   */
  //Drupal.CTools.AJAX.commands.modal_loading = function(command) {
  Drupal.CTools.Modal.modal_loading = function(command) {
    Drupal.CTools.Modal.modal_display({
      output: Drupal.theme(Drupal.CTools.Modal.currentSettings.throbberTheme),
      title: Drupal.CTools.Modal.currentSettings.loadingText
    });
  }

  /**
   * Find a URL for an AJAX button.
   *
   * The URL for this gadget will be composed of the values of items by
   * taking the ID of this item and adding -url and looking for that
   * class. They need to be in the form in order since we will
   * concat them all together using '/'.
   */
  Drupal.CTools.Modal.findURL = function(item) {
    var url = '';
    var url_class = '.' + $(item).attr('id') + '-url';
    $(url_class).each(
      function() {
        var $this = $(this);
        if (url && $this.val()) {
          url += '/';
        }
        url += $this.val();
      });
    return url;
  };


  /**
   * modalContent
   * @param content string to display in the content box
   * @param css obj of css attributes
   * @param animation (fadeIn, slideDown, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.modalContent = function(content, css, animation, speed) {
    // If our animation isn't set, make it just show/pop
    if (!animation) {
      animation = 'show';
    }
    else {
      // If our animation isn't "fadeIn" or "slideDown" then it always is show
      if (animation != 'fadeIn' && animation != 'slideDown') {
        animation = 'show';
      }
    }

    if (!speed) {
      speed = 'fast';
    }

    // Build our base attributes and allow them to be overriden
    css = jQuery.extend({
      position: 'absolute',
      left: '0px',
      margin: '0px',
      background: '#000',
      opacity: '.55'
    }, css);

    // Add opacity handling for IE.
    css.filter = 'alpha(opacity=' + (100 * css.opacity) + ')';
    content.hide();

    // if we already ahve a modalContent, remove it
    if ( $('#modalBackdrop')) $('#modalBackdrop').remove();
    if ( $('#modalContent')) $('#modalContent').remove();

    // position code lifted from http://www.quirksmode.org/viewport/compatibility.html
    if (self.pageYOffset) { // all except Explorer
    var wt = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
      var wt = document.documentElement.scrollTop;
    } else if (document.body) { // all other Explorers
      var wt = document.body.scrollTop;
    }

    // Get our dimensions

    // Get the docHeight and (ugly hack) add 50 pixels to make sure we dont have a *visible* border below our div
    var docHeight = $(document).height() + 50;
    var docWidth = $(document).width();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    if( docHeight < winHeight ) docHeight = winHeight;

    // Create our divs
    $('body').append('<div id="modalBackdrop" style="z-index: 1000; display: none;"></div><div id="modalContent" style="z-index: 1001; position: absolute;">' + $(content).html() + '</div>');

    // Keyboard and focus event handler ensures focus stays on modal elements only
    modalEventHandler = function( event ) {
      target = null;
      if ( event ) { //Mozilla
        target = event.target;
      } else { //IE
        event = window.event;
        target = event.srcElement;
      }

      var parents = $(target).parents().get();
      for (var i = 0; i < parents.length; ++i) {
        var position = $(parents[i]).css('position');
        if (position == 'absolute' || position == 'fixed') {
          return true;
        }
      }
      if( $(target).filter('*:visible').parents('#modalContent').size()) {
        // allow the event only if target is a visible child node of #modalContent
        return true;
      }
      if ( $('#modalContent')) $('#modalContent').get(0).focus();
      return false;
    };
    $('body').bind( 'focus', modalEventHandler );
    $('body').bind( 'keypress', modalEventHandler );

    // Create our content div, get the dimensions, and hide it
    var modalContent = $('#modalContent').css('top','-1000px');
    var mdcTop = wt + ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
    var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);
    $('#modalBackdrop').css(css).css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').show();
    modalContent.css({top: mdcTop + 'px', left: mdcLeft + 'px'}).hide()[animation](speed);

    // Bind a click for closing the modalContent
    modalContentClose = function(){close(); return false;};
    $('.close').bind('click', modalContentClose);

    // Bind a keypress on escape for closing the modalContent
    modalEventEscapeCloseHandler = function(event) {
      if (event.keyCode == 27) {
        close();
        return false;
      }
    };

    $(document).bind('keydown', modalEventEscapeCloseHandler);

    // Close the open modal content and backdrop
    function close() {
      // Unbind the events
      $(window).unbind('resize',  modalContentResize);
      $('body').unbind( 'focus', modalEventHandler);
      $('body').unbind( 'keypress', modalEventHandler );
      $('.close').unbind('click', modalContentClose);
      $('body').unbind('keypress', modalEventEscapeCloseHandler);
      $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

      // Set our animation parameters and use them
      if ( animation == 'fadeIn' ) animation = 'fadeOut';
      if ( animation == 'slideDown' ) animation = 'slideUp';
      if ( animation == 'show' ) animation = 'hide';

      // Close the content
      modalContent.hide()[animation](speed);

      // Remove the content
      $('#modalContent').remove();
      $('#modalBackdrop').remove();
    };

    // Move and resize the modalBackdrop and modalContent on resize of the window
     modalContentResize = function(){
      // Get our heights
      var docHeight = $(document).height();
      var docWidth = $(document).width();
      var winHeight = $(window).height();
      var winWidth = $(window).width();
      if( docHeight < winHeight ) docHeight = winHeight;

      // Get where we should move content to
      var modalContent = $('#modalContent');
      var mdcTop = ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
      var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);

      // Apply the changes
      $('#modalBackdrop').css('height', docHeight + 'px').css('width', docWidth + 'px').show();
      modalContent.css('top', mdcTop + 'px').css('left', mdcLeft + 'px').show();
    };
    $(window).bind('resize', modalContentResize);

    $('#modalContent').focus();
  };

  /**
   * unmodalContent
   * @param content (The jQuery object to remove)
   * @param animation (fadeOut, slideUp, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.unmodalContent = function(content, animation, speed)
  {
    // If our animation isn't set, make it just show/pop
    if (!animation) { var animation = 'show'; } else {
      // If our animation isn't "fade" then it always is show
      if (( animation != 'fadeOut' ) && ( animation != 'slideUp')) animation = 'show';
    }
    // Set a speed if we dont have one
    if ( !speed ) var speed = 'fast';

    // Unbind the events we bound
    $(window).unbind('resize', modalContentResize);
    $('body').unbind('focus', modalEventHandler);
    $('body').unbind('keypress', modalEventHandler);
    $('.close').unbind('click', modalContentClose);
    $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

    // jQuery magic loop through the instances and run the animations or removal.
    content.each(function(){
      if ( animation == 'fade' ) {
        $('#modalContent').fadeOut(speed, function() {
          $('#modalBackdrop').fadeOut(speed, function() {
            $(this).remove();
          });
          $(this).remove();
        });
      } else {
        if ( animation == 'slide' ) {
          $('#modalContent').slideUp(speed,function() {
            $('#modalBackdrop').slideUp(speed, function() {
              $(this).remove();
            });
            $(this).remove();
          });
        } else {
          $('#modalContent').remove();
          $('#modalBackdrop').remove();
        }
      }
    });
  };

$(function() {
  Drupal.ajax.prototype.commands.modal_display = Drupal.CTools.Modal.modal_display;
  Drupal.ajax.prototype.commands.modal_dismiss = Drupal.CTools.Modal.modal_dismiss;
});

})(jQuery);
;
/**
 * @file
 * Implement basic methods required by all of panels.
 */

(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.changed = function(item) {
    if (!item.is('.changed')) {
      item.addClass('changed');
      item.find('div.grabber span.text').append(' <span class="star">*</span> ');
    }
  };

  Drupal.Panels.restripeTable = function(table) {
    // :even and :odd are reversed because jquery counts from 0 and
    // we count from 1, so we're out of sync.
    $('tbody tr:not(:hidden)', $(table))
      .removeClass('even')
      .removeClass('odd')
      .filter(':even')
        .addClass('odd')
      .end()
      .filter(':odd')
        .addClass('even');
  };
})(jQuery);
;
/**
 * @file display_editor.js
 *
 * Contains the javascript for the Panels display editor.
 */

(function ($) {

// randomly lock a pane.
// @debug only
Drupal.settings.Panels = Drupal.settings.Panels || {};


/** Delete pane button **/
Drupal.Panels.bindClickDelete = function(context) {
  $('a.pane-delete:not(.pane-delete-processed)', context)
    .addClass('pane-delete-processed')
    .click(function() {
    if (confirm('Remove this pane?')) {
      var id = '#' + $(this).attr('id').replace('pane-delete-', '');
      $(id).remove();
      Drupal.Panels.Draggable.savePositions();
    }
    return false;
  });
};

Drupal.Panels.bindPortlet = function() {
  var handle = $(this).find('.panel-pane-collapsible > div.pane-title');
  var content = $(this).find('.panel-pane-collapsible > div.pane-content');
  if (content.length) {
    var toggle = $('<span class="toggle toggle-collapsed"></span>');
    handle.before(toggle);
    toggle.click(function() {
      content.slideToggle(20);
      toggle.toggleClass('toggle-collapsed');
    });
    handle.click(function() {
      content.slideToggle(20);
      toggle.toggleClass('toggle-collapsed');
    });
    content.hide();
  }
};

Drupal.Panels.Draggable = {
  // The draggable object
  object: null,

  // Where objects can be dropped
  dropzones: [],
  current_dropzone: null,

  // positions within dropzones where an object can be plazed
  landing_pads: [],
  current_pad: null,

  // Where the object is
  mouseOffset: { x: 0, y: 0 },
  windowOffset: { x: 0, y: 0 },
  offsetDivHeight: 0,

  // original settings to be restored
  original: {},
  // a placeholder so that if the object is let go but not over a drop zone,
  // it can be put back where it belongs
  placeholder: {},

  hoverclass: 'hoverclass',
  helperclass: 'helperclass',
  accept: 'div.panel-region',
  handle: 'div.grabber',
  draggable: 'div.panel-portlet',
  main: 'div#panels-dnd-main',

  // part of the id to remove to get just the number
  draggableId: 'panel-pane-',

  // part of the id to remove to get just the number
  regionId: 'panel-region-',

  // What to add to the front of a the id to get the form id for a panel
  formId: 'input#edit-',

  maxWidth: 250,

  unsetDropZone: function() {
    $(this.current_dropzone.obj).removeClass(this.hoverclass);
    this.current_dropzone = null;
    for (var i in this.landing_pads) {
      $(this.landing_pads[i].obj).remove();
    }
    this.landing_pads = [];
    this.current_pad = null;
  },

  createLandingPad: function(where, append) {
    var obj = $('<div class="' + this.helperclass +'" id="' +
      $(where).attr('id') + '-dropzone">&nbsp;</div>');
    if (append) {
      $(where).append(obj);
    }
    else {
      $(where).before(obj);
    }
    var offset = $(obj).offset();

    $(obj).css({
      display: 'none'
    });
    this.landing_pads.push({
      centerX: offset.left + ($(obj).innerWidth() / 2),
      centerY: offset.top + ($(obj).innerHeight() / 2),
      obj: obj
    });
    return obj;
  },

  calculateDropZones: function(event, dropzone) {
    var draggable = Drupal.Panels.Draggable;
    var dropzones = [];
    $(this.accept).each(function() {
      var offset = $(this).offset();
      offset.obj = this;
      offset.region = this.id.replace(draggable.regionId, '');
      offset.width = $(this).outerWidth();
      offset.height = $(this).outerHeight();
      dropzones.push(offset);
    });
    this.dropzones = dropzones;
  },

  reCalculateDropZones: function() {
    for (var i in this.dropzones) {
      var offset = $(this.dropzones[i].obj).offset();
      offset.width = $(this.dropzones[i].obj).outerWidth();
      offset.height = $(this.dropzones[i].obj).outerHeight();
      $.extend(this.dropzones[i], offset);
    }
  },

  changeDropZone: function(new_dropzone) {
    // Unset our old dropzone.
    if (this.current_dropzone) {
      this.unsetDropZone();
    }

    // Set up our new dropzone.
    this.current_dropzone = new_dropzone;
    $(this.current_dropzone.obj).addClass(this.hoverclass);
    // add a landing pad
    this.createLandingPad(this.current_dropzone.obj, true);

    var that = this;
    // Create a landing pad before each existing portlet.
    $(this.current_dropzone.obj).find(this.draggable).each(function() {
      if (that.object.id != this.id) {
        that.createLandingPad(this, false);
      }
    });
  },

  findLandingPad: function(x, y) {
    var shortest_distance = null;
    var nearest_pad = null;
    // find the nearest pad.
    for (var i in this.landing_pads) {
      // This isn't the real distance, this is the square of the
      // distance -- no point in spending processing time on
      // sqrt.
      var dstx = Math.abs(x - this.landing_pads[i].centerX);
      var dsty = Math.abs(y - this.landing_pads[i].centerY);
      var distance =  (dstx * dstx) + (dsty * dsty);
      if (shortest_distance == null || distance < shortest_distance) {
        shortest_distance = distance;
        nearest_pad = this.landing_pads[i];
      }
    }
    if (nearest_pad != this.current_pad) {
      if (this.current_pad) {
        $(this.current_pad.obj).hide();
      }
      this.current_pad = nearest_pad;
      $(nearest_pad.obj).show();
    }
  },

  findDropZone: function(x, y) {
    // Go through our dropzones and see if we're over one.
    var new_dropzone = null;
    for (var i in this.dropzones) {
//      console.log('x:' + x + ' left:' + this.dropzones[i].left + ' right: ' + this.dropzones[i].left + this.dropzones[i].width);
      if (this.dropzones[i].left < x &&
        x < this.dropzones[i].left + this.dropzones[i].width &&
        this.dropzones[i].top < y &&
        y < this.dropzones[i].top + this.dropzones[i].height) {
          new_dropzone = this.dropzones[i];
          break;
      }
    }
    // If we're over one, see if it's different.
    if (new_dropzone && (!this.regionLock || this.regionLockRegions[new_dropzone.region])) {
      var changed = false;
      if (!this.current_dropzone || new_dropzone.obj.id != this.current_dropzone.obj.id) {
        this.changeDropZone(new_dropzone);
        changed = true;
      }
      this.findLandingPad(x, y);
      if (changed)  {
        // recalculate the size of our drop zones due to the fact that we're drawing landing pads.
        this.reCalculateDropZones();
      }
    }
    // If we're not over one, be sure to unhilite one if we were just
    // over it.
    else if (this.current_dropzone) {
      this.unsetDropZone();
    }
  },

  /** save button clicked, or pane deleted **/
  savePositions: function() {
    var draggable = Drupal.Panels.Draggable;
    $(draggable.accept).each(function() {
      var val = '';
      $(this).find(draggable.draggable).each(function() {
        if (val) {
          val += ',';
        }

        val += this.id.replace(draggable.draggableId, '');
      });
      var region = this.id.replace(draggable.regionId, '');
      $('input[name="panel[pane][' +  region + ']"]').val(val);
    });
    return false;
  }
};

Drupal.Panels.DraggableHandler = function() {
  $(this).addClass('panel-draggable');
  var draggable = Drupal.Panels.Draggable;
  var scrollBuffer = 10;
  var scrollDistance = 10;
  var scrollTimer = 30;

  getMouseOffset = function(docPos, mousePos, windowPos) {
    return { x: mousePos.x - docPos.x + windowPos.x, y: mousePos.y - docPos.y + windowPos.y};
  };

  getMousePos = function(ev) {
    ev = ev || window.event;

    if (ev.pageX || ev.pageY) {
      return { x:ev.pageX, y:ev.pageY };
    }
    return {
      x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
      y:ev.clientY + document.body.scrollTop  - document.body.clientTop
    };
  };

  getPosition = function(e) {
    /*
    if (document.defaultView && document.defaultView.getComputedStyle) {
      var css = document.defaultView.getComputedStyle(e, null);
      return {
        x: parseInt(css.getPropertyValue('left')),
        y: parseInt(css.getPropertyValue('top'))
      };
    }
    */
    var left = 0;
    var top  = 0;

    while (e.offsetParent) {
      left += e.offsetLeft;
      top  += e.offsetTop;
      e     = e.offsetParent;
    }

    left += e.offsetLeft;
    top  += e.offsetTop;

    return { x:left, y:top };
  };

  mouseUp = function(e) {
    clearTimeout(draggable.timeoutId);
    draggable.dropzones = [];

    if (draggable.current_pad) {
      // Drop the object where we're hovering
      $(draggable.object).insertAfter($(draggable.current_pad.obj));
      Drupal.Panels.changed($(draggable.object));
    }
    else {
      // or put it back where it came from
      $(draggable.object).insertAfter(draggable.placeholder);
    }
    // remove the placeholder
    draggable.placeholder.remove();

    // restore original settings.
    $(draggable.object).css(draggable.original);
    if (draggable.current_dropzone) {
      draggable.unsetDropZone();
    }

    $(document).unbind('mouseup').unbind('mousemove');
    draggable.savePositions();
  };

  mouseMove = function(e) {
    draggable.mousePos = getMousePos(e);

    draggable.findDropZone(draggable.mousePos.x, draggable.mousePos.y);

    var windowMoved = parseInt(draggable.offsetDivHeight - $(draggable.main).innerHeight());

    draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + windowMoved + 'px';
    draggable.object.style.left = draggable.mousePos.x - draggable.mouseOffset.x  + 'px';
    $(draggable.object).toggleClass('moving');
  };

  mouseDown = function(e) {
    // If we mouse-downed over something clickable, don't drag!
    if (e.target.nodeName == 'A' || e.target.nodeName == 'INPUT' || e.target.parentNode.nodeName == 'A' || e.target.nodeName.nodeName == 'INPUT') {
      return;
    }

    draggable.object = $(this).parent(draggable.draggable).get(0);
    draggable.paneId = draggable.object.id.replace(draggable.draggableId, '');

    // create a placeholder so we can put this object back if dropped in an invalid location.
    draggable.placeholder = $('<div class="draggable-placeholder-object" style="display:none"></div>"');
    $(draggable.object).after(draggable.placeholder);

    // Store original CSS so we can put it back.
    draggable.original = {
      position: $(draggable.object).css('position'),
      width: 'auto',
      left: $(draggable.object).css('left'),
      top: $(draggable.object).css('top'),
      'z-index': $(draggable.object).css('z-index'),
      'margin-bottom': $(draggable.object).css('margin-bottom'),
      'margin-top': $(draggable.object).css('margin-top'),
      'margin-left': $(draggable.object).css('margin-left'),
      'margin-right': $(draggable.object).css('margin-right'),
      'padding-bottom': $(draggable.object).css('padding-bottom'),
      'padding-top': $(draggable.object).css('padding-top'),
      'padding-left': $(draggable.object).css('padding-left'),
      'padding-right': $(draggable.object).css('padding-right')
    };

    draggable.mousePos = getMousePos(e);
    var originalPos = $(draggable.object).offset();
    var width = Math.min($(draggable.object).innerWidth(), draggable.maxWidth);

    draggable.offsetDivHeight = $(draggable.main).innerHeight();
    draggable.findDropZone(draggable.mousePos.x, draggable.mousePos.y);

    // Make copies of these because in FF3, they actually change when we
    // move the item, whereas they did not in FF2.

    if (e.layerX || e.layerY) {
      var layerX = e.layerX;
      var layerY = e.layerY;
    }
    else if (e.originalEvent && e.originalEvent.layerX) {
      var layerX = e.originalEvent.layerX;
      var layerY = e.originalEvent.layerY;
    }

    // Make the draggable relative, get it out of the way and make it
    // invisible.
    $(draggable.object).css({
      position: 'relative',
      'z-index': 100,
      width: width + 'px',
      'margin-bottom': (-1 * parseInt($(draggable.object).outerHeight())) + 'px',
      'margin-top': 0,
      'margin-left': 0,
      'margin-right': (-1 * parseInt($(draggable.object).outerWidth())) + 'px',
      'padding-bottom': 0,
      'padding-top': 0,
      'padding-left': 0,
      'padding-right': 0,
      'left': 0,
      'top': 0
    })
      .insertAfter($(draggable.main));
    var newPos = $(draggable.object).offset();

    var windowOffset = { left: originalPos.left - newPos.left, top: originalPos.top - newPos.top }

    // if they grabbed outside the area where we make the draggable smaller, move it
    // closer to the cursor.
    if (layerX != 'undefined' && layerX > width) {
      windowOffset.left += layerX - 10;
    }
    else if (layerX != 'undefined' && e.offsetX > width) {
      windowOffset.left += e.offsetX - 10;
    }

    // This is stored so we can move with it.
    draggable.mouseOffset = { x: draggable.mousePos.x - windowOffset.left, y: draggable.mousePos.y - windowOffset.top};
    draggable.offsetDivHeight = $(draggable.main).innerHeight();

    draggable.object.style.top = windowOffset.top + 'px';
    draggable.object.style.left = windowOffset.left + 'px';
    $(document).unbind('mouseup').unbind('mousemove').mouseup(mouseUp).mousemove(mouseMove);

    draggable.calculateDropZones(draggable.mousePos, e);
    draggable.timeoutId = setTimeout('timer()', scrollTimer);

    // If locking to a particular set of regions, set that:
    if (Drupal.settings.Panels && Drupal.settings.Panels.RegionLock && Drupal.settings.Panels.RegionLock[draggable.paneId]) {
      draggable.regionLock = true;
      draggable.regionLockRegions = Drupal.settings.Panels.RegionLock[draggable.paneId];
    }
    else {
      draggable.regionLock = false;
      draggable.regionLockRegions = null;
    }

    return false;
  };

  timer = function() {
    if (!draggable.timeCount) {
      draggable.timeCount = 0;
    }
    draggable.timeCount = draggable.timeCount + 1;
    var left = $(window).scrollLeft();
    var right = left + $(window).width();
    var top = $(window).scrollTop();
    var bottom = top + $(window).height();

    if (draggable.mousePos.x < left + scrollBuffer && left > 0) {
      window.scrollTo(left - scrollDistance, top);
      draggable.mousePos.x -= scrollDistance;
      draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + 'px';
    }
    else if (draggable.mousePos.x > right - scrollBuffer) {
      window.scrollTo(left + scrollDistance, top);
      draggable.mousePos.x += scrollDistance;
      draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + 'px';
    }
    else if (draggable.mousePos.y < top + scrollBuffer && top > 0) {
      window.scrollTo(left, top - scrollDistance);
      draggable.mousePos.y -= scrollDistance;
      draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + 'px';
    }
    else if (draggable.mousePos.y > bottom - scrollBuffer) {
      window.scrollTo(left, top + scrollDistance);
      draggable.mousePos.y += scrollDistance;
      draggable.object.style.top = draggable.mousePos.y - draggable.mouseOffset.y + 'px';
    }

    draggable.timeoutId = setTimeout('timer()', scrollTimer);
  }

  $(this).mousedown(mouseDown);
};

$.fn.extend({
  panelsDraggable: Drupal.Panels.DraggableHandler
});

/**
 * Implement Drupal behavior for autoattach
 */
Drupal.behaviors.PanelsDisplayEditor = {
  attach: function(context) {
    // Show javascript only items.
    $('span#panels-js-only').css('display', 'inline');

    $('#panels-dnd-main div.panel-pane:not(.panel-portlet)')
      .addClass('panel-portlet')
      .each(Drupal.Panels.bindPortlet);

    // The above doesn't work if context IS the pane, so do this to catch that.
    if ($(context).hasClass('panel-pane') && !$(context).hasClass('panel-portlet')) {
      $(context)
        .addClass('panel-portlet')
        .each(Drupal.Panels.bindPortlet);
    }

    // Make draggables and make sure their positions are saved.
    $(context).find('div.grabber:not(.panel-draggable)').panelsDraggable();
    Drupal.Panels.Draggable.savePositions();

    // Bind buttons.
    $('input#panels-hide-all', context).click(Drupal.Panels.clickHideAll);
    $('input#panels-show-all', context).click(Drupal.Panels.clickShowAll);

    Drupal.Panels.bindClickDelete(context);

    $('#panels-live-preview-button:not(.panels-preview-processed)')
      .addClass('panels-preview-processed')
      .click(function () {
        if (!$('#panels-preview').size()) {
          $('#panels-dnd-main').parents('form').after('<div id="panels-preview" class="clearfix"></div>');
        }
        var html = '';
        html += '  <div id="modal-throbber">';
        html += '    <div class="modal-throbber-wrapper">';
        html +=        Drupal.settings.CToolsModal.throbber;
        html += '    </div>';
        html += '  </div>';

        $('#panels-preview').html(html);
      });

    var setTitleClass = function () {
      if ($('#edit-display-title-hide-title').val() == 2) {
        $('#panels-dnd-main').removeClass('panels-set-title-hide');
      }
      else {
        $('#panels-dnd-main').addClass('panels-set-title-hide');
      }
    }

    // The panes have an option to set the display title, but only if
    // a select is set to the proper value. This sets a class on the
    // main edit div so that the option to set the display title
    // is hidden if that is not selected, and visible if it is.
    $('#edit-display-title-hide-title:not(.panels-title-processed)')
      .addClass('panels-title-processed')
      .change(setTitleClass);

    setTitleClass();
  }
}

$(function() {
  /**
   * AJAX responder command to render the preview.
   */
  Drupal.ajax.prototype.commands.panel_preview = function(ajax, command, status) {
    $('#panels-preview').html(command.output);
  }
});

})(jQuery);
;
(function ($) {
Drupal.settings.views = Drupal.settings.views || {'ajax_path': '/views/ajax'};

Drupal.quicktabs = Drupal.quicktabs || {};

Drupal.quicktabs.getQTName = function (el) {
  return el.id.substring(el.id.indexOf('-') +1);
}

Drupal.behaviors.quicktabs = {
  attach: function (context, settings) {
    $.extend(true, Drupal.settings, settings);
    $('.quicktabs-wrapper', context).once(function(){
      Drupal.quicktabs.prepare(this);
    });
  }
}

// Setting up the inital behaviours
Drupal.quicktabs.prepare = function(el) {
  // el.id format: "quicktabs-$name"
  var qt_name = Drupal.quicktabs.getQTName(el);
  var $ul = $(el).find('ul.quicktabs-tabs:first');
  $ul.find('li a').each(function(i, element){
    element.myTabIndex = i;
    element.qt_name = qt_name;
    var tab = new Drupal.quicktabs.tab(element);
    var parent_li = $(element).parents('li').get(0);
    if ($(parent_li).hasClass('active')) {
      $(element).addClass('quicktabs-loaded');
    }
    $(element).once(function() {$(this).bind('click', {tab: tab}, Drupal.quicktabs.clickHandler);});
  });
}

Drupal.quicktabs.clickHandler = function(event) {
  var tab = event.data.tab;
  var element = this;
  // Set clicked tab to active.
  $(this).parents('li').siblings().removeClass('active');
  $(this).parents('li').addClass('active');

  // Hide all tabpages.
  tab.container.children().addClass('quicktabs-hide');
  
  if (!tab.tabpage.hasClass("quicktabs-tabpage")) {
    tab = new Drupal.quicktabs.tab(element);
  }

  tab.tabpage.removeClass('quicktabs-hide');
  return false;
}

// Constructor for an individual tab
Drupal.quicktabs.tab = function (el) {
  this.element = el;
  this.tabIndex = el.myTabIndex;
  var qtKey = 'qt_' + el.qt_name;
  var i = 0;
  for (var key in Drupal.settings.quicktabs[qtKey].tabs) {
    if (i == this.tabIndex) {
      this.tabObj = Drupal.settings.quicktabs[qtKey].tabs[key];
      this.tabKey = key;
    }
    i++;
  }
  this.tabpage_id = 'quicktabs-tabpage-' + el.qt_name + '-' + this.tabKey;
  this.container = $('#quicktabs-container-' + el.qt_name);
  this.tabpage = this.container.find('#' + this.tabpage_id);
}

if (Drupal.ajax) {
  /**
   * Handle an event that triggers an AJAX response.
   *
   * We unfortunately need to override this function, which originally comes from
   * misc/ajax.js, in order to be able to cache loaded tabs, i.e. once a tab
   * content has loaded it should not need to be loaded again.
   *
   * I have removed all comments that were in the original core function, so that
   * the only comments inside this function relate to the Quicktabs modification
   * of it.
   */
  Drupal.ajax.prototype.eventResponse = function (element, event) {
    var ajax = this;

    if (ajax.ajaxing) {
      return false;
    }
  
    try {
      if (ajax.form) {
        if (ajax.setClick) {
          element.form.clk = element;
        }
  
        ajax.form.ajaxSubmit(ajax.options);
      }
      else {
        // Do not perform an ajax request for already loaded Quicktabs content.
        if (!$(element).hasClass('quicktabs-loaded')) {
          ajax.beforeSerialize(ajax.element, ajax.options);
          $.ajax(ajax.options);
          if ($(element).parents('ul').hasClass('quicktabs-tabs')) {
            $(element).addClass('quicktabs-loaded');
          }
        }
      }
    }
    catch (e) {
      ajax.ajaxing = false;
      alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
    }
    return false;
  };
}


})(jQuery);
;
/**
 * @file
 * Implement a simple, clickable dropdown menu.
 *
 * See dropdown.theme.inc for primary documentation.
 *
 * The javascript relies on four classes:
 * - The dropdown must be fully contained in a div with the class
 *   ctools-dropdown. It must also contain the class ctools-dropdown-no-js
 *   which will be immediately removed by the javascript; this allows for
 *   graceful degradation.
 * - The trigger that opens the dropdown must be an a tag wit hthe class
 *   ctools-dropdown-link. The href should just be '#' as this will never
 *   be allowed to complete.
 * - The part of the dropdown that will appear when the link is clicked must
 *   be a div with class ctools-dropdown-container.
 * - Finally, ctools-dropdown-hover will be placed on any link that is being
 *   hovered over, so that the browser can restyle the links.
 *
 * This tool isn't meant to replace click-tips or anything, it is specifically
 * meant to work well presenting menus.
 */

(function ($) {
  Drupal.behaviors.CToolsDropdown = {
    attach: function() {
      $('div.ctools-dropdown').once('ctools-dropdown', function() {
        var $dropdown = $(this);
        var open = false;
        var hovering = false;
        var timerID = 0;

        $dropdown.removeClass('ctools-dropdown-no-js');

        var toggle = function(close) {
          // if it's open or we're told to close it, close it.
          if (open || close) {
            // If we're just toggling it, close it immediately.
            if (!close) {
              open = false;
              $("div.ctools-dropdown-container", $dropdown).slideUp(100);
            }
            else {
              // If we were told to close it, wait half a second to make
              // sure that's what the user wanted.
              // Clear any previous timer we were using.
              if (timerID) {
                clearTimeout(timerID);
              }
              timerID = setTimeout(function() {
                if (!hovering) {
                  open = false;
                  $("div.ctools-dropdown-container", $dropdown).slideUp(100);
                }
              }, 500);
            }
          }
          else {
            // open it.
            open = true;
            $("div.ctools-dropdown-container", $dropdown)
              .animate({height: "show", opacity: "show"}, 100);
          }
        }
        $("a.ctools-dropdown-link", $dropdown).click(function() {
          toggle();
          return false;
        });

        $dropdown.hover(
            function() {
              hovering = true;
            }, // hover in
            function() { // hover out
              hovering = false;
              toggle(true);
              return false;
            });
        // @todo -- just use CSS for this noise.
        $("div.ctools-dropdown-container a").hover(
          function() { $(this).addClass('ctools-dropdown-hover'); },
          function() { $(this).removeClass('ctools-dropdown-hover'); }
        );
      });
    }
  }
})(jQuery);
;
/**
 * @file
 * Provides dependent visibility for form items in CTools' ajax forms.
 *
 * To your $form item definition add:
 * - '#process' => array('ctools_process_dependency'),
 * - '#dependency' => array('id-of-form-item' => array(list, of, values, that,
 *   make, this, item, show),
 *
 * Special considerations:
 * - Radios are harder. Because Drupal doesn't give radio groups individual IDs,
 *   use 'radio:name-of-radio'.
 *
 * - Checkboxes don't have their own id, so you need to add one in a div
 *   around the checkboxes via #prefix and #suffix. You actually need to add TWO
 *   divs because it's the parent that gets hidden. Also be sure to retain the
 *   'expand_checkboxes' in the #process array, because the CTools process will
 *   override it.
 */

(function ($) {
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.dependent = {};

  Drupal.CTools.dependent.bindings = {};
  Drupal.CTools.dependent.activeBindings = {};
  Drupal.CTools.dependent.activeTriggers = [];

  Drupal.CTools.dependent.inArray = function(array, search_term) {
    var i = array.length;
    while (i--) {
      if (array[i] == search_term) {
         return true;
      }
    }
    return false;
  }


  Drupal.CTools.dependent.autoAttach = function() {
    // Clear active bindings and triggers.
    for (i in Drupal.CTools.dependent.activeTriggers) {
      $(Drupal.CTools.dependent.activeTriggers[i]).unbind('change');
    }
    Drupal.CTools.dependent.activeTriggers = [];
    Drupal.CTools.dependent.activeBindings = {};
    Drupal.CTools.dependent.bindings = {};

    if (!Drupal.settings.CTools) {
      return;
    }

    // Iterate through all relationships
    for (id in Drupal.settings.CTools.dependent) {
      // Test to make sure the id even exists; this helps clean up multiple
      // AJAX calls with multiple forms.

      // Drupal.CTools.dependent.activeBindings[id] is a boolean,
      // whether the binding is active or not.  Defaults to no.
      Drupal.CTools.dependent.activeBindings[id] = 0;
      // Iterate through all possible values
      for(bind_id in Drupal.settings.CTools.dependent[id].values) {
        // This creates a backward relationship.  The bind_id is the ID
        // of the element which needs to change in order for the id to hide or become shown.
        // The id is the ID of the item which will be conditionally hidden or shown.
        // Here we're setting the bindings for the bind
        // id to be an empty array if it doesn't already have bindings to it
        if (!Drupal.CTools.dependent.bindings[bind_id]) {
          Drupal.CTools.dependent.bindings[bind_id] = [];
        }
        // Add this ID
        Drupal.CTools.dependent.bindings[bind_id].push(id);
        // Big long if statement.
        // Drupal.settings.CTools.dependent[id].values[bind_id] holds the possible values

        if (bind_id.substring(0, 6) == 'radio:') {
          var trigger_id = "input[name='" + bind_id.substring(6) + "']";
        }
        else {
          var trigger_id = '#' + bind_id;
        }

        Drupal.CTools.dependent.activeTriggers.push(trigger_id);

        if ($(trigger_id).attr('type') == 'checkbox') {
          $(trigger_id).siblings('label').addClass('hidden-options');
        }

        var getValue = function(item, trigger) {
          if ($(trigger).size() == 0) {
            return null;
          }

          if (item.substring(0, 6) == 'radio:') {
            var val = $(trigger + ':checked').val();
          }
          else {
            switch ($(trigger).attr('type')) {
              case 'checkbox':
                var val = $(trigger).attr('checked') ? true : false;

                if (val) {
                  $(trigger).siblings('label').removeClass('hidden-options').addClass('expanded-options');
                }
                else {
                  $(trigger).siblings('label').removeClass('expanded-options').addClass('hidden-options');
                }

                break;
              default:
                var val = $(trigger).val();
            }
          }
          return val;
        }

        var setChangeTrigger = function(trigger_id, bind_id) {
          // Triggered when change() is clicked.
          var changeTrigger = function() {
            var val = getValue(bind_id, trigger_id);

            if (val == null) {
              return;
            }

            for (i in Drupal.CTools.dependent.bindings[bind_id]) {
              var id = Drupal.CTools.dependent.bindings[bind_id][i];
              // Fix numerous errors
              if (typeof id != 'string') {
                continue;
              }

              // This bit had to be rewritten a bit because two properties on the
              // same set caused the counter to go up and up and up.
              if (!Drupal.CTools.dependent.activeBindings[id]) {
                Drupal.CTools.dependent.activeBindings[id] = {};
              }

              if (val != null && Drupal.CTools.dependent.inArray(Drupal.settings.CTools.dependent[id].values[bind_id], val)) {
                Drupal.CTools.dependent.activeBindings[id][bind_id] = 'bind';
              }
              else {
                delete Drupal.CTools.dependent.activeBindings[id][bind_id];
              }

              var len = 0;
              for (i in Drupal.CTools.dependent.activeBindings[id]) {
                len++;
              }

              var object = $('#' + id + '-wrapper');
              if (!object.size()) {
                // Some elements can't use the parent() method or they can
                // damage things. They are guaranteed to have wrappers but
                // only if dependent.inc provided them. This check prevents
                // problems when multiple AJAX calls cause settings to build
                // up.
                var $original = $('#' + id);
                if ($original.is('fieldset') || $original.is('textarea')) {
                  continue;
                }

                object = $('#' + id).parent();
              }

              if (Drupal.settings.CTools.dependent[id].type == 'disable') {
                if (Drupal.settings.CTools.dependent[id].num <= len) {
                  // Show if the element if criteria is matched
                  object.attr('disabled', false);
                  object.addClass('dependent-options');
                  object.children().attr('disabled', false);
                }
                else {
                  // Otherwise hide. Use css rather than hide() because hide()
                  // does not work if the item is already hidden, for example,
                  // in a collapsed fieldset.
                  object.attr('disabled', true);
                  object.children().attr('disabled', true);
                }
              }
              else {
                if (Drupal.settings.CTools.dependent[id].num <= len) {
                  // Show if the element if criteria is matched
                  object.show(0);
                  object.addClass('dependent-options');
                }
                else {
                  // Otherwise hide. Use css rather than hide() because hide()
                  // does not work if the item is already hidden, for example,
                  // in a collapsed fieldset.
                  object.css('display', 'none');
                }
              }
            }
          }

          $(trigger_id).change(function() {
            // Trigger the internal change function
            // the attr('id') is used because closures are more confusing
            changeTrigger(trigger_id, bind_id);
          });
          // Trigger initial reaction
          changeTrigger(trigger_id, bind_id);
        }
        setChangeTrigger(trigger_id, bind_id);
      }
    }
  }

  Drupal.behaviors.CToolsDependent = {
    attach: function (context) {
      Drupal.CTools.dependent.autoAttach();

      // Really large sets of fields are too slow with the above method, so this
      // is a sort of hacked one that's faster but much less flexible.
      $("select.ctools-master-dependent")
        .once('ctools-dependent')
        .change(function() {
          var val = $(this).val();
          if (val == 'all') {
            $('.ctools-dependent-all').show(0);
          }
          else {
            $('.ctools-dependent-all').hide(0);
            $('.ctools-dependent-' + val).show(0);
          }
        })
        .trigger('change');
    }
  }
})(jQuery);
;
(function($){
Drupal.behaviors.contextReactionBlock = {attach: function(context) {
  $('form.context-editor:not(.context-block-processed)')
    .addClass('context-block-processed')
    .each(function() {
      var id = $(this).attr('id');
      Drupal.contextBlockEditor = Drupal.contextBlockEditor || {};
      $(this).bind('init.pageEditor', function(event) {
        Drupal.contextBlockEditor[id] = new DrupalContextBlockEditor($(this));
      });
      $(this).bind('start.pageEditor', function(event, context) {
        // Fallback to first context if param is empty.
        if (!context) {
          context = $(this).data('defaultContext');
        }
        Drupal.contextBlockEditor[id].editStart($(this), context);
      });
      $(this).bind('end.pageEditor', function(event) {
        Drupal.contextBlockEditor[id].editFinish();
      });
    });

  //
  // Admin Form =======================================================
  //
  // ContextBlockForm: Init.
  $('#context-blockform:not(.processed)').each(function() {
    $(this).addClass('processed');
    Drupal.contextBlockForm = new DrupalContextBlockForm($(this));
    Drupal.contextBlockForm.setState();
  });

  // ContextBlockForm: Attach block removal handlers.
  // Lives in behaviors as it may be required for attachment to new DOM elements.
  $('#context-blockform a.remove:not(.processed)').each(function() {
    $(this).addClass('processed');
    $(this).click(function() {
      $(this).parents('tr').eq(0).remove();
      Drupal.contextBlockForm.setState();
      return false;
    });
  });

  // Conceal Section title, subtitle and class
  $('div.context-block-browser', context).nextAll('.form-item').hide();
}};

/**
 * Context block form. Default form for editing context block reactions.
 */
DrupalContextBlockForm = function(blockForm) {
  this.state = {};

  this.setState = function() {
    $('table.context-blockform-region', blockForm).each(function() {
      var region = $(this).attr('id').split('context-blockform-region-')[1];
      var blocks = [];
      $('tr', $(this)).each(function() {
        var bid = $(this).attr('id');
        var weight = $(this).find('select,input').first().val();
        blocks.push({'bid' : bid, 'weight' : weight});
      });
      Drupal.contextBlockForm.state[region] = blocks;
    });

    // Serialize here and set form element value.
    $('form input.context-blockform-state').val(JSON.stringify(this.state));

    // Hide enabled blocks from selector that are used
    $('table.context-blockform-region tr').each(function() {
      var bid = $(this).attr('id');
      $('div.context-blockform-selector input[value='+bid+']').parents('div.form-item').eq(0).hide();
    });
    // Show blocks in selector that are unused
    $('div.context-blockform-selector input').each(function() {
      var bid = $(this).val();
      if ($('table.context-blockform-region tr#'+bid).size() === 0) {
        $(this).parents('div.form-item').eq(0).show();
      }
    });

  };

  // make sure we update the state right before submits, this takes care of an
  // apparent race condition between saving the state and the weights getting set
  // by tabledrag
  $('#ctools-export-ui-edit-item-form').submit(function() { Drupal.contextBlockForm.setState(); });

  // Tabledrag
  // Add additional handlers to update our blocks.
  $.each(Drupal.settings.tableDrag, function(base) {
    var table = $('#' + base + ':not(.processed)', blockForm);
    if (table && table.is('.context-blockform-region')) {
      table.addClass('processed');
      table.bind('mouseup', function(event) {
        Drupal.contextBlockForm.setState();
        return;
      });
    }
  });

  // Add blocks to a region
  $('td.blocks a', blockForm).each(function() {
    $(this).click(function() {
      var region = $(this).attr('href').split('#')[1];
      var base = "context-blockform-region-"+ region;
      var selected = $("div.context-blockform-selector input:checked");
      if (selected.size() > 0) {
        var weight_warn = false;
        var min_weight_option = -10;
        var max_weight_option = 10;
        var max_observed_weight = min_weight_option - 1;
        $('table#' + base + ' tr').each(function() {
          var weight_input_val = $(this).find('select,input').first().val();
          if (+weight_input_val > +max_observed_weight) {
            max_observed_weight = weight_input_val;
          }
        });

        selected.each(function() {
          // create new block markup
          var block = document.createElement('tr');
          var text = $(this).parents('div.form-item').eq(0).hide().children('label').text();
          var select = '<div class="form-item form-type-select"><select class="tabledrag-hide form-select">';
          var i;
          weight_warn = true;
          var selected_weight = max_weight_option;
          if (max_weight_option >= (1 + +max_observed_weight)) {
            selected_weight = ++max_observed_weight;
            weight_warn = false;
          }

          for (i = min_weight_option; i <= max_weight_option; ++i) {
            select += '<option';
            if (i == selected_weight) {
              select += ' selected=selected';
            }
            select += '>' + i + '</option>';
          }
          select += '</select></div>';
          $(block).attr('id', $(this).attr('value')).addClass('draggable');
          $(block).html("<td>"+ text + "</td><td>" + select + "</td><td><a href='' class='remove'>X</a></td>");

          // add block item to region
          //TODO : Fix it so long blocks don't get stuck when added to top regions and dragged towards bottom regions
          Drupal.tableDrag[base].makeDraggable(block);
          $('table#'+base).append(block);
          if ($.cookie('Drupal.tableDrag.showWeight') == 1) {
            $('table#'+base).find('.tabledrag-hide').css('display', '');
            $('table#'+base).find('.tabledrag-handle').css('display', 'none');
          }
          else {
            $('table#'+base).find('.tabledrag-hide').css('display', 'none');
            $('table#'+base).find('.tabledrag-handle').css('display', '');
          }
          Drupal.attachBehaviors($('table#'+base));

          Drupal.contextBlockForm.setState();
          $(this).removeAttr('checked');
        });
        if (weight_warn) {
          alert(Drupal.t('Desired block weight exceeds available weight options, please check weights for blocks before saving'));
        }
      }
      return false;
    });
  });
};

/**
 * Context block editor. AHAH editor for live block reaction editing.
 */
DrupalContextBlockEditor = function(editor) {
  this.editor = editor;
  this.state = {};
  this.blocks = {};
  this.regions = {};

  return this;
};

DrupalContextBlockEditor.prototype = {
  initBlocks : function(blocks) {
    var self = this;
    this.blocks = blocks;
    blocks.each(function() {
      if($(this).hasClass('context-block-empty')) {
        $(this).removeClass('context-block-hidden');
      }
      $(this).addClass('draggable');
      $(this).prepend($('<a class="context-block-handle"></a>'));
      $(this).prepend($('<a class="context-block-remove"></a>').click(function() {
        $(this).parent ('.block').eq(0).fadeOut('medium', function() {
          $(this).remove();
          self.updateBlocks();
        });
        return false;
      }));
    });
  },
  initRegions : function(regions) {
    this.regions = regions;
    var ref = this;

    $(regions).not('.context-ui-processed')
      .each(function(index, el) {
        $('.context-ui-add-link', el).click(function(e){
          ref.showBlockBrowser($(this).parent());
        }).addClass('context-ui-processed');
      });
    $('.context-block-browser').hide();
  },
  showBlockBrowser : function(region) {
    var toggled = false;
    //figure out the id of the context
    var activeId = $('.context-editing', this.editor).attr('id').replace('-trigger', ''),
    context = $('#' + activeId)[0];

    this.browser = $('.context-block-browser', context).addClass('active');

    //add the filter element to the block browser
    if (!this.browser.has('input.filter').size()) {
      var parent = $('.block-browser-sidebar .filter', this.browser);
      var list = $('.blocks', this.browser);
      new Drupal.Filter (list, false, '.context-block-addable', parent);
    }
    //show a dialog for the blocks list
    this.browser.show().dialog({
      modal : true,
      close : function() {
        $(this).dialog('destroy');
        //reshow all the categories
        $('.category', this).show();
        $(this).hide().appendTo(context).removeClass('active');
      },
      height: (.8 * $(window).height()),
      minHeight:400,
      minWidth:680,
      width:680
    });

    //handle showing / hiding block items when a different category is selected
    $('.context-block-browser-categories', this.browser).change(function(e) {
      //if no category is selected we want to show all the items
      if ($(this).val() == 0) {
        $('.category', self.browser).show();
      } else {
        $('.category', self.browser).hide();
        $('.category-' + $(this).val(), self.browser).show();
      }
    });

    //if we already have the function for a different context, rebind it so we don't get dupes
    if(this.addToRegion) {
      $('.context-block-addable', this.browser).unbind('click.addToRegion')
    }

    //protected function for adding a clicked block to a region
    var self = this;
    this.addToRegion = function(e){
      var ui = {
        'item' : $(this).clone(),
        'sender' : $(region)
      };
      $(this).parents('.context-block-browser.active').dialog('close');
      $(region).after(ui.item);
      self.addBlock(e, ui, this.editor, activeId.replace('context-editable-', ''));
    };

    $('.context-block-addable', this.browser).bind('click.addToRegion', this.addToRegion);
  },
  // Update UI to match the current block states.
  updateBlocks : function() {
    var browser = $('div.context-block-browser');

    // For all enabled blocks, mark corresponding addables as having been added.
    $('.block, .admin-block').each(function() {
      var bid = $(this).attr('id').split('block-')[1]; // Ugh.
    });
    // For all hidden addables with no corresponding blocks, mark as addable.
    $('.context-block-item', browser).each(function() {
      var bid = $(this).attr('id').split('context-block-addable-')[1];
    });

    // Mark empty regions.
    $(this.regions).each(function() {
      if ($('.block:has(a.context-block)', this).size() > 0) {
        $(this).removeClass('context-block-region-empty');
      }
      else {
        $(this).addClass('context-block-region-empty');
      }
    });
  },
  // Live update a region
  updateRegion : function(event, ui, region, op) {
    switch (op) {
      case 'over':
        $(region).removeClass('context-block-region-empty');
        break;
      case 'out':
        if (
          // jQuery UI 1.8
          $('.draggable-placeholder', region).size() === 1 &&
          $('.block:has(a.context-block)', region).size() == 0
        ) {
          $(region).addClass('context-block-region-empty');
        }
        break;
    }
  },
  // Remove script elements while dragging & dropping.
  scriptFix : function(event, ui, editor, context) {
    if ($('script', ui.item)) {
      var placeholder = $(Drupal.settings.contextBlockEditor.scriptPlaceholder);
      var label = $('div.handle label', ui.item).text();
      placeholder.children('strong').html(label);
      $('script', ui.item).parent().empty().append(placeholder);
    }
  },
  // Add a block to a region through an AJAX load of the block contents.
  addBlock : function(event, ui, editor, context) {
    var self = this;
    if (ui.item.is('.context-block-addable')) {
      var bid = ui.item.attr('id').split('context-block-addable-')[1];

      // Construct query params for our AJAX block request.
      var params = Drupal.settings.contextBlockEditor.params;
      params.context_block = bid + ',' + context;
      if (!Drupal.settings.contextBlockEditor.block_tokens || !Drupal.settings.contextBlockEditor.block_tokens[bid]) {
        alert(Drupal.t('An error occurred trying to retrieve block content. Please contact a site administer.'));
        return;
     }
     params.context_token = Drupal.settings.contextBlockEditor.block_tokens[bid];

      // Replace item with loading block.
      //ui.sender.append(ui.item);

      var blockLoading = $('<div class="context-block-item context-block-loading"><span class="icon"></span></div>');
      ui.item.addClass('context-block-added');
      ui.item.after(blockLoading);


      $.getJSON(Drupal.settings.contextBlockEditor.path, params, function(data) {
        if (data.status) {
          var newBlock = $(data.block);
          if ($('script', newBlock)) {
            $('script', newBlock).remove();
          }
          blockLoading.fadeOut(function() {
            $(this).replaceWith(newBlock);
            self.initBlocks(newBlock);
            self.updateBlocks();
            Drupal.attachBehaviors(newBlock);
          });
        }
        else {
          blockLoading.fadeOut(function() { $(this).remove(); });
        }
      });
    }
    else if (ui.item.is(':has(a.context-block)')) {
      self.updateBlocks();
    }
  },
  // Update form hidden field with JSON representation of current block visibility states.
  setState : function() {
    var self = this;

    $(this.regions).each(function() {
      var region = $('.context-block-region', this).attr('id').split('context-block-region-')[1];
      var blocks = [];
      $('a.context-block', $(this)).each(function() {
        if ($(this).attr('class').indexOf('edit-') != -1) {
          var bid = $(this).attr('id').split('context-block-')[1];
          var context = $(this).attr('class').split('edit-')[1].split(' ')[0];
          context = context ? context : 0;
          var block = {'bid': bid, 'context': context};
          blocks.push(block);
        }
      });
      self.state[region] = blocks;
    });
    // Serialize here and set form element value.
    $('input.context-block-editor-state', this.editor).val(JSON.stringify(this.state));
  },
  //Disable text selection.
  disableTextSelect : function() {
    if ($.browser.safari) {
      $('.block:has(a.context-block):not(:has(input,textarea))').css('WebkitUserSelect','none');
    }
    else if ($.browser.mozilla) {
      $('.block:has(a.context-block):not(:has(input,textarea))').css('MozUserSelect','none');
    }
    else if ($.browser.msie) {
      $('.block:has(a.context-block):not(:has(input,textarea))').bind('selectstart.contextBlockEditor', function() { return false; });
    }
    else {
      $(this).bind('mousedown.contextBlockEditor', function() { return false; });
    }
  },
  //Enable text selection.
  enableTextSelect : function() {
    if ($.browser.safari) {
      $('*').css('WebkitUserSelect','');
    }
    else if ($.browser.mozilla) {
      $('*').css('MozUserSelect','');
    }
    else if ($.browser.msie) {
      $('*').unbind('selectstart.contextBlockEditor');
    }
    else {
      $(this).unbind('mousedown.contextBlockEditor');
    }
  },
  // Start editing. Attach handlers, begin draggable/sortables.
  editStart : function(editor, context) {
    var self = this;
    // This is redundant to the start handler found in context_ui.js.
    // However it's necessary that we trigger this class addition before
    // we call .sortable() as the empty regions need to be visible.
    $(document.body).addClass('context-editing');
    this.editor.addClass('context-editing');
    this.disableTextSelect();
    this.initBlocks($('.block:has(a.context-block.edit-'+context+')'));
    this.initRegions($('.context-block-region').parent());
    this.updateBlocks();

    $('a.context_ui_dialog-stop').hide();

    $('.editing-context-label').remove();
    var label = $('#context-editable-trigger-'+context+' .label').text();
    label = Drupal.t('Now Editing: ') + label;
    editor.parent().parent()
      .prepend('<div class="editing-context-label">'+ label + '</div>');

    // First pass, enable sortables on all regions.
    $(this.regions).each(function() {
      var region = $(this);
      var params = {
        revert: true,
        dropOnEmpty: true,
        placeholder: 'draggable-placeholder',
        forcePlaceholderSize: true,
        items: '> .block:has(a.context-block.editable)',
        handle: 'a.context-block-handle',
        start: function(event, ui) { self.scriptFix(event, ui, editor, context); },
        stop: function(event, ui) { self.addBlock(event, ui, editor, context); },
        receive: function(event, ui) { self.addBlock(event, ui, editor, context); },
        over: function(event, ui) { self.updateRegion(event, ui, region, 'over'); },
        out: function(event, ui) { self.updateRegion(event, ui, region, 'out'); },
        cursorAt: {left: 300, top: 0}
      };
      region.sortable(params);
    });

    // Second pass, hook up all regions via connectWith to each other.
    $(this.regions).each(function() {
      $(this).sortable('option', 'connectWith', ['.ui-sortable']);
    });

    // Terrible, terrible workaround for parentoffset issue in Safari.
    // The proper fix for this issue has been committed to jQuery UI, but was
    // not included in the 1.6 release. Therefore, we do a browser agent hack
    // to ensure that Safari users are covered by the offset fix found here:
    // http://dev.jqueryui.com/changeset/2073.
    if ($.ui.version === '1.6' && $.browser.safari) {
      $.browser.mozilla = true;
    }
  },
  // Finish editing. Remove handlers.
  editFinish : function() {
    this.editor.removeClass('context-editing');
    this.enableTextSelect();

    $('.editing-context-label').remove();

    // Remove UI elements.
    $(this.blocks).each(function() {
      $('a.context-block-handle, a.context-block-remove', this).remove();
      if($(this).hasClass('context-block-empty')) {
        $(this).addClass('context-block-hidden');
      }
      $(this).removeClass('draggable');
    });

    $('a.context_ui_dialog-stop').show();

    this.regions.sortable('destroy');

    this.setState();

    // Unhack the user agent.
    if ($.ui.version === '1.6' && $.browser.safari) {
      $.browser.mozilla = false;
    }
  }
}; //End of DrupalContextBlockEditor prototype

})(jQuery);
;

/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;
// $Id: jquery.drilldown.js,v 1.1.2.10.2.1 2010/09/16 18:40:02 yhahn Exp $

/**
 * Generic menu drilldown plugin for standard Drupal menu tree markup.
 * The plugin should be inited against a DOM element that *contains*
 * a Drupal ul.menu tree. Example:
 * 
 *   $('div.block-menu').drilldown('init', params);
 * 
 * You must provide the following parameters as settings:
 * 
 *   var params = {
 *     activePath : A drupal menu path that is currently active including the basePath e.g. "/mysite/node"
 *     trail : A jquery selector to the DOM element that should act as the trail container, e.g. "div.my-menu-breadcrumb-trail"
 *     rootTitle : The title to use for the root menu item if the menu does not already possess one. Optional.
 *   }
 *
 */
(function($) {
  $.fn.drilldown = function(method, settings) {
    var menu = this;
    var activePath;
    var rootTitle = settings.rootTitle || 'Home';

    switch (method) {
      case 'goTo':
        // If the passed link refers to the current page, don't follow through
        // the link.
        if (this.activePath && this.activePath === $(settings.activeLink).attr('href')) {
          return false;
        }
        return true;
      case 'setActive':
        var breadcrumb = [];
        var activeMenu;

        $(settings.activeLink).each(function() {
          // Traverse backwards through menu parents and build breadcrumb array.
          $(this).parents('ul.menu').each(function() {
            if ($(this).parents('ul.menu').size() > 0) {
              $(this).siblings('a').each(function() {
                breadcrumb.unshift($(this));
              });
            }
            // If this is a root menu with no root link to accompany it,
            // generate one such that the breadcrumb may reference it.
            else if ($(this).children('li').size() > 1) {
              var root;
              if ($(this).siblings('a.drilldown-root').size() > 0) {
                root = $(this).siblings('a.drilldown-root');
              }
              else {
                root = $('<a href="#" class="drilldown-root" style="display:none">'+rootTitle+'</a>');
                $(this).before(root);
              }
              breadcrumb.unshift(root);
            }
          });

          // If we have a child menu (actually a sibling in the DOM), use it
          // as the active menu. Otherwise treat our direct parent as the
          // active menu.
          if ($(this).next().is('ul.menu')) {
            activeMenu = $(this).next();
            breadcrumb.push($(this));
          }
          else {
            activeMenu = $(this).parents('ul.menu').eq(0);
          }
          if (activeMenu) {
            $('.drilldown-active-trail', menu).removeClass('drilldown-active-trail');
            $('ul.menu', menu).removeClass('drilldown-active-menu').removeClass('clearfix');
            $(activeMenu)
              .addClass('drilldown-active-menu').addClass('clearfix')
              .parents('li').addClass('drilldown-active-trail').show();
          }
        });

        // Render the breadcrumb to the target DOM object
        if (breadcrumb.length > 0) {
          var trail = $(settings.trail);
          trail.empty();
          for (var key in breadcrumb) {
            if (breadcrumb[key]) {
              // We don't use the $().clone() method here because of an
              // IE & jQuery 1.2 bug.
              var clone = $('<a></a>')
                .attr('href', $(breadcrumb[key]).attr('href'))
                .attr('class', $(breadcrumb[key]).attr('class'))
                .html($(breadcrumb[key]).html())
                .addClass('depth-'+key)
                .appendTo(trail);

              // We add a reference to the original link and a click handler
              // that traces back to that instance to set as the active link.
              $('a.depth-'+key, trail)
                .data('original', $(breadcrumb[key]))
                .click(function() {
                  settings.activeLink = $(this).data('original');
                  // If the clicked link does not reference the current
                  // active menu, set it to be active.
                  if (settings.activeLink.siblings('ul.drilldown-active-menu').size() === 0) {
                    menu.drilldown('setActive', settings);
                    return false;
                  }
                  // Otherwise, pass-through and allow the link to be clicked.
                  return menu.drilldown('goTo', settings);
                });
            }
          }
        }

        // Event in case others need to update themselves when a new active
        // link is set.
        $(menu).trigger('refresh.drilldown');
        break;
      case 'init':
        if ($('ul.menu ul.menu', menu).size() > 0) {
          $(menu).addClass('drilldown');
          $(settings.trail).addClass('drilldown-trail');

          // Set initial active menu state.
          var activeLink;
          $('ul.menu a', menu).removeClass('active');
          if (settings.activePath && $('ul.menu a[href='+settings.activePath+']', menu).size() > 0) {
            this.activePath = settings.activePath;
            activeLink = $('ul.menu a[href='+settings.activePath+']', menu).addClass('active');
          }
          if (!activeLink) {
            activeLink = $('ul.menu a.active', menu).size() ? $('ul.menu a.active', menu) : $('ul.menu > li > a', menu);
          }
          if (activeLink) {
            menu.drilldown('setActive', {
              activeLink: $(activeLink[0]),
              trail: settings.trail,
              rootTitle: rootTitle
            });
          }

          // Attach click handlers to menu items
          $('ul.menu li:has(ul.menu)', this).click(function() {
            if ($(this).parent().is('.drilldown-active-menu')) {
              if (menu.data('disableMenu')) {
                return true;
              }
              else {
                var url = $(this).children('a').attr('href');
                var activeLink = $('ul.menu a[href='+url+']', menu);
                menu.drilldown('setActive', {
                  activeLink: activeLink,
                  trail: settings.trail,
                  rootTitle: rootTitle
                });
                return false;
              }
            }
          });
          $('ul.menu li:has(ul.menu) a', menu).click(function() {
            menu.data('disableMenu', true);
          });
        }
        break;
    }
    return this;
  };
})(jQuery);
;
// $Id: admin.menu.js,v 1.1.2.9.2.2 2010/12/16 21:43:54 yhahn Exp $
(function($) {

Drupal.behaviors.adminToolbarMenu = {};
Drupal.behaviors.adminToolbarMenu.attach = function(context) {
  if (jQuery().drilldown) {
    $('#admin-toolbar div.admin-block:has(ul.menu):not(.admin-toolbar-menu)')
      .addClass('admin-toolbar-menu')
      .each(function() {
        var menu = $(this);
        var trail = '#admin-toolbar div.admin-tab.' + $(this).attr('id').split('block-')[1] + ' span';
        var rootTitle = $(trail).text();

        if ($('a:has(span.menu-description)', menu).size() > 0) {
          menu.addClass('admin-toolbar-menu-hover');
          $('a:has(span.menu-description)', menu).hover(
            function() {
              $('<a></a>')
                .attr('class', $(this).attr('class'))
                .addClass('menu-hover')
                .addClass('overlay-exclude')
                .append($('span.menu-description', this).clone())
                .appendTo(menu)
                .show();
            },
            function() {
              $(menu)
                .children('a.menu-hover')
                .remove();
            }
          );
        }

        // Replace the standard trail click handler with one that only
        // adjusts menu if the admin tab is active. Otherwise, switch
        // to that admin tab.
        menu.bind('refresh.drilldown', function() {
          $(trail + ' a').unbind('click').click(function() {
            if ($(this).parents('div.admin-tab').is('.admin-tab-active')) {
              var settings = {'activeLink': $(this).data('original'), 'trail': trail};

              // If the clicked link does not reference the current
              // active menu, set it to be active.
              if (settings.activeLink.siblings('ul.drilldown-active-menu').size() === 0) {
                menu.drilldown('setActive', settings);
                return false;
              }
              // Otherwise, pass-through and allow the link to be clicked.
              return menu.drilldown('goTo', settings);
            }
            $(this).parents('div.admin-tab').click();
            return false;
          });
        });

        // Init drilldown plugin.
        menu.drilldown('init', {
          activePath: Drupal.settings.activePath,
          trail: trail,
          rootTitle: rootTitle
        });
      });
  }
};

})(jQuery);;
(function ($) {

/**
 * Attaches the autocomplete behavior to all required fields.
 */
Drupal.behaviors.autocomplete = {
  attach: function (context, settings) {
    var acdb = [];
    $('input.autocomplete', context).once('autocomplete', function () {
      var uri = this.value;
      if (!acdb[uri]) {
        acdb[uri] = new Drupal.ACDB(uri);
      }
      var $input = $('#' + this.id.substr(0, this.id.length - 13))
        .attr('autocomplete', 'OFF')
        .attr('aria-autocomplete', 'list');
      $($input[0].form).submit(Drupal.autocompleteSubmit);
      $input.parent()
        .attr('role', 'application')
        .append($('<span class="element-invisible" aria-live="assertive"></span>')
          .attr('id', $input.attr('id') + '-autocomplete-aria-live')
        );
      new Drupal.jsAC($input, acdb[uri]);
    });
  }
};

/**
 * Prevents the form from submitting if the suggestions popup is open
 * and closes the suggestions popup when doing so.
 */
Drupal.autocompleteSubmit = function () {
  return $('#autocomplete').each(function () {
    this.owner.hidePopup();
  }).length == 0;
};

/**
 * An AutoComplete object.
 */
Drupal.jsAC = function ($input, db) {
  var ac = this;
  this.input = $input[0];
  this.ariaLive = $('#' + this.input.id + '-autocomplete-aria-live');
  this.db = db;

  $input
    .keydown(function (event) { return ac.onkeydown(this, event); })
    .keyup(function (event) { ac.onkeyup(this, event); })
    .blur(function () { ac.hidePopup(); ac.db.cancel(); });

};

/**
 * Handler for the "keydown" event.
 */
Drupal.jsAC.prototype.onkeydown = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 40: // down arrow.
      this.selectDown();
      return false;
    case 38: // up arrow.
      this.selectUp();
      return false;
    default: // All other keys.
      return true;
  }
};

/**
 * Handler for the "keyup" event.
 */
Drupal.jsAC.prototype.onkeyup = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 16: // Shift.
    case 17: // Ctrl.
    case 18: // Alt.
    case 20: // Caps lock.
    case 33: // Page up.
    case 34: // Page down.
    case 35: // End.
    case 36: // Home.
    case 37: // Left arrow.
    case 38: // Up arrow.
    case 39: // Right arrow.
    case 40: // Down arrow.
      return true;

    case 9:  // Tab.
    case 13: // Enter.
    case 27: // Esc.
      this.hidePopup(e.keyCode);
      return true;

    default: // All other keys.
      if (input.value.length > 0 && !input.readOnly) {
        this.populatePopup();
      }
      else {
        this.hidePopup(e.keyCode);
      }
      return true;
  }
};

/**
 * Puts the currently highlighted suggestion into the autocomplete field.
 */
Drupal.jsAC.prototype.select = function (node) {
  this.input.value = $(node).data('autocompleteValue');
};

/**
 * Highlights the next suggestion.
 */
Drupal.jsAC.prototype.selectDown = function () {
  if (this.selected && this.selected.nextSibling) {
    this.highlight(this.selected.nextSibling);
  }
  else if (this.popup) {
    var lis = $('li', this.popup);
    if (lis.length > 0) {
      this.highlight(lis.get(0));
    }
  }
};

/**
 * Highlights the previous suggestion.
 */
Drupal.jsAC.prototype.selectUp = function () {
  if (this.selected && this.selected.previousSibling) {
    this.highlight(this.selected.previousSibling);
  }
};

/**
 * Highlights a suggestion.
 */
Drupal.jsAC.prototype.highlight = function (node) {
  if (this.selected) {
    $(this.selected).removeClass('selected');
  }
  $(node).addClass('selected');
  this.selected = node;
  $(this.ariaLive).html($(this.selected).html());
};

/**
 * Unhighlights a suggestion.
 */
Drupal.jsAC.prototype.unhighlight = function (node) {
  $(node).removeClass('selected');
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Hides the autocomplete suggestions.
 */
Drupal.jsAC.prototype.hidePopup = function (keycode) {
  // Select item if the right key or mousebutton was pressed.
  if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
    this.input.value = $(this.selected).data('autocompleteValue');
  }
  // Hide popup.
  var popup = this.popup;
  if (popup) {
    this.popup = null;
    $(popup).fadeOut('fast', function () { $(popup).remove(); });
  }
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Positions the suggestions popup and starts a search.
 */
Drupal.jsAC.prototype.populatePopup = function () {
  var $input = $(this.input);
  var position = $input.position();
  // Show popup.
  if (this.popup) {
    $(this.popup).remove();
  }
  this.selected = false;
  this.popup = $('<div id="autocomplete"></div>')[0];
  this.popup.owner = this;
  $(this.popup).css({
    top: parseInt(position.top + this.input.offsetHeight, 10) + 'px',
    left: parseInt(position.left, 10) + 'px',
    width: $input.innerWidth() + 'px',
    display: 'none'
  });
  $input.before(this.popup);

  // Do search.
  this.db.owner = this;
  this.db.search(this.input.value);
};

/**
 * Fills the suggestion popup with any matches received.
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches.
  var ul = $('<ul></ul>');
  var ac = this;
  for (key in matches) {
    $('<li></li>')
      .html($('<div></div>').html(matches[key]))
      .mousedown(function () { ac.select(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteValue', key)
      .appendTo(ul);
  }

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().length) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

Drupal.jsAC.prototype.setStatus = function (status) {
  switch (status) {
    case 'begin':
      $(this.input).addClass('throbbing');
      $(this.ariaLive).html(Drupal.t('Searching for matches...'));
      break;
    case 'cancel':
    case 'error':
    case 'found':
      $(this.input).removeClass('throbbing');
      break;
  }
};

/**
 * An AutoComplete DataBase object.
 */
Drupal.ACDB = function (uri) {
  this.uri = uri;
  this.delay = 300;
  this.cache = {};
};

/**
 * Performs a cached and delayed search.
 */
Drupal.ACDB.prototype.search = function (searchString) {
  var db = this;
  this.searchString = searchString;

  // See if this string needs to be searched for anyway.
  searchString = searchString.replace(/^\s+|\s+$/, '');
  if (searchString.length <= 0 ||
    searchString.charAt(searchString.length - 1) == ',') {
    return;
  }

  // See if this key has been searched for before.
  if (this.cache[searchString]) {
    return this.owner.found(this.cache[searchString]);
  }

  // Initiate delayed search.
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function () {
    db.owner.setStatus('begin');

    // Ajax GET request for autocompletion. We use Drupal.encodePath instead of
    // encodeURIComponent to allow autocomplete search terms to contain slashes.
    $.ajax({
      type: 'GET',
      url: db.uri + '/' + Drupal.encodePath(searchString),
      dataType: 'json',
      success: function (matches) {
        if (typeof matches.status == 'undefined' || matches.status != 0) {
          db.cache[searchString] = matches;
          // Verify if these are still the matches the user wants to see.
          if (db.searchString == searchString) {
            db.owner.found(matches);
          }
          db.owner.setStatus('found');
        }
      },
      error: function (xmlhttp) {
        alert(Drupal.ajaxError(xmlhttp, db.uri));
      }
    });
  }, this.delay);
};

/**
 * Cancels the current autocomplete request.
 */
Drupal.ACDB.prototype.cancel = function () {
  if (this.owner) this.owner.setStatus('cancel');
  if (this.timer) clearTimeout(this.timer);
  this.searchString = '';
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
// $Id: admin.devel.js,v 1.1.2.1.2.2 2010/09/16 18:30:47 yhahn Exp $
(function($) {

Drupal.behaviors.adminDevel = {};
Drupal.behaviors.adminDevel.attach = function(context) {
  $('#block-admin-devel:not(.admin-processed)').each(function() {
    var devel = $(this);
    devel.addClass('admin-processed');

    // Pull logged values from footer output into the block.
    $('li', devel).each(function() {
      var key = $(this).attr('class').split(' ')[0];
      if (key && $('body > .'+key).size() > 0) {
        var value = $('body > .'+key).html();
        $('div.dev-info', this).html(value);
      }
    });

    // Query list show handler.
    $('input.dev-querylog-show', devel).click(function() {
      $(this).hide().siblings('input.dev-querylog-hide').show();
      $('body > *:not(#admin-toolbar, .region-page-bottom, .devel-querylog)').addClass('devel-hide');
      $('body > .devel-querylog').show();
      return false;
    });

    // Query list hide handler.
    $('input.dev-querylog-hide').click(function() {
      $(this).hide().siblings('input.dev-querylog-show').show();
      $('body > *:not(#admin-toolbar, .region-page-bottom, .devel-querylog)').removeClass('devel-hide');
      $('body > .devel-querylog').hide();
      return false;
    });
  });
};

})(jQuery);;
// $Id: admin.toolbar.js,v 1.1.2.9.2.4 2010/12/16 22:47:18 yhahn Exp $
(function($) {

Drupal.behaviors.adminToolbar = {};
Drupal.behaviors.adminToolbar.attach = function(context) {
  $('#admin-toolbar:not(.processed)').each(function() {
    var toolbar = $(this);
    toolbar.addClass('processed');

    // Set initial toolbar state.
    Drupal.adminToolbar.init(toolbar);

    // Admin toggle.
    $('.admin-toggle', this).click(function() { Drupal.adminToolbar.toggle(toolbar); });

    // Admin tabs.
    $('div.admin-tab', this).click(function() { Drupal.adminToolbar.tab(toolbar, $(this), true); });

    $(document).bind('drupalOverlayLoad', {adminToolbar: Drupal.adminToolbar, toolbar: toolbar}, function(event) {
      var body = $(document.body);
      var adminToolbar = event.data.adminToolbar;
      var expand = parseInt(adminToolbar.getState('expanded'));
      if (!expand) {
        $('iframe.overlay-active').contents().find('body').css({marginLeft:0, marginTop: 0});
        return;
      }
      var toolbar = event.data.toolbar;
      var size = adminToolbar.SIZE + 'px';
      if(toolbar.attr('class').split(' ')[1] === 'vertical') {
        $('iframe.overlay-element').contents().find('body').css('marginLeft', size);
      }
      else {
        $('iframe.overlay-element').contents().find('body').css('marginTop', size);
      }
    });
  });
  $('div.admin-panes:not(.processed)').each(function() {
    var panes = $(this);
    panes.addClass('processed');

    $('h2.admin-pane-title a').click(function() {
      var target = $(this).attr('href').split('#')[1];
      var panes = $(this).parents('div.admin-panes')[0];
      $('.admin-pane-active', panes).removeClass('admin-pane-active');
      $('div.admin-pane.' + target, panes).addClass('admin-pane-active');
      $(this).addClass('admin-pane-active');
      return false;
    });
  });
};

/**
 * Admin toolbar methods.
 */
Drupal.adminToolbar = {};

/**
 * The width or height of the toolbar, depending on orientation.
 */
Drupal.adminToolbar.SIZE = 260;

/**
 * Set the initial state of the toolbar.
 */
Drupal.adminToolbar.init = function (toolbar) {
  // Set expanded state.
  var expanded = this.getState('expanded');
  if (!$(document.body).hasClass('admin-ah')) {
    if (expanded == 1) {
      $(document.body).addClass('admin-expanded');
    }
  }

  // Set default tab state.
  var target = this.getState('activeTab');
  if (target) {
    if ($('div.admin-tab.'+target).size() > 0) {
      var tab = $('div.admin-tab.'+target);
      this.tab(toolbar, tab, false);
    }
  }

  // Add layout class to body.
  var classes = toolbar.attr('class').split(' ');
  if (classes[0] === 'nw' || classes[0] === 'ne' || classes[0] === 'se' || classes[0] === 'sw' ) {
    $(document.body).addClass('admin-'+classes[0]);
  }
  if (classes[1] === 'horizontal' || classes[1] === 'vertical') {
    $(document.body).addClass('admin-'+classes[1]);
  }
  if (classes[2] === 'df' || classes[2] === 'ah') {
    $(document.body).addClass('admin-'+classes[2]);
  }
};

/**
 * Set the active tab.
 */
Drupal.adminToolbar.tab = function(toolbar, tab, animate) {
  if (!tab.is('.admin-tab-active')) {
    var target = $('span', tab).attr('id').split('admin-tab-')[1];

    // Vertical
    // Use animations to make the vertical tab transition a bit smoother.
    if (toolbar.is('.vertical') && animate) {
      $('.admin-tab-active', toolbar).fadeOut('fast');
      $(tab).fadeOut('fast', function() {
        $('.admin-tab-active', toolbar).fadeIn('fast').removeClass('admin-tab-active');
        $(tab).slideDown('fast').addClass('admin-tab-active');
        Drupal.adminToolbar.setState('activeTab', target);
      });
    }
    // Horizontal
    // Tabs don't need animation assistance.
    else {
      $('div.admin-tab', toolbar).removeClass('admin-tab-active');
      $(tab, toolbar).addClass('admin-tab-active');
      Drupal.adminToolbar.setState('activeTab', target);
    }

    // Blocks
    $('div.admin-block.admin-active', toolbar).removeClass('admin-active');
    $('#block-'+target, toolbar).addClass('admin-active');
  }
  return false;
};

/**
 * Set the width/height of the of the overlay body based on the state admin toolbar.
 *
 * @param vertical
 *   A boolean indicating if the toolbar is vertical.
 * @param expanded
 *   A boolean indicating if the toolbar is expanded.
 */
Drupal.adminToolbar.setOverlayState = function(vertical, expanded) {
  var width = this.SIZE;
  if (!expanded) {
    width = 0;
  }
  if (vertical) {
    $('iframe.overlay-element').contents().find('body').animate({marginLeft: width+'px'}, 'fast');
  }
  else {
    $('iframe.overlay-element').contents().find('body').animate({marginTop: width+'px'}, 'fast');
  }
};

/**
 * Toggle the toolbar open or closed.
 */
Drupal.adminToolbar.toggle = function (toolbar) {
  var size = '0px';
  if ($(document.body).is('.admin-expanded')) {
    if ($(toolbar).is('.vertical')) {
      $('div.admin-blocks', toolbar).animate({width:size}, 'fast');
      if ($(toolbar).is('.nw') || $(toolbar).is('sw')) {
        $(document.body).animate({marginLeft:size}, 'fast', function() { $(this).toggleClass('admin-expanded'); });
      }
      else {
        $(document.body).animate({marginRight:size}, 'fast', function() { $(this).toggleClass('admin-expanded'); });
      }
      this.setOverlayState(true, false);
    }
    else {
      $('div.admin-blocks', toolbar).animate({height:size}, 'fast');
      if ($(toolbar).is('.nw') || $(toolbar).is('ne')) {
        $(document.body).animate({marginTop:size}, 'fast', function() { $(this).toggleClass('admin-expanded'); });
      }
      else {
        $(document.body).animate({marginBottom:size}, 'fast', function() { $(this).toggleClass('admin-expanded'); });
      }
    }
    this.setOverlayState(false, false);
    this.setState('expanded', 0);
  }
  else {
    size = this.SIZE + 'px';
    if ($(toolbar).is('.vertical')) {
      $('div.admin-blocks', toolbar).animate({width:size}, 'fast');
      if ($(toolbar).is('.nw') || $(toolbar).is('sw')) {
        $(document.body).animate({marginLeft:size}, 'fast', function() { $(this).toggleClass('admin-expanded'); });
      }
      else {
        $(document.body).animate({marginRight:size}, 'fast', function() { $(this).toggleClass('admin-expanded'); });
      }
      this.setOverlayState(true, true);
    }
    else {
      $('div.admin-blocks', toolbar).animate({height:size}, 'fast');
      if ($(toolbar).is('.nw') || $(toolbar).is('ne')) {
        $(document.body).animate({marginTop:size}, 'fast', function() { $(this).toggleClass('admin-expanded'); });
      }
      else {
        $(document.body).animate({marginBottom:size}, 'fast', function() { $(this).toggleClass('admin-expanded'); });
      }
      this.setOverlayState(false, true);
    }
    if ($(document.body).hasClass('admin-ah')) {
      this.setState('expanded', 0);
    }
    else {
      this.setState('expanded', 1);
    }
  }
};

/**
 * Get the value of a cookie variable.
 */
Drupal.adminToolbar.getState = function(key) {
  if (!Drupal.adminToolbar.state) {
    Drupal.adminToolbar.state = {};
    var cookie = $.cookie('DrupalAdminToolbar');
    var query = cookie ? cookie.split('&') : [];
    if (query) {
      for (var i in query) {
        // Extra check to avoid js errors in Chrome, IE and Safari when
        // combined with JS like twitter's widget.js.
        // See http://drupal.org/node/798764.
        if (typeof(query[i]) == 'string' && query[i].indexOf('=') != -1) {
          var values = query[i].split('=');
          if (values.length === 2) {
            Drupal.adminToolbar.state[values[0]] = values[1];
          }
        }
      }
    }
  }
  return Drupal.adminToolbar.state[key] ? Drupal.adminToolbar.state[key] : false;
};

/**
 * Set the value of a cookie variable.
 */
Drupal.adminToolbar.setState = function(key, value) {
  var existing = Drupal.adminToolbar.getState(key);
  if (existing != value) {
    Drupal.adminToolbar.state[key] = value;
    var query = [];
    for (var i in Drupal.adminToolbar.state) {
      query.push(i + '=' + Drupal.adminToolbar.state[i]);
    }
    $.cookie('DrupalAdminToolbar', query.join('&'), {expires: 7, path: '/'});
  }
};

})(jQuery);;

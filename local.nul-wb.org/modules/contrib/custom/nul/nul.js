/**
 * 
 */

(function($) {
  $(document).ready(function(){
    $(".banner-right-item").click(function(){
      alert($(this).child(".banner-item").attr("id"));
      return false;
      });//.next().hide();
  });
})(jQuery);

/*
$(document).ready(function () {
  $(".banner-right-item .banner-item", context).click(function() {
    alert($(this).attr("id"));
    //$("#nul-banner-left").html($('#banner-'+$(this).attr("id")).html());
  });
});//*/


/*
if (Drupal.settings.nul_banner.key == value){
    alert('Got it!');
  }/*

/*
Drupal.behaviors.nul_bannerRotator = function(context) {   

  $("#nul-banner-right .banner-item", context).click(function(e) {
       e.preventDefault();
       //... some really cool code here     
       var id = $(this).attr("id");
       alert($('#banner-'+id).html());
       return false;
   });

};
Drupal.attachBehaviors(context);//*/


/*
Drupal.behaviors.bannerRotator = function(context, settings){
    if (!settings) settings = Drupal.settings.bannerRotator;
    $(".banner-right-item .banner-item", context).click(function() {
      $("#nul-banner-left").html($('#banner-'+$(this).attr("id")).html());
    });
};//*/


/*
$(document).ready(function () {
  $("#nul-banner-right .banner-item").click(function() {
    var id = $(this).attr("id");
    $("#nul-banner-left").html($('#banner-'+id).html());
  });
});//*/


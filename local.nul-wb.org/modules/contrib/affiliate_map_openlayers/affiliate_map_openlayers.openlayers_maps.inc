<?php
/**
 * @file
 * affiliate_map_openlayers.openlayers_maps.inc
 */

/**
 * Implements hook_openlayers_maps().
 */
function affiliate_map_openlayers_openlayers_maps() {
  $export = array();

  $openlayers_maps = new stdClass();
  $openlayers_maps->disabled = FALSE; /* Edit this to true to make a default openlayers_maps disabled initially */
  $openlayers_maps->api_version = 1;
  $openlayers_maps->name = 'affiliate_map';
  $openlayers_maps->title = 'Affiliate Map';
  $openlayers_maps->description = 'Map of NUL Affiliates';
  $openlayers_maps->data = array(
    'width' => '600px',
    'height' => '400px',
    'image_path' => '',
    'css_path' => '',
    'proxy_host' => '',
    'hide_empty_map' => 0,
    'center' => array(
      'initial' => array(
        'centerpoint' => '-96.855459587193, 39.774762443073',
        'zoom' => '3',
      ),
      'restrict' => array(
        'restrictextent' => 0,
        'restrictedExtent' => '',
      ),
    ),
    'behaviors' => array(
      'openlayers_behavior_keyboarddefaults' => array(),
      'openlayers_behavior_dragpan' => array(),
      'openlayers_behavior_panzoombar' => array(
        'zoomWorldIcon' => 0,
        'panIcons' => 1,
      ),
      'openlayers_behavior_popup' => array(
        'layers' => array(
          'affiliate_map_openlayers_1' => 'affiliate_map_openlayers_1',
          'geofield_formatter' => 0,
        ),
      ),
      'openlayers_behavior_scaleline' => array(),
    ),
    'default_layer' => 'google_normal',
    'layers' => array(
      'mapquest_osm' => 'mapquest_osm',
      'google_normal' => 'google_normal',
      'google_satellite' => 'google_satellite',
      'google_hybrid' => 'google_hybrid',
      'google_physical' => 'google_physical',
      'geofield_formatter' => 'geofield_formatter',
      'affiliate_map_openlayers_1' => 'affiliate_map_openlayers_1',
    ),
    'layer_weight' => array(
      'geofield_formatter' => '0',
      'affiliate_map_openlayers_1' => '0',
      'openlayers_geojson_picture_this' => '0',
    ),
    'layer_styles' => array(
      'openlayers_geojson_picture_this' => 'nul_marker',
      'affiliate_map_openlayers_1' => 'nul_marker',
      'geofield_formatter' => 'nul_marker',
    ),
    'layer_styles_select' => array(
      'openlayers_geojson_picture_this' => 'nul_marker',
      'affiliate_map_openlayers_1' => 'nul_marker',
      'geofield_formatter' => 'nul_marker',
    ),
    'layer_activated' => array(
      'affiliate_map_openlayers_1' => 'affiliate_map_openlayers_1',
      'geofield_formatter' => 'geofield_formatter',
      'openlayers_geojson_picture_this' => 0,
    ),
    'layer_switcher' => array(
      'affiliate_map_openlayers_1' => 0,
      'geofield_formatter' => 0,
      'openlayers_geojson_picture_this' => 0,
    ),
    'projection' => '900913',
    'displayProjection' => '4326',
    'styles' => array(
      'default' => 'nul_marker',
      'select' => 'nul_marker',
      'temporary' => 'nul_marker',
    ),
  );
  $export['affiliate_map'] = $openlayers_maps;

  return $export;
}

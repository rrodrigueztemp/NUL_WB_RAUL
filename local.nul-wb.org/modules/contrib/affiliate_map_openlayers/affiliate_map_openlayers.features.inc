<?php
/**
 * @file
 * affiliate_map_openlayers.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function affiliate_map_openlayers_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "openlayers" && $api == "openlayers_maps") {
    return array("version" => "1");
  }
}

<?php
/**
 * @file
 * affiliate_content_and_views.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function affiliate_content_and_views_views_default_views() {
  $export = array();

  $view = new view;
  $view->name = 'affiliate_map';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Affiliate Map';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '0';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all'] = 0;
  $handler->display->display_options['style_plugin'] = 'openlayers_data';
  $handler->display->display_options['style_options']['data_source'] = array(
    'value' => 'wkt',
    'other_lat' => 'title',
    'other_lon' => 'title',
    'wkt' => 'field_aff_location',
    'other_top' => 'title',
    'other_right' => 'title',
    'other_bottom' => 'title',
    'other_left' => 'title',
    'name_field' => 'title',
    'description_field' => 'field_aff_address',
  );
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['title']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = 0;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = 0;
  $handler->display->display_options['fields']['title']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['title']['alter']['html'] = 0;
  $handler->display->display_options['fields']['title']['hide_empty'] = 0;
  $handler->display->display_options['fields']['title']['empty_zero'] = 0;
  $handler->display->display_options['fields']['title']['link_to_node'] = 1;
  /* Field: Content: Affiliate Address */
  $handler->display->display_options['fields']['field_aff_address']['id'] = 'field_aff_address';
  $handler->display->display_options['fields']['field_aff_address']['table'] = 'field_data_field_aff_address';
  $handler->display->display_options['fields']['field_aff_address']['field'] = 'field_aff_address';
  $handler->display->display_options['fields']['field_aff_address']['label'] = 'Address';
  $handler->display->display_options['fields']['field_aff_address']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['click_sort_column'] = 'country';
  $handler->display->display_options['fields']['field_aff_address']['settings'] = array(
    'use_widget_handlers' => 1,
    'format_handlers' => array(
      'address' => 'address',
    ),
  );
  $handler->display->display_options['fields']['field_aff_address']['field_api_classes'] = 0;
  /* Field: Content: Affiliate Location */
  $handler->display->display_options['fields']['field_aff_location']['id'] = 'field_aff_location';
  $handler->display->display_options['fields']['field_aff_location']['table'] = 'field_data_field_aff_location';
  $handler->display->display_options['fields']['field_aff_location']['field'] = 'field_aff_location';
  $handler->display->display_options['fields']['field_aff_location']['label'] = '';
  $handler->display->display_options['fields']['field_aff_location']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_aff_location']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_location']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_location']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_aff_location']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_location']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_location']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_location']['click_sort_column'] = 'wkt';
  $handler->display->display_options['fields']['field_aff_location']['settings'] = array(
    'data' => 'full',
  );
  $handler->display->display_options['fields']['field_aff_location']['field_api_classes'] = 0;
  /* Field: Content: Affiliate Phone */
  $handler->display->display_options['fields']['field_aff_phone']['id'] = 'field_aff_phone';
  $handler->display->display_options['fields']['field_aff_phone']['table'] = 'field_data_field_aff_phone';
  $handler->display->display_options['fields']['field_aff_phone']['field'] = 'field_aff_phone';
  $handler->display->display_options['fields']['field_aff_phone']['label'] = 'Phone';
  $handler->display->display_options['fields']['field_aff_phone']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['element_label_colon'] = 1;
  $handler->display->display_options['fields']['field_aff_phone']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_phone']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_phone']['field_api_classes'] = 0;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = 'Pin_popup';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '[title]
[field_aff_address]
[field_aff_phone]';
  $handler->display->display_options['fields']['nothing']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['nothing']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['nothing']['alter']['external'] = 0;
  $handler->display->display_options['fields']['nothing']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['nothing']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['nothing']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['nothing']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['nothing']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['nothing']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['nothing']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['nothing']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['nothing']['alter']['html'] = 0;
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['nothing']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['nothing']['hide_empty'] = 0;
  $handler->display->display_options['fields']['nothing']['empty_zero'] = 0;
  $handler->display->display_options['fields']['nothing']['hide_alter_empty'] = 0;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'affiliate' => 'affiliate',
  );
  /* Filter criterion: Proximity: Great-circle */
  $handler->display->display_options['filters']['circle']['id'] = 'circle';
  $handler->display->display_options['filters']['circle']['table'] = 'openlayers_proximity';
  $handler->display->display_options['filters']['circle']['field'] = 'circle';
  $handler->display->display_options['filters']['circle']['value']['value'] = '50';
  $handler->display->display_options['filters']['circle']['value']['node'] = '121';
  $handler->display->display_options['filters']['circle']['exposed'] = TRUE;
  $handler->display->display_options['filters']['circle']['expose']['operator_id'] = 'circle_op';
  $handler->display->display_options['filters']['circle']['expose']['label'] = 'Affiliate Finder';
  $handler->display->display_options['filters']['circle']['expose']['operator'] = 'circle_op';
  $handler->display->display_options['filters']['circle']['expose']['identifier'] = 'circle';
  $handler->display->display_options['filters']['circle']['expose']['multiple'] = FALSE;
  $handler->display->display_options['filters']['circle']['expose']['use_unit'] = 0;
  $handler->display->display_options['filters']['circle']['expose']['use_location'] = 1;
  $handler->display->display_options['filters']['circle']['expose']['use_node'] = 0;

  /* Display: OpenLayers Data Overlay */
  $handler = $view->new_display('openlayers', 'OpenLayers Data Overlay', 'openlayers_1');
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '0';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';

  /* Display: Openlayers Map */
  $handler = $view->new_display('block', 'Openlayers Map', 'block_1');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'openlayers_map';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['block_description'] = 'Openlayers Map';

  /* Display: Affiliate Map */
  $handler = $view->new_display('page', 'Affiliate Map', 'map_page');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'geofield_map_map';
  $handler->display->display_options['style_options']['data_source'] = 'field_aff_location';
  $handler->display->display_options['style_options']['popup_source'] = 'nothing';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['header'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['empty'] = FALSE;
  $handler->display->display_options['header']['area']['content'] = 'To find an Urban League Affiliate office near you, use the search tool or use the map below.';
  $handler->display->display_options['header']['area']['format'] = 'filtered_html';
  $handler->display->display_options['header']['area']['tokenize'] = 0;
  $handler->display->display_options['defaults']['arguments'] = FALSE;
  $handler->display->display_options['path'] = 'in-your-area/affiliate-map';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Affiliate Map';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'main-menu';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Feed */
  $handler = $view->new_display('feed', 'Feed', 'feed_1');
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['style_plugin'] = 'rss';
  $handler->display->display_options['row_plugin'] = 'node_rss';
  $handler->display->display_options['row_options']['item_length'] = 'rss';
  $handler->display->display_options['row_options']['links'] = 0;
  $handler->display->display_options['path'] = 'affiliate-list-rss';
  $export['affiliate_map'] = $view;

  $view = new view;
  $view->name = 'affiliates';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Affiliates';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'List of Affiliates';
  $handler->display->display_options['use_ajax'] = TRUE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '28';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all'] = 0;
  $handler->display->display_options['style_plugin'] = 'table';
  $handler->display->display_options['style_options']['columns'] = array(
    'title' => 'title',
    'field_aff_address' => 'field_aff_address',
    'field_aff_address_1' => 'field_aff_address_1',
  );
  $handler->display->display_options['style_options']['default'] = 'field_aff_address_1';
  $handler->display->display_options['style_options']['info'] = array(
    'title' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_aff_address' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
    'field_aff_address_1' => array(
      'sortable' => 1,
      'default_sort_order' => 'asc',
      'align' => '',
      'separator' => '',
      'empty_column' => 0,
    ),
  );
  $handler->display->display_options['style_options']['override'] = 1;
  $handler->display->display_options['style_options']['sticky'] = 1;
  $handler->display->display_options['style_options']['empty_table'] = 0;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = 'Name of Affiliate';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['title']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['title']['alter']['external'] = 0;
  $handler->display->display_options['fields']['title']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['title']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = 0;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = 0;
  $handler->display->display_options['fields']['title']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['title']['alter']['html'] = 0;
  $handler->display->display_options['fields']['title']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['title']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['title']['hide_empty'] = 0;
  $handler->display->display_options['fields']['title']['empty_zero'] = 0;
  $handler->display->display_options['fields']['title']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['title']['link_to_node'] = 1;
  /* Field: Content: Affiliate Address */
  $handler->display->display_options['fields']['field_aff_address']['id'] = 'field_aff_address';
  $handler->display->display_options['fields']['field_aff_address']['table'] = 'field_data_field_aff_address';
  $handler->display->display_options['fields']['field_aff_address']['field'] = 'field_aff_address';
  $handler->display->display_options['fields']['field_aff_address']['label'] = 'City';
  $handler->display->display_options['fields']['field_aff_address']['alter']['alter_text'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['alter']['text'] = '[field_aff_address-locality]';
  $handler->display->display_options['fields']['field_aff_address']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['click_sort_column'] = 'locality';
  $handler->display->display_options['fields']['field_aff_address']['settings'] = array(
    'use_widget_handlers' => 1,
    'format_handlers' => array(
      'address' => 'address',
    ),
  );
  $handler->display->display_options['fields']['field_aff_address']['field_api_classes'] = 0;
  /* Field: Content: Affiliate Address */
  $handler->display->display_options['fields']['field_aff_address_1']['id'] = 'field_aff_address_1';
  $handler->display->display_options['fields']['field_aff_address_1']['table'] = 'field_data_field_aff_address';
  $handler->display->display_options['fields']['field_aff_address_1']['field'] = 'field_aff_address';
  $handler->display->display_options['fields']['field_aff_address_1']['label'] = 'State';
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['alter_text'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['text'] = '[field_aff_address_1-administrative_area]';
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['click_sort_column'] = 'administrative_area';
  $handler->display->display_options['fields']['field_aff_address_1']['settings'] = array(
    'use_widget_handlers' => 1,
    'format_handlers' => array(
      'address' => 'address',
    ),
  );
  $handler->display->display_options['fields']['field_aff_address_1']['field_api_classes'] = 0;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'affiliate' => 'affiliate',
  );

  /* Display: Affiliates */
  $handler = $view->new_display('page', 'Affiliates', 'page_1');
  $handler->display->display_options['path'] = 'in-your-area/affiliate-list';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'List of Affiliate';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'main-menu';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Affiliate CEOs */
  $handler = $view->new_display('page', 'Affiliate CEOs', 'page_2');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'Affiliate CEOs';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all'] = 0;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['path']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['path']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['path']['alter']['external'] = 0;
  $handler->display->display_options['fields']['path']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['path']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['path']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['path']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['path']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['path']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['path']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['path']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['path']['alter']['html'] = 0;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['path']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['path']['hide_empty'] = 0;
  $handler->display->display_options['fields']['path']['empty_zero'] = 0;
  $handler->display->display_options['fields']['path']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['path']['absolute'] = 0;
  /* Field: Content: Affiliate CEO */
  $handler->display->display_options['fields']['field_aff_ceo']['id'] = 'field_aff_ceo';
  $handler->display->display_options['fields']['field_aff_ceo']['table'] = 'field_data_field_aff_ceo';
  $handler->display->display_options['fields']['field_aff_ceo']['field'] = 'field_aff_ceo';
  $handler->display->display_options['fields']['field_aff_ceo']['label'] = '';
  $handler->display->display_options['fields']['field_aff_ceo']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_aff_ceo']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_ceo']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_ceo']['field_api_classes'] = 0;
  /* Field: Content: Affiliate CEO Email */
  $handler->display->display_options['fields']['field_aff_ceo_email']['id'] = 'field_aff_ceo_email';
  $handler->display->display_options['fields']['field_aff_ceo_email']['table'] = 'field_data_field_aff_ceo_email';
  $handler->display->display_options['fields']['field_aff_ceo_email']['field'] = 'field_aff_ceo_email';
  $handler->display->display_options['fields']['field_aff_ceo_email']['label'] = '';
  $handler->display->display_options['fields']['field_aff_ceo_email']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_aff_ceo_email']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_ceo_email']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_ceo_email']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_ceo_email']['field_api_classes'] = 0;
  /* Field: Content: Affiliate Phone */
  $handler->display->display_options['fields']['field_aff_phone']['id'] = 'field_aff_phone';
  $handler->display->display_options['fields']['field_aff_phone']['table'] = 'field_data_field_aff_phone';
  $handler->display->display_options['fields']['field_aff_phone']['field'] = 'field_aff_phone';
  $handler->display->display_options['fields']['field_aff_phone']['label'] = '';
  $handler->display->display_options['fields']['field_aff_phone']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_aff_phone']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_phone']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_phone']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_phone']['field_api_classes'] = 0;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = 'Affiliate';
  $handler->display->display_options['fields']['title']['alter']['alter_text'] = 1;
  $handler->display->display_options['fields']['title']['alter']['text'] = '<a href="[path]">[title]</a><br />
[field_aff_ceo]<br />
[field_aff_phone]<br />
[field_aff_ceo_email]';
  $handler->display->display_options['fields']['title']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['title']['alter']['external'] = 0;
  $handler->display->display_options['fields']['title']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['title']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = 0;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = 0;
  $handler->display->display_options['fields']['title']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['title']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['title']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['title']['alter']['html'] = 0;
  $handler->display->display_options['fields']['title']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['title']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['title']['hide_empty'] = 0;
  $handler->display->display_options['fields']['title']['empty_zero'] = 0;
  $handler->display->display_options['fields']['title']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['title']['link_to_node'] = 0;
  /* Field: Content: Affiliate Address */
  $handler->display->display_options['fields']['field_aff_address']['id'] = 'field_aff_address';
  $handler->display->display_options['fields']['field_aff_address']['table'] = 'field_data_field_aff_address';
  $handler->display->display_options['fields']['field_aff_address']['field'] = 'field_aff_address';
  $handler->display->display_options['fields']['field_aff_address']['label'] = 'City';
  $handler->display->display_options['fields']['field_aff_address']['alter']['alter_text'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['alter']['text'] = '[field_aff_address-locality]';
  $handler->display->display_options['fields']['field_aff_address']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_address']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_address']['click_sort_column'] = 'locality';
  $handler->display->display_options['fields']['field_aff_address']['settings'] = array(
    'use_widget_handlers' => 1,
    'format_handlers' => array(
      'address' => 'address',
    ),
  );
  $handler->display->display_options['fields']['field_aff_address']['field_api_classes'] = 0;
  /* Field: Content: Affiliate Address */
  $handler->display->display_options['fields']['field_aff_address_1']['id'] = 'field_aff_address_1';
  $handler->display->display_options['fields']['field_aff_address_1']['table'] = 'field_data_field_aff_address';
  $handler->display->display_options['fields']['field_aff_address_1']['field'] = 'field_aff_address';
  $handler->display->display_options['fields']['field_aff_address_1']['label'] = 'State';
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['alter_text'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['text'] = '[field_aff_address_1-administrative_area]';
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['more_link'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['element_label_colon'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['element_default_classes'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_aff_address_1']['hide_alter_empty'] = 1;
  $handler->display->display_options['fields']['field_aff_address_1']['click_sort_column'] = 'administrative_area';
  $handler->display->display_options['fields']['field_aff_address_1']['settings'] = array(
    'use_widget_handlers' => 1,
    'format_handlers' => array(
      'address' => 'address',
    ),
  );
  $handler->display->display_options['fields']['field_aff_address_1']['field_api_classes'] = 0;
  $handler->display->display_options['path'] = 'who-we-are/local-leadership/affiliate-ceos';
  $handler->display->display_options['menu']['type'] = 'normal';
  $handler->display->display_options['menu']['title'] = 'Affiliate CEOs';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'main-menu';
  $handler->display->display_options['menu']['context'] = 0;

  /* Display: Feed */
  $handler = $view->new_display('feed', 'Feed', 'feed_1');
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['style_plugin'] = 'rss';
  $handler->display->display_options['row_plugin'] = 'node_rss';
  $handler->display->display_options['row_options']['item_length'] = 'rss';
  $handler->display->display_options['row_options']['links'] = 0;
  $handler->display->display_options['path'] = 'affiliate-list-rss';
  $export['affiliates'] = $view;

  return $export;
}

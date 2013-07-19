<?php
/**
 * @file
 * affiliate_content_and_views.features.inc
 */

/**
 * Implements hook_views_api().
 */
function affiliate_content_and_views_views_api() {
  return array("version" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function affiliate_content_and_views_node_info() {
  $items = array(
    'affiliate' => array(
      'name' => t('Affiliate'),
      'base' => 'node_content',
      'description' => t('Content type for NUL Affiliates'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'affiliate_program' => array(
      'name' => t('Affiliate Program'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Affiliate Program Name'),
      'help' => '',
    ),
    'affiliate_program_partner' => array(
      'name' => t('Affiliate Program Partner'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Community Partner Name'),
      'help' => '',
    ),
    'affiliate_program_subgrant' => array(
      'name' => t('Affiliate Program Subgrant'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  return $items;
}

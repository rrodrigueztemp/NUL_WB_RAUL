<?php

/**
 * @file
 * Implementation of hook_panels_layouts
 */
function adaptivetheme_one_brick_panels_layouts() {
  $items['one_brick'] = array(
    'title'    => t('AT NUL one column brick'),
    'category' => t('AT NUL Responsive Panels - 1 column'),
    'icon'     => 'one_brick.png',
    'theme'    => 'one_brick',
    'admin css' => 'one_brick.admin.css',
    'theme arguments' => array('id', 'content'),
    'regions' => array(
      'one_brick_top'         => t('Top (conditional)'),
      'one_brick_left_above'  => t('Left above'),
      'one_brick_right_above' => t('Right above'),
      'one_brick_middle'      => t('Middle (conditional)'),
      'one_brick_left_below'  => t('Left below'),
      'one_brick_right_below' => t('Right below'),
      'one_brick_bottom'      => t('Bottom (conditional)'),
    ),
    // AT Core
    'type' => 'two',
    'options' => array(
      'one-brick' => 'default',
      'one-brick-stack' => 'stack',
    ),
    'styles' => array(
      'one-brick' => array(
        'css' => array(
          'fn' => array('.one-brick > .panel-row' => 'float:none'),
          '50' => array('.one-brick > .panel-row > .region' => 'width:50%'),
        ),
      ),
      'one-brick-stack' => array(
        'css' => array(
          'fdw' => array('.one-brick > .panel-row > .region' => 'float:none;display:block;width:100%;clear:both'),
        ),
      ),
    ),
  );

  return $items;
}

/**
 * Preprocess variables for one-brick.tpl.php
 */
function template_preprocess_one_brick(&$vars) {
  $vars['panel_prefix'] = '';
  $vars['panel_suffix'] = '';
}

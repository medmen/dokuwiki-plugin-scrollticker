<?php
/**
 * Options for the scrollticker plugin
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @author Michael Bohn <mjbohn@gmail.com>
 *
 */
$meta['maxitems']      = array('numeric');
$meta['counterstyle']  = array('multichoice', _choices => array('decimal', 'decimal-leading-zero', 'lower-roman', 'upper-roman','lower-latin', 'upper-latin', 'none'));
$meta['separator']     = array('string');
$meta['speed']         = array('numeric');
$meta['stoponhover']   = array('onoff');
$meta['showborder']    = array('onoff');
$meta['border']        = array('string');
$meta['borderradius']  = array('string');
$meta['width']         = array('string');
$meta['height']        = array('string');
$meta['textcolor']     = array('string');
$meta['bgcolor']       = array('string');
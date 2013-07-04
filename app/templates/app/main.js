// to depend on a bower installed component:
// define(['bower_components/componentName/file'])

define(["jquery"], function($) {
  $('body').append('jQuery ' + $.fn.jquery + ' loaded!');
});

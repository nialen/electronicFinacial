/**
 * requireJs
 * http://www.requirejs.cn/docs/api.html
 */

require.config({
  paths: {
    'angular': '/resources/js/angular.min',
    'angular-touch': '/resources/js/angular-touch.min',
    'angular-animate': '/resources/js/angular-animate.min',
    'angular-aria': '/resources/js/angular-aria.min',
    'jquery': '/resources/js/jquery.min',
    'bootstrap': '/resources/js/bootstrap.min',
    'ui-bootstrap': '/resources/js/ui-bootstrap',
    'ui-bootstrap-tpls': '/resources/js/ui-bootstrap-tpls-2.1.3',
    'sweetalert': '/resources/js/sweetalert.min',
    'httpConfig': '/resources/js/httpConfig'
  },
  shim: {
    'angular': {
      'exports': 'angular'
    },
    'angular-touch': {
      'deps': ['angular'],
      'exports': 'ngTouch'
    },
    'angular-animate': {
      'deps': ['angular'],
      'exports': 'ngAnimate'
    },
    'angular-aria': {
      'deps': ['angular'],
      'exports': 'ngAria'
    },
    'bootstrap': {
      'deps': ['jquery']
    },
    'ui-bootstrap-tpls': {
      'deps': ['angular']
    }
  }
});

require(['angular', 'index'], function(angular) {
  angular.bootstrap(document, ['indexModule']);
});

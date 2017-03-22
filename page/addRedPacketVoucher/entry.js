/**
 * requireJs
 * http://www.requirejs.cn/docs/api.html
 */

window.loading = {
    finish: function () {
        parent.$('.iframe-box').height(parent.$('.tabs-content').height());
    },
    load: function () {
        require.config({
            paths: {
                'angular': '../../resources/js/angular.min',
                'angular-touch': '../../resources/js/angular-touch.min',
                'angular-animate': '../../resources/js/angular-animate.min',
                'angular-aria': '../../resources/js/angular-aria.min',
                'jquery': '../../resources/js/jquery.min',
                'bootstrap': '../../resources/js/bootstrap.min',
                'ui-bootstrap': '../../resources/js/ui-bootstrap',
                'ui-bootstrap-tpls': '../../resources/js/ui-bootstrap-tpls-2.1.3',
                'angular-locale_zh-cn': '../../resources/js/angular-locale_zh-cn',
                'lodash': '../../resources/js/lodash',
                'sweetalert': '../../resources/js/sweetalert.min',
                'mock': '../../resources/js/mock',
                'select': '../../resources/js/select',
                'uploader': '../../resources/js/uploader.min',
                'httpConfig': '../../resources/js/httpConfig'
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
                },
                'angular-locale_zh-cn': {
                    'deps': ['angular']
                },
                'select': {
                    'deps': ['angular']
                },
                'uploader': {
                    'deps': ['angular']
                }
            }
        });
    }
};

window.loading.load();
require(['angular', 'addRedPacketVoucher'], function (angular) {
    angular.bootstrap(document, ['addRedPacketVoucherModule']);
    window.loading.finish();
});

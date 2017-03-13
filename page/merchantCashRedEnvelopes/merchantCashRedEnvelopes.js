/**
 * Auth 丁少华
 * Date 2017-3-9
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'mock', 'select', 'uploader', 'ui-bootstrap-tpls', 'angular-animate', 'angular-locale_zh-cn'], function(angular, $, httpConfig, swal, _, Mock) {
    angular
        .module('merchantCashRedEnvelopesModule', ['ui.bootstrap', 'ngAnimate'])
        .run(['$rootScope', function($rootScope) {
            $rootScope.stepNum = 0; //当前显示的step索引值（Number类型
        }])
        //活动确认保存入参
        .factory('paramData', [function() {
            var paramData = {
                'activityApply': {
                    'applyCompany': '',
                    'applyProvinceId': '2', // 固定的四川省的AreaID
                    'applyProvinceName': '四川省', // 固定的四川省
                    'applyStateDate': '',
                    'applyStateCd': '', // 0：保存，1：提交审批，2：修改
                    'applyMan': '',
                    'linkTele': '',
                    'linkEmail': '',
                    'activityTplId': '4' // 现金红包固定值
                },
                'activityInfo': {
                    'activityId': '0',
                    'activityName': '成都10元2017年1月25日限额10元',
                    'activityDesc': '',
                    'activityAreaRels': [{
                        'areaId': '0',
                        'areaName': '0'
                    }],
                    'activityStartDate': '2017-03-02',
                    'activityEndDate': '2017-03-02',
                    'activityAttr': [{
                        'attrId': '110028',
                        'attrValue': '',
                        'attrName': '发红包商户（编码）'
                    }, {
                        'attrId': '110029',
                        'attrValue': '',
                        'attrName': '祝福语'
                    }, {
                        'attrId': '110030',
                        'attrValue': '',
                        'attrName': '分配方式'
                    }, {
                        'attrId': '110031',
                        'attrValue': '',
                        'attrName': '领取用户是否实名'
                    }, {
                        'attrId': '110032',
                        'attrValue': '',
                        'attrName': '是否为绑卡用户'
                    }, {
                        'attrId': '110033',
                        'attrValue': '',
                        'attrName': '收红包白名单'
                    }, {
                        'attrId': '110034',
                        'attrValue': '',
                        'attrName': '用户类型'
                    }, {
                        'attrId': '110035',
                        'attrValue': '',
                        'attrName': '红包主题'
                    }]
                },
                'resources': []
            };

            return paramData;
        }])
        .factory('httpMethod', ['$http', '$q', function($http, $q) {
            var httpMethod = {};
            //获取地区列表
            httpMethod.qryArea = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/common/qryArea',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function(data, header, config, status) {
                    if (status != 200) {
                        //跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            //资源查询
            httpMethod.qryResource = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/rsc/qryResource',
                    method: 'POST',
                    headers: httpConfig.requestHeader,
                    data: 'param=' + JSON.stringify(param)
                }).success(function(data, header, config, status) {
                    if (status != 200) {
                        //跳转403页面
                    }
                    defer.resolve(data);
                }).error(function(data, status, headers, config) {
                    defer.reject(data);
                });
                return defer.promise;
            };

            if (httpConfig.isMock) {
                //地区查询
                Mock.mock(httpConfig.siteUrl + '/common/qryArea', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': {
                        'area|21': [{
                            'areaId': '@id', //地区ID
                            'areaName': '@city', //地区名称
                            'name': '@city' //地区名称
                        }]
                    },
                    'errors': null
                });

                //资源查询
                Mock.mock(httpConfig.siteUrl + '/rsc/qryResource', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': {
                        'resources|5': [{
                            'rscId': '@id', //资源ID
                            'rscCode': '@id', //资源Code
                            'rscName': '@cword(4)', //资源名称
                            'value': '', //面值
                            'templet': '', //模板(类型)
                            'state': '' //状态
                        }],
                        'total|1-100': 10 //总条数
                    },
                    'errors': null
                });
            }

            return httpMethod;
        }])
        .controller('activityApplyFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, paramData) {
            $scope.showInformation = true;
            $scope.toggleShow = function() {
                $scope.showInformation = !$scope.showInformation;
            };
            $scope.activityApply = {
                'applyCompany': '',
                'applyProvinceId': '2', // 固定的四川省的AreaID
                'applyProvinceName': '四川省', // 固定的四川省
                'applyStateDate': '',
                'applyStateCd': '', // 0：保存，1：提交审批，2：修改
                'applyMan': '',
                'linkTele': '',
                'linkEmail': '',
                'activityTplId': '4' // 现金红包固定值
            };
            $scope.$watch('activityApply', function(newValue) {
                paramData.activityApply = newValue;
            });
            //时间控件
            $scope.startDateOptions = {
                formatYear: 'yy',
                maxDate: '',
                startingDay: 1,
                showWeeks: false
            };
            $scope.startOpen = function() {
                $timeout(function() {
                    $scope.startPopupOpened = true;
                });
            };
            $scope.startPopupOpened = false;
        }])
        .controller('redPacketCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', 'httpMethod', function($scope, $rootScope, $filter, $log, $timeout, paramData, httpMethod) {
            $scope.showRedpacket = true;
            $scope.toggleShow = function() {
                $scope.showRedpacket = !$scope.showRedpacket;
            };
            var param = {
                'level': '3', //地区级别，3为地市，4为区县
                'parentAreaId': '' //父地区ID,可空
            };

            httpMethod.qryArea(param).then(function(rsp) {
                $scope.cityList = rsp.data.area;
                $log.log('获取州/市列表成功.');
            }, function() {
                $log.log('获取州/市列表失败.');
            });
            // TODO activityAttr数组结构，双向绑定
            $scope.activityInfo = {
                'activityId': '0', // 固定的值
                'activityName': '',
                'activityDesc': '',
                'activityAreaRels': [{
                    'areaId': '0',
                    'areaName': '0'
                }],
                'activityStartDate': '',
                'activityEndDate': '',
                'activityAttr': [{
                    'attrId': '110028',
                    'attrValue': '',
                    'attrName': '发红包商户（编码）'
                }, {
                    'attrId': '110029',
                    'attrValue': '',
                    'attrName': '祝福语'
                }, {
                    'attrId': '110030',
                    'attrValue': '',
                    'attrName': '分配方式'
                }, {
                    'attrId': '110031',
                    'attrValue': '',
                    'attrName': '领取用户是否实名'
                }, {
                    'attrId': '110032',
                    'attrValue': '',
                    'attrName': '是否为绑卡用户'
                }, {
                    'attrId': '110033',
                    'attrValue': '',
                    'attrName': '收红包白名单'
                }, {
                    'attrId': '110034',
                    'attrValue': '',
                    'attrName': '用户类型'
                }, {
                    'attrId': '110035',
                    'attrValue': '',
                    'attrName': '红包主题'
                }]
            };
            $scope.$watch('activityInfo', function(newValue) {
                paramData.activityInfo = newValue;
            });
            //时间控件
            $scope.startDateOptions = {
                formatYear: 'yy',
                maxDate: $scope.activityInfo.activityStartDate,
                startingDay: 1,
                showWeeks: false
            };
            $scope.endDateOptions = {
                formatYear: 'yy',
                minDate: $scope.activityInfo.activityEndDate,
                startingDay: 1,
                showWeeks: false
            };
            $scope.$watch('activityInfo.activityStartDate', function(newValue) {
                $scope.endDateOptions.minDate = newValue;
                paramData.activityInfo.activityStartDate = $filter('date')(newValue, 'yyyy-MM-dd');
                _.map(paramData.resources, function(item, index) {
                    item.effDate = $filter('date')(newValue, 'yyyy-MM-dd');
                });
            });
            $scope.$watch('activityInfo.activityEndDate', function(newValue) {
                $scope.startDateOptions.maxDate = newValue;
                paramData.activityInfo.activityEndDate = $filter('date')(newValue, 'yyyy-MM-dd');
                _.map(paramData.resources, function(item, index) {
                    item.expDate = $filter('date')(newValue, 'yyyy-MM-dd');
                });
            });
            $scope.startOpen = function() {
                $timeout(function() {
                    $scope.startPopupOpened = true;
                });
            };
            $scope.endOpen = function() {
                $timeout(function() {
                    $scope.endPopupOpened = true;
                });
            };
            $scope.startPopupOpened = false;
            $scope.endPopupOpened = false;

            $scope.$watch('activityInfo.activityName', function(newValue) {
                paramData.activityInfo.activityName = newValue;
            });
        }])
        .controller('redFoundationCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, paramData) {
            $scope.showFoundation = true;
            $scope.toggleShow = function() {
                $scope.showFoundation = !$scope.showFoundation;
            };
            $scope.resources = [];
            $scope.$watch('resources', function(newValue) {
                paramData.resources = newValue;
            });
            $scope.addNewLine = function() {
                var obj = {
                    'rscName': '', // 命名规则：活动名称-金额-数量 TODO:提交的时候拼接
                    'totalMoney': null,
                    'totalNum': null,
                    'rscSpecCd': '3', // 固定的值
                    'rscStateCd': '1', // 固定的值
                    'effDate': paramData.activityInfo.activityStartDate,
                    'expDate': paramData.activityInfo.activityEndDate
                };
                $scope.resources.push(obj);
            };
        }])
        .controller('submitCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, paramData) {
            $scope.submitApply = function(sign) {
                switch(sign) {
                    case 'save':
                        paramData.activityApply.applyStateCd = 0;
                        break;
                    case 'apply':
                        paramData.activityApply.applyStateCd = 1;
                        break;
                }
            }
        }])
});

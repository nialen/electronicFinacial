/**
 * Auth 丁少华
 * Date 2017-3-9
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'mock', 'select', 'uploader', 'ui-bootstrap-tpls', 'angular-animate', 'angular-locale_zh-cn'], function(angular, $, httpConfig, swal, _, Mock) {
    angular
        .module('merchantCashRedEnvelopesModule', ['ui.bootstrap', 'ui.select', 'ui.uploader'])
        .run(['$rootScope', function($rootScope) {
            $rootScope.stepNum = 0; //当前显示的step索引值（Number类型
        }])
        //活动确认保存入参
        .factory('paramData', [function() {
            var paramData = {
                'activityApply': {
                    'applyCompany': '四川电信',
                    'applyProvinceId': '23',
                    'applyStateDate': '2017-03-02 15:18:00',
                    'applyStateCd': '1',
                    'applyMan': '杨金合',
                    'linkTele': '17711112222',
                    'linkEmail': 'yangjh5@asiainfo.com',
                    'activityTplId': '4'
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
                'resources': [{
                    'rscId': '1',
                    'rscCode': '0',
                    'rscName': '成都10元2017年1月25日限额10元',
                    'rscDesc': '',
                    'faceMoney': '0',
                    'rscSpecCd': '3',
                    'rscStateCd': '1',
                    'effDate': '2017-03-02',
                    'expDate': '2017-03-02'
                }, {
                    'rscId': '2',
                    'rscCode': '0',
                    'rscName': '成都10元2017年1月25日限额20元',
                    'rscDesc': '',
                    'faceMoney': '0',
                    'rscSpecCd': '3',
                    'rscStateCd': '1',
                    'effDate': '2017-04-02',
                    'expDate': '2017-05-02'
                }],
                'activityRscs': [{
                    'rscId': '1',
                    'totalNum': '10',
                    'usedNum': '0',
                    'totalMoney': '1000',
                    'usedMoney': '0'
                }, {
                    'rscId': '2',
                    'totalNum': '10',
                    'usedNum': '0',
                    'totalMoney': '1000',
                    'usedMoney': '0'
                }]
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
            $scope.activityApply = {
                'applyCompany': '',
                'applyProvinceId': '2', // 固定的四川省的AreaID
                'applyStateDate': '',
                'applyStateCd': '',
                'applyMan': '',
                'linkTele': '',
                'linkEmail': '',
                'activityTplId': ''
            };
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
});

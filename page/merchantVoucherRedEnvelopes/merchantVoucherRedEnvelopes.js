/**
 * Auth 丁少华
 * Date 2017-3-9
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'mock', 'select', 'uploader', 'ui-bootstrap-tpls', 'angular-animate', 'angular-locale_zh-cn'], function(angular, $, httpConfig, swal, _, Mock) {
    angular
        .module('merchantVoucherRedEnvelopesModule', ['ui.bootstrap', 'ui.select', 'ngAnimate'])
        .run(['$rootScope', function($rootScope) {
            $rootScope.stepNum = 0; //当前显示的step索引值（Number类型
        }])
        //活动确认保存入参
        .factory('paramData', [function() {
            var paramData = {
                'activityApply': {
                    'applyCompany': '',
                    'applyProvinceId': '2', //固定的四川省的AreaID
                    'applyProvinceName': '四川省', //固定的四川省
                    'applyStateDate': null,
                    'applyStateCd': '', //1：保存，2：提交审批
                    'applyMan': '',
                    'linkTele': '',
                    'linkEmail': '',
                    'activityTplId': '5', //代金券红包固定值
                    'applyOptType': '0' //代金券红包固定值
                },
                'activityInfo': {
                    'activityId': '0', //固定的值
                    'activityName': '',
                    'activityDesc': '',
                    'areaIds': [],
                    'activityStartDate': '',
                    'activityEndDate': '',
                    'activityAttr': [{
                        'attrId': '110002',
                        'attrValue': '',
                        'attrName': '活动总成本'
                    }, {
                        'attrId': '210002',
                        'attrValue': '',
                        'attrName': '商户简称'
                    }]
                },
                'resources': []
            };

            return paramData;
        }])
        .factory('httpMethod', ['$http', '$q', function($http, $q) {
            var httpMethod = {};

            //查询属性离散值
            httpMethod.qryAttrValueByAttrIds = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/pub/qryAttrValueByAttrIds',
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

            //商户现金红包申请提交
            httpMethod.apply = function(param) {
                debugger
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/efmp-activity-web/activity/apply',
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
                //查询属性离散值
                Mock.mock(httpConfig.siteUrl + '/pub/qryAttrValueByAttrIds', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': {
                        'attributeList|5': [{
                            'attrId|+1': ['110030', '110031', '110032', '110033', '110034'], //属性ID
                            'attrCode': '', //属性编码
                            'name|+1': ['分配方式', '领取用户是否实名', '是否为绑卡用户', '收红包白名单', '用户类型'], //属性名称
                            'description': '', //属性描述
                            'dsTypeCd': '', //数据源类型
                            'dsTypeName': '', //数据源名称
                            'dataTypeCd': '', //数据类型
                            'dataTypeName': '', //数据类型名称
                            'attrSpecTypeCd': '', //属性规格类型
                            'attrSpecTypeName': '', //属性规格名称
                            'defaultValue': '', //缺省值
                            'AttributeValueList|2': [{
                                'attrValueId': '@id', //属性离散值ID
                                'attrValueCode': '@cword(4)', //属性离散值编码（这个用于option的页面展现）
                                'attrValueName': '', //属性离散值名称
                                'attrValueDesc': '', //属性离散值描述
                                'attrId': '', //属性ID(查询条件)
                                'upDate': '', //更新时间
                                'createDate': '' //创建时间
                            }]
                        }]
                    },
                    'errors': null
                });

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

                //商户现金红包申请提交
                Mock.mock(httpConfig.siteUrl + '/efmp-activity-web/activity/apply', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': null,
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
            };

            return httpMethod;
        }])
        // 资源类型转换文本
        .filter('rscSpecName', function () {
            return function (rscSpecCd) {
                switch (rscSpecCd) {
                    case 2:
                        return '翼支付代金券红包';
                        break;
                    case 3:
                        return '翼支付现金红包';
                        break;
                    case 4:
                        return '翼支付子代金券';
                        break;
                }
            }
        })
        .controller('activityApplyFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, paramData) {
            $scope.showInformation = true;
            $scope.toggleShow = function() {
                $scope.showInformation = !$scope.showInformation;
            };
            $scope.activityApply = {
                'applyCompany': '',
                'applyProvinceId': '2', //固定的四川省的AreaID
                'applyProvinceName': '四川省', //固定的四川省
                'applyStateDate': null,
                'applyMan': '',
                'linkTele': '',
                'linkEmail': ''
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

            $scope.activityInfo = {
                'activityName': '',
                'activityDesc': '',
                'activityStartDate': '',
                'activityEndDate': ''
            };

            $scope.merchantAbbreviation = '';
            $scope.totalCost = '';
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            $scope.$watch('merchantAbbreviation', function(newObj) {
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '110002';
                });
                _.set(activityAttr, [index, 'attrValue'], newObj);
            });
            $scope.$watch('totalCost', function(newObj) {
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '210002';
                });
                _.set(activityAttr, [index, 'attrValue'], newObj);
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
            $scope.$watch('activityInfo.activityDesc', function(newValue) {
                paramData.activityInfo.activityDesc = newValue
            });
        }])
        .controller('areaMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedAreaList = [];
            vm.areaList = []; //所有地区列表
            var param = {
                level: '3'
            };
            httpMethod.qryArea(param).then(function(rsp) {
                vm.areaList = rsp.data.area;
                $log.log('获取地区列表成功.');
            }, function() {
                $log.log('获取地区列表失败.');
            });
            vm.changeCallback = function(item, model) {
                _.set(paramData, 'activityInfo.areaIds', []);
                _.map(vm.checkedAreaList, function(item, index) {
                    _.set(paramData, ['activityInfo', 'areaIds', index, 'areaId'], item.areaId);
                    _.set(paramData, ['activityInfo', 'areaIds', index, 'areaName'], item.name);
                });
            };
        }])
        .controller('redFoundationCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', '$window', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, $window, paramData) {
            $scope.showFoundation = true;
            $scope.toggleShow = function() {
                $scope.showFoundation = !$scope.showFoundation;
            };
            $scope.resources = paramData.resources; // TODO 接收postMessage传过来的数据，update；
            $($window).on("message", function() {
                var redPacketObj = event.data,
                    index = _.findIndex($scope.resources, function(item) {
                        return item.rscId === redPacketObj.rscId;
                    });
                if (index === -1) {
                    _.set(redPacketObj, 'rscId', _.now());
                    $scope.resources.push(redPacketObj);
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                } else {
                    $scope.resources.splice(index, 1, redPacketObj);
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                };
            });

            $scope.$watch('resources', function(newValue) {
                paramData.resources = newValue;
            });
            $scope.addNewLine = function() {
                // TODO 打开红包设置页面-新建
                parent.angular.element(parent.$('#tabs')).scope().addTab('红包申请', '/page/addRedPacket/addRedPacket.html', 'voucherAddRedPacket', JSON.stringify());
            };
            $scope.editLine = function(index) {
                // TODO 打开红包设置页面-编辑
                $scope.redPacket = $scope.resources[index];
                parent.angular.element(parent.$('#tabs')).scope().addTab('红包申请', '/page/addRedPacket/addRedPacket.html', 'voucherAddRedPacket', JSON.stringify($scope.redPacket));

            }
        }])
        .controller('submitCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', 'httpMethod', function($scope, $rootScope, $filter, $log, $timeout, paramData, httpMethod) {
            $scope.submitApply = function(sign) {
                var activityApply = paramData.activityApply;
                var flag = activityApply.applyCompany.trim() === '' || activityApply.applyStateDate === null || activityApply.applyMan.trim() === '' || activityApply.linkTele.trim() === '' || activityApply.linkEmail.trim() === '';
                if (!flag) {
                    switch (sign) {
                        case 'save':
                            paramData.activityApply.applyStateCd = 1;
                            httpMethod.apply(paramData).then(function(rsp) {
                                if (rsp.success) {
                                    swal({
                                        title: '恭喜你.',
                                        text: '商户代金券红包保存成功',
                                        type: 'success',
                                        confirmButtonText: '确定'
                                    }, function() {
                                        $timeout(function() {
                                            //parent.angular.element(parent.$('#tabs')).scope().removeTab();
                                        });
                                    });
                                } else {
                                    swal({
                                        title: 'Sorry.',
                                        text: '商户代金券红包保存失败',
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                                }
                            });
                            break;
                        case 'apply':
                            paramData.activityApply.applyStateCd = 2;
                            httpMethod.apply(paramData).then(function(rsp) {
                                if (rsp.success) {
                                    swal({
                                        title: '恭喜你.',
                                        text: '商户代金券红包提交审批成功',
                                        type: 'success',
                                        confirmButtonText: '确定'
                                    }, function() {
                                        $timeout(function() {
                                            //parent.angular.element(parent.$('#tabs')).scope().removeTab();
                                        });
                                    });
                                } else {
                                    swal({
                                        title: 'Sorry.',
                                        text: '商户代金券红包提交审批失败',
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                                }
                            });
                            break;
                    }
                } else {
                    swal({
                        title: '操作提醒',
                        text: '申请人信息需要填写完整.',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            }
        }])
});

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
                    'applyStateDate': '',
                    'applyStateCd': '', //0：保存，1：提交审批，2：修改
                    'applyMan': '',
                    'linkTele': '',
                    'linkEmail': '',
                    'activityTplId': '4' //现金红包固定值
                },
                'activityInfo': {
                    'activityId': '0', //固定的值
                    'activityName': '',
                    'activityDesc': '',
                    'areaIds': [],
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
        .controller('activityApplyFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, paramData) {
            $scope.showInformation = true;
            $scope.toggleShow = function() {
                $scope.showInformation = !$scope.showInformation;
            };
            $scope.activityApply = {
                'applyCompany': '',
                'applyProvinceId': '2', //固定的四川省的AreaID
                'applyProvinceName': '四川省', //固定的四川省
                'applyStateDate': '',
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
            //110030 分配方式; 110031 领取用户是否实名; 110032 是否为绑卡用户; 110033 收红包白名单; 110034 用户类型
            var param = {
                attrIdList: ['110030', '110031', '110032', '110033', '110034']
            };
            httpMethod.qryAttrValueByAttrIds(param).then(function(rsp) {
                var attributeList = rsp.data.attributeList;
                $scope.distributionModel = [];
                $scope.isRealName = [];
                $scope.isCardUsers = [];
                $scope.whiteList = [];
                $scope.customerType = [];
                _.map(attributeList, function(item, index) {
                    switch (item.attrId) {
                        case '110030':
                            $scope.distributionModel = item.AttributeValueList;
                            break;
                        case '110031':
                            $scope.isRealName = item.AttributeValueList;
                            break;
                        case '110032':
                            $scope.isCardUsers = item.AttributeValueList;
                            break;
                        case '110033':
                            $scope.whiteList = item.AttributeValueList;
                            break;
                        case '110034':
                            $scope.customerType = item.AttributeValueList;
                            break;
                    }
                });
                $log.log('获取属性离散值列表成功.');
            }, function() {
                $log.log('获取属性离散值列表失败.');
            });

            $scope.activityInfo = {
                'activityName': '',
                'activityDesc': '',
                'activityStartDate': '',
                'activityEndDate': ''
            };

            $scope.merchantCode = '';
            $scope.wishes = '';
            $scope.redTheme = '';
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            $scope.$watch('merchantCode', function(newObj) {
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '110028';
                });
                _.set(activityAttr, [index, 'attrValue'], newObj);
            });
            $scope.$watch('wishes', function(newObj) {
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '110029';
                });
                _.set(activityAttr, [index, 'attrValue'], newObj);
            });
            $scope.$watch('redTheme', function(newObj) {
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '110035';
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
        .controller('distributionModelMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '110030';
                });
                _.set(activityAttr, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('isRealNameMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '110031';
                });
                _.set(activityAttr, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('isCardUsersMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '110032';
                });
                _.set(activityAttr, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('whiteListMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '110033';
                });
                _.set(activityAttr, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('customerTypeMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
                var index = _.findIndex(activityAttr, function(item) {
                    return item.attrId === '110034';
                });
                _.set(activityAttr, [index, 'attrValue'], arr.join(','));
            };
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
                    'rscName': '', //命名规则：活动名称-金额-数量 TODO:提交的时候拼接
                    'totalMoney': null,
                    'totalNum': null,
                    'rscSpecCd': '3', //固定的值
                    'rscStateCd': '1', //固定的值
                    'effDate': paramData.activityInfo.activityStartDate,
                    'expDate': paramData.activityInfo.activityEndDate
                };
                $scope.resources.push(obj);
            };
            $scope.delLine = function(index) {
                $scope.resources.splice(index, 1);
            }
        }])
        .controller('submitCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', 'httpMethod', function($scope, $rootScope, $filter, $log, $timeout, paramData, httpMethod) {
            $scope.submitApply = function(sign) {
                var flag = _.some(paramData.resources, function(item, index) {
                    return item.totalMoney === null || item.totalNum === null;
                });
                if (!flag) {
                    var activityName = paramData.activityInfo.activityName;
                    _.map(paramData.resources, function(item, index) {
                        item.rscName = activityName + '-' + item.totalMoney + '-' + item.totalNum;
                    });
                    switch (sign) {
                        case 'save':
                            paramData.activityApply.applyStateCd = 0;
                            httpMethod.apply(paramData).then(function(rsp) {
                                if (rsp.success) {
                                    swal({
                                        title: '恭喜你.',
                                        text: '商户现金红包保存成功',
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
                                        text: '商户现金红包保存失败',
                                        timer: 1000,
                                        showConfirmButton: false
                                    });
                                }
                            });
                            break;
                        case 'apply':
                            paramData.activityApply.applyStateCd = 1;
                            httpMethod.apply(paramData).then(function(rsp) {
                                if (rsp.success) {
                                    swal({
                                        title: '恭喜你.',
                                        text: '商户现金红包提交审批成功',
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
                                        text: '商户现金红包提交审批失败',
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
                        text: '红包总金额/子红包个数不能为空.',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }
            }
        }])
});

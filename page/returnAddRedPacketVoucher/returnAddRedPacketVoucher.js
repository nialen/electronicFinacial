/**
 * Auth 丁少华
 * Date 2017-3-20
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'mock', 'select', 'uploader', 'ui-bootstrap-tpls', 'angular-animate', 'angular-locale_zh-cn'], function(angular, $, httpConfig, swal, _, Mock) {
    angular
        .module('returnAddRedPacketVoucherModule', ['ui.bootstrap', 'ui.select', 'ui.uploader', 'ngAnimate'])
        .factory('paramData', [function() {
            var paramData = {
                'rscSpecCd': '', // 代金券红包2；现金红包3；代金券4
                'rscName': '', // 活动名称-资源数量-面值
                'faceMoney': '',
                'totalNum': '',
                'totalMoney': '',
                'effDate': '',
                'expDate': '',
                'rscNum': 0,
                'rscAttrs': [{
                    'attrId': '210025',
                    'attrValue': '',
                    'attrName': '代金券类型'
                }, {
                    'attrId': '210026',
                    'attrValue': '',
                    'attrName': '代金券名称'
                }, {
                    'attrId': '210027',
                    'attrValue': '2',
                    'attrName': '业务券开展省份'
                }, {
                    'attrId': '210028',
                    'attrValue': '',
                    'attrName': '业务券开展城市'
                }, {
                    'attrId': '210029',
                    'attrValue': '',
                    'attrName': '有效期类型'
                }, {
                    'attrId': '210031',
                    'attrValue': '',
                    'attrName': '指定周期（天）'
                }, {
                    'attrId': '210032',
                    'attrValue': '',
                    'attrName': '生效间隔（天）'
                }, {
                    'attrId': '210033',
                    'attrValue': '',
                    'attrName': '代金券生效日期'
                }, {
                    'attrId': '210034',
                    'attrValue': '',
                    'attrName': '代金券失效日期'
                }, {
                    'attrId': '210038',
                    'attrValue': '',
                    'attrName': '是否开票'
                }, {
                    'attrId': '210039',
                    'attrValue': '',
                    'attrName': '消费渠道（可多选）'
                }, {
                    'attrId': '210040',
                    'attrValue': '',
                    'attrName': '用户等级（可多选）'
                }, {
                    'attrId': '210041',
                    'attrValue': '',
                    'attrName': '代金券使用规则描述'
                }, {
                    'attrId': '210042',
                    'attrValue': '',
                    'attrName': '代金券默认短信模板'
                }],
                'rscMerchantRels': [],
                'activityCostSharings': []
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

            // 商户查询接口
            httpMethod.qryMerchantPage = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/merchant/qryMerchantPage',
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

            // 成本分摊方式查询
            httpMethod.queryPartakeShareMethod = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/efmp-common-web/pub/queryPartakeShareMethod',
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
                            'attrId|+1': ['210025', '210029', '210038', '210039', '210040'], //属性ID
                            'attrCode': '', //属性编码
                            'name|+1': ['代金券类型', '有效期类型', '是否开票', '消费渠道', '用户等级'], //属性名称
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

                //商户查询接口
                Mock.mock(httpConfig.siteUrl + '/merchant/qryMerchantPage', {
                    'rsphead': 's',
                    'success': 'true', //是否成功true/失败false
                    'code': null,
                    'msg': null, //失败信息
                    'error': null,
                    'data': {
                        'merchants|5': [{
                            'merchantId': '@id', //商户ID
                            'merchantName': '@cword(8)', //商户名称
                            'merchantCode': '@id', //商户编码
                            'merchantAddr': '@cword(12)', //商户地址
                            'areaName': '@city', //地区名称
                            'orgName': '@cword(4)', //分支局名称
                            'merchantStateCd|1': ['0', '1', '2', '3'], //商户状态 0待生效;1在用;2暂停;3注销
                        }],
                        'total': 100 //总条数
                    }
                });

                //活动商户导入
                Mock.mock(httpConfig.siteUrl + '/activity/activityMerchantUpload', {
                    'rsphead': 's',
                    'success': true, //是否成功,
                    'code': '0',
                    'msg': '', //失败信息
                    'error': null,
                    'data': {
                        'merchants|15': [{
                            'merchantId': '@id', //商户ID
                            'merchantName': '@cword(6)', //商户名称
                            'merchantCode': '@id', //商户编码
                            'merchantAddr': '', //商户地址
                            'areaName': '@city', //地区名称
                            'orgName': '@cword(6)', //分支局名称
                            'merchantStateCd|1': ['0', '1', '2', '3'], //商户状态 0待生效;1在用;2暂停;3注销
                        }],
                        'fileName': '', //文件名
                        'total|100-200': 100, //数据总量
                        'successNum|1-100': 1, //成功数量
                        'failNum|1-100': 1, //失败数量
                    }
                });

                //成本分摊方式查询
                Mock.mock(httpConfig.siteUrl + '/efmp-common-web/pub/queryPartakeShareMethod', {
                    'rsphead': 's',
                    'success': 'true',
                    'code': null,
                    'msg': null,
                    'error': null,
                    'data': {
                        'shareMethodList': [{
                            'partakeDesc': '描述',
                            'partakeId': 1,
                            'partakeName': '集团支付公司',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            },
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }, {
                            'partakeDesc': '描述',
                            'partakeId': 2,
                            'partakeName': '省公司',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            },
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }, {
                            'partakeDesc': '描述',
                            'partakeId': 3,
                            'partakeName': '地市公司',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            },
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }, {
                            'partakeDesc': '描述',
                            'partakeId': 4,
                            'partakeName': '商户',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            },
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }, {
                            'partakeDesc': '描述',
                            'partakeId': 5,
                            'partakeName': '第三方',
                            'shareTypeList': [{
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 1,
                                'shareMethodName': '支付公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 2,
                                'shareMethodName': '省公司成本'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 3,
                                'shareMethodName': '预付款'
                            }, {
                                'createDate': '2017-03-13 18:05:02',
                                'shareMethod': 4,
                                'shareMethodName': '外部成本'
                            }],
                            'stateCd': 1,
                            'stateDate': '2017-03-13 18:05:02',
                            'shareRatio': 0, // 分摊比例
                            'shareType': {
                                'shareMethod': '',
                                'shareMethodName': ''
                            }, // 选择的成本支付方式
                            'shareMethodName': '', // 成本支付名称
                            'paymentDept': '', // 付款单位机构名称
                            'prepaymentQryNbr': '', // 付款机构代码
                            'settlementMethod': '1' // 结算方式
                        }],
                        'total': 5
                    }

                });
            };
            return httpMethod;
        }])
        .filter('merchantStateCdFilter', function() {
            return function(stateValue) {
                switch (stateValue) {
                    case '0':
                        return '待生效';
                        break;
                    case '1':
                        return '在用';
                        break;
                    case '2':
                        return '暂停';
                        break;
                    case '3':
                        return '注销';
                        break;
                }
            }
        })
        .filter('settlementMethodFilter', function() {
            return function(stateValue) {
                switch (stateValue) {
                    case '1':
                        return '全额结算';
                        break;
                    case '2':
                        return '分批结算';
                        break;
                }
            }
        })
        .controller('vouchersCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', 'httpMethod', function($scope, $rootScope, $filter, $log, $timeout, paramData, httpMethod) {
            //210025 代金券类型; 210029 有效期类型； 210038 是否开票； 210039 消费渠道； 210040 用户等级；
            var param = {
                attrIdList: ['210025', '210029', '210038', '210039', '210040']
            };
            httpMethod.qryAttrValueByAttrIds(param).then(function(rsp) {
                var attributeList = rsp.data.attributeList;
                $scope.voucherTypeList = []; // 代金券类型列表
                $scope.validityTypeList = []; // 有效期类型列表
                $scope.invoiceList = []; // 是否开票列表
                $scope.salesChannelList = []; // 消费渠道列表
                $scope.userLevelList = []; // 用户等级列表
                _.map(attributeList, function(item, index) {
                    switch (item.attrId) {
                        case '210025':
                            $scope.voucherTypeList = item.AttributeValueList;
                            break;
                        case '210029':
                            $scope.validityTypeList = item.AttributeValueList;
                            break;
                        case '210038':
                            $scope.invoiceList = item.AttributeValueList;
                            break;
                        case '210039':
                            $scope.salesChannelList = item.AttributeValueList;
                            break;
                        case '210040':
                            $scope.userLevelList = item.AttributeValueList;
                            break;
                    }
                });
                $log.log('获取属性离散值列表成功.');
            }, function() {
                $log.log('获取属性离散值列表失败.');
            });


            $scope.effDate = ''; // 代金券生效日期 210033
            $scope.expDate = ''; // 代金券失效日期 210034
            $scope.faceMoney = null; // 制券面值
            $scope.totalNum = null; // 制券数量
            $scope.totalMoney = 0; // 制券总金额
            // 券消费限额
            $scope.$watch('faceMoney', function(newObj) {
                paramData.faceMoney = newObj;
                $scope.totalMoney = newObj * $scope.totalNum || 0;
            });
            $scope.$watch('totalNum', function(newObj) {
                paramData.totalNum = newObj;
                $scope.totalMoney = newObj * $scope.faceMoney || 0;
            });

            $scope.middlewave = {
                voucherName: '', // 代金券名称 210026
                provinceId: '2', // 业务券开展省份 210027
                provinceName: '四川省',
                cycle: '', // 指定周期（天） 210031
                interval: '', // 生效间隔（天） 210032
                ruleDescription: '', // 代金券使用规则描述 210041
                SMSTemplate: '', // 代金券默认短信模板 210042
            };

            var rscAttrs = _.get(paramData, 'rscAttrs');
            $scope.$watch('middlewave', function(newObj) {
                _.map(rscAttrs, function(item, index) {
                    switch (item.attrId) {
                        case '210026':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.voucherName);
                            break;
                        case '210027':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.provinceId);
                            break;
                        case '210031':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.cycle);
                            break;
                        case '210032':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.interval);
                            break;
                        case '210041':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.ruleDescription);
                            break;
                        case '210042':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.SMSTemplate);
                            break;
                    }
                });
            }, true);

            //时间控件
            $scope.startDateOptions = {
                formatYear: 'yy',
                maxDate: $scope.effDate,
                startingDay: 1,
                showWeeks: false
            };
            $scope.endDateOptions = {
                formatYear: 'yy',
                minDate: $scope.expDate,
                startingDay: 1,
                showWeeks: false
            };
            $scope.$watch('effDate', function(newValue) {
                $scope.endDateOptions.minDate = newValue;
                paramData.effDate = $filter('date')(newValue, 'yyyy-MM-dd');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210033';
                });
                _.set(rscAttrs, [index, 'attrValue'], newValue);
            });
            $scope.$watch('expDate', function(newValue) {
                $scope.startDateOptions.maxDate = newValue;
                paramData.expDate = $filter('date')(newValue, 'yyyy-MM-dd');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210034';
                });
                _.set(rscAttrs, [index, 'attrValue'], newValue);
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
                var arr = [];
                _.map(vm.checkedAreaList, function(item, index) {
                    arr.push(item.areaId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210028';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('voucherTypeMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210025';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('validityTypeMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210029';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('invoiceListMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210038';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('salesChannelMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210039';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('userLevelMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210040';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('merchantCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', '$uibModal', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, $uibModal, paramData) {
            $scope.merchantList = paramData.rscMerchantRels;
            $scope.editMerchant = function() {
                var modalInstance = $uibModal.open({
                    animation: 'true',
                    templateUrl: 'merchantModal.html',
                    controller: 'merchantModalCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return $scope.merchantList;
                        }
                    }
                });
            };
        }])
        .controller('merchantModalCtrl', ['$uibModalInstance', '$scope', '$log', '$uibModal', 'items', function($uibModalInstance, $scope, $log, $uibModal, items) {
            var $ctrl = this;
            //分页
            $scope.currentPage = 1; //当前页
            $scope.rowNumPerPage = 10; //每页显示行数
            $scope.totalNum = 0; //总条数
            $scope.maxSize = 8; //最大显示页码数
            $scope.lineList = items; //活动商户明细列表
            $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1]; //当前分页数据列表
            //切换页
            $scope.pageChanged = function() {
                $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
            };
            $scope.$watch('lineList', function(newValue) {
                $scope.totalNum = _.size(newValue);
                $scope.currentPageList = _.chunk(newValue, $scope.rowNumPerPage)[$scope.currentPage - 1];
            }, true);
            $scope.merchantImport = function(item) {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    keyboard: false,
                    animation: 'true',
                    templateUrl: 'merchantImportModal.html',
                    controller: 'merchantImportModalCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return $scope.lineList;
                        }
                    }
                });
            };
            $scope.addMerchant = function() {
                var modalInstance = $uibModal.open({
                    animation: 'true',
                    templateUrl: 'merchantChoose.html',
                    controller: 'merchantChooseCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return $scope.lineList;
                        }
                    }
                });
            };

            $scope.delLine = function(index) {
                $scope.lineList.splice(index, 1);
            }

            $ctrl.ok = function() {
                $uibModalInstance.close();
            };

            $ctrl.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }])
        .controller('merchantImportModalCtrl', ['$uibModalInstance', '$scope', '$log', 'uiUploader', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, uiUploader, items, httpMethod) {
            var $ctrl = this;
            $ctrl.ok = function() {
                $uibModalInstance.close();
            };
            $ctrl.cancel = function() {
                var merchantsList = _.get($ctrl.resp, 'data.merchants');
                _.map(merchantsList, function(item) {
                    var obj = _.assign(item, {
                        rscId: 0
                    });
                    items.unshift(obj);
                });
                $uibModalInstance.dismiss('cancel');
            };
            $ctrl.resp = null; //上传完毕接口返回的response信息；
            $ctrl.files = []; //上传的文件列表；
            $ctrl.isNotAllowClose = false; //是否不允许关闭弹框；
            $ctrl.isNotAllowUpload = true; //是否不允许上传；
            $ctrl.grantUploadTemplete = httpConfig.siteUrl + '/activity/downLoad/merchantTemplete'; //模板下载地址
            $ctrl.btn_remove = function(file) {
                uiUploader.removeFile(file);
            };
            $ctrl.btn_clean = function() {
                uiUploader.removeAll();
            };
            $ctrl.btn_upload = function() {
                $ctrl.isNotAllowClose = true;
                uiUploader.startUpload({
                    url: httpConfig.siteUrl + '/activity/activityMerchantUpload',
                    concurrency: 1,
                    onProgress: function(file) {
                        $log.info(file.name + '=' + file.humanSize);
                        $scope.$apply();
                    },
                    onCompleted: function(file, response) {
                        $ctrl.isNotAllowClose = false;
                        $ctrl.isNotAllowUpload = true;
                        $ctrl.resp = JSON.parse(response);
                        $scope.$apply();
                    }
                });
            };
            $ctrl.checkFiles = function() {
                var element = document.getElementById('merchantImportInput');
                if (element) {
                    element.addEventListener('change', function(e) {
                        $ctrl.resp = null;
                        $ctrl.files = uiUploader.removeAll();
                        $ctrl.isNotAllowUpload = true;
                        var files = e.target.files;
                        uiUploader.addFiles(files);
                        $ctrl.files = uiUploader.getFiles();
                        $ctrl.isNotAllowUpload = false;
                        $scope.$apply();
                    });
                }
            };
        }])
        .controller('merchantChooseCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', '$uibModal', 'items', 'httpMethod', function($uibModalInstance, $scope, $rootScope, $log, $uibModal, items, httpMethod) {
            var $ctrl = this;
            $ctrl.items = items;

            $ctrl.merchantName = ''; //名称
            $ctrl.merchantCode = ''; //商户编码
            $ctrl.cityId = ''; //地市ID
            $ctrl.districtId = ''; //区县ID
            $ctrl.businessList = []; //商户列表
            $ctrl.currentPage = 1; //当前页
            $ctrl.rowNumPerPage = 10; //每页显示行数
            $ctrl.totalNum = 0; //总条数
            $ctrl.maxSize = 4; //最大显示页码数
            //切换页
            $ctrl.pageChanged = function() {
                $ctrl.conditionQuery($ctrl.currentPage);
            };

            $ctrl.cityList = []; //所有地区列表
            var param = {
                level: '3'
            };
            httpMethod.qryArea(param).then(function(rsp) {
                $ctrl.cityList = rsp.data.area;
                $log.log('获取州/市列表成功.');
            }, function() {
                $log.log('获取州/市列表失败.');
            });

            $scope.$watch('$ctrl.cityId', function(newValue) {
                $ctrl.districtId = '';
                if (newValue) {
                    var param = {
                        level: '4',
                        parentAreaId: newValue
                    };
                    httpMethod.qryArea(param).then(function(rsp) {
                        $ctrl.districtList = rsp.data.area;
                        $log.log('获取区/县列表成功.');
                    }, function() {
                        $log.log('获取区/县列表失败.');
                    });
                } else {
                    $ctrl.districtList = [];
                }
            });

            //条件查询
            $ctrl.conditionQuery = function() {
                var param = {
                    merchantName: $ctrl.merchantName, //厅店名称
                    merchantCode: $ctrl.merchantCode, //厅店ID
                    cityId: $ctrl.cityId, //地市ID
                    districtId: $ctrl.districtId, //区县ID
                    areaList: [], //活动地区
                    stateCdList: [], //状态列表
                    pageSize: $ctrl.rowNumPerPage, //每页条数
                    curPage: $ctrl.currentPage //当前页
                };
                httpMethod.qryMerchantPage(param).then(function(rsp) {
                    $ctrl.businessList = rsp.data.merchants;
                    $ctrl.totalNum = rsp.data.total;
                    $log.log('获取商户查询接口成功.');
                }, function() {
                    $log.log('获取商户查询接口失败.');
                });
            };

            $ctrl.todoChecked = {}; //待确认的选项
            //单选框选择
            $ctrl.check = function(item) {
                $ctrl.todoChecked = item;
            };

            $ctrl.ok = function() {
                $ctrl.items.push($ctrl.todoChecked);
                $uibModalInstance.close();
            };
            $ctrl.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }])
        .controller('costCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', '$uibModal', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, $uibModal, paramData) {
            $scope.subResources = paramData.activityCostSharings;
            $scope.editCostAllocation = function() {
                var modalInstance = $uibModal.open({
                    animation: 'true',
                    templateUrl: 'costSharingModal.html',
                    controller: 'costModalCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return $scope.subResources;
                        }
                    }
                });
            };
        }])
        .controller('costModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', 'paramData', function($uibModalInstance, $scope, $log, items, httpMethod, paramData) {
            var $ctrl = this;
            $ctrl.items = items;
            $scope.shareMethodList = [];
            $scope.currentPage = 1; //当前页
            $scope.rowNumPerPage = 10; //每页显示行数
            $scope.totalNum = 0; //总条数
            $scope.maxSize = 4; //最大显示页码数

            if (_.size($ctrl.items)) {
                $scope.shareMethodList = $ctrl.items;
            } else {
                httpMethod.queryPartakeShareMethod().then(function(rsp) {
                    $scope.shareMethodList = rsp.data.shareMethodList;
                    _.map($scope.shareMethodList, function(item) {
                        $ctrl.items.push(item);
                    });
                    $scope.totalNum = rsp.data.total;
                });
            };

            $scope.delLine = function(item) {
                item = _.assign(item, {
                    'shareType': {
                        'shareMethod': '', // 成本支付方式
                        'shareMethodName': '' // 成本支付名称
                    },
                    'shareRatio': 0, // 分摊比例
                    'paymentDept': '', // 付款单位机构名称
                    'prepaymentQryNbr': '', // 付款机构代码
                });
            };

            $ctrl.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }])
        .controller('submitCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', 'httpMethod', function($scope, $rootScope, $filter, $log, $timeout, paramData, httpMethod) {
            $scope.submitApply = function(sign) {
                var frame = window.parent.frames['activityReturn'];
                if(frame){
                    //发送消息
                    frame.contentWindow.postMessage(paramData, '*');
                }else{
                    swal({
                        title: '操作提醒',
                        text: '请勿关闭商户代金券申请页面',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }      
            }
        }])
});

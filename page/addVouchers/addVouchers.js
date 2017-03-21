/**
 * Auth nieyalan
 * Date 2017-3-14
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'mock', 'select', 'uploader', 'ui-bootstrap-tpls', 'angular-animate', 'angular-locale_zh-cn'], function(angular, $, httpConfig, swal, _, Mock) {
    angular
        .module('addVouchersModule', ['ui.bootstrap', 'ui.select', 'ngAnimate'])
        //活动确认保存入参
        .factory('paramData', [function() {
            var paramData = {
                'rscSpecCd': '2', //固定值
                'rscName': '',
                'faceMoney': '',
                'totalNum': '',
                'totalMoney': '',
                'effDate': '',
                'expDate': '',
                'rscAttrs': [{
                    'attrId': '210001',
                    'attrValue': '',
                    'attrName': '红包类型'
                }, {
                    'attrId': '210043',
                    'attrValue': '',
                    'attrName': '红包链接限制'
                }, {
                    'attrId': '210044',
                    'attrValue': '',
                    'attrName': '商户简称'
                }, {
                    'attrId': '210003',
                    'attrValue': '',
                    'attrName': '新用户是否可领'
                }, {
                    'attrId': '210004',
                    'attrValue': '',
                    'attrName': '老用户是否可领'
                }, {
                    'attrId': '210005',
                    'attrValue': '',
                    'attrName': '领取身份限制'
                }, {
                    'attrId': '210006',
                    'attrValue': '',
                    'attrName': '用户运营商'
                }, {
                    'attrId': '210007',
                    'attrValue': '',
                    'attrName': '红包链接接收邮箱'
                }, {
                    'attrId': '210008',
                    'attrValue': '',
                    'attrName': '防止url转发'
                }, {
                    'attrId': '210009',
                    'attrValue': '',
                    'attrName': '单用户领取次数'
                }, {
                    'attrId': '210012',
                    'attrValue': '',
                    'attrName': '红包内代金券总张数'
                }, {
                    'attrId': '210014',
                    'attrValue': '',
                    'attrName': '子红包代金券总张数'
                }, {
                    'attrId': '210015',
                    'attrValue': '',
                    'attrName': '子红包链接有效时间'
                }, {
                    'attrId': '210016',
                    'attrValue': '',
                    'attrName': '领取页面祝福语'
                }, {
                    'attrId': '210017',
                    'attrValue': '',
                    'attrName': '链接指定失效时间'
                }, {
                    'attrId': '210018',
                    'attrValue': '',
                    'attrName': '分享链接标题'
                }, {
                    'attrId': '210019',
                    'attrValue': '',
                    'attrName': '分享链接祝福语'
                }, {
                    'attrId': '210020',
                    'attrValue': '',
                    'attrName': '中奖率'
                }, {
                    'attrId': '210021',
                    'attrValue': '',
                    'attrName': '中奖跳转应用'
                }, {
                    'attrId': '210022',
                    'attrValue': '',
                    'attrName': '中奖提示'
                }, {
                    'attrId': '210023',
                    'attrValue': '',
                    'attrName': '未中奖链接'
                }, {
                    'attrId': '210024',
                    'attrValue': '',
                    'attrName': '未中奖提示'
                }],
                'subResources': []
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


            if (httpConfig.isMock) {
                //查询属性离散值
                Mock.mock(httpConfig.siteUrl + '/pub/qryAttrValueByAttrIds', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': {
                        'attributeList|5': [{
                            'attrId|+1': ['210003', '210004', '210005', '210006', '210008'], //属性ID
                            'attrCode': '', //属性编码
                            'name|+1': ['新用户是否可领', '老用户是否可领', '领取身份限制', '用户运营商', '防止URL转发'], //属性名称
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
            };

            return httpMethod;
        }])
        .controller('redPacketCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', 'httpMethod', function($scope, $rootScope, $filter, $log, $timeout, paramData, httpMethod) {

            //210003 新用户是否可领; 210004 老用户是否可领; 210005 领取身份限制; 210006 用户运营商; 210008 防止URL转发
            var param = {
                attrIdList: ['210003', '210004', '210005', '210006', '210008']
            };
            httpMethod.qryAttrValueByAttrIds(param).then(function(rsp) {
                var attributeList = rsp.data.attributeList;
                $scope.newUserman = [];
                $scope.oldUserman = [];
                $scope.receiveLimit = [];
                $scope.userHouse = [];
                $scope.forbidUrl = [];
                _.map(attributeList, function(item, index) {
                    switch (item.attrId) {
                        case '210003':
                            $scope.newUserman = item.AttributeValueList;
                            break;
                        case '210004':
                            $scope.oldUserman = item.AttributeValueList;
                            break;
                        case '210005':
                            $scope.receiveLimit = item.AttributeValueList;
                            break;
                        case '210006':
                            $scope.userHouse = item.AttributeValueList;
                            break;
                        case '210008':
                            $scope.forbidUrl = item.AttributeValueList;
                            break;
                    }
                });
                $log.log('获取属性离散值列表成功.');
            }, function() {
                $log.log('获取属性离散值列表失败.');
            });

            $scope.middlewave = {
                receiveEmail: '', //红包链接接收邮箱
                redCashNums: '', //红包内代金券总张数
                redCashUrlForid: '', //红包链接限制 
                singleUserman: '', //单用户领取次数  
                redCashChildNums: '', //子红包代金券总张数
                storeName: '', //商户简称
                redCashChildTime: '', //子红包链接有效时间（小时）
                receiveWishes: '', //领取页面祝福语
                urlAbateTime: '', //链接指定失效时间 
                shareUrlTitle: '', //分享链接标题 
                shareUrlWishes: '', //分享链接祝福语
                winningRate: '', //中奖率
                winApplication: '', //中奖跳转应用 
                winRemind: '', //中奖提示 
                noWinUrl: '', //未中奖链接
                noWinRemind: '' //未中奖提示 
            };

            var rscAttrs = _.get(paramData, 'rscAttrs');
            $scope.$watch('middlewave', function(newObj) {
                _.map(rscAttrs, function(item, index) {
                    switch (item.attrId) {
                        case '210007':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.receiveEmail);
                            break;
                        case '210012':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.redCashNums);
                            break; 
                        case '210043':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.redCashUrlForid);
                            break; 
                        case '210009':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.singleUserman);
                            break;
                        case '210014':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.redCashChildNums);
                            break; 
                        case '210044':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.storeName);
                            break; 
                        case '210015':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.redCashChildTime);
                            break;
                        case '210016':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.receiveWishes);
                            break; 
                        case '210017':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.urlAbateTime);
                            break;
                        case '210018':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.shareUrlTitle);
                            break;
                        case '210019':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.shareUrlWishes);
                            break;
                        case '210020':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.winningRate);
                            break;
                        case '210021':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.winApplication);
                            break;
                        case '210022':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.winRemind);
                            break;
                        case '210023':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.noWinUrl);
                            break;
                        case '210024':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.noWinRemind);
                            break;     
                    }
                })
            }, true);

            $scope.$watch('rscName', function(newValue) {
                paramData.rscName = newValue
            });

            $scope.$watch('faceMoney', function(newValue) {
                paramData.faceMoney = newValue;
                paramData.totalMoney = $scope.totalMoney = newValue * paramData.totalNum || 0;
            });
            $scope.$watch('totalNum', function(newValue) {
                paramData.totalNum = newValue;
                paramData.totalMoney = $scope.totalMoney = newValue * paramData.faceMoney || 0;
            });
            
        }])
        .controller('newUsermanMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210003';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('oldUsermanMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210004';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('receiveLimitMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210005';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('userHouseMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210006';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('forbidUrlMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210008';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
        }])
        .controller('redFoundationCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, paramData) {
            $scope.subResources = [];
            $scope.$watch('subResources', function(newValue) {
                paramData.subResources = newValue;
            });
            $scope.addNewLine = function() {

            };
            $scope.delLine = function(index) {
                $scope.splice(index, 1);
            }
        }])
        .controller('submitCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', 'httpMethod', function($scope, $rootScope, $filter, $log, $timeout, paramData, httpMethod) {
            $scope.submitApply = function(sign) {
                $log.log(paramData, 'paramData');
            }
        }])
});

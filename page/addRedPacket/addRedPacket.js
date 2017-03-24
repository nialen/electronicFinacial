/**
 * Auth nieyalan
 * Date 2017-3-14
 */
define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'mock', 'select', 'uploader', 'ui-bootstrap-tpls', 'angular-animate', 'angular-locale_zh-cn'], function(angular, $, httpConfig, swal, _, Mock) {
    angular
        .module('addRedPacketModule', ['ui.bootstrap', 'ui.select', 'ngAnimate'])
        .run(['$rootScope', function($rootScope) {
            $rootScope.faceMoney = 0;
            $rootScope.totalNum = 1;
            $rootScope.totalMoney = 0;
            $rootScope.redCashNums = 0; // 210012
            $rootScope.redCashChildNums = 0; // 210014
        }])
        //活动确认保存入参
        .service('paramData', [function() {
            var id = window.frameElement && window.frameElement.id || '',
                obj = parent.$('#' + id).attr('data');
            var paramData = obj ? JSON.parse(obj) : {
                'rscSpecCd': 2, //固定值
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
            paramData.documentId = id; // 区别来源
            return paramData;
        }])
        .factory('httpMethod', ['$http', '$q', function($http, $q) {
            var httpMethod = {};
            // 获取对应属性的默认值
            httpMethod.getAttrValue = function(attrList, attrId) {
                var index = _.findIndex(attrList, function(item) {
                    return item.attrId === attrId;
                });
                return _.get(attrList, [index, 'attrValue']);
            };

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
                            'attrId|+1': ['210001', '210003', '210004', '210005', '210006', '210008'], //属性ID
                            'attrCode': '', //属性编码
                            'name|+1': ['红包类型', '新用户是否可领', '老用户是否可领', '领取身份限制', '用户运营商', '防止URL转发'], //属性名称
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
            //210001 红包类型; 210003 新用户是否可领; 210004 老用户是否可领; 210005 领取身份限制; 210006 用户运营商; 210008 防止URL转发
            var param = {
                attrIdList: ['210001', '210003', '210004', '210005', '210006', '210008']
            };
            httpMethod.qryAttrValueByAttrIds(param).then(function(rsp) {
                var attributeList = rsp.data.attributeList;
                $scope.redPacketType = [];
                $scope.newUserman = [];
                $scope.oldUserman = [];
                $scope.receiveLimit = [];
                $scope.userHouse = [];
                $scope.forbidUrl = [];
                _.map(attributeList, function(item, index) {
                    switch (item.attrId) {
                        case '210001':
                            $scope.redPacketType = item.AttributeValueList;
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

            var rscAttrs = _.get(paramData, 'rscAttrs');
            $scope.middlewave = {
                receiveEmail: httpMethod.getAttrValue(rscAttrs, '210007') || '', //红包链接接收邮箱210007
                singleUserman: httpMethod.getAttrValue(rscAttrs, '210009') || '', //单用户领取次数210009
                storeName: httpMethod.getAttrValue(rscAttrs, '210044') || '', //商户简称210044
                redCashChildTime: httpMethod.getAttrValue(rscAttrs, '210015') || '', //子红包链接有效时间（小时）210015
                receiveWishes: httpMethod.getAttrValue(rscAttrs, '210016') || '', //领取页面祝福语210016
                urlAbateTime: httpMethod.getAttrValue(rscAttrs, '210017') || '', //链接指定失效时间210017
                shareUrlTitle: httpMethod.getAttrValue(rscAttrs, '210018') || '', //分享链接标题210018
                shareUrlWishes: httpMethod.getAttrValue(rscAttrs, '210019') || '', //分享链接祝福语210019
                winningRate: httpMethod.getAttrValue(rscAttrs, '210020') || '', //中奖率210020
                winApplication: httpMethod.getAttrValue(rscAttrs, '210021') || '', //中奖跳转应用210021
                winRemind: httpMethod.getAttrValue(rscAttrs, '210022') || '', //中奖提示210022
                noWinUrl: httpMethod.getAttrValue(rscAttrs, '210023') || '', //未中奖链接210023
                noWinRemind: httpMethod.getAttrValue(rscAttrs, '210024') || '' //未中奖提示210024
            };

            $scope.$watch('middlewave', function(newObj) {
                _.map(rscAttrs, function(item, index) {
                    switch (item.attrId) {
                        case '210007':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.receiveEmail);
                            break;
                        case '210009':
                            _.set(rscAttrs, [index, 'attrValue'], newObj.singleUserman);
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

            $scope.rscName = paramData.rscName || '';

            $scope.$watch('rscName', function(newValue) {
                paramData.rscName = newValue
            });

            $rootScope.$watch('totalNum', function(newValue) {
                $rootScope.totalMoney = $rootScope.faceMoney * newValue;
                $rootScope.redCashNums = $rootScope.redCashChildNums * newValue;

                paramData.totalMoney = $rootScope.totalMoney;
                var rscAttrs = _.get(paramData, 'rscAttrs');
                _.map(rscAttrs, function(item, index) {
                    switch (item.attrId) {
                        case '210012':
                            _.set(rscAttrs, [index, 'attrValue'], $rootScope.redCashNums);
                            break;
                    }
                });
            });
        }])
        .controller('redPacketTypeMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {
            var vm = this;
            vm.checkedList = [];
            vm.changeCallback = function(item, model) {
                var arr = [];
                _.map(vm.checkedList, function(item, index) {
                    arr.push(item.attrValueId);
                });
                var rscAttrs = _.get(paramData, 'rscAttrs');
                var index = _.findIndex(rscAttrs, function(item) {
                    return item.attrId === '210001';
                });
                _.set(rscAttrs, [index, 'attrValue'], arr.join(','));
            };
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
        .controller('redFoundationCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', '$window', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, $window, paramData) {
            $scope.subResources = paramData.subResources; // TODO 接收postMessage传过来的数据，update；
            $($window).on("message", function() {
                var redPacketVoucherObj = event.data,
                    index = _.findIndex($scope.subResources, function(item) {
                        return item.rscId === redPacketVoucherObj.rscId;
                    });
                if (index === -1) {
                    _.set(redPacketVoucherObj, 'rscId', _.now());
                    $scope.subResources.push(redPacketVoucherObj);
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                } else {
                    $scope.subResources.splice(index, 1, redPacketVoucherObj);
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                };
            });
            $scope.$watch('subResources', function(newValue) {
                // $rootScope.faceMoney = 0;
                // $rootScope.totalNum = 1; // 需要监听对象
                // $rootScope.totalMoney = 0;
                // $rootScope.redCashNums = 0; // 210012
                // $rootScope.redCashChildNums = 0; // 210014
                _.map(newValue, function(item) {
                    $rootScope.faceMoney += item.totalMoney;
                    $rootScope.redCashChildNums += item.totalNum;
                });
                $rootScope.totalMoney = $rootScope.faceMoney * $rootScope.totalNum;
                $rootScope.redCashNums = $rootScope.redCashChildNums * $rootScope.totalNum;

                paramData.subResources = newValue;
                paramData.faceMoney = $rootScope.faceMoney;
                // paramData.totalNum = $rootScope.totalNum;
                paramData.totalMoney = $rootScope.totalMoney;

                var rscAttrs = _.get(paramData, 'rscAttrs');
                _.map(rscAttrs, function(item, index) {
                    switch (item.attrId) {
                        case '210012':
                            _.set(rscAttrs, [index, 'attrValue'], $rootScope.redCashNums);
                            break;
                        case '210014':
                            _.set(rscAttrs, [index, 'attrValue'], $rootScope.redCashChildNums);
                            break;
                    }
                });
            });
            $scope.addNewLine = function() {
                parent.angular.element(parent.$('#tabs')).scope().addTab('代金券申请', '/page/addRedPacketVoucher/addRedPacketVoucher.html', 'subAddRedPacketVoucher');
            };
            $scope.editLine = function(item) {
                parent.angular.element(parent.$('#tabs')).scope().addTab('代金券申请', '/page/addRedPacketVoucher/addRedPacketVoucher.html', 'subAddRedPacketVoucher', JSON.stringify(item));
            }
            $scope.delLine = function(index) {
                $scope.subResources.splice(index, 1);
            }
        }])
        .controller('submitCtrl', ['$scope', '$rootScope', '$log', '$timeout', 'paramData', 'httpMethod', function($scope, $rootScope, $log, $timeout, paramData, httpMethod) {
            $scope.submitApply = function() {
                switch(paramData.documentId) {
                    case 'returnAddRedPacket':
                        var frame = window.parent.frames['activityReturn'];
                        if (frame) {
                            //发送消息
                            frame.contentWindow.postMessage(paramData, '*');
                            parent.angular.element(parent.$('#tabs')).scope().removeTab();
                        };
                        break;
                    case 'voucherAddRedPacket':
                        var frame = window.parent.frames['merchantVoucherRedEnvelopes'];
                        if (frame) {
                            //发送消息
                            frame.contentWindow.postMessage(paramData, '*');
                            parent.angular.element(parent.$('#tabs')).scope().removeTab();
                        };
                        break;
                };
            }
        }])
});

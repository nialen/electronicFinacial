/**
 * Auth nieyalan
 * Date 2016-12-24
 */
angular
    .module('distributionQueryModule', ['ui.bootstrap', 'ui.select'])
    // .run(['$rootScope', function($rootScope) {
    //     $rootScope.areaList = []; // 地区列表
    // }])
    //活动确认保存入参
    .factory('paramData', [function() {
        var paramData = {
            'activityName': '', //活动名称
            'activityCode': '', //活动编码
            'activityType': '', //活动类型
            'activityStartDate': '', //活动开始时间
            'activityEndDate': '', //活动结束时间
            'areasId': [{ //活动地区ID列表
                'areaId': '' //地区ID
            }],
            'activityDesc': '', //活动描述
            'hallResources': [{ //厅店发放明细列表
                'hallId': '111', //厅店ID
                'resId': '213', //资源ID
                'num': 500 //资源数量
            }],
            'merchants': [{ //商户列表
                'merchantId': '12321', //商户ID
                'merchantName': 'xx商户' //商户名称
            }]
        }
        return paramData;
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
            'siteUrl': 'http://192.168.16.84:8088',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'isMock': true //是否开启测试数据
        };
        var httpMethod = {};

        //获取地区列表
        httpMethod.qryCommonRegion = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/common/qryCommonRegion',
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

        //活动状态
        httpMethod.queryStateDict = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/queryStateDict',
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

        //代金券发放查询
        httpMethod.qryGrantActivity = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/qryGrantActivity',
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

        //暂停
        // httpMethod.qryCommonRegion = function(param) {
        //     var defer = $q.defer();
        //     $http({
        //         url: httpConfig.siteUrl + '/common/qryCommonRegion',
        //         method: 'POST',
        //         headers: httpConfig.requestHeader,
        //         data: 'param=' + JSON.stringify(param)
        //     }).success(function(data, header, config, status) {
        //         if (status != 200) {
        //             //跳转403页面
        //         }
        //         defer.resolve(data);
        //     }).error(function(data, status, headers, config) {
        //         defer.reject(data);
        //     });
        //     return defer.promise;
        // };

        if (httpConfig.isMock) {
            //地区查询
            Mock.mock(httpConfig.siteUrl + '/common/qryCommonRegion', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'area|21': [{
                        'commonRegionId': '@id', //地区ID
                        'name': '@city' //地区名称
                    }]
                },
                'errors': null
            });
            // 活动状态
            Mock.mock(httpConfig.siteUrl + '/activity/queryStateDict', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    "states|3": [{
                        "code|+1": ["1","2","3"],//状态编码：1正常、2暂停、3结束
                        "name|+1": ["正常","暂停","结束"]//状态名称
                    }]
                },
                'errors': null
            });
            //代金券查询
            Mock.mock(httpConfig.siteUrl + '/activity/qryGrantActivity', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    "activitys|5": [{
                        "activitiId": "@id",//活动ID
                        "activitiIdName": "@cword(10)",//活动名称
                        "areasId|2": [{//活动地区ID列表
                            "areaId": "@id",//地区ID
                            "name": "@city"//地区名称
                        }],
                        "activityStartDate": "@date",//活动开始时间
                        "activityEndDate": "@date",//活动结束时间
                        "stateCode|+1": ["1","2","3"]//状态编码：1正常、2暂停、3结束
                    }],
                    "total|1-100":10//总条数
                },
                'errors': null
            });
        }
        return httpMethod;
    }])
    
    // 状态码转换文本
    .filter('stateName', function () {
        return function (stateValue) {
            switch (stateValue) {
                case '1':
                    return '正常';
                    break;
                case '2':
                    return '暂停';
                    break;
                case '3':
                    return '结束';
                    break;
            }
        }
    })
    .controller('selectMultipleCtrl', ['$log', 'httpMethod', 'paramData', function($log, httpMethod, paramData) {
        var vm = this;
        vm.checkedAreaList = [];
        vm.areaList = []; //所有地区列表
        var param = {
            level: '3'
        };
        httpMethod.qryCommonRegion(param).then(function(rsp) {
            vm.areaList = rsp.data.area;
            $log.log('获取地区列表成功.');
        }, function() {
            $log.log('获取地区列表失败.');
        });
        vm.changeCallback = function(item, model) {
            paramData.areasId = [];
            _.map(vm.checkedAreaList, function(item, index) {
                _.set(paramData, ['areasId', index, 'areaId'], item.commonRegionId);
            });
        };
    }])
    // 查询控制器
    .controller('queryOperateFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'httpMethod', 'paramData', function ($scope, $rootScope, $filter, $log, $timeout, httpMethod, paramData) {
        // 查询结果分页信息
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

        // 获取状态码
        httpMethod.queryStateDict().then(function (rsp) {
            $log.log('调用状态信息成功.');
            $rootScope.stateText = rsp.data;
        }, function () {
            $log.log('调用状态信息失败.');
        });

        $scope.$watch('activityInformation', function(newValue) {
            _.assign(paramData, newValue);
        }, true);

        //时间控件
        $scope.createStartDt = ''; //制单日期开始
        $scope.createEndDt = ''; //制单日期结束
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.createEndDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.createStartDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('createStartDt', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
            paramData.activityStartDate = $filter('date')(newValue, 'yyyyMMdd');
        });
        $scope.$watch('createEndDt', function(newValue) {
            $scope.startDateOptions.maxDate = newValue;
            paramData.activityEndDate = $filter('date')(newValue, 'yyyyMMdd');
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
       
        $scope.queryOperateForm = {
            activityName: '',
            hallId: '',
            activityStartDate: '',
            activityEndDate:'',
            areaIds: [{//活动地区ID列表
                areaId:'',//地区ID
            }],
            states: [{
                code: '',//地区ID//状态编码 
            }]
        };

        $scope.queryOperateFormSubmit = function (currentPage) {
            !currentPage && $scope.$broadcast('pageChange');

            var param = {
                activityName: _.get($scope, 'queryOperateForm.activityName'), // 活动名称
                hallId: _.get($scope, 'queryOperateForm.hallId'), // 厅店
                activityStartDate: _.get($scope, 'queryOperateForm.activityStartDate'), // 活动开始时间 
                activityEndDate: _.get($scope, 'queryOperateForm.activityEndDate'), // 活动结束时间 
                areaIds: [{//活动地区ID列表
                    areaId: _.get($scope, 'queryOperateForm.areaId'),//地区ID
                }],
                states: [{
                    code: _.get($scope, 'queryOperateForm.code'),//地区ID//状态编码 
                }],
                curPage: currentPage || $scope.currentPage, // 当前页
                pageSize: $scope.rowNumPerPage, // 每页展示行数
            };
            
            // 发放查询信息
            httpMethod.qryGrantActivity(param).then(function (rsp) {
                $log.log('调用发放查询接口成功.');
                $rootScope.queryOperateResultList = rsp.data.activitys;
                $scope.totalNum = rsp.data.totalNum;
            }, function () {
                $log.log('调用发放查询接口失败.');
            });
        };

        $scope.$on('requery', function () {
            $scope.queryOperateFormSubmit();
        });

    }])
    // 查询结果控制器
    .controller('queryOperateResultCtrl', ['$scope', '$rootScope', '$log', '$filter', 'httpMethod', function ($scope, $rootScope, $log, $filter, httpMethod) {
        // 修改
        // $scope.editQueryOperate = function (index) {
        //     $rootScope.modifiedQueryOperate = $rootScope.queryOperateResultList[index];
        //     parent.angular.element(parent.$('#tabs')).scope().addTab('修改权限规格', '/psm/page/modifyOperate/modifyOperate.html', 'modifyOperate', JSON.stringify($rootScope.modifiedQueryOperate));
        // };
        
        // 详情
        $scope.infoDistribution = function (index) {
            $rootScope.distributionDetail = $rootScope.queryOperateResultList[index];
            parent.angular.element(parent.$('#tabs')).scope().addTab('发放详情', '/psm/page/distributionDetail/distributionDetail.html', 'distributionDetail', JSON.stringify($rootScope.distributionDetail));
        };
        
        // 暂停
        $scope.uLockOperateSpec = function (state) {
            if ($scope.checkedOperateSpec.length) {
                var param = {
                    operationSpecCd: [],
                    state: 0
                };
                $scope.checkedOperateSpec.map(function (item, index) {
                    param.operationSpecCd.push(item.operationSpecCd);
                });
                param.operationSpecCd = param.operationSpecCd.join();
                swal({
                    title: "权限规格启用",
                    text: "您确定要把权限规格编码为" + param.operationSpecCd + "的配置启用吗？",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true
                }, function () {
                    httpMethod.uLockOperateSpec(param).then(function (rsp) {
                        $log.log('调用启用权限规格配置接口成功.');
                        if (rsp.data) {
                            swal({
                                title: "操作成功",
                                text: "权限规格配置启用成功!",
                                type: "success",
                                confirmButtonText: "确定",
                                confirmButtonColor: "#ffaa00"
                            }, function () {
                                $scope.$emit('requery');
                            });
                        } else {
                            swal("OMG", "权限规格配置启用失败!", "error");
                        }
                    }, function () {
                        swal("OMG", "调用启用权限规格配置接口失败!", "error");
                    });
                });
            } else {
                swal("操作提醒", "您没有选中任何需要启用的权限规格！", "info");
            }
        };
        // 结束
        $scope.lockOperateSpec = function (state) {
            if ($scope.checkedOperateSpec.length) {
                var param = {
                    operationSpecCd: [],
                    state: 1
                };
                $scope.checkedOperateSpec.map(function (item, index) {
                    param.operationSpecCd.push(item.operationSpecCd);
                });
                param.operationSpecCd = param.operationSpecCd.join();
                swal({
                    title: "权限规格配置停用",
                    text: "您确定要把权限规格编码为" + param.operationSpecCd + "的配置停用吗？",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true
                }, function () {
                    httpMethod.lockOperateSpec(param).then(function (rsp) {
                        $log.log('调用停用权限规格配置接口成功.');
                        if (rsp.data) {
                            swal({
                                title: "操作成功",
                                text: "权限规格配置停用成功!",
                                type: "success",
                                confirmButtonText: "确定",
                                confirmButtonColor: "#ffaa00"
                            }, function () {
                                $scope.$emit('requery');
                            });
                        } else {
                            swal("OMG", "权限规格配置停用失败!", "error");
                        }
                    }, function () {
                        swal("OMG", "调用停用权限规格配置接口失败!", "error");
                    });
                });
            } else {
                swal("操作提醒", "您没有选中任何需要停用的权限规格！", "info");
            }
        };

        // 删除
        $scope.batchCancelOperateSpec = function () {
            if ($scope.checkedOperateSpec.length) {
                var param = [];
                $scope.checkedOperateSpec.map(function (item, index) {
                    param.push(item.operationSpecCd);
                });
                param = param.join();
                swal({
                    title: "删除权限规格",
                    text: "您确定要把权限规格编码为" + param + "的配置删除吗？",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true
                }, function () {
                    httpMethod.batchCancelOperateSpec(param).then(function (rsp) {
                        $log.log('调用删除权限规格配置接口成功.');
                        if (rsp.data) {
                            swal({
                                title: "操作成功",
                                text: "删除权限规格配置成功!",
                                type: "success",
                                confirmButtonText: "确定",
                                confirmButtonColor: "#ffaa00"
                            }, function () {
                                $scope.$emit('requery');
                            });
                        } else {
                            swal("OMG", "删除权限规格配置失败!", "error");
                        }
                    }, function () {
                        swal("OMG", "调用删除权限规格配置接口失败!", "error");
                    });
                });
            } else {
                swal("操作提醒", "您没有选中任何需要删除的权限规格！", "info");
            }
        }
    }])

    //分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $scope.queryStaffFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])
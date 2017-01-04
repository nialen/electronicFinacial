/**
 * Auth nieyalan
 * Date 2016-12-27
 */
angular
    .module('distributionQueryModule', ['ui.bootstrap', 'ui.select'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.areaList = []; // 地区列表
    }])
    //活动确认保存入参
    .factory('paramData', [function() {
        var paramData = {
            'activityName': '', //活动名称
            'activityCode': '', //活动编码
            'activityType': '', //活动类型
            'activityStartDate': '', //活动开始时间
            'activityEndDate': '', //活动结束时间
            'areaIds': [{ //活动地区ID列表
                'areaId': '' //地区ID
            }],
            'states': [{ //状态编码列表
                'code': '' //状态编码
            }],
            'hallName':'',
        }
        return paramData;
    }])
    .factory('httpConfig', [function() {
        var httpConfig = {
            'siteUrl': 'http://192.168.16.84:8088',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'isMock': true //是否开启测试数据
        };
        return httpConfig;
    }])
    .factory('httpMethod', ['$http', '$q', 'httpConfig', function($http, $q, httpConfig) {
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

        // 修改活动状态
        httpMethod.changeStatus = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/changeStatus',
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

        if (httpConfig.isMock) {
            //地区查询
            Mock.mock(httpConfig.siteUrl + '/common/qryCommonRegion', {
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
            // 修改活动状态
            Mock.mock(httpConfig.siteUrl + '/activity/changeStatus', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'errors': null
            });
            //代金券查询
            Mock.mock(httpConfig.siteUrl + '/activity/qryGrantActivity', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'activitys|10': [{
                        'activitiId': '@id',//活动ID
                        'activitiCode':'@id',
                        'activitiIdName': '@cword(10)',//活动名称
                        'areaIds|2': [{//活动地区ID列表
                            'areaId': '@id',//地区ID
                            'name': '@city'//地区名称
                        }],
                        'activityStartDate': '@date',//活动开始时间
                        'activityEndDate': '@date',//活动结束时间
                        'stateCode|+1': ["1","2","3"]//状态编码：1正常、2暂停、3结束
                    }],
                    'total|1-100':10//总条数
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
            paramData.areaIds = [];
            _.map(vm.checkedAreaList, function(item, index) {
                _.set(paramData, ['areaIds', index, 'areaId'], item.areaId);
            });
        };
    }])
    // 状态多选
    .controller('selectStateCtrl', ['$log', 'httpMethod', 'paramData', function($log, httpMethod, paramData) {
        var vm = this;
        vm.checkedStateList = [];
        vm.stateList = []; //所有状态列表

        httpMethod.queryStateDict().then(function(rsp) {
            vm.stateList = rsp.data.states;
            $log.log('获取状态信息成功.');
        }, function() {
            $log.log('获取状态信息失败.');
        });
        vm.changeCallback = function(item, model) {
            paramData.states = [];
            _.map(vm.checkedStateList, function(item, index) {
                _.set(paramData, ['states', index, 'code'], item.code);
            });
        };
    }])
    // 查询控制器
    .controller('queryOperateFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'httpMethod', 'paramData', function ($scope, $rootScope, $filter, $log, $timeout, httpMethod, paramData) {
        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数

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
            hallName: '',
            activityStartDate: '',
            activityEndDate:''
        };
        $scope.$watch('queryOperateForm', function(newValue) {
            _.assign(paramData, newValue);
        }, true);
        $scope.queryOperateFormSubmit = function (currentPage) {
            !currentPage && $scope.$broadcast('pageChange');
            var param = {
                activityName: _.get(paramData, 'activityName'),// 活动名称
                hallName: _.get(paramData, 'hallName'),// 厅店
                activityStartDate: _.get(paramData, 'activityStartDate'),// 活动开始时间
                activityEndDate: _.get(paramData, 'activityEndDate'),// 活动结束时间
                areaIds: _.get(paramData, 'areaIds'),
                states: _.get(paramData, 'states'),
                curPage: currentPage || $scope.currentPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            };
            // 发放查询信息
            httpMethod.qryGrantActivity(param).then(function (rsp) {
                $log.log('调用发放查询接口成功.');
                $rootScope.queryOperateResultList = rsp.data.activitys;
                $scope.totalNum = rsp.data.total;
            }, function () {
                $log.log('调用发放查询接口失败.');
            });
        };

        $scope.$on('requery', function () {
            $scope.queryOperateFormSubmit();
        });
        $rootScope.$watch('isRefresh', function (current) {
            if (current) {
                $scope.queryOperateFormSubmit();
                $rootScope.isRefresh = false;
            }
        });
    }])
    // 查询结果控制器
    .controller('queryOperateResultCtrl', ['$scope', '$rootScope', '$log', 'paramData', 'httpConfig', 'httpMethod', function ($scope, $rootScope, $log, paramData, httpConfig, httpMethod) {
        // 修改
        // $scope.editQueryOperate = function (index) {
        //     $rootScope.modifiedQueryOperate = $rootScope.queryOperateResultList[index];
        //     parent.angular.element(parent.$('#tabs')).scope().addTab('修改权限规格', '/psm/page/modifyOperate/modifyOperate.html', 'modifyOperate', JSON.stringify($rootScope.modifiedQueryOperate));
        // };

        // 详情
        $scope.infoDistribution = function (activitiId) {
            $rootScope.activitiId = activitiId;
            // parent.angular.element(parent.$('#tabs')).scope().addTab('发放详情', '/psm/page/distributionDetail/distributionDetail.html', 'activitiId', JSON.stringify($rootScope.activitiId));
        };

        // 暂停/结束
        $scope.updateDistributionStatus = function(status, activityId) {
            var statusTitle = status,
            param = {
                activityId: activityId,
                state:'',
            };
            // 修改发放状态信息
            httpMethod.changeStatus(param).then(function (rsp) {
                $log.log('调用修改发放状态接口成功.');
            }, function () {
                $log.log('调用修改发放状态接口失败.');
            });
            switch (status) {
                case '暂停':
                    statusTitle = '暂停';
                    param.state = '2';
                    break;
                case '结束':
                    statusTitle = '结束';
                    param.state = '3';
                    break;
            }
            swal({
                title: '代金券发放' + statusTitle + '操作',
                text: '确定把编码 ' + activityId + ' 代金券发放' + statusTitle + '吗?',
                type: 'info',
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: '确定',
                confirmButtonColor: '#ffaa00',
                cancelButtonText: '取消',
                showLoaderOnConfirm: true
            }, function() {
                httpMethod.changeStatus(param).then(function(rsp) {
                    $log.log('调用代金券发放暂停/结束接口成功.');
                    if (rsp.success) {
                        swal({
                            title: '操作成功',
                            text: statusTitle + '代金券发放成功!',
                            type: 'success',
                            confirmButtonText: '确定',
                            confirmButtonColor: '#ffaa00'
                        }, function() {
                            $scope.$emit('requery');
                        });
                    } else {
                        swal('OMG', rsp.msg || statusTitle + '代金券发放失败!', 'error');
                    }
                }, function() {
                    swal('OMG', rsp.msg || statusTitle + '代金券发放失败!', 'error');
                });
            });
        };

        // 代金券发放列表导出
        $scope.exportDistribution = function() {
            var param = {
                activityName: _.get(paramData, 'activityName'),
                hallName: _.get(paramData, 'hallName'),
                activityStartDate: _.get(paramData, 'activityStartDate'),
                activityEndDate: _.get(paramData, 'activityEndDate'),
                areaIds: _.get(paramData, 'areaIds'),
                states: _.get(paramData, 'states')
            };

            window.open(httpConfig.siteUrl + '/activity/exportGiveoutActivity?param=' + JSON.stringify(param));
        }

    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function ($scope, $rootScope, $log) {
        $scope.$on('pageChange', function () {
            $scope.currentPage = 1;
        });
        $scope.maxSize = 10;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function () {
            $scope.queryOperateFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])


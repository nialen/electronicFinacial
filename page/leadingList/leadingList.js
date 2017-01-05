/**
 * Auth 丁少华
 * Date 2017-1-4
 */
angular
    .module('leadingListModule', ['ui.bootstrap', 'ui.select'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.areaList = []; // 地区列表
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

        //厅店查询
        httpMethod.qryHall = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/pub/qryHall',
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
            // 活动状态
            Mock.mock(httpConfig.siteUrl + '/activity/queryStateDict', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    "states|3": [{
                        "code|+1": ["1", "2", "3"], //状态编码：1正常、2暂停、3结束
                        "name|+1": ["正常", "暂停", "结束"] //状态名称
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

            //厅店查询
            Mock.mock(httpConfig.siteUrl + '/pub/qryHall', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'halls|5': [{
                        'hallId': '@id', //厅店ID
                        'hallCode': '@id', //厅店Code
                        'hallName': '@cword(5)', //厅店名称
                        'orgName': '@cword(8)' //归属分支局
                    }],
                    'total|1-100': 10 //总条数
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
        }
        return httpMethod;
    }])
    .controller('selectMultipleCtrl', ['$log', 'httpMethod', function($log, httpMethod) {
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

        };
    }])
    // 状态多选
    .controller('selectStateCtrl', ['$log', 'httpMethod', function($log, httpMethod) {
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

        };
    }])
    // 查询控制器
    .controller('queryOperateFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$uibModal', '$timeout', 'httpMethod', function($scope, $rootScope, $filter, $log, $uibModal, $timeout, httpMethod) {
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
        });
        $scope.$watch('createEndDt', function(newValue) {
            $scope.startDateOptions.maxDate = newValue;
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

        $scope.hall = {};
        $scope.resource = {};

        //查询
        $scope.queryOperateFormSubmit = function(currentPage) {

        };

        //添加厅店
        $scope.addHall = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'hall-modal-title',
                ariaDescribedBy: 'hall-modal-body',
                templateUrl: 'hallModal.html',
                controller: 'hallModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };

        //添加资源
        $scope.addResources = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'resourcesModal.html',
                controller: 'resourcesModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };
    }])
    .controller('hallModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, items, httpMethod) {
        var $ctrl = this;
        $ctrl.hallName = ''; //厅店名称
        $ctrl.hallId = ''; //厅店ID
        $ctrl.cityId = ''; //地市ID
        $ctrl.districtId = ''; //区县ID
        $ctrl.hallsList = []; //厅店信息列表
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
            if (newValue) {
                var param = {
                    level: '4',
                    parentAreaId: $ctrl.cityId
                };
                httpMethod.qryArea(param).then(function(rsp) {
                    $ctrl.districtList = rsp.data.area;
                    $log.log('获取区/县列表成功.');
                }, function() {
                    $log.log('获取区/县列表失败.');
                });
            };
        });

        //条件查询
        $ctrl.conditionQuery = function() {
            var param = {
                hallName: $ctrl.hallName, //厅店名称
                hallId: $ctrl.hallId, //厅店ID
                cityId: $ctrl.cityId, //地市ID
                districtId: $ctrl.districtId, //区县ID
                pageSize: $ctrl.rowNumPerPage, //每页条数
                curPage: $ctrl.currentPage //当前页
            };
            httpMethod.qryHall(param).then(function(rsp) {
                $ctrl.hallsList = rsp.data.halls;
                $ctrl.totalNum = rsp.data.total;
                $log.log('获取厅店列表成功.');
            }, function() {
                $log.log('获取厅店列表失败.');
            });
        };

        $ctrl.todoChecked = {}; //待确认的选项
        //单选框选择
        $ctrl.check = function(item) {
            $ctrl.todoChecked = item;
        };

        $ctrl.ok = function() {
            if ($ctrl.todoChecked.hallName) {
                items.hallName = $ctrl.todoChecked.hallName;
            }
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('resourcesModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, items, httpMethod) {
        var $ctrl = this;
        $ctrl.keyword = ''; //关键字
        $ctrl.resourceList = []; //资源信息列表
        $ctrl.currentPage = 1; //当前页
        $ctrl.rowNumPerPage = 10; //每页显示行数
        $ctrl.totalNum = 0; //总条数
        $ctrl.maxSize = 4; //最大显示页码数
        //切换页
        $ctrl.pageChanged = function() {
            $ctrl.keywordQuery($ctrl.currentPage);
        };
        //关键字查询
        $ctrl.keywordQuery = function() {
            var param = {
                qryString: $ctrl.keyword, //关键字
                pageSize: $ctrl.rowNumPerPage, //每页条数
                curPage: $ctrl.currentPage //当前页
            };
            httpMethod.qryResource(param).then(function(rsp) {
                $ctrl.resourceList = rsp.data.resources;
                $ctrl.totalNum = rsp.data.total;
                $log.log('获取资源列表成功.');
            }, function() {
                $log.log('获取资源列表失败.');
            });
        };

        $ctrl.todoChecked = {}; //待确认的选项
        //单选框选择
        $ctrl.check = function(item) {
            $ctrl.todoChecked = item;
        };

        $ctrl.ok = function() {
            if ($ctrl.todoChecked.rscName) {
                items.rscName = $ctrl.todoChecked.rscName;
            }
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('detailModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, items, httpMethod) {
        var $ctrl = this;
        //分页
        $scope.currentPage = 1; //当前页
        $scope.rowNumPerPage = 10; //每页显示行数
        $scope.totalNum = 0; //总条数
        $scope.maxSize = 8; //最大显示页码数
        //切换页
        $scope.pageChanged = function() {
            $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
        };

        //导出
        $scope.exportDistribution = function() {
            var param = {};
            window.open(httpConfig.siteUrl + '/activity/exportGiveoutActivity?param=' + JSON.stringify(param));
        }

        $ctrl.ok = function() {
            $uibModalInstance.close();
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    // 查询结果控制器
    .controller('queryOperateResultCtrl', ['$scope', '$rootScope', '$log', '$uibModal', 'httpConfig', 'httpMethod', function($scope, $rootScope, $log, $uibModal, httpConfig, httpMethod) {
        // 详情
        $scope.infoDistribution = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'detail-modal-title',
                ariaDescribedBy: 'detail-modal-body',
                templateUrl: 'detailModal.html',
                controller: 'detailModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };
        // 列表导出
        $scope.exportDistribution = function() {
            var param = {};
            window.open(httpConfig.siteUrl + '/activity/exportGiveoutActivity?param=' + JSON.stringify(param));
        }
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            $scope.queryOperateFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])

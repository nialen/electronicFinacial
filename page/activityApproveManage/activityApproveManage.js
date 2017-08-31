/**
 * Auth heyue
 * Date 2017-03-17
 */
angular
    .module('activityApproveManageModule', ['ui.bootstrap', 'ui.select'])
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
        }
        return httpMethod;
    }])
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
    // 查询控制器
    .controller('queryOperateFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'httpMethod', 'paramData', function ($scope, $rootScope, $filter, $log, $timeout, httpMethod, paramData) {
    
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
        
    }])
    // 查询结果控制器
    .controller('queryOperateResultCtrl', ['$scope', '$rootScope', '$log', 'paramData', 'httpConfig', 'httpMethod', '$uibModal', function ($scope, $rootScope, $log, paramData, httpConfig, httpMethod, $uibModal) {  
        // TODO 全选
        $scope.checkAll = function(chk) {
            if (chk) {
                $scope.isChecked = true;
                // $rootScope.checkedGoods = _.clone($rootScope.queryTypeResultList);
                // _.map($rootScope.checkedGoods, function(item, index) {
                //     item.$$hashKey = null;
                // });
                // $rootScope.checkedGoodsPrice = 0; // 置0
                // _.map($rootScope.checkedGoods, function(item, index) {
                //     $rootScope.checkedGoodsPrice += _.toNumber(item.price);
                // });
            } else {
                $scope.isChecked = false;
                // $rootScope.checkedGoods = [];
                // $rootScope.checkedGoodsPrice = 0; // 置0
            }
        }

        // 单选
        $scope.check = function(val, chk) {
            var valueOfIndex = '';
            // $rootScope.checkedGoods.length && $rootScope.checkedGoods.map(function(item, index) {
            //     if (item.offerId === val.offerId) {
            //         valueOfIndex = index;
            //     }
            // });
            // chk ? valueOfIndex === '' && $rootScope.checkedGoods.push(val) : $rootScope.checkedGoods.splice(valueOfIndex, 1);

            // $rootScope.checkedGoodsPrice = 0; // 置0
            // _.map($rootScope.checkedGoods, function(item, index) {
            //     $rootScope.checkedGoodsPrice += _.toNumber(item.price);
            // });
        };
        // 审批详情
        $scope.activityDetail = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'costSharingModal.html',
                controller: 'costSharingModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };

        // 审批
        $scope.activityApprove = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'approvalModal.html',
                controller: 'approvalModalCtrl',
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
    .controller('costSharingModalCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', 'items', 'httpMethod', 'paramData', function($uibModalInstance, $scope, $rootScope, $log, items, httpMethod, paramData) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('approvalModalCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', 'items', 'httpMethod', 'paramData', function($uibModalInstance, $scope, $rootScope, $log, items, httpMethod, paramData) {
        var $ctrl = this;

        $ctrl.ok = function() {
            

            swal({
                title: '提交成功',
                text: '',
                type: 'info',
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: '确定',
                confirmButtonColor: '#ffaa00',
                cancelButtonText: '取消',
                showLoaderOnConfirm: true
            });

            $uibModalInstance.dismiss('cancel');


        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
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


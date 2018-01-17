/**
 * Auth 
 * Date 2017-12-25
 */
angular
    .module('distributionQueryModule', ['ui.bootstrap', 'ui.select'])
    .run(['$rootScope', function($rootScope) {
    }])
    
    // 查询控制器
    .controller('queryOperateFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', function ($scope, $rootScope, $filter, $log, $timeout) {
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
        
    }])
    // 查询结果控制器
    .controller('queryOperateResultCtrl', ['$scope', '$rootScope', '$log', '$uibModal', function ($scope, $rootScope, $log, $uibModal) {

        //详情
        $scope.recieveBtn = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'noticeToReceive.html',
                controller: 'noticeToReceiveCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };

        //导出
        $scope.exportBtn = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'costSharingModal.html',
                controller: 'costSharingModalCtrl',
                controllerAs: '$ctrl',
                size: 'sm',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };
    }])
    .controller('noticeToReceiveCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', 'items', function($uibModalInstance, $scope, $rootScope, $log, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('costSharingModalCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', 'items', function($uibModalInstance, $scope, $rootScope, $log, items) {
        var $ctrl = this;

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


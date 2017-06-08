angular
    .module('marketingCostSetupModule', ['ui.bootstrap', 'toggle-switch'])
    .controller('queryCtrl', ['$scope', '$log', '$timeout', '$uibModal', function($scope, $log, $timeout, $uibModal) {
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

        // 设置
        $scope.activityCostSetup = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'setupActivityCostModal.html',
                controller: 'setupActivityCostModalCtrl',
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
    // 查询结果控制器
    .controller('marketingCostResultCtrl', ['$scope', '$rootScope', '$log', '$uibModal', function ($scope, $rootScope, $log, $uibModal) {
        //添加
        $scope.addTel = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'addTelModal.html',
                controller: 'addTelModalCtrl',
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
    .controller('addTelModalCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', 'items', function($uibModalInstance, $scope, $rootScope, $log, items) {
        var $ctrl = this;

        $ctrl.ok = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    .controller('setupActivityCostModalCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', 'items', function($uibModalInstance, $scope, $rootScope, $log, items) {
        var $ctrl = this;

        $ctrl.itemone = true;
        $ctrl.itemtwo = true;
        $ctrl.itemthree = true;

        $ctrl.toggleone = function(item){
            $ctrl.itemone = !item;           
        };
        $ctrl.toggletwo = function(item){
            $ctrl.itemtwo = !item;          
        };
        $ctrl.togglethree = function(item){
            $ctrl.itemthree = !item;          
        };

        $ctrl.ok = function() {
            // swal({
            //     title: '提交成功',
            //     text: '',
            //     type: 'info',
            //     showCancelButton: true,
            //     closeOnConfirm: false,
            //     confirmButtonText: '确定',
            //     confirmButtonColor: '#ffaa00',
            //     cancelButtonText: '取消',
            //     showLoaderOnConfirm: true
            // });
            $uibModalInstance.dismiss('cancel');
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$log', function($scope, $log) {
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])

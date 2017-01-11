angular
    .module('resourceManagementListModule', ['ui.bootstrap'])
    .controller('queryCtrl', ['$scope', '$log', function($scope, $log) {
        $scope.isShow = false;
        $scope.toggleShow = function() {
            $scope.isShow = !$scope.isShow;
        }
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

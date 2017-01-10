angular
    .module('resourceTemplateListModule', ['ui.bootstrap'])
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

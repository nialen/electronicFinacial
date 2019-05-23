/**
 * Auth 丁少华
 * Date 2017-3-9
 */

define(["angular", "jquery", "httpConfig", "sweetalert", "lodash", "mock", "angular-sortable-view", "ui-bootstrap-tpls", "angular-animate", "angular-locale_zh-cn"], function(
  angular,
  $,
  httpConfig,
  swal,
  _,
  Mock
) {
  angular
    .module("resourceStarAndNetworkAgeRelationAllocationModule", ["ui.bootstrap", "angular-sortable-view", "ngAnimate"])
    .run([
      "$rootScope",
      function($rootScope) {
        $rootScope.stepNum = 0; //当前显示的step索引值（Number类型
      }
    ])
    .controller("resourceStarAndNetworkAgeRelationAllocationCtrl", [
      "$scope",
      "$rootScope",
      "$log",
      function($scope, $rootScope, $log) {
        $scope.data = {
          items2: ["1", "2", "3"],
          items3: ["11", "21", "31"]
        };
      }
    ]);
});

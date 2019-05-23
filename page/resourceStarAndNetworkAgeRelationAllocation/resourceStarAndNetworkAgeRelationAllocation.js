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
        $scope.checkArr = [
          {
            level: "1星",
            age: "1年"
          }
        ];
        $scope.optionArr = [
          {
            level: "2-4星",
            age: "2-4年"
          },
          {
            level: "5-6星",
            age: "5-6年"
          },
          {
            level: "7星",
            age: "10年以上"
          }
        ];
      }
    ]);
});

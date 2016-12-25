/**
 * Auth 丁少华
 * Date 2016-09-07
 */
angular
    .module('distributionAllocationModule', ['ui.bootstrap', 'ui.select'])
    .run(['$rootScope', function($rootScope) {
        $rootScope.stepNum = 0; // 当前显示的step索引值（Number类型）
        $rootScope.goBack = function(num) { // 返回（num-1）
            $rootScope.stepNum = num - 1;
        };
        $rootScope.forward = function(num) { // 返回（num+1）
            $rootScope.stepNum = num + 1;
        };

        $rootScope.checkedAreaList = [{
            name: 'xx778'
        }]; //已选择地区
    }])
    // 活动确认保存入参
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
            'isMock': true // 是否开启测试数据
        };
        var httpMethod = {};
        // 获取地区列表
        httpMethod.qryCommonRegion = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/common/qryCommonRegion',
                method: 'POST',
                headers: httpConfig.requestHeader,
                data: 'param=' + JSON.stringify(param)
            }).success(function(data, header, config, status) {
                if (status != 200) {
                    // 跳转403页面
                }
                defer.resolve(data);
            }).error(function(data, status, headers, config) {
                defer.reject(data);
            });
            return defer.promise;
        };

        if (httpConfig.isMock) {
            // 地区查询
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
        }

        return httpMethod;
    }])
    .controller('firstStepCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $filter, $log, $timeout, paramData) {
        $scope.activityInformation = {
            'activityName': '', //活动名称
            'activityCode': '', //活动编码
            'activityType': '', //活动类型
            'activityDesc': '' //活动描述
        };

        $scope.$watch('activityInformation', function(newValue) {
            _.assign(paramData, newValue);
            $log.log(paramData, 'paramData');
        }, true);

        // 时间控件
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
    .controller('selectMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.areaList = []; //所有地区列表
        var param = {
            'level': '3'
        };
        httpMethod.qryCommonRegion(param).then(function(rsp) {
            $scope.areaList = rsp.data.area;
            $log.log('获取地区列表成功.');
        }, function() {
            $log.log('获取地区列表失败.');
        });
    }])
    .controller('lastStepCtrl', ['$scope', '$rootScope', '$log', 'paramData', function($scope, $rootScope, $log, paramData) {

    }])
    .controller('stepCtrl', ['$scope', '$rootScope', '$log', 'paramData', function($scope, $rootScope, $log, paramData) {
        $scope.giveoutActivityCommit = function() {
            $log.log($rootScope.checkedAreaList, 'checkedAreaList');
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
            $scope.queryStaffFormSubmit($scope.currentPage);
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])

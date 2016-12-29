/**
 * Auth nieyalan
 * Date 2016-12-27
 */
angular
    .module('distributionDetailModule', ['ui.bootstrap', 'ui.select'])
    .run(['$rootScope', '$parse', '$log', function ($rootScope, $parse, $log) {
        var id = window.frameElement && window.frameElement.id || '',
            obj = parent.$('#' + id).attr('data');
        $rootScope.activitiId = obj ? JSON.parse(obj) : ''; 
    }])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
            'siteUrl': 'http://192.168.16.84:8088',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'isMock': true //是否开启测试数据
        };
        var httpMethod = {};

        //代金券发放基本配置
        httpMethod.qryBaseInfo = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/qryBaseInfo',
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

        //厅店资源明细查询
        httpMethod.qryGrantDetailInfo = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/qryGrantDetailInfo',
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

        //发放活动厅店资源明细导出
        httpMethod.exportBaseInfo = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/exportBaseInfo',
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

        // 修改厅店资源发放状态
        httpMethod.changeGrantState = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/changeGrantState',
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
        	// 发放基本配置
            Mock.mock(httpConfig.siteUrl + '/activity/qryBaseInfo', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'activityBaseInfo': {
                        'activitiId': '@id',//活动ID
                        'activitiIdCode': '@id',//活动编码
                        'activityType':'@cword(6)',
                        'activitiIdName': '@cword(6)',//活动名称
                        'areasId': [{//活动地区ID列表
                            'areaId': '@id',//地区ID
                            'name': '@city'//地区名称
                        }],
                        'activityStartDate': '@date',//活动开始时间
                        'activityEndDate': '@date',//活动结束时间
                        'stateCode|+1': ['1','2','3'],//状态编码：1正常、2暂停、3结束
                        'stateName|+1': ['正常','暂停','结束']
                    }
                },
                'errors': null
            });
            //厅店资源明细查询
            Mock.mock(httpConfig.siteUrl + '/activity/qryGrantDetailInfo', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    "resourceDetails|10": [{//发放明细
				  		"grantId": "@id",//发放ID
		                "rscId": "@id",//资源ID
		                "rscCode": "@id",//资源编码
		                "rscName": "@cword(5)",//资源名称
		                "hallId": "@id",//厅店ID
		                "hallCode": "@id",//厅店编码
		                "hallName": "@cword(5)",//厅店名称
		                "grantNum|1-100": 10,//发放数量
						"receivedNum|1-100": 5,//已领取数量
                		"receiveUrl": "@url",//领取地址 
                		"state|+1":["1","2"]
                    }],
                    "total|1-100":10//总条数
                },
                'errors': null
            });
            //修改厅店资源发放状态
            Mock.mock(httpConfig.siteUrl + '/activity/changeGrantState', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'errors': null
            });
        }
        return httpMethod;
    }])
	// 控制器
    .controller('detailOperateFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
        var param = {
            activitiId: _.get($rootScope, 'activitiId')
        };
        // 调用代金券发放基本配置
        httpMethod.qryBaseInfo(param).then(function (rsp) {
        	$scope.detailOperateForm = rsp.data.activityBaseInfo
            $log.log('调用代金券发放基本配置接口成功.');
        }, function () {
            $log.log('调用代金券发放基本配置接口成功.');
        });
    }])
    // 厅店资源明细查询
    .controller('preveligeDimensionFormCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function ($scope, $rootScope, $log, httpMethod) {
        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数
        $scope.$on('pageChange', function () {
            $scope.currentPage = 1;
        });
        var param = {
        	activityId:_.get($rootScope, 'activitiId'),
        	curPage: $scope.currentPage, // 当前页
            pageSize: $scope.rowNumPerPage // 每页展示行数
        };
        // 厅店资源明细查询
        httpMethod.qryGrantDetailInfo(param).then(function (rsp) {
            $log.log('调用厅店资源明细查询接口成功.');
            $rootScope.preveligeDimensionResultList = rsp.data.resourceDetails;
            $scope.totalNum = rsp.data.total;
        }, function () {
            $log.log('调用厅店资源明细查询接口失败.');
        });
             
        // 停用/启用
        $scope.updateStoreStatus = function(status, grantId) {
            var statusTitle = status,
            param = {
                grantId: grantId,
                state:'',
            };
            // 修改发放状态信息
            httpMethod.changeGrantState(param).then(function (rsp) {
                $log.log('调用修改厅店资源发放状态接口成功.');
            }, function () {
                $log.log('调用修改厅店资源发放状态接口失败.');
            });
            switch (status) {
                case '启用':
                    statusTitle = '启用';
                    param.state = '1';
                    break;
                case '停用':
                    statusTitle = '停用';
                    param.state = '2';
                    break;
            }
            swal({
                title: '厅店资源发放' + statusTitle + '操作',
                text: '确定把发放ID ' + grantId + ' 厅店资源发放' + statusTitle + '吗?',
                type: 'info',
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: '确定',
                confirmButtonColor: '#ffaa00',
                cancelButtonText: '取消',
                showLoaderOnConfirm: true
            }, function() {
                httpMethod.changeGrantState(param).then(function(rsp) {
                    $log.log('调用厅店资源发放启用/停用接口成功.');
                    if (rsp.success) {
                        swal({
                            title: '操作成功',
                            text: statusTitle + '厅店资源发放成功!',
                            type: 'success',
                            confirmButtonText: '确定',
                            confirmButtonColor: '#ffaa00'
                        }, function() {
                            $scope.$emit('requery');
                        });
                    } else {
                        swal('OMG', rsp.msg || statusTitle + '厅店资源发放失败!', 'error');
                    }
                }, function() {
                    swal('OMG', rsp.msg || statusTitle + '厅店资源发放失败!', 'error');
                });
            }); 
        };
        // 发放活动厅店资源明细导出
        $scope.exportDistribution = function() {
            var param = {
                activityId:_.get($rootScope, 'activitiId'),
            };
            // 发放活动厅店资源明细导出
            httpMethod.exportBaseInfo(param).then(function () {
                $log.log('调用发放活动厅店资源明细导出接口成功.');
            }, function () {
                $log.log('调用发放活动厅店资源明细导出接口失败.');
            });
        }
    }])
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod',function ($scope, $rootScope, $log, httpMethod) {
        $scope.maxSize = 10;
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function (currentPage) {
        	!currentPage && $scope.$broadcast('pageChange');
        	var param = {
	        	activityId:_.get($rootScope, 'activitiId'),
	        	curPage: currentPage, // 当前页
	            pageSize: $scope.rowNumPerPage // 每页展示行数
	        };
            httpMethod.qryGrantDetailInfo(param).then(function (rsp) {
	            $log.log('调用厅店资源明细查询接口成功.');
	            $rootScope.preveligeDimensionResultList = rsp.data.resourceDetails;
	            $scope.totalNum = rsp.data.total;
	        }, function () {
	            $log.log('调用厅店资源明细查询接口失败.');
	        });
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])

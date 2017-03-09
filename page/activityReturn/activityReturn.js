/**
 * Auth kiwind
 * Date 2017-03-08
 */
angular
    .module('activityReturnModule', ['ui.bootstrap', 'ui.select'])
    .factory('httpMethod', ['$http', '$q', function($http, $q) {
        var httpConfig = {
            'siteUrl': 'http://192.168.16.84:8088',
            'requestHeader': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'isMock': true //是否开启测试数据
        };
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

            // 发放基本配置
            Mock.mock(httpConfig.siteUrl + '/activity/qryBaseInfo', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'activityBaseInfo': {
                        'activitiId': '@id', //活动ID
                        'activitiIdCode': '@id', //活动编码
                        'activityType': '@cword(6)',
                        'activitiIdName': '@cword(6)', //活动名称
                        'areasId': [{ //活动地区ID列表
                            'areaId': '@id', //地区ID
                            'name': '@city' //地区名称
                        }],
                        'activityStartDate': '@date', //活动开始时间
                        'activityEndDate': '@date', //活动结束时间
                        'stateCode|+1': ['1', '2', '3'], //状态编码：1正常、2暂停、3结束
                        'stateName|+1': ['正常', '暂停', '结束']
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
                    "resourceDetails|10": [{ //发放明细
                        "grantId": "@id", //发放ID
                        "rscId": "@id", //资源ID
                        "rscCode": "@id", //资源编码
                        "rscName": "@cword(5)", //资源名称
                        "hallId": "@id", //厅店ID
                        "hallCode": "@id", //厅店编码
                        "hallName": "@cword(5)", //厅店名称
                        "grantNum|1-100": 10, //发放数量
                        "receivedNum|1-100": 5, //已领取数量
                        "receiveUrl": "@url", //领取地址
                        "state|+1": ["1", "2"]
                    }],
                    "total|1-100": 10 //总条数
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

    //总控制器
    .controller('pageCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.isShow1 = $scope.isShow2 = $scope.isShow3 = $scope.isShow4 = $scope.isShow5 = true;
    }])
    //活动信息
    .controller('ActivityInfoCtrl', ['$scope', '$rootScope', '$timeout', '$log', '$uibModal', 'httpMethod', function($scope, $rootScope, $timeout, $log, $uibModal, httpMethod) {
        $scope.activityReduceForm = {
            createStartDt: '', //制单日期开始
            createEndDt: '' //制单日期结束
        };
        // 时间控件
        $scope.startDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.activityReduceForm.createEndDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.endDateOptions = {
            formatYear: 'yy',
            minDate: $scope.activityReduceForm.createStartDt,
            // maxDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('activityReduceForm.createStartDt', function(newValue) {
            $scope.endDateOptions.minDate = newValue;
        });
        $scope.$watch('activityReduceForm.createEndDt', function(newValue) {
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
            /*paramData.areasId = [];
            _.map(vm.checkedAreaList, function(item, index) {
                _.set(paramData, ['areasId', index, 'areaId'], item.areaId);
                _.set(paramData, ['areasId', index, 'areaname'], item.name);
            });*/
        };
    }])
    .controller('selectMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
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
            /*paramData.areasId = [];
            _.map(vm.checkedAreaList, function(item, index) {
                _.set(paramData, ['areasId', index, 'areaId'], item.areaId);
                _.set(paramData, ['areasId', index, 'areaname'], item.name);
            });*/
        };

        /*$scope.$watch('$ctrl.checkedAreaList', function(newValue) {
            var parent = $scope.$parent;
            parent.isNotAllowObj.isNotAllow4 = true;
            if (_.size(newValue)) {
                parent.isNotAllowObj.isNotAllow4 = false;
            }
        }, true);*/
    }])
    //成本配置
    .controller('costSharingCtrl', ['$scope', '$rootScope', '$log', '$uibModal', 'httpMethod', function($scope, $rootScope, $log, $uibModal, httpMethod) {
        $scope.costSharingList = [];
        $scope.costSharing = function(item) {
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
                        return $scope.costSharingList;
                    }
                }
            });
        };
    }])
    .controller('costSharingModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', function($uibModalInstance, $scope, $log, items) {
        var $ctrl = this;
        $ctrl.items = items;
        $ctrl.currentPage = 1; //当前页
        $ctrl.rowNumPerPage = 10; //每页显示行数
        $ctrl.totalNum = 0; //总条数
        $ctrl.maxSize = 4; //最大显示页码数

        $scope.addLine = function(){
            $ctrl.items.push({});
        }

        $scope.delLine = function(index){
            $ctrl.items.splice(index, 1);
        }

        $ctrl.ok = function() {
            $uibModalInstance.close();
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    //商户信息
    .controller('merchantInfoCtrl', ['$scope', '$rootScope', '$log', '$uibModal', 'httpMethod', function($scope, $rootScope, $log, $uibModal, httpMethod) {
        $scope.merchantList = [];
        $scope.merchantEdit = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'merchantModal.html',
                controller: 'merchantModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return $scope.merchantList;
                    }
                }
            });
        };
    }])
    .controller('merchantModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', function($uibModalInstance, $scope, $log, items) {
        var $ctrl = this;
        $ctrl.items = items;
        $ctrl.currentPage = 1; //当前页
        $ctrl.rowNumPerPage = 10; //每页显示行数
        $ctrl.totalNum = 0; //总条数
        $ctrl.maxSize = 4; //最大显示页码数

        $scope.addLine = function(){
            $ctrl.items.push({});
        }

        $scope.delLine = function(index){
            $ctrl.items.splice(index, 1);
        }

        $ctrl.ok = function() {
            $uibModalInstance.close();
        };

        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    // 厅店资源明细查询
    .controller('preveligeDimensionFormCtrl', ['$scope', '$rootScope', '$log', '$uibModal', 'httpMethod', function($scope, $rootScope, $log, $uibModal, httpMethod) {
        //分页
        $scope.requirePaging = true; // 是否需要分页
        $scope.currentPage = 1; // 当前页
        $scope.rowNumPerPage = 10; // 每页显示行数
        $scope.totalNum = 0; // 总条数
        $scope.$on('pageChange', function() {
            $scope.currentPage = 1;
        });
        var param = {
            activityId: _.get($rootScope, 'activitiId'),
            curPage: $scope.currentPage, // 当前页
            pageSize: $scope.rowNumPerPage // 每页展示行数
        };
        // 厅店资源明细查询
        httpMethod.qryGrantDetailInfo(param).then(function(rsp) {
            $log.log('调用厅店资源明细查询接口成功.');
            $rootScope.preveligeDimensionResultList = rsp.data.resourceDetails;
            $scope.totalNum = rsp.data.total;
        }, function() {
            $log.log('调用厅店资源明细查询接口失败.');
        });

        // 停用/启用
        $scope.updateStoreStatus = function(status, obj) {
            var statusTitle = status,
            param = {
                grantId: obj.grantId,
                state:'',
            };
            // 修改发放状态信息
            httpMethod.changeGrantState(param).then(function(rsp) {
                $log.log('调用修改厅店资源发放状态接口成功.');
            }, function() {
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
                text: '确定把发放ID ' + obj.grantId + ' 厅店资源发放' + statusTitle + '吗?',
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
                            obj.state=param.state;
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
                activityId: _.get($rootScope, 'activitiId')
            };
            // 发放活动厅店资源明细导出
            httpMethod.exportBaseInfo(param).then(function() {
                $log.log('调用发放活动厅店资源明细导出接口成功.');
            }, function() {
                $log.log('调用发放活动厅店资源明细导出接口失败.');
            });
        }

        //领取地址
        $scope.getUrl = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'resourcesModal.html',
                controller: 'resourcesModalCtrl',
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
    // 分页控制器
    .controller('paginationCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
        $scope.maxSize = 10;
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function(currentPage) {
            !currentPage && $scope.$emit('pageChange');
            var param = {
                activityId: _.get($rootScope, 'activitiId'),
                curPage: currentPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            };
            httpMethod.qryGrantDetailInfo(param).then(function(rsp) {
                $log.log('调用厅店资源明细查询接口成功.');
                $rootScope.preveligeDimensionResultList = rsp.data.resourceDetails;
                $scope.totalNum = rsp.data.total;
            }, function() {
                $log.log('调用厅店资源明细查询接口失败.');
            });
            $log.log('Page changed to: ' + $scope.currentPage);
        };
    }])

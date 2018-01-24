/**
 * Auth heyue
 * Date 2017-03-17
 */
angular
    .module('distributionQueryModule', ['ui.bootstrap', 'ui.select'])
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

        //活动状态
        httpMethod.queryStateDict = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/queryStateDict',
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

        // 修改活动状态
        httpMethod.changeStatus = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/changeStatus',
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

        //代金券发放查询
        httpMethod.qryGrantActivity = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/activity/qryGrantActivity',
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

        // 查询属性离散值
        httpMethod.qryAttrValueByAttrIds = function(param) {
            var defer = $q.defer();
            $http({
                url: httpConfig.siteUrl + '/pub/qryAttrValueByAttrIds',
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
            // 活动状态
            Mock.mock(httpConfig.siteUrl + '/activity/queryStateDict', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    "states|3": [{
                        "code|+1": [1, 2, 3],//状态编码：1正常、2暂停、3结束
                        "name|+1": ["正常","暂停","结束"]//状态名称
                    }]
                },
                'errors': null
            });
            // 修改活动状态
            Mock.mock(httpConfig.siteUrl + '/activity/changeStatus', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'errors': null
            });
            //代金券查询
            Mock.mock(httpConfig.siteUrl + '/activity/qryGrantActivity', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'activitys|10': [{
                        'activitiId': '@id',//活动ID
                        'activitiCode':'@id',
                        'activitiIdName': '@cword(10)',//活动名称
                        'areaIds|2': [{//活动地区ID列表
                            'areaId': '@id',//地区ID
                            'name': '@city'//地区名称
                        }],
                        'activityStartDate': '@date',//活动开始时间
                        'activityEndDate': '@date',//活动结束时间
                        'stateCode|+1': [1, 2, 3]//状态编码：1正常、2暂停、3结束
                    }],
                    'total|1-100':10//总条数
                },
                'errors': null
            });

            //查询属性离散值
            Mock.mock(httpConfig.siteUrl + '/pub/qryAttrValueByAttrIds', {
                'rsphead': 's',
                'success': true, //是否成功
                'code': null,
                'msg': null, //失败信息
                'data': {
                    'attributeList|16': [{
                        'attrId|+1': ['a', 'b', '120001', '120002', '110003', 'c', '110011', '110012', '110006', '110007', '120003', '110009', '110008', '110001', '120015', '120016'], //属性ID
                        'attrCode': '', //属性编码
                        'name|+1': ['立减活动范围', '立减周期', '用户等级', '交易渠道', '活动类型', '立减物品类型', '是否为首单活动', '首单渠道', '用户立减纬度', '用户类型', '外部交易类型', '活动所属事业部', '名单管理', '立减对象（电信／非电信）', '用户限额纬度', '立减方式'], //属性名称
                        'description': '', //属性描述
                        'dsTypeCd': '', //数据源类型
                        'dsTypeName': '', //数据源名称
                        'dataTypeCd': '', //数据类型
                        'dataTypeName': '', //数据类型名称
                        'attrSpecTypeCd': '', //属性规格类型
                        'attrSpecTypeName': '', //属性规格名称
                        'defaultValue': '', //缺省值
                        'AttributeValueList|3': [{
                            // 'attrValueId|1': [1,2,3], //属性离散值ID
                            'attrValueId': '@id', //属性离散值ID
                            'attrValueCode': '@cword(4)', //属性离散值编码（这个用于option的页面展现）
                            // 'attrValueCode|1': [1,2,3], //属性离散值编码（这个用于option的页面展现）
                            'attrValueName': '', //属性离散值名称
                            'attrValueDesc': '', //属性离散值描述
                            'attrId': '', //属性ID(查询条件)
                            'upDate': '', //更新时间
                            'createDate': '' //创建时间
                        }]
                    }]
                },
                'errors': null
            });
        }
        return httpMethod;
    }])

    // 状态码转换文本
    .filter('stateName', function () {
        return function (stateValue) {
            switch (stateValue) {
                case 1:
                    return '正常';
                    break;
                case 2:
                    return '暂停';
                    break;
                case 3:
                    return '结束';
                    break;
            }
        }
    })
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
    // 选择活动类型
    .controller('activitytypeListCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', 'paramData', function($scope, $rootScope, $log, httpMethod, paramData) {

        var param = {
            attrIdList: ['110003']
        };
        httpMethod.qryAttrValueByAttrIds(param).then(function(rsp) {

            var attributeList = rsp.data.attributeList;
            $scope.activitytypeList = []; //活动类型 110003;

            _.map(attributeList, function(item, index) {
                switch (item.attrId) {
                    case '110003':
                        $scope.activitytypeList = item.AttributeValueList;
                        break;
                }
            });
            $log.log('获取属性离散值列表成功.');
        }, function() {
            $log.log('获取属性离散值列表失败.');
        });

        var vm = this;
        vm.checkedList = [];
        vm.changeCallback = function(item, model) {
            var arr = [];
            _.map(vm.checkedList, function(item, index) {
                arr.push(item.attrValueId);
            });
            var activityAttr = _.get(paramData, 'activityInfo.activityAttr');
            var index = _.findIndex(activityAttr, function(item) {
                return item.attrId === '110003';
            });
            _.set(activityAttr, [index, 'attrValue'], arr.join(','));
        };
    }])
    // 状态多选
    .controller('selectStateCtrl', ['$log', 'httpMethod', 'paramData', function($log, httpMethod, paramData) {
        var vm = this;
        vm.checkedStateList = [];
        vm.stateList = []; //所有状态列表

        httpMethod.queryStateDict().then(function(rsp) {
            vm.stateList = rsp.data.states;
            $log.log('获取状态信息成功.');
        }, function() {
            $log.log('获取状态信息失败.');
        });
        vm.changeCallback = function(item, model) {
            paramData.states = [];
            _.map(vm.checkedStateList, function(item, index) {
                _.set(paramData, ['states', index, 'code'], item.code);
            });
        };
    }])
    // 活动开展城市
    .controller('cityCtrl', ['$log', 'httpMethod', 'paramData', function($log, httpMethod, paramData) {
        var vm = this;

        vm.checkedStateList = [];
        vm.stateList = [{
            areaName: '南京'
        },{
            areaName: '合肥'
        },{
            areaName: '杭州'
        }];

        vm.changeCallback = function(item, model) {
            paramData.states = [];
            _.map(vm.checkedStateList, function(item, index) {
                _.set(paramData, ['states', index, 'code'], item.code);
            });
        };
    }])
    // 查询控制器
    .controller('queryOperateFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', 'httpMethod', 'paramData', function ($scope, $rootScope, $filter, $log, $timeout, httpMethod, paramData) {
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
        $scope.queryOperateForm = {
            activityName: '',
            hallName: '',
            activityStartDate: '',
            activityEndDate:''
        };
        $scope.$watch('queryOperateForm', function(newValue) {
            _.assign(paramData, newValue);
        }, true);
        $scope.queryOperateFormSubmit = function (currentPage) {
            !currentPage && $scope.$broadcast('pageChange');
            var param = {
                activityName: _.get(paramData, 'activityName'),// 活动名称
                hallName: _.get(paramData, 'hallName'),// 厅店
                activityStartDate: _.get(paramData, 'activityStartDate'),// 活动开始时间
                activityEndDate: _.get(paramData, 'activityEndDate'),// 活动结束时间
                areaIds: _.get(paramData, 'areaIds'),
                states: _.get(paramData, 'states'),
                curPage: currentPage || $scope.currentPage, // 当前页
                pageSize: $scope.rowNumPerPage // 每页展示行数
            };
            // 发放查询信息
            httpMethod.qryGrantActivity(param).then(function (rsp) {
                $log.log('调用发放查询接口成功.');
                $rootScope.queryOperateResultList = rsp.data.activitys;
                $scope.totalNum = rsp.data.total;
            }, function () {
                $log.log('调用发放查询接口失败.');
            });
        };

        $scope.$on('requery', function () {
            $scope.queryOperateFormSubmit();
        });
        $rootScope.$watch('isRefresh', function (current) {
            if (current) {
                $scope.queryOperateFormSubmit();
                $rootScope.isRefresh = false;
            }
        });
    }])
    // 查询结果控制器
    .controller('queryOperateResultCtrl', ['$scope', '$rootScope', '$log', 'paramData', 'httpConfig', 'httpMethod', '$uibModal', function ($scope, $rootScope, $log, paramData, httpConfig, httpMethod, $uibModal) {
        // 修改
        // $scope.editQueryOperate = function (index) {
        //     $rootScope.modifiedQueryOperate = $rootScope.queryOperateResultList[index];
        //     parent.angular.element(parent.$('#tabs')).scope().addTab('修改权限规格', '/psm/page/modifyOperate/modifyOperate.html', 'modifyOperate', JSON.stringify($rootScope.modifiedQueryOperate));
        // };

        // 活动发布
        $scope.activityDetail = function(item) {
            var modalInstance = $uibModal.open({
                animation: 'true',
                ariaLabelledBy: 'resources-modal-title',
                ariaDescribedBy: 'resources-modal-body',
                templateUrl: 'businessModal.html',
                controller: 'businessModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    items: function() {
                        return item;
                    }
                }
            });
        };

        // 详情
        $scope.infoDistribution = function (activitiId) {
            $rootScope.activitiId = activitiId;
            // parent.angular.element(parent.$('#tabs')).scope().addTab('发放详情', '/psm/page/distributionDetail/distributionDetail.html', 'activitiId', JSON.stringify($rootScope.activitiId));
        };

        // 暂停/结束
        $scope.updateDistributionStatus = function(status, activityId) {
            var statusTitle = status,
            param = {
                activityId: activityId,
                state:'',
            };
            // 修改发放状态信息
            // httpMethod.changeStatus(param).then(function (rsp) {
            //     $log.log('调用修改发放状态接口成功.');
            // }, function () {
            //     $log.log('调用修改发放状态接口失败.');
            // });
            switch (status) {
                case '暂停':
                    statusTitle = '暂停';
                    param.state = '2';
                    break;
                case '结束':
                    statusTitle = '结束';
                    param.state = '3';
                    break;
            }
            swal({
                title: '代金券发放' + statusTitle + '操作',
                text: '确定把编码 ' + activityId + ' 代金券发放' + statusTitle + '吗?',
                type: 'info',
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: '确定',
                confirmButtonColor: '#ffaa00',
                cancelButtonText: '取消',
                showLoaderOnConfirm: true
            }, function() {
                httpMethod.changeStatus(param).then(function(rsp) {
                    $log.log('调用代金券发放暂停/结束接口成功.');
                    if (rsp.success) {
                        swal({
                            title: '操作成功',
                            text: statusTitle + '代金券发放成功!',
                            type: 'success',
                            confirmButtonText: '确定',
                            confirmButtonColor: '#ffaa00'
                        }, function() {
                            $scope.$emit('requery');
                        });
                    } else {
                        swal('OMG', rsp.msg || statusTitle + '代金券发放失败!', 'error');
                    }
                }, function() {
                    swal('OMG', rsp.msg || statusTitle + '代金券发放失败!', 'error');
                });
            });
        };

        // 代金券发放列表导出
        $scope.exportDistribution = function() {
            var param = {
                activityName: _.get(paramData, 'activityName'),
                hallName: _.get(paramData, 'hallName'),
                activityStartDate: _.get(paramData, 'activityStartDate'),
                activityEndDate: _.get(paramData, 'activityEndDate'),
                areaIds: _.get(paramData, 'areaIds'),
                states: _.get(paramData, 'states')
            };

            window.open(httpConfig.siteUrl + '/activity/exportGiveoutActivity?param=' + JSON.stringify(param));
        }

    }])
    .controller('businessModalCtrl', ['$uibModalInstance', '$scope', '$rootScope', '$log', 'items', '$timeout', 'paramData', '$filter', function($uibModalInstance, $scope, $rootScope, $log, items, $timeout, paramData, $filter) {
        var $ctrl = this;

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

        //时间控件2
        $scope.applyCreateStartDt = ''; //制单日期开始
        $scope.applyCreateEndDt = ''; //制单日期结束
        $scope.applyStartDateOptions = {
            formatYear: 'yy',
            maxDate: $scope.applyCreateEndDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.applyEndDateOptions = {
            formatYear: 'yy',
            minDate: $scope.applyCreateStartDt,
            startingDay: 1,
            showWeeks: false
        };
        $scope.$watch('applyCreateStartDt', function(newValue) {
            $scope.applyEndDateOptions.minDate = newValue;
            paramData.activityStartDate = $filter('date')(newValue, 'yyyyMMdd');
        });
        $scope.$watch('applyCreateEndDt', function(newValue) {
            $scope.applyStartDateOptions.maxDate = newValue;
            paramData.activityEndDate = $filter('date')(newValue, 'yyyyMMdd');
        });
        $scope.applyStartOpen = function() {
            $timeout(function() {
                $scope.applyStartPopupOpened = true;
            });
        };
        $scope.applyEndOpen = function() {
            $timeout(function() {
                $scope.applyEndPopupOpened = true;
            });
        };
        $scope.applyStartPopupOpened = false;
        $scope.applyEndPopupOpened = false;

        $ctrl.ok = function() {
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


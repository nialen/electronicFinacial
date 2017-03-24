/**
 * Auth 丁少华
 * Date 2017-3-9
 */

define(['angular', 'jquery', 'httpConfig', 'sweetalert', 'lodash', 'mock', 'select', 'uploader', 'ui-bootstrap-tpls', 'angular-animate', 'angular-locale_zh-cn'], function(angular, $, httpConfig, swal, _, Mock) {
    angular
        .module('voucher2ApplyForModule', ['ui.bootstrap', 'ui.select', 'ngAnimate', 'ui.uploader'])
        //活动确认保存入参
        .factory('paramData', [function() {
            var paramData = {
                'hallResources': [{ //厅店发放明细列表
                    'hallId': '', //厅店ID
                    'hallCode': '', //厅店编码
                    'hallName': '', //厅店名称
                    'rscId': '', //资源ID
                    'rscCode': '', //资源编码
                    'rscName': '', //资源名称
                    'num': null //资源数量
                }]
            };

            return paramData;
        }])
        .factory('httpMethod', ['$http', '$q', function($http, $q) {
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

            //资源查询
            httpMethod.qryResource = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/rsc/qryResource',
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

            //厅店查询
            httpMethod.qryHall = function(param) {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/pub/qryHall',
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

                //资源查询
                Mock.mock(httpConfig.siteUrl + '/rsc/qryResource', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': {
                        'resources|5': [{
                            'rscId': '@id', //资源ID
                            'rscCode': '@id', //资源Code
                            'rscName': '@cword(4)', //资源名称
                            'value': '', //面值
                            'templet': '', //模板(类型)
                            'state': '' //状态
                        }],
                        'total|1-100': 10 //总条数
                    },
                    'errors': null
                });

                //厅店查询
                Mock.mock(httpConfig.siteUrl + '/pub/qryHall', {
                    'rsphead': 's',
                    'success': true, //是否成功
                    'code': null,
                    'msg': null, //失败信息
                    'data': {
                        'halls|5': [{
                            'hallId': '@id', //厅店ID
                            'hallCode': '@id', //厅店Code
                            'hallName': '@cword(5)', //厅店名称
                            'orgName': '@cword(8)' //归属分支局
                        }],
                        'total|1-100': 10 //总条数
                    },
                    'errors': null
                });

                //厅店发放导入
                Mock.mock(httpConfig.siteUrl + '/activity/activityGrantUpload', {
                    'rsphead': 's',
                    'success': true, //是否成功,
                    'code': '0',
                    'msg': '', //失败信息
                    'error': null,
                    'data': {
                        'activityGrant|15': [{
                            'rscId': '@id', //资源id
                            'rscCode': '@id', //资源编码
                            'rscName': '@cword(5)', //资源名称
                            'hallId': '@id', //厅店id
                            'hallCode': '@id', //厅店编码
                            'hallName': '@cword(5)', //厅店名称
                            'hallTotalNum|1-100': 1 //发放数量
                        }],
                        'fileName': '', //文件名
                        'total|100-200': 100, //数据总量
                        'successNum|1-100': 1, //成功数量
                        'failNum|1-100': 1, //失败数量
                    }
                });
            }

            return httpMethod;
        }])
        .controller('activityApplyFormCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', function($scope, $rootScope, $filter, $log, $timeout) {
            $scope.showInformation = true;
            $scope.toggleShow = function() {
                $scope.showInformation = !$scope.showInformation;
            };
            //时间控件
            $scope.startDateOptions = {
                formatYear: 'yy',
                maxDate: '',
                startingDay: 1,
                showWeeks: false
            };
            $scope.startOpen = function() {
                $timeout(function() {
                    $scope.startPopupOpened = true;
                });
            };
            $scope.startPopupOpened = false;
        }])
        .controller('redPacketCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', function($scope, $rootScope, $filter, $log, $timeout) {
            $scope.showRedpacket = true;
            $scope.toggleShow = function() {
                $scope.showRedpacket = !$scope.showRedpacket;
            };
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
        .controller('areaMultipleCtrl', ['$scope', '$rootScope', '$log', 'httpMethod', function($scope, $rootScope, $log, httpMethod) {
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

            };
        }])
        .controller('redFoundationCtrl', ['$scope', '$rootScope', '$uibModal', '$filter', '$log', '$timeout', 'paramData', function($scope, $rootScope, $uibModal, $filter, $log, $timeout, paramData) {
            $scope.showFoundation = true;
            $scope.toggleShow = function() {
                $scope.showFoundation = !$scope.showFoundation;
            };
            $scope.lineList = []; //活动商户明细列表
            $scope.currentPageList = []; //当前分页数据列表
            //分页
            $scope.currentPage = 1; //当前页
            $scope.rowNumPerPage = 10; //每页显示行数
            $scope.totalNum = 0; //总条数
            $scope.maxSize = 8; //最大显示页码数
            //切换页
            $scope.pageChanged = function() {
                $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
            };
            //增加一行
            $scope.addNewLine = function() {
                var obj = {
                    resources: {}, //资源信息
                    hall: {}, //厅店信息
                    num: null //资源数量
                };
                $scope.lineList.unshift(obj);
                $scope.totalNum = _.size($scope.lineList);
                $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
            };
            //删除
            $scope.delLine = function(index) {
                $scope.totalNum = _.size($scope.lineList);
                $scope.currentPageList = _.chunk($scope.lineList, $scope.rowNumPerPage)[$scope.currentPage - 1];
                $scope.lineList.splice(($scope.currentPage - 1) * $scope.rowNumPerPage + index, 1);
            };
            //数据update同步paramData
            var _watchFn = function() {
                $scope.$watch('lineList', function(newValue) {
                    var middleData = [];
                    _.map(newValue, function(item, index) {
                        var obj = {
                            hallId: '',
                            hallName: '',
                            rscId: '',
                            rscName: '',
                            num: null
                        };
                        obj.hallId = item.hall.hallId;
                        obj.hallName = item.hall.hallName;
                        obj.rscId = item.resources.rscId;
                        obj.rscName = item.resources.rscName;
                        obj.num = item.num;
                        middleData.push(obj);
                    });
                    paramData.hallResources = middleData;
                    //刷新列表
                    $scope.totalNum = _.size(newValue);
                    $scope.currentPageList = _.chunk(newValue, $scope.rowNumPerPage)[$scope.currentPage - 1];
                }, true);
            };

            _watchFn();
            //添加资源
            $scope.addResources = function(item) {
                var modalInstance = $uibModal.open({
                    animation: 'true',
                    ariaLabelledBy: 'resources-modal-title',
                    ariaDescribedBy: 'resources-modal-body',
                    templateUrl: 'resourcesModal.html',
                    controller: 'resourcesModalCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return item;
                        }
                    }
                });
            };
            //添加厅店
            $scope.addHall = function(item) {
                var modalInstance = $uibModal.open({
                    animation: 'true',
                    ariaLabelledBy: 'hall-modal-title',
                    ariaDescribedBy: 'hall-modal-body',
                    templateUrl: 'hallModal.html',
                    controller: 'hallModalCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return item;
                        }
                    }
                });
            };
            //导入
            $scope.hallImport = function() {
                var modalInstance = $uibModal.open({
                    backdrop: 'static',
                    keyboard: false,
                    animation: 'true',
                    ariaLabelledBy: 'hall-import-title',
                    ariaDescribedBy: 'hall-import-body',
                    templateUrl: 'hallImportModal.html',
                    controller: 'hallImportModalCtrl',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve: {
                        items: function() {
                            return $scope.lineList;
                        }
                    }
                });
            };
        }])
        .controller('resourcesModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, items, httpMethod) {
            var $ctrl = this;
            $ctrl.keyword = ''; //关键字
            $ctrl.resourceList = []; //资源信息列表
            $ctrl.currentPage = 1; //当前页
            $ctrl.rowNumPerPage = 10; //每页显示行数
            $ctrl.totalNum = 0; //总条数
            $ctrl.maxSize = 4; //最大显示页码数
            //切换页
            $ctrl.pageChanged = function() {
                $ctrl.keywordQuery($ctrl.currentPage);
            };
            //关键字查询
            $ctrl.keywordQuery = function() {
                var param = {
                    qryString: $ctrl.keyword, //关键字
                    pageSize: $ctrl.rowNumPerPage, //每页条数
                    curPage: $ctrl.currentPage //当前页
                };
                httpMethod.qryResource(param).then(function(rsp) {
                    $ctrl.resourceList = rsp.data.resources;
                    $ctrl.totalNum = rsp.data.total;
                    $log.log('获取资源列表成功.');
                }, function() {
                    $log.log('获取资源列表失败.');
                });
            };

            $ctrl.todoChecked = {}; //待确认的选项
            //单选框选择
            $ctrl.check = function(item) {
                $ctrl.todoChecked = item;
            };

            $ctrl.ok = function() {
                items.resources = $ctrl.todoChecked;
                $uibModalInstance.close();
            };
            $ctrl.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }])
        .controller('hallModalCtrl', ['$uibModalInstance', '$scope', '$log', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, items, httpMethod) {
            var $ctrl = this;
            $ctrl.hallName = ''; //厅店名称
            $ctrl.hallId = ''; //厅店ID
            $ctrl.cityId = ''; //地市ID
            $ctrl.districtId = ''; //区县ID
            $ctrl.hallsList = []; //厅店信息列表
            $ctrl.currentPage = 1; //当前页
            $ctrl.rowNumPerPage = 10; //每页显示行数
            $ctrl.totalNum = 0; //总条数
            $ctrl.maxSize = 4; //最大显示页码数
            //切换页
            $ctrl.pageChanged = function() {
                $ctrl.conditionQuery($ctrl.currentPage);
            };

            $ctrl.cityList = []; //所有地区列表
            var param = {
                level: '3'
            };
            httpMethod.qryArea(param).then(function(rsp) {
                $ctrl.cityList = rsp.data.area;
                $log.log('获取州/市列表成功.');
            }, function() {
                $log.log('获取州/市列表失败.');
            });

            $scope.$watch('$ctrl.cityId', function(newValue) {
                if (newValue) {
                    var param = {
                        level: '4',
                        parentAreaId: $ctrl.cityId
                    };
                    httpMethod.qryArea(param).then(function(rsp) {
                        $ctrl.districtList = rsp.data.area;
                        $log.log('获取区/县列表成功.');
                    }, function() {
                        $log.log('获取区/县列表失败.');
                    });
                } else {
                    $ctrl.districtList = [];
                }
            });

            //条件查询
            $ctrl.conditionQuery = function() {
                var param = {
                    hallName: $ctrl.hallName, //厅店名称
                    hallId: $ctrl.hallId, //厅店ID
                    cityId: $ctrl.cityId, //地市ID
                    districtId: $ctrl.districtId, //区县ID
                    pageSize: $ctrl.rowNumPerPage, //每页条数
                    curPage: $ctrl.currentPage //当前页
                };
                httpMethod.qryHall(param).then(function(rsp) {
                    $ctrl.hallsList = rsp.data.halls;
                    $ctrl.totalNum = rsp.data.total;
                    $log.log('获取厅店列表成功.');
                }, function() {
                    $log.log('获取厅店列表失败.');
                });
            };

            $ctrl.todoChecked = {}; //待确认的选项
            //单选框选择
            $ctrl.check = function(item) {
                $ctrl.todoChecked = item;
            };

            $ctrl.ok = function() {
                items.hall = $ctrl.todoChecked;
                $uibModalInstance.close();
            };
            $ctrl.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }])
        .controller('hallImportModalCtrl', ['$uibModalInstance', '$scope', '$log', 'uiUploader', 'items', 'httpMethod', function($uibModalInstance, $scope, $log, uiUploader, items, httpMethod) {
            var $ctrl = this;
            $ctrl.ok = function() {
                $uibModalInstance.close();
            };
            $ctrl.cancel = function() {
                var activityGrantList = _.get($ctrl.resp, 'data.activityGrant');
                _.map(activityGrantList, function(item) {
                    var obj = {
                        resources: {
                            rscId: item.hallId,
                            rscCode: item.rscCode,
                            rscName: item.rscName
                        },
                        hall: {
                            hallId: item.hallId,
                            hallCode: item.hallCode,
                            hallName: item.hallName
                        },
                        num: item.hallTotalNum
                    };
                    items.unshift(obj);
                });
                $uibModalInstance.dismiss('cancel');
            };
            $ctrl.resp = null; //上传完毕接口返回的response信息；
            $ctrl.files = []; //上传的文件列表；
            $ctrl.isNotAllowClose = false; //是否不允许关闭弹框；
            $ctrl.isNotAllowUpload = true; //是否不允许上传；
            $ctrl.grantUploadTemplete = httpConfig.siteUrl + ''; //模板下载地址
            $ctrl.btn_remove = function(file) {
                uiUploader.removeFile(file);
            };
            $ctrl.btn_clean = function() {
                uiUploader.removeAll();
            };
            // 确定导入
            $ctrl.btn_upload = function() {
                $ctrl.isNotAllowClose = true;
                uiUploader.startUpload({
                    url: httpConfig.siteUrl + '',
                    concurrency: 1,
                    onProgress: function(file) {
                        $log.info(file.name + '=' + file.humanSize);
                        $scope.$apply();
                    },
                    onCompleted: function(file, response) {
                        $ctrl.isNotAllowClose = false;
                        $ctrl.isNotAllowUpload = true;
                        $ctrl.resp = JSON.parse(response);
                        $scope.$apply();
                    }
                });
            };
            $ctrl.checkFiles = function() {
                var element = document.getElementById('hallImportInput');
                if (element) {
                    element.addEventListener('change', function(e) {
                        $ctrl.resp = null;
                        $ctrl.files = uiUploader.removeAll();
                        $ctrl.isNotAllowUpload = true;
                        var files = e.target.files;
                        uiUploader.addFiles(files);
                        $ctrl.files = uiUploader.getFiles();
                        $ctrl.isNotAllowUpload = false;
                        $scope.$apply();
                    });
                }
            };
        }])
        .controller('submitCtrl', ['$scope', '$rootScope', '$filter', '$log', '$timeout', function($scope, $rootScope, $filter, $log, $timeout) {
            // 提交审核
            $scope.submitApply = function() {

            }
        }])
});

/**
 * Auth 丁少华
 * Date 2016-09-06
 */
define(['angular', 'jquery', 'sweetalert', 'httpConfig', 'angular-animate'], function(angular, $, swal, httpConfig) {
    angular.module('indexModule', ['ngAnimate'])
        .factory('httpMethod', ['$http', '$q', function($http, $q) {
            var httpMethod = {};
            // 获取用户信息,菜单列表
            httpMethod.getUserInformation = function() {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/main/profile/index.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader
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
            // 用户登出
            httpMethod.login = function() {
                var defer = $q.defer();
                $http({
                    url: httpConfig.siteUrl + '/login.action',
                    method: 'POST',
                    headers: httpConfig.requestHeader
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
            return httpMethod;
        }])
        .controller('indexCtrl', ['$scope', '$window', '$log', 'httpMethod', function($scope, $window, $log, httpMethod) {
            $scope.userInfo = {
                'name': '测试'
            };
            $scope.menuInfo = [{
                "name": "营销活动立减",
                "id": "activityReduce",
                "imgUrl": "null",
                "submenu": "",
                "url": "/page/activityReduce/activityReduce.html"
            }, {
                "name": "营销活动立返",
                "id": "activityReturn",
                "imgUrl": "null",
                "submenu": "",
                "url": "/page/activityReturn/activityReturn.html"
            }, {
                "name": "商户现金红包申请",
                "id": "merchantCashRedEnvelopes",
                "imgUrl": "null",
                "submenu": "",
                "url": "/page/merchantCashRedEnvelopes/merchantCashRedEnvelopes.html"
            }, {
                "name": "商户代金券红包申请",
                "id": "merchantVoucherRedEnvelopes",
                "imgUrl": "null",
                "submenu": "",
                "url": "/page/merchantVoucherRedEnvelopes/merchantVoucherRedEnvelopes.html"
            }];

            $scope.loginOut = function() {
                swal({
                    title: "用户登出",
                    text: "您确定要登出账户吗？",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ffaa00",
                    cancelButtonText: "取消",
                    showLoaderOnConfirm: true
                }, function() {
                    httpMethod.login().then(function(rsp) {
                        // $log.log('调用登出用户账户接口成功.');
                        if (rsp.success) {
                            $window.location.href = 'login.jsp';
                        } else {
                            swal("OMG", rsp.msg || "用户登出失败!", "error");
                        }
                    }, function() {
                        // $log.log('调用登出用户账户接口失败.');
                        swal("OMG", rsp.msg || "调用登出用户账户接口失败!", "error");
                    });
                });
            };
        }])
        // 搜索
        .controller('searchCtrl', ['$scope', function($scope) {
            $scope.value = '';
            $scope.searchFn = function() {
                console.log($scope.value)
            };
        }])
        .directive('searchDirective', function() {
            return {
                restrict: 'EA',
                template: '<form ng-submit="searchFn()"><div class="input-group">' +
                    '<input type="text" ng-model="value" placeholder="请输入关键字" class="search-input">' +
                    '<i class="iconfont search-icon">&#xe600;</i>' +
                    '</div></form>',
                link: function($scope, iElm, iAttrs, controller) {
                    // element.text('this is the search directive');
                }
            };
        })
        // tabs标签
        .controller('tabsCtrl', ['$scope', '$rootScope', '$log', '$sce', function($scope, $rootScope, $log, $sce) {
            var tabs = [];
            $scope.tabs = tabs;
            $scope.selectedIndex = 0;
            /**
             * 添加Tab标签
             * @title 标签名称
             * @view URL
             * @id DOM的ID
             * @data 传递给DOM的数据
             */
            $scope.addTab = function(title, view, id, data) {              
                if(!httpConfig.isDevEnvironment){
                    var index = view.indexOf('/', 1);
                    view = view.slice(index);
                }
                var isHas = tabs.some(function(item, index) {
                    return item.title === title
                });
                if (!isHas) {
                    view = view || title + "Content View";
                    var index = tabs.push({
                        title: title,
                        url: $sce.trustAsResourceUrl(view),
                        id: id || '',
                        data: data || ''
                    });
                    $scope.changeTab(index - 1);
                } else {
                    var selectedIndex;
                    tabs.map(function(item, index) {
                        if (item.title == title) {
                            selectedIndex = index;
                        }
                    });
                    tabs[selectedIndex] = {
                        title: title,
                        url: $sce.trustAsResourceUrl(view),
                        id: id || '',
                        data: data || ''
                    };
                    $scope.changeTab(selectedIndex);
                }
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            /**
             * 删除Tab标签
             * @index 需要删除的索引
             */
            $scope.removeTab = function(index) {
                var i = index == undefined ? $scope.selectedIndex : index;
                if (i <= $scope.selectedIndex) {
                    $scope.changeTab($scope.selectedIndex ? $scope.selectedIndex - 1 : $scope.selectedIndex);
                }
                tabs.splice(i, 1);

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            };
            /**
             * 切换展示的Tab索引
             * @index 切换后的索引值
             */
            $scope.changeTab = function(selectedIndex) {
                $scope.selectedIndex = selectedIndex;
            };
        }])
        // 左侧菜单
        .controller('accordionCtrl', ['$scope', 'httpMethod', function($scope, httpMethod) {
            $scope.tabsTitle = {
                title: '菜单导航',
                icon: 'icon-602'
            };
        }])
        .directive('accordionListDirective', function() {
            return {
                templateUrl: 'accordion-list.html',
                restrict: 'E',
                link: function($scope, iElm, iAttrs, controller) {
                    if ($('#accordion-tabs').length > 0) {
                        $('#accordion-tabs').each(function() {
                            var accordion = $(this);
                            accordion.on('change', 'input[type="checkbox"]', function() {
                                var checkbox = $(this);
                                (checkbox.prop('checked')) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300): checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
                            });
                        });
                    }

                }
            };
        })
        .directive('tabsTitleDirective', function() {
            return {
                restrict: 'E',
                templateUrl: 'tabs-title.html',
                link: function($scope, iElm, iAttrs, controller) {}
            };
        })
        .directive('tabsContentDirective', function() {
            return {
                restrict: 'E',
                templateUrl: 'tabs-content.html',
                link: function($scope, iElm, iAttrs, controller) {
                    $('.tab-container').height(document.documentElement.clientHeight - 48);
                    $('.tabs-content').height(document.documentElement.clientHeight - 80);
                    $('.accordion-list').height(document.documentElement.clientHeight - 48);
                    $(window).resize(function() {
                        // $('.tab-container').height(document.documentElement.clientHeight - 45);
                        // $('.tabs-content').height(document.documentElement.clientHeight - 77);
                        // $('.accordion-list').height(document.documentElement.clientHeight - 45);
                    });
                }
            };
        })
        .directive('iconDirective', function() {
            return {
                restrict: 'E',
                link: function($scope, iElm, iAttrs, controller) {
                    var img = new Image();
                    img.className = 'icon';
                    img.src = iAttrs.url == 'null' ? 'images/icon-01.png' : iAttrs.url;
                    $(iElm).append(img);
                }
            }
        })
});

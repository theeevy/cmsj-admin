angular.module('cmsj-admin')
    .directive('paginationFormatter', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, controller) {
                controller.$formatters.push(function(value) {
                    return value += 1;
                });
                controller.$parsers.push(function(value) {
                    return value -= 1;
                });
            }
        };
    })
    .controller('ContentController', function($scope, $http, $location, ContentService){
        $scope.content = [];
        $scope.content.$paging = {}
        $scope.content.$paging.number = 0;
        $scope.content.$paging.size = '10'

        $scope.responseHandler = function(data){
            data.$paging.size += '';
            $scope.content = data;
        };
        ($scope.reload = function(){
            ContentService.page({
                offset : $scope.content.$paging.number,
                count :  $scope.content.$paging.size,
                dir : "ASC",
                column : "id"
            }).$promise.then($scope.responseHandler);
        }).apply();
    });
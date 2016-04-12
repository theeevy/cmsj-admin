angular.module('cmsj-admin')
    .controller('ContentController', function($scope, $http, $location){
        $scope.articleList = {};
        $scope.articleList.totalItems = 0;
        $scope.articleList.count = 10;
        $scope.articleList.currentPage = 1;
        $scope.articleList.doRequest = function(){
            $http.get()
        }
    });
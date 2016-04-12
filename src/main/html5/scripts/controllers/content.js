angular.module('cmsj-admin')
    .controller('ContentController', function($scope, $http, $location, ContentService){
        $scope.articleList = {};
        $scope.articleList.totalItems = 0;
        $scope.articleList.count = 10;
        $scope.articleList.currentPage = 1;
        $scope.articleList.data = ContentService.query();

        $scope.articleList.testEntity = ContentService.get({id:1}, function(){
            console.log($scope.articleList.testEntity)
        });
        $scope.articleList.changeTestEntity = function(){
            $scope.articleList.testEntity.title = 'LayoutsNew';
            $scope.articleList.testEntity.$update();
        };
    });
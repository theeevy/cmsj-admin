angular.module('cmsj-admin')
    .controller('ContentController', function($scope, $http, $location, ContentService){
        $scope.content = {};
        $scope.content.paging = {
            offset : 0,
            count : 10,
            dir : "ASC",
            column : "id"
        };
        $scope.content.data = ContentService.page();

        $scope.doLog = function(){
            ContentService.page().$promise.then(function (data) {
                console.log(data);
            });
        }
    });
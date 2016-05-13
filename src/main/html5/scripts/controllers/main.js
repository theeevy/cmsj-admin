angular.module('cmsj-admin')
    .controller('MainController', function($scope, $uibModal){
        $scope.open = function(){
            var modalInstance = $uibModal.open({
                templateUrl: 'views/media/upload.html',
                controller: 'ImageUploadController',
                size: 'lg'
                //resolve: {
                //    items: function () {
                //        return $scope.items;
                //    }
                //}
            });

            //modalInstance.result.then(function (selectedItem) {
            //    $scope.selected = selectedItem;
            //}, function () {
            //    $log.info('Modal dismissed at: ' + new Date());
            //});
        };
    });
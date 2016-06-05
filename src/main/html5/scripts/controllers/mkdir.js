angular.module('cmsj-admin')
    .controller('MediaMakeDirController', function($scope, $uibModalInstance, selectedFolder, MediaService){
        $scope.path = "/" + selectedFolder.uri + "/";
        $scope.name = "НоваяПапка";
        $scope.showProgress = false;

        $scope.ok = function () {
            $scope.showProgress = true;

            MediaService.mkdir(selectedFolder, $scope.name)
                .success(function (data, status, headers, config) {
                    $uibModalInstance.close(data);
                    $scope.showProgress = false;
                })
                .error(function (data, status, headers, config) {
                    console.error(data);
                    $scope.showProgress = false;
                    $uibModalInstance.dismiss('cancel');
                });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });

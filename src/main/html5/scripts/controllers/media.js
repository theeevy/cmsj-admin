angular.module('cmsj-admin')
    .controller('MediaController', function ($scope, MediaService) {
        $scope.fileTree = [];
        $scope.selectedFolder = {};

        $scope.folderClick = function(node){
            var containsFolder = false;
            node.children.forEach(function(item, i, arr) {
                if (item.itemType == "DIR") containsFolder = true;
            });

            if (containsFolder){
                node.collapse = ! node.collapse
            }

            $scope.selectedFolder = node;
        };

        ($scope.load = function () {
            MediaService.query()
                .success(function (data, status, headers, config) {
                    $scope.fileTree = data;
                    $scope.selectedFolder = data[0];
                })
                .error(function (data, status, headers, config) {
                    console.error(data);
                });
        }).apply();
    });

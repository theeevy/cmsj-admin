angular.module('cmsj-admin')
    .controller('MediaController', function ($scope, $sce, MediaService) {
        $scope.fileTree = [];
        $scope.selectedFolder = {};
        $scope.viewMode = false;

        $scope.folderClick = function(node){
            if(node.itemType === "FILE"){
                return;
            }
            var containsFolder = false;
            node.children.forEach(function(item, i, arr) {
                if (item.itemType == "DIR") containsFolder = true;
            });

            if (containsFolder){
                node.collapse = ! node.collapse
            }

            $scope.selectedFolder = node;
        };

        //$scope.popoverHtml = function(node){
        //    var uri = '';
        //    node.pathParts.forEach(function(e,i,a){
        //        uri += e.name + '\\';
        //    });
        //    uri += node.name;
        //    return uri;
        //};

        ($scope.load = function () {
            MediaService.query()
                .success(function (data, status, headers, config) {
                    $scope.fileTree = data;

                    (function buildPathParts(node, parts){
                        if(parts == null || parts == undefined){
                            parts = [];
                        }

                        node.uri = '';
                        node.pathParts = parts.slice(0);
                        node.pathParts.forEach(function(e,i,a){
                            node.uri += e.name + '/';
                        });

                        node.pathParts.push(node);
                        node.uri += node.name;

                        node.children.forEach(function(e,i,a){

                            buildPathParts(e,node.pathParts);
                        });

                    })($scope.fileTree[0]);

                    $scope.selectedFolder = data[0];
                })
                .error(function (data, status, headers, config) {
                    console.error(data);
                });
        }).apply();
    });

angular.module('cmsj-admin')
    .controller('MediaController', function ($scope, $sce, $uibModal, MediaService) {
        $scope.fileTree = [];
        $scope.selectedFolder = {};
        $scope.viewMode = false;
        $scope.dropGhost = false;

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

        $(function(){
            var dropZone = angular.element('#dropZone');


            if (typeof(window.FileReader) == 'undefined') {
                //dropZone.text('Не поддерживается браузером!');
                //dropZone.addClass('error');
            }

            dropZone.on('dragover', function(event) {
                if (event.target == this) {
                    return;
                }

                var scope = angular.element(this).scope();
                scope.$apply(function(){
                    scope.dropGhost = true;
                });

                var scrollPosition;

                if (scope.viewMode) {
                    scrollPosition = $('#dropGhostRow').offset();
                }else{
                    scrollPosition = $('#dropGhostIcon').offset();
                }

                $.scrollTo(scrollPosition);
                    //.dropGhost = true;
                //$scope.dropGhost = true;
                dropZone.addClass('hover');
                return false;
            });

            dropZone.on('dragleave', function(event) {
                if(event.originalEvent.pageX != 0 && event.originalEvent.pageY != 0){
                    return false;
                }

                var scope = angular.element(this).scope();
                scope.$apply(function(){
                    scope.dropGhost = false;
                });
                dropZone.removeClass('hover');
                return false;
            });

            dropZone.on('drop', function(event) {
                event.preventDefault();

                var scope = angular.element(this).scope();

                scope.$apply(function(){
                    scope.dropGhost = false;
                });

                scope.onFilesDropped(event.originalEvent.dataTransfer.files);
            });
        });

        $scope.onFilesDropped = function(files){
            var modalInstance = $uibModal.open({
                templateUrl: 'views/media/upload.html',
                controller: 'ImageUploadController',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    files: function () {
                        return files;
                    },
                    selectedFolder: function(){
                        return $scope.selectedFolder;
                    }
                }
            });
        };
    });

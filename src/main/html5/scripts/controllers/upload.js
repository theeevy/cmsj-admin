angular.module('cmsj-admin')
    .controller('ImageUploadController', function($scope, $uibModalInstance, $timeout, Cropper, files, selectedFolder, MediaService){
        //filter files
        $scope.files = [];

        $scope.selectedFolder = selectedFolder;

        for (var i = 0; i < files.length; ++i) {
            $scope.files[i] = files[i];
        }
        $scope.pageCount = 1 + $scope.files.length + 1;

        $scope.files.removeOne = function(index){
            $scope.files.splice(index,1);
            $scope.pageCount = 1 + $scope.files.length + 1;
        };

        //$scope.totalItems = 10 + $scope.files.length * 10;
        $scope.currentPage = 1;

        //pagination & encoding
        $scope.files.forEach(function(e,i,a){
            $scope.files[i].pageIndex = i+2;
            $scope.files[i].showCropperEvent = 'showCropper' + i;
            $scope.files[i].hideCropperEvent = 'hideCropper' + i;

            $scope.files[i].showCropper = function(){$scope.$broadcast($scope.files[i].showCropperEvent);};
            $scope.files[i].hideCropper = function(){$scope.$broadcast($scope.files[i].showCropperEvent);};

            $scope.files[i].cropperOptions = {
                maximize: true,
                movable: false,
                scalable: false,
                rotatable: false,
                zoomable: false,
                minContainerWidth: 800,
                minContainerHeight: 600,
                crop: function(dataNew) {
                    $scope.files[i].cropData = dataNew;
                }
            };

            $scope.files[i].resolution = {x: 0, y: 0};
            Cropper.encode($scope.files[i]).then(function(dataUrl){
                var img = new Image;
                img.onload = function(){
                    $scope.files[i].resolution.x = img.width;
                    $scope.files[i].resolution.y = img.height;
                };

                $scope.files[i].dataUrl = dataUrl;
                img.src = $scope.files[i].dataUrl;

                $timeout($scope.files[i].showCropper);
            });

            //$timeout(function(){console.log('timeout test')});

            $scope.files[i].cropperProxy = 'cropper.crop' + i;
        });

        $scope.cropper = {};

        $scope.doCrop = function(file){
            Cropper.crop(file,file.cropData).then(function(blob){
                //console.log(blob);
                MediaService.upload([{blob: blob,name:'test.jpg'}],function(){},function(){console.log('done!!')});
            });
        };

        $scope.showProgressBar = false;
        $scope.progressBarValue = 0;
        $scope.uploadAll = function(){
            $scope.showProgressBar = true;
            var isCropped = [];
            var blobWithNames = [];
            $scope.files.forEach(function(e,i,a){isCropped[i] = false});
            function isAllCropped(){
                var result = isCropped[0];
                for(var i = 1; i < isCropped.length; ++i)
                {
                    result = result && isCropped[i];
                }
                return result;
            }

            console.log($scope.files[0]);
            $scope.files.forEach(function(e,i,a){
                Cropper.crop(e, e.cropData).then(function(blob){
                    blobWithNames.push({
                        blob: blob,
                        name: e.name
                    });
                    isCropped[i] = true;

                    if(isAllCropped()){
                        //do service call
                        MediaService.upload(blobWithNames,
                            function progress(p){
                                $scope.progressBarValue = p;
                                console.log(p);
                            },function load(){
                                console.log("done!")
                            },function respload(resp){
                                console.log(resp);
                            });
                        console.log("service call!");
                        console.log(blobWithNames);
                    }
                });
            });
        };


    });
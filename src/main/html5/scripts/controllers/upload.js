angular.module('cmsj-admin')
    .controller('ImageUploadController', function($scope, $uibModalInstance, $timeout, Cropper, files, selectedFolder, MediaService){
        //filter files
        $scope.files = [];

        $scope.selectedFolder = selectedFolder;

        for (var i = 0; i < files.length; ++i) {
            $scope.files[i] = files[i];
        }

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
                //maximize: true,
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
            });

            $timeout($scope.files[i].showCropper);

            $scope.files[i].cropperProxy = 'cropper.crop' + i;
        });

        $scope.cropper = {};

        $scope.doCrop = function(file){
            Cropper.crop(file,file.cropData).then(function(blob){
                //console.log(blob);
                MediaService.upload([{blob: blob,name:'test.jpg'}],function(){},function(){console.log('done!!')});
            });
        }


    });
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

        console.log($);
        $(function(){
            var dropZone = angular.element('#dropZone'),
                maxFileSize = 1000000; // максимальный размер файла - 1 мб.
            //console.log(dropZone[0]);


            if (typeof(window.FileReader) == 'undefined') {
                dropZone.text('Не поддерживается браузером!');
                dropZone.addClass('error');
            }

            dropZone.on('dragover', function() {
                //window.alert('dragover');
                dropZone.addClass('hover');
                return false;
            });

            dropZone.on('dragleave', function() {
                //window.alert('dragleave');
                dropZone.removeClass('hover');
                return false;
            });

            dropZone.on('drop', function(event) {
                event.preventDefault();
                dropZone.removeClass('hover');
                dropZone.addClass('drop');

                console.log(event);
                console.log(event.originalEvent.dataTransfer.files);
                var file = event.originalEvent.dataTransfer.files[0];

                if (file.size > maxFileSize) {
                    dropZone.text('Файл слишком большой!');
                    dropZone.addClass('error');
                    dropZone.removeClass('drop');
                    return false;
                }
            });
        });

    });
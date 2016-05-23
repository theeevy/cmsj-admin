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

        $(function(){
            var dropZone = $('#dropZone'),
                maxFileSize = 1000000; // максимальный размер файла - 1 мб.
            console.log(dropZone);
            window.alert("fgh");


            if (typeof(window.FileReader) == 'undefined') {
                dropZone.text('Не поддерживается браузером!');
                dropZone.addClass('error');
            }

            dropZone[0].on('dragover', function() {
                //window.alert('dragover');
                dropZone.addClass('hover');
                return false;
            });

            dropZone[0].on('dragleave', function() {
                //window.alert('dragleave');
                dropZone.removeClass('hover');
                return false;
            });

            dropZone[0].on('drop', function(event) {
                //window.alert('drop');
                event.preventDefault();
                dropZone.removeClass('hover');
                dropZone.addClass('drop');
            });
        })

    });
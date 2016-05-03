angular.module('cmsj-admin')
    .directive('paginationFormatter', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, controller) {
                controller.$formatters.push(function(value) {
                    return value + 1;
                });
                controller.$parsers.push(function(value) {
                    return value - 1;
                });
            }
        };
    })
    .controller('ContentController', function($scope, $http, $location, $state, ContentService){
        $scope.content = [];
        $scope.content.$paging = {};
        $scope.content.$paging.number = 0;
        $scope.content.$paging.size = '10';

        $scope.text = 'intro_text<!-- pagebreak -->full_text';

        if ($state.params.contentId !== undefined){
            ContentService.get({ id : parseInt($state.params.contentId) }).$promise.then(function(data){
                $scope.selectedItem = data;
                $scope.text = $scope.selectedItem.introtext + '<!-- pagebreak -->' + $scope.selectedItem.fulltext;
            });
        }else{
            $scope.selectedItem = {};
        }

        $scope.tinymceOptions = {
            plugins: 'link image code pagebreak',
            width: 700,
            height: 600,
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | pagebreak code',
            content_style: "img.mce-pagebreak {border: 1px dashed red;}"
        };

        console.log($state);

        $scope.$watch('text', function(){
            //console.log('text was changed!');
            var parts = $scope.text.split('<!-- pagebreak -->');
            $scope.selectedItem.introtext = parts[0];
            $scope.selectedItem.fulltext = parts[1];
        });

        $scope.responseHandler = function(data){
            data.$paging.size += '';
            $scope.content = data;
        };

        ($scope.reload = function(){
            ContentService.page({
                offset : $scope.content.$paging.number,
                count :  $scope.content.$paging.size,
                dir : "ASC",
                column : "id"
            }).$promise.then($scope.responseHandler);
        }).apply();
    });
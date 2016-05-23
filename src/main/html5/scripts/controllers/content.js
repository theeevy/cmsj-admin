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
    .controller('ContentController', function($scope, $http, $location, $state, ContentService, TagService){
        $scope.content = [];
        $scope.content.$paging = {};
        $scope.content.$paging.number = 0;
        $scope.content.$paging.size = '10';
        $scope.tinymceOptions = {
            plugins: 'link image code pagebreak',
            width: 800,
            height: 600,
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
            content_style: "img.mce-pagebreak {border: 1px dashed red;}"
        };

        $scope.text = 'intro_text<!-- pagebreak -->full_text';

        if ($state.params.contentId !== undefined){
            ContentService.get({ id : parseInt($state.params.contentId) }).$promise.then(function(data){
                $scope.selectedItem = data;
                $scope.text = $scope.selectedItem.introtext + '<!-- pagebreak -->' + $scope.selectedItem.fulltext;
                TagService.query().$promise.then($scope.tagHandler);
            });
        }else{
            $scope.selectedItem = {};
        }

        $scope.$watch('text', function(){
            if ($scope.selectedItem === undefined) return;
            //console.log('text was changed!');
            var parts = $scope.text.split('<!-- pagebreak -->');
            $scope.selectedItem.introtext = parts[0];
            $scope.selectedItem.fulltext = parts[1];
        });

        $scope.contentHandler = function(data){
            data.$paging.size += '';
            $scope.content = data;
        };

        $scope.tagHandler = function(data){
            data.forEach(function(e,i,a){
                e.$isMarked = false;
            });

            $scope.tags = data;

            if ($scope.selectedItem !== undefined){
                TagService.listByContentId({ contentId: $scope.selectedItem.id }).$promise.then(function(data){
                    var markedTags = [];
                    data.forEach(function(e,i,a){
                        markedTags.push(e.id);
                    });

                    $scope.tags.forEach(function(e,i,a){
                       if (markedTags.includes(e.id)){
                           e.$isMarked = true;
                       }
                    });
                });
            }
        };
        ($scope.reload = function(){
            ContentService.page({
                offset : $scope.content.$paging.number,
                count :  $scope.content.$paging.size,
                dir : "ASC",
                column : "id"
            }).$promise.then($scope.contentHandler);
        }).apply();
    });
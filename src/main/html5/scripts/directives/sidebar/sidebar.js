'use strict';

angular.module('cmsj-admin')
    .directive('sidebar', function(){
        return {
            templateUrl : 'scripts/directives/sidebar/sidebar.html',
            restrict : 'E',
            replace : true
        }
    });

'use strict';

angular.module('cmsj-admin')
    .directive('header', function(){
        return {
            templateUrl : 'scripts/directives/header/header.html',
            restrict : 'E',
            replace : true
        };
    });

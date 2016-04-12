angular.module('cmsj-admin')
    .service('ContentService', function($resource){
        return $resource("entity/")
    });
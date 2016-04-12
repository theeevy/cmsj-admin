angular.module('cmsj-admin')
    .service('ContentService', function($resource){
        return $resource("/entity/content/:id", { id: '@_id'}, { update : { method : 'PUT' }});
    });
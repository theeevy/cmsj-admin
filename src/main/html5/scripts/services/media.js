angular.module('cmsj-admin')
    .service('MediaService', function($http){
        return {
            query : function(){
                return $http.get('/entity/media/filetree');
            }
        };
    });

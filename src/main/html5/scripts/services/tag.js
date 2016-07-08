angular.module('cmsj-admin')
    .service('TagService', function($resource){
        return $resource('/entity/tag/:id', { id: '@_id'}, {
            update : {
                method : 'PUT'
            },
            listByContentId : {
                method: 'GET',
                url: '/entity/tag/contentId=:contentId',
                params: {
                    contentId: 0
                },
                isArray: true
            },
            mark : {
                method: 'GET',
                url: '/entity/tag/mark'
            },
            unmark : {
                method: 'GET',
                url: '/entity/tag/unmark'
            }
        });
    });
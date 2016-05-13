angular.module('cmsj-admin')
    .service('ContentService', function($resource){
        return $resource("/entity/content/:id", { id: '@_id'}, {
            update : {
                method : 'PUT'
            },
            page : {
                method : 'GET',
                url : '/entity/content/page',
                params : {
                    offset : 0,
                    count : 10,
                    dir : "ASC",
                    column : "id"
                },
                transformResponse : function (data, headers){
                    var wrap = angular.fromJson(data);
                    var resp = wrap.content;
                    delete wrap.content;
                    resp.$paging = wrap;
                    return resp;
                },
                interceptor : {
                    response: function (response) {
                        response.resource.$paging = response.data.$paging;
                        return response.resource;
                    }
                },
                isArray : true
            }
        });
    });
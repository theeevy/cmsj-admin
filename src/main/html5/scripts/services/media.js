angular.module('cmsj-admin')
    .service('MediaService', function($http){
        return {
            query : function(){
                return $http.get('/entity/media/filetree');
            },
            mkdir : function(node,name){
                return $http.get('/entity/media/mkdir', {params: {path: node.uri + '/' + name}});
            },
            upload : function(blobsWithNames, progress, load){
                console.log(blobsWithNames);

                var isLoad = [];
                var percentages = [];

                blobsWithNames.forEach(function(e,i,a){
                    console.log(e);
                    isLoad[i] = false;
                    percentages[i] = 0;


                    var form = new FormData();
                    form.append('blob', e.blob, e.name);

                    var xhr = new XMLHttpRequest();

                    xhr.upload.onprogress = function(event) {
                        // Event listener for when the file is uploading
                        if (e.lengthComputable) {
                            percentages[i] = Math.round((e.loaded / e.total * 100) / a.length);
                            var pSummary = 0;
                            percentages.forEach(function(percent){ pSummary += percent });
                            progress(pSummary);
                        }
                    };

                    xhr.upload.onload = function(event) {
                        isLoad[i] = true;
                        var isAllLoaded = true;
                        isLoad.forEach(function(eLoaded){ isAllLoaded = isAllLoaded && eLoaded });

                        if(isAllLoaded)
                            load();
                    };

                    xhr.open('POST','/entity/media/upload',true);
                    xhr.send(form);
                })
            }
        };
    });

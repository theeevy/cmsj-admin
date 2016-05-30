angular.module('cmsj-admin')
    .service('MediaService', function($http){
        return {
            query : function(){
                return $http.get('/entity/media/filetree');
            },
            mkdir : function(node,name){
                //skip images
                var prepend = "";
                node.pathParts.forEach(function(e,i,a){
                    if(i>0){
                        prepend += "/" + e.name;
                    }
                });

                return $http.get('/entity/media/mkdir', {params: {path: prepend + '/' + name}});
            },
            upload : function(blobsWithNames, progress, load, respload){
                console.log(blobsWithNames);

                var isLoad = [];
                var percentages = [];
                var isRespLoad = [];
                var responses = [];

                blobsWithNames.forEach(function(e,i,a){
                    console.log(e);
                    isLoad[i] = false;
                    percentages[i] = 0;
                    isRespLoad[i] = false;



                    var form = new FormData();
                    form.append('blob', e.blob, e.name);

                    var xhr = new XMLHttpRequest();

                    xhr.upload.onprogress = function(event) {
                        // Event listener for when the file is uploading
                        console.log("progress event: " + event);
                        if (e.lengthComputable) {
                            console.log("progress event: computable..");
                            percentages[i] = Math.round((e.loaded / e.total * 100) / a.length);
                            var pSummary = 0;
                            percentages.forEach(function(percent){ pSummary += percent });
                            console.log("progress event: percentage " + pSummary);
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

                    xhr.onload = function(event){
                        responses.push(JSON.parse(xhr.response));
                        isRespLoad[i] = true;

                        var isAllLoaded = true;
                        isRespLoad.forEach(function(eLoaded){ isAllLoaded = isAllLoaded && eLoaded });

                        if(isAllLoaded)
                            respload(responses);
                    };

                    xhr.open('POST','/entity/media/upload',true);
                    xhr.send(form);
                })
            }
        };
    });

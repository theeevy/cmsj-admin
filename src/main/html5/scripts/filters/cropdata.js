angular.module('cmsj-admin')
    .filter('cropdata', function () {
        return function (cropData) {
            var fail = "0x0", w,h;

            if (cropData == undefined) {
                return fail;
            }

            if (cropData.width == undefined) {
                w = 0;
            }else {
                w = Math.round(cropData.width);
            }

            if (cropData.height == undefined) {
                h = 0;
            }else {
                h = Math.round(cropData.height);
            }


            return w + "x" + h;
        };
    });
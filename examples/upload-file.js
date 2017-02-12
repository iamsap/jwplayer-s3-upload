'use strict'

var fileUploader = require('../src/');
fileUploader.init();

fileUploader.upload('/me/sample-videos/video1.mp4', 'Look at me go!', function(err, res){
    console.log('file uploaded to s3 ' + JSON.stringify(res));
    console.log('err\t' + err);
});
'use strict'

var fileUploader = require('../src/');
fileUploader.init();

var url = 'https://jwplayer-s3-upload.s3-us-west-1.amazonaws.com/db8dc0d0-f07c-11e6-b827-7d45dce175c2';
var title = 'Look at me go!';

fileUploader.convert(url, title, function(err, res){
    console.log('file uploaded to s3 ' + JSON.stringify(res));
    console.log('err\t' + err);
});
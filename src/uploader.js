'use strict'
var AWS = require('aws-sdk');
var uuid = require('node-uuid');
var fs = require('fs');

var parseResponse = require('./parser');
var exec = require('child_process').exec;

function JWPlayerS3Upload() {
}

function log(msg) {
    console.log(msg);
}

JWPlayerS3Upload.prototype.init = function init() {
    log('init()');
    this.config = {
        region: process.env.region,
        aws_access_key_id: process.env.aws_access_key_id,
        aws_secret_access_key: process.env.aws_secret_access_key,
        bucket: process.env.bucket
    };
}

JWPlayerS3Upload.prototype.uploadToS3 = function uploadToS3(filePath, cb) {
    log('uploadToS3(' + filePath + ', cb)');

    AWS.config.update({
        region: this.config.region,
    });

    var s3 = new AWS.S3({
        params: {
            Bucket: this.config.bucket,
            accessKeyId: this.config.aws_access_key_id,
            secretAccessKey: this.config.aws_secret_access_keym
        }
    });

    fs.readFile(filePath, function (err, data) {
        if (err) {
            return cb(err);
        }

        s3.upload({
            Body: data, ACL: 'public-read', Key: uuid.v1(),
        }, function (err, res) {
            if (err) {
                return cb(err);
            }

            log('res\t' + JSON.stringify(res));

            var url = res.Location;
            var key = res.Key;
            cb(null, {url: url, key: key});
        });
    });
}

JWPlayerS3Upload.prototype.convert = function convert(url, title, cb) {
    log('convert(' + url + ', cb)');

    var cmd = 'clack call /videos/create "{\'title\':\'' + title + '\', \'download_url\':\'' + url + '\'}"';
    exec(cmd, function (err, stdout, stderr) {
        log('err\t' + err);
        log('stdout\t' + stdout);
        log('stderr\t' + stderr);

        var response = parseResponse(stdout);
        cb(null, response);

    });
}

JWPlayerS3Upload.prototype.upload = function upload(filePath, title, cb) {
    log('upload(' + filePath + ', cb)');
    var self = this;
    this.uploadToS3(filePath, function(err, res){
        if(err){
            return cb(err);
        }

        self.convert(res.url, title, cb);

    });
}

module.exports = new JWPlayerS3Upload();
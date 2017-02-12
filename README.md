# jwplayer-s3-upload
A NodeJS wrapper for uploading videos to JWPlayer via S3.

# How it works
* Uploads your video file to a bucket you own on S3
* Sends a request to JWPlayer to process the uploaded video
* Returns the file id from JWPlayer for your own storage

# installation
npm install --save @iamsap/jwplayer-s3-upload

# usage
```
var videoUploader = require('@iamsap/jwplayer-s3-upload');
var uploader = new JWPlayerUploader();
uploader.upload('/path/to/file.m4p', function(err, response){
       console.log(JSON.stringify(response));
});
```

## output
```
{
  "rate_limit": {
    "limit": 60,
    "remaining": 59,
    "reset": 1486914000
  },
  "status": "ok",
  "video": {
    "key": "nU2qBigV"
  }
}
```

## config
.env.sample shows the environment variables jwplayer-s3-upload will use when connecting
```
export region=<aws-region>
export aws_access_key_id=<access-key-id>
export aws_secret_access_key=<secret-access-key-id>
export bucket=<bucket-name>
```

# JWPlayer
You'll need to go to jwplayer.com and setup a free developer account. From there you will find your api key and secret. You will need those later.

## Using Clack
Currently JWPlayer only supports python and php, so to make this work you'll need to install [clack](https://github.com/rmnl/clack) through the python
[package manager](https://en.wikipedia.org/wiki/Pip_(package_manager)).

```
pip install --upgrade clack-cli
click init
```
Then you'll need to install keyring so you're not prompted for the password every time you use clack.
```
sudo pip install keyring
```
Clack requires that you setup the credentials in keyring so you won't be prompted for your api secret. Credentials for clack are stored in your config file at:
```
/Users/<username>/.clack/config.ini
```




var fs = require('fs');
var parseResponse = require('../src/parser');

describe('parser', function(){

    it('can parse the json response', function(cb) {

        var body = fs.readFileSync('./spec/response.txt', 'utf8');

        var res = parseResponse(body);
        console.log(JSON.stringify(res));

        cb();
    });

});
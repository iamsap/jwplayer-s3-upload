'use strict'

/** parsers the response from jwplayer */

function parseResponse(body) {

    var jsonStart = body.indexOf('{   \'rate_limit\'');
    var jsonEnd = body.indexOf('---', jsonStart);

    var response = body.substr(jsonStart, jsonEnd - jsonStart);
    response = response.replace(/'/g, "\"");
    response = response.replace(/u"/g, "\"");

    return JSON.parse(response);
}

module.exports = parseResponse;
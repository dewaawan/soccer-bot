var HTTPS = require('https');

function postMessage(botID, content) {
    var botResponse, options, body, botReq;

    options = {
        hostname: 'api.groupme.com',
        path:     '/v3/bots/post',
        method:   'POST'
    };

    body = {
        'bot_id': botID,
        'text':   content
    };

    console.log('sending bot message...');

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
    });

    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });

    botReq.end(JSON.stringify(body));
}

module.exports = postMessage;

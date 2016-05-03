'use strict';

require('dotenv').config();

const https = require('https');

function post(input) {
    // get the bot id for the groupme bot
    const botID = process.env.BOT_ID;

    let botResponse, options, body, botReq;

    options = {
        hostname: 'api.groupme.com',
        path:     '/v3/bots/post',
        method:   'POST'
    };

    body = {
        'bot_id': botID,
        'text':   input
    };

    console.log('Sending bot message...');

    botReq = https.request(options, function(res) {
        if(res.statusCode == 202) {
            // neat
        } else {
            console.log('Rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('Error posting message '  + JSON.stringify(err));
    });

    botReq.on('timeout', function(err) {
        console.log('Timeout posting message '  + JSON.stringify(err));
    });

    botReq.end(JSON.stringify(body));
}

module.exports = post;

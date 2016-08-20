'use strict';

require('dotenv').config();

const request = require('request');

/**
 * Sends a request to groupme to post a message
 *
 * @param  {String} input A message to send to groupme
 * @return {Promise}
 */
const post = (input) => {
    // get the bot id for the groupme bot
    const body = {
        bot_id: process.env.BOT_ID,
        text:   input
    };

    return new Promise((resolve, reject) => {
        request({
                uri:     'https://api.groupme.com/v3/bots/post',
                method:  'post',
                body:    JSON.stringify(body)
            }, (error, response, body) => {
                if (response.statusCode !== 202) {
                    reject('Rejecting bad status code ' + response.statusCode);
                }

                if (error) {
                    reject(error);
                }

                // return raw response data
                resolve(response);
            });
    });
};

module.exports = post;

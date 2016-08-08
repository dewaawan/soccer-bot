'use strict';

const find    = require('../lib/find');
const message = require('../lib/message');
const post    = require('../lib/post');
const posted  = require('../lib/posted');

/**
 * Post and update fixtures as `posted` if they are happening soon
 *
 * @return {Promise}
 */
function run() {
    return new Promise(function(resolve, reject) {
        // get an array of fixtures happening soon
        find().then(function(fixtures_send) {
                // send the message to groupme if there is at least one fixture to send
                if (fixtures_send.length > 0) {
                    // build a message to send to the chat
                    const message_to_send = message(fixtures_send);

                    // send the message to be posted in groupme
                    // and update those fixtures in the database as `posted: true`
                    Promise.all([post(message_to_send), posted(fixtures_send)]).then(function(values) {
                            // get the http response, value[1] can be ignored
                            const response = values[0];

                            // return the fixtures that were sent, the message posted to groupme,
                            // and the http response
                            resolve({
                                fixtures_send: fixtures_send,
                                message_to_send: message_to_send,
                                response: response
                            });
                        })
                        .catch(function(error) {
                            reject(error);
                        });
                } else {
                    // return an empty array, empty message, empty response
                    resolve({
                        fixtures_send: [],
                        message_to_send: null,
                        response: null
                    });
                }
            })
            .catch(function(error) {
                reject(error);
            });
    });
};

module.exports = run;

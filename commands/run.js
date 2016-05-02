'use strict';

const find    = require('../lib/find.js');
const message = require('../lib/message.js');
const post    = require('../lib/post.js');
const posted  = require('../lib/posted.js');

/*
 * Run
 * Post and update fixtures as posted if they are happening soon
 */
function run() {
    // get an array of fixtures happening soon
    const fixtures = find();

    // finally, send the message to groupme if there is at least one fixture to send
    if(fixtures.length > 0) {
        // build a message to send to the chat
        const message_to_send = message(fixtures);

        // send the message to be posted in groupme
        post(message_to_send);

        console.log('Posted', fixtures.length, 'matches to groupme');

        // update those fixtures in the database as posted
        posted(fixtures);
    }
}

module.exports = run;

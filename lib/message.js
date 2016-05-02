'use strict';

require('dotenv').load();

const low   = require('lowdb');
const https = require('https');

/*
 * Message
 * Put together the message to post to the chat
 * Arguements: input - an array of fixtures
 */
function message(input) {
    // write a message to post to the chat
    let message = 'Matches kicking off soon:\n';

    // get those fixtures in a more appropriate format for posting
    for(let i = 0; i < input.length; i++) {
        // remove 'FC', 'AFC', or 'SC' from team names (for shorter names in chat)
        input[i].homeTeamName = input[i].homeTeamName.replace(/ FC/g, '');
        input[i].homeTeamName = input[i].homeTeamName.replace(/AFC /g, '');
        input[i].homeTeamName = input[i].homeTeamName.replace(/ SC/g, '');
        input[i].awayTeamName = input[i].awayTeamName.replace(/ FC/g, '');
        input[i].awayTeamName = input[i].awayTeamName.replace(/AFC /g, '');
        input[i].awayTeamName = input[i].awayTeamName.replace(/ SC/g, '');

        input[i].message = input[i].homeTeamName + ' v ' + input[i].awayTeamName;
    }

    // add each fixture to the message
    for(let i = 0; i < input.length; i++) {
        message += input[i].message;

        if(i+1 != input.length) {
            message += ",\n";
        }
    }

    return message;
}

module.exports = message;

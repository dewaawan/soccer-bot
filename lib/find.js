'use strict';

require('dotenv').load();

const low    = require('lowdb');
const moment = require('moment');

const storage = require('lowdb/file-sync');
const db      = low('db.json', { storage });

/*
 * Find
 * Search the fixtures list for matches that:
 *   1. Have not been posted yet
 *   2. Are within the time indicated (ex. within 15 min)
 * Return an array of fixtures that are happening soon
 */
function find() {
    // an empty array of fixtures to send
    let fixtures_send = [];

    // get the current time
    const now = moment();

    // find all fixtures that have not been posted
    const fixtures = db('fixtures').chain().filter({ posted: false }).value();

    // initalize difference
    let difference;

    for(let i = 0; i < fixtures.length; i++) {
        // get the difference in time between the date of the match and now
        difference = moment.duration(moment.unix(fixtures[i].date).diff(now));

        // keep checking only if day is 0 and hours is  0
        if(difference.days() == 0 && difference.hours() == 0) {
            // check if the difference in minutes is 15 min or less
            if(0 <= difference.minutes() && difference.minutes() <= process.env.TIMEFRAME) {
                // add the fixture to the array of fixtures to send
                fixtures_send.push(fixtures[i]);
            }
        }
    }

    return fixtures_send;
}

module.exports = find;

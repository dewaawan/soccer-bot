'use strict';

const low    = require('lowdb');
const moment = require('moment');

const fetch = require('../lib/fetch.js');
const sort  = require('../lib/sort.js');

const storage = require('lowdb/file-sync');
const db      = low('db.json', { storage });

/*
 * Update
 * Get the latest premier league fixture list and update the database with dates
 */
function update() {
    // make the request for the most updated fixtures list
    let api_fixtures = fetch();

    // get a fixtures list from the fixtures table in the database
    let db_fixtures = db('fixtures').value();

    // sort the fixtures in both arrays
    api_fixtures = sort(api_fixtures);
    db_fixtures  = sort(db_fixtures);

    // initialize the date in unix format
    let api_fixtures_date_unix;

    // check the dates on the sorted arrays, if there is a mismatch, then update the date
    // in the database to that of the fixtures from the api
    for(let i = 0; i < db_fixtures.length; i++) {
        // get the date for the api's fixture in unix form
        api_fixtures_date_unix = moment(api_fixtures[i].date).unix();

        // check if the fixture has already been posted (doesn't need to be updated)
        // and if the dates do not match
        if(!db_fixtures[i].posted && db_fixtures[i].date != api_fixtures_date_unix) {
            // fixture has not been posted and the dates do not match, update it!
            db('fixtures').chain().find({ id: db_fixtures[i].id }).assign({ date: api_fixtures_date_unix }).value();
        }
    }
}

module.exports = update;

'use strict';

const moment = require('moment');

const Fixture = require('../models/fixture');
const fetch   = require('../lib/fetch');
const sort    = require('../lib/sort');
const posted  = require('../lib/posted');

/**
 * Get the latest fixtures from https://api.football-data.org/ and update the
 * database with any fixtures with changed dates. This is useful to update fixtures
 * that may be flexed to different dates/times for tv
 *
 * @return {Promise}
 */
function update() {
    return new Promise(function(resolve, reject) {
        // Arrays of returned fixtures
        let api_fixtures = [];
        let db_fixtures  = [];

        // Array of fixtures to update
        let fixtures_to_update = [];

        // Get the most up to date fixture list (0) and the database fixture list (1)
        Promise.all([fetch(), Fixture.getFixtures()]).then(function(fixtures) {
                // Sort the returned fixtures
                api_fixtures = sort(fixtures[0]);
                db_fixtures  = sort(fixtures[1]);

                // check the dates on the sorted arrays, if there is a mismatch, then update the date
                // in the database to that of the fixtures from the api
                db_fixtures.forEach(function(entry, index) {
                    // get the date for the api's fixture in unix form
                    const api_fixtures_date = moment(api_fixtures[index].date);
                    const db_fixtures_date  = moment(db_fixtures[index].date);

                    // check if the fixture has already been posted (doesn't need to be updated)
                    // and if the dates do not match
                    if (!db_fixtures[index].posted && db_fixtures_date.unix() != api_fixtures_date.unix()) {
                        // fixture has not been posted and the dates do not match, update it!
                        // push the fixtures in as a Promise to be resolved later this query
                        // updates the date to the api date and sets `posted` to `false`
                        fixtures_to_update.push(
                            Fixture.Fixture.update(
                                { _id: db_fixtures[index]._id },
                                { $set: { date: api_fixtures_date.toISOString(), posted: false } }
                            ).exec()
                        );
                    }
                });
            })
            .then(function() {
                // Update the fixtures with the new dates if applicable
                if (fixtures_to_update.length === 0) {
                    resolve(fixtures_to_update);
                } else {
                    // resolve the Promises in the fixtures_to_update array, these promises
                    // will return an object similar to { ok: 1, nModified: 1, n: 1 } when modified
                    Promise.all(fixtures_to_update).then(function(values) {
                        // make an array of statuses from the updated database documents
                        const statuses = values.map(function(entry) {
                            return entry.ok;
                        });

                        // check if any of the statuses are not 1
                        if (!statuses.includes(0)) {
                            // return the fixtures that were updated
                            resolve(fixtures_to_update);
                        } else {
                            reject('Error updating database');
                        }
                    })
                    .catch(function(error) {
                        reject(error);
                    });
                }
            })
            .catch(function(error) {
                reject(error);
            });
    });
};

module.exports = update;

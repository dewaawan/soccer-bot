'use strict';

const mongoose = require('mongoose');
const Fixture  = require('../models/fixture');

/**
 * Update the `posted` key in the database for specified fixtures
 *
 * @param  {Object} fixtures_send An array of fixtures
 * @param  {Boolean} posted Whether or not to set posted to true (default = true)
 * @return {Promise}
 */
function posted(fixtures_send, posted = true) {
    return new Promise(function(resolve, reject) {
        // get the `_id` field from each entry in the fixture data from the  database
        const ids = fixtures_send.map(function(entry) {
            return entry._id;
        });

        // run through all the given fixtures and update the posted key to true
        Fixture.update(
            { _id: { $in: ids } },
            { $set: { posted: posted } },
            { multi: true },
            function(error, fixtures) {
                if (error) {
                    reject(error);
                }

                // return updated fixtures
                resolve(fixtures);
            }
        );
    });
};



module.exports = posted;

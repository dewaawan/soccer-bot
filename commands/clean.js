'use strict';

const Fixture = require('../models/fixture');

/**
 * Removes all fixtures from the local database
 *
 * @return {Promise}
 */
function clean() {
    return new Promise(function(resolve, reject) {
        Fixture.remove({}, function(error) {
            if (error) {
                reject(error);
            }

            resolve();
        });
    });
};

module.exports = clean;

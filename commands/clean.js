'use strict';

const Fixture = require('../models/fixture');

/**
 * Removes all fixtures from the local database
 *
 * @return {Promise}
 */
const clean = () => {
    return new Promise((resolve, reject) => {
        Fixture.remove({}, error => {
            if (error) {
                reject(error);
            }

            resolve();
        });
    });
};

module.exports = clean;

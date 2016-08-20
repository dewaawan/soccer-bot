'use strict';

const moment  = require('moment');
const Fixture = require('../models/fixture');

/**
 * Inserts an array of fixtures into the database
 *
 * @param  {Object} input An array of fixtures
 * @return {Promise | Object}
 */
const importToDB = (input) => {
    return new Promise((resolve, reject) => {
        Fixture.insertMany(input, (error, fixtures) => {
            if (error) {
                reject(error);
            }

            // return fixtures that have been inserted
            resolve(fixtures);
        });
    });
};

module.exports = importToDB;

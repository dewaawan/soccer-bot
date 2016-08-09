'use strict';

require('dotenv').config();

const moment  = require('moment');
const Fixture = require('../models/fixture');

/**
 * Search the database for fixtures that:
 *   1. Have not been posted yet
 *   2. Are within the time indicated (ex. within 15 min)
 *
 * @return {Object} An array of fixtures that are happening soon
 */
function find() {
    // get the timeframe to check
    const timeframe = process.env.TIMEFRAME;

    // get the current time
    const now = moment();

    // an empty array of fixtures to send
    let fixtures_send = [];

    return new Promise(function(resolve, reject) {
        // find all fixtures that have not been posted
        findNotPosted().then(function(fixtures) {
                fixtures.forEach(function(entry) {
                    // get the difference in time between the date of the match and now
                    const difference = moment.duration(moment(entry.date).diff(now));

                    // keep checking only if years, months, days, and hours are 0
                    if (difference.years() === 0 && difference.months() === 0 && difference.days() === 0 && difference.hours() === 0) {
                        // check if the difference in minutes is 15 min or less
                        if (0 <= difference.minutes() && difference.minutes() <= process.env.TIMEFRAME) {
                            // add the fixture to the array of fixtures to send
                            fixtures_send.push(entry);
                        }
                    }
                });

                // return an array of fixtures to send
                resolve(fixtures_send);
            })
            .catch(function(error) {
                reject(error);
            });
    });
};

function findNotPosted() {
    return new Promise(function(resolve, reject) {
        Fixture.find({ posted: false }, function(error, fixtures) {
            if (error) {
                reject(error);
            }

            // return an array of fixtures
            resolve(fixtures);
        });
    });
};

module.exports = find;

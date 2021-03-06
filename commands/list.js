'use strict';

require('dotenv').config();

const Fixture = require('../models/fixture');

/**
 * Lists out the fixtures in the database
 *
 * @param  {Object} cmd Commands from the command line options
 * @return {Promise}
 */
const list = (cmd) => {
    const matchday     = cmd.matchday;
    const homeTeamName = cmd.homeTeamName;
    const awayTeamName = cmd.awayTeamName;
    let   fixtures     = [];

    return new Promise((resolve, reject) => {
        // Check if given a homeTeamName and/or a awayTeamName
        if (homeTeamName && awayTeamName) {
            // homeTeamName and awayTeamName given
            Fixture.find({ homeTeamName: homeTeamName, awayTeamName: awayTeamName }, (error, fixtures) => {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        } else if (homeTeamName && !awayTeamName) {
            // only homeTeamName given
            Fixture.find({ homeTeamName: homeTeamName }, (error, fixtures) =>  {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        } else if (!homeTeamName && awayTeamName) {
            // only awayTeamName given
            Fixture.find({ awayTeamName: awayTeamName }, (error, fixtures) => {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        } else if (matchday) {
            // only matchday given
            Fixture.find({ matchday: matchday }, (error, fixtures) => {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        } else {
            // no names given
            Fixture.find({}, (error, fixtures) => {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        }
    });
};

module.exports = list;

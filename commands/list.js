'use strict';

require('dotenv').config();

const Fixture = require('../models/fixture');

/**
 * Lists out the fixtures in the database
 *
 * @param  {Object} cmd Commands from the command line options
 * @return {Promise}
 */
function list(cmd) {
    const matchday     = cmd.matchday;
    const homeTeamName = cmd.homeTeamName;
    const awayTeamName = cmd.awayTeamName;
    let   fixtures     = [];

    return new Promise(function(resolve, reject) {
        // Check if given a homeTeamName and/or a awayTeamName
        if (homeTeamName && awayTeamName) {
            // homeTeamName and awayTeamName given
            Fixture.find({ homeTeamName: homeTeamName, awayTeamName: awayTeamName }, function(error, fixtures) {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        } else if (homeTeamName && !awayTeamName) {
            // only homeTeamName given
            Fixture.find({ homeTeamName: homeTeamName }, function(error, fixtures) {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        } else if (!homeTeamName && awayTeamName) {
            // only awayTeamName given
            Fixture.find({ awayTeamName: awayTeamName }, function(error, fixtures) {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        } else if (matchday) {
            // only matchday given
            Fixture.find({ matchday: matchday }, function(error, fixtures) {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        } else {
            // no names given
            Fixture.find({}, function(error, fixtures) {
                if (error) {
                    reject(error);
                }

                resolve(fixtures);
            });
        }
    });
};

module.exports = list;

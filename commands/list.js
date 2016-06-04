'use strict';

require('dotenv').config();

const low    = require('lowdb');

const storage = require('lowdb/file-sync');
const db      = low('db.json', { storage });

/*
 * List
 * List out the fixtures in the database
 */
function list(cmd) {
    const homeTeamName = cmd.homeTeamName;
    const awayTeamName = cmd.awayTeamName;
    let   fixtures     = [];

    // Check if given a homeTeamName and/or a awayTeamName
    if(homeTeamName && awayTeamName) {
        // homeTeamName and awayTeamName given
        fixtures = db('fixtures')
                        .chain()
                        .filter({ homeTeamName: homeTeamName, awayTeamName: awayTeamName })
                        .value();
    } else if(homeTeamName && !awayTeamName) {
        // only homeTeamName given
        fixtures = db('fixtures')
                        .chain()
                        .filter({ homeTeamName: homeTeamName })
                        .value();
    } else if(!homeTeamName && awayTeamName) {
        // only awayTeamName given
        fixtures = db('fixtures')
                        .chain()
                        .filter({ awayTeamName: awayTeamName })
                        .value();
    } else {
        // no names given
        fixtures = db('fixtures')
                        .chain()
                        .filter()
                        .value();
    }

    console.log(fixtures);
}

module.exports = list;

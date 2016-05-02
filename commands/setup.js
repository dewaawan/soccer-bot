'use strict';

const importToDB = require('../lib/import.js');
const fetch      = require('../lib/fetch.js');

/*
 * Setup
 * The first time setup of the fixture list in the local database using data
 * from the football api
 */
function setup() {
    const api_fixtures = fetch();

    importToDB(api_fixtures);

    console.log('Imported', api_fixtures.length, 'fixtures');
}

module.exports = setup;
